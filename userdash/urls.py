from django.urls import path,re_path
from django.conf.urls import include,url
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from . import views
urlpatterns = [
       # URLs that do not require a session or valid token
    path('',views.UserDashTemplate.as_view(),name='home'),
    path('add-estimate/', views.EstimateCreateView.as_view(), name='add-estimate'),
    path('estimate/<int:id>/details/', views.EstimateDetailsView.as_view(), name='estimate-details'),
    path('order/<int:id>/details/', views.OrderDetailsView.as_view(), name='order-details'),
    path('user/referral/', views.ReferralView.as_view(), name='user-referral'),

]

