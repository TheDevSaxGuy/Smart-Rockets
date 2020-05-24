var population;
// Frames que viven los cohetes
var lifespan = 400;
// Contador a imprimir
var lifeP;
// Contador de frames
var count = 0;
let generation=0;
// Objetivo
var target;
// Fuerza del cohete
var maxforce = 0.2;

// Obstaculo
var rx = 100;
var ry = 150;
var rw = 200;
var rh = 10;

function setup() {
  createCanvas(400, 300);
   
  population = new Population();
  lifeP = createP();
  target = createVector(width / 2, 50);

}

function draw() {
  background(0);

  population.run();
  // Imprime el contador y la generacion
  lifeP.html('<h3>'+count+'  <br> Generacion numero: '+generation +'</h3>');
  //this.html(generation);
  count++;
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    // Population = new Population();
    count = 0;
    generation++;
  }
  // Carga obstaculo
  var verde='#58FA58';
  //var rojo='#FF0000';
  fill(verde);
  rect(rx, ry, rw, rh);
  // Carga objetivo
  fill(255);
  ellipse(target.x, target.y, 16, 16);
  
}