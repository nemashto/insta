from app.database import db, Post
from app.forms.post_form import PostForm
from flask import Blueprint, jsonify, request, Flask
from flask_login import current_user, login_required
from datetime import datetime


post_routes = Blueprint('posts', __name__)


@post_routes.route('/', methods=['GET'])
@login_required
def get_posts():
    """
    Gets all posts
    """
    posts = Post.query.order_by(Post.created_at.desc()).all()
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
