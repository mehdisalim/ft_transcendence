# Generated by Django 4.2.13 on 2024-08-30 10:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0016_remove_player_playerstats_remove_stats_player'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='player',
            name='user',
        ),
    ]
