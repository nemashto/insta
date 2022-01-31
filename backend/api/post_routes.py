from backend.database import db, Post, User
from backend.forms.post_form import PostForm
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required


post_routes = Blueprint('posts', __name__)


@post_routes.route('/', methods=['GET'])
@login_required
def get_posts():
    """
    Gets all posts
    """
    following = []
    following.append(current_user.id)
    following.extend([user['id'] for user in current_user.get_following()])
    posts = Post.query.order_by(Post.created_at.desc()).filter(Post.userId.in_(following)).all()
    return jsonify([post.to_dict() for post in posts])


@post_routes.route('/u/<int:id>', methods=['GET'])
@login_required
def get_user_posts(id):
    """
    Gets only one user posts
    """
    posts = Post.query.order_by(Post.created_at.desc()).filter(Post.userId == id).all()
    return jsonify([post.to_dict() for post in posts])


@post_routes.route('/new', methods=['POST'])
@login_required
def create_post():
    """
    Create post
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print(form.data)
        post = Post(
            userId=current_user.id,
            photoUrl=form.data['photoUrl'],
            caption=form.data['caption'],
        )
        db.session.add(post)
        db.session.commit()
        print(post.to_dict())
        return post.to_dict()

    return jsonify(form.errors), 400


@post_routes.route('<int:post_id>/like', methods=['GET'])
@login_required
def update_post_like(post_id):
    try:
        post = Post.query.get(post_id)
    except KeyError:
        return {'error': 'User or Post not exist'}, 400
    if post.is_liking(current_user.id):
        post.unlike(current_user)
        return {'message': 'unlike'}, 200
    else:
        post.like(current_user)
        return {'message': 'like'}, 200
