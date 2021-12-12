from django.contrib import admin
from django.urls import path, include
from wydarzenio import views
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'events', views.EventView, 'event')
router.register(r'places', views.PlaceView, 'palce')
router.register(r'event_file_upload', views.EventFileImportView, 'event_file_upload')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    # path('place/', include(router.urls)),
    # path('^event/(?P<event_id>\d+)/$', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
