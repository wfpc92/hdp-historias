Crafty.c("P3_GeneradorHormigas", {
	bloqueado: false,
	x0: 670, //POSICION x DONDE DEBE IR A PARAR LA HORMIGA
	y0: 500, //posicion y donde debe ir a parar la hormiga
	mint: 1000, //tiempo minimo de generacion de hormiga
	maxt: 2000, //tiempo maximo de generacion de hormiga
	numHormigasMax: 0, //numeo de hormigas maximo por escena
	init: function() {
		//posiciones de salida de las hormigas.
		this.posxyz = [
			//x:posicion inicialen x, y:posicion inicial en y, z:posicion inicial en z, 
			//xfinal: posicion final en x, yfinal: posicion final en y, t:tiempo desde la posicion inicial hasta la posicion final
			//der: indica si la hormiga mira para la derecha o la izquierda.
			{x: -88, y: 512, z: 20, xfinal: 520, yfinal: 475, t: 300, der: true},
			{x: -80, y: 750, z: 20, xfinal: 525, yfinal: 480, t: 330, der: true},
			{x: 116, y: 764, z: 20, xfinal: 530, yfinal: 485, t: 350, der: true},
			{x: 378, y: 774, z: 20, xfinal: 540, yfinal: 490, t: 330, der: true},
			{x: 778, y: 778, z: 20, xfinal: 635, yfinal: 495, t: 300, der: false},
			{x: 1014, y: 786, z: 20, xfinal: 620, yfinal: 475, t: 350, der: false},
			{x: 1192, y: 786, z: 20, xfinal: 635, yfinal: 495, t: 300, der: false},
			{x: 1252, y: 610, z: 20, xfinal: 620, yfinal: 490, t: 330, der: false},
			{x: 1242, y: 498, z: 20, xfinal: 635, yfinal: 480, t: 350, der: false}
		];
	},
	P3_GeneradorHormigas: function(rama, max) {
		this.rama = rama;
		this.numHormigasMax = max;
		this.generar();
		return this;
	},
	//si el numero actual de hormigas en escena es menor al tope entonces genera una hormiga.
	generar: function() {
		var self = this;
                //generar un numero determinado de hormigas
                if(Crafty("P3_Hormiga").length < self.numHormigasMax ){
                    //bloquear el gnerador de hormigas en caso que se haya excedido el numero de hormigas
                    Crafty.e("Delay").delay(function() {
                                if (!self.bloqueado) {
                                        //self.bloqueado = Crafty("P3_Hormiga").length >= self.numHormigasMax ? true : false;
                                        self.nuevaHormiga().generar();
                                }
                    }, Crafty.math.randomInt(this.mint, this.maxt));
                }else{
                    this.bloqueado = true;
                }
		return this;
	},
	//genera en una posicion aleatoria una hormiga.
	nuevaHormiga: function() {
		var pos = Crafty.math.randomElementOfArray(this.posxyz);
		Crafty.e("P3_Hormiga")
				.P3_Hormiga(this, pos.der)
				.attr({x: pos.x, y: pos.y, z: pos.z})
				.addTween({x: pos.xfinal, y: pos.yfinal}, "easeOutSine", pos.t, function() {
					this.comer();
				});
		return this;
	},
	//intentar generar una hormiga solo si ya se ha llagado al tope de hormigas.
	hormigaMuerta: function() {
                if (this.bloqueado) {
                        this.bloqueado = false;
                        this.generar();
		}
		return this;
	}
});


