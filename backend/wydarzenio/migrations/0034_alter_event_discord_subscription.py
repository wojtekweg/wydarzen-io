# Generated by Django 3.2.9 on 2022-01-14 20:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wydarzenio', '0033_auto_20220114_2036'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='discord_subscription',
            field=models.ManyToManyField(blank=True, default=None, to='wydarzenio.DiscordChannel'),
        ),
    ]