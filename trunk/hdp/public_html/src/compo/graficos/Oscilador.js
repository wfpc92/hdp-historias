// Agregar este componente para ponerlo a oscilar en una dirección
Crafty.c("Oscilador", {
	t: 0, // Cuenta interna para la función
	dt: 0, // Incremento a sumar a la cuenta interna cada frame
	ciclo1: false, // true si está en el ciclo 0. Se alterna entre ciclo 0 y 1 (true-false)
	xIni: 0, // Posición inicial de la entidad
	yIni: 0,
	amplitud: 0, // amplitud de oscilación
	sentido: 0, // 0: horizontal, 1: vertical
	
	init: function() {
		this.requires("2D, Canvas");
	},
	
	// Devuelve la posición según el valor en t
	// t debe estar entre 0 y 1
	// El resultado estará entre 0 y 1
	_calculo: function(t) {
		return 1 - 4 * (t - 0.5) * (t - 0.5);
	},
	
	// Oscilar un deltaX como máximo alrededor de la posición actual
	oscilarX: function(amplitud, periodo) {
		this.dt = 1 / periodo;
		this.xIni = this._x;
		this.amplitud = amplitud;
		this.sentido = 0;
		
		this.bind("EnterFrame", this.frame);
		
		return this;
	},
	
	// Oscilar un deltaY como máximo alrededor de la posición actual
	oscilarY: function(amplitud, periodo) {
		this.dt = 1 / periodo;
		this.yIni = this._y;
		this.amplitud = amplitud;
		this.sentido = 1;
		
		this.bind("EnterFrame", this.frame);
		
		return this;
	},
	
	// Invocada cada EnterFrame
	frame: function() {
		this.t += this.dt;
			
		if (this.t >= 1) {
			this.ciclo1 = (this.ciclo1 ? false : true);
			this.t = 0;
		}

		if (this.sentido === 0) {
			if (!this.ciclo1) {
				this.x = this.xIni + this.amplitud * this._calculo(this.t);
			} else {
				this.x = this.xIni - this.amplitud * this._calculo(this.t);
			}
		}
		else if (this.sentido === 1) {
			if (!this.ciclo1) {
				this.y = this.yIni + this.amplitud * this._calculo(this.t);
			} else {
				this.y = this.yIni - this.amplitud * this._calculo(this.t);
			}
		}
	},
	
	// Detiene la oscilación y remueve el evento del enterFrame
	pararOscilar: function() {
		this.unbind("EnterFrame", this.frame);
		return this;
	}
	
});