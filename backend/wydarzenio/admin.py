from django.contrib import admin
from .models import DesignPatternInfo, Event, EventFileImport, Place, TechStackInfo


class EventsAdmin(admin.ModelAdmin):
    list_display = ("title", "date", "place")


admin.site.register(Event)
admin.site.register(Place)
admin.site.register(EventFileImport)
admin.site.register(TechStackInfo)
admin.site.register(DesignPatternInfo)
