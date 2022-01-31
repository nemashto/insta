from backend.database import db, User


def seed_users():
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password',
        fullname='Marnie Eco', profileImage='https://i.imgur.com/YcP0tik.jpeg')

    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password',
        fullname='Bobbie Chloe', profileImage='https://i.imgur.com/I7Ul8TY.jpeg')

    Jylo = User(username='Jylo Mames', password='jylo', email='jylo@aol.com',
                fullname='Jylo Mames',
                followers=[bobbie],
                profileImage='https://i.imgur.com/p81Eh87.jpeg')

    srad = User(username='Srad Bimpson', password='srad', email='srad@aol.com',
                fullname='Bimpson Srad',
                followers=[bobbie, Jylo],
                profileImage='https://i.imgur.com/7wQ61EW.jpeg')

    alvin = User(username='Alvin The Programmer', password='alvin', email='arath@aol.com',
                fullname='John Alvin',
                followers=[bobbie, Jylo, srad],
                profileImage='https://i.imgur.com/JeJrTZr.jpeg')

    zark = User(username='Zark Muckerberg', password='zark', email='u1@aol.com',
                fullname='Zack Zuckerberg',
                followers=[bobbie, Jylo, srad, alvin])

    melon = User(username='Melon Eusk', password='melon', email='u2@aol.com',
                fullname='Meloun Duck',
                followers=[bobbie, Jylo, srad, alvin, zark],
                profileImage='https://i.imgur.com/F9Nf9Fx.jpeg')

    cark = User(username='Cark Muban', password='cark', email='u3@aol.com',
                fullname='Clark Muban',
                followers=[bobbie, Jylo, srad, alvin, zark, melon],
                profileImage='https://i.imgur.com/udaJG1y.jpeg')

    beff = User(username='Beff Jesoz', password='beff', email='u4@aol.com',
                followers=[bobbie, Jylo, srad, alvin, zark, melon,cark],
                fullname='Jeff Jesoz',
                profileImage='https://i.imgur.com/1fHjKze.jpeg')

    gill = User(username='Gill Bates', password='gill', email='u5@aol.com',
                fullname='Gill Batee',
                followers=[bobbie, Jylo, srad, alvin, zark, melon,cark, beff],
                profileImage='https://i.imgur.com/lb6j2Z5.jpeg')

    demo = User(
            username='Demo', email='demo@aa.io', password='password',
            fullname='Kapita Demo',
            followers=[bobbie, Jylo, srad, alvin, zark, melon, cark, beff, gill],
            profileImage='https://i.imgur.com/NQz9NDx.jpeg')

    db.session.add_all([marnie, bobbie, Jylo, srad, alvin, zark, melon, cark, beff, gill, demo])
    db.session.commit()
    