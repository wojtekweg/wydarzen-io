from django.contrib import admin
from .models import Event, EventFileImport, Place, ScrapperSingleton, DiscordChannel


class EventsAdmin(admin.ModelAdmin):
    list_display = ("title", "date", "place")


admin.site.register(Event)
admin.site.register(Place)
admin.site.register(EventFileImport)
admin.site.register(ScrapperSingleton)
admin.site.register(DiscordChannel)
