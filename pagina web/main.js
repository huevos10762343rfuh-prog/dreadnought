
// qué función de la api usar según el tipo elegido en el select
const crearPorTipo = {
  materiales: crearMaterial,
  planos: crearPlano,
  proyectos: crearProyecto,
};

async function cargarTodo() {
  try {
    const items = await verInventos();
    dibujarLista(items);
    mostrarAviso("", false);
  } catch (error) {
    console.log("falló cargarTodo:", error);
    mostrarAviso("No se pudo cargar el inventario: " + error.message, true);
  }
}

async function buscar(evento) {
  evento.preventDefault(); // que el form no recargue la página

  const id = leerIdBusqueda();
  if (id === "") {
    cargarTodo();
    return;
  }

  try {
    const item = await buscarPorId(id);
    dibujarLista([item]);
    mostrarAviso("", false);
  } catch (error) {
    mostrarAviso(error.message, true);
  }
}

async function guardar(evento) {
  evento.preventDefault();

  const formulario = leerFormulario();
  const funcionCrear = crearPorTipo[formulario.tipo];

  bloquearGuardar(true);
  try {
    const mensaje = await funcionCrear(formulario.datos);
    mostrarAviso(mensaje, false);
    limpiarFormulario();
    await cargarTodo();
    // cargarTodo borra el aviso, así que lo volvemos a poner
    mostrarAviso(mensaje, false);
  } catch (error) {
    mostrarAviso("No se pudo guardar: " + error.message, true);
  } finally {
    bloquearGuardar(false); // se ejecuta siempre, salga bien o mal
  }
}

async function eliminar(evento) {
  // un solo listener en la lista sirve para todos los botones Delete
  const boton = evento.target.closest("button[data-id]");
  if (boton === null) return;

  if (!confirm("¿Seguro que querés borrar este archivo?")) return;

  try {
    const mensaje = await eliminarInvento(boton.dataset.id);
    await cargarTodo();
    mostrarAviso(mensaje, false);
  } catch (error) {
    mostrarAviso(error.message, true);
  }
}

//  eventos 
formBuscar.addEventListener("submit", buscar);
btnTodos.addEventListener("click", cargarTodo);
formNuevo.addEventListener("submit", guardar);
selectTipo.addEventListener("change", actualizarCampos);
lista.addEventListener("click", eliminar);

// arrancamos 
actualizarCampos();
cargarTodo();

