function set(){
    /*Captura de datos escrito en el input*/        
    var email = document.getElementById("inputUsername").value;
    /*Guardando los datos en el LocalStorage*/
    localStorage.setItem("Username", email);
};
