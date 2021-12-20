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

# Frontend

`npm install packages`

`npm start`

# UI tests

`./node_modules/.bin/cypress open`

# Sources

https://youtu.be/F5OUT3ijk8M @ 57:37
