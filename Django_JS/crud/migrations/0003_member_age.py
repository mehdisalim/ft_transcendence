# Generated by Django 4.2.13 on 2024-07-16 08:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crud', '0002_rename_name_member_username_alter_member_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='age',
            field=models.IntegerField(default=50),
            preserve_default=False,
        ),
    ]