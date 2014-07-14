/**
 * Actividad 5 de parque, la idea es con toque rapido generar engranajes para
 * llevarlos hacia una canastica ubicada en el suelo, el juego termina 
 * cuando hay 7 engranajes en la canastica.
 * @returns {ActParque5}
 */
var ActParque5 = function() {
	//con esta cantidad se gana la actividad
	this.totAciertos = 4;
	//tiempo en que se cambia de un topo a otro (milisegundos)
	this.duracion = 20000;
	//si se ha ganado la actividad
	this.actividadGanada = false;
	//si se ha ganado la actividad
	this.aciertos = 0;

	this.init = function() {
		this.crearEntidades();
		this.nubes.bind("EnterFrame", function() {
			var av = 0.1;
			if (!this.dir) {
				this.dir = 1;
			}
			if (this.x > 0) {
				this.dir = -1;
			}
			if (this.x < -30) {
				this.dir = 1;
			}
			this.x += av * this.dir;
		});

		this.carro.mover(1117);
		return this;
	};

	this.crearEntidades = function() {
		var self = this;
		//objeto indicador de posiciones del juego
		Crafty.e("2D, Canvas, Image").image("img/act/parque/5/fondo.jpg").attr({z: 0});
		this.nubes = Crafty.e("2D, Canvas, Image").image("img/act/parque/5/nubes.png").attr({x: -30, z: 0})

		this.torre = Crafty.e("2D, Canvas, Image").image("img/act/parque/5/torre.png");
		this.torre.attr({x: 0, y: 800 - this.torre.h, z: 10});

		Crafty.e("2D, Canvas, Image").image("img/act/parque/5/cuerda.png").attr({x: 614, y: 304, z: 20});
		Crafty.e("2D, Canvas, Image").image("img/act/parque/5/cuerda.png").attr({x: 660, y: 296, z: 20});
		Crafty.e("2D, Canvas, Image").image("img/act/parque/5/cubo.jpg").attr({x: 551, y: 611, z: 25});
		Crafty.e("2D, Canvas, Image").image("img/act/parque/5/cubo.jpg").attr({x: 661, y: 611, z: 25});
		Crafty.e("P5_Engranaje, sprP5_engranaje0").attr({x: 606, y: 275, z: 25}).P5_Engranaje(false, 1.5, 1);
		Crafty.e("P5_Engranaje, sprP5_engranaje1").attr({x: 628, y: 231, z: 25}).P5_Engranaje(false, 0.5, -1);
		Crafty.e("P5_Engranaje, sprP5_engranaje2").attr({x: 610, y: 237, z: 22}).P5_Engranaje(false, 0.8, 1);
		Crafty.e("P5_Engranaje, sprP5_engranaje3").attr({x: 619, y: 223, z: 22}).P5_Engranaje(false, 1.5, 1);
		Crafty.e("P5_Engranaje, sprP5_engranaje3").attr({x: 608, y: 253, z: 22}).P5_Engranaje(false, 0.5, -1);
		Crafty.e("P5_Engranaje, sprP5_engranaje3").attr({x: 603, y: 270, z: 22}).P5_Engranaje(false, 0.8, 1);
		Crafty.e("P5_Engranaje, sprP5_engranaje4").attr({x: 628, y: 267, z: 25}).P5_Engranaje(false, 1.5, 1);

		this.carro = Crafty.e("P5_Carro").attr({x: 791, y: 596, z: 30}).P5_Carro(this);
		this.personajeIzq = Crafty.e("P5_Personaje").attr({x: 563, y: 496, z: 30}).P5_Personaje(-1);
		this.personajeDer = Crafty.e("P5_Personaje").attr({x: 652, y: 496, z: 30}).P5_Personaje(1);

		//esta area se coloca sobre los personajes para generen los engranajes y aplicar animacion sobre los personajes
		this.areaToque = Crafty.e("P5_AreaToque").attr({x: 518, y: 450, w: 250, h: 230, z: 50})
				.P5_AreaToque(this.carro, this.personajeIzq, this.personajeDer);
		return this;

	};

	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		Crafty("P5_Engranaje").each(function() {
			if (this.fisica) {
				this.destroy();
			}
		});
		Crafty("P5_AreaToque").each(function() {
			this.destroy();
		});
		return this;
	};
	this.ganarActividad = function() {
		Crafty("P5_Engranaje").each(function() {
			if (this.fisica) {
				this.destroy();
			}
		});
		Crafty("P5_AreaToque").each(function() {
			this.destroy();
		});
		gesActividad.temporizador.parar();
		gesActividad.mostrarPuntaje();
		return this;
	};
};
