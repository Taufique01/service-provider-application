from django.urls import path,re_path
from django.conf.urls import include,url
from django.views.generic import TemplateView
from . import views
urlpatterns = [
       # URLs that do not require a session or valid token
    path('',TemplateView.as_view(template_name="empty.html")),
    path('zillow/', views.GetZillowSearch.as_view(),name='zillow_search'),
    path('darksky/', views.GetDarkSkySearch.as_view(),name='darksky_search'),

]

