/***Variables Globales***/

//Aqui se guardarán todas las cartas de la baraja
var arrayCartas=[];

//Aquí se guardarán las cartas de la banca
var arrayCartasBanca=[];

//Aquí se guardarán las cartas del jugador
var arrayCartasJugador=[];

//Aquí llevaremos un registro de las cartas utilizadas, para que no se repitan. Guardaremos los números aleatorios que referencian esas cartas
var arrayCartasUsadas=[];

//Este contador es para darle valor a las cartas
var contador=1;
//Contador de cartas Banca y Jugador
var contadorBancaImg=0;
var contadorJugadorImg=0;
//contador para los id de las imágenes.
var contadorIdImagenesBanca=1;
var contadorIdImagenesJugador=1;
/*
//Estos contadores guardarán el valor actual de la mano de cada uno
var contadorBanca=0;
var contadorJugador=0;
*/

/***Objetos***/
class Imagen{
    constructor(imagen,valor){
       this.imagen=imagen; 
       this.valor=valor;
    }
}

/***Creación del array de cartas completo***/
for(let i=1;i<=52;i++){
    
    
    let imagen = "img/" + i + ".png";
    let valor;
    //Como cada palo engloba 13 cartas reiniciamos el contador
    if(contador>13){
        contador=1;
    }
    //Como el valor depende de la carta se lo asignamos manualmente
    switch(contador){
        case 1:
            valor=1;
            break;
        case 2:
            valor=2;
            break;
        case 3:
            valor=3;
            break; 
        case 4:
            valor=4;
            break;
        case 5:
            valor=5;
            break;
        case 6:
            valor=6;
            break;
        case 7:
            valor=7;
            break;
        case 8:
            valor=8;
            break;
        case 9:
            valor=9;
            break;
        case 10:
            valor=10;
            break;
        case 11:
            valor=10;
            break;
        case 12:
            valor=10;
            break;
        case 13:
            valor=10;
            break;

    }
    //como el "AS" vale 1 u 11 según conveniencia con esta condición plasmo eso en el valor
    let comprobarAsBanca=actualizarContadorBanca()+valor;
    let comprobarAsJugador=actualizarContadorJugador()+valor;
    if(valor==1&&comprobarAsBanca<=21||valor==1 &&comprobarAsJugador<=21){
        valor=11;
    }

    let objetoImagen = new Imagen(imagen, valor);
    arrayCartas.push(objetoImagen);
    contador++;
}

/***Funciones***/

//Aqui generaremos una carta aleatoria sirve tanto para la banca como para el jugador
function asignarCartaAleaoriaBancaJugador(){
    let numeroAleatorio;
    //Esto comprobará que la carta se haya utilizado por lo que generará numeros aleatorios hasta que no coincida con ningúna carta ya utilizada
    do {
        numeroAleatorio = Math.floor(Math.random() * 52)+1;
        
    } while (arrayCartasUsadas.includes(numeroAleatorio));
    
    //Guardamos la el número aleatorio que referencia la carta utilizada
    arrayCartasUsadas.push(numeroAleatorio);

    let cartaAleatoria = arrayCartas[numeroAleatorio];
    return cartaAleatoria;
    
}
//Como la mano inicial representa 2 cartas, añadimos 2 cartas a la mano de cada uno
function asignarManoInicialBanca(){
    //Como se introducen 2 cartas a la mano, el contador incrementa en 2
    
    for(let i=0;i<2;i++){
        arrayCartasBanca[i]=asignarCartaAleaoriaBancaJugador();
        contadorBancaImg++;
        let carta1 = document.getElementById("cartaBanca"+contadorIdImagenesBanca);
        // sustituimos por las nuevas imágenes
        carta1.src = arrayCartasBanca[contadorBancaImg-1].imagen;
        //Incrementamos contador de imagenes
        contadorIdImagenesBanca++;
    }
}
//Como la mano inicial representa 2 cartas, añadimos 2 cartas a la mano de cada uno
function asignarManoInicialJugador(){
    //Como se introducen 2 cartas a la mano, el contador incrementa en 2
    
    for(let i=0;i<2;i++){
        arrayCartasJugador[i]=asignarCartaAleaoriaBancaJugador();
        contadorJugadorImg++;

        let carta1 = document.getElementById("cartaJugador"+contadorIdImagenesJugador);
    
        // sustituimos por las nuevas imágenes
        carta1.src = arrayCartasJugador[contadorJugadorImg-1].imagen;
        contadorIdImagenesJugador++;
    }
}
//Función para añadir 1 sola carta más a la banca
function asignarCartaBanca(){
    //Incrementamos en 1 cada vez que se pida una carta
    contadorBancaImg++;
    arrayCartasBanca.push(asignarCartaAleaoriaBancaJugador());
}

