from pathlib import Path

from django.shortcuts import get_object_or_404
from rest_framework.authtoken.admin import User
from rest_framework.response import Response

from .models import Event, Place, EventFileImport, DiscordChannel
from .helpers.file_parsers import parse_csv_to_event, parse_ics_to_event, parse_json_to_event, parse_zip_to_event
from .helpers.helper_scripts import send_discord_message_about_event
from rest_framework import serializers


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
        if len(instance.discord_subscription.all()) > 0:
            for channel in instance.discord_subscription.all():
                send_discord_message_about_event(channel.channel_url, instance, message=f"Your event was updated: {validated_data}")
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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'groups')
