import sqlite3

def get_connection():
    conan = sqlite3.connect("./github_del_gnomo.db")
    conan.row_factory = sqlite3.Row
    try:
        yield conan
    finally:
        conan.commit()
        conan.close()


def init_db():
    conan = sqlite3.connect("./github_del_gnomo.db")
    cursor = conan.cursor()
    conan.execute("CREATE TABLE IF NOT EXISTS materiales(id INTEGER PRIMARY KEY, nombre TEXT, cantidad INTEGER, espec TEXT, imagen TEXT, precio INTEGER);")
    conan.execute("CREATE TABLE IF NOT EXISTS planos(id INTEGER PRIMARY KEY, nombre TEXT, imagen TEXT);")
    conan.execute("CREATE TABLE IF NOT EXISTS proyectos(id INTEGER PRIMARY KEY, nombre TEXT, imagen TEXT );")
    conan.commit()
    conan.close()