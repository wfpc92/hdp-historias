/**
 */
var ActValencia3 = function() {
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
		Crafty.e("2D, Canvas, Color").color("#1F1E1E").attr({x:0,y:0,w:1280,h:800,z:0})
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