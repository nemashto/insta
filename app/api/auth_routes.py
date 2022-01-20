from flask import Blueprint, request, make_response
from flask_login import login_user, logout_user
from app.forms import SignUpForm
from app.database import User


auth_routes = Blueprint('users', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessage = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessage[field] = error
    return errorMessage

@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        login_user(user)
        return user.to_dict()
        
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
  