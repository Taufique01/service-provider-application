import datetime
import time
import pytz
def timeFromStamp(timestamp,zone_str):
   zone=pytz.timezone(zone_str)
   tm = datetime.datetime.fromtimestamp(timestamp,zone)
   tm_str=tm.strftime("%a %b %d %H:%M:%S %Y %Z")
   #print(tm_str)
   return tm_str



def dayFromStamp(timestamp,zone_str):
    zone=pytz.timezone(zone_str)
    tm = datetime.datetime.fromtimestamp(timestamp,zone)
    day=tm.strftime("%a")
    #print(day)
    return day


def celsiusToFahrenheit(celsius):

   fahrenheit = (9.0/5.0) * celsius + 32

   return fahrenheit

HTML_DEGREE_FAHRENHEIT='&#8457;'
def degreeF_from_F(fahrenheit):

  
   #F='%.2f' % F
   degreeF=str(fahrenheit)+HTML_DEGREE_FAHRENHEIT
   return degreeF
