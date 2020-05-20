from django.contrib import admin
from .models import Estimate,Order,Profile,Payment,ProfileAdmin,Withdraw,Message,Sample
# Register your models here.
admin.site.register(Estimate)
admin.site.register(Order)
admin.site.register(Profile)
admin.site.register(Payment)
admin.site.register(Withdraw)
admin.site.register(Message)
admin.site.register(Sample)
