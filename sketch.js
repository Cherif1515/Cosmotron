var camera; //variable qui définit la webcam
var canvas; //l'endroit où on peut dessiner
var largeur = 400 //définit la largeur du canvas / image
var hauteur= 400 //définit la hauteur du canvas / image
var Imagedefond // Définit l'image /vidéo du fond 
var seuil = parseFloat( localStorage.getItem("seuil") ) // Quand distance couleurfond est assez proche, on change l'image
var couleurfond =[

parseFloat( localStorage.getItem("cfr") )  ,
parseFloat( localStorage.getItem("cfv") )  ,
 parseFloat( localStorage.getItem("cfb") )
 ]; // Définit la couleur de fond comme vert
var value = 0
var secondesCR=5
var listimage=["Medias/a.jpg","Medias/b.jpg","Medias/c.jpg","Medias/d.jpg","Medias/e.png"]
var positionlist=0
var button
var button1
var button2
var buttonvisible=true
var sliderchange
var date=newDate
var NOMDEFICHIER

function setup() { 
  canvas = createCanvas(); // Creer une zone pour dessiner
  canvas.size(largeur,hauteur) //Taille de la zone à dessiner
  Imagedefond = loadImage ("Medias/b.jpg") // Integre une video
  //Imagedefond.hide() // Cacher l'image de base
  camera = createCapture(VIDEO); // Active la webcam
  camera.size(largeur, hauteur); // Taille de la webcam
  seuilSlider = createSlider(0,255,seuil) // Creer un slider 
  seuilSlider.position(20, 40) //Positionne le slider
  pixelDensity(1) // Densité du pixel
  //Imagedefond.stop() // Lance en boucle la vidéo / Stop la video
  camera.hide(); // Supprimer la webcam de base
  frameRate(20); // Changer le framerate (Image par seconde)
  //Imagedefond.loop()
 
  button = createButton('smile')
  button.mousePressed(comptearebours)
  button.position(1,200)
  textSize(32)
  button1 = createButton('next')
  button1.mousePressed(suivant)
  button1.position(1,230)
  button2 =createButton('hide')
  button2.mousePressed(hideshow)
  button2.position(80,1)
  seuilSlider.input(sliderchange)
  button3 = createButton("pleinEcran")
  button3.position(1, 260)
  button3.mousePressed(pleinEcran)
  windowResized()

}

function draw() { // Dessine chaque image
 //Imagedefond.volume(0)
  seuil = seuilSlider.value() // Modifie le seuil avec le slider

  //background(0) // Dessiner le fond
  image(Imagedefond, 0,0,largeur,hauteur) // Dessine l'image / La video
  loadPixels(); // Charge les pixel
  dessinerCamera() // Dessine la webcam
  updatePixels(); // Permet de charger les pixel en mouvement.
  if(secondesCR!=5 && secondesCR!=1){
  var character =''+secondesCR 
  text(character,largeur-25,25)
 }
}

  

 function hideshow(){
   if(buttonvisible==true){
     button1.hide()
     button.hide()
     button3.hide()
     seuilSlider.hide()
     buttonvisible=false
   }
    else if(buttonvisible==false){
      button1.show()
      button.show()
      button3.show()
      seuilSlider.show()
      buttonvisible=true
      }
 }

 function suivant(){
   if(positionlist<listimage.length-1){
   positionlist=positionlist+1}
   else
   {positionlist=0}
   chargerimg()
   }
 function chargerimg(){
   Imagedefond=loadImage(listimage[positionlist])
   
 }


function keyTyped() { // Permet de réagir quand on appuie sur le clavier
  if (key == 'b') { // Spécifie la touche
    comptearebours(); // applique la fonction Save
  }
 }


function Save(){ // Fonction sauvegarde
  saveCanvas(canvas, 'NOMDEFICHIER', 'jpg')
} // Sauvegarde


function mouseClicked(e) { // Reagit au clic
  if(e.srcElement==canvas.canvas){ // Si le clic se situe dans la zone dessinable
  const position1d = (Math.floor(mouseY)*largeur+Math.floor(mouseX))*4 // Localise le clic
  couleurfond[0]=camera.pixels [position1d+0]
  couleurfond[1]=camera.pixels [position1d+1]
  couleurfond[2]=camera.pixels [position1d+2]
 localStorage.setItem("cfr",""+couleurfond[0])
 localStorage.setItem("cfv",""+couleurfond[1])
 localStorage.setItem("cfb",""+couleurfond[2])


  } 
 function Photo() // action du bouton
{
    var today = new Date();
    var photoDay = ajoutZero(today.getDate())
    var photoMonth = ajoutZero(today.getMonth() + 1)
    var photoYear = ajoutZero(today.getFullYear())
    var photoHour = ajoutZero(today.getHours())
    var photoMinute = ajoutZero(today.getMinutes())
    var photoSeconde = ajoutZero(today.getSeconds())
    var photoFullDay = photoDay + '-' + photoMonth + '-' + photoYear + '-' + photoHour + photoMinute + photoSeconde
    saveCanvas(canvas, photoFullDay, 'jpg');
    // permet de sauvegarder l'image

}
function ajoutZero(nombre) {
    if (nombre < 10) {
        return '0' + nombre
    } else {
        return '' + nombre

    }

}
  return false; 
}


function distance (r1,g1,b1,r2,g2,b2){ // Calcul la distance entre deux couleurs
  return (Math.abs(r2-r1)+Math.abs(g2-g1)+Math.abs(b2-b1))/3
}

function dessinerCamera(){ // affiche la webcam
 
if (camera.width == 0 && camera.imageData) {
        camera.width = camera.imageData.width
        camera.height = camera.imageData.height
    }
     camera.loadPixels(); // Charge les pixel de la webcam
  if(camera.pixels.length){ // Etre sur que la caméra est chargée
 
    const w = largeur; // Variable raccourcis pour largeur
    const h = hauteur; // Variable raccourcis pour hauteur

    for (let i = 0; i < w; i=i+1) { // On se balade sur les colonnes
      for (let j = 0; j < h; j++) { // On se balade sur les lignes

        const position1dCanvas = (j*w + i)*4;      
        const r = camera.pixels[position1dCanvas +0];
        const g = camera.pixels[position1dCanvas +1];
        const b = camera.pixels[position1dCanvas +2];        

        if (distance(r,g,b,couleurfond[0],couleurfond[1],couleurfond[2]) < seuil){ // Si la distance des couleurs est inférieur au seuil, alors...
             
        }

        else { 
        pixels[position1dCanvas +0] = r;
        pixels[position1dCanvas +1] = g;
        pixels[position1dCanvas +2] = b;

        }
      }     
    }  
  }  
}






function comptearebours(){
  secondesCR=secondesCR-1
  if(secondesCR==0){
    Save()
    secondesCR=5
  }
  else{
    setTimeout(comptearebours,1000)
  }
 

}

function sliderchange(){
   localStorage.setItem("seuil",""+seuil)
 }
 function windowResized(){
   largeur = windowWidth
   hauteur = windowHeight
   canvas.size(largeur,hauteur)
   camera.size(largeur,hauteur)

 }
function pleinEcran() {
    var fs = fullscreen();
    fullscreen(!fs);

}