from flask import Blueprint, request, make_response
from app.forms import SignUpForm
from app.database import User

auth_routes = Blueprint('users', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessage = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessage.append(f'{field} : {error}')
    return errorMessage

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        return {'message': 'tested'}
        
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
  