#!/bin/bash

if [ "$1" == "init" ]; then
    # Create Python virtual environment
    python -m venv pyenv
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
        python manage.py runserver 5000
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
    python manage.py makemigrations
    python manage.py migrate
else
    echo "Usage: ventus.sh [init|run|update|db]"
fi
