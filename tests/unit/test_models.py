def test_index_page__not_found(client):
    res = client.get('/')
    assert res.status_code == 404


def test_index_page__logged_in(client):
    with client:
        res = client.post('api/auth/login', data=dict(
                email='demo@aa.io', 
                password='password'))
        assert res.status_code == 200