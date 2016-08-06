from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from app import db
from datetime import datetime


engine = create_engine('sqlite:///database.db', echo=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

# Set your classes here.

'''
class User(Base):
    __tablename__ = 'Users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True)
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(30))

    def __init__(self, name=None, password=None):
        self.name = name
        self.password = password
'''


class Message(Base):
    __tablename__ = 'Messages'

    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.String)
    timestamp = db.Column(db.DateTime, default= datetime.utcnow)
    text = db.Column(String)

    def __init__(self, sender, text):
        self.sender = sender
        self.text = text





# Create tables.
Base.metadata.create_all(bind=engine)
