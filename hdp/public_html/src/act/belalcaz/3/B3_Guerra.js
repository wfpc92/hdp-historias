// Gestor de la guerra entre Belalcazar y los indìgenas
Crafty.c("B3_Guerra", {
	posBalance: 640, // Posición de choque entre belal y los indios. 0 = equilibrio (1280 / 2).
	v: 0.5, // Velocidad del punto de choque
	minV: -1.5, // Mínimo
	maxV: 0.5, // Máximo
	aIndios: -0.005, // Aceleración provocada por los indios
	incrClick: 0.08, // Incremento a v al hacer click en Belal
	framesEspada: 0, // Cuenta las frames que quedan de ventaja de espada
	
	e_belalcazar: null, // referencia a belalcazar
	indios: null, // Referencia al arreglo de indìgenas
	
	activ: null, // referencia a la actividad
	
	init: function() {
		
	},
	
	B3_Guerra: function(e_b, arrInd) {
		this.e_belalcazar = e_b;
		this.indios = arrInd;
		return this;
	},
	
	
	// Inicia el bucle de guerra
	iniciar: function() {
		this.bind("EnterFrame", function() {
			this.frame();
			
			// Avisar si hemos ganado o perdido
			if (this.posBalance >= 1280) {
				this.unbind("EnterFrame");
				this.activ.cbk_ganar();
			}
			else if (this.posBalance <= 0) {
				this.unbind("EnterFrame");
				this.activ.cbk_perder();
			}
		});
	},
	
	// Incrementa la velocidad del punto de choque dentro del umbral
	incrementarV: function() {
		if (this.v <= this.maxV) {
			this.v += this.incrClick;
		}
		return this;
	},
	
	// Actualizar posiciones de Belal y los indios segùn el balance
	actualizarPos: function() {
		this.e_belalcazar.x = this.posBalance - this.e_belalcazar._w;
		var i = 0;
		for (i = 0 ; i < 5 ; i++) {
			this.indios[i].x = this.posBalance + (i * 150);
		}

		return this;
	},
	
	// Activar la ventaja temporal de la espada
	ventajaEspada: function() {
		this.maxV = 1;
		this.incrClick = 0.16;
		this.framesEspada = 300;
		this.e_belalcazar.espada("sprB3_espada");
		return this;
	},
	
	// Activar la desventaja de la lanza
	ventajaLanza: function() {
		this.maxV = 0.2;
		if (this.v > 0.2) this.v = 0.2;
		this.incrClick = 0.04;
		this.framesEspada = 300;
		this.e_belalcazar.espada("");
		return this;
	},

	// Cada frame, actualizar posiciones
	frame: function() {
		this.posBalance += this.v;
		
		// Aplicar la aceleraciòn si la velocidad no supera cierto umbral
		if (this.v >= this.minV) {
			this.v += this.aIndios;
		}
		
		this.e_belalcazar.e_barra.actualizar(this.v);
		
		this.actualizarPos();
		
		// Actualizamos framesEspada
		if (this.framesEspada > 0) {
			if (this.framesEspada === 1) {
				this.maxV = 0.5;
				this.incrClick = 0.08;
				if (this.v > 0.5) this.v = 0.5;
				this.e_belalcazar.espada("");
			}
			this.framesEspada--;
		}
		return this;
	}
});