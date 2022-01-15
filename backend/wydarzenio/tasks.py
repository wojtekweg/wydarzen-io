from __future__ import absolute_import, unicode_literals
from celery import shared_task
from datetime import date, timedelta
from .models import Event
from .helpers.bs_script import save_img_from_bing


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
        was_picture_updated = save_img_from_bing(event_to_update)
    else:
        print("No events to update")
    print(f"Updated {event_to_update} object {was_picture_updated})")


@shared_task(name="discord_notify")
def send_discord_message_about_event():
    # TODO create observer to watch for all upcoming events and sent a message
    pass
