//Este modulo con logica lee CSV, transforma a stream y devuelve final% array con arrays de datos keyframes 
const fs = require('fs');
const { parse } = require('csv-parse');
const parser = parse(
    {columns: true}, 
    function (err, records) {
	console.log(records);
});
const { create } = require("xmlbuilder2")
const { builtinModules } = require('module');
const { on } = require('events');
const { resourceLimits } = require('worker_threads');
const res = require('express/lib/response');

//Router
var express = require('express')
var router = express.Router()

/*Organizamos todo dentro de un Router. Esto permite tomar variables directo
desde Fetch ahorrando problema de traspaso de Server a un Modulo*/
router.post('/b-dragon', function(req,res){

    //Pasamos lo que estaba en metodo POST desde server.js
    //res.sendFile(__dirname + '/public/html/index.html');

    try {
    var arrFetch = req.body.file
    var dir = req.body.dir_export//Definimos Scope mas amplio por fuera para usarlo en b-dragon.js

        //Variable contenedora array
        const results = [];

        //Creamos la función para leer CSV usando CSV-Parser
        function csvDataDragon() {  
      
            function cargaDatosExp() {
            //Reformulamos funcion para dividor array del lector al tiro   
                function csvToDragonLineal() {

                    //Probamos simplificar funcion que crea array multidimensional
                    //Aqui contenemos todos los datos
                    /*
                    let file = results;
                    var arr = results.toString().split(",");
                    */
                    /*
                    let arrNum = arrFetch.map(str => {
                        return Number(str);
                      });
                    */
                    //var arr = arrNum;
                    var arr2 = JSON.parse(arrFetch)//Parse de datos desde fetch. Era un json
                    var arr = arr2;
                    console.log("Vemos que nos carga la variable csv desde fetch")
                    console.log(arr)

        //Valores de vTrack+ segun nomenclatura de Kuper MOCO, traslación en eje X+.
                    //PosicionX
                    var keyMocoPosX =[];
                    var keyMocoCtrlPointPosX =[];
                    var keyMocoCtrlPointPosXRep = []; 
        
                
                    //Probamos obtener los valores pero con un loop For con dos variables para el mismo array
                    for (let i = 0; i < arr.length/3 ; i = i + 2) {
                        
                        
                        const a = arr[i];
                        const b = (parseFloat(arr[i+1])).toFixed(3);//Este indice obtiene valor anterior a lo recorrido por loop general

                        //textPos.push(element)
                        keyMocoPosX.push(`<scen:points x="${a}" y="${b}" type="5"/>`)
                        keyMocoCtrlPointPosX.push(`<scen:controlPoints x="${a}" y="${b}"/>`)
                        keyMocoCtrlPointPosXRep.push(`<scen:controlPoints x="${a}" y="${b}"/>`)
                        
                    }

                    //Para repetir los puntos de control lo haremos con uniendo arrays y luego quitamos inicio y fin con Pop() y Merge(). Esta Funcion es para vTRACK 
                    let run1 = 0, first1 = 0, second1 = 0;
                    const keyMocoCtrlPointPosXWrite = [];

                    while(run1 < keyMocoCtrlPointPosX.length + keyMocoCtrlPointPosXRep.length) {

                        if(first1 > second1){
                            keyMocoCtrlPointPosXWrite[run1] = keyMocoCtrlPointPosXRep[second1];
                        second1++;
                        }else{
                            keyMocoCtrlPointPosXWrite[run1] = keyMocoCtrlPointPosX[first1];
                        first1++;
                        }
                        run1++;
                    };
                    //Le sacamos el inicio y el final
                    keyMocoCtrlPointPosXWrite.shift()
                    keyMocoCtrlPointPosXWrite.pop()
                    //Revisamos si tiene el formato requerido
                    console.log("revisamos el nuevo array, si escribe y tiene puntos de control pos x repetidos")
                    console.log(keyMocoCtrlPointPosXWrite);

        //Fin reformulacion para vTRACK. Pruebas unitarias ok.


        //Desarrollamos funcion para leer rotacion en eje X o sea movimiento vTILT segun nomenclatura de Kuper MOCO
                
                    //Variable con valor a multiplicar para convertir Radianes a Grados.
                    const convertRad = 180/Math.PI;
        
                    //Variables para datos rot X
                    console.log("Valores rotacion X")
                    var keyMocoRotX =[];
                    var keyMocoCtrlPointRotX =[];
                    var keyMocoCtrlPointRotXRep = []; 

                    //Esta funcion es para valores de rotacion eje x. vTILT
                    
                    for (let i = arr.length/3; i < arr.length/3 + (arr.length/3); i = i + 2) {
                    
                        let resp = arr[i];
                        
                        let a = resp == 0 ? 1: resp;//Ternary. Si la respuesta el igual a 0, entonces cambiar a 1 sino es igual a respuesta
                        let b = ((parseFloat(arr[i+1])) * convertRad).toFixed(3);//Este indice obtiene valor anterior a lo recorrido por loop general
                
                        console.log("Revisamos el ternario de vTILT")
                        console.log(a)
                        //textPos.push(element)
                        keyMocoRotX.push(`<scen:points x="${a}" y="${b}" type="5"/>`)
                        keyMocoCtrlPointRotX.push(`<scen:controlPoints x="${a}" y="${b}"/>`)
                        keyMocoCtrlPointRotXRep.push(`<scen:controlPoints x="${a}" y="${b}"/>`)
                        
                    };
                
                    //Para repetir los puntos de control lo haremos uniendo arrays y luego quitamos inicio y fin con Pop() y Merge(). Esto para eje X. 
                    let run2 = 0, first2 = 0, second2 = 0;//Ya estan declaradas arriba estas variables
                    const keyMocoCtrlPointRotXWrite = [];

                    while(run2 < keyMocoCtrlPointRotX.length + keyMocoCtrlPointRotXRep.length) {

                        if(first2 > second2){
                            keyMocoCtrlPointRotXWrite[run2] = keyMocoCtrlPointRotXRep[second2];
                        second2++;
                        }else{
                            keyMocoCtrlPointRotXWrite[run2] = keyMocoCtrlPointRotX[first2];
                        first2++;
                        }
                        run2++;
                    };
                    
                    //Le sacamos el inicio y el final
                    keyMocoCtrlPointRotXWrite.shift()
                    keyMocoCtrlPointRotXWrite.pop()
                    //Revisamos si tiene el formato requerido
                    console.log("revisamos el nuevo array, si tiene puntos de control rot x repetidos");
                    console.log(keyMocoCtrlPointRotXWrite);

        //Desarrollamos la funcion para procesar rotación en eje Z o sea movimiento vPAN segun nomenclatura de Kuper MOCO
                    //Declaramos las variables para guardar datos rot Z
                
                    var keyMocoRotZ =[];
                    var keyMocoCtrlPointRotZ =[];
                    var keyMocoCtrlPointRotZRep = []; 
                
                    //Funcion para obtener valores eje Z. vPAN

                    for (let i =arr.length/3 + (arr.length/3); i < arr.length; i = i + 2) {
                    
                        let resp = arr[i];
                        
                        let a = resp == 0 ? 1 : resp;//Ternary. Si la respuesta el igual a 0, entonces cambiar a 1 sino es igual a respuesta
                        let b = ((parseFloat(arr[i+1])) * convertRad).toFixed(3);//Este indice obtiene valor anterior a lo recorrido por loop general
                    
                        console.log("vemos que responde ternario de Rot Z.a")
                        console.log(a)
                        //textPos.push(element)
                        keyMocoRotZ.push(`<scen:points x="${a}" y="${b}" type="5"/>`)
                        keyMocoCtrlPointRotZ.push(`<scen:controlPoints x="${a}" y="${b}"/>`)
                        keyMocoCtrlPointRotZRep.push(`<scen:controlPoints x="${a}" y="${b}"/>`)
                        
                    };
                    
                    //Para repetir los puntos de control lo haremos con uniendo arrays y luego quitamos inicio y fin con Pop() y Merge(). Esto para eje X. 
                    let run3 = 0, first3 = 0, second3 = 0;//Ya estan declaradas arriba estas variables
                    const keyMocoCtrlPointRotZWrite = [];

                    while(run3 < keyMocoCtrlPointRotZ.length + keyMocoCtrlPointRotZRep.length) {

                        if(first3 > second3){
                            keyMocoCtrlPointRotZWrite[run3] = keyMocoCtrlPointRotZRep[second3];
                        second3++;
                        }else{
                            keyMocoCtrlPointRotZWrite[run3] = keyMocoCtrlPointRotZ[first3];
                        first3++;
                        }
                        run3++;
                    };
                    //Le sacamos el inicio y el final
                    keyMocoCtrlPointRotZWrite.shift()
                    keyMocoCtrlPointRotZWrite.pop()
                    //Revisamos si tiene el formato requerido
                    console.log("revisamos el nuevo array para Rot Z, si tiene puntos de control repetidos")
                    console.log(keyMocoCtrlPointRotZWrite);


        //Aqui desarrollamos la función que genera el archivo XMLBuilder y lo escribe a un directorio
        //Esta funcion es para interpolacion lineal de los keyframes, por eso Los puntos de control son los mismos a los keyframes

                    function arcmWriter() {

                        //Esta funcion escribe los valores de los 3 componentes, o sea TRACK, TILT y PAN.      
                        const root =`
                        <?xml version="1.0" encoding="UTF-8"?>
                            <scen:scene xmlns:scen="http://caliri.com/motion/scene" cameraOperator="">
                                <scen:axis preset="eMotimo" pulseRate="10000" units="m" stepsPerUnit="444.444" graphSolo="true" connectionType="1" graphColor="-244974" integral="false" name="vTRACK" base="0" connectionChannel="3" runMaxVelocity="40000" runMaxAcceleration="200000" viewPosition="20">
                                    ${keyMocoPosX.join(" ")}
                                    ${keyMocoCtrlPointPosXWrite.join(" ")}      
                                </scen:axis> 
                                <scen:axis preset="eMotimo" pulseRate="10000" units="deg" stepsPerUnit="444.444" graphSolo="true" connectionType="1" graphColor="-461291" integral="false" name="vTILT" base="0" connectionChannel="2" runMaxVelocity="40000" runMaxAcceleration="200000" viewPosition="20">
                                    ${keyMocoRotX.join(" ")}
                                    ${keyMocoCtrlPointRotXWrite.join(" ")}      
                                </scen:axis>
                                <scen:axis preset="eMotimo" pulseRate="10000" units="deg" stepsPerUnit="444.444" graphSolo="true" connectionType="1" graphColor="-11039745" integral="false" name="vPAN" base="0" connectionChannel="1" runMaxVelocity="40000" runMaxAcceleration="200000" viewPosition="20">
                                    ${keyMocoRotZ.join(" ")}
                                    ${keyMocoCtrlPointRotZWrite.join(" ")}      
                                </scen:axis>
                            </scen:scene>`  

                            //Usamos el metodo join() para elimimar las comas de array
                            // Convertimos a XML string
                            const xml = create(root)
                            const xmlExport = xml.end({ prettyPrint: true })
                            console.log(xmlExport)
                            

                            //Escribimos el archivo finalmente .ARCM   
                            fs.writeFile(`${dir}.arcm`, xmlExport, (err) => {
                                if (err) throw err;
                                console.log('Archivo .arcm escrito!');
                                //console.log(fs.readFileSync("/Users/mauricio/Desktop/arcm/movInterpLineal2.arcm","utf8"))
                                });    
                            }; 
                        
                            arcmWriter();//Autoejecutamdos la funcion que toma los datos y los escribe. Fin logica.         
                    };

                var arr = results //metemos en la variable array los resultados de la lectura del CSV
                //console.log("resultados de arr mas afuera. NO procesados por Loop For")
                //console.log(arr)
                csvToDragonLineal()
            }
            cargaDatosExp();
        };
        csvDataDragon();

    } catch (error) {
        console.log(error)
    };
    res.redirect('back');
    res.end()
})

//Exportamos el router
module.exports =  router;