from pathlib import Path
from rest_framework import serializers
from .models import Event, Place, EventFileImport, DiscordChannel
from .helpers.file_parsers import parse_csv_to_event, parse_ics_to_event, parse_json_to_event, parse_zip_to_event


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

    def update(self, instance, validated_data):
        print(validated_data)
        print("DUPPPPPAA")  
        # TODO observer notify the discord channel about the update
        if hasattr(validated_data, 'add_discord_subscription'):
            print("WE GOT HERE WITH")
            print(validated_data.add_discord_subscription)
            pass
        return super().update(instance, validated_data)


class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ('id', 'name', 'country', 'lat', 'long', 'picture')


class DiscordChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscordChannel
        fields = '__all__'


class EventFileImportSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventFileImport
        fields = ('id', 'file')

    def create(self, validated_data):
        event_file = EventFileImport.objects.create(**validated_data)
        events_list = []

        if Path(event_file.file.name).suffix == ".json":
            events_list.append(parse_json_to_event(event_file))
        elif Path(event_file.file.name).suffix == ".ics":
            events_list = parse_ics_to_event(event_file)
        elif Path(event_file.file.name).suffix == ".zip":
            events_list = parse_zip_to_event(event_file)
        elif Path(event_file.file.name).suffix == ".csv":
            events_list = parse_csv_to_event(event_file)
        else:
            raise AttributeError("WRONG FILE IMPORT!")
        print(f"created {len(events_list)} events")
        return event_file
