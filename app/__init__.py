import os

from flask import Flask, request, make_response
from dotenv.main import load_dotenv
from flask_migrate import Migrate
from flask_cors import CORS
from flask_login import LoginManager

from .config import Config
from .database import db, User
from .api.auth_routes import auth_routes
from .api.user_routes import user_routes
from flask_wtf.csrf import CSRFProtect, generate_csrf

load_dotenv('./.env')

# app setup
app = Flask(__name__)


app.config.from_object(Config)
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(user_routes, url_prefix='/api/users')

#init db
db.init_app(app)
Migrate(app, db)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))

# Application Security
CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token', generate_csrf())
    return response

@app.after_request
def after_request_func(response):
        origin = request.headers.get('Origin')
        if request.method == 'OPTIONS':
            response = make_response()
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            response.headers.add('Access-Control-Allow-Headers', 'x-csrf-token')
            response.headers.add('Access-Control-Allow-Methods',
                                'GET, POST, OPTIONS, PUT, PATCH, DELETE')
            if origin:
                response.headers.add('Access-Control-Allow-Origin', origin)
        else:
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            if origin:
                response.headers.add('Access-Control-Allow-Origin', origin)

        response.set_cookie('csrf_token', generate_csrf())
        return response


