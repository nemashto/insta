from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from email_validator import validate_email, EmailNotValidError
from backend.database import User


def user_exists(form, field):
    # checking if user exists via email
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def email_check(form, field):
    # checking if email is in correct form
    email = field.data

    try:
        validate_email(email)
    except EmailNotValidError as e:
        raise ValidationError(e)


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')
    if len(username) < 3 or len(username) > 32:
        raise ValidationError(
            'Username must be between 3 to 32 characters long.')


def password_check(form, field):
    symbols = '!@#$%^&*(),./?'
    password = field.data

    if len(password) < 8 or len(password) > 32:
        raise ValidationError(
            'Password must be between 8 to 32 characters long.')
    if not any(char for char in password if char in symbols):
        raise ValidationError(
            'Password must contain one of these following characters: !@#$%^&*(),./?')
    if not any(char for char in password if char.isupper()):
        raise ValidationError(
            'Pasword must contain one uppercase letter.')
    if not any(char for char in password if char.islower()):
        raise ValidationError(
            'Pasword must contain one lowercase letter.')
    if not any(char for char in password if char.isdecimal()):
        raise ValidationError(
            'Pasword must contain one number.')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[
                        DataRequired(), username_exists])
    fullname = StringField('fullname', validators=[
                        DataRequired()])
    email = StringField('email', validators=[
                        DataRequired(), user_exists, email_check])
    password = StringField('password', validators=[
                            DataRequired(), password_check])
    