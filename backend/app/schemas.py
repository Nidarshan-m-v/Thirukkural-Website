from pydantic import BaseModel

class KuralSchema(BaseModel):
    id: int
    kural_number: int
    kural_tamil_line1: str
    kural_tamil_line2: str
    kural_english_line1: str
    kural_english_line2: str

    class Config:
        orm_mode = True
