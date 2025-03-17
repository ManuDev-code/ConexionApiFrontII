//Variables globales
const d = document;

let tablePro = d.querySelector("#table-pro > tbody");
let searchInput = d.querySelector("#search-input");
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

//Evento para probar el campo de buscar
searchInput.addEventListener("keyup", ()=>{
    // console.log(searchInput.value);
    searchProductTable();
})

//Evento para el navegador
d.addEventListener("DOMContentLoaded", ()=>{
    getTableData();
    getUser();

})

//Función para traer los datos de la base de datos a la tabla
let getTableData = async () => {
    let url = "http://localhost/backend-apiCrud/productos";
    try{
        let respuesta = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            },
        });
        if(respuesta.status === 204){
            console.log("No hay datos en la base de datos")
        }else {
            let tableData = await respuesta.json();
            console.log(tableData);
            //Agregar los datos de la tabla al localStorage
            localStorage.setItem("datosTabla", JSON.stringify(tableData));
            //Agregar los datos a la tabla
            tableData.forEach((dato, i) => {
                let row = d.createElement("tr");
                row.innerHTML = `
                <td>${i +1}</td>
                <td>${dato.nombre}</td>
                <td>${dato.descripcion}</td>
                <td>${dato.precio}</td>
                <td>${dato.stock}</td>
                <td> <img src ="${dato.imagen}" width="100"></td>
                <td>
                    <button id="btn-edit" onclick="editDataTable(${i})" type="button" class="btn btn-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                    </button> 
                    ${ nameUser.textContent == "vendedor" ? "" : 
                    `<button id="btn-delete" onclick="deleteDataTable(${i})" type="button" class="btn btn-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                        </svg>
                    </button>`}
                </td>
                `;
                tablePro.appendChild(row);
            });
        }
    }catch (error){
        console.log(error);
    }  
    searchProductTable();
};

//Funcion para editar producto de la tabla
let editDataTable = (pos) => {
    let products = [];
    let productsSave = JSON.parse(localStorage.getItem("datosTabla"));
    if (productsSave != null) {
        products = productsSave;
    }
    let singleProduct = products[pos];
    // console.log(singleProduct);
    localStorage.setItem("productEdit", JSON.stringify(singleProduct));
    localStorage.removeItem("datosTabla");
    location.href = "../crear-pro.html"

}

//Función para borrar producto de la tabla
let deleteDataTable = (pos) => {
    let products = [];
    let productsSave = JSON.parse(localStorage.getItem("datosTabla"));
    if (productsSave != null) {
        products = productsSave;
    }
    let singleProduct = products[pos];
    // console.log("Producto a eliminar:" + singleProduct.nombre);
    let IDProduct = {
        id: singleProduct.id
    }
    let confirmar = confirm(`¿Deseas eliminar el producto: ${singleProduct.nombre}?`);
    if(confirmar){
        //Llamar a la función para realizar peticion de eliminar
        sendDeleteProduct(IDProduct);
    }
}

//Función para realizar la petición de eliminar producto
let sendDeleteProduct = async (id) => {
    let url = "http://localhost/backend-apiCrud/productos";
    try{
        let respuesta = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(id)
        });
        if(respuesta.status === 406){
            alert("El ID enviado no fue admitido");
        }else {
            let mensaje = await respuesta.json();
            alert(mensaje.message)
            location.reload();
        }
    }catch (error){
        console.log(error);
    }
}

//Función para limpiar productos de la tabla y limpiar
let clearDataTable = ()=> {
    let rowTable = document.querySelectorAll("#table-pro > tbody > tr");
    // console.log(rowTable);
    rowTable.forEach((row) =>{
        row.remove()
    });
}

//Función para buscar productos de la tabla
let searchProductTable = () => {
    let products = [];
    let productsSave = JSON.parse(localStorage.getItem("datosTabla"));
    if (productsSave != null) {
        products = productsSave;
    }

    // console.log(products);
    //obtener lo escrito en el campo de texto
    let textSearch = searchInput.value.toLowerCase();
    // console.log(textSearch);
    for (let pro of products) {
        
    }
};