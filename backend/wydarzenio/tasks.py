from __future__ import absolute_import, unicode_literals
from celery import shared_task
from datetime import date, timedelta
from .models import Event


@shared_task(name = "mark_as_inactive")  # run every 12hours
def mark_as_inactive():
  enddate = date.today()
  startdate = enddate - timedelta(days=2)  # two days for safety
  qs = Event.objects.filter(date__range=[startdate, enddate]).update(is_active=False)

  print(f"Updated {qs} objects")
