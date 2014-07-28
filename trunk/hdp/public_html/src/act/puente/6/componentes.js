// Personaje que escala la montaña
Crafty.c("H6_Personaje", {
	e_torso: null,
	e_brazoIzq: null,
	e_brazoDer: null,
	e_giros: null, // Referencia a detector de giros
	e_flechas: null, // flechas indicadoras de rotación
	e_delay: null, // Delay de desequilibrio aleatorio
	e_centroGiro: null, // Entidad pegada al PJ para actualizar posición de área de giro
	
	blqueado: false, // true para evitar interacciones
	x0: -40, // Coordenadas iniciales
	y0: 420,
	aa: 0, // Aceleración angular
	va: 0, // Velocidad angular
	vaMax: 0.5, // va máxima
	aaMax: 0.01,
	incremAa: 0.015, // Incremento a aa por vuelta completa
	
	progreso: 0, // valor entre 0 y 1, valor del recorrido del PJ del inicio al final
	velocidad: 0.0004, // Incremento por frame en el progreso
	
	init: function() {
		this.requires("2D, Canvas, sprH6_personaje, SpriteAnimation")
			.reel("caminar", 500, [[0,0],[104,0],[208,0],[312,0],[416,0],[520,0],[624,0]]);
		this.e_brazoIzq = Crafty.e("2D, Canvas, Image").image("img/act/puente/6/brazos.png");
		this.e_brazoDer = Crafty.e("2D, Canvas, Image").image("img/act/puente/6/brazos.png");
		this.e_centroGiro = Crafty.e("2D, Canvas").attr({ x: 45, y: 110, z: 300, w: 3, h: 3 });
		
		this.e_giros = Crafty.e("GirosDany").GirosDany(0, 0, 300, 300, true);
		//this.e_giros.debug(); // Comentar para no mostrar el área de rotación
		this.e_giros.z = 300;
		this.e_giros.e_brazoIzq = this.e_brazoIzq;
		this.e_giros.e_brazoDer = this.e_brazoDer;
		
		var self = this;
		this.e_giros.cbk_vuelta = function(sentido) {
			if (sentido) {
				// Rotando en dirección de manecillas del reloj
				self.aa += self.incremAa;
			}
			else {
				self.aa -= self.incremAa;
			}
			//console.log(self.aa);
		};
		
		this.e_giros.cbk_rotar = function(grados) {
			this.e_brazoIzq.rotation = grados + 90;
			this.e_brazoDer.rotation = grados;
		};
		
		this.e_flechas = Crafty.e("H6_Flecha");
		this.e_centroGiro.attach(this.e_flechas);
		
		this.z = 10;
		this.origin(47, 354);
		
		this.e_brazoIzq.origin(10, 10);
		this.e_brazoDer.origin(10, 10);
		this.e_brazoIzq.attr({ x: 52, y: 90, z: 5, rotation: 10 });
		this.e_brazoDer.attr({ x: 8, y: 90, z: 15, rotation: 210 });
		
		this.attach(this.e_brazoIzq);
		this.attach(this.e_brazoDer);
		this.attach(this.e_centroGiro);
		
		this.attr({ x: this.x0, y: this.y0 });
	},
	
	H6_Personaje: function(e_padre) {
		this._padre = e_padre;
		return this;
	},
	
	// Inicia el desplazamiento hacia la cima
	iniciarCaminata: function() {
		this.animate("caminar", -1);
		
		this.desequilibrio(); // Iniciar bucle de desequilibrios
		
		// Actualizamos manualmente posición del área de rotación para evitar que se rote (sólo trasladar)
		this.bind("Move", function() {
			this.e_giros.x = this.e_centroGiro._x - 145;
			this.e_giros.y = this.e_centroGiro._y - 150;
			return this;
		});
		
		this.bind("EnterFrame", function() {
			// Actualizamos posición y rotación
			this.progreso += this.velocidad;
			this.actualizarPos();
			
			this.va += this.aa;
			if (this.va > this.vaMax) this.va = this.vaMax;
			else if (this.va < -this.vaMax) this.va = -this.vaMax;
			this.rotation += this.va;
			
			// si pasa cierto ángulo, mostrar flechas
			if (!this.bloqueado) {
				if (this.rotation > 25 || this.rotation < -25) {
					if (this.rotation > 25) {
						if (this.e_flechas.sentidoDerecho) {
							this.e_flechas.giroIzquierdo();
						}
					} else if (this.rotation < -25) {
						if (!this.e_flechas.sentidoDerecho) {
							this.e_flechas.giroDerecho();
						}
					}

					if (!this.e_flechas.mostrando) this.e_flechas.aparecer();
				}
				else {
					if (this.e_flechas.mostrando) this.e_flechas.ocultar();
				}
			}
			
			// Si ya se ha caído, detener y perder
			if (this.estaCaido()) {
				this.detener();
				this.golpearSuelo();
				this.e_flechas.ocultar();
				Crafty.e("DelayFrame").delay(function() {
					gesActividad.mostrarPerdiste();
				}, 120);
			}
			
			// Ganamos si llega al progreso máximo
			if (this.progreso >= 0.93 && !this.bloqueado) {
				this.bloqueado = true;
				if (this.e_flechas.mostrando) this.e_flechas.ocultar();
				this._padre.ganarActividad();
			}
		});
	},
	
	// Programa un desequilibrio aleatorio
	desequilibrio: function() {
		var frames = randomInt(120, 240);
		var self = this;
		this.e_delay = Crafty.e("DelayFrame").delay(function() {
			self.aa = randomFloat(-self.aaMax, self.aaMax);
			console.log("desequilibrando con aa " + self.aa)
			self.desequilibrio();
		}, frames);
	},
	
	/**
	 * Actualiza la posición 2D de acuerdo a un valor
	 */
	actualizarPos: function() {
		this.x = this.x0 + this.progreso * 1250;
		this.y = this.y0 - Math.pow(this.progreso, 2) * 460;
		return this;
	},
	
	// TRUE si el personaje ya está caído
	estaCaido: function() {
		var prog = this.progreso;
		if (prog < 0.17) {
			return (this.rotation > 82 || this.rotation < -98);
		}
		else if (prog >= 0.17 && prog < 0.5) {
			return (this.rotation > 72 || this.rotation < -98);
		}
		else {
			return (this.rotation > 63 || this.rotation < -110);
		}
	},
	
	// animación de golpeo al suelo
	golpearSuelo: function() {
		var part = this._padre.particulas;
		var mbr = this.mbr();
		part.x = mbr._x;
		part.y = mbr._y;
		part.iniciar();
		return true;
	},
	
	// Detiene la caminata y los desequilibrios
	detener: function() {
		if (this.e_delay) this.e_delay.destroy();
		this.e_giros.detener();
		this.pauseAnimation();
		this.unbind("EnterFrame");
		return this;
	},
	
	// Detiene la interacción y las rotaciones, pero deja que el pj siga subiendo
	noRotar: function() {
		if (this.e_delay) this.e_delay.destroy();
		this.e_giros.detener();
		this.va = 0;
		this.aa = 0;
		return this;
	}
});


