from ..db import db
from .user import User
from flask_login import current_user


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)
    photoUrl = db.Column(db.String, nullable=False)
    caption = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    likes = db.relationship(
        'User', lambda: likes_table,
        primaryjoin=lambda: Post.id == likes_table.c.postId,
        secondaryjoin=lambda: User.id == likes_table.c.userId,
        backref=db.backref('likes_table', lazy='dynamic'),
        lazy='dynamic',
        cascade='all, delete'
    )

    def like(self, user):
        self.likes.append(user)
        db.session.commit()

    def unlike(self, user):
        self.likes.remove(user)
        db.session.commit()

    def is_liking(self, id):
        return self.likes.filter(likes_table.c.userId == id).count() > 0

    def count_likes(self):
        count_likes = db.session.query(likes_table).filter(likes_table.c.postId == self.id).count()
        return count_likes

    def to_dict(self):
        user = User.query.filter(User.id == self.userId).first()
        return {
            'id': self.id,
            'photoUrl': self.photoUrl,
            'caption': self.caption,
            'likes': self.count_likes(),
            'isLiked': self.is_liking(current_user.id),
            'created_at': self.created_at,
            'userId': self.userId,
            'username': user.username,
            'profileImage': user.profileImage,
        }


likes_table = db.Table(
    'likes_table',
    db.Column('postId', db.Integer, db.ForeignKey(Post.id), primary_key=True),
    db.Column('userId', db.Integer,
              db.ForeignKey(User.id), primary_key=True),
)
