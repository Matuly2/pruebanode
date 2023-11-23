const express = require("express");
var fs = require("fs");
var cookieParser = require("cookie-parser");
var session = require("express-session");//Libreria para login
/*Esto borrarlo despues de la practica
const privateKey = fs.readFileSync("miclave.key", "utf-8");
const certificate = fs.readFileSync("micertificado.pem", "utf-8");
var credentials = {key:privateKey, cert:certificate, passphrase: "123456"};
var https = require("https");


 */
const mongoose = require("mongoose");
const {Usuario,conectarDB} = require("./conexion_mongo");
const app = express();
//var server=https.createServer(credentials, app);//Borrar esto tmb

var server = require("http").Server(app);//Comentar esto si quieres el certificao
var port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public/index1"));//Para permitir al servidor node que tenga acceso tanto el como el cliente a la carpeta public, tened cuidado con subdirectorios creados en la carpeta public.
app.use(session({
    secret: "Tu cadena secreta", //Agrega tu propia cadena secreta aqui
    resave: false,
    saveUninitialized: true,
    cookie: { secure:false}
}));

app.use (cookieParser("clave secreta")); //Clave de cifrado
//Variable de usuarios
var usuarios = cargarUsuarios();
//Funciones
var auth = function(req, res, next){
    if(req.session && req.session.user === "admin" && req.session.admin){
        return next();
    }else{
        return res.sendStatus(401);
    }
}

//Funciones GET
app.get("/", (req, response) =>{
    //Hacemos referencia al fichero a mostrar
    var contenido=fs.readFileSync("public/index1/index.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});
//Para ir al login
app.get("/login", (req,response)=> {
    var contenido = fs.readFileSync("public/index1/login.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});


//Para que solo puedan entrar usuarios permitidos
app.get("/rutaSegura", auth, (req,response)=> {
    var contenido = fs.readFileSync("public/index1/juego.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});
app.get("/peticionMedac", (req,response)=> {
    var contenido = fs.readFileSync("public/index1/peticionMedac.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});
app.get("/registro", (req,response)=> {
    var contenido = fs.readFileSync("public/index1/registro.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});
app.get("/registro2", (req,response)=> {
    var contenido = fs.readFileSync("public/index1/registro2.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});
app.get("/identificar2", (req,response)=> {
    var contenido = fs.readFileSync("public/index1/login2.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});
app.get("/mostrar", auth, (req,response)=> {
    var contenido = fs.readFileSync("public/index1/mostrar.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});


//Funciones POST
app.post("/identificar", function(req, res){
    if(!req.body.username || !req.body.password){//Si un campo no esta rellenado esto evita problemas en el servidor
            res.send({"res":"login failed"});
    }else {
        const usuarioEncontrado=usuarios.find(usuario =>
            usuario.username == req.body.username && usuario.password==req.body.password);
            if(usuarioEncontrado){
                req.session.user = "admin";
                req.session.admin = true;
                return res.send({"res":"login true"});
            }else{
        res.send({"res":"usuario no válido"});
            }
    }
});
/*Para tirar el servidor
app.post("/error", function(req, res){
    
    process.exit(1);
});*/
//Loguear con base de datos
app.post("/identificar2", async function(req, res){
    if(!req.body.username || !req.body.password){//Si un campo no esta rellenado esto evita problemas en el servidor
            res.send({"res":"login failed"});
    }else {
        const usuarioEncontrado=await Usuario.findOne({nombre:req.body.username}, {password:req.body.password});
            if(usuarioEncontrado){
                req.session.user = "admin";
                req.session.admin = true;
                return res.send({"res":"login true"});
            }else{
        res.send({"res":"usuario no válido"});
            }
    }
});
//Para el Json
app.post("/registrar", function(req, res){
    if(!req.body.username || !req.body.password){//Si un campo no esta rellenado esto evita problemas en el servidor
            res.send({"res":"register failed"});
    }else {
        //Creo una variable usuarioExiste con valor false, presuponiendo que no existe ese usuario.
        let usuarioExiste = false;
        //Recorro el array de usuarios comprobando uno por uno si existe un usuario con el nombre que estoy intentando crear. Si ya existe alguien con ese  nombre, pongo la variable usuarioExiste a true.
        usuarios.forEach(elemento => {
            if (elemento.username ==req.body.username){
                usuarioExiste=true;
            }
        });

        if (usuarioExiste){
            res.send({"res":"usuario ya existe"});
            //Si la variable usuarioExiste 
        }else{
            var usuario={
                username:req.body.username,
                password:req.body.password
            }
            usuarios.push(usuario);
            console.log(usuarios);
            guardarUsuarios(usuarios);
            res.send({"res":"register true"});

        }
    }
        
    
});
//Para la bdd
app.post("/registrar2", async function(req, res){
    if(!req.body.username || !req.body.password){//Si un campo no esta rellenado esto evita problemas en el servidor
            res.send({"res":"register failed"});
    }else{
        try{//Comprobamos si el usuario ya existe, el await hace que hasta que no devuelva la función no sigue(Es síncrono), esa función por lo de await
            usuarioExistente = await Usuario.findOne({nombre: req.body.username});
        }catch(err){
            console.error("Error al crear usuario: ", err);
        }
        if (usuarioExistente){
            console.log("Ya existe un usuario con ese nombre");
            res.send({"res":"usuario ya existe"});
        }else{
            const nuevoUsuario = new Usuario({
                nombre: req.body.username,
                password: req.body.password
            });
            try{
                nuevoUsuario.save();
                console.log("Nuevo usuario creado: ", nuevoUsuario);
                res.send({"res":"register true"});
            }catch(err){
                console.error("Error al crear usuario: ", err);
            }
        }
    }
        
    
});
//Recuperar todas las entradas de la base de datos
app.post("/mostrar", async function(req, res){

        try{//Comprobamos si el usuario ya existe, el await hace que hasta que no devuelva la función no sigue(Es síncrono), esa función por lo de await

             let usuariosBdd = await Usuario.find({}).select("nombre");
             res.json(usuariosBdd);
        }catch(err){
            console.error("Error al recuperar los usuario: ", err);
        }
        
    }
        
    
);
app.get("/saluda", function(req,res){
    res.send("Hola Mundo");
});
//Conectamos con la bdd
conectarDB();
//Función Main del Servidor
server.listen(port, () => {//Server es para meterle http
    console.log("Te estoy escuchando");
});

//Funciones de lógica, guardar y leer usuarios
function guardarUsuarios(usuarios){
    //Serializar el array a JSON
    const json = JSON.stringify(usuarios);
    //Escribir en un archivo
    fs.writeFileSync("usuarios.json", json, "utf8", function(err){
        if(err){
            console.log("Ha ocurrido un error al guardar los usuarios", err);
        }else{
            console.log("Usuarios guardados correctamente");
        }
    });
}

function cargarUsuarios(){
    try{
        //Leer el archivo
        const data = fs.readFileSync("usuarios.json", "utf8");
        //Deserializar el JSON a un objeto JavaScript
        console.log("Usuarios cargados");
        console.log(JSON.parse(data));
        return JSON.parse(data);
    }catch(err){
        //Si hay error al leer el archivo, por ejemplo, porque no existe , devolver un array vacío
        console.log("Error al leer los usuarios desde el archivo: ", err);
        return [];
    }
}