//variables globales de admin
const d = document
let nameUser = d.querySelector("#nombre-usuario");
let btnLogout = d.querySelector("#btnLogout");

d.addEventListener("DOMContentLoaded", ()=>{
    getUser()
})
//Funcion para poner el nombre del usuario
let getUser = () => {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    nameUser.textContent = user.nombre;
};

//Evento para el boton de logout
btnLogout.addEventListener("click", ()=>{
    localStorage.removeItem("userLogin");
    location.href = "../login.html"
})

