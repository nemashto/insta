from flask import Flask, request, make_response
from dotenv.main import load_dotenv
from flask_migrate import Migrate
from flask_cors import CORS
from flask_login import LoginManager
from flask_wtf.csrf import generate_csrf

from .config import Config
from .database import db, User, Post
from .seeds import seed_command

load_dotenv('./.env')


# app setup
def create_app(config_filename=None):
    app = Flask(__name__)
    app.config.from_object(Config)
    register_blueprint(app)
    initialize_extensions(app)
    return app


##########################
#### Helper Functions ####
##########################

def initialize_extensions(app):
    db.init_app(app)
    Migrate(app, db)
    app.cli.add_command(seed_command)
    login = LoginManager(app)
    login.login_view = 'auth.unauthorized'

    @login.user_loader
    def load_user(id):
        return User.query.get(int(id))

    CORS(app)
    cors = CORS(app, resource={
        r"/*": {
            "origins": "*"
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


def register_blueprint(app):
    from .api.auth_routes import auth_routes
    from .api.user_routes import user_routes
    from .api.post_routes import post_routes

    app.register_blueprint(auth_routes, url_prefix='/api/auth')
    app.register_blueprint(user_routes, url_prefix='/api/users')
    app.register_blueprint(post_routes, url_prefix='/api/posts')