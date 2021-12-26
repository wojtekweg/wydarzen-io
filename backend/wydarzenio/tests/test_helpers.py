from django.test import TestCase

from ..models import Place
from ..helpers.helpers import get_or_create_place


class TestGetOrCreatePlace(TestCase):
    def setUp(self):
        self.place1 = Place.objects.create(
            name="A",
            country="PL",
            lat=0,
            long=0
        )
        self.place2 = Place.objects.create(
            name="D",
            country="USA",
            lat=10,
            long=10
        )

    def test_empty_arg_returns_first_place(self):
        self.assertEqual(get_or_create_place(None), self.place1)

    def test_invalid_arg_creates_place(self):
        get_or_create_place("ABSURD")
        self.assertEqual(len(Place.objects.all()), 3)

    def test_correct_arg_returns_place(self):
        a = get_or_create_place("A")
        self.assertEqual(a, self.place1)
        # it does not create new place
        self.assertEqual(len(Place.objects.filter(name="A")), 1)
