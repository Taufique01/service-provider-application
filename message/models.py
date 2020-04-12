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







