from flask.cli import AppGroup
from .users import seed_users
from .posts import seed_posts


seed_command = AppGroup('seed')

@seed_command.command('all')
def seed():
    # seed_users()
    seed_posts()
