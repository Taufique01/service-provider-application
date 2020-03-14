from django import template



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
