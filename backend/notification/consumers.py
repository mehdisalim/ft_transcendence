import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import *
from .serializers import NotificationSerializer


class UserNotificationConsumer(WebsocketConsumer):
    def connect(self):
        self.current_user = self.scope['user']
        print(self.current_user.username)
        print(self.current_user.is_authenticated)
        if self.current_user.is_authenticated:
            # self.room_name = self.scope['url_route']['kwargs']['room_name']
            self.group_name = f'notification_{self.current_user.id}'

            # Join room group
            async_to_sync(self.channel_layer.group_add)(
                self.group_name,
                self.channel_name
            )
            self.accept()
        else:
            self.close()  
    def disconnect(self, close_code):
        if self.current_user.is_authenticated:
            # Leave room group
            async_to_sync(self.channel_layer.group_discard)(
                self.group_name,
                self.channel_name
            )
    def receive(self, text_data):
        data = json.loads(text_data)
        print(data)
        try:
            receiver = self.get_user(data['receiver'])
            notification_data = {
                'user' : receiver.id,
                'content' : data['message']
            }
            notification_serializer = NotificationSerializer(data=notification_data)
            if notification_serializer.is_valid():
                notification_serializer.save()
                print('notification_serializer.data')
                print(notification_serializer.data)
                self.broadcast_notification(notification_serializer.data)
            else:    
                self.send_error('notification')
        except User.DoesNotExist:
            self.send_error('receiver user not exists!')

    def broadcast_notification(self, data):
        async_to_sync(self.channel_layer.group_send)(
            f'notification_{data["user"]}',
            {
                'type': 'send_message',
                'data': data
            }
        )       
    def get_user(self, user_id):
        return (User.objects.get(id=user_id))           
    def send_error(self, error_message):
        self.send(text_data=json.dumps({'Error': error_message}))  
    def send_message(self, event):
        message = event['data']
        self.send(text_data=json.dumps(message))
