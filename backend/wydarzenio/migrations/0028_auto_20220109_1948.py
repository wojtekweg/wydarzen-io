# Generated by Django 3.2.9 on 2022-01-09 19:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wydarzenio', '0027_alter_eventfileimport_file'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='techstackinfo',
            name='info_ptr',
        ),
        migrations.DeleteModel(
            name='DesignPatternInfo',
        ),
        migrations.DeleteModel(
            name='Info',
        ),
        migrations.DeleteModel(
            name='TechStackInfo',
        ),
    ]