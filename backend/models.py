from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Pet(Base):
    __tablename__ = 'pets'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    hunger = Column(Integer, default=100)
    cleanliness = Column(Integer, default=100)
    energy = Column(Integer, default=100)
    mood = Column(Integer, default=100)
