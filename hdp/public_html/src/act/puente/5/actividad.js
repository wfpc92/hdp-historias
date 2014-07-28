/**
 */
var ActPuente5 = function() {
	//con esta cantidad se gana la actividad
	this.totAciertos = 4;
	//si se ha ganado la actividad
	this.aciertos = 0;

	this.init = function() {
		this.crearEntidades();
		return this;
	};

	this.crearEntidades = function() {
		Crafty.e("2D, Canvas, Image").image("img/act/puente/5/fondo.png");
		var nube = Crafty.e("2D, Canvas, Image").image("img/act/puente/5/nube.png");
		var priPlano = Crafty.e("2D, Canvas, Image").image("img/act/puente/5/primer_plano.png");
		var segPlano = Crafty.e("2D, Canvas, Image").image("img/act/puente/5/segundo_plano.png");
		var puente = Crafty.e("2D, Canvas, Image").image("img/act/puente/5/puente.png");

		nube.attr({z: 0});
		priPlano.attr({y: 800 - priPlano.h, z: 30});
		segPlano.attr({y: 800 - segPlano.h, z: 10});
		puente.attr({y: 306, z: 20});

		var x = 0, y = this.calcPos(x);
		this.topo = Crafty.e("H5_Topo, sprH5_mula")
				.attr({x: x, y: y, z: 15})
				.H5_Topo({ts: 60, te: 10, tb: 20})//tiempo de subida, estadia, y bajada
				.subir();
		


		return this;
	};

	//calcular una posicion aleatoria para una personaje
	this.calcPos = function(x) {
		var y2 = 320, y1 = 348, x2 = 1160, x1 = 20;
		return (x - x1) * (y2 - y1) / (x2 - x1) + y1
	};

	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		return this;
	};

	this.ganarActividad = function() {
		gesActividad.temporizador.parar();
		gesActividad.mostrarPuntaje();
		return this;
	};
};
