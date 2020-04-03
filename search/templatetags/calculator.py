from django import template
import datetime
from datetime import date
from dateutil.relativedelta import relativedelta

register = template.Library()

@register.simple_tag
def style_display_additional(additional):
   
    if additional:
       return 'block'
    
    
    return 'none'

@register.simple_tag
def style_display(value):
   
    if value:
       return 'block'
    
    
    return 'none'


@register.simple_tag
def after_30_days():
   
    date=datetime.date.today() + relativedelta(days=30)
    return date.strftime('%b %d, %Y')

@register.simple_tag
def after_60_days():
    date=datetime.date.today() + relativedelta(days=60)
    return date.strftime('%b %d, %Y')
