# Generated by Django 2.2.11 on 2020-05-16 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userdash', '0014_auto_20200511_1120'),
    ]

    operations = [
        migrations.CreateModel(
            name='Samples',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=300)),
                ('upload', models.ImageField(upload_to='uploads/% Y/% m/% d/')),
            ],
        ),
    ]