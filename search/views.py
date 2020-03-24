from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Count
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import TemplateHTMLRenderer
from pyzipcode  import ZipCodeDatabase
from .models import Count,SP,Calculator,Appliance,System,WholeHome,SurgeProtect,LineProtect,ElectronicsProtect,Optional,Discount,Phone
import json
import requests

from django.db import transaction
from zillowAPI import zillow
from zillowAPI import ZillowDataType
from zillowAPI import ZillowAPI
from zillowAPI import ZillowError
from . import zipdict, calcmessage
from .utils import timeFromStamp,dayFromStamp,degreeF_from_F
from webapi import settings
from django.utils.decorators import method_decorator
from .serializers import SPSerializers

class GetZillowSearch(APIView):
     
      def post(self, request, *args, **kwargs):

          Count.load().count_zillow()



          #print('ggggg')
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

          Count.load().count_darksky()
          #print('#############################################################')
          #print(request.data)
          #address = request.data.get('address')#"3400 Pacific Ave"
          postal_code =request.data.get('zip')# "90292"
          key='3fec67a7c3338515e9ea5cc28942959b'
          request_url='https://api.darksky.net/forecast/'+key+'/'+zipdict.zip[postal_code]+'?exclude=[minutely,hourly]'
          print(request_url)
          dsky = requests.get(request_url).json()
          #print(dsky)
          ##prepare response parameter
          weather={
            'time' : timeFromStamp(dsky['currently']['time'],dsky['timezone']),
            'temp' : degreeF_from_F(dsky['currently']['temperature']),
            'stroam_distance' : str(dsky['currently']['nearestStormDistance'])+'miles',
            'max_temp' : degreeF_from_F(dsky['daily']['data'][0]['temperatureMax']),
            'min_temp' : degreeF_from_F(dsky['daily']['data'][0]['temperatureMin']),
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
                     'min_temp':degreeF_from_F(days['temperatureMin']),
                     'max_temp':degreeF_from_F(days['temperatureMax']),


                     #'icon_text':days['icon'],
                     
               }
               week.append(data)
          week[0]['day']='Today'
          ##add week data to response
          weather['week_sum']=dsky['daily']['summary']
          weather['week']=week


          weather['currently']=dsky['currently']
             

        
          #print(weather)
          return Response(data=weather, status=status.HTTP_200_OK)


class DirectoryTable(APIView):
     
     def getFilteredData(self,sp_data,search):
         if not search['postal_code']:
            sp_data_filtered=sp_data
         else:
             ##code to habdle showSameCounty
             if search['sameCounty']=='true':##if showSameCounty is on
                ##for on get the county name
                sp_data_filtered=sp_data.filter(postal_code=search['postal_code'])
                county_name=sp_data_filtered[0].county
                state_name=sp_data_filtered[0].state
                ##for on search with county name
                sp_data_filtered=sp_data.filter(county=county_name,state=state_name)
             else:##if showSameCounty is off
                sp_data_filtered=sp_data.filter(postal_code=search['postal_code'])
                

         if search['trade']:
            sp_data_filtered=sp_data_filtered.filter(trade__in=search['trade'])
         return sp_data_filtered
         
          
    
     def getSPdata(self, start, length, search):
          sp_data=SP.objects.all()
          sp_count=sp_data.count()

          #filer the sp_data rows with search params
          sp_data_filtered=self.getFilteredData(sp_data,search)
          #count of filtered data
          sp_count_filtered=sp_data_filtered.count()

          #get the requested number of rows to display in a page
          sp_data_filtered=sp_data_filtered[start:start+length]

          
         

          return sp_count,sp_count_filtered,sp_data_filtered
          
          


     def processTableRequest(self,table_data):
          ''' go to the link below for more request parameters
              https://datatables.net/manual/server-side
          '''

          draw=int(table_data.get('draw'))
          start=int(table_data.get('start'))
          length=int(table_data.get('length'))
          #### 'postal_code' search value is 'columns[1][search][value]'
          #### 'trade' search value is 'columns[4][search][value]'
          #### 'trade separtor" value is 'columns[4][search][seperator]'
          trade_seperator=table_data.get('columns[4][search][seperator]')
          search={}
          if table_data.get('columns[4][search][value]'):
             search['trade']=table_data.get('columns[4][search][value]').split(trade_seperator)#list
          else:
             search['trade']=False
          ##strip to handle space only inputs on search box
          search['postal_code']=table_data.get('columns[1][search][value]').strip()#string
          search['sameCounty']=table_data.get('showSameCounty')#string
   
          return draw, start, length, search
          
         
 

     def post(self, request, *args, **kwargs):
          print('#####getting durectory###############')
          print(request.data)
          draw, start, length, search  = self.processTableRequest(request.data)
          sp_count,sp_count_filtered,sp_data_filtered = self.getSPdata( start, length, search)

          ##build response data##
          response={}
          response['draw']=draw
          response['recordsTotal']=sp_count
          response['recordsFiltered']=sp_count_filtered
          response['data']=SPSerializers(sp_data_filtered,many=True).data
          
          #print(response['data'])
        
          return Response(data=response, status=status.HTTP_200_OK)




class CalculatorView(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'calculator.html'
    http_method_names=['get','post',]
    def get(self, request):

        return Response({'calculator': None})


    def post(self, request):
        

        try:
           input=request.data.get('state_name')
           if input.isalpha():
              calculator = Calculator.objects.get(state=input.upper())
              zipcode=''
           elif input.isdigit():
              zcdb = ZipCodeDatabase()
              zip= zcdb[int(input)]
              calculator = Calculator.objects.get(state=zip.state)
              zipcode=zip.zip
           else:
              return Response({'calculator': None})
           optionals=Optional.objects.all()
           surge_protects=SurgeProtect.objects.all()
           e_protects=ElectronicsProtect.objects.all()
           line_protect=LineProtect.objects.all()[0]
           discount=Discount.objects.all()[0]
           return Response({'zipcode':zipcode,'calculator': calculator,'optionals':optionals,'surge_protects':surge_protects,'e_protects':e_protects,'line_protect':line_protect,'discount':discount,'calcmessage':calcmessage.message},)
        except:
           return Response({'calculator': None})

        
 
class Counts(APIView):
     
      def post(self, request, *args, **kwargs):
          print('getting counts###############')
          users=User.objects.all().count()
          counts=Count.load()
          return Response(data={'users':users,'zillow':counts.zillow_used,'darksky':counts.darksky_used}, status=status.HTTP_200_OK)









