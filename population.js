function Population() {
  // Cohetes
  this.rockets = [];
  // cantidad de cohetes
  this.popsize = 25;
  // genes de generaciones anteriores
  this.matingpool = [];

  // genera cohetes
  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function() {

    var maxfit = 0;
    // recorre cohetes calculando fitness
    for (var i = 0; i < this.popsize; i++) {
      // calcula fitness
      this.rockets[i].calcFitness();
      // determina maxima fitness
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }
    // Normaliza fitness
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }

    this.matingpool = [];
    // vuelve fitness valores de 1 a 100
    //Un cohete con el fitness alto probablemente heredara genes
    for (var i = 0; i < this.popsize; i++) {
      var n = this.rockets[i].fitness * 100;
      for (var j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
  }
  // Selecciona los genes para la sig generacion
  this.selection = function() {
    var newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
      // elige adn al azar
      var parentA = random(this.matingpool).dna;
      var parentB = random(this.matingpool).dna;
      // crea un hijo
      var child = parentA.crossover(parentB);
      child.mutation();
      // crea un hijo con nuevo adn heredado
      newRockets[i] = new Rocket(child);
    }
    // Nuevos cohetes
    this.rockets = newRockets;
  }

  // Actualiza a la nueva geneacion 
  this.run = function() {
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      // Muestra los cohetes
      this.rockets[i].show();
    }
  }
}