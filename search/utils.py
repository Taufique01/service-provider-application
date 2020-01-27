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
 
