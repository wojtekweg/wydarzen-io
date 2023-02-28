from django.contrib import admin
from django.urls import path, include
from wydarzenio import views
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken import views as auth_views

router = routers.DefaultRouter()
router.register(r'events', views.EventView, 'event')
router.register(r'places', views.PlaceView, 'place')
router.register(r'event_file_upload', views.EventFileImportView, 'event_file_upload')
router.register(r'discord_channels', views.DiscordChannelView, 'discord_channels')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-token-auth/', auth_views.obtain_auth_token),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
