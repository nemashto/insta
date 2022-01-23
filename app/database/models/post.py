from ..db import db
from sqlalchemy.dialects import postgresql


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)
    userName = db.Column(db.String(40), nullable=True)
    profileImage = db.Column(db.String)
    photoUrl = db.Column(db.String, nullable=False)
    caption = db.Column(db.String(255))
    created_at = db.Column(db.DateTime)
    likes = db.Column('userslikes', postgresql.ARRAY(db.Integer))

    def to_dict(self):
        return {
            'id': self.id,
            'photoUrl': self.photoUrl,
            'caption': self.caption,
            'likes': len(self.likes),
            'userId': self.userId,
            'username': self.userName,
            'profileImage': self.profileImage,
        }
