from django.test import TestCase

from ..models import Event, Place


class TestViews(TestCase):
    def setUp(self):
        self.place = Place.objects.create(
            name="A",
            country="PL",
            lat=0,
            long=0
        )
        self.event = Event.objects.create(
            title="B",
            description="C",
            date="2022-01-01",
            place=self.place,
            is_active=True
        )
        self.place_false = Place.objects.create(
            name="D",
            country="USA",
            lat=10,
            long=10
        )
        self.event_false = Event.objects.create(
            title="D",
            description="E",
            date="1999-01-01",
            place=self.place_false,
            is_active=False
        )

    def test_qs_event_title(self):
        qs = Event.objects.filter(title="B")
        self.assertEqual(len(qs), 1)
        self.assertEqual(qs.first(), self.event)

    def test_qs_event_description(self):
        qs = Event.objects.filter(description="C")
        self.assertEqual(len(qs), 1)
        self.assertEqual(qs.first(), self.event)

    def test_qs_event_date(self):
        qs = Event.objects.filter(date="2022-01-01")
        self.assertEqual(len(qs), 1)
        self.assertEqual(qs.first(), self.event)

    def test_qs_event_place(self):
        qs = Event.objects.filter(place=self.place)
        self.assertEqual(len(qs), 1)
        self.assertEqual(qs.first(), self.event)

    def test_qs_event_active(self):
        qs = Event.objects.filter(is_active=True)
        self.assertEqual(len(qs), 1)
        self.assertEqual(qs.first(), self.event)

    def test_qs_place_name(self):
        qs = Place.objects.filter(name="A")
        self.assertEqual(len(qs), 1)
        self.assertEqual(qs.first(), self.place)

    def test_qs_place_country(self):
        qs = Place.objects.filter(country="PL")
        self.assertEqual(len(qs), 1)
        self.assertEqual(qs.first(), self.place)

    def test_qs_place_coords(self):
        qs = Place.objects.filter(lat=0, long=0)
        self.assertEqual(len(qs), 1)
        self.assertEqual(qs.first(), self.place)
