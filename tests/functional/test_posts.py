from backend.database import Post, User


def test_new_post():
    user = User(
        username='tester',
        fullname='robo tester',
        email='tester@test.com',
        password='P@ssw0rd'
    )
    post = Post(userId=user.id, photoUrl='https://i.imgur.com/ykR5kzJ.png',
                caption='TEST')
    assert post.caption == 'TEST'
    assert post.userId == user.id
