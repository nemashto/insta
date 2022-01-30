from curses.ascii import US
from flask import Blueprint
from flask_login import login_required, current_user
from backend.database import db, User

user_routes = Blueprint('users', __name__)


@user_routes.route('/<name>')
@login_required
def user(name):
    user = User.query.filter_by(username=name).first()
    return user.to_dict()


@user_routes.route('/suggested')
@login_required
def getSuggestedProfiles():
    # pošle pouze uživatele, co nejsou current_user nebo jeho followers
    following = []
    following.append(current_user.id)
    following.extend([user['id'] for user in current_user.get_following()])
    users = User.query.filter(User.id.not_in(following)).all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>/following', methods=['GET'])
@login_required
def getFollowingProfiles(id):
    user = User.query.get(id)
    return {'following': user.get_following()}, 200


@user_routes.route('/<int:id>/follow', methods=['GET'])
@login_required
def follow(id):
    try:
        user = User.query.get(id)
    except KeyError:
        return {'error': 'User id not exist'}, 400
    current_user.follow(user)
    db.session.commit()


@user_routes.route('/<int:id>/isfollowing', methods=['GET'])
@login_required
def isfollowing(id):
    return {'isFollowing': current_user.is_following(id)}, 200
