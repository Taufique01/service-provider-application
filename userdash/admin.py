from django.contrib import admin
from .models import Estimate,Order,Profile,Payment,ProfileAdmin,Withdraw,Message
# Register your models here.
admin.site.register(Estimate)
admin.site.register(Order)
admin.site.register(Profile)
admin.site.register(Payment)
admin.site.register(Withdraw)
admin.site.register(Message)
