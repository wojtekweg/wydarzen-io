# Generated by Django 3.2.9 on 2021-12-27 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wydarzenio', '0025_event_picture_can_be_updated'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='description',
            field=models.TextField(default='TBA', max_length=5096),
        ),
    ]