// flechas indicadoras de giro
Crafty.c("H6_Flecha", {
	e_flecha1: null,
	e_flecha2: null,
	sentidoDerecho: true, // false si está girando en contra de las manecillas del reloj
	mostrando: false, // true si actualmente lon visibles las flechas
	va: 2, // velocidad angular
	
	init: function() {
		this.requires("2D");
		
		this.e_flecha1 = Crafty.e("2D, Canvas, sprH6_giroDerecho, Tweener");
		this.e_flecha2 = Crafty.e("2D, Canvas, sprH6_giroDerecho, Tweener");
		
		this.e_flecha1.origin(121, 125).attr({ x: -80, y: -20, z: 100, alpha: 0 });
		this.e_flecha2.origin(121, 125).attr({ x: -80, y: -20, z: 100, rotation: 180, alpha: 0 });
		
		this.attach(this.e_flecha1);
		this.attach(this.e_flecha2);
		
		this.bind("EnterFrame", function() {
			if (this.sentidoDerecho) {
				this.e_flecha1.rotation += this.va;
				this.e_flecha2.rotation += this.va;
			} else {
				this.e_flecha1.rotation -= this.va;
				this.e_flecha2.rotation -= this.va;
			}
		});
	},
	
	H6_Flecha: function() {
		
	},
	
	aparecer: function() {
		this.mostrando = true;
		this.e_flecha1.cancelTweener().addTween({ alpha: 1 }, "linear", 10);
		this.e_flecha2.cancelTweener().addTween({ alpha: 1 }, "linear", 10);
		return this;
	},
	
	ocultar: function() {
		console.log("ocultar flecha")
		this.mostrando = false;
		this.e_flecha1.cancelTweener().addTween({ alpha: 0 }, "linear", 10);
		this.e_flecha2.cancelTweener().addTween({ alpha: 0 }, "linear", 10);
		return this;
	},
	
	// Mostrar giro a favor de las manecillas del reloj
	giroDerecho: function() {
		if (!this.sentidoDerecho) {
			this.sentidoDerecho = true;
			this.e_flecha1.removeComponent("sprH6_giroIzquierdo").addComponent("sprH6_giroDerecho");
			this.e_flecha2.removeComponent("sprH6_giroIzquierdo").addComponent("sprH6_giroDerecho");
		}
		return this;
	},
	
	// Mostrar giro en contra de las manecillas del reloj
	giroIzquierdo: function() {
		if (this.sentidoDerecho) {
			this.sentidoDerecho = false;
			this.e_flecha2.removeComponent("sprH6_giroDerecho").addComponent("sprH6_giroIzquierdo");
			this.e_flecha1.removeComponent("sprH6_giroDerecho").addComponent("sprH6_giroIzquierdo");
		}
		return this;
	}
});