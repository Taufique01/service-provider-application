from django.urls import path,re_path
from django.conf.urls import include,url
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from . import views
urlpatterns = [
       # URLs that do not require a session or valid token
    path('',login_required(TemplateView.as_view(template_name="empty.html")),name='propertyinfo'),
    path('timezone/',login_required(TemplateView.as_view(template_name="timezone.html")),name='timezone'),
    path('zillow/', login_required(views.GetZillowSearch.as_view()),name='zillow_search'),
    path('darksky/', login_required(views.GetDarkSkySearch.as_view()),name='darksky_search'),
    path('counts/', login_required(views.Counts.as_view()),name='search_counts'),

    path('directories/',login_required(TemplateView.as_view(template_name="directory.html")),name='directory'),

    path('directories/sp/filter/', login_required(views.DirectoryTable.as_view()),name='sp_table_filter'),
    path('calculator/', login_required(views.CalculatorView.as_view()),name='calculator'),

   
]


