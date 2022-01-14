from ..db import db
from flask_login import UserMixin



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profileImage=db.Column( db.String, default='https://i.imgur.com/5t6f2uX.jpeg',nullable=False)