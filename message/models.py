from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime    

from django.conf import settings
# Create your models here.


class CSPhone(models.Model):
    phone = models.CharField(max_length=200)
    def __str__(self):
       return self.phone

class LogReceiverEmail(models.Model):
    email = models.CharField(max_length=200)
    def __str__(self):
       return self.email

class Branding(models.Model):
    title = models.CharField(max_length=500)
    def __str__(self):
       return self.title


class MessageTemplate(models.Model):
    title = models.CharField(max_length=500)
    message = models.TextField()
    def __str__(self):
       return self.title


class MessageLog(models.Model):
    phone=models.CharField(max_length=20,default='unknown')
    log = models.TextField()
    created = models.DateTimeField(default=timezone.now)
    def __str__(self):
       return self.phone + str(self.created)



from django.db.models.signals import pre_migrate
from django.contrib.auth.models import Permission
from django.conf import settings
from django.dispatch import receiver
from django.contrib.auth import models as auth_models

# custom user related permissions
@receiver(pre_migrate, sender=auth_models)
def add_user_permissions(sender, **kwargs):
    content_type = ContentType.objects.get_for_model(User)
    Permission.objects.get_or_create(codename='view_user', name='View user', content_type=content_type)




