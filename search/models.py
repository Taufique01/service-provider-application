from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
from django.utils import timezone
from django.conf import settings
from django.db import transaction
# Create your models here.
class SingletonModel(models.Model):

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super(SingletonModel, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj
# Create your models here.
class Count(SingletonModel):
    zillow_used = models.IntegerField(default=0)
    darksky_used=models.IntegerField(default=0)


    def __str__(self):
      return 'zillow:'+str(self.zillow_used)+'  '+'darksky:'+str(self.darksky_used)

    def count_zillow(self):

            self.zillow_used=self.zillow_used+1
            print('zillow:'+str(self.zillow_used)+'  '+'darksky:'+str(self.darksky_used))
            self.save(update_fields=["zillow_used"])

    def count_darksky(self):


            self.darksky_used=self.darksky_used+1
            print('zillowwwwww:'+str(self.zillow_used)+'  '+'darksky:'+str(self.darksky_used))
            self.save(update_fields=["darksky_used"])


