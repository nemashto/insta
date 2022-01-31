import pytest
from backend import create_app


@pytest.fixture(scope='module')
def test_client():
    flask_app = create_app()

    with flask_app.test_client() as test_client:
        with flask_app.app_context():
            yield test_client
