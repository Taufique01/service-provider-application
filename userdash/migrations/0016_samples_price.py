# Generated by Django 2.2.11 on 2020-05-18 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userdash', '0015_samples'),
    ]

    operations = [
        migrations.AddField(
            model_name='samples',
            name='price',
            field=models.FloatField(default=10),
            preserve_default=False,
        ),
    ]
