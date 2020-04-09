from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Count
from django.core.mail import EmailMessage

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import TemplateHTMLRenderer
from twilio.rest import Client
from datetime import datetime
from .models import LogReceiverEmail,Branding,MessageTemplate as MessageTemp,MessageLog
from .utils import get_client_ip

# Create your views here.



class SendMessage(APIView):
     


      def post(self, request, *args, **kwargs):

        
          print(request.data)
          # Your Account Sid and Auth Token from twilio.com/console
          # DANGER! This is insecure. See http://twil.io/secure
          account_sid = 'ACa6d615787928e4753a92c366f50821c5'
          auth_token = 'acb89bb8ad9e559e441cc1e4c6031bf8'
          sender_phn='+17634008472'  ###'+12019037428'


          meg_body=request.data.get('message_body')
          rec_phn=request.data.get('receiver')
          branding=request.data.get('branding')
          contract=request.data.get('contract')

          try:
             client = Client(account_sid, auth_token)

             message = client.messages \
                .create(
                     body='From '+branding+': '+meg_body,
                     from_=sender_phn,
                     to=rec_phn,
                 )

             tm=datetime.now().strftime("%Y-%m-%d %H:%M")
             #print('ip:'+ get_client_ip(request))
             log='Sent: '+tm+'\n'+'User name: '+request.user.get_full_name()+'\n'+'Contract: '+contract+'\n'+'Branding: '+request.data.get('branding')+'\n'+'Message:\n'+meg_body+'\n'+'Receiver: '+rec_phn+'\n'+'User ip:'+ get_client_ip(request)
             MessageLog.objects.create(log=log)

          except:
             return Response(data={'log':None,'status':'Error!Message not sent'})
          try:
              email_receiver=LogReceiverEmail.objects.all()[0]
              email = EmailMessage('Log: '+ rec_phn, log, to=[email_receiver.email])
              email.send()
              return Response(data={'log':log.replace('\n','<br>'),'status':'Message sent and log mailed'}, status=status.HTTP_200_OK)
          except:
              return Response(data={'log':log.replace('\n','<br>'),'status':'Message sent but log not mailed'}, status=status.HTTP_200_OK)




class MessageTemplate(APIView):
     
      renderer_classes = [TemplateHTMLRenderer]
      template_name = 'message.html'

      def get(self, request, *args, **kwargs):
          
          #log_receiver_email=LogReceiverEmail.objects.all()[0]
          branding=Branding.objects.all()
          message_template=MessageTemp.objects.all()


          return Response({'branding':branding,'message_template':message_template})



