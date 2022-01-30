from ..db import db
from .user import User
from sqlalchemy.dialects import postgresql


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)
    photoUrl = db.Column(db.String, nullable=False)
    caption = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    likes = db.Column('userslikes', postgresql.ARRAY(db.Integer))

    def to_dict(self):
        user = User.query.filter(User.id == self.userId).first()
        return {
            'id': self.id,
            'photoUrl': self.photoUrl,
            'caption': self.caption,
            'likes': self.likes,
            'created_at': self.created_at,
            'userId': self.userId,
            'username': user.username,
            'profileImage': user.profileImage,
        }
