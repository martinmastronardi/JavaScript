document.addEventListener("DOMContentLoaded", function() {
    
    const agregarBtn = document.getElementById("agregarBtn");
    const verBtn = document.getElementById("verBtn");
    const buscarBtn = document.getElementById("buscarBtn");
    const borrarBtn = document.getElementById("borrarBtn");
    
    let agendaVisible = false; 

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
    
    agregarBtn.addEventListener("click", agregarContacto);
    verBtn.addEventListener("click", mostrarAgenda);
    buscarBtn.addEventListener("click", buscarContacto);
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

function cambiarColor(event) {
    event.target.style.backgroundColor = "lightblue";
}

function restaurarColor(event) {
    event.target.style.backgroundColor = "";
}

let agenda = JSON.parse(localStorage.getItem("agenda")) || [];

function agregarContacto() {
    let nombre = prompt("Ingrese el nombre del contacto:");
    if (nombre === null) {
        return; 
    }
    let telefono = prompt("Ingrese el número de teléfono:");
    if (telefono === null) {
        return; 
    } 
    
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
    
    let nombreEditar = prompt("Ingrese el nuevo nombre del contacto:", contactoEditar.nombre);
    if (nombreEditar === null) {
        return;
    }
    let telefonoEditar = prompt("Ingrese el nuevo número de teléfono:", contactoEditar.telefono);
    if (telefonoEditar === null) {
        return;
    }
    if (!nombreEditar || !telefonoEditar) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    agenda[index].nombre = nombreEditar;
    agenda[index].telefono = telefonoEditar;
    localStorage.setItem("agenda", JSON.stringify(agenda));
    mostrarAgenda();
}


function buscarContacto() {
    let nombreBuscar = prompt("Ingrese el nombre del contacto a buscar:");
    if (nombreBuscar === null) return;

    let contactoEncontrado = agenda.find(contacto => contacto.nombre.toLowerCase() === nombreBuscar.toLowerCase());
    if (contactoEncontrado) {
        alert("Nombre: " + contactoEncontrado.nombre + "\nTeléfono: " + contactoEncontrado.telefono);
    } else {
        alert("El contacto no se encuentra en la agenda.");
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