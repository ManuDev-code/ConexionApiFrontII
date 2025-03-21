// Elementos del DOM
let listadoResumenCompra = document.querySelector('.list-cartResume tbody');
let valorDomi = document.querySelector('.valor-domi');
let valorCiudad = document.querySelector('.destino');
let valorDescuento = document.querySelector('.promo');
let valorSubtotal = document.querySelector('.res-sub-total');
let valorTotal = document.querySelector('.total');

// Campos del usuario
let nombreUsuario = document.querySelector('#nombres-input');
let apellidoUsuario = document.querySelector('#apellidos-input');
let correoUsuario = document.querySelector('#email-input');
let telefonoUsuario = document.querySelector('#celular-input');
let direccionUsuario = document.querySelector('#direccion-input');
let datosAdicionalesUsuario = document.querySelector('#additiona-note');

// Métodos de pago
let pagoContraentrega = document.getElementById("cod");
let pagoPSE = document.getElementById("cp");
let pagoTransferencia = document.getElementById("bt");
let btnPagarOrden = document.querySelector('.btn-checkout');

document.addEventListener('DOMContentLoaded', () => {
    mostrarResumen();
    
    pagoContraentrega.addEventListener("change", seleccionMetodoPago);
    pagoPSE.addEventListener("change", seleccionMetodoPago);
    pagoTransferencia.addEventListener("change", seleccionMetodoPago);
});

function mostrarResumen() {
    let resumenCompra = JSON.parse(localStorage.getItem('resumenCompra')) || [];

    let productos = Object.values(resumenCompra).filter(value => typeof value === "object" && value !== null && !Array.isArray(value));
    productos.forEach((producto) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td class="d-flex justify-content-around align-items-center">
                <img src="${producto.imagen}" width="70px;">
            </td>
            <td>                
                <span>${producto.nombre}</span>
            </td>
            <td>
                $<span>${producto.precio}</span>                
            </td>
            <td>
                <span>${producto.cantidad}</span>
            </td>
        `;
        listadoResumenCompra.appendChild(row);
    });
    valorDomi.textContent = resumenCompra.domicilio;
    valorCiudad.textContent = resumenCompra.destino;
    valorDescuento.textContent = resumenCompra.descuento;
    valorSubtotal.textContent = resumenCompra.subtotal;
    valorTotal.textContent = resumenCompra.total;
}

// Evento para el botón de pago
btnPagarOrden.addEventListener('click',() => {
    datosUsuario();
});

// Función para obtener la información del usuario y el método de pago
function datosUsuario() {
    let resumenCompra = JSON.parse(localStorage.getItem('resumenCompra')) || [];
    let finalizaCompra = {
        ...resumenCompra
    };
    finalizaCompra.nombre = nombreUsuario.value;
    finalizaCompra.apellido = apellidoUsuario.value;
    finalizaCompra.correo = correoUsuario.value;
    finalizaCompra.telefono = telefonoUsuario.value;
    finalizaCompra.direccion = direccionUsuario.value;
    finalizaCompra.datosAdicionales = datosAdicionalesUsuario.value;

    // Obtener el incremento del método de pago seleccionado
    let incremento = obtenerMetodoPago();
    let subTotal = parseFloat(valorTotal.textContent.replace('.', '').replace(',', '.')) || 0;
    let nuevoTotal = Math.round(subTotal + (subTotal * incremento));
    finalizaCompra.incremento = incremento;
    finalizaCompra.total = nuevoTotal.toLocaleString('es-ES');

    //console.log('finalizaCompra', JSON.stringify(finalizaCompra));
    //console.log('finalizaCompra', finalizaCompra);
    //guardar en localStorage
    localStorage.setItem('finalizaCompra',JSON.stringify(finalizaCompra));
    location.href='thankyou.html'
}

// Función para manejar el cambio en los métodos de pago
function seleccionMetodoPago(event) {
    let incremento = 0;
    switch (event.target.value) {
        case "1": incremento = 0.05; break;
        case "2": incremento = 0.03; break;
        case "3": incremento = 0.00; break;
    }
    return incremento;
}

// Función para obtener el método de pago seleccionado en el momento del pago
function obtenerMetodoPago() {
    let seleccionado = document.querySelector('input[name="radio"]:checked');
    if (!seleccionado) return 0;
    return seleccionMetodoPago({ target: seleccionado });
}
