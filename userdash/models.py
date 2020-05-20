from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime    
from uuid import uuid4
from datetime import date

from pinax.referrals.models import Referral,ReferralResponse

from django.dispatch import receiver
from django.db.models.signals import post_save
from allauth.account.signals import user_signed_up
from django.urls import reverse_lazy
from tinymce import models as tinymce_models


import random 
import string 
  
from django.conf import settings
# Create your models here.
STATUS_CHOICES = (
    ('confirmed', 'Confirmed'),
    ('started', 'Started'),
    ('primarily_delivered', 'Primarily Delivered'),
	('completed', 'Completed'),
)

CONTACT_CHOICES = (
    ('email', 'Email'),
    ('whatsapp', "What's app"),
 
)

# "Profile" model
class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
    )
    referral = models.OneToOneField(
        Referral,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    referral_percentage=models.FloatField(default=10)
    def referral_orders_amount(self):

        referral_res=ReferralResponse.objects.filter(referral=self.referral,action='SIGN_UP')
        osum=0
        for ref_res in referral_res:
            users_orders=ref_res.user.order_set.all()
                
            for order in users_orders:
                osum=osum+order.price

            
        return osum

    def referral_earning(self):

        referral_res=ReferralResponse.objects.filter(referral=self.referral,action='SIGN_UP')
        osum=0
        for ref_res in referral_res:
            users_orders=ref_res.user.order_set.all()
                
            for order in users_orders:
                osum=osum+order.price

            
        return osum*10/100

    def referral_count(self):
        count= ReferralResponse.objects.filter(referral=self.referral,action='SIGN_UP').count()
        return count
    def withdrawn(self):
        withdraws=Withdraw.objects.filter(user=self.user)
        wsum=0
        for withdraw in withdraws:
            wsum=wsum+withdraw.withdrawn
        return wsum

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'referral_count','referral_orders_amount','referral_earning','withdrawn')
    #inlines = [ReferralInline, ]


class Withdraw(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
  
    withdrawn = models.FloatField()
    remaining= models.FloatField()

    method = models.CharField(max_length=500)
    comment = models.CharField(max_length=500)
    def __str__(self):
       return self.user.username


class Estimate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    code = models.CharField(max_length=10)
    catagory = models.CharField(max_length=250,null=True)
    description = tinymce_models.HTMLField()

    asking_price = models.FloatField(null=True)
    estimated_price = models.FloatField(null=True)
    created = models.DateTimeField(default=datetime.now)
    asking_time = models.IntegerField(null=True)
    estimated_time = models.IntegerField(null=True)
    contact_method =models.CharField(choices=CONTACT_CHOICES, max_length=25)
    contact_address=models.CharField(max_length=100)

    comment=models.TextField(null=True)
    status=models.BooleanField(default=False)
    payment_link = models.TextField(null=True)
    def __str__(self):
       return self.title

    def ran_gen(self,size, chars=string.ascii_uppercase + string.digits): 
         return ''.join(random.choice(chars) for x in range(size)) 
  
    def save(self, *args, **kwargs):

        self.code= self.ran_gen(8)
        
        super(Estimate, self).save(*args, **kwargs)










class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    code = models.CharField(max_length=10)
    catagory = models.CharField(max_length=250)
    description = tinymce_models.HTMLField()
    price = models.FloatField()

    starting_date = models.DateField()
    delivery_date = models.DateField()

    status=models.CharField(choices=STATUS_CHOICES, max_length=25)
    contact_method =models.CharField(choices=CONTACT_CHOICES, max_length=25)
    contact_address=models.CharField(max_length=100)
    comment=models.TextField()
    def __str__(self):
       return self.title+' '+self.code




class Payment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
  
    amount = models.FloatField()
    tnxid = models.CharField(max_length=100)

    def __str__(self):
       return self.tnxid+' '+str(self.amount)



class Message(models.Model):
  
    name = models.CharField(max_length=100,null=False,blank=False)
    email = models.CharField(max_length=100, null=False, blank=False)
    message=models.TextField()
    created = models.DateTimeField(default=datetime.now)

    def __str__(self):
       return self.email






@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


@receiver(user_signed_up)
def handle_user_signed_up(sender,request, user,  **kwargs):
    referral_response = Referral.record_response(request, "SIGN_UP")
    print(referral_response)
    profile = user.profile
    referral = Referral.create(user=user, redirect_to=reverse_lazy('home'))
    profile.referral = referral
    profile.save()










class Sample(models.Model): 
    tag  = models.CharField(max_length=300)
    price = models.FloatField()
    upload = models.ImageField(upload_to ='uploads/% Y/% m/% d/') 





















