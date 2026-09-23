from pydantic import BaseModel

class materiales(BaseModel):
    nombre : str 
    cantidad : int
    espec : str
    precio : int
    imagen : str

class proyectos(BaseModel):
      nombre : str 
      imagen : str
      precio : int

class planos(BaseModel):
    nombre : str
    imagen : str
    precio : int

class objetos(BaseModel):
    Planos : planos
    Proyecto : proyectos
    Materiales : materiales        