//Función para añadir 1 sola carta más al jugador
function asignarCartaJugador(){
    //Incrementamos en 1 cada vez que se pida una carta
    contadorJugadorImg++;
    arrayCartasJugador.push(asignarCartaAleaoriaBancaJugador());
}
//Función para colocar Carta Banca en html
function añadirCartaBancaHtml(){
    //si la banca se pasa de 21 o ha llegado ya a 21, no permite volver a pulsar el botón
    if(deshabilitarBotonPedirCarteBanca()){
        asignarCartaBanca();
        //Sacamos la referencia de donde estan
        let carta1 = document.getElementById("cartaBanca"+contadorIdImagenesBanca);
        // sustituimos por las nuevas imágenes
        carta1.src = arrayCartasBanca[contadorBancaImg-1].imagen;
        //Incrementamos contador de imagenes
        contadorIdImagenesBanca++;
        actualizarContadorBanca();
        //Se deshabilita el botón pedir carta si se intenta meter más de 4 cartas
        if(contadorIdImagenesBanca>6){
        document.getElementById('botonBanca1').disabled = true;//Lo encontre en internet buscando que se deshabilitara el boton una vez presionado
        }
}
    

    
}
//Función para colocar Carta Jugador en html
function añadirCartaJugadorHtml(){
    //si el jugador se pasa de 21 o ha llegado ya a 21, no permite volver a pulsar el botón
    if(deshabilitarBotonPedirCarteJugador()){
        asignarCartaJugador();
        //Sacamos la referencia de donde estan
        let carta1 = document.getElementById("cartaJugador"+contadorIdImagenesJugador);
        
        // sustituimos por las nuevas imágenes
        carta1.src = arrayCartasJugador[contadorJugadorImg-1].imagen;
        contadorIdImagenesJugador++;
        actualizarContadorJugador();
        //Se deshabilita el botón pedir carta si se intenta meter más de 4 cartas
        if(contadorIdImagenesJugador>6){
        document.getElementById('botonJugador1').disabled = true;
        }
    }
}

//Esta función es para colocar la mano inicial a la banca
function colocarCartasInicioBanca(){
    asignarManoInicialBanca();
    /*
    //Sacamos la referencia de donde estan
    let carta1 = document.getElementById("cartaBanca"+contadorIdImagenes);
    // sustituimos por las nuevas imágenes
    carta1.src = arrayCartasBanca[0].imagen;
    //Incrementamos contador de imagenes
    contadorIdImagenes++;
    //lLo mismo
    let carta2 = document.getElementById("cartaBanca"+contadorIdImagenes);

    carta2.src = arrayCartasBanca[1].imagen;*/

    

    actualizarContadorBanca();
    
}

//Esta función sirve para colocar la mano inicial al jugador
function colocarCartasInicioJugador(){
    asignarManoInicialJugador();
    
    actualizarContadorJugador();
    
}
/*
//Añade la TERCERA carta a la banca en el html
function añadirTerceraCartaBanca(){
    asignarCartaBanca();
    let carta1 = document.getElementById("cartaBanca3");
    //El indice va a ser contador -1 porque al ser un array los indices empiezan en 0
    carta1.src = arrayCartasBanca[contadorBanca-1].imagen;
    document.getElementById('botonBanca1').disabled = true;//Lo encontre en internet buscando que se deshabilitara el boton una vez presionado
    actualizarContadorBanca();
    
}

//Añade la TERCERA carta  al jugador en el html
function añadirTerceraCartaJugador(){
    asignarCartaJugador();
    let carta1 = document.getElementById("cartaJugador3");
    //El indice va a ser contador -1 porque al ser un array los indices empiezan en 0
    carta1.src = arrayCartasJugador[contadorJugador-1].imagen;
    document.getElementById('botonJugador1').disabled = true;
    actualizarContadorJugador();
    
}
//Añade la CUARTA carta a la banca en el html
function añadirCuartaCartaBanca(){
    asignarCartaBanca();
    let carta1 = document.getElementById("cartaBanca4");
    carta1.src = arrayCartasBanca[3].imagen;
    document.getElementById('botonBanca2').disabled = true;
    actualizarContadorBanca();
   
}

//Añade la CUARTA carta  al jugador en el html
function añadirCuartaCartaJugador(){
    asignarCartaJugador();
    let carta1 = document.getElementById("cartaJugador4");
    carta1.src = arrayCartasJugador[3].imagen;
    document.getElementById('botonJugador2').disabled = true;
    actualizarContadorJugador();
    
}
*/

