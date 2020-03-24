from django.contrib import admin
from .models import Count,SP,Calculator,Appliance,System,WholeHome,SurgeProtect,LineProtect,ElectronicsProtect,Optional,Discount,Phone
# Register your models here.
admin.site.register(Count)
admin.site.register(SP)

admin.site.register(Calculator)
admin.site.register(Appliance)
admin.site.register(System)
admin.site.register(WholeHome)
admin.site.register(SurgeProtect)
admin.site.register(LineProtect)
admin.site.register(ElectronicsProtect)
admin.site.register(Optional)
admin.site.register(Discount)
admin.site.register(Phone)
