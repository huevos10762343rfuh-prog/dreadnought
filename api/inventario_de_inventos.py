from modelos import materiales, planos, proyectos, objetos
import sqlite3


class vsp:
    def __init__(self):
        pass

def agregar_materiales(self, invento: objetos, conexion: sqlite3.Connection) -> str:
    m = invento.materiales
    conexion.execute(
        "INSERT INTO materiales(nombre, espec, cantidad, imagen, precio) VALUES (?,?,?,?,?)",
        (m.nombre, m.espec, m.cantidad, m.imagen, m.precio)
    )
    return f"material subido {m.nombre}"

def agregar_planos(self, invento: objetos, conexion: sqlite3.Connection) -> str:
    pl = invento.planos
    conexion.execute(
        "INSERT INTO planos(nombre, imagen) VALUES (?,?)",
        (pl.nombre, pl.precio)
    )
    return f"plano subido {pl.nombre}"

def agregar_proyecto(self, invento: objetos, conexion: sqlite3.Connection) -> str:
    p = invento.proyecto
    conexion.execute(
        "INSERT INTO proyectos(nombre, imagen) VALUES (?,?)",
        (p.nombre, p.imagen)
    )
    return f"proyecto subido {p.nombre}"

def watch_inventory_of_proyects(self, conan: sqlite3.Connection) -> list[dict]:
    snp = conan.execute("SELECT * FROM inventos").fetchall()
    return [dict(item) for item in snp]

def delete_invention(self, id: int, conchadelalora: sqlite3.Connection) -> str:
    cursor = conchadelalora.execute("DELETE FROM inventos WHERE id = ?", (id,))
    if cursor.rowcount == 0:
        return f"no se encontró ningún invento con la id {id}"
    return f"se eliminó el invento de la id {id}"

def update_inventions(self, id: int, invento: objetos, conchadetuhermana: sqlite3.Connection) -> str:
    m = invento.Materiales
    conchadetuhermana.execute(
        "UPDATE inventos SET nombre = ?, espec = ?, cantidad = ?, imagen = ?, precio = ? WHERE id = ?",
        (m.nombre, m.espec, m.cantidad, m.imagen, m.precio, id)
    )
    return "invento actualizado"
    
def searchforid(self, id: int, conan: sqlite3.Connection) -> dict | None:
    res = conan.execute("SELECT * FROM inventos WHERE id = ?", (id,)).fetchone()
    return dict(res) if res else None 