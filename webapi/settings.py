"""
Django settings for webapi project.

Generated by 'django-admin startproject' using Django 2.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
##local development
#BASE_URL='http://127.0.0.1:8000'
###staging
BASE_URL='http://192.243.100.74'

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = ')=m63ldv543c1q!d7e1mlt)x8a_o1nu*f#x-f+ny#8k(xk7s$q'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost','127.0.0.1','192.243.100.74','www.fivethree.pro','fivethree.pro']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'zillowAPI',
    'search',
    'message',
#####django allauth###########
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
####calculator##########
    'phone_field',
    
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'webapi.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
          BASE_DIR + '/templates/',
         ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',


                

            ],
            'libraries':{
                      'calculator': 'search.templatetags.calculator',

            },
        },
    },
]

WSGI_APPLICATION = 'webapi.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'staticfiles'),#to look for static files
)
#STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'





####################Allauth registration#########
SITE_ID = 1
ACCOUNT_ADAPTER = 'search.account_adapter.NoNewUsersAccountAdapter'


LOGIN_REDIRECT_URL='/'
ACCOUNT_LOGOUT_REDIRECT_URL='/accounts/login'
ACCOUNT_AUTHENTICATED_LOGIN_REDIRECTS =True
ACCOUNT_AUTHENTICATION_METHOD ="username"
ACCOUNT_CONFIRM_EMAIL_ON_GET =False
#ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL =BASE_URL
#ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL =BASE_URL+'/accounts/login'
#ACCOUNT_EMAIL_CONFIRMATION_EXPIRE_DAYS (=3)
ACCOUNT_EMAIL_REQUIRED =True
ACCOUNT_EMAIL_VERIFICATION='mandatory'
#ACCOUNT_EMAIL_SUBJECT_PREFIX (=”[Site] “)
#ACCOUNT_DEFAULT_HTTP_PROTOCOL (=”http”)
#ACCOUNT_LOGIN_ATTEMPTS_LIMIT (=5)
#ACCOUNT_LOGIN_ATTEMPTS_TIMEOUT (=300)
#ACCOUNT_LOGIN_ON_EMAIL_CONFIRMATION =True
#ACCOUNT_LOGOUT_ON_PASSWORD_CHANGE =True
#ACCOUNT_LOGIN_ON_PASSWORD_RESET =True
#ACCOUNT_SESSION_REMEMBER= True
#ACCOUNT_USER_DISPLAY (=a callable returning user.username)
ACCOUNT_USERNAME_REQUIRED=True


####EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
#Email backend settings for Django
#For less apps
###https://l.facebook.com/l.php?u=https%3A%2F%2Fmyaccount.google.com%2Flesssecureapps%3Fpli%3D1%26fbclid%3DIwAR2CL_EvS0257JaBsqcIGK47_5EHxSaw1ZQMk2h9-R3laFTvsA8j9LiUNOw&h=AT3bkopboKv9FC-NRSloYitPDjXJuutczWQYT8kAt6GnU9F4CT9k35W_T75UX-DW0neaCl0YuO36C38uvfX492HiRRNDrJCcpSADz4c57njDKJSNRoW4O0Nq0l7QaQ
####
# Email backend settings for Django
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend' # 'django.core.mail.backends.console.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
##put yours email
EMAIL_HOST_USER = 'th.rafi9z@gmail.com'
##put your password
EMAIL_HOST_PASSWORD = 'rafi9zce14006'
EMAIL_PORT = 587
EMAIL_USE_TLS = True












