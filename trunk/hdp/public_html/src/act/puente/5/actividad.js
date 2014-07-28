/**
 */
var ActPuente5 = function() {
	//con esta cantidad se gana la actividad
	this.totAciertos = 4;
	//si se ha ganado la actividad
	this.aciertos = 0;

	this.init = function() {
		
	};

	this.crearEntidades = function() {

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