Crafty.c("P3_Hormiga", {
	e_padre: null, //referencia al generador de hormigas
	der: false, //conoce la spprite
	spr_caminando: "sprP3_hcamina",
	spr_muerde: "sprP3_hmuerde",
	spr_muerta: "sprP3_hmuerta",
	init: function() {
		this.requires("2D, Canvas, Hormiga, SpriteAnimation, Mouse, Tweener");
		return this;
	},
	P3_Hormiga: function(e_padre, der) {
		this.e_padre = e_padre;
		this.der = der;
		this.caminar()
				.bind("MouseDown", function(e) {
					this.removeComponent("Mouse")
							.unbind("MouseDown")
							.cancelTweener()
							.morir();
					Crafty.e("Onomatopeya").Onomatopeya(Crafty.math.randomInt(2, 3), {x: this.x, y: this.y});
				});
		return this;
	},
	caminar: function() {
		this.addComponent(this.spr_caminando);
		this.reel("camina", 1000, this.der ? [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1]] : [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]])
				.animate("camina", -1);
		return this;
	},
	comer: function() {
		this.cancelTweener()
				.removeComponent(this.spr_caminando)
				.addComponent(this.spr_muerde)
				.reel("muerde", 500, this.der ? [[0, 1], [1, 1], [2, 1]] : [[0, 0], [1, 0], [2, 0]])
				.animate("muerde", -1)
				.bind("EnterFrame", function() {
					this.e_padre.rama.hormigaComeRama(this);
				});
		return this;
	},
	morir: function() {
		this.removeComponent(this.spr_caminando)
				.addComponent(this.spr_muerta)
				.reel("morir", 500, this.der ? [[0, 1], [1, 1], [2, 1]] : [[0, 0], [1, 0], [2, 0]])
				.animate("morir", 1);
		var self = this;
		Crafty.e("Delay").delay(function() {
			self.addTween({x: this.x, y: this.y, alpha: 0.0}, "easeOutSine", 25, function() {
				this.destroy();
				//intentar generar una nueva hormiga de acuerdo al numero de hormigas que hay
				self.e_padre.hormigaMuerta();
			});
		}, 2000);
		return this;
	}
});



Crafty.c("P3_Regadera", {
	rama: null,
	count: 0,
	init: function() {
		this.requires("2D, Canvas, Image, Mouse").image("img/act/parque/3/regadera.png");
	},
	P3_Regadera: function(rama) {
		this.rama = rama;
		this.bind("MouseDown", function() {
			this.generarGota({x: Crafty.math.randomInt(530, 680), y: Crafty.math.randomInt(153, 213), z: this.z});
			this.rama.regaderaRociaAgua(this);
		});
		return this;
	},
	generarGota: function(pos) {
		var gota = Crafty.e("2D, Canvas, Image, Tweener").image("img/act/parque/3/gota.png")
				.attr({x: pos.x, y: pos.y, z: 2});
		gota.vy = 0;
		gota.bind("EnterFrame", function() {
			this.vy += 0.5;
			this.y += this.vy;
			if (this.y > Crafty.math.randomInt(570, 600)) {
				this.vy = 0;
				if (!this.unsolollamado) {
					this.unsolollamado = true;
					this.addTween({alpha: 0}, "easeOutSine", 20, function() {
						this.destroy();
					});
				}
			}
		});
		return this;
	},
	pararRegar: function() {
		this.removeComponent("Mouse").unbind("MouseDown");
	}
});

