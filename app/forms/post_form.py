from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Regexp


class PostForm(FlaskForm):
    photoUrl = StringField('Photo Url', validators=[
        DataRequired('URL is required'),
        Regexp('^(http|https):\/\/[\w.\-]+(\.[\w.\-]+)+.*$', 0,
            'URL must be a valid link')])
    caption = StringField('caption')
    userId = StringField('userId')
    userName = StringField('userName')
    profileImage = StringField('userProfilePic')
