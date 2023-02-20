// Cuando JS lea todo el documento irá primero a "inicio"
window.onload = inicio;

// las variables y arrays necesarios
let credito = Math.floor(Math.random() * 4) + 30;
const imagenes = [
    "miguelangel.png",
    "will.png",
    "brad-pitt.png",
    "chrise.png",
    "chrisevans.png",
    "henry.png",
    "leonardo.png"
];
// Lo que vale cada una de las imágenes
const premios = [3, 2, 4, 2, 6, 3, 8];

let numeros_actuales = [];
let au;
let activos = false;



// Eventos y todo lo que queramos que haga inicialmente
function inicio() {
  document.getElementById("tirar").onclick = lanzar_inicio;
  document.getElementById("cruz").onclick=cerrar;
  au=document.getElementById("sonido");

  for (let k = 0; k < document.getElementsByClassName("boton").length; k++){
      document.getElementsByClassName("boton")[k].onclick=lanzar_uno; 
         
  }
actualizar();
}

// La que se ejecute cuando le de click al botón redondo
function lanzar_inicio() {
  if(credito>0){
      sonar("sonido.flac");
    activos=true;
    numeros_actuales = [];
    for (let k = 0; k < document.getElementsByClassName("boton").length; k++) {
      numeros_actuales.push(escoger_numero(""));
      mostrar_imagen(k, numeros_actuales[k]);
    }
    comparar();
  }
}
// se ejecuta cuando haga click en cualquiera de los tres botones, esta función tiene que saber cual de los tres botones se ha dado
function lanzar_uno() {
  if(credito>0 && activos==true){
    sonar("tirar.flac");
  
  let hijos=this.parentNode.parentNode.children;
  for(let k=0;k<hijos.length;k++){
    if(this.parentNode == hijos[k]){
      numeros_actuales[k]=escoger_numero(numeros_actuales[k]);
      mostrar_imagen(k,numeros_actuales[k]);
      comparar();
      break;
    }
  }
}
}
// Cuando haga click en cualquiera de "lanzar Inicio" o bien "lanzar uno" que tiene que escoger uno, y para no repetirlo varias veces hago la funcion que se encargue de escoger uno
function escoger_numero(actual) {
    do{
      var azar = Math.floor(Math.random()*imagenes.length);

    }while(azar==actual)
  return azar;
}
// despues de escoger numero, mostrarlo en pantalla
function mostrar_imagen(num,im) {
  document.getElementsByClassName("imagen")[num].getElementsByTagName("img")[0].src="./imagen/"+imagenes[im];
}
// compare si los números/imagenes son los mismos
function comparar() {
  if(numeros_actuales[0]==numeros_actuales[1] && numeros_actuales[1]==numeros_actuales[2]){
    //tenemos premio
    activos=false;
    let p=premios[numeros_actuales[0]];
    let mensaje=`Has ganado ${p} corazones<div>`;
    for(let k =0;k<p;k++){
      mensaje += `<img src="./imagen/corazon.png">`;
    }
    mensaje+=`</div>`;
    mostrar_mensaje(mensaje);
    sonar("ganar.flac");
    credito+=premios[numeros_actuales[0]];
  }
  credito--;
  actualizar();
}
// actualizar corazones, datos...
function actualizar() {
  document.getElementById("dinero").innerHTML=credito;
  document.getElementById("corazones").innerHTML="";
  for(let k=1;k<=credito;k++){
    document.getElementById("corazones").innerHTML += `<img src="./imagen/corazon.png">`;
  }
  if(credito<1){
    mostrar_mensaje("<b>GAME OVER</b><div class='subtitulo'>No te queda mas dinero</div>");
    sonar("tirar.flac")
  }
}
// mostrar mensaje cuando haya ganado premio o cuando me haya quedado sin crédito
function mostrar_mensaje(m) {
  document.getElementById("velo").style.display="flex";
  document.getElementById("mensaje").innerHTML=m;

}
// para que se cierre con la x
function cerrar() {
  document.getElementById("velo").style.display = "none";
  au.pause();
}
// melodia para cuando gane o pierda
function sonar(audio) {
  au.src ="./audio/"+audio;
  au.play();
}