Crafty.c("P3_Rama", {
	indexEnredadera: -1,
	posEnredadera: [],
	enredadera: [],
	init: function() {
		this.requires("2D, Canvas, Image").image("img/act/parque/3/rama.png");
		this.indexEnredadera = 0;
	},
	P3_Rama: function(actividad, tope, dc, dch) {
		this.actividad = actividad;
		var cont = 1;
		this.posEnredadera = [//posiciones sobre la rama de las enredaderas
			{x: 604, y: 531, z: 0, cre: (++cont) * tope}, {x: 608, y: 456, z: 0, cre: (++cont) * tope},
			{x: 611, y: 400, z: 0, cre: (++cont) * tope}, {x: 607, y: 319, z: 0, cre: (++cont) * tope},
			{x: 603, y: 234, z: 0, cre: (++cont) * tope}, {x: 605, y: 168, z: 0, cre: (++cont) * tope},
			{x: 611, y: 100, z: 0, cre: (++cont) * tope}, {x: 609, y: 15, z: 0, cre: (++cont) * tope},
			{x: 584, y: -30, z: 0, cre: (++cont) * tope}
		];
		this.dc = dc;
		this.dch = dch;
		this.crecimiento = this.posEnredadera[0].cre; //el contador que regula en que momento se crece la redadera
		this.crecerEnredadera();
		return this;
	},
	regaderaRociaAgua: function(regadera) {
		var self = this;
		if (this.indexEnredadera >= this.posEnredadera.length) {
			//no dejar que la regadera bote mas agua, hay que ahorrar agua.
			regadera.pararRegar();
			//dibujar flores en la punta de la rama.
			var flor1 = Crafty.e("2D, Canvas, Image, Tweener").image("img/act/parque/3/flor.png")
					.attr({x: this.x - 35, y: this.y - 30, z: this.z + 10, rotation: 45, alpha: 0});
			var flor2 = Crafty.e("2D, Canvas, Image, Tweener").image("img/act/parque/3/flor.png")
					.attr({x: this.x + 35, y: this.y + 20, z: this.z + 10, alpha: 0});
			flor1.addTween({alpha: 1}, "easeOutSine", 10);
			flor2.addTween({alpha: 1}, "easeOutSine", 10, function() {
				self.actividad.ganarActividad();
			});
		}
		else {
			this.crecerEnredadera();
		}
		return this;
	},
	hormigaComeRama: function(hormiga) {
		this.quitarEnredadera();
		if (Crafty("Onomatopeya").length < 8) {//verificar que no hayan muchas onomatopyeas para evitar que se llene de entidades
			if (Crafty.math.randomInt(0, 150) == 0) { //como son tantos llamados a esta funcion se debe controlar
				Crafty.e("Onomatopeya").Onomatopeya(4, {x: hormiga.x + Crafty.math.randomInt(-100, 100), y: hormiga.y - Crafty.math.randomInt(10, 300)});
			}
		}
		return this;
	},
	crecerEnredadera: function() {
		var pos = this.posEnredadera[this.indexEnredadera];
		if (pos) {
			this.crecimiento += this.dc;
			if (this.crecimiento > pos.cre) {//si el crecimiento supera el tope establecido, crece la redadera
				this.enredadera[this.indexEnredadera] = Crafty.e("2D, Canvas, Tweener, Enredadera, sprP3_enredadera" + this.indexEnredadera)
						.attr({x: pos.x, y: pos.y, z: pos.z, alpha: 0})
						.addTween({alpha: 1}, "easeOutSine", 50);
				this.indexEnredadera += 1;
			}
		}
		return this;
	},
	quitarEnredadera: function() {
		var pos = this.posEnredadera[this.indexEnredadera - 1];
		if (pos) {
			this.crecimiento -= this.dch;
			if (this.crecimiento < 0) {
				this.crecimiento = 0;
			}
			if (this.crecimiento < pos.cre) {//si el crecimiento supera el tope establecido, crece la redadera
				this.indexEnredadera -= 1;
				Crafty("sprP3_enredadera" + this.indexEnredadera).each(function() {
					this.destroy();
				});
				if (Crafty("Enredadera").length <= 0) {
					this.actividad.perder();
				}
			}
		}
		return this;
	}
});

Crafty.c("Onomatopeya", {
	spr: "",
	init: function() {
		this.requires("2D, Canvas, Tweener");
		return this;
	},
	Onomatopeya: function(codigo, pos) {
		this.spr = codigo == 1 ? "sprP3_bien"
				: (codigo == 2 ? "sprP3_splat"
						: (codigo == 3 ? "sprP3_kapaw"
								: "sprP3_crunch"));
		this.requires(this.spr);
		this.attr({x: pos.x - this.w / 2, y: pos.y - this.h / 2, z: 30})
				.addTween({alpha: 0}, "easeOutSine", 80, function() {
					this.destroy();
				});
		return this;
	}
});