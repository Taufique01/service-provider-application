from django.urls import path,re_path
from django.conf.urls import include,url
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from . import views

urlpatterns = [
    path('message/',login_required(views.MessageTemplate.as_view()),name='message'),
    path('send-message/',login_required(views.SendMessage.as_view()),name='send-message'),

]
