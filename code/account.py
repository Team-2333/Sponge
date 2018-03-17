from main import schema
from schema import User

db = schema.db


def registerUser(username, email, password, zipcode):
    user = User(username=username, email=email, password=password, zipcode=zipcode)
    try: 
        db.session.add(user)
        db.session.commit()
        return True
    except:
        db.session.rollback()
        return False


def loginUser(username, password):
    user = User.query.get(username)
    if user:
        if user.checkPassword(password):
            return 1
        return -1   # wrong password
    return 0    #user doesn't exist


def searchUser(username):
    user = User.query.get(username)
    if user:
        return schema.from_sql(user)
    return None


def deleteUser(username):
    try:
        User.query.filter_by(username=username).delete()
        db.session.commit()
        return True
    except:
        db.session.rollback()
        return False


'''
data: {attribute => value} for update
e.g. {'zipcode': '10027'}
'''
def updateUser(data, username):
    try:
        user = User.query.get(username)
        for k, v in data.items():
            setattr(user, k, v)
        return schema.from_sql(user)
    except Exception as e:
        print e
        db.session.rollback()
        return None