from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.database import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/suggested')
@login_required
def getSuggestedProfiles():
    following = []
    following.append(current_user.id)
    users = User.query.filter(User.id.not_in(following)).all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>/follow/', methods=['POST'])
@login_required
def follow(id):
    user = User.query.get(id)
    user.follow()
    return jsonify(user.to_dict())
