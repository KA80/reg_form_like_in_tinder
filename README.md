# *Registration form*

### Made on Vue & Django

#### Install dependencies
````
$ cd frontend

$ npm install -g @vue/cli

$ npm install pug --save-dev

$ npm install axios vue-axios --save

$ npm install vuex --save
````

#### Install python packages
````
$ cd backend

$ pip install django djangorestframework django-cors-headers
````

#### Make migrations 
````
$ python backend/manage.py makemigrations

$ python backend/manage.py migrate
````

#### Launch server
````
$ python backend/manage.py runserver

$ npm run --prefix frontend serve
````