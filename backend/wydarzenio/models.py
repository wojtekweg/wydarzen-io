from django_countries.fields import CountryField
from django.db import models
from django.core.validators import FileExtensionValidator

cracow_coords = {"lat": 50.049683, "long": 19.944544}


class Place(models.Model):
    name = models.CharField(max_length=128, unique=True)
    country = CountryField()
    lat = models.DecimalField(max_digits=9, decimal_places=6, default=cracow_coords["lat"])
    long = models.DecimalField(max_digits=9, decimal_places=6, default=cracow_coords["long"])

    def __str__(self) -> str:
        return self.name


class Event(models.Model):
    title = models.CharField(max_length=128, default="TBA")
    date = models.DateField(default="2000-01-01")
    description = models.TextField(max_length=1024, default="TBA")
    place = models.ForeignKey(Place, on_delete=models.CASCADE, default=1)
    is_active = models.BooleanField(default=True)
    picture = models.ImageField(
        upload_to="event/posters",
        blank=True,
        null=True,
        default=None)

    # TODO change default
    # TODO add server-side naming of files (so the file will have the ID instead of name)
    # TODO handle PUT of empty file

    def __str__(self) -> str:
        return f"{self.title} ({self.date})"


class EventFileImport(models.Model):
    file = models.FileField(
        upload_to="event/file_imports",
        null=False,
        blank=False,
        unique=True,
        validators=[FileExtensionValidator(['ics', 'json'])])
    upload_date = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.file.name


class Info(models.Model):
    ENG = 'Eng'
    PL = 'Pl'
    LANG = [
       (ENG, ('English')),
       (PL, ('Polish')),
    ]
    title = models.CharField(max_length=128)
    description = models.TextField(max_length=1024, default="")
    lang = models.CharField(
       max_length=5,
       choices=LANG,
       default=ENG)

    def __str__(self) -> str:
        return f"{self.title} [{self.lang}]"


class TechStackInfo(Info):
    icon = models.TextField(max_length=5012, default="")


class DesignPatternInfo(Info):
    iconPath = models.TextField(max_length=1024, default="")
    iconPath2 = models.TextField(max_length=1024, null=True, blank=True, default="")
