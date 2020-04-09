from django.contrib import admin
from .models import LogReceiverEmail,Branding,MessageTemplate,MessageLog
# Register your models here.
admin.site.register(LogReceiverEmail)
admin.site.register(Branding)
admin.site.register(MessageTemplate)
admin.site.register(MessageLog)
