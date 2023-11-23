//Conectarse a MongoDB
const mongoose = require("mongoose");
const mongoDBURI = "mongodb+srv://Matuly:1234@cluster0.oupthiv.mongodb.net/"
//Esquemas
//Definiendo el esquema del usuario
const usuarioSchema = new mongoose.Schema({
    nombre: String,
    password: String
});
// Creando modelo
const Usuario = mongoose.model("Usuario", usuarioSchema);
//mongoose.connect().then().catch();
const conectarDB = async () => {
try{
    await mongoose.connect(mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true});
    console.log("Conectado a MongoDB")
} catch(err){

    console.error("Eroral conectar a MongoDB", err);
    process.exit(1); //Detiene la conexxión en caso de error
    }
}

module.exports = {Usuario,conectarDB};