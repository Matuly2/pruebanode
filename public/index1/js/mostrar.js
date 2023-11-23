//Funciones para Node.js


function mostrar(){
   
    //Hago la petición al servidor y guardo la respuesta en la variable  promise
    var promise=$.ajax({
        type: "POST",
        url: "/mostrar",
        //lo que mando
        data:JSON.stringify(),
        contentType: "application/json;charset=UTF-8",
        dataType:"json"
});
//Tratar la respuesta que me da el servidor
promise.always(function(data){
let contenedor=data;

const jsonContenedor = document.getElementById('jsonContenedor');
// Crea un elemento de lista no ordenada (ul)
const elementoUl = document.createElement('ul');
elementoUl.classList.add('list-container');

// Recorre las propiedades del JSON y crea elementos de lista para cada propiedad
contenedor.forEach(elemento => {
    const elementoIl = document.createElement('li');
    elementoIl.innerHTML = elemento.nombre;
    elementoUl.appendChild(elementoIl); 
});


// Agrega la lista al contenedor
jsonContenedor.appendChild(elementoUl);

});
}

