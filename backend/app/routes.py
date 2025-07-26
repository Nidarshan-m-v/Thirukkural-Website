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
    # Step 1: Get the Kural by global number directly
    kural = db.query(Kural).filter(Kural.kural_number == kural_number).first()
    if not kural:
        raise HTTPException(status_code=404, detail="Kural not found")

    # Step 2: Ensure it belongs to the given chapter
    link = db.query(Thirukkural).filter(
        Thirukkural.kural_id == kural.id,
        Thirukkural.chapter_id == chapter_id
    ).first()
    if not link:
        raise HTTPException(status_code=404, detail="Kural does not belong to this chapter")

    # Step 3: Get Meaning
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

@router.get("/chapter/{chapter_id}/range")
def get_kural_range_by_chapter(chapter_id: int, db: Session = Depends(get_db)):
    # Get all kural_ids for the given chapter
    kural_links = db.query(Thirukkural.kural_id).filter(Thirukkural.chapter_id == chapter_id).all()

    if not kural_links:
        raise HTTPException(status_code=404, detail="Chapter not found or has no Kurals")

    # Extract kural_ids as list
    kural_ids = [k.kural_id for k in kural_links]

    # Get the kural numbers for these IDs
    kural_numbers = (
        db.query(Kural.kural_number)
        .filter(Kural.id.in_(kural_ids))
        .order_by(Kural.kural_number.asc())
        .all()
    )

    if not kural_numbers:
        raise HTTPException(status_code=404, detail="No Kurals found for the chapter")

    start_kural = kural_numbers[0][0]
    end_kural = kural_numbers[-1][0]

    return {"start_kural": start_kural, "end_kural": end_kural}

@router.get("/chapter/{chapter_id}/count")
def get_kural_count(chapter_id: int, db: Session = Depends(get_db)):
    count = db.query(Thirukkural).filter(Thirukkural.chapter_id == chapter_id).count()
    return {"count": count}

@router.get("/chapter/{chapter_id}/start")
def get_first_kural_number(chapter_id: int, db: Session = Depends(get_db)):
    result = db.query(Thirukkural.kural_id)\
               .filter(Thirukkural.chapter_id == chapter_id)\
               .order_by(Thirukkural.kural_id.asc())\
               .first()
    if not result:
        raise HTTPException(status_code=404, detail="Chapter not found")
    return {"first_kural_number": result[0]}


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
