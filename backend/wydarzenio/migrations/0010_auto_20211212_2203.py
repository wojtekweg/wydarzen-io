# Generated by Django 3.2.9 on 2021-12-12 22:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wydarzenio', '0009_alter_event_picture'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventFileImport',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(default=None, upload_to='event/file_imports')),
                ('upload_date', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.AlterField(
            model_name='event',
            name='picture',
            field=models.ImageField(blank=True, default=None, null=True, upload_to='event/posters'),
        ),
    ]
