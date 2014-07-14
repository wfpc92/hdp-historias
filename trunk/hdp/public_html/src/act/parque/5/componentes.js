Crafty.c("P5_AreaToque", {
	init: function() {
		this.requires("2D, Canvas, Mouse");
	},
	P5_AreaToque: function(carro, p1, p2) {
		var self = this;
		this.carro = carro;
		this.contToques = 0;
		this.dcontToques = 1.5;
		this.dmcontToques = 0.1;
		this.maxcontToques = 15;

		this.genEngranajes = {
			generar: function() {
				var i = Crafty.math.randomElementOfArray([1, 2, 3]);
				var engranaje = Crafty.e("P5_Engranaje, sprP5_engranaje" + i)
						.attr({x: 610, y: 253, z: 22})
						.P5_Engranaje(true, 0.3, 1, self.carro);
			}
		};

		this.bind("MouseDown", function() {
			this.contToques += this.dcontToques;
			this.animar();
		}).bind("EnterFrame", function() {
			if (this.contToques >= this.maxcontToques) {
				this.contToques = 0;
				this.genEngranajes.generar();
			}
			this.contToques -= this.dmcontToques;
			if (this.contToques < 0) {
				this.contToques = 0;
			}
		});

		//al finalizar una animacion se debe verificar si se debe animar al otro
		this.p1 = p1;
		this.p2 = p2;
		this.p1.otro = this.p2;
		this.p2.otro = this.p1;
		this.p1.bind("AnimationEnd", this.p1.cll_animationEnd);
		this.p2.bind("AnimationEnd", this.p2.cll_animationEnd);
		return this;
	},
	animar: function() {
		//permitir que los personajes se animen
		this.p1.band = true;
		this.p2.band = true;
		//si no hay una animacion ejecutandose por parte de ambos persoanjes entonces el primer personaje se anima.
		if (!this.p1.isPlaying("fuerza") && !this.p1.isPlaying("sube")
				&& !this.p2.isPlaying("fuerza") && !this.p2.isPlaying("sube")) {
			this.p1.fuerza();
		}
		Crafty("P5_Engranaje").each(function() {
			this.decrecerVelocidad();
		});
		return this;
	}
});

Crafty.c("P5_Personaje", {
	init: function() {
		this.requires("2D, Canvas, SpriteAnimation, Mouse");
	},
	P5_Personaje: function(dir) {
		this.dir = dir;
		if (dir == -1) {
			this.spr_fuerza = "sprP5_hFuerzaIzq";
			this.spr_sube = "sprP5_hSubeIzq";
			this.spr_fuerza_reel = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]];
			this.spr_sube_reel = [[0, 0], [1, 0], [2, 0], [3, 0]];
		} else {
			this.spr_fuerza = "sprP5_hFuerzaDer";
			this.spr_sube = "sprP5_hSubeDer";
			this.spr_fuerza_reel = [[6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0]];
			this.spr_sube_reel = [[4, 0], [5, 0], [6, 0], [7, 0]];
		}
		this.fuerza();
		return this;
	},
	cll_animationEnd: function(reel_obj) {
		//esta bandera indica si se realizo la animacion o no
		if (this.band) {
			if (reel_obj.id == "fuerza") {
				this.sube();
				this.otro.fuerza();
			}
			if (reel_obj.id == "sube") {
				this.fuerza();
				this.otro.sube();
			}
			//al final se marca como falsa para que no se anime de nuevo.
			this.band = false;
		}
	},
	fuerza: function() {
		if (!this.isPlaying("fuerza")) {
			var w_old = this.w;
			var h_old = this.h;
			this.removeComponent(this.spr_sube)
			this.addComponent(this.spr_fuerza)
					.reel("fuerza", 500, this.spr_fuerza_reel)
					.animate("fuerza", 1);
			if (h_old && w_old) {
				this.x -= this.w - w_old;
				this.y -= this.h - h_old;
			}
		}
		return this;
	},
	sube: function() {
		if (!this.isPlaying("sube")) {
			var w_old = this.w;
			var h_old = this.h;
			this.removeComponent(this.spr_fuerza);
			this.addComponent(this.spr_sube)
					.reel("sube", 500, this.spr_sube_reel)
					.animate("sube", 1);
			if (h_old && w_old) {
				this.x -= this.w - w_old;
				this.y -= this.h - h_old;
			}
		}
		return this;
	}
});

