// elementos que usa main.js también (al ser scripts normales, se comparten)
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
const aviso = document.getElementById("aviso");
const formBuscar = document.getElementById("form-buscar");
const btnTodos = document.getElementById("btn-todos");
const formNuevo = document.getElementById("form-nuevo");
const selectTipo = document.getElementById("tipo");
const camposMaterial = document.getElementById("campos-material");

// Ayudante para no repetir createElement mil veces
function crear(etiqueta, texto, clase) {
  const el = document.createElement(etiqueta);
  if (texto !== undefined && texto !== null) el.textContent = texto;
  if (clase) el.className = clase;
  return el;
}

function mostrarAviso(texto, esError) {
  aviso.textContent = texto;
  if (esError) {
    aviso.classList.add("error");
  } else {
    aviso.classList.remove("error");
  }
}

// Arma una fila de la lista (como un archivo en GitHub)
function crearFila(item) {
  const fila = crear("li", null, "archivo");

  if (item.imagen) {
    const mini = crear("img", null, "miniatura");
    mini.src = item.imagen;
    mini.alt = "";
    fila.append(mini);
  } else {
    fila.append(crear("span", "📄", "icono"));
  }

  fila.append(crear("span", item.nombre, "nombreArchivo"));
  fila.append(crear("span", item.espec || "", "descArchivo"));

  // cantidad y precio solo existen en los materiales
  let datos = "";
  if (item.cantidad !== undefined && item.cantidad !== null) datos += "x" + item.cantidad + "  ";
  if (item.precio !== undefined && item.precio !== null) datos += "$" + item.precio;
  fila.append(crear("span", datos, "datosArchivo"));

  const botonBorrar = crear("button", "Delete", "botonRojo");
  botonBorrar.type = "button";
  botonBorrar.dataset.id = item.id; // acá guardamos el id para el click
  fila.append(botonBorrar);

  return fila;
}

function dibujarLista(items) {
  lista.replaceChildren(); // vaciamos la lista

  contador.textContent = items.length + (items.length === 1 ? " archivo" : " archivos");

  if (items.length === 0) {
    lista.append(crear("li", "Todavía no hay nada acá. Creá tu primer archivo abajo.", "vacio"));
    return;
  }

  for (let i = 0; i < items.length; i++) {
    lista.append(crearFila(items[i]));
  }
}

// Lee el formulario y devuelve { tipo, datos }
// Los modelos de la API piden: materiales (nombre, cantidad, espec, precio, imagen)
// y planos / proyectos (nombre, imagen, precio)
function leerFormulario() {
  const tipo = selectTipo.value;

  const datos = {
    nombre: document.getElementById("nombre").value,
    imagen: document.getElementById("imagen").value,
    precio: Number(document.getElementById("precio").value),
  };

  if (tipo === "materiales") {
    datos.espec = document.getElementById("espec").value;
    datos.cantidad = Number(document.getElementById("cantidad").value);
  }

  return { tipo: tipo, datos: datos };
}

function limpiarFormulario() {
  formNuevo.reset();
  actualizarCampos();
}

// espec y cantidad solo se muestran para materiales
function actualizarCampos() {
  camposMaterial.hidden = selectTipo.value !== "materiales";
}

function bloquearGuardar(bloquear) {
  formNuevo.querySelector("button[type=submit]").disabled = bloquear;
}

function leerIdBusqueda() {
  return document.getElementById("buscar-id").value;
}