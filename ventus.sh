#!/bin/bash

if [ "$1" == "init" ]; then
    # Create Python virtual environment
    python3 -m venv pyenv
    source pyenv/bin/activate
    pip install -r requirements.txt
    # Install front-end dependencies
    pnpm -C gui install
elif [ "$1" == "run" ]; then
    if [ "$2" == "front" ]; then
        # Run front-end development server
        pnpm -C gui run dev
    elif [ "$2" == "back" ]; then
        # Activate Python virtual environment
        source pyenv/bin/activate
        # Run Django back-end server
        python3 manage.py runserver 5000
    else
        echo "Invalid option for 'run'. Use 'front' or 'back'."
    fi
elif [ "$1" == "update" ]; then
    # Update requirements.txt
    source pyenv/bin/activate
    pip freeze > requirements.txt
elif [ "$1" == "db" ]; then
    # Create database migrations
    source pyenv/bin/activate
    python3 manage.py makemigrations
    python3 manage.py migrate
elif [ "$1" == "build" ]; then
    sudo cp -r gui/dist /var/www/blog/
    sudo systemctl restart nginx
    uwsgi --ini uwsgi.ini
else
    echo "Usage: ventus.sh [init|run|update|db|build]"
fi