Crafty.c("P5_Engranaje", {
	init: function() {
		this.requires("2D, Canvas");
	},
	P5_Engranaje: function(fisica, vr, dir, carro) {
		this.fisica = fisica;
		this.vr = vr;
		this.dvr = 0.5;//delta de crecimiento con clic
		this.ddvr = 0.01;//delta de decrecimiento con enterframe
		this.vrmax = 3;
		this.dir = dir;
		this.carro = carro;
		var dist = 50;

		this.con = [
			{a: 0.00102906359, b: -1.8532426075, c: 1040.8636592742},
			{a: 0.0015456989, b: -2.5744623656, c: 1289.8911290323},
			{a: 0.0011613743, b: -2.0379452285, c: 1104.6389868952}
		];

		if (fisica) {
			this.areaMouse = Crafty.e("2D, Canvas, Arrastrable");
			var am = this.areaMouse;
			am.unbind("EnterFrame")
			am.attr({x: this.x - dist, y: this.y - dist, w: this.w + 2 * dist, h: this.h + 2 * dist, z: this.z - 1});
			am.obj = this;
			am.vx = 1;
			am.vy = 1;
			am.ax = 0.08;
			am.xmax = 1280;
			am.C = Crafty.math.randomElementOfArray(this.con);
			am.attach(this);
			am.origin(am.w / 2.0, am.h / 2.0)
			am.bind("MouseDown", function() {
				this.unbind("EnterFrame");
				this.bind("EnterFrame", function() {
					if (this.obj.x > this.obj.carro.x && this.obj.x < this.obj.carro.x + this.obj.carro.w
							&& this.obj.y > this.obj.carro.y && this.obj.y < this.obj.carro.y + this.obj.carro.h) {
						this.unbind("EnterFrame")
						this.obj.carro.aumentarCarga();
						this.obj.destroy();
						this.destroy();
					}
				});
			}).bind("MouseUp", function() {
				this.caer();
			}).bind("MouseOut", function() {
				this.caer();
			}).bind("EnterFrame", function() {
				//el movimiento en y lo define una funcion cuadratica
				//nota: se le resta dist porque es la distancia quqe aumentaba con el area del mouse.
				this.y = this.C.a * this.x * this.x + this.C.b * this.x + this.C.c - dist;
				this.x += this.vx;
				this.vx += this.ax;
				if (this.x > this.xmax) {
					this.destroy();
					this.obj.destroy();
				}
			});
			am.caer = function() {
				this.bind("EnterFrame", function() {
					this.vy += 0.1;
					this.y += this.vy;
					if (this.y > 800) {
						this.destroy();
					}
				});
			};
		} else {
			this.origin(this.w / 2.0, this.h / 2.0)
					.bind("EnterFrame", function() {
						this.rotation += this.vr * this.dir;
						this.vr -= this.ddvr;
						if (this.vr <= 0.0) {
							this.vr = 0;
						}
					});
		}
		return this;
	},
	decrecerVelocidad: function() {
		this.vr += this.dvr;
		if (this.vr >= this.vrmax) {
			this.vr = this.vrmax;
		}
		return this;
	}
});

Crafty.c("P5_Carro", {
	init: function() {
		this.requires("2D, Canvas, Tweener");
		this.spr = [];
		for (var i = 0; i < 3; i++) {
			this.spr[i] = "sprP5_carro" + i;
		}
		this.spr_cont = 0;
		this.eng_cont = 0;

		this.lim1 = 2;
		this.lim2 = 5;
		this.lim3 = 7;
	},
	P5_Carro: function(actividad) {
		this.actividad = actividad;
		this.cambiarSprite();
		this.r1x = this.x - 32;
		this.r2x = this.x + 58;
		this.ry = this.y + 20;
		this.rueda1 = Crafty.e("2D, Canvas, Image").image("img/act/parque/5/llanta.png")
				.attr({x: this.r1x, y: this.ry, z: this.z + 1});
		this.rueda2 = Crafty.e("2D, Canvas, Image").image("img/act/parque/5/llanta.png")
				.attr({x: this.r2x, y: this.ry, z: this.z + 1});
		this.rueda1.origin(this.rueda1.w / 2.0, this.rueda1.h / 2.0);
		this.rueda2.origin(this.rueda2.w / 2.0, this.rueda2.h / 2.0);
		this.attach(this.rueda1).attach(this.rueda2);
		return this;
	},
	aumentarCarga: function() {
		if (this.eng_cont == this.lim1 || this.eng_cont == this.lim2 || this.eng_cont == this.lim3) {
			this.cambiarSprite();
		}
		if (this.eng_cont >= this.lim3) {
			this.actividad.ganarActividad();
		}
		this.eng_cont++;
		return this;
	},
	cambiarSprite: function() {
		if (this.spr_cont < this.spr.length) {
			var w_old = this.w;
			var h_old = this.h;
			if (h_old && w_old) {
				var yr1_old = this.rueda1.y;
				var yr2_old = this.rueda2.y;
			}
			this.removeComponent(this.spr[this.spr_cont - 1]);
			this.addComponent(this.spr[this.spr_cont]);
			if (h_old && w_old) {
				this.x -= this.w - w_old;
				this.y -= this.h - h_old;
				this.rueda1.y = yr1_old;
				this.rueda2.y = yr2_old;
			}
			this.spr_cont++;
		}
		return this;
	},
	mover: function(xnew) {
		this.rueda1.bind("EnterFrame", function() {
			this.rotation += 1;
		});
		this.rueda2.bind("EnterFrame", function() {
			this.rotation += 1;
		});
		var self = this;
		this.addTween({x: xnew, y: this.y}, 'easeInOutQuad', 340, function() {
			self.rueda1.unbind("EnterFrame");
			self.rueda2.unbind("EnterFrame");
		});
		return this;
	}
});

