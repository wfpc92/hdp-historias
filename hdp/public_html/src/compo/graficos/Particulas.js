Crafty.c("Particula", {
	yIni: 0, // Posición inicial Y de la partícula
	vx: 0, // Velocidad en x
	atenuacion: 0, // Reduce la rapidez de movimiento de esta partícula
	magnitud: 0, // Medida de la altura que alcanza la partícula
	duracion: 0, // Duración en frames antes de destruir esta partícula
	frame: 0, // contador interno de frames
	funcionCalc: this.calcX2inv, // Función de cálculo de la altura con respecto a la frame
	
	init: function() {
		this.bind("EnterFrame", function() {
			this.y = this.calcX2inv();
			this.x += this.vx;
			this.frame++;
			if (this.frame === (this.duracion - 3)) { this.alpha = 0.2; }
			if (this.frame > this.duracion) { this.destroy(); }
		});
	},
	
	// Función de cálculo de la altura con respecto a la frame
	calcX2inv: function() {
		var f1 = this.frame / this.atenuacion;
		return (this.yIni + this.magnitud * ((f1 - 1) * (f1 - 1) - 1)); // función x^2 inversa
	},
	
	// Función de cálculo de la altura con respecto a la frame
	calcLinear: function() {
		return this.y + magnitud;
	}
});

// Generador de partículas
// Para usar, establecer el sprite en .partCompo, configurar e invocar iniciar()
function Particulas(conf) {
	this.x = conf.x || 0; // posición del origen de las partículas
	this.y = conf.y || 0;
	this.z = conf.z || 1;
	this.vx = conf.vx || 0; // Velocidad x de las partículas por defecto
	this.atenuacion = conf.atenuacion || 12; // Reduce la rapidez de movimiento de las partículas
	this.magnitud = conf.magnitud || 20; // Medida de la altura que alcanzan las partículas
	this.duracion = conf.duracion || 35; // Duración en frames de las partículas antes de destruirse
	this.deltaDura = conf.deltaDura || 5; // Variación aleatoria en la duración
	this.deltaOriX = conf.deltaOriX || 0; // Longitud de variación aleatoria de la coord. x del origen (en sentido +X)
	this.deltaOriY = conf.deltaOriY || 0;
	this.deltaVx = conf.deltaVx || 2; // Variación aleatoria en la velocidad x
	this.periodo = conf.periodo || 200; // tiempo en ms. para generar la siguiente partícula
	this.numParticulas = conf.numParticulas || 16; // contador de partículas por generar. Luego se apaga el generador
	this.objInterval = conf.objInterval || null; // objeto del setInterval()
	this.f_crear = conf.f_crear || null; // función a invocar cada vez que se cree una partícula. Recibe la entidad como parametro
	this.componentes = conf.componentes || ""; // Componentes adicionales de cada partícula (miSprite, SpriteAnimation, etc.)
	this.e_origen = conf.e_origen || null; // (Opcional) Entidad origen de las partículas
	
	this.cuentaParticulas = 0;
}

// Inicialización
Particulas.prototype.init = function() {
	
};

// Generates a random float between 2 values
Particulas.prototype.random = function(min, max) {
	return Math.random() * (max - min + 1) + min;
};

// Generates a random integer between 2 values
Particulas.prototype.randomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

// Inicia el bucle de generación de partículas
Particulas.prototype.iniciar = function() {
	var self = this;
	this.frame = 0;
	this.cuentaParticulas = 0;
	
	if (self.cuentaParticulas < self.numParticulas) {
		this.objInterval = window.setInterval(function() {
			if (self.cuentaParticulas >= self.numParticulas) {
				clearInterval(self.objInterval);
			}
			else {
				// Si es necesario, actualizamos las coordenadas de origen
				if(self.e_origen) {
					self.x = self.e_origen._x;
					self.y = self.e_origen._y;
				}
				
				self.crear(self);
				self.cuentaParticulas++;
			}
		}, this.periodo);
	}
};

// Detiene el disparo de partículas
Particulas.prototype.detener = function() {
	clearInterval(this.objInterval);
};

// Dispara una partícula desde el origen
Particulas.prototype.crear = function(self) {
	var e_part = Crafty.e("2D, Canvas, Particula, " + this.componentes);
	
	// Establecemos atributos iniciales
	if (self.deltaOriX === 0) {
		e_part.x = self.x;
	} else {
		e_part.x = self.x + self.random(0, self.deltaOriX);
	}
	
	if (self.deltaOriY === 0) {
		e_part.yIni = self.y;
	} else {
		e_part.yIni = self.y + self.random(0, self.deltaOriY);
	}
	
	e_part.z = self.z;
	
	if (self.deltaVx === 0) {
		e_part.vx = self.vx;
	} else {
		e_part.vx = self.random(self.vx - self.deltaVx, self.vx + self.deltaVx);
	}
	
	e_part.atenuacion = self.atenuacion;
	e_part.magnitud = self.magnitud;
	if (this.deltaDura === 0) {
		e_part.duracion = self.duracion;
	} else {
		e_part.duracion = self.randomInt(self.duracion - self.deltaDura, self.duracion + self.deltaDura);
	}
	
	if (this.f_crear) {
		this.f_crear(e_part);
	}
};