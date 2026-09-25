const apiUrl = "http://127.0.0.1:8000/docs"

// Todos los pedidos pasan por esta función
async function pedir(ruta, opciones) {
  var respuesta;

  try {
    respuesta = await fetch(URL_API + ruta, {
      headers: { "Content-Type": "application/json" },
      ...opciones,
    });
  } catch (error) {
    // fetch solo tira error si no pudo ni conectarse
    throw new Error("No hay conexión con la API. ¿Está corriendo uvicorn?");
  }

  if (!respuesta.ok) {
    var cuerpo = {};
    try {
      cuerpo = await respuesta.json();
    } catch (error) {
      // el servidor no mandó JSON (ej: error 500), dejamos el cuerpo vacío
    }

    var detalle = cuerpo.detail;

    // los errores 422 de FastAPI vienen como lista de objetos
    if (Array.isArray(detalle)) {
      detalle = detalle
        .map(function (d) {
          return d.loc[d.loc.length - 1] + ": " + d.msg;
        })
        .join(" | ");
    }

    throw new Error(detalle || "Error " + respuesta.status);
  }

  return respuesta.json();
}

function verInventos() {
  return pedir("/ver_inventos");
}

function buscarPorId(id) {
  return pedir("/search_for_id/" + id);
}

function crearMaterial(datos) {
  return pedir("/post_materials", { method: "POST", body: JSON.stringify(datos) });
}

function crearPlano(datos) {
  return pedir("/post_papers", { method: "POST", body: JSON.stringify(datos) });
}

function crearProyecto(datos) {
  return pedir("/post_invention", { method: "POST", body: JSON.stringify(datos) });
}

function actualizarInvento(id, datos) {
  return pedir("/upd_invento/" + id, { method: "PUT", body: JSON.stringify(datos) });
}

function eliminarInvento(id) {
  return pedir("/delete_invention/" + id, { method: "DELETE" });
}