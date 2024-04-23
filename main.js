document.addEventListener("DOMContentLoaded", function() {
    
    const agregarBtn = document.getElementById("agregarBtn");
    const verBtn = document.getElementById("verBtn");
    const borrarBtn = document.getElementById("borrarBtn");
    const guardarBtn = document.getElementById("guardarBtn");
    const cancelarBtn = document.getElementById("cancelarBtn");
    const buscarBtn = document.getElementById("buscarBtn");
    const busacrContactobtn = document.getElementById("buscarContactoBtn");
    const cancelarBusacrContactobtn = document.getElementById("cancelarBusquedaBtn");
    
    let busquedavisible = false;
    let agendaVisible = false; 
    let formularioVisible = false;
    
buscarBtn.addEventListener("click", function() {
    if (!busquedavisible) {
        mostrarBusqueda();
        busquedavisible = true;
    } else {
        ocultarBusqueda();
        window.location.reload(); 
    }
});

    verBtn.addEventListener("click", function() {
        if (!agendaVisible) {
            mostrarAgenda();
            verBtn.textContent = "Ocultar Agenda";
            agendaVisible = true;
        } else {
            ocultarAgenda();
            window.location.reload(); 
        }
    });
    
    agregarBtn.addEventListener("click", function() {
        if (!formularioVisible) {
            mostrarFormulario();
            formularioVisible = true;
        } else {
            ocultarFormulario();
            window.location.reload(); 
        }
    });

    guardarBtn.addEventListener("click", agregarContacto);
    cancelarBtn.addEventListener("click", function() {
        ocultarFormulario();
        formularioVisible = false;
    });

    busacrContactobtn.addEventListener("click", buscarContacto);
    cancelarBusacrContactobtn.addEventListener("click", function() {
        ocultarBusqueda();
        busquedavisible = false;
    });

    verBtn.addEventListener("click", mostrarAgenda);
    borrarBtn.addEventListener("click", borrarAgenda);
    
    agregarBtn.addEventListener("mouseover", cambiarColor);
    agregarBtn.addEventListener("mouseout", restaurarColor);
    verBtn.addEventListener("mouseover", cambiarColor);
    verBtn.addEventListener("mouseout", restaurarColor);
    buscarBtn.addEventListener("mouseover", cambiarColor);
    buscarBtn.addEventListener("mouseout", restaurarColor);
    borrarBtn.addEventListener("mouseover", cambiarColor);
    borrarBtn.addEventListener("mouseout", restaurarColor);
  
   
});


function mostrarAgenda() {
    const agendaDiv = document.getElementById("agenda");
    agendaDiv.style.display = "block";
}

function ocultarAgenda() {
    const agendaDiv = document.getElementById("agenda");
    agendaDiv.style.display = "none";
}

function mostrarFormulario() {
    const formularioDiv = document.getElementById("formulario");
    formularioDiv.style.display = "block";
}

function ocultarFormulario() {
    const formularioDiv = document.getElementById("formulario");
    formularioDiv.style.display = "none";
}

function mostrarBusqueda() {
    const formularioBusquedaDiv = document.getElementById("buscarFormularioDiv");
    formularioBusquedaDiv.style.display = "block";
}

function ocultarBusqueda() {
    const formularioBusquedaDiv = document.getElementById("buscarFormularioDiv");
    formularioBusquedaDiv.style.display = "none";
}

function cambiarColor(event) {
    event.target.style.backgroundColor = "lightblue";
}

function restaurarColor(event) {
    event.target.style.backgroundColor = "";
}

let agenda = JSON.parse(localStorage.getItem("agenda")) || [];

function agregarContacto() {
    const nombreInput = document.getElementById("nombre");
    const telefonoInput = document.getElementById("telefono");
    
    const nombre = nombreInput.value.trim();
    const telefono = telefonoInput.value.trim();
    
    if (!nombre || !telefono) {
        alert("Por favor, complete todos los campos.");
        return;
    }
    
    let contacto = {
        nombre: nombre,
        telefono: telefono
    };
    agenda.push(contacto);
    localStorage.setItem("agenda", JSON.stringify(agenda));

    alert("El contacto se ha guardado exitosamente.");

    window.location.reload();
    actualizarDetalles();
}


