# Generated by Django 3.2.9 on 2022-01-14 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wydarzenio', '0030_event_discord_subscription_channel'),
    ]

    operations = [
        migrations.CreateModel(
            name='DiscordChannel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('channel_id', models.CharField(max_length=128)),
                ('display_embed', models.BooleanField(default=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='event',
            name='discord_subscription_channel',
        ),
        migrations.AddField(
            model_name='event',
            name='discord_subscription_channel',
            field=models.ManyToManyField(to='wydarzenio.DiscordChannel'),
        ),
    ]
