# Generated by Django 3.2.9 on 2021-12-25 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wydarzenio', '0015_alter_designpatterninfo_iconpath2'),
    ]

    operations = [
        migrations.AlterField(
            model_name='techstackinfo',
            name='icon',
            field=models.TextField(default='', max_length=2048),
        ),
    ]
