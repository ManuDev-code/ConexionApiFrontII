let ordenProductos = document.querySelector('.list-cartOrder tbody')
let resumenPedido = document.querySelector('.resumenPedido')
let datosPedido = document.querySelector('.datosPedido')
let btnRestart = document.querySelector('.btn-gracias')
document.addEventListener('DOMContentLoaded',()=>{
    mostrarPedido();
});

function mostrarPedido(){
    let resumenCompra = JSON.parse(localStorage.getItem('finalizaCompra')) || [];
    let productos = Object.values(resumenCompra).filter(value => typeof value === "object" && value !== null && !Array.isArray(value));
    resumenPedido.innerHTML =`
        <h2>Hola, ${resumenCompra.nombre} ${resumenCompra.apellido}</h2>
        <p class="mb-32">Estamos preparando tu pedido, pronto nos comunicaremos contigo para realizar la entrega.</p>
        <p>Aquí tienes un resumen de tu compra</p>
    `
    ordenProductos.innerHTML = '';
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
        ordenProductos.appendChild(row);
    });
    datosPedido.innerHTML = `
        <p>Correo: ${resumenCompra.correo}</p>
        <p>Telefono: ${resumenCompra.telefono}</p>
        <p>Dirección: ${resumenCompra.direccion}</p>
        <p>Ciudad domiclio: ${resumenCompra.destino}</p>
        <p>Datos adicionales: ${resumenCompra.datosAdicionales}</p>
        <p>Valor del domicilio: ${resumenCompra.domicilio}</p>
        <p>Valor del descuento: ${resumenCompra.descuento}</p>
        <p>Subtotal: ${resumenCompra.subtotal}</p>
        <p>Total a pagar(Método de pago inlcuido): ${resumenCompra.total}</p>
    `
}
btnRestart.addEventListener('click',()=>{
    //localStorage.clear();
    //location.href='index.html'
});