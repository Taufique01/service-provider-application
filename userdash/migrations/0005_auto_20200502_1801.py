# Generated by Django 2.2.11 on 2020-05-02 18:01

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userdash', '0004_auto_20200502_1800'),
    ]

    operations = [
        migrations.AlterField(
            model_name='estimate',
            name='created',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
    ]
