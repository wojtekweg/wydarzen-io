# Generated by Django 3.2.9 on 2022-01-14 20:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wydarzenio', '0029_place_picture'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='discord_subscription_channel',
            field=models.CharField(blank=True, default=None, max_length=128, null=True),
        ),
    ]
