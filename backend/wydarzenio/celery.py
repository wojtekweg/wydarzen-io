from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks(settings.INSTALLED_APPS)


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))


app.conf.beat_schedule = {
    # Scheduler Name
    'mark-as-inactive-every-12hours': {
        # Task Name (Name Specified in Decorator)
        'task': 'mark_as_inactive',
        # Schedule      
        'schedule': 12 * 60 * 60 * 60 * 1.0,
    },
    'mark-as-inactive-every-ten-seconds': {
        # Task Name (Name Specified in Decorator)
        'task': 'mark_as_inactive_DEBUG',
        # Schedule      
        'schedule': 10 * 1.0,
        # Function Arguments 
        # 'args': ("Hello",) 
    },
}
