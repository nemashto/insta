import os

from flask import Flask
from dotenv.main import load_dotenv
from flask_migrate import Migrate

from .config import Config
from .database import db, User

load_dotenv('./.env')

# app setup
app = Flask(__name__)
app.config.from_object(Config)

#init db
db.init_app(app)
Migrate(app, db)