//Por medio del botón empezar ejecutaremos las funciones que dan cartas iniciales al jugador y la banca
function empezarJuego(){
    
    colocarCartasInicioBanca();
    colocarCartasInicioJugador();
   
}
//Esta función se usa para contar el valor de las cartas de la mano
function actualizarContadorBanca() {
    let contadorBanca=0;
    arrayCartasBanca.forEach(function(elemento){
        contadorBanca+=elemento.valor;
    });
    if(contadorBanca<21){
        document.getElementById("contadorBanca").textContent = contadorBanca; 
    }else if(contadorBanca==21){
        document.getElementById("contadorBanca").textContent = "Has llegado a 21!!!!";
    }else{
        document.getElementById("contadorBanca").textContent = "TE HAS PASADO DE 21!!!!";
    }
    return contadorBanca;
}
//Esta función se usa para contar el valor de las cartas de la mano
function actualizarContadorJugador() {
    let contadorJugador=0;
    arrayCartasJugador.forEach(function(elemento){
            contadorJugador+=elemento.valor;
    });
    if(contadorJugador<21){
    document.getElementById("contadorJugador").textContent = contadorJugador;
    }else if(contadorJugador==21){
        document.getElementById("contadorJugador").textContent = "Has llegado a 21!!!!";
    }else{
        document.getElementById("contadorJugador").textContent = "TE HAS PASADO DE 21!!!!";
    }
    return contadorJugador;
}

//Mandamos a la pagina de ganadores, estableciendo todas las posibilidades de resultado posibles
function ganador(){
    let banca=actualizarContadorBanca();
    let jugador=actualizarContadorJugador();
    if(banca==21 && jugador==21){
        window.location.href = "ganador.html?nombre=ambos";
    }else if(banca>jugador&&banca<22){
        window.location.href = "ganador.html?nombre=banca";
    }else if(banca<jugador&&jugador<22){
        window.location.href = "ganador.html?nombre=jugador";
    }else if(banca==jugador&&jugador<22&&banca<22){
        window.location.href = "ganador.html?nombre=ambos";
    }else{
        if(jugador > 21 && banca<22){
            window.location.href = "ganador.html?nombre=banca";   
        }else if(jugador < 22 && banca > 22){
            window.location.href = "ganador.html?nombre=jugador";
        }else if (jugador>21&&jugador>21){
            window.location.href = "ganador.html?nombre=ninguno"; 
        }else{
            window.location.href = "ganador.html?nombre=error";
        }
        
    }
}

function recuperarGanador(){
    //Sacado de internet para capturar elementoss de la url https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    // Crear una instancia de URLSearchParams a partir de una URL
    const url = new URL(window.location.href);
    const parametros = new URLSearchParams(url.search);

    // Obtener valores de parámetros de consulta
    const nombre = parametros.get('nombre'); 

    return nombre;
}
//Deshabilitamos los botones de pedir carta nada mas abrir la página, por eso no está dentro de una función y lo habilitamos cuando se presione el botón empezar
document.getElementById("botonBanca1").disabled = true;
document.getElementById("botonJugador1").disabled = true;
//Este codigo está sacado de internet: addEventListener ("click", function() {//

document.getElementById("empezar").addEventListener("click", function() {
    


    
    document.getElementById("botonBanca1").disabled = false;
    document.getElementById("botonJugador1").disabled = false;
    // Deshabilita el botón "empezar"
    this.disabled = true;
   
});
//Tambien haremos que si alguno llega a 21, se pase o el contrincante se haya pasado  se deshabilite el boton pedir carta correspondiente 
function deshabilitarBotonPedirCarteBanca(){
    let banca=actualizarContadorBanca();
    let jugador=actualizarContadorJugador();
    let comprobadorBoton=true;
    if(banca>=21||jugador>21){
        document.getElementById("botonBanca1").disabled = true;
        comprobadorBoton=false;
        
    } 
    return comprobadorBoton;

}
function deshabilitarBotonPedirCarteJugador(){
    let jugador=actualizarContadorJugador();
    let banca=actualizarContadorBanca();
    let comprobadorBoton=true;
    if(jugador>=21||banca>21){
        document.getElementById("botonJugador1").disabled = true;
        comprobadorBoton=false;
    }
    return comprobadorBoton;
}

