# Generated by Django 3.2.9 on 2021-12-25 20:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wydarzenio', '0017_alter_techstackinfo_icon'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='designpatterninfo',
            name='colorHex',
        ),
    ]