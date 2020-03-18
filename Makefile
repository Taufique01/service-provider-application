
#.PHONY: virtual install build-requirements black isort flake8

venv:env/bin/pip
	
env/bin/pip:
	python3 -m venv env

develop:venv
	env/bin/pip install -r requirements.txt
	env/bin/python manage.py migrate
serve:venv
	env/bin/gunicorn -p app.pid --bind 0.0.0.0:8001 webapi.wsgi --daemon #first upload a working test app to start the server

deploy:develop
	env/bin/python manage.py collectstatic  --noinput #--clear
	kill -HUP 11317 #$( cat app.pid )
	echo "Deploy successful"
