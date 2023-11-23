function peticionHTTP(){
    //Obtener instancia del objeto XMLHttpRequest
    if(window.XMLHttpRequest){
       var peticion_http = new XMLHttpRequest();
    }else if(window.ActiveXObject){
        var peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // Preparar la función de respuesta
    peticion_http.onreadystatechange = muestraContenido;

    //Realizar petición HTTP
    peticion_http.open("POST", "/identificar", true);
    peticion_http.setRequestHeader( "content-Type","application/json;charset=UTF-8");
    peticion_http.send(JSON.stringify({username:"paco", password:"1234"}));

    function muestraContenido(){
        if(peticion_http.readyState == 4){
            if(peticion_http.status == 200){
                alert(peticion_http.responseText);
            }
        }
    }
}
function peticionHTTP2(){
    //Obtener instancia del objeto XMLHttpRequest
    if(window.XMLHttpRequest){
       var peticion_http = new XMLHttpRequest();
    }else if(window.ActiveXObject){
        var peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // Preparar la función de respuesta
    peticion_http.onreadystatechange = muestraContenido;

    //Realizar petición HTTP
    peticion_http.open("GET", "/saluda", true);
   
    peticion_http.send(null);

    function muestraContenido(){
        if(peticion_http.readyState == 4){
            if(peticion_http.status == 200){
                alert(peticion_http.responseText);
            }
        }
    }
}