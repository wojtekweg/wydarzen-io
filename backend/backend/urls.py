from django.contrib import admin
from django.urls import path, include
from wydarzenio import views
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'events', views.EventView, 'event')
router.register(r'places', views.PlaceView, 'place')
router.register(r'eng/tech_stack_info', views.TechStackViewEng, 'eng/tech_stack_info')
router.register(r'eng/design_pattern_info', views.DesignPatternViewEng, 'eng/design_pattern_info')
router.register(r'pl/tech_stack_info', views.TechStackViewPl, 'pl/tech_stack_info')
router.register(r'pl/design_pattern_info', views.DesignPatternViewPl, 'pl/design_pattern_info')
router.register(r'event_file_upload', views.EventFileImportView, 'event_file_upload')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
