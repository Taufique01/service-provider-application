from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth.mixins import PermissionRequiredMixin,LoginRequiredMixin
from django.urls import reverse_lazy
from django.shortcuts import redirect
from django.shortcuts import render, get_object_or_404
from django.db.models import Count
from django.core.mail import EmailMessage

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import TemplateHTMLRenderer
from datetime import datetime
from .models import Estimate, Order,Sample
from django.views.generic import ListView, DetailView, View,CreateView,UpdateView,DeleteView
from django.contrib.admin.widgets import AdminDateWidget
from django.core.exceptions import PermissionDenied
from django import forms
from .form import MessageForm

from tinymce.widgets import TinyMCE


# Create your views here.

class UserDashTemplate(APIView):
     
      renderer_classes = [TemplateHTMLRenderer]
      template_name = 'home.html'
      

      def get(self, request, *args, **kwargs):
          messageForm=MessageForm()
          if not request.user.is_authenticated:
             return Response({'form':messageForm,})
          estimates=Estimate.objects.filter(user=request.user)
          orders=Order.objects.filter(user=request.user).exclude(status='completed')

          return Response({'estimates':estimates,'orders':orders,'form':messageForm,})
      def post(self, request, *args, **kwargs):
          
         form = MessageForm(request.POST)

         if form.is_valid():
            message = form.save()
            messages.success(self.request, 'Message Sent')
         return redirect('home')

class EstimateCreateView(LoginRequiredMixin,CreateView):
      
     model=Estimate
     fields=['title','description', 'asking_price','asking_time','contact_method','contact_address',]
     template_name='add_estimate.html'
     success_url=reverse_lazy('home')
          
     def get(self, request, *args, **kwargs):
        
        estimates=Estimate.objects.filter(user=request.user)
        orders=Order.objects.filter(user=request.user).exclude(status='completed')
 
        context = {'estimates':estimates,'orders':orders,'form': self.get_form()}
        return render(request, self.template_name, context)

     def get_form(self, form_class=None):
        if form_class is None:
            form_class = self.get_form_class()

        form = super(EstimateCreateView, self).get_form(form_class)
        form.fields['title'].widget = forms.TextInput(attrs={'placeholder': 'You project title'})

        form.fields['asking_price'].widget = forms.TextInput(attrs={'placeholder': 'USD'})
        form.fields['contact_address'].widget = forms.TextInput(attrs={'placeholder': 'email or whatsapp number'})
        form.fields['asking_time'].widget = forms.TextInput(attrs={'placeholder': 'days to complete'})
        return form

     def form_valid(self, form):
        form.instance.user=self.request.user

        super(EstimateCreateView,self).form_valid(form)
        messages.success(self.request, 'Item created')
        return redirect(self.get_success_url())

     def form_invalid(self, form):
       
       

        print('invalid form')
        return self.render_to_response(self.get_context_data(form=form))



class EstimateDetailsView(LoginRequiredMixin,APIView):
     
      renderer_classes = [TemplateHTMLRenderer]
      template_name = 'estimate_details.html'
      

      def get(self, request, *args, **kwargs):
          estimates=Estimate.objects.filter(user=request.user)
          orders=Order.objects.filter(user=request.user).exclude(status='completed')
 
          try:
            estimate=Estimate.objects.get(user=request.user ,id=kwargs['id'])
          except:
            raise PermissionDenied()

          return Response({'estimates':estimates,'orders':orders,'estimate':estimate})






class OrderDetailsView(LoginRequiredMixin,APIView):
     
      renderer_classes = [TemplateHTMLRenderer]
      template_name = 'order_details.html'
      

      def get(self, request, *args, **kwargs):

          estimates=Estimate.objects.filter(user=request.user)
          orders=Order.objects.filter(user=request.user).exclude(status='completed')
 

          try:
            order=Order.objects.get(user=request.user ,id=kwargs['id'])
          except:
            raise PermissionDenied()

          return Response({'estimates':estimates,'orders':orders,'order':order})




class ReferralView(LoginRequiredMixin,APIView):
     
      renderer_classes = [TemplateHTMLRenderer]
      template_name = 'referral.html'
      

      def get(self, request, *args, **kwargs):

          estimates=Estimate.objects.filter(user=request.user)
          orders=Order.objects.filter(user=request.user).exclude(status='completed')
 

          try:
             profile=request.user.profile
          except:
             raise PermissionDenied()

          return Response({'estimates':estimates,'orders':orders,'profile':profile})



class SampleView(APIView):
     
      renderer_classes = [TemplateHTMLRenderer]
      template_name = 'sample.html'
      

      def get(self, request, *args, **kwargs):
          samples=Sample.objects.all()
          print(samples)
          return Response({'samples':samples})





