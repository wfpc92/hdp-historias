/* Retardo basado en un contador de frames
 * Si se destruye esta entidad, no se ejecuta el callback
 * Ejemplo de uso:
 * Crafty.e("DelayFrame").delay(function() { alert("Hola mundo!"); }, 200);
 * Opcionalmente se le puede incluir un argumento
*/
Crafty.c("DelayFrame", {
	c: 0, // Cuenta
	max: 0, // Máximo
	f_callback: null, // Callback a ejecutar
	arg: null, // Objeto de ámbito a enviar al callback
	
	init: function() {
		
	},
	
	// Iniciar un conteo hasta max, tras lo cual se invoca la función de callback
	delay: function(f, max, arg) {
		this.c = 0;
		this.f_callback = f;
		this.max = max;
		if (arg) this.arg = arg;
		this.bind("EnterFrame", this._tic);
		return this;
	},
	
	// Invocar el callback repetidamente contando max frames
	interval: function(f, max, arg) {
		
		this.f_callback = f;
		this.max = max;
		if (arg) this.arg = arg;
		this.bind("EnterFrame", this._tic2);
		return this;
	},
	
	// Tic del delay
	_tic: function() {
		this.c++;
		
		if (this.c >= this.max) {
			this.f_callback(this.arg);
			this.unbind("EnterFrame", this._tic);
			if (this.__c.length <= 1) this.destroy(); // Destruir sólo si el delayframe está en una entidad que no hace nada más
		}
	},
	
	// Tic del interval
	_tic2: function() {
		this.c++;
		if (this.c >= this.max) {
			this.c = 0;
			this.f_callback(this.arg);
		}
	}
});