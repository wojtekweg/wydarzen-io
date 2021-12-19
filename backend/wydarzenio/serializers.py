from pathlib import Path
from rest_framework import serializers
from icalendar import Calendar, Event
from .models import Event, Place, EventFileImport
from .helpers import get_or_create_place
import json
from datetime import datetime


class EventSerializer(serializers.ModelSerializer):
    place_name = serializers.SerializerMethodField(source='get_place_name')

    class Meta:
        model = Event
        fields = '__all__'

    def get_place_name(self, obj):
        return obj.place.name


class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ('id', 'name', 'country')


class EventFileImportSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventFileImport
        fields = ('id', 'file')

    def create(self, validated_data):
        event_file = EventFileImport.objects.create(**validated_data)
        events_list = []

        ############################
        #  DESIGN PATTERN: adapter #
        ############################
        if Path(event_file.file.name).suffix == ".json":
            # TODO support multievent json file upload
            with open(f"./media/{event_file}") as file:
                data = json.load(file)
                Event.objects.create(
                    title=data["title"],
                    date=data["date"],
                    description=data["description"],
                    place=Place.objects.get(pk=int(data["place"])),
                    is_cancelled=False
                )

        elif Path(event_file.file.name).suffix == ".ics":
            with open(f"./media/{event_file}") as file:
                gcal = Calendar.from_ical(file.read())
                for component in gcal.walk():
                    if component.name == "VEVENT":
                        # TODO for facebook, retrieve:
                        #  - URL
                        #  - organizer
                        #  - class:public
                        try:
                            events_list.append(Event.objects.create(
                                title=f"{component.get('summary')}",
                                date=component.get('dtstart').dt,
                                description=f"{component.get('description')}",
                                place=get_or_create_place(component.get('location')),
                                is_cancelled=False
                            ))
                        except TypeError as e:
                            print(f"HOWDY, WE GOT TYPERRROR: {e}")
        else:
            raise AttributeError("WRONG FILE IMPORT!")
        print(events_list)
        return event_file
