from rest_framework import viewsets
from rest_framework.decorators import action
from .serializers import EventSerializer, PlaceSerializer, EventFileImportSerializer
from .models import Event, Place, EventFileImport

class EventView(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()  # TODO: add start_date 

class PlaceView(viewsets.ModelViewSet):
    serializer_class = PlaceSerializer
    queryset = Place.objects.all()

class EventFileImportView(viewsets.ModelViewSet):
    serializer_class = EventFileImportSerializer
    queryset = EventFileImport.objects.all()

    @action(detail=True)
    def create_file(self, validated_data):
        print(validated_data)  # TODO add somewhere parsing of uploaded files - but where?
        print("IM IN")
        return 
