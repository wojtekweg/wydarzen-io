[![Cypress end-to-end](https://github.com/wojtekweg/wydarzen-io/actions/workflows/cypress.yml/badge.svg)](https://github.com/wojtekweg/wydarzen-io/actions/workflows/cypress.yml)

<img width="1830" alt="Screenshot 2022-01-16 at 19 21 36" src="https://user-images.githubusercontent.com/49337058/149787491-709187e7-30cd-4bbe-a822-38d26119eca3.png">

# Running app

Open five terminals and run following commmands in each:

- `source myvenv/bin/activate && cd backend && ./manage.py runserver`

- `redis-server`

- `cd backend && celery -A wydarzenio worker -l info --logfile=celery.log --detach && celery -A wydarzenio beat -l info --logfile=celery.beat.log --detach`
  (omit `--logfile` and run each task individually to disable logging celery actions)

- `cd frontend && npm start`

- `cd cypress && ./node_modules/.bin/cypress open`

Kill all Celery services and delete logs:

`kill -9 $(ps aux | grep celery | grep -v grep | awk '{print $2}' | tr '\n' ' ') > /dev/null 2>&1 | rm backend/celery.beat.log && rm backend/celery.log && rm backend/celerybeat-schedule.db`

# Installing app

## Backend

`cd backend`

`python3 -m venv myvenv`

`source myvenv/bin/activate`

`python3 -m pip install -r requirements.txt`

local superuser: admin / admin

backend test coverage: `coverage run --source='.' manage.py test wydarzenio && coverage report`

If macOS and having SSL problems, go to:
Macintosh HD > Applications > Python3.7 folder (or whatever version of python you're using) > double click on "Install Certificates.command" file. [Source](https://github.com/hardikvasa/google-images-download/issues/313#issuecomment-643300594)

### Install Redis

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

## Frontend

`cd frontend && npm install packages`

`npm start`

To interactive update of NPM packages:

`npm-check -u`

## UI tests

`npm install packages`

`./node_modules/.bin/cypress open`

# Sources

https://youtu.be/F5OUT3ijk8M - React basics

https://nickmccullum.com/celery-django-periodic-tasks/ - Celery setup for Django

https://tailblocks.cc/ - Ready Tailwind componnents

https://heroicons.com/ - SVG icons

https://primer.style/design/foundations/color - CSS guideline
