# Running app

Open five terminals and run following commmands in each:

- `source myvenv/bin/activate && cd backend && ./manage.py runserver`

- `redis-server`

- `cd backend && celery -A wydarzenio worker -l info --logfile=celery.log --detach && celery -A wydarzenio beat -l info --logfile=celery.beat.log --detach`
  (omit `--logfile` and run each task individually to disable logging celery actions)

- `cd frontend && npm start`

- `./node_modules/.bin/cypress open`

Kill all Celery services and delete logs:

`kill -9 $(ps aux | grep celery | grep -v grep | awk '{print $2}' | tr '\n' ' ') > /dev/null 2>&1 | rm backend/celery.beat.log && rm backend/celery.log && rm backend/celerybeat-schedule.db`

# Backend

`cd backend`

`python3 -m venv myvenv`

`source myvenv/bin/activate`

`python3 -m pip install -r requirements.txt`

local superuser: admin / admin

## Install Redis

Redis is needed to use Celery, which is used for asynchronious features.

Install (following https://phoenixnap.com/kb/install-redis-on-mac ):

`curl -O http://download.redis.io/redis-stable.tar.gz`

`tar xzvf redis-stable.tar.gz`

`cd redis-stable && make`

`sudo make install`

Run it:

`redis-server`

Run Celery in another shell:

`celery -A wydarzenio worker -l info`

# Frontend

`npm install packages`

`npm start`

# UI tests

`./node_modules/.bin/cypress open`

# Sources

https://youtu.be/F5OUT3ijk8M - React basics

https://nickmccullum.com/celery-django-periodic-tasks/ - Celery setup for Django
