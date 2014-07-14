/**
 * Helper para la gestión de sonidos en Crafty
 */
var Sonido = function() {
	this.idMusicaActual = ""; // id de música actual
	this.bloqueado = false;
	
	/* MÉTODOS:
	crear(id, ruta)
	reproducir(id)
	loop(id)
	silenciar()
	isMuted()
	pausa()
	pararMusica()
	limpiar()
	limpiarTodo()
	*/
};

// Crea un recurso de sonido en id
Sonido.prototype.crear = function(id, ruta) {
	Crafty.audio.create(id, ruta);
};

// Reproduce el sonido en id 1 vez
Sonido.prototype.reproducir = function(id) {
	Crafty.audio.play(id);
};

// Reproduce infinitamente el sonido en id y lo almacena como la "música" actual
Sonido.prototype.reproducirMusica = function(id) {
	if (this.idMusicaActual !== id) {
		this.pararMusica();
		Crafty.audio.play(id, -1);
		this.idMusicaActual = id;
	}
};

// Intercambia el estado del "mute" entre true y false
Sonido.prototype.silenciar = function() {
	Crafty.audio.toggleMute();
	return Crafty.audio.muted;
};

//para verificar si esta muted o no
Sonido.prototype.isMuted = function(){
	return Crafty.audio.muted;
}

// Pausa y despausa el sonido
Sonido.prototype.pausa = function() {
	Crafty.audio.togglePause();
	return this;
};

// Detiene la reproducción de la música actual
Sonido.prototype.pararMusica = function() {
	if (this.idMusicaActual !== "") {
		Crafty.audio.stop(this.idMusicaActual);
		this.idMusicaActual = "";
	}
};

// Remueve un audio de memoria
Sonido.prototype.limpiar = function(id) {
	Crafty.audio.stop(id);
	if (cocoon) (Crafty.sounds[id].obj).dispose();
	Crafty.audio.remove(id);
	
};

// Remueve todos los audios en memoria
Sonido.prototype.limpiarTodo = function() {
	Crafty.audio.stop();
	Crafty.audio.remove();
	//@TODO: remover de memoria de cocoon todos los audios
	this.idMusicaActual = "";
};