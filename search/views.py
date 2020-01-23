from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import json
import requests

from zillowAPI import zillow
from zillowAPI import ZillowDataType
from zillowAPI import ZillowAPI
from zillowAPI import ZillowError
from . import zipdict


class GetZillowSearch(APIView):
     
      def post(self, request, *args, **kwargs):
         # print('ggggg')
          #print(request.data)
          address = request.data.get('address')#"3400 Pacific Ave"
          postal_code =request.data.get('zip')# "90292"
          key='X1-ZWz1hkfgcy337v_55f1z'
          data=zillow().GetSearchResults(key, address, postal_code,True)
          def obj_dict(obj):
            return obj.__dict__
          json_string = json.dumps(data.results, default=obj_dict)
          
          #print(json_string)
          return Response(data=json_string, status=status.HTTP_200_OK)

class GetDarkSkySearch(APIView):
     
      def post(self, request, *args, **kwargs):
          print('#############################################################')
          print(request.data)
          #address = request.data.get('address')#"3400 Pacific Ave"
          postal_code =request.data.get('zip')# "90292"
          key='3fec67a7c3338515e9ea5cc28942959b'
          request_url='https://api.darksky.net/forecast/'+key+'/'+zipdict.zip[postal_code]+'?exclude=[minutely,hourly]'
          print(request_url)
          dsky = requests.get(request_url).json()

          weather={
            'temp':str(dsky['currently']['temperature'])+'&#8451;',
            'stroam_distance':str(dsky['currently']['nearestStormDistance'])+'km',
            'max_temp': str(dsky['daily']['data'][0]['temperatureMax'])+'&#8451;',
            'min_temp':str(dsky['daily']['data'][0]['temperatureMin'])+'&#8451;',
            'summary':dsky['daily']['data'][0]['summary'],
            'icon':dsky['daily']['data'][0]['icon'],
            'alert_status':False,
            'precip_acc':False,
          }
          if 'precipAccumulation' in dsky['daily']['data'][0]:
              weather['precip_acc']=str(dsky['daily']['data'][0]['precipAccumulation'])+ 'cm'
          if 'alerts' in dsky:
             weather['alert_status']=True
             weather['alerts']=dsky['alerts']
             







        
          print(weather)
          return Response(data=weather, status=status.HTTP_200_OK)

