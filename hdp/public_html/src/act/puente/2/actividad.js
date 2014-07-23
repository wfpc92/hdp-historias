/**
 * Actividad parque caldas, armar la estructura monumento del FJCaldas
 * @returns {ActParque1}
 */
var ActPuente2 = function() {
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
		return this;
	};

	this.crearEntidades = function() {
		Crafty.e("2D, Canvas, Image").image("img/act/puente/2/fondo.jpg");
		Crafty.e("2D, Canvas, Image, Ubicador").image("img/act/puente/2/hoja.png");
		Crafty.e("2D, Canvas, Image, Ubicador").image("img/act/puente/2/indicador.png");
		Crafty.e("2D, Canvas, Image, Ubicador").image("img/act/puente/2/indicador.png");
		Crafty.e("2D, Canvas, sprH2_numero0, Ubicador");		

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