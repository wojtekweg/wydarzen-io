from django_countries.fields import CountryField
from django.db import models
from django.core.validators import FileExtensionValidator
from datetime import datetime


class Place(models.Model):
    name = models.CharField(max_length=128, unique=True)
    country = CountryField()
    lat = models.DecimalField(max_digits=9, decimal_places=6, default=50.049683)  # default are the coords of Cracow
    long = models.DecimalField(max_digits=9, decimal_places=6, default=19.944544)
    picture = models.ImageField(
        upload_to="event/posters",
        blank=True,
        null=True,
        default=None)


    def __str__(self) -> str:
        return self.name


class DiscordChannel(models.Model):
    name = models.CharField(max_length=128)
    channel_url = models.CharField(max_length=256, unique=True)
    display_embed = models.BooleanField(default=True)


class Event(models.Model):
    title = models.CharField(max_length=128, default="TBA")
    date = models.DateField(default="2000-01-01")
    description = models.TextField(max_length=5096, default="TBA")
    place = models.ForeignKey(Place, on_delete=models.CASCADE, default=1)
    is_active = models.BooleanField(default=True)
    picture_can_be_updated = models.BooleanField(default=True)
    discord_subscription = models.ManyToManyField(
        DiscordChannel, 
        blank=True,
        default=None)
    picture = models.ImageField(
        upload_to="event/posters",
        blank=True,
        null=True,
        default=None)

    # TODO refactor picture upload logic:
    #   - change default
    #   - add server-side naming of files (so the file will have the ID instead of name)
    #   - handle PUT of empty file

    def __str__(self) -> str:
        return f"{self.title} ({self.date})"


class EventFileImport(models.Model):
    file = models.FileField(
        upload_to="event/file_imports",
        null=False,
        blank=False,
        unique=True,
        validators=[FileExtensionValidator(['ics', 'json', 'zip', 'md', 'csv'])])
    upload_date = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.file.name


class ScrapperSingleton(models.Model):
    last_call = models.DateTimeField()
    url = models.URLField(unique=False, blank=True, null=True)
    img_url = models.URLField(blank=True, null=True)
    was_successful = models.BooleanField(default=False)
    minutes_limit = models.IntegerField(default=30)

    def update_object(self, url, success=False):
        self.url = url
        self.last_call = datetime.now()
        self.was_successful = success
        new_limit = int(self.minutes_limit / 2)
        if not success and new_limit > 5:
            self.minutes_limit = new_limit
        elif success:
            self.minutes_limit = 30
        self.save()
