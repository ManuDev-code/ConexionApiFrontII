//Variables globales
const d = document;

let nameInput = d.querySelector("#productos-select");
let priceInput = d.querySelector("#precio-pro");
let stockInput = d.querySelector("#stock-pro");
let descripcionInput = d.querySelector("#des-pro");
let imagen = d.querySelector("#imagen-pro")
let btnCreate = d.querySelector(".btn-create");
let productUpdate;
let nameUser = d.querySelector("#nombre-usuario");
let btnLogout = d.querySelector("#btnLogout");

//Funcion para poner el nombre del usuario
let getUser = () => {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    nameUser.textContent = user.nombre;
};

//Evento para el boton de logout
btnLogout.addEventListener("click", ()=>{
    localStorage.removeItem("userLogin");
    location.href = "../login.html"
});




//Evento al boton de formulario
btnCreate.addEventListener('click', ()=>{
    // alert("producto: "+ nameInput.value);
    let product = getDataProduct();
    sendDataProduct(product);
});

//Evento al navegador para comprovar si recargó la pagina
d.addEventListener("DOMContentLoaded", ()=>{
    getUser();
    productUpdate = JSON.parse(localStorage.getItem("productEdit"));
    if(productUpdate != null){
        updateDataProduct();
    }
});

//Funcion para validar el formulario y obtener los datos
let getDataProduct = () => {
    //validar formulario
    let product;
    if(nameInput.value && priceInput.value && stockInput.value && descripcionInput.value && imagen.src){
        product = {
            nombre: nameInput.value,
            descripcion: descripcionInput.value,
            precio: priceInput.value,
            stock:stockInput.value,
            imagen:imagen.src
        }

        priceInput.value = "";
        descripcionInput.value = "";
        stockInput.value = "";
        imagen.src = "https://m.media-amazon.com/images/I/61XV8PihCwL._SY250_.jpg";
        console.log(product)
    }else {
        alert("Todos los campos son obligatorios")
    }
    return product;
}

//Función para recibir los datos y realizar la petición al servidor
let sendDataProduct = async (data)=> {
    let url = "http://localhost/backend-apiCrud/productos";
    try{
        let respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });
        if(respuesta.status === 406){
            alert("Los datos enviados no son admitidos")
        }else {
            let mensaje = await respuesta.json();
            alert(mensaje.message)
            location.href = "../listado-pro.html"
        }
    }catch (error){
        console.log(error);
    }  
};

//Función para editar producto
let updateDataProduct = () => {

    //Agregar datos a editar en los campos de formulario
    let product;
    nameInput.value = productUpdate.nombre;
    descripcionInput.value = productUpdate.descripcion;
    priceInput.value = productUpdate.precio;
    stockInput.value = productUpdate.stock;
    imagen.src = productUpdate.imagen;

    //Seleccionar el boton de actualizar
    let btnActualizar = d.querySelector(".btn-update");
    btnActualizar.classList.toggle("d-none");
    btnCreate.classList.toggle("d-none");

    //Agregar evento al boton editar
    btnActualizar.addEventListener("click", function(){
        product = {
            id: productUpdate.id,
            nombre: nameInput.value,
            descripcion: descripcionInput.value,
            precio: priceInput.value,
            stock:stockInput.value,
            imagen: imagen.src
        }
        localStorage.removeItem("productEdit");
        sendUpdateProduct(product);
    })
}

//Funcion para realizar peticion
let sendUpdateProduct = async(pro)=> {
    let url = "http://localhost/backend-apiCrud/productos";
    try{
        let respuesta = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(pro)
        });
        if(respuesta.status === 406){
            alert("Los datos enviados no son admitidos")
        }else {
            let mensaje = await respuesta.json();
            alert(mensaje.message)
            location.href = "../listado-pro.html"
        }
    }catch (error){
        console.log(error);
    }  
    
}