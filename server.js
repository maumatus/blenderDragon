//Ambiente de desarrollo. Environment.
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
    
};

//Importamos los modulos necesarios
let express = require('express')
let app = express()
const path = require('path')
const csv = require('./js/b-dragon.js')


//Para leer archivos
let fs = require('fs')
const res = require('express/lib/response')
const csvData = require('./js/b-dragon.js')
const csvDataTrack = require('./js/b-dragon.js')

//Definimos puerto escucha
let PORT = 3000

//Publicamos carpeta public completa para terner disponible
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static(__dirname + '/public'));
app.use("/public/css/", express.static(__dirname + '/public/css/'));
app.use('/public/img/', express.static(__dirname + '/public/img/'));
app.use('/public/js/', express.static(__dirname + '/public/js/'));

//Rutas
app.get("/",(req,res) => {
    res.sendFile(__dirname + '/public/html/index.html')
});

//Usamos el Router
app.use("/b-dragon", csvDataTrack);



//Ejecutamos server
//app.listen(PORT, () =>{`Server ejecutanto en http://localhost/${PORT}`});
app.listen(process.env.PORT || 3000);
console.log(`ejecutando por http://localhost:${PORT}`)