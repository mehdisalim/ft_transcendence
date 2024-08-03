# Generated by Django 5.0.6 on 2024-07-23 17:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0005_alter_user_profile_links'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user_profile',
            name='links',
        ),
        migrations.AddField(
            model_name='links',
            name='user_profile',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='links', to='Profile.user_profile'),
            preserve_default=False,
        ),
    ]