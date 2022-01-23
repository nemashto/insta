from app.database import db, Post
from app.forms.post_form import PostForm
from flask import Blueprint, jsonify, request, Flask
from flask_login import current_user, login_required


post_routes = Blueprint('posts', __name__)


@post_routes.route('/new/', methods=['POST'])
@login_required
def create_post():
    """
    Create post
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print(form.data)
        return {'message': 'ok'}, 200

    return jsonify(form.errors), 400
