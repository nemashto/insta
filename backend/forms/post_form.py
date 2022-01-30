from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class PostForm(FlaskForm):
    photoUrl = StringField('Photo Url', validators=[
        DataRequired('URL is required'),
        ])
    caption = StringField('caption', validators=[
        DataRequired('URL is required'),
        ])
    #userId = StringField('userId')
    #userName = StringField('userName')
    #profileImage = StringField('userProfilePic')
