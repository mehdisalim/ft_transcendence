# Generated by Django 4.2.13 on 2024-06-30 11:52

from django.db import migrations, models
import pyotp


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_otp'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='otp_secret',
            field=models.CharField(default=pyotp.random_base32, max_length=16),
        ),
        migrations.AlterField(
            model_name='otp',
            name='otp',
            field=models.CharField(max_length=6),
        ),
    ]