from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("list_tournaments/", views.list_tournaments, name="list_tournaments"),
    path('tournament/<int:tournamentId>/player/', views.player_join_tournament, name='player_join_tournament'),
    path('SetStartDate/', views.SetStartDate, name='SetStartDate'),
    # path('tournament/<int:tournamentId>/', views.get_tournament_by_id, name='get_tournament_by_id'),


    path('player/', views.get_tournaments_by_player_id, name='get_tournaments_by_player_id'),
    path('available_tournaments/', views.get_available_tournaments, name='get_available_tournaments'),
    path('create/player/', views.create_tournament, name='create_tournament'),
    # path('create/player/<int:player_id>/', views.create_tournament, name='create_tournament'),
    path('tournament/<int:tournamentId>/player/leave/', views.player_leave_tournament, name='player_leave_tournament'),
    path('<int:tournamentId>/', views.get_tournament_by_id, name='get_tournament_by_id'),
    path("StoreScore/", views.leave_tournament_and_store_score, name='leave_tournament_and_store_score'),

    # https://127.0.0.1:8000/tournament/StoreScore/
]

