from collections import OrderedDict
from rest_framework.serializers import ModelSerializer
from .models import SP

class SPSerializers(ModelSerializer):

     class Meta:
        model = SP
        fields =['county','postal_code','city','state','trade','sp_name']
