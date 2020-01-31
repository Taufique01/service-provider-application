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
from .utils import timeFromStamp,dayFromStamp,degreeF_from_C
from webapi import settings

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
     
      def getIcon(self,icon):
          url=settings.STATIC_URL+'images/icons/'+icon+'.png'
          return url
      
      
      def post(self, request, *args, **kwargs):
          #print('#############################################################')
          #print(request.data)
          #address = request.data.get('address')#"3400 Pacific Ave"
          postal_code =request.data.get('zip')# "90292"
          key='3fec67a7c3338515e9ea5cc28942959b'
          request_url='https://api.darksky.net/forecast/'+key+'/'+zipdict.zip[postal_code]+'?exclude=[minutely,hourly]'
          print(request_url)
          dsky = requests.get(request_url).json()
          
          ##prepare response parameter
          weather={
            'time' : timeFromStamp(dsky['currently']['time'],dsky['timezone']),
            'temp' : degreeF_from_C(dsky['currently']['temperature']),
            'stroam_distance' : str(dsky['currently']['nearestStormDistance'])+'km',
            'max_temp' : degreeF_from_C(dsky['daily']['data'][0]['temperatureMax']),
            'min_temp' : degreeF_from_C(dsky['daily']['data'][0]['temperatureMin']),
            'summary' : dsky['daily']['data'][0]['summary'],
            'icon' : dsky['daily']['data'][0]['icon'],
            'alert_status' : False,
            'precip_acc' : False,
          }
          ##get the icon image
          weather['icon_url']=self.getIcon(dsky['daily']['data'][0]['icon'])

          ##precip and alerts that is optionally returns
          if 'precipAccumulation' in dsky['daily']['data'][0]:
              weather['precip_acc']=str(dsky['daily']['data'][0]['precipAccumulation'])+ 'cm'
          if 'alerts' in dsky:
             weather['alert_status']=True
             weather['alerts']=dsky['alerts']

          ###generate week summary
          week=[] 
          for days in dsky['daily']['data']:
               data={
                     'icon':self.getIcon(days['icon']),
                     'day':dayFromStamp(days['time'],dsky['timezone']),
                     'min_temp':degreeF_from_C(days['temperatureMin']),
                     'max_temp':degreeF_from_C(days['temperatureMax']),


                     #'icon_text':days['icon'],
                     
               }
               week.append(data)
          week[0]['day']='Today'
          ##add week data to response
          weather['week_sum']=dsky['daily']['summary']
          weather['week']=week
             

        
          #print(weather)
          return Response(data=weather, status=status.HTTP_200_OK)

