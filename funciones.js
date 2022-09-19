//Guarda una palabra ingresada por el usuario
function guardarPalabra(){
    var nuevaPalabra = document.querySelector("#ingresarPalabra").value;

    if(nuevaPalabra.length <9 ){
        nuevaPalabra = nuevaPalabra.toUpperCase();
        listaPalabras.push(nuevaPalabra);
        juego();
    }

    else{
        alert('La palabra debe ser de 8 caracteres máximos.')
    }
    
}

//Controla que las letras ingresadas sean caracteres en mayúscula
function controlLetra(e){
    var textarea = document.querySelector("#ingresarPalabra");
    if(e.key.charCodeAt(0) < 65 || e.key.charCodeAt(0) >90 ){
        textarea.value = textarea.value.replaceAll(e.key, "");
   }
}

//Actualiza los elementos de la pantalla al presionar 'Nueva Palabra'
function actualizarPantalla(){
    document.querySelector("#inicio").style.display="none";
    document.querySelector("#ingresoPalabra").style.display="block";
    document.querySelector("#juego").style.display="none";
    document.querySelector('footer').style.display='block';
    palabra='';

}

//Actualiza a la pantalla de inicio
function inicio(){
    document.querySelector("#inicio").style.display="block";
    document.querySelector("#ingresoPalabra").style.display="none";
    document.querySelector("#juego").style.display="none";
    document.querySelector('footer').style.display='block';

}

//Sortea la palabra secreta a usar
function palabraSecreta(){
    var index = listaPalabras.length;
    index= Math.floor(Math.random()*index);
    return listaPalabras[index];
}

//Dibuja la base de la horca
function dibujarHorca(){

    pincel.lineWidth = 6;
    pincel.lineCap = 'round';
    pincel.lineJoin ='round';
    pincel.fillStyle = 'rgb(19,38,92)';
    pincel.strokeStyle = 'rgb(19,38,92)';

    pincel.beginPath();
    pincel.moveTo(300, 25);
    pincel.lineTo(300, 250);
    
    pincel.moveTo(300, 25);
    pincel.lineTo(400, 25);

    pincel.moveTo(400, 25);
    pincel.lineTo(400, 40);

    pincel.moveTo(250, 250);
    pincel.lineTo(350, 250);

    pincel.stroke();
    pincel.closePath();
    
}

//Dibuja las líneas de las letras
function dibujarLinea(x){

    pincel.fillRect(x, 350, 30,3);
}

//Actualiza la pantalla para iniciar el juego e inicializa variables
function juego(){
    letrasUsadas = [];
    pincel.clearRect(0, 0, pantalla.width, pantalla.height);
    document.querySelector("#inicio").style.display="none";
    document.querySelector("#ingresoPalabra").style.display="none";
    document.querySelector("#juego").style.display="block";
    document.querySelector('footer').style.display='none';
    palabra=palabraSecreta();
    posicionLetrasIncorrectas = 205;
    intentos = 0;
    acierto = 0;
    dibujarHorca();

    var x=200;
    for (var i=0; i<palabra.length;i++){
        dibujarLinea(x);
        x+=50
    }

}

/*Funciones que se usan oara dibujar la persona cuando la letra es
incorrecta*/
function dibujarCabeza(){

    pincel.beginPath();
    pincel.arc(400, 70, 30, 2 * Math.PI, false);
    pincel.stroke();
    pincel.closePath();
}

function dibujarCuerpo(){

    pincel.beginPath();
    pincel.moveTo(400, 100);
    pincel.lineTo(400, 190);
    pincel.stroke();
    pincel.closePath();
}

function dibujarBrazoIzq(){

    pincel.beginPath();
    pincel.moveTo(400, 110);
    pincel.lineTo(430, 160);
    pincel.stroke();
    pincel.closePath();
}

function dibujarBrazoDer(){

    pincel.beginPath();
    pincel.moveTo(400, 110);
    pincel.lineTo(370, 160);
    pincel.stroke();
    pincel.closePath();

}

function dibujarPiernaIzq(){

    pincel.beginPath();
    pincel.moveTo(400, 190);
    pincel.lineTo(430, 230);
    pincel.stroke();
    pincel.closePath();

}

function dibujarPiernaDer(){

    pincel.beginPath();
    pincel.moveTo(400, 190);
    pincel.lineTo(370, 230);
    pincel.stroke();
    pincel.closePath();

}

/*Controla si se llegó al final del juego, por victoria o por
alcanzar el límite de errores*/
function controlFinal(){

    if(palabra != ''){
        if (intentos == 6){
            alert("Fin del juego. La palabra era " + palabra+'.');
        }
    
        if (acierto == palabra.length){
            alert("Ganaste! Felicidades!");
        }
    }
    
}

