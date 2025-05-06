from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://tamagotchi_bd_user:VkQ9NqRgpNrBeZkziYISjvHT47INmLpy@dpg-d0cs28idbo4c73fpg40g-a/tamagotchi_bd"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()
