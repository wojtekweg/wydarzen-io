# Generated by Django 3.2.9 on 2021-12-26 17:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wydarzenio', '0019_scrappersingleton'),
    ]

    operations = [
        migrations.AddField(
            model_name='scrappersingleton',
            name='hours_limit',
            field=models.IntegerField(default=2),
        ),
    ]
