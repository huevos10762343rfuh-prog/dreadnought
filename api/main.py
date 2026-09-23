from fastapi import FastAPI, Depends, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from conan import get_connection,init_db
from sqlite3 import Connection as conexion 
from modelos import materiales, planos, proyectos, objetos
from inventario_de_inventos import vsp

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def stratup():
    print("inciando el github del gnomo")
    init_db()

@app.get("/ver_inventos")
def see(conna : conexion = Depends(get_connection)):
    return vsp.watch_inventory_of_proyects(conna)

@app.get("/search_for_id/{id}")
def searchforid(id : int, conna: conexion = Depends(get_connection)):        
    inv = vsp.searchforid(id, conna)
    if inv is None:
        raise HTTPException(status_code = 404, detail = f"Item not found papu f1 manco(hace f5 para probar de nuevo)")
    else:
        return inv

@app.post("/post_invention", status_code=status.HTTP_201_CREATED )
def post(invento: proyectos, canon: conexion = Depends(get_connection)):
    try:
        return vsp.agregar_proyecto(invento,canon)
    except Exception:
        raise HTTPException(status_code = 400, detail = f"bad request rey mira HTTP cats")

@app.post("/post_materials", status_code=status.HTTP_201_CREATED )
def post(invento: materiales, canon: conexion = Depends(get_connection)):
    try:
        return vsp.agregar_materiales(invento,canon)
    except Exception:
        raise HTTPException(status_code = 400, detail = f"bad request rey mira HTTP cats")

@app.post("/post_papers", status_code=status.HTTP_201_CREATED )
def post(invento: planos, canon: conexion = Depends(get_connection)):
    try:
        return vsp.agregar_planos(invento,canon)
    except Exception:
        raise HTTPException(status_code = 400, detail = f"bad request rey mira HTTP cats")

@app.put("/upd_invento/{id}")
def update(id: int, invento: objetos, coñam: conexion = Depends(get_connection)):
    try:
        return vsp.update_inventions(id,invento,coñam)
    except Exception:
        raise HTTPException(status_code = 405, detail = f"method not allowed loco f5 ")


@app.delete("/delete_invention/{id}")
def delete(id : int,enanoperonista : conexion = Depends(get_connection)):
    try:
        return vsp.delete_invention(id,enanoperonista)
    except Exception:
        raise HTTPException(status_code = 409, detail= f"conflicto, el proyecto no se pudo eliminar")