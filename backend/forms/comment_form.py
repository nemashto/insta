from flask_wtf import FlaskForm
from wtforms import StringField

from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    body = StringField('body', validators=[DataRequired()])
    user_id = StringField('user_id', validators=[DataRequired()])
    post_id = StringField('post_id', validators=[DataRequired()])
