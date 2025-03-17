//Variables globales del formulario login
const d = document;
userInput = d.querySelector("#usuarioForm");
passInput = d.querySelector("#contraForm");
btnLogin = d.querySelector(".btnLogin");

//evento al boton del formulario
btnLogin.addEventListener("click", () => {
    // alert("Escribió:" + userInput.value)
    let dataForm = getData();
    sendData(dataForm);
    
})

//Funcion para validar formulario
//Obtener datos del formulario
let getData = () => {
    //validar formulario
    let user;
    if(userInput.value && passInput.value){
        user = {
            usuario: userInput.value,
            contrasena: passInput.value
        }

        userInput.value = "";
        passInput.value = "";

    }else {
        alert("El usuario y la contraseña son obligatorios")
    }
    console.log(user);
    return user;
}

//Función para recibir los datos y realizar la petición al servidor
let sendData = async (data)=> {
    let url = " http://localhost/backend-apiCrud/login";
    try{
        let respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });
        if(respuesta.status === 401){
            alert("Usuario y/o contraseña incorrectos")
        }else {
            let userLogin = await respuesta.json();
            // console.log(userLogin);
            alert(`Bienvenido: ${userLogin.nombre}`);
            //Guardar datos en localStorage
            localStorage.setItem("userLogin", JSON.stringify(userLogin))
            location.href = "../index.html";
        }
    }catch (error){
        console.log(error);
    }  
};