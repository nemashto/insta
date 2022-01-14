import os

from flask import Flask
from dotenv.main import load_dotenv
from flask_migrate import Migrate

from .config import Config
from .database import db, User
from .api.auth_routes import auth_routes
from flask_wtf.csrf import CSRFProtect, generate_csrf

load_dotenv('./.env')

# app setup
app = Flask(__name__)


app.config.from_object(Config)
app.register_blueprint(auth_routes, url_prefix='/api/auth')

#init db
db.init_app(app)
Migrate(app, db)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


