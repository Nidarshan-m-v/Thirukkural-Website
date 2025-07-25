from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Chapter

router = APIRouter()

@router.get("/chapters")
def get_all_chapters(db: Session = Depends(get_db)):
    chapters = db.query(Chapter).order_by(Chapter.c_id.asc()).all()
    return [
        {
            "c_id": chapter.c_id,
            "chapter_tamil": chapter.chapter_tamil,
            "chapter_english": chapter.chapter_english
        } for chapter in chapters
    ]
