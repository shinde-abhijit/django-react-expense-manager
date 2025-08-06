#!/bin/bash
echo "Running migrations"
python manage.py migrate --noinput

echo "Building Tailwind CSS"
python manage.py tailwind build

echo "Collecting staticfiles"
python manage.py collectstatic --noinput

echo "Starting gunicorn"
exec gunicorn server.wsgi:application --bind 0.0.0.0:8000 --workers 3

