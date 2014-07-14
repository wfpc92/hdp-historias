/**
 * Actividad de laberinto de belalcazar
 * @returns {ActBelalcaz6}
 */
var ActBelalcaz6 = function() {
	//con esta cantidad se gana la actividad
	this.totAciertos = 4;
	//tiempo en que se cambia de un topo a otro (milisegundos)
	this.duracion = 20000;
	//si se ha ganado la actividad
	this.actividadGanada = false;
	//si se ha ganado la actividad
	this.aciertos = 0;


	this.init = function() {
		this.iniciarComponentes();
		var self = this;
		return this;
	};


	this.iniciarComponentes = function() {
		Crafty.e("2D, Canvas, Image").image("img/act/belalcaz/6/fondo.jpg").attr({z: 0});
		var arbusto = Crafty.e("2D, Canvas, Image").image("img/act/belalcaz/6/plano1_arbusto.png");
		arbusto.attr({x: 0, y: 800 - arbusto.h, z: 20});
		this.cab = Crafty.e("Laberinto_cabeza").Laberinto_cabeza("sprB6_cabeza");
		this.cab.actividad = this;
	};

	//verificar si ya se han colocados todos los numeros.
	this.arrastreCompleto = function() {
		//contar el numero de entidades de tipo Completo
		if (this.aciertos === this.totAciertos) {
			this.ganarActividad();
		}
	};

	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		return this;
	};

	this.ganarActividad = function() {
		gesActividad.temporizador.parar();
		gesActividad.mostrarPuntaje();
	};
};