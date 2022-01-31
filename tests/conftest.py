import pytest
from flask.testing import FlaskClient as BaseFlaskClient
from flask import current_app, session
from flask_wtf.csrf import generate_csrf

from backend import create_app

class RequestShim(object):
    """
    A fake request that proxies cookie-related methods to a Flask test client.
    """
    def __init__(self, client):
        self.client = client
        self.vary = set({})

    def set_cookie(self, key, value='', *args, **kwargs):
        """Set the cookie on the Flask test client."""
        server_name = current_app.config['SERVER_NAME'] or 'localhost'
        return self.client.set_cookie(
            server_name, key=key, value=value, *args, **kwargs
        )

    def delete_cookie(self, key, *args, **kwargs):
        """Delete the cookie on the Flask test client."""
        server_name = current_app.config['SERVER_NAME'] or 'localhost'
        return self.client.delete_cookie(
            server_name, key=key, *args, **kwargs
        )


# We're going to extend Flask's built-in test client class, so that it knows
# how to look up CSRF tokens for you!
class FlaskClient(BaseFlaskClient):
    @property
    def csrf_token(self):
        # First, we'll wrap our request shim around the test client, so that
        # it will work correctly when Flask asks it to set a cookie.
        request = RequestShim(self)
        # Next, we need to look up any cookies that might already exist on
        # this test client, such as the secure cookie that powers `flask.session`,
        # and make a test request context that has those cookies in it.
        environ_overrides = {}
        self.cookie_jar.inject_wsgi(environ_overrides)
        with current_app.test_request_context(
                '/auth/login', environ_overrides=environ_overrides,
            ):
            # Now, we call Flask-WTF's method of generating a CSRF token...
            csrf_token = generate_csrf()
            # ...which also sets a value in `flask.session`, so we need to
            # ask Flask to save that value to the cookie jar in the test
            # client. This is where we actually use that request shim we made!
            current_app.session_interface.save_session(current_app, session, request)
            # And finally, return that CSRF token we got from Flask-WTF.
            return csrf_token

    # Feel free to define other methods on this test client. You can even
    # use the `csrf_token` property we just defined, like we're doing here!
    def login(self, username='test', password='test'):
        # use post_csrf instead of code of linked gist
        return self.post_csrf('/auth/login', username=username, password=password, remember_me=False)

    def logout(self):
        return self.get('/auth/logout', follow_redirects=True)

    # generic post with csrf_token to test all form submissions of my flask app
    def post_csrf(self, url, **kwargs):
        data = kwargs
        data['csrf_token'] = self.csrf_token

        return self.post(url, data=data, follow_redirects=True)


@pytest.fixture(scope='module')
def flask_app():
    app = create_app({'TESTING': True})
    with app.app_context():
        yield app


@pytest.fixture(scope='module')
def client(flask_app):
    app = flask_app
    ctx = flask_app.test_request_context()
    ctx.push()
    app.test_client_class = FlaskClient
    return app.test_client()
