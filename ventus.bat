@echo off
if "%1"=="init" (
    python -m venv pyenv
    call pyenv\\Scripts\\activate.bat
    pip install -r requirements.txt
    pnpm -C gui install
) else if "%1"=="run" (
    if "%2"=="front" (
        pnpm -C gui run dev
    ) else if "%2"=="back" (
        call pyenv\\Scripts\\activate.bat
        python manage.py runserver 5000
    )
)else if "%1"=="update" (
    call pyenv\\Scripts\\activate.bat
    pip freeze > requirements.txt
)else if "%1"=="db" (
    call pyenv\\Scripts\\activate.bat
    python manage.py makemigrations
    python manage.py migrate
)else if "%1"=="build" (
    pnpm -C gui run build
)
else (
    echo "Usage: ventus.bat [init|run|update|clean]"
)
