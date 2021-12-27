from pathlib import Path
from rest_framework import serializers
from icalendar import Calendar, Event
from .models import Event, Place, EventFileImport, TechStackInfo, DesignPatternInfo
from .helpers.helper_scripts import get_or_create_place
import json
from zipfile import ZipFile
from dateutil import parser


class EventSerializer(serializers.ModelSerializer):
    place_name = serializers.SerializerMethodField(source='get_place_name')
    date_iso = serializers.SerializerMethodField(source='get_place_name')

    class Meta:
        model = Event
        fields = '__all__'

    def get_place_name(self, obj):
        return obj.place.name

    def get_date_iso(self, obj):
        return obj.date.strftime('%Y-%d-%mT%H:%M')


class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ('id', 'name', 'country', 'lat', 'long')


class TechStackInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechStackInfo
        fields = '__all__'


class DesignPatternInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesignPatternInfo
        fields = '__all__'


class EventFileImportSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventFileImport
        fields = ('id', 'file')

    def create(self, validated_data):
        event_file = EventFileImport.objects.create(**validated_data)
        events_list = []

        # TODO move this logic somewhere else
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
                    is_active=True
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
                                is_active=True
                            ))
                        except TypeError as e:
                            print(f"HOWDY, WE GOT TYPERRROR: {e}")
        elif Path(event_file.file.name).suffix == ".zip":
            # here it is asserted that .zip file comes from Notion app and is having .md calendar
            # TODO rewrite it to be more flexible
            with ZipFile(f"./media/{event_file}", 'r') as zipObj:
                listOfFileNames = zipObj.namelist()
                for fileName in listOfFileNames:
                    if fileName.endswith('.md'):
                        zipObj.extract(fileName, 'media/event/file_imports/temp_md')
                        with open(f"media/event/file_imports/temp_md/{fileName}", 'r') as md_file:
                            lines = [line for line in md_file]
                            Event.objects.create(
                                title=lines[0][2:],
                                date=parser.parse(lines[2][6:]),
                                description="Imported from .csv",
                                is_active=True
                            )
        else:
            raise AttributeError("WRONG FILE IMPORT!")
        print(events_list)
        return event_file