function mostrarAgenda() {
    const agendaDiv = document.getElementById("agenda");
    let agendaHTML = "<h2>Agenda</h2>";
    agenda.forEach(function(contacto, index) {
        agendaHTML += `<p>Nombre: ${contacto.nombre}, Teléfono: ${contacto.telefono} <button class="editarBtn" data-index="${index}">Editar</button></p>`;
    });
    agendaDiv.innerHTML = agendaHTML;

    const editarBtns = document.getElementsByClassName("editarBtn");
    for (let btn of editarBtns) {
        btn.addEventListener("click", editarContacto);
    }
   actualizarDetalles();
}
function editarContacto(event) {
    const index = event.target.getAttribute("data-index");
    const contactoEditar = agenda[index];
    
    const editarFormularioDiv = document.getElementById("editarFormularioDiv");
    const editarNombreInput = document.getElementById("editarNombre");
    const editarTelefonoInput = document.getElementById("editarTelefono");

    editarNombreInput.value = contactoEditar.nombre;
    editarTelefonoInput.value = contactoEditar.telefono;

    editarFormularioDiv.style.display = "block";

    const guardarEdicionBtn = document.getElementById("guardarEdicionBtn");
    guardarEdicionBtn.addEventListener("click", function() {
        const nuevoNombre = editarNombreInput.value.trim();
        const nuevoTelefono = editarTelefonoInput.value.trim();

        if (!nuevoNombre || !nuevoTelefono) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        agenda[index].nombre = nuevoNombre;
        agenda[index].telefono = nuevoTelefono;
        localStorage.setItem("agenda", JSON.stringify(agenda));

        editarFormularioDiv.style.display = "none";
        mostrarAgenda();
    });

    const cancelarEdicionBtn = document.getElementById("cancelarEdicionBtn");
    cancelarEdicionBtn.addEventListener("click", function() {
        editarFormularioDiv.style.display = "none";
    });
}


function buscarContacto() {
    // Obtener el nombre a buscar
    const nombreBuscar = document.getElementById("buscarNombre").value.trim();

    // Obtener el div de resultados
    const resultadoBusquedaDiv = document.getElementById("resultadoBusquedaDiv");

    if (!nombreBuscar) {
        resultadoBusquedaDiv.textContent = "Por favor, ingrese un nombre a buscar.";
        return;
    }

    const contactoEncontrado = agenda.find(contacto => contacto.nombre.toLowerCase() === nombreBuscar.toLowerCase());

    if (contactoEncontrado) {
        resultadoBusquedaDiv.textContent = `Nombre: ${contactoEncontrado.nombre}, Teléfono: ${contactoEncontrado.telefono}`;
    } else {
        resultadoBusquedaDiv.textContent = "El contacto no se encuentra en la agenda.";
    }
}
function borrarAgenda() {
    localStorage.removeItem("agenda");
    agenda = [];
    mostrarAgenda();
}

function actualizarDetalles() {
    const cantContactosLabel = document.getElementById("cantContactos");
    const ultimoRegistroLabel = document.getElementById("ultimoRegistro");

    if (cantContactosLabel && ultimoRegistroLabel) {
        cantContactosLabel.textContent = `Cantidad de contactos: ${agenda.length}`;
        if (agenda.length > 0) {
            const ultimoContacto = agenda[agenda.length - 1];
            ultimoRegistroLabel.textContent = `Último registro: Nombre: ${ultimoContacto.nombre}, Teléfono: ${ultimoContacto.telefono}`;
        } else {
            ultimoRegistroLabel.textContent = "No hay contactos registrados.";
        }
    } else {
        console.error("Los elementos 'cantContactos' o 'ultimoRegistro' no existen en el DOM.");
    }
}


actualizarDetalles();