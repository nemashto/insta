from backend.database import User


def test_new_user():
    user = User(
        username='tester',
        fullname='robo tester',
        email='tester@test.com',
        password='P@ssw0rd'
    )
    assert user.email == 'tester@test.com'
    assert user.check_password('P@ssw0rd')
