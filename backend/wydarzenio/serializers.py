from django.db.models import fields
from rest_framework import serializers
from .models import Event, Place

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'title', 'date', 'place', 'is_cancelled')

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ('name', 'country')
