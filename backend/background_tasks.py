from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Pet

def update_pet_states():
    db: Session = SessionLocal()
    try:
        pets = db.query(Pet).all()
        for pet in pets:
            pet.hunger = max(pet.hunger - 5, 0)
            pet.cleanliness = max(pet.cleanliness - 3, 0)
            pet.energy = max(pet.energy - 4, 0)
            db.add(pet)
        db.commit()
        print("Фоновое обновление прошло успешно.")
    except Exception as e:
        print(f"Ошибка фонового обновления: {e}")
    finally:
        db.close()

def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(update_pet_states, 'interval', seconds=10)
    scheduler.start()
