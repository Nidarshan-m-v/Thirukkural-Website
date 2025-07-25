from sqlalchemy import Column, Integer, String, ForeignKey
from .database import Base

class Kural(Base):
    __tablename__ = "kural"
    id = Column(Integer, primary_key=True, index=True)
    kural_number = Column(Integer, unique=True, nullable=False)
    kural_tamil_line1 = Column(String)
    kural_tamil_line2 = Column(String)
    kural_english_line1 = Column(String)
    kural_english_line2 = Column(String)

class Meaning(Base):
    __tablename__ = "meaning"
    m_id = Column(Integer, primary_key=True, index=True)
    kural_id = Column(Integer, ForeignKey("kural.id"))
    meaning_tamil = Column(String)
    meaning_english = Column(String)

class Chapter(Base):
    __tablename__ = "chapter"
    c_id = Column(Integer, primary_key=True, index=True)
    chapter_tamil = Column(String)
    chapter_english = Column(String)

class Thirukkural(Base):
    __tablename__ = "thirukkural"
    id = Column(Integer, primary_key=True)
    kural_id = Column(Integer, ForeignKey("kural.id"))
    chapter_id = Column(Integer, ForeignKey("chapter.c_id"))
