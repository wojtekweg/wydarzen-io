from rest_framework import viewsets
from .serializers import EventSerializer, PlaceSerializer, EventFileImportSerializer, TechStackInfoSerializer, DesignPatternInfoSerializer
from .models import Event, Place, EventFileImport, TechStackInfo, DesignPatternInfo, Info


class EventView(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()  # TODO: add start_date 


class PlaceView(viewsets.ModelViewSet):
    serializer_class = PlaceSerializer
    queryset = Place.objects.all()


class TechStackViewEng(viewsets.ModelViewSet):
    serializer_class = TechStackInfoSerializer
    queryset = TechStackInfo.objects.filter(lang="Eng")


class TechStackViewPl(viewsets.ModelViewSet):
    serializer_class = TechStackInfoSerializer
    queryset = TechStackInfo.objects.filter(lang="Pl")


class DesignPatternViewEng(viewsets.ModelViewSet):
    serializer_class = DesignPatternInfoSerializer
    queryset = DesignPatternInfo.objects.filter(lang="Eng")


class DesignPatternViewPl(viewsets.ModelViewSet):
    serializer_class = DesignPatternInfoSerializer
    queryset = DesignPatternInfo.objects.filter(lang="Pl")


class EventFileImportView(viewsets.ModelViewSet):
    serializer_class = EventFileImportSerializer
    queryset = EventFileImport.objects.all()
