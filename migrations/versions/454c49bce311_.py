"""empty message

Revision ID: 454c49bce311
Revises: 6ec21830c3bf
Create Date: 2022-01-24 17:17:10.208205

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '454c49bce311'
down_revision = '6ec21830c3bf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('posts', 'profileImage')
    op.drop_column('posts', 'userName')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('posts', sa.Column('userName', sa.VARCHAR(length=40), autoincrement=False, nullable=True))
    op.add_column('posts', sa.Column('profileImage', sa.VARCHAR(), autoincrement=False, nullable=True))
    # ### end Alembic commands ###