# Generated by Django 3.2.9 on 2021-11-07 19:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wydarzenio', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='lat',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9),
        ),
        migrations.AlterField(
            model_name='place',
            name='long',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9),
        ),
    ]
