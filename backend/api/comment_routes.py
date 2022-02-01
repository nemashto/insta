from backend.database import db, Comment
from backend.forms import CommentForm
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/new', methods=['POST'])
@login_required
def create_comment():
    """
    Create comment
    """
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            body=form.data['body'],
            post_id=form.data['post_id'],
            user_id=form.data['user_id']
        )
        db.session.add(comment)
        db.session.commit()

        return {'message': 'ok'}, 200

    return jsonify(form.errors), 400