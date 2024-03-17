let agenda = [];

function agregarContacto() {
    let nombre = prompt("Ingrese el nombre del contacto:");
    let telefono = prompt("Ingrese el número de teléfono:");

    let contacto = {
        nombre: nombre,
        telefono: telefono
    };
    agenda.push(contacto);

    let agregarOtro = confirm("¿Desea agregar otro contacto?");
    if (agregarOtro) {
        agregarContacto();
    } else {
        mostrarAgenda();
    }
}

function mostrarAgenda() {
    let verAgenda = confirm("¿Desea ver la agenda?");
    if (verAgenda) {
        alert("Agenda actualizada:\n" + JSON.stringify(agenda));
    } else {
        buscarContacto();
    }
}

function buscarContacto() {
    let buscar = true;
    while (buscar) {
        let nombreBuscar = prompt("Ingrese el nombre del contacto a buscar:");
        let contactoEncontrado = agenda.find(contacto => contacto.nombre.toLowerCase() === nombreBuscar.toLowerCase());
        if (contactoEncontrado) {
            alert("Nombre: " + contactoEncontrado.nombre + "\nTeléfono: " + contactoEncontrado.telefono);
        } else {
            alert("El contacto no se encuentra en la agenda.");
        }
        buscar = confirm("¿Desea buscar otro contacto?");
    }
    alert("Gracias por usar la agenda.");
}


agregarContacto();

