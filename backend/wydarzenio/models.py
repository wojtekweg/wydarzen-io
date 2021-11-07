from django_countries.fields import CountryField
from django.db import models

cracow_coords = {"lat": 50.049683, "long": 19.944544}

class Place(models.Model):
    name = models.CharField(max_length=128)
    country = CountryField()
    lat  = models.DecimalField(max_digits=9, decimal_places=6, default=cracow_coords["lat"])
    long = models.DecimalField(max_digits=9, decimal_places=6, default=cracow_coords["long"])

    def __str__(self) -> str:
        return self.name

class Event(models.Model):
    title = models.CharField(max_length=128)
    date = models.DateField()
    decription = models.TextField(max_length=1024)
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    is_cancelled = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.title} ({self.date})"