/*Selecciona qué parte del cuerpo dibujar dependiendo de la cantidad
de fallos*/
function dibujarFallo(){

    switch (intentos){
        case 1:
            dibujarCabeza();
            break;
        case 2:
            dibujarCuerpo();
            break;
        case 3:
            dibujarBrazoDer();
            break;
        case 4:
            dibujarBrazoIzq();
            break;
        case 5:
            dibujarPiernaDer();
            break;
        case 6:
            dibujarPiernaIzq();
            break;
        default:
            break;
    }
}

//Dibuja las letras correctas
function dibujarLetraCorrecta(letra){

    pincel.font = "25px Arial";
    posicionLetrasCorrectas = 205;

    for (var i=0; i<palabra.length;i++){

        if (palabra[i] == letra){
            pincel.fillText(letra, posicionLetrasCorrectas, 345);
        }
        posicionLetrasCorrectas += 50;
    }
}

//Dibuja las letras incorrectas
function dibujarLetraIncorrecta(letra){

    if(intentos<6 && acierto != palabra.length){
        pincel.font = "25px Arial";
        pincel.fillText(letra, posicionLetrasIncorrectas, 425);
        posicionLetrasIncorrectas += 50;
    }
    
}

//Controla si la letra ingresada es correcta o no
function controlTecla(e){

    if(intentos<6 && acierto != palabra.length){

        if (!letrasUsadas.includes(e.key.toUpperCase())){

            letrasUsadas.push(e.key.toUpperCase());
            if (!palabra.includes(e.key.toUpperCase())){
    
                intentos ++;
                dibujarLetraIncorrecta(e.key.toUpperCase());
                dibujarFallo();
            }
        
            else{
                dibujarLetraCorrecta(e.key.toUpperCase());
                for(var i=0; i<palabra.length;i++){
                    if (palabra[i]==e.key.toUpperCase()){
                        acierto++;
                    }
                }
            }
        }
    }
    
    controlFinal();
}

function controlLetraTeclado(objButton){

    if(intentos <6 && acierto != palabra.length){

        if (!letrasUsadas.includes(objButton.value)){

            letrasUsadas.push(objButton.value);
            if (!palabra.includes(objButton.value) && intentos < 6){
    
                intentos ++;
                dibujarLetraIncorrecta(objButton.value);
                dibujarFallo();
            }
        
            else{
                dibujarLetraCorrecta(objButton.value);
                for(var i=0; i<palabra.length;i++){
                    if (palabra[i]==objButton.value){
                        acierto++;
                    }
                }
            }
        }
    }
    
    
    controlFinal();
}

function crearTeclado(){
    var divs=['superior', 'medio', 'inferior'];
    var j=0;
    var teclas = document.getElementById(divs[j]);
    for(var i=0; i<teclado.length;i++){

        if(teclado[i]=='br'){
            /*var mybr = document.createElement('br');
            teclas.appendChild(mybr);*/
            j++;
            teclas=document.getElementById(divs[j]);

        }
        else{
            var btn = document.createElement('button');
            btn.innerHTML=teclado[i];
            btn.type='submit';
            btn.classList='btnTeclado';
            btn.value=teclado[i];
            btn.setAttribute('onclick','controlLetraTeclado(this)');
            teclas.appendChild(btn);
        }
    }
}


//Definición de constantes

var teclado = ['Q','W','E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P','br', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ','br', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
var listaPalabras=['ALURA', 'HTML', 'CASA','AVIONETA','PIZZA','PILOTO','DEVELOP','BUG','DEPLOY'];
var letrasUsadas;
var palabra;
var intentos;
var acierto;
var posicionLetrasCorrectas;
var posicionLetrasIncorrectas;

var pantalla = document.querySelector('canvas');
var pincel = pantalla.getContext('2d');

var ingresar = document.querySelector('#nuevaPalabra');
var cancelar = document.querySelector('#cancelar');
var iniciar = document.querySelector('#iniciar');
var guardar = document.querySelector('#guardar');
var desistir = document.querySelector('#desistir');
var nuevoJuego = document.querySelector('#nuevoJuego');
var texto = document.querySelector('#ingresarPalabra');


//Asignación de funciones

guardar.onclick=guardarPalabra;
texto.onkeyup=controlLetra;
ingresar.onclick=actualizarPantalla;
cancelar.onclick=inicio;
iniciar.onclick=juego;
desistir.onclick=inicio;
nuevoJuego.onclick=juego;



document.addEventListener("keydown", controlTecla);
crearTeclado();
