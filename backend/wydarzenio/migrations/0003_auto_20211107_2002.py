# Generated by Django 3.2.9 on 2021-11-07 20:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wydarzenio', '0002_auto_20211107_1958'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='lat',
            field=models.DecimalField(decimal_places=6, default=50.049683, max_digits=9),
        ),
        migrations.AlterField(
            model_name='place',
            name='long',
            field=models.DecimalField(decimal_places=6, default=19.944544, max_digits=9),
        ),
    ]
