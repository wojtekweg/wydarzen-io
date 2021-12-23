from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile

from ..models import Event, Place


class TestEventModel(TestCase):
    def setUp(self) -> None:
        self.place = Place.objects.create()
        self.photo = SimpleUploadedFile("test_file.jpeg", b"file_content", content_type="image/jpeg")

    def test_can_be_created_without_args(self):
        Event.objects.create()
        self.assertEqual(len(Event.objects.all()), 1)

    def test_first_place_from_db_is_default(self):
        e = Event.objects.create()
        self.assertEqual(e.place.pk, 1)

    def test_has_str(self):
        e = Event.objects.create(title="A", date="2021-10-10")
        self.assertEqual(str(e), "A (2021-10-10)")

    def test_picture_is_stored(self):
        e = Event.objects.create(title="A", date="2021-10-10", picture=self.photo)
        self.assertIsNotNone(e.picture)


class TestEventModel(TestCase):
    def setUp(self) -> None:
        self.place = Place.objects.create()
        self.photo = SimpleUploadedFile("file.jpeg", b"file_content", content_type="image/jpeg")

    def test_can_be_created_without_args(self):
        Event.objects.create()
        self.assertEqual(len(Event.objects.all()), 1)

    def test_first_place_from_db_is_default(self):
        e = Event.objects.create()
        self.assertEqual(e.place.pk, 1)

    def test_has_str(self):
        e = Event.objects.create(title="A", date="2021-10-10")
        self.assertEqual(str(e), "A (2021-10-10)")

    def test_picture_is_stored(self):
        e = Event.objects.create(title="A", date="2021-10-10", picture=self.photo)
        self.assertIsNotNone(e.picture)

