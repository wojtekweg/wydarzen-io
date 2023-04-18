from django.contrib import admin
from django.urls import path, include
from wydarzenio import views
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken import views as auth_views
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view


router = routers.DefaultRouter()
router.register(r'events', views.EventView, 'event')
router.register(r'places', views.PlaceView, 'place')
router.register(r'event_file_upload', views.EventFileImportView, 'event_file_upload')
router.register(r'discord_channels', views.DiscordChannelView, 'discord_channels')
router.register(r'users', views.UserView, 'user')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-token-auth/', auth_views.obtain_auth_token),
    path('swagger-ui/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url':'openapi-schema'}
    ), name='swagger-ui'),
    path('openapi', get_schema_view(
        title="wydarzen.io",
        description="Backend API",
        version="1.0.0"
    ), name='openapi-schema'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
