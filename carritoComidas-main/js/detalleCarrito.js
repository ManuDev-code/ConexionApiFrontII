let tablaCarrito = document.querySelector('.cart-table tbody')
let resumenSubtotal= document.querySelector('.res-sub-total')
let resumenDescuento = document.querySelector('.promo')
let resumenTotal = document.querySelector('.total')
let resumenDomicilio = document.querySelector('.valor-domi')
let destino = document.querySelector('.destino')
let btnResumen = document.querySelector('.btn-resumen')

document.addEventListener("DOMContentLoaded",()=>{
    cargaProductosLocalStorage();
});

function cargaProductosLocalStorage(){
    let listadoProductos = JSON.parse(localStorage.getItem('productosCarrito')) || [];
    tablaCarrito.innerHTML='';
    if(listadoProductos.length!=0){
        listadoProductos.forEach((producto,i)=>{
            //limpiar tabla previo a mostrar datos

            let row = document.createElement('tr');
            row.innerHTML = `
                <td class="d-flex justify-content-around align-items-center">
                    <span onclick="borrarProducto(${i})" class="btn btn-danger">X</span>
                    <img src="${producto.imagen}" width="70px;">
                    ${producto.nombre}
                </td>
                <td>
                    $<span>${producto.precio}</span>
                </td>
                <td>
                    <div class="quantity quantity-wrap">
                        <div class="decrement" onclick="actualizarCantidad(${i},-1)">
                            <i class="fa-solid fa-minus"></i>
                        </div>
                        <input class="number" type="text" name="quantity" value="${producto.cantidad || 1}" maxlength="2" size="1" readonly>
                        <div class="increment" onclick="actualizarCantidad(${i},1)">
                            <i class="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </td>
                <td>${(producto.precio*producto.cantidad).toFixed(3)}</td>
            `;
            //agrego un hijo a la tabla, en este caso una fila
            tablaCarrito.appendChild(row);
            //obtener los subtotales
            resumenCompra();
        });
    }else{
        let row = document.createElement('tr');
        row.innerHTML=`
            <td colspan="4">
                <p class="text-center fs">No tienes productos en el carrito</p>
            </td>
        `
        tablaCarrito.appendChild(row);
    }
}

//actualizar cantidades de producto
function actualizarCantidad(index,count){
    let listadoProductos = JSON.parse(localStorage.getItem('productosCarrito')) || [];
    if(listadoProductos[index]){
        //valor mínimo de 1
        listadoProductos[index].cantidad = (listadoProductos[index].cantidad||1)+count
        
        if(listadoProductos[index].cantidad<1){
            listadoProductos[index].cantidad=1;
        }
        //let subtotal = listadoProductos[index].precio*listadoProductos[index].cantidad
    }

    //actualizar el valor en el localStorage
    localStorage.setItem('productosCarrito',JSON.stringify(listadoProductos));
    cargaProductosLocalStorage();
}
//borrar producto del resumen del carrito
function borrarProducto(index){
    let listadoProductos = JSON.parse(localStorage.getItem('productosCarrito')) || [];
    listadoProductos.splice(index,1);
    localStorage.setItem('productosCarrito',JSON.stringify(listadoProductos));
    cargaProductosLocalStorage();
}
//resumen de compra
function resumenCompra(){
    let listadoProductos = JSON.parse(localStorage.getItem('productosCarrito')) || [];
    let subtotal=0;
    listadoProductos.forEach((prod)=>{
        //console.log(prod)
        subtotal += prod.precio*prod.cantidad;
    });
    //valor de domicilio con base en casos
    let valorDomicilio = 0;
    switch (destino.value) {
        case 'Medellin': 
            default: valorDomicilio;
            break;
        case 'Bello':
            valorDomicilio = 10.000;
            break;
        case 'Itagui': case 'Envigado':case 'Sabaneta': 
            valorDomicilio =15.000;
            break;
        case'Copacabana' : case 'Caldas' : case 'La Estrella':
            valorDomicilio = 20.000;
            break;
    }
    console.log('domi', valorDomicilio);
    //descuento de compra
    let descuento= (subtotal>100.000) ? (subtotal*10)/100 : 0;
    //valor total de compra
    let totalCarrito = subtotal - descuento + valorDomicilio


    resumenSubtotal.textContent = subtotal.toFixed(3);
    resumenDescuento.textContent = descuento.toFixed(3);
    resumenTotal.textContent = totalCarrito.toFixed(3);
    resumenDomicilio.textContent = valorDomicilio.toFixed(3);
}

destino.addEventListener('change',()=>{
    resumenCompra();
});

//guardar los datos de la orden
btnResumen.addEventListener('click',()=>{
    let listadoProductos = JSON.parse(localStorage.getItem('productosCarrito')) || [];
    let resumen = {
        //operador spread------> ...Array/variable/etc
        ...listadoProductos,
    }
    resumen.subtotal = resumenSubtotal.textContent;
    resumen.descuento = resumenDescuento.textContent;
    resumen.destino = destino.value;
    resumen.domicilio = resumenDomicilio.textContent;
    resumen.total = resumenTotal.textContent;
    console.log('resumen',resumen)
    //guarda resumen de compra en localStorage
    localStorage.setItem('resumenCompra',JSON.stringify(resumen));
    //console.log('listado',listadoProductos)
    location.href='checkout.html'
});