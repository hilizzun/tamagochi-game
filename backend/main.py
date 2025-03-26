from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import engine, SessionLocal
from models import Base, Pet
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/pet")
def create_pet(name: str, db: Session = Depends(get_db)):
    pet = Pet(name=name)
    db.add(pet)
    db.commit()
    db.refresh(pet)
    return pet

@app.get("/pet/{id}")
def get_pet(id: int, db: Session = Depends(get_db)):
    return db.query(Pet).filter(Pet.id == id).first()

class PetUpdate(BaseModel):
    hunger: int
    cleanliness: int
    energy: int
    mood: int

@app.put("/pet/{id}")
def update_pet(id: int, pet_data: PetUpdate, db: Session = Depends(get_db)):
    pet = db.query(Pet).filter(Pet.id == id).first()
    if pet:
        pet.hunger = pet_data.hunger
        pet.cleanliness = pet_data.cleanliness
        pet.energy = pet_data.energy
        pet.mood = pet_data.mood
        db.commit()
        return pet
    return {"error": "Pet not found"}

