from datetime import datetime
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
        time_diff = (datetime.now() - self.posted)
        time_text = ''
        if (time_diff.days):
            time_diff = time_diff.days
            time_text = (str(round(time_diff, 1)) + ' days ago')
        elif ((time_diff.seconds / 60)/60 >= 1):
            time_diff = (time_diff.seconds / 60)/60
            time_text = (str(round(time_diff, 1)) + ' hours ago')
        elif ((time_diff.seconds / 60) >= 1):
            time_diff = (time_diff.seconds / 60)
            time_text = (str(round(time_diff, 1)) + ' minutes ago')
        else:
            time_diff = time_diff.seconds
            time_text = (str(round(time_diff, 1)) + ' seconds ago')

        print(time_diff)
        print(time_text)

        return {
            'id': self.id,
            'body': self.body,
            'postId': self.post_id,
            'userName': user.username,
            'profileImg': user.profileImage,
            'posted': time_text,
        }
