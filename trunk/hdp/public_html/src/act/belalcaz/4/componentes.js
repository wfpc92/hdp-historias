Crafty.c("B4_Fecha", {
	ano: 0,
	x0: 0,
	y0: 0,
	w0: 0,
	h0: 0,
	
	init: function() {
		this.requires("2D, Canvas, Tweener");
	},
	
	B4_Fecha: function(ano) {
		this.ano = ano;
		this.requires("sprB4_fec" + ano);
		this.w0 = this._w;
		this.h0 = this._h;
		
		return this;
	},
	
	mostrar: function() {
		this.x0 = this._x;
		this.y0 = this._y;
		
		this.addTween({ x: this._x - 30, y: this._y - 15, w: this._w + 60, h: this._h + 30, alpha: 1 }, "easeOutElastic", 40, function() {
			this.addTween({ x: this._x + 48, y: this._y + 40, w: this._w - 110, h: this._h - 80 }, "easeInCubic", 10, function() {
				
			});
		});
		
		return this;
	},
	
	ocultar: function() {
		if (this.alpha > 0) {
			this.addTween({ alpha: 0 }, "linear", 5, function() {
				this.x = this.x0;
				this.y = this.y0;
				this.w = this.w0;
				this.h = this.h0;
			});
		}
		
		return this;
	}
});

Crafty.c("B4_Boton", {
	v: {ant: null, sig: null}, //objeto que referencia al camino anterior y al  siguiente
	sprOK: null, //sprite de cambio de boton
	estado: 0,
	bloqueado: false,
	numero: 0, // número en la secuencia [0:4]
	flecha: null,
	act: null, // referencia a la actividad
	
	init: function() {
		this.requires('2D, Canvas, Mouse, sprB4_btnRojArr');
		
		this.bind("MouseDown", function() {
			if (!this.bloqueado) {
				this.removeComponent('sprB4_btnRojArr').addComponent('sprB4_btnRojAbj');
				this.estado = 1;
			}
		});
		
		this.bind("MouseOut", function() {
			if (!this.bloqueado) {
				if (this.estado === 1) {
					this.removeComponent('sprB4_btnRojAbj').addComponent('sprB4_btnRojArr');
				}
			}
		});
		
		this.bind("MouseUp", function() {
			if (!this.bloqueado) {
				this.bloqueado = true;
				
				if (this.numero === 0) {
					this.iluminar();
				}
				else if (this.numero > 0 && this.v.ant.estado === 2) {
					this.iluminar();
				}
				else {
					this.act.iniPosCaballo();

					var vBtn = Crafty("B4_Boton");
					var cont = vBtn.length - 1;
					var myint = setInterval(function() {
						if (cont >= 0) {
							var btn = Crafty(vBtn[cont]);
							btn.cambiarOriginal();
						} else {
							clearInterval(myint);
						}
						cont -= 1;
					}, 50);
				}
			}
		});
	},
	
	B4_Boton: function(num) {
		this.numero = num;
		return this;
	},	
	
	// actualiza el estado de la fecha y la flecha
	actualizarFiguras: function(mostrar) {
		var fecha = this.v.fecha;
		var flecha = this.v.flecha;
		if (mostrar) {
			if (this.estado === 2) {
				fecha.mostrar();
				
				if (flecha !== null) {
					flecha.tween({x: flecha.x, y: flecha.y, alpha: 1}, 100);
				}
			}
		} else {
			fecha.ocultar();
			if (flecha !== null) {
				flecha.tween({x: flecha.x, y: flecha.y, alpha: 0}, 100);
			}
		}
	},
	
	iluminar: function() {
		this.estado = 2;
		this.cambiarSpriteActivo(this.sprOK);
		this.act.sigPosCaballo();
		this.actualizarFiguras(true);
		
		if (this.numero === 4) {
			this.act.ganarActividad();
		}
		
	},
	
	cambiarSpriteActivo: function(nvSprAct) {
		this.removeComponent(this.spriteNormal);
		this.removeComponent(this.spriteActivo);
		this.spriteActivo = nvSprAct;
		this.spriteNormal = nvSprAct;
		this.addComponent(this.spriteActivo);
	},
	
	cambiarOriginal: function() {
		this.estado = 0;
		this.bloqueado = false;
		this.removeComponent('sprB4_btnRojAbj').addComponent('sprB4_btnRojArr');
		this.actualizarFiguras(false);
	}
});