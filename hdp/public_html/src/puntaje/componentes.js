// Un baudilio
Crafty.c("AP_Baudilio", {
	frame: 0, // fotograma de la animación de llenado [0:5]
	init: function() {
		this.requires("2D, Canvas, sprAP_baudilio, Delay, Tweener");
	},
	avanzar: function() {
		this.frame++;
		this.sprite(0, (this.frame * 99));
		return this;
	},
	// Destacar el baudilio
	brillar: function() {
		this.addTween({x: this._x - 5, y: this._y - 5, w: this._w + 10, h: this._h + 10}, "easeOutBounce", 30);
		var part = new Particulas({
			componentes: "sprAP_particula, SpriteAnimation",
			x: this._x + 5, y: this._y, z: this._z,
			vx: 0,
			deltaVx: 2,
			periodo: 25,
			deltaOriX: 90, deltaOriY: 10,
			numParticulas: 6,
			magnitud: 30,
			duracion: 30,
			atenuacion: 10,
			f_crear: function(ent) {
				ent.reel("giro", 400, [[0, 0], [23, 0], [46, 0], [69, 0]]).animate("giro", -1);
			}
		});
		part.iniciar();
	},
	lleno: function() {
		return (this.frame >= 5);
	},
	
	// Vacía el baudilio para poder volverse a llenar desde el principio
	reset: function() {
		this.frame = 0;
		this.sprite(0, 0);
		this.w = 107;
		this.h = 99;
		return this;
	}
});

// Uno de los digitos del número de puntaje
Crafty.c("AP_Digito", {
	numero: 0,
	init: function() {
		this.requires("2D, Canvas, sprAP_digi0");
	},
	digito: function(num) {
		if (num === 0)
			this.sprite(0, 0);
		else if (num === 1)
			this.sprite(0, 65);
		else if (num === 2)
			this.sprite(0, 128);
		else if (num === 3)
			this.sprite(0, 192);
		else if (num === 4)
			this.sprite(0, 256);
		else if (num === 5)
			this.sprite(0, 319);
		else if (num === 6)
			this.sprite(0, 383);
		else if (num === 7)
			this.sprite(0, 447);
		else if (num === 8)
			this.sprite(0, 510);
		else if (num === 9)
			this.sprite(0, 574);

		this.numero = num;
		return this;
	},
	// Proxy de funciones de incremento variable
	incrementar: function(n) {
		var incr = this.numero + n;
		if (incr > 9)
			incr = 0;
		this.digito(incr);
		return incr;
	}
});

// Administra el conjunto de digitos del puntaje
Crafty.c("AP_Numero", {
	e_digito0: null,
	e_digito1: null,
	e_digito2: null,
	e_digito3: null,
	e_baud1: null,
	e_baud2: null,
	e_baud3: null,
	maximo: 0, // Puntaje para 3 baudilios llenos
	total: 0, // Puntaje total obtenido
	cuenta: 0, // Cuenta del número hasta el total
	puntosBaudilio: 0, // puntos aprox. necesarios para llenar un baudilio completo
	puntosLlenar: 0, // puntos aprox. necesarios para avanzar 1 fotograma la animación de llenado
	puntosFinal: 0, // puntos faltantes de los cálculos aproximados para agregar al tercer baudilio
	cuentaLlenar: 0, // cuenta de animación de baudilio
	baudiliosLlenos: 0, // baudilios que ya se han llenado durante el conteo

	init: function() {
		this.requires("2D");
	},
	// Setter de referencias a baudilios
	baudilios: function(e_b1, e_b2, e_b3) {
		this.e_baud1 = e_b1;
		this.e_baud2 = e_b2;
		this.e_baud3 = e_b3;
		return this;
	},
	// Invocar cuando ya se ha posicionado
	Numero: function() {
		this.e_digito0 = Crafty.e("AP_Digito, Persist").attr({x: this._x, y: this._y, z: this._z, visible: false});
		this.e_digito1 = Crafty.e("AP_Digito, Persist").attr({x: this._x + 50, y: this._y, z: this._z, visible: false});
		this.e_digito2 = Crafty.e("AP_Digito, Persist").attr({x: this._x + 100, y: this._y, z: this._z, visible: false});
		this.e_digito3 = Crafty.e("AP_Digito, Persist").attr({x: this._x + 150, y: this._y, z: this._z, visible: false});
		return this;
	},
	// Incrementar la cuenta del número completo
	aumentar: function() {
		var dif = this.total - this.cuenta;
		var incr;
		if (dif > 300)
			incr = 10;
		else if (dif > 50)
			incr = 5;
		else
			incr = 1;

		// incrementar contadores
		this.cuenta = this.cuenta + incr;
		this.cuentaLlenar = this.cuentaLlenar + incr;

		// actualizar sprite de digitos
		num = this.e_digito3.incrementar(incr);
		if (num === 0) {
			num = this.e_digito2.incrementar(1);
			if (num === 0) {
				num = this.e_digito1.incrementar(1);
				if (num === 0) {
					this.e_digito0.incrementar(1);
				}
			}
		}

		// actualizar sprite de baudilios
		if (this.baudiliosLlenos < 3) {
			if (this.baudiliosLlenos === 2 && this.e_baud3.frame === 4) {
				if (this.cuenta >= this.maximo) {
					this.e_baud3.avanzar();
					this.e_baud3.brillar();
					this.baudiliosLlenos++;
				}
			}
			else {
				if (this.cuentaLlenar >= this.puntosLlenar) {
					var refBaud;
					if (this.baudiliosLlenos === 0) {
						refBaud = this.e_baud1;
					} else if (this.baudiliosLlenos === 1) {
						refBaud = this.e_baud2;
					} else if (this.baudiliosLlenos === 2) {
						refBaud = this.e_baud3;
					}

					refBaud.avanzar();
					if (refBaud.lleno()) {
						refBaud.brillar();
						this.baudiliosLlenos++;
					}

					this.cuentaLlenar = this.puntosLlenar - this.cuentaLlenar;
				}
			}
		}

		return this;
	},
	// Inicia el conteo hasta el número total
	contar: function(total, max) {
		this.cuenta = 0;
		this.baudiliosLlenos = 0;
		
		this.total = total;
		this.maximo = max;

		this.puntosBaudilio = Math.floor(max * 0.33);
		this.puntosLlenar = Math.round(this.puntosBaudilio * 0.2);
		this.puntosFinal = this.puntosLlenar + max - (this.puntosLlenar * 15);

		this.visible = true;
		this.e_digito0.visible = true;
		this.e_digito1.visible = true;
		this.e_digito2.visible = true;
		this.e_digito3.visible = true;
		
		this.bind("EnterFrame", function() {
			if (this.cuenta < this.total) {
				this.aumentar();
			}
			else {
				this.unbind("EnterFrame");
			}
		});

		return this;
	},
	
	// Oculta los números y detiene cualquier conteo
	ocultar: function() {
		this.visible = false;
		this.cuenta = 0;
		this.unbind("EnterFrame");
		this.e_digito0.digito(0);
		this.e_digito0.visible = false;
		this.e_digito1.digito(0);
		this.e_digito1.visible = false;
		this.e_digito2.digito(0);
		this.e_digito2.visible = false;
		this.e_digito3.digito(0);
		this.e_digito3.visible = false;
		this.e_baud1.reset();
		this.e_baud2.reset();
		this.e_baud3.reset();
		return this;
	}
	
});