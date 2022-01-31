from flask.cli import AppGroup
from .users import seed_users


seed_command = AppGroup('seed')

@seed_command.command('all')
def seed():
    seed_users()
