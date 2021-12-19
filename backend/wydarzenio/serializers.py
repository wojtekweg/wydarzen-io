from pathlib import Path
from rest_framework import serializers
from .models import Event, Place, EventFileImport

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
        # description = CharField(style={'type': 'textarea'})  # TODO make similar validator for file format

    def create(self, validated_data):
        event_file = EventFileImport.objects.create(**validated_data)
        if (Path(event_file.file.name).suffix == ".json"):
            with open(f"./media/{event_file}") as file:
                print(file)
        elif (Path(event_file.file.name).suffix == ".ics"):
            with open(f"./media/{event_file}") as file:
                print("NOT IMPLEMENTED YET")
                print(file)
        else:
            raise AttributeError("WRONG FILE IMPORT!")
        return event_file
