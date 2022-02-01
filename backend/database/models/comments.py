from ..db import db
from .user import User


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer(), primary_key=True)
    body = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer(), db.ForeignKey('posts.id'))
    posted = db.Column(db.DateTime, default=db.func.current_timestamp())

    def to_dict(self):
        user = User.query.get(self.user_id)
        return {
            'id': self.id,
            'body': self.body,
            'postId': self.postId,
            'userName': user.userName,
            'profileImg': user.profileImg,
            'posted': self.posted,
        }
