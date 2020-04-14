
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User


# Code to add permission to group ???
ct = ContentType.objects.get_for_model(User)

# Now what - Say I want to add 'Can go Haridwar' permission to level0?
Permission.objects.create(codename ='property_info_permission', name ='Property info page Permission', content_type = ct)
Permission.objects.create(codename ='zillow_permission', name ='Zillow Permission', content_type = ct)
Permission.objects.create(codename ='darksky_permission', name ='Darksky Permission', content_type = ct)
Permission.objects.create(codename ='directory_permission', name ='Directory Page Permission', content_type = ct)
Permission.objects.create(codename ='message_permission', name ='Message Permissions', content_type = ct)
Permission.objects.create(codename ='calculator_permission', name ='Calculator Permission', content_type = ct)
Permission.objects.create(codename ='timezone_permission', name ='Timezone Permission', content_type = ct)
Permission.objects.create(codename ='directory_search_permission', name ='Directory Search Permission', content_type = ct)
