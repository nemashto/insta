from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from backend.database import User


def user_exists(form, field):
    # checking if user exists via email
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Password or email was incorrect.')


def password_check(form, field):
    # checink if password passes
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password or email was incorrect.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[
                            DataRequired(), password_check])