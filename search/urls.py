from django.urls import path,re_path
from django.conf.urls import include,url
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from . import views
urlpatterns = [
       # URLs that do not require a session or valid token
    path('',views.PropertyInfoTemplate.as_view(),name='propertyinfo'),
    path('timezone/',views.TimezoneTemplate.as_view(),name='timezone'),
    path('zillow/', views.GetZillowSearch.as_view(),name='zillow_search'),
    path('darksky/', views.GetDarkSkySearch.as_view(),name='darksky_search'),
    path('counts/', views.Counts.as_view(),name='search_counts'),

    path('directories/',views.DirectoryTemplate.as_view(),name='directory'),

    path('directories/sp/filter/',views.DirectoryTable.as_view(),name='sp_table_filter'),
    path('calculator/', views.CalculatorView.as_view(),name='calculator'),

   
]


