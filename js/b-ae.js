/*La logica tiene que convertir el String proveniente desde el frontend
a un CSV con 3 columnas, con todos los keyframes. Que corresponden a los 3 ejes
de movimiento o vTRACK, vTILT, vPAN en nomenclatura KUPER Motion Control.
Ese CSV. (sin encabezados) sera interpretados en Adobe After Effects como
1 Fila == 1 Frame, por lo mismo debe venir "Baked" desde Blender (todos los frames con un keyframe).
Para hacer eso AE usa los scripts parte del set de integracion de softwares.
Asi completamos la integración unidireccional entre Blender 3D ==> App BlenderConvert ==> Dragonframe, After Effects.
*/


//Copiamos la funcion desde b-dragon
//Este modulo con logica lee CSV, transforma a stream y devuelve final% array con arrays de datos keyframes 
const fs = require('fs');
var express = require('express')
var router = express.Router()


router.post('/b-ae', function(req,res){ 

    try {
    var arrFetch = req.body.file
    var dir = req.body.dir_export//Definimos Scope mas amplio por fuera para usarlo en b-dragon.js

        //Variable contenedora array
        const results = [];

        //Creamos la función para leer CSV usando CSV-Parser
        function csvDataAe() {  
      
            function cargaDatosExp() { 

                    var arr2 = JSON.parse(arrFetch)//Parse de datos desde fetch. Era un json
                    var arr = arr2;
                    console.log("Stream con Fetch para ruta AE-Revisamos que nos captura")
                    console.log(arr)

        //vTrack+ 
                    var posX =[];
                    
                    for (let i = 0; i < arr.length/3 ; i = i + 2) {
                    
                        const a = arr[i];
                        const b = (parseFloat(arr[i+1])).toFixed(3);

                        posX.push(`${a},${b}`)       
                    };
                    console.log("vTRACK - BlenderAE")
                    console.log(posX)

        //vTILT              
                    //Variable con valor a multiplicar para convertir Radianes a Grados. Blender exporta en Radianes.
                    const convertRad = 180/Math.PI;
        
                    var rotX =[];

                    //Esta funcion es para valores de rotacion eje x. vTILT
                    
                    for (let i = arr.length/3; i < arr.length/3 + (arr.length/3); i = i + 2) {
                    
                        let resp = arr[i];
                        
                        let a = resp == 0 ? 1: resp;//Ternary. Si la respuesta el igual a 0, entonces cambiar a 1 sino es igual a respuesta
                        let b = ((parseFloat(arr[i+1])) * convertRad).toFixed(3);//Este indice obtiene valor anterior a lo recorrido por loop general
                        rotX.push(`${b}`)    
                    };
                    console.log("vTILT - BlenderAE")
                    console.log(rotX)   

        //vPAN
                
                    var rotZ =[];

                    for (let i =arr.length/3 + (arr.length/3); i < arr.length; i = i + 2) {
                    
                        let resp = arr[i];
                        
                        let a = resp == 0 ? 1 : resp;//Ternary. Si la respuesta el igual a 0, entonces cambiar a 1 sino es igual a respuesta
                        let b = ((parseFloat(arr[i+1])) * convertRad).toFixed(3);//Este indice obtiene valor anterior a lo recorrido por loop general
                        rotZ.push(`${b}`)       
                    };
                    console.log("vPAN - BlenderAE")
                    console.log(rotZ)

        //Agregamos valores para luego crear un CSV con formato necesario

                    var arrCsv = [];
                    posX.forEach(agregaColumn);

                    function agregaColumn(item,i,arr) {
                        arr[i] = `${item},${rotX[i]},${rotZ[i]}`
                        arrCsv.push(arr[i])
                    };
                    console.log("Vemos si suma valor al final de cada valor de array")
                    console.log(arrCsv)

        //Escribir CSV
    
                    function csvWriter() {

                        //Esta funcion escribe los valores de los 3 componentes, o sea TRACK, TILT y PAN.      
                        
                        var csv = "";

                        for (let i of arrCsv) {

                            //csv += i.join(",") + "\r\n"
                            csv +=  i + "\r\n"

                        };
                        console.log("vemos que empuja a variable csv")
                        console.log(csv)

                        fs.writeFile(`${dir}.csv`, csv, (err) => {
                            if (err) throw err;
                            console.log('Archivo CSV escrito');
                                //console.log(fs.readFileSync("/Users/mauricio/Desktop/arcm/movInterpLineal2.arcm","utf8"))
                            });    
                        };
                        csvWriter()
                    };
            cargaDatosExp();
            };
        csvDataAe();   
    } catch (error) {
        console.log(error)
    };
    res.redirect('back');
    res.end()
});

//Exportamos el router
module.exports =  router;


