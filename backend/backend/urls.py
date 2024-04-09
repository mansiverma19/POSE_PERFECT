# """
# URL configuration for backend project.

# The `urlpatterns` list routes URLs to views. For more information please see:
#     https://docs.djangoproject.com/en/4.2/topics/http/urls/
# Examples:
# Function views
#     1. Add an import:  from my_app import views
#     2. Add a URL to urlpatterns:  path('', views.home, name='home')
# Class-based views
#     1. Add an import:  from other_app.views import Home
#     2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
# Including another URLconf
#     1. Import the include() function: from django.urls import include, path
#     2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
# """
from django.contrib import admin
from django.urls import path,include
from user.urls import user_router
from auth.urls import auth_router
from core.urls import core_router
from user.views import UserViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'UserProfile',UserViewSet,basename='Userprofile')
router.registry.extend(user_router.registry)
router.registry.extend(auth_router.registry)
router.registry.extend(core_router.registry)



urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include((router.urls, 'api'))),
]
