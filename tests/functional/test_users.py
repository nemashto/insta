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


def test_following():
    user0 = User(
        username='tester',
        fullname='robo tester',
        email='tester@test.com',
        password='P@ssw0rd'
    )
    user1 = User(
        username='tester1',
        fullname='robo tester1',
        email='tester1@test.com',
        password='P@ssw0rd1',
        followers=[user0]
    )

    following1 = user1.get_following()
    following0 = user0.get_following()
    assert len(following1) == 1
    assert len(following0) == 0
