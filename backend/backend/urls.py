"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include,re_path
from api.views import CreateUserView


urlpatterns = [
    path('admin/', admin.site.urls),

    # path for social login
    re_path(r'^auth/', include('drf_social_oauth2.urls', namespace='drf')),
     
    # just for showing different way of link a url to a view
    path("api/user/register/", CreateUserView.as_view(), name="register"),  
    
    # the urls which is pre bulid by rest_framework including login and logout
    # however might not be needed in this proj
    # path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls"))
]
