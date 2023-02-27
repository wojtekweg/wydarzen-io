from rest_framework import viewsets
from .serializers import EventSerializer, PlaceSerializer, EventFileImportSerializer, DiscordChannelSerializer, LoginSerializer
from .models import Event, Place, EventFileImport, DiscordChannel
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated


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


# class LoginView(views.APIView):
#     # This view should be accessible also for unauthenticated users.
#     permission_classes = (permissions.AllowAny,)

#     def post(self, request, format=None):
#         serializer = LoginSerializer(data=self.request.data, context={ 'request': self.request })
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']
#         # login(request, user)
#         return response.Response(None, status=response.HTTP_202_ACCEPTED)

