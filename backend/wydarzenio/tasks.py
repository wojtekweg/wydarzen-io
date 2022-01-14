from __future__ import absolute_import, unicode_literals
import datetime
from celery import shared_task
from datetime import date, timedelta
from .models import Event
from .helpers.bs_script import save_img_by_query
import requests


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
    was_picture_updated = "(picture was not updated)"
    if event_to_update:
        save_img_by_query(event_to_update.title, output_dir='media/event/posters/')
        file_path = f'event/posters/{event_to_update.title}/Image_1.jpg'
        try:
            # if file opens, then it can be saved to model
            with open('media/' + file_path, "r"):
                pass
            event_to_update.picture = file_path
            print(f"Updated event {event_to_update.id} picture")
        except IOError:
            event_to_update.picture_can_be_updated = False
            print(f"Set event picture upload to False for {event_to_update.id}")
        finally:
            if event_to_update.picture_can_be_updated:
                was_picture_updated = "(picture was correctly updated)" 
            event_to_update.save()
    else:
        print("No events to update")
    print(f"Updated {event_to_update} object {was_picture_updated})")


@shared_task(name="discord_notify")
def send_discord_message_about_event():
    # TODO create observer to watch for all upcoming events and sent a message
    pass
