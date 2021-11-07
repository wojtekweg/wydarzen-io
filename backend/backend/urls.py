from django.contrib import admin
from django.urls import path, include
from wydarzenio import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'events', views.EventView, 'event')
router.register(r'places', views.PlaceView, 'palce')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]
