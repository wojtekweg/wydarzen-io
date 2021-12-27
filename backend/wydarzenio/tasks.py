from __future__ import absolute_import, unicode_literals
from celery import shared_task
from datetime import date, timedelta
from .models import Event
from .helpers.bs_script import save_img_by_query


@shared_task(name="mark_as_inactive_DEBUG")
def mark_as_inactive():
    end_date = date.today()
    start_date = end_date - timedelta(days=2)  # two days for safety
    qs = Event.objects.filter(date__range=[start_date, end_date]).update(is_active=False)

    print(f"Updated {qs} objects")


@shared_task(name="schedule_download_img")
def fill_first_empty_image():
    event_to_update = Event.objects\
        .filter(picture_can_be_updated=True)\
        .filter(picture='')\
        .first()
    if event_to_update:
        save_img_by_query(event_to_update.title, output_dir='media/event/posters/')
        file_path = f'event/posters/{event_to_update.title}/Image_1.jpg'
        try:
            # if file opens, then it can be saved to model
            with open('media/' + file_path, "r"):
                pass
            event_to_update.picture = file_path
        except IOError:
            event_to_update.picture_can_be_updated = False
        finally:
            event_to_update.save()
    else:
        print("No events to update")
    print(f"Updated {event_to_update} object (was picture updated: {event_to_update.picture_can_be_updated})")
