from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.database import db, User

user_routes = Blueprint('users', __name__)


@user_routes.route('/suggested')
@login_required
def getSuggestedProfiles():
    followers = []
    followers.append(current_user.id)
    followers.extend([user['id'] for user in current_user.get_followers()])
    users = User.query.filter(User.id.not_in(followers)).all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>/follow', methods=['GET'])
@login_required
def follow(id):
    try:
        user = User.query.get(id)
    except KeyError:
        return {'error': 'User id not exist'}, 400
    current_user.follow(user)
    db.session.commit()

    return current_user.to_dict()
