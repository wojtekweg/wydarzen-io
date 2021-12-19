from pathlib import Path
from rest_framework import serializers
from .models import Event, Place, EventFileImport
import json

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

        # DESIGN PATTERN: adapter
        if (Path(event_file.file.name).suffix == ".json"):
            with open(f"./media/{event_file}") as file:
                data = json.load(file)
                Event.objects.create(
                    title = data["title"], 
                    date = data["date"], 
                    description = data["description"],
                    place = Place.objects.get(pk=int(data["place"])),
                    is_cancelled = False
                    )
        elif (Path(event_file.file.name).suffix == ".ics"):
            # TODO parse .ics files
            with open(f"./media/{event_file}") as file:
                print("NOT IMPLEMENTED YET")
                print(file)
        else:
            raise AttributeError("WRONG FILE IMPORT!")
        return event_file
