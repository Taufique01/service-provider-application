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





class SP(models.Model):
    county = models.CharField(max_length=200)
    postal_code = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    trade = models.CharField(max_length=200)
    sp_name = models.CharField(max_length=200)


    def populate_db_row(self,sp_row):
       """
       List order as follows
       ['County', 'Postal Code', 'City', 'State', 'Trade', 'SP Name']
       """
       self.county=sp_row[0]
       self.postal_code=sp_row[1]
       self.city=sp_row[2]
       self.state=sp_row[3]
       self.trade=sp_row[4]
       self.sp_name=sp_row[5]
       self.save()
       return True


    def __str__(self):
      return self.postal_code+' '+ self.city


######models for calculator page



class Calculator(models.Model):
    state = models.CharField(max_length=50)
    tax = models.FloatField(default=0,max_length=200)
    surge_protect=models.BooleanField()
    line_protect=models.BooleanField()
    electronics_protect=models.BooleanField()


  

    def __str__(self):
       return self.state


class Appliance(models.Model):
      calculator=models.ForeignKey(Calculator, related_name='appl',on_delete=models.CASCADE)
      value=models.FloatField()
      text= models.CharField(max_length=200)
      def __str__(self):
        return self.calculator.state+' '+self.text+' '+ str(self.value)+'$ monthly'

class System(models.Model):
      calculator=models.ForeignKey(Calculator, related_name='sys',on_delete=models.CASCADE)
      value=models.FloatField()
      text= models.CharField(max_length=200)
      def __str__(self):
        return self.calculator.state+' '+self.text+' '+ str(self.value)+'$ monthly'

class WholeHome(models.Model):
      calculator=models.ForeignKey(Calculator, related_name='wh',on_delete=models.CASCADE)
      value=models.FloatField()
      text= models.CharField(max_length=200)
      def __str__(self):
        return self.calculator.state+' '+self.text+' '+ str(self.value)+'$ monthly'

class SurgeProtect(models.Model):
      '''per month '''
      minimum_cost=models.FloatField()
      maximum_cost=models.FloatField()
      text= models.CharField(default='Coverage',max_length=200)
      def __str__(self):
        return self.text+' monthly'

class ElectronicsProtect(models.Model):
      '''per month '''
      cost=models.FloatField()
      text= models.CharField(max_length=200)
      def __str__(self):
        return self.text+' monthly'

class LineProtect(models.Model):
      '''per month '''
      cost=models.FloatField()
      def __str__(self):
        return str(self.cost)+'$ monthly'

class Optional(models.Model):
      '''per year '''
      cost=models.FloatField()
      text= models.CharField(max_length=200)
      def __str__(self):
        return self.text +' yearly'



class Discount(models.Model):
      '''per month '''
      cost=models.FloatField(default=100)
      def __str__(self):
        return str(self.cost)+' yearly'



















