from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import engine, SessionLocal
from models import Base, Pet
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from background_tasks import start_scheduler

app = FastAPI()
start_scheduler()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
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
class PetCreate(BaseModel):
    name: str

@app.post("/pet")
def create_pet(pet_data: PetCreate, db: Session = Depends(get_db)):
    pet = Pet(name=pet_data.name)
    db.add(pet)
    db.commit()
    db.refresh(pet)
    return pet

@app.get("/pet/{id}")
def get_pet(id: int, db: Session = Depends(get_db)):
    return db.query(Pet).filter(Pet.id == id).first()

class PetUpdateRequest(BaseModel):
    name: str
    hunger: int
    cleanliness: int
    energy: int
    mood: int

@app.put("/pet/{id}")
def update_pet(id: int, pet: PetUpdateRequest, db: Session = Depends(get_db)):
    print(f"Updating pet with ID {id}:", pet.dict())  # Логируем перед обновлением

    db_pet = db.query(Pet).filter(Pet.id == id).first()
    if not db_pet:
        raise HTTPException(status_code=404, detail="Pet not found")
    
    # Обновление полей
    db_pet.name = pet.name
    db_pet.hunger = pet.hunger
    db_pet.cleanliness = pet.cleanliness
    db_pet.energy = pet.energy
    db_pet.mood = pet.mood

    db.commit()
    db.refresh(db_pet)

    return db_pet

@app.get("/")
def root():
    return {"message": "API is running!"}

