// Gesto de indicación en actividad
Crafty.c("Gesto", {
	e_mano: null, // Mano del gesto
	tipo: 0, // 1.toque rapido, 2.drag, 3.rotar
	duracion: 0, // Duración máxima en frames
	retardo: 0, // Frames a esperar antes de aparecer
	e_delayAnim: null,
	xIni: 0, // Coordenadas iniciales del gesto
	yIni: 0,
	deltaY: 0, // Taza de cambio en Y (opcional)
	frame: 0, // Contador interno de frames, usado en girar
	conf: null, // objeto de configuración
	
	init: function() {
		this.requires("2D, Canvas, DelayFrame, Tweener");
		this.e_mano = Crafty.e("2D, Canvas, Image, Tweener").image("img/global/mano.png");
		this.attach(this.e_mano);
		this.z = 9000;
		this.visible = false;
		this.e_mano.z = 9001;
		this.e_mano.visible = false;
		this.e_delayAnim = Crafty.e("DelayFrame");
	},
	
	// numTipo = 1.toque rapido, 2.drag, 3.rotar
	// dur = duración en frames
	// retard = retardo en frames para que aparezca
	Gesto: function(numTipo, conf) {
		this.tipo = numTipo;
		this.duracion = conf.duracion;
		this.retardo = conf.retardo;
		this.conf = conf;
		
		if (numTipo === 1) {
			this.requires("sprGL_gestoTap");
			this.e_mano.attr({ x: 20, y: 28 });
		}
		else if (numTipo === 2) {
			this.requires("sprGL_gestoDrag");
			this.e_mano.attr({ x: 13, y: 25 });
		}
		else {
			this.requires("sprGL_gestoRot");
			this.deltaY = (this.conf.desplY ? this.conf.desplY : 0);
			this.e_mano.attr({ x: 13, y: 26 });
		}
		
		this.attr({ x: conf.coords[0], y: conf.coords[1] });
		
		var self = this;
		Crafty.e("DelayFrame").delay(function() {
			self.animar();
		}, this.retardo);
		
		
		this.delay(function() {
			console.log("destroy")
			this.e_delayAnim.destroy();
			this.destroy();
		}, this.duracion);
		
		return this;
	},
	
	// Inicia la animación correspondiente al tipo de gesto
	animar: function() {
		// desplazamos el origen para que coincida con el centro del dedo
		this.x -= 30;
		this.y -= 30;
		
		// Almacenamos las coords. iniciales
		this.xIni = this._x;
		this.yIni = this._y;
		
		if (this.tipo === 1) {
			this.animToqueRapido();
		}
		else if (this.tipo === 2) {
			this.animArrastre();
		}
		else {
			this.animRotar();
		}
		
		return this;
	},
	
	// Animación de gesto de topque rápido
	animToqueRapido: function() {
		var self = this;
		this.visible = true;

		this.e_mano.attr({ alpha: 1, visible: true });
		console.log("animToqueRapido")
			
		Crafty.e("DelayFrame").delay(function() {
			self.visible = false;
			self.e_mano.addTween({ alpha: 0.1 }, "linear", 8, function() {
				self.e_delayAnim.delay(function() {
					if (self.conf.deltaX) { self.x += self.conf.deltaX; }
					if (self.conf.deltaY) { self.y += self.conf.deltaY; }
					self.animToqueRapido();
				}, 8);
			});
		}, 13);
		
		
	},
	
	/* Animación de gesto de rotar
	 * Configuración:
	 * coords: Coordenadas del centro de rotación
	 * duracion: Frames de duración del gesto
	 * retardo: Retardo en iniciar el gesto
	 * radio: Radio de giro
	 * desplY: (opc) Distancia a desplazar posición Y cada frame
	*/
	animRotar: function() {
		var self = this;
		this.e_mano.attr({ alpha: 0, visible: true });

		// Para la cuenta, usamos el contador del delayframe
		var grados, xR, yR;
		var r = this.conf.radio;
		this.x = this.xIni + r;
		this.y = this.yIni;
		this.visible = true;
		this.desaparecer = false; // true si la mano ya está desapareciendo
		
		this.e_mano.addTween({ alpha: 1 }, "linear", 12);
		
		this.bind("EnterFrame", function() {
			grados = this.frame * 0.08;
			yR = Math.sin(grados);
			xR = Math.cos(grados);
			this.x = this.xIni + xR * r;
			this.y = this.yIni + yR * r;
			
			if (this.deltaY !== 0) {
				this.y += this.conf.desplY;
				this.conf.desplY += this.deltaY;
			}

			if (!this.desaparecer) {
				if (this.c >= (this.duracion - 11)) {
					this.e_mano.addTween({ alpha: 0 }, "linear", 10);
					this.desaparecer = true;
				}
			}
			this.frame++;
		});
	},
	
	
	
	/* Animación de gesto de arrastre
	 * Configuración:
	 * coords: Coordenadas de inicio de arrastre [x1, y1]
	 * coordsFin: Coordenadas de fin de arrastre [x2, y2]
	 * desplX: Distancia a desplazar X cada repetición
	 */
	animArrastre: function() {
		var self = this;
		var mano = this.e_mano;
		mano.attr({ alpha: 0, visible: true });

		this.visible = true;
		var xFin = this.conf.coordsFin[0] - 30;
		var yFin = this.conf.coordsFin[1] - 30;
		var desplX = (this.conf.desplX) ? this.conf.desplX : 0;
		
		mano.addTween({ alpha: 1 }, "linear", 5, function() {
			self.addTween({ x: xFin, y: yFin }, "easeInOutCubic", 40, function() {
				mano.addTween({ alpha: 0 }, "linear", 10, function() {
					self.visible = false;
					self.attr({ x: self.xIni, y: self.yIni });

					if (self.conf.repetir > 1) {
						self.conf.repetir--;
						Crafty.e("DelayFrame").delay(function() {
							if (desplX !== 0) {
								self.x += desplX;
								self.conf.coordsFin[0]+= desplX;
							}
							self.animArrastre();
						}, 10);
					}
					else {
						self.ocultar();
					}
				});
			});
		});	
	},
	
	ocultar: function() {
		console.log("ocultar")
		this.visible = false;
		this.e_mano.visible = false;
		this.e_delayAnim.destroy();
		this.destroy();
		return this;
	}
});