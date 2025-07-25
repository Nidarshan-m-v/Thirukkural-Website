from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .database import SessionLocal
from .models import Kural
from .schemas import KuralSchema
from fastapi import HTTPException
from .models import Thirukkural, Chapter, Kural, Meaning


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/kurals/{kural_number}", response_model=KuralSchema)
def read_kural(kural_number: int, db: Session = Depends(get_db)):
    return db.query(Kural).filter(Kural.kural_number == kural_number).first()


@router.get("/chapter/{chapter_id}/kural/{kural_number}")
def get_kural_by_chapter_and_number(chapter_id: int, kural_number: int, db: Session = Depends(get_db)):
    # Step 1: Look up Thirukkural entry linking chapter and kural
    link = db.query(Thirukkural).join(Kural, Thirukkural.kural_id == Kural.id)\
        .filter(Thirukkural.chapter_id == chapter_id, Kural.kural_number == kural_number).first()

    if not link:
        raise HTTPException(status_code=404, detail="Kural not found for this chapter")

    # Step 2: Get Kural data
    kural = db.query(Kural).filter(Kural.id == link.kural_id).first()
    if not kural:
        raise HTTPException(status_code=404, detail="Kural not found")

    # Step 3: Get Meaning (by kural_id)
    meaning = db.query(Meaning).filter(Meaning.kural_id == kural.id).first()
    if not meaning:
        raise HTTPException(status_code=404, detail="Meaning not found")

    return {
        "kural_number": kural.kural_number,
        "kural_tamil": [kural.kural_tamil_line1, kural.kural_tamil_line2],
        "kural_english": [kural.kural_english_line1, kural.kural_english_line2],
        "meaning_tamil": meaning.meaning_tamil,
        "meaning_english": meaning.meaning_english
    }

@router.get("/chapter/{chapter_id}/count")
def get_kural_count(chapter_id: int, db: Session = Depends(get_db)):
    count = db.query(Thirukkural).filter(Thirukkural.chapter_id == chapter_id).count()
    return {"count": count}


@router.get("/chapters/{chapter_id}")
def get_chapter(chapter_id: int, db: Session = Depends(get_db)):
    chapter = db.query(Chapter).filter(Chapter.c_id == chapter_id).first()
    if not chapter:
        raise HTTPException(status_code=404, detail="Chapter not found")
    return {
        "c_id": chapter.c_id,
        "chapter_tamil": chapter.chapter_tamil,
        "chapter_english": chapter.chapter_english
    }
