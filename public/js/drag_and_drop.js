//var { raw } = require("express");

//Seleccionando todos los elementos necesarios
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = document.querySelector("button"),
input = dropArea.querySelector("input");

//This is a global variable
var file;

//If user click on the button then the input also clicked
button.onclick = () => {

    input.click;
};

input.addEventListener("change", function() {
    /*Getting user select file and [0]
    this mean if user select multiple files then we'll 
    select only the first one*/
    file = this.files[0]
});

//If user drag File Over DragArea
dropArea.addEventListener("dragover", (event)=> {
    event.preventDefault(); //Preventing default behaviour
    console.log("Archivo esta sobre DragArea")
    dropArea.classList.add("active");
    dragText.textContent = "Suelta para cargar archivo";
});

//If user leave dragged File from DragArea
dropArea.addEventListener("dragleave", ()=> {
    console.log("Archivo esta fuera de DragArea")
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta para cargar archivo";
});

//If user drop File in DropArea
dropArea.addEventListener("drop", (event)=> {
    event.preventDefault(); //Preventing default behaviour
    dragText.textContent = "Archivo cargado";
    console.log("Archivo es depositado en DragArea")
    /*Getting user select file and [0]
    this mean if user select multiple files then we'll 
    select only the first one*/
    file = event.dataTransfer.files[0];
    let fileType = file.type;
    console.log(fileType)
    console.log("Vemos lo que carga archivo File definido afuera como variable")
    console.log(file)

    //Validamos extension por JS
    let validExtensions = ["text/csv"]

    if (validExtensions.includes(fileType)) {
        //Desde aqui lee archivo para tomar datos para usar en graficos
        let fileReader = new FileReader();//Creating a news Reader Object
        //console.log("aqui vemos lo que nos carga FileReader luego de validar")
        //console.log(fileReader)

        fileReader.onload = () => {
            let fileURL = fileReader.result;
            let datos = fileURL.split("\r\n")
            let datos_2 = datos.pop()
            let arr = datos.toString().split(",");
            console.log("vemos si tenemos arrays de strings unitarios")
            console.log(arr)

            //Prueba**********************
            //Este metodo funciona pero no envía archivo.
            //Cuerpo de peticion solo carga input de campo, falta archivo
            form_id.addEventListener('submit', e => {
            let file = JSON.stringify(arr);//Convertimos a string para poder enviar con Fetch la variable con Array
            console.log("Vemos si carga valores de CSV dentro funcion Fetch")
            console.log(file)
            
            e.preventDefault()
            let form = {file}//Aqui agregamos variable con objeto definida antes y resulto envío ;)
                new FormData(form_id).forEach((value,key) => form[key] = value)
    
                fetch('/b-dragon', {
                    method:'POST',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(form),
                })
                //.then((res) => res.json())
                .then(data => console.log(data))
                .catch((err) => console.log(err))  
            })
            //************Prueba
            
            
         
            //Variables para guardar datos de keyframes
            const resPosXvTRACK = []; //variables x para grafico
            const resPosYvTRACK = []; //variables y para grafico
            const resPosXvTILT = []; //variables x para grafico
            const resPosYvTILT = []; //variables y para grafico
            const resPosXvPAN = []; //variables x para grafico
            const resPosYvPAN = []; //variables y para grafico
           
            /*Importante*/

            /*Este loop toma valor largo de array para capturar valor keyframes correspondientes a cantidad de valores
            asi se ajusta automatico y no hay que introducir valor para que capture los correspondientes.
            Aplicaremos este mismo en backend para simmplificar funcion y eliminar un valor a introducir en DOM*/
            
            //Keyframes eje X vTRACK
            for (let a = 0; a < arr.length/3; a = a + 2) {
                let element = arr[a]
                resPosXvTRACK.push(element)
            };

            /*Lo mismo que arriba pero probar con lecturas de mas keyframes desde CSV*/
            //Keyframes eje Y vTRACK
            for (let b = 1; b < arr.length/3 + 1; b = b + 2) {
                let element = arr[b]
                resPosYvTRACK.push(element)
            };

            //Valor constante para convertir a grados rotacion en radianes
            const convertRad = 180/Math.PI;

            //Keyframes eje X vTILT
            for (let a = arr.length/3; a < arr.length - arr.length/3; a = a + 2) {
                let element = arr[a]
                resPosXvTILT.push(element)
            };

            /*Lo mismo que arriba pero probar con lecturas de mas keyframes desde CSV*/
            //Keyframes eje Y vTILT
            for (let b = arr.length/3 + 1; b < arr.length - arr.length/3; b = b + 2) {
                let element = arr[b] * convertRad
                resPosYvTILT.push(element)
            };

            //Keyframes eje Z vPAN
            for (let a = arr.length/3 + arr.length/3; a < arr.length ; a = a + 2) {
                let element = arr[a]
                resPosXvPAN.push(element)
            };

            /*Lo mismo que arriba pero probar con lecturas de mas keyframes desde CSV*/
            //Keyframes eje Z vPAN
            for (let b = arr.length/3 + arr.length/3 + 1; b < arr.length ; b = b + 2) {
                let element = arr[b] * convertRad
                resPosYvPAN.push(element)
            };
/*
            console.log("Valores de keyframes eje X e Y - vTRACK")
            console.log(resPosXvTRACK)
            console.log(resPosYvTRACK)
            console.log("Valores de keyframes eje X e Y - vTILT")
            console.log(resPosXvTILT)
            console.log(resPosYvTILT)
            console.log("Valores de keyframes eje X e Y - vPAN")
            console.log(resPosXvPAN)
            console.log(resPosYvPAN)
*/
//Aquí agregaremos la logica de ChartJS
//Leemos los mismos datos que desde back para generar grafico de movimiento

                const myForm = document.getElementById("form_id");
                const csvFile = document.getElementById("csvFile");

                myForm.addEventListener("submit", function (e) {
                    e.preventDefault();   
                    //Cargamos el .csv y creamos un lector del archivo por Objeto de JS
                    const input = csvFile.files[0];
                    const reader = new FileReader();
                    
                    //Definimos que hace la función cuando carga el archivo.csv
                    reader.onload = function (event) {
                        console.log(event.target.result); // the CSV content as string
                    };
                    //console.log("Esta respuesta es de frontend - graph.js")
                    //console.log("Archivo enviado");
                    //reader.readAsText(input)//aqui hay problema con argumento 1
                    //console.log(input)
                });


                //Configuracion
                const labels = resPosXvTRACK;

                const data = {
                    labels: labels,
                    datasets: [{
                    label: 'vTILT',
                    backgroundColor: 'green',
                    borderColor: 'green',
                    pointStyle: 'circle',
                    pointRadius: 10,
                    pointHoverRadius: 15,
                    data: resPosYvTILT,
                    },{
                    label: 'vPAN',
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    pointStyle: 'circle',
                    pointRadius: 10,
                    pointHoverRadius: 15,
                    data: resPosYvPAN,
                    }],
                };

                const config = {
                    type: 'line',
                    data: data,
                    options: {}
                };

                //Render
                const myChart = new Chart(
                    document.getElementById('myChart'),
                    config
                );

//Termino logica chart.js

//Aquí agregaremos la logica de ChartJS02
//Leemos los mismos datos que desde back para generar grafico de movimiento

                const myForm2 = document.getElementById("form_id");
                const csvFile2 = document.getElementById("csvFile");

                myForm.addEventListener("submit", function (e) {
                    e.preventDefault();
                    //Cargamos el .csv y creamos un lector del archivo por Objeto de JS
                    const input = csvFile.files[0];
                    const reader = new FileReader();
                    
                    //Definimos que hace la función cuando carga el archivo.csv
                    reader.onload = function (event) {
                        console.log(event.target.result); // the CSV content as string
                    };
                    //console.log("Esta respuesta es de frontend - graph.js")
                    //console.log("Archivo enviado");
                    //reader.readAsText(input)//Tb problema con argumento
                    //console.log(input)
                });


                //Configuracion
                const labels2 = resPosXvTRACK;

                const data2 = {
                    labels: labels2,
                    datasets: [{
                    label: 'vTRACK',
                    backgroundColor: 'red',
                    borderColor: 'red',
                    pointStyle: 'circle',
                    pointRadius: 10,
                    pointHoverRadius: 15,
                    data: resPosYvTRACK,
                    },
                    ],
                };

                const config2 = {
                    type: 'line',
                    data: data2,
                    options: {}
                };

                //Render
                const myChart2 = new Chart(
                    document.getElementById('myChart2'),
                    config2
                );

//Termino logica chart.js
        }

        fileReader.readAsText(file)//faltaba file, archivo de input

    } else {
        alert("Esta archivo no es valido!")
        dropArea.classList.remove("active")
    }
});











