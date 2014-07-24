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
                if(Crafty("P3_Hormiga").length < self.numHormigasMax) {
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
					
					Crafty.e("Onomatopeya").Onomatopeya(randomInt(2, 3), {x: this.x, y: this.y });
				});
		return this;
	},
	
	caminar: function() {
		this.addComponent(this.spr_caminando);
		this.reel("camina", 900, this.der ? [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1]] : [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]])
				.animate("camina", -1);
		return this;
	},
	
	comer: function() {
		this.cancelTweener()
				.removeComponent(this.spr_caminando)
				.addComponent(this.spr_muerde)
				.reel("muerde", 400, this.der ? [[0, 1], [1, 1], [2, 1]] : [[0, 0], [1, 0], [2, 0]])
				.animate("muerde", -1)
				.bind("EnterFrame", function() {
					this.e_padre.rama.hormigaComeRama(this);
				});
		return this;
	},
	
	morir: function() {
		this.removeComponent(this.spr_caminando)
				.addComponent(this.spr_muerta)
				.reel("morir", 250, this.der ? [[0, 1], [1, 1], [2, 1]] : [[0, 0], [1, 0], [2, 0]])
				.animate("morir", 1);
		var self = this;
		
		self.addTween({x: this.x, y: this.y, alpha: 0.0}, "easeInCubic", 37, function() {
			this.destroy();
			//intentar generar una nueva hormiga de acuerdo al numero de hormigas que hay
			self.e_padre.hormigaMuerta();
		});
		
		return this;
	}
});


Crafty.c("P3_Regadera", {
	rama: null,
	cuentaGotas: 0, // gotas actualmente en pantalla
	
	init: function() {
		this.requires("2D, Canvas, Image, Tweener, Mouse")
			.image("img/act/parque/3/regadera.png")
			.attr({ alpha: 0.0, rotation: -15 });
	},
	
	// hace un fadeIn para mostrar la regadera
	mostrar: function() {
		var y0 = this._y;
		var x0 = this._x;
		this.y = this._y + 100;
		this.x = this._x - 30;
		this.addTween({ x: x0, y: y0, alpha: 1, rotation: 0 }, "easeOutCubic", 50);
		return this;
	},
	
	P3_Regadera: function(rama) {
		this.rama = rama;
		this.bind("MouseDown", function() {
			if (this.cuentaGotas < 10) {
				this.cuentaGotas++;
				Crafty.e("P3_Gota")
						.attr({ z: this._z })
						.P3_Gota(this, randomInt(560, 578), randomInt(100, 128));
				this.rama.regaderaRociaAgua(this);
			}
		});
		return this;
	},
	
	pararRegar: function() {
		this.removeComponent("Mouse").unbind("MouseDown");
	}
});

// Una de las gotas que dispara la regadera
Crafty.c("P3_Gota", {
	ay: 0.5, // cinemática
	vy: 0.5, 
	vx: 0.5,
	yMax: 0, // y Máxima de la gota antes de desaparecer
	e_regadera: null, // referencia a regadera
	
	init: function() {
		this.requires("2D, Canvas, Image, Tweener")
			.image("img/act/parque/3/gota.png")
			.attr({ z: 2, rotation: -30 });
	
		this.vx = randomFloat(0.3, 2);
		this.yMax = randomInt(550, 590);
	
		this.bind("EnterFrame", function() {
			// si sigue cayendo, desplazar
			this.vy += this.ay;
			this.y += this.vy;
			this.x += this.vx;
			
			if (this.rotation <= 0) this.rotation += 1;
				
			if (this.y > this.yMax) {
				this.ay = 0;
				this.vy = 0;
				this.vx = 0;
				this.unbind("EnterFrame");
				this.addTween({ alpha: 0 }, "linear", 16, function() {
					this.e_regadera.cuentaGotas--;
					this.destroy();
				});
			}
		});
	},
	
	P3_Gota: function(e_rega, x0, y0) {
		this.e_regadera = e_rega;
		this.attr({ x: x0, y: y0 });
		return this;
	}
});


Crafty.c("P3_Rama", {
	indexEnredadera: -1,
	posEnredadera: [],
	enredadera: [],
	mostrarOnomatopeya: true, // false si no se debe mostrar onomatopeya al comer la hormiga
	
	init: function() {
		this.requires("2D, Canvas, Image, Tweener")
			.image("img/act/parque/3/rama.png");
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
		
		
		// la rama aparece desde el suelo
		var y0 = this._y;
		this.y += 200;
		this.addTween({ y: y0 }, "easeOutCubic", 30, function() {
			this.crecerEnredadera();
		});
		
		return this;
	},
	
	regaderaRociaAgua: function(regadera) {
		var self = this;
		if (this.indexEnredadera >= this.posEnredadera.length) {
			// no dejar que la regadera bote mas agua, hay que ahorrar agua.
			regadera.pararRegar();
			// dibujar flores en la punta de la rama.
			var flor1 = Crafty.e("2D, Canvas, Image, Tweener")
					.image("img/act/parque/3/flor.png")
					.attr({x: this.x - 35, y: this.y - 30, z: this.z + 10, rotation: 70, alpha: 0});
			var flor2 = Crafty.e("2D, Canvas, Image, Tweener")
					.image("img/act/parque/3/flor.png")
					.attr({x: this.x + 35, y: this.y + 20, z: this.z + 10, rotation: -20, alpha: 0});
			
			flor1.addTween({ alpha: 1, rotation: 45 }, "easeOutElastic", 45);
			flor2.addTween({ alpha: 1, rotation: 0 }, "easeOutElastic", 65, function() {
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
		if (this.mostrarOnomatopeya) {
			this.mostrarOnomatopeya = false;
			var e_ono = Crafty.e("Onomatopeya");
			e_ono.Onomatopeya(4, {x: hormiga.x + randomInt(-50, 50), y: hormiga.y - randomInt(50, 100)});
			
			var self = this;
			Crafty.e("DelayFrame").delay(function() {
				self.mostrarOnomatopeya = true;
			}, randomInt(30, 180));
		}
		return this;
	},
	
	crecerEnredadera: function() {
		var pos = this.posEnredadera[this.indexEnredadera];
		if (pos) {
			this.crecimiento += this.dc;
			if (this.crecimiento > pos.cre) {//si el crecimiento supera el tope establecido, crece la redadera
				this.enredadera[this.indexEnredadera] = Crafty.e("2D, Canvas, Tweener, Enredadera, sprP3_enredadera" + this.indexEnredadera)
						.attr({x: pos.x, y: pos.y + 10, z: pos.z, alpha: 0})
						.addTween({ y: pos.y, alpha: 1 }, "easeOutCubic", 50);
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
		switch (codigo) {
			case 1: this.spr = "sprP3_bien"; break;
			case 2: this.spr = "sprP3_splat"; break;
			case 3: this.spr = "sprP3_kapaw"; break;
			default: this.spr = "sprP3_crunch"; break;
		}
		
		var x0 = pos.x - this.w / 2;
		var y0 = pos.y - this.h;
		
		this.addComponent(this.spr)
			.attr({ x: x0, y: y0, z: 30 })
			.addTween({ y: y0 - 50 }, "easeOutElastic", 30, function() {
				this.addTween({ alpha: 0 }, "linear", 20, function() {
					this.destroy();
				});
			});
			
		return this;
	}
});