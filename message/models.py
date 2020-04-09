from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime    

from django.conf import settings
# Create your models here.

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
    log = models.TextField()
    created = models.DateTimeField(default=timezone.now)
    def __str__(self):
       return  str(self.created)







