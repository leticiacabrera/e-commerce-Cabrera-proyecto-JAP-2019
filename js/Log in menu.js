function get(){
    var email = localStorage.getItem("Username"); //Obtener datos almacenados
    document.getElementById("dropdownMenuButton").innerHTML = email; //Mostrar datos almacenados
};
get();
