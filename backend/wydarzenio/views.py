from django.shortcuts import render
from rest_framework import viewsets
from .serializers import EventSerializer, PlaceSerializer
from .models import Event, Place

class EventView(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()  # TODO: add start_date 

class PlaceView(viewsets.ModelViewSet):
    serializer_class = PlaceSerializer
    queryset = Place.objects.all()
