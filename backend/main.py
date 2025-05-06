import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from database import engine, SessionLocal
from models import Base, Pet
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from background_tasks import start_scheduler

app = FastAPI()
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # подняться на уровень выше
static_dir = os.path.join(BASE_DIR, "frontend", "build", "static")
app.mount("/static", StaticFiles(directory=static_dir), name="static")
start_scheduler()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Укажите ваш фронтенд-домен
    allow_credentials=False,
    allow_methods=["*"],  # Разрешить все методы (GET, POST и т.д.)
    allow_headers=["*"],  # Разрешить все заголовки
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
@app.post("/pet")
def create_pet(pet_data: PetCreate, db: Session = Depends(get_db)):
    # Проверяем, существует ли питомец с таким device_id
    existing_pet = db.query(Pet).filter(Pet.device_id == pet_data.name).first()  # Используем device_id как имя для упрощения
    if existing_pet:
        return existing_pet  # Возвращаем уже существующего питомца
    
    # Создаем нового питомца
    pet = Pet(name=pet_data.name, device_id=pet_data.name)
    db.add(pet)
    db.commit()
    db.refresh(pet)
    return pet


@app.get("/pet/{device_id}")
def get_pet(device_id: str, db: Session = Depends(get_db)):
    pet = db.query(Pet).filter(Pet.device_id == device_id).first()  # Используем device_id
    if pet is None:
        raise HTTPException(status_code=404, detail="Pet not found")
    return pet


class PetUpdateRequest(BaseModel):
    name: str
    hunger: int
    cleanliness: int
    energy: int
    mood: int
    is_sleeping: bool

@app.put("/pet/{device_id}")
def update_pet(device_id: str, pet: PetUpdateRequest, db: Session = Depends(get_db)):
    db_pet = db.query(Pet).filter(Pet.device_id == device_id).first()  # Используем device_id
    if not db_pet:
        raise HTTPException(status_code=404, detail="Pet not found")
    
    # Обновление полей
    db_pet.name = pet.name
    db_pet.hunger = pet.hunger
    db_pet.cleanliness = pet.cleanliness
    db_pet.energy = pet.energy
    db_pet.mood = pet.mood
    db_pet.is_sleeping = pet.is_sleeping

    db.commit()
    db.refresh(db_pet)

    return db_pet


@app.get("/")
def root():
    return {"message": "API is running!"}

