import pytest
from backend import create_app
from backend.database import db, User


@pytest.fixture(scope='module')
def new_user():
    user = User('patkennedy79@gmail.com', 'FlaskIsAwesome')
    return user

