from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.authtoken.admin import User
from rest_framework.response import Response

from .serializers import EventSerializer, PlaceSerializer, EventFileImportSerializer, DiscordChannelSerializer, \
    UserSerializer
from .models import Event, Place, EventFileImport, DiscordChannel


class EventView(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()


class PlaceView(viewsets.ModelViewSet):
    serializer_class = PlaceSerializer
    queryset = Place.objects.all()


class EventFileImportView(viewsets.ModelViewSet):
    serializer_class = EventFileImportSerializer
    queryset = EventFileImport.objects.all()


class DiscordChannelView(viewsets.ModelViewSet):
    serializer_class = DiscordChannelSerializer
    queryset = DiscordChannel.objects.all()


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def retrieve(self, request, pk=None):
        user_ = User.objects.filter(username=pk).first()
        if user_:
            serializer = UserSerializer(user_)
            return Response(serializer.data)
        else:
            return Response({"error": "User not found"}, status=404)
