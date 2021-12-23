import shutil

from django.core.exceptions import ValidationError
from django.test import TestCase, override_settings
from django.core.files.uploadedfile import SimpleUploadedFile

from ..models import Event, Place, EventFileImport

TEST_DIR = 'test_data'


class TestEventModel(TestCase):
    @override_settings(MEDIA_ROOT=(TEST_DIR + '/media'))
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

    def tearDown(self):
        try:
            shutil.rmtree(TEST_DIR)
        except OSError:
            pass


class TestPlaceModel(TestCase):
    def test_cannot_be_created_without_args(self):
        p = Place.objects.create()
        with self.assertRaises(ValidationError):
            p.full_clean()

    def test_has_str(self):
        p = Place.objects.create(name="A", country="PL")
        self.assertEqual(str(p), "A")


class TestEventFileImportModel(TestCase):
    @override_settings(MEDIA_ROOT=(TEST_DIR + '/media'))
    def test_cannot_be_created_without_args(self):
        f = EventFileImport.objects.create()
        with self.assertRaises(ValidationError):
            f.full_clean()

    def tearDown(self):
        try:
            shutil.rmtree(TEST_DIR)
        except OSError:
            pass

