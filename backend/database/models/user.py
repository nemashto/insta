from ..db import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    fullname = db.Column(db.String(60))
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profileImage = db.Column(db.String, default='https://i.imgur.com/5t6f2uX.jpeg', nullable=False)

    followers = db.relationship(
        'User', lambda: user_following,
        primaryjoin=lambda: User.id == user_following.c.userId,
        secondaryjoin=lambda: User.id == user_following.c.followingId,
        backref=db.backref('user_following', lazy='dynamic'),
        lazy='dynamic',
        cascade='all, delete'
    )

    def follow(self, user):
        self.followers.append(user)
        db.session.commit()

    def unfollow(self, user):
        self.followers.remove(user)
        db.session.commit()

    def is_following(self, id):
        return self.followers.filter(user_following.c.followingId == id).count() > 0

    def get_followers(self):
        followers = db.session.query(user_following).filter(user_following.c.followingId == self.id).count()
        return followers

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def get_following(self):
        return [user.to_dict_following() for user in self.followers]

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'fullname': self.fullname,
            'email': self.email,
            'profileImage': self.profileImage,
        }

    def to_dict_following(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profileImage':self.profileImage,
        }


user_following = db.Table(
    'user_following',
    db.Column('userId', db.Integer, db.ForeignKey(User.id), primary_key=True),
    db.Column('followingId', db.Integer,
              db.ForeignKey(User.id), primary_key=True),
)
