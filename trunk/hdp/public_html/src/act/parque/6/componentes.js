// Hueco donde se inserta el bloque
Crafty.c("P6Hueco", {
	num: 0, // ID del bloque corespondiente
	_padre: null, // Referencia al objeto creador

	init: function() {
		this.requires("2D, Canvas, Tweener");
		return this;
	},
	P6Hueco: function(objPadre, num) {
		this._padre = objPadre;
		this.num = num;
		
		switch (num) {
			case 0: this.spr = "sprP6_parteCupula"; break;
			case 1: this.spr = "sprP6_parteTecho"; break;
			case 2: this.spr = "sprP6_parteBase1"; break;
			case 3: this.spr = "sprP6_parteBase2"; break;
			case 4: this.spr = "sprP6_parteColAncha"; break;
			case 5: this.spr = "sprP6_parteColAncha"; break;
			case 6: this.spr = "sprP6_parteCol"; break;
			case 7: this.spr = "sprP6_parteCol"; break;
			case 8: this.spr = "sprP6_parteCol"; break;
			case 9: this.spr = "sprP6_parteCol"; break;
		}
		this.addComponent(this.spr + "H");
		this.alpha = 0;
		return this;
	},
	
	mostrar: function() {
		this.visible = true;
		this.addTween({ alpha: 1 }, "linear", 10);
		return this;
	},
	
	ocultar: function() {
		this.addTween({ alpha: 0 }, "linear", 10, function() { this.visible = true; });
		return this;
	}
});

Crafty.c("P6Parte", {
	num: 0, // ID del bloque
	spr: "",
	b2shape: null, // Arreglo de posiciones [x,y] relativas a la entidad. Describe el polígono de colisión
	callbackDestroy: null, // Función de callback al destruir este objeto
	_padre: null, // Referencia al objeto creador
	e_hueco: null, // Referencia a la entidad hueco correspondiente (si aplica)
	destX1: 0, // posiciones que definien el MBR del hueco correspondiente
	destX2: 0,
	destY1: 0,
	destY2: 0,
	insertable: true, // false si es una trampa
	validarUbicacion: false, // true si se debe validar si está bien colocado
	colocada: false, // true si está bien colocada
	e_advertencia: null, // entidad de advertencia de esta parte
	
	init: function() {
		this.requires("B2arrastre, Tweener");
		this.arrastrable = true;
		this.e_advertencia = Crafty.e("Advertencia");

		return this;
	},
	
	P6Parte: function(objPadre, num, b2shape) {
		this._padre = objPadre;
		this.num = num;
		this._b2shape = b2shape;
		
		switch (num) {
			case 0: this.spr = "sprP6_parteCupula"; break;
			case 1: this.spr = "sprP6_parteTecho"; break;
			case 2: this.spr = "sprP6_parteBase1"; break;
			case 3: this.spr = "sprP6_parteBase2"; break;
			case 4: this.spr = "sprP6_parteColAncha"; break;
			case 5: this.spr = "sprP6_parteColAncha"; break;
			case 6: this.spr = "sprP6_parteCol"; break;
			case 7: this.spr = "sprP6_parteCol"; break;
			case 8: this.spr = "sprP6_parteCol"; break;
			case 9: this.spr = "sprP6_parteCol"; break;
		}
		
		this.addComponent(this.spr + "N");
		
		this.b2shape = b2shape;
		this.initAreamap();
		
		return this;
	},
	
	
	initAreamap: function() {
		switch (this.num) {
			case 0: this.areaMap([85,20],[163,150],[163,240],[8,240],[8,150]); break;
			case 2: this.areaMap([19,1],[341,1],[341,46],[19,46],[0,20]); break;
			case 3: this.areaMap([2,1],[326,1],[342,22],[322,45],[2,45]); break;
			case 4: this.areaMap([0,0],[59,0],[59,252],[0,252]); break;
			case 5: this.areaMap([0,0],[59,0],[59,252],[0,252]); break;
			case 6: this.areaMap([0,0],[30,0],[30,252],[0,252]); break;
			case 7: this.areaMap([0,0],[30,0],[30,252],[0,252]); break;
			case 8: this.areaMap([0,0],[30,0],[30,252],[0,252]); break;
			case 9: this.areaMap([0,0],[30,0],[30,252],[0,252]); break;
		}
		
		return this;
	},
	
	// Inicializar eventos de esta entidad (incluída verificación de ubicación)
	initEventos: function() {
		this.bind("EnterFrame", function(e) {
			// Revisamos si está dormido y colocado correctamente
			if (!this.validarUbicacion && this.body.IsAwake()) {
				this.removeComponent(this.spr + "N").addComponent(this.spr);
				if (this.e_hueco) {
					this.e_hueco.mostrar();
					this.e_hueco = null;
				} 
				this.validarUbicacion = true;
			}
			else if (!this.body.IsAwake()) {
				// Si está dormido y se programó validación de ubicación
				if (this.validarUbicacion) {
					if (this.bienColocada()) {
						this.colocada = true;
						this.mostrarAvisoBien();
						this.removeComponent(this.spr).addComponent(this.spr + "N");
						var posX = this.mbr()._x;
						
						// Qué pieza se colocó?
						var numHueco;
						if (this.num === 0 || this.num === 1) {
							numHueco = this.num;
						}
						else if (this.num === 2 || this.num === 3) {
							numHueco = ((posX < 600) ? 2 : 3);
						}
						else if (this.num === 4 || this.num === 5) {
							numHueco = ((posX < 600) ? 4 : 5);
						}
						else {
							if (posX < 430) numHueco = 6;
							else if (posX < 530) numHueco = 7;
							else if (posX < 850) numHueco = 8;
							else numHueco = 9;
						}
						
						console.log("colocada pieza " + this.num + " en el hueco aprox " + numHueco)
						this._padre.piezaColocada(this.num, numHueco);
					}
					this.validarUbicacion = false;
				}
			}
		});
		
		this.bind("MouseUp", function(e) {
			this.validarUbicacion = true;
		});
		
		return this;
	},
	
	// Agregar propiedades físicas y de arrastre
	initFisica: function() {
		if (this.b2shape.length > 0) {
			this.box2d({
				bodyType: 'dynamic',
				density: 0.01,
				friction: 0.5,
				restitution: 0.2,
				shape: this.b2shape
			});
		}
		this.body.SetAngularDamping(4);
		if (!this.b2a) {
			this.B2arrastre(this._padre.b2a);
		}
		return this;
	},
	
	// Mostrar la advertencia de que se ha colocado correctamente
	mostrarAvisoBien: function() {
		var mbr = this.mbr();
		this.e_advertencia.x = mbr._x + mbr._w;
		this.e_advertencia.y = mbr._y - 70;
		this.e_advertencia.mostrar(0, 30);
		return this;
	},
	
	// Fijar el bloque en su lugar y no permitir que lo vuelvan a manipular
	fijar: function() {
		this.z -= 1; // Detrás de las otras piezas
		this._e_hueco.visible = false;

		var par = new Particulas({
			componentes: "spr_polvo, SpriteAnimation",
			x: this._x, y: this._y, z: 5,
			vx: 0,
			deltaVx: 2,
			periodo: 50,
			deltaOriY: this._h,
			deltaOriX: this._w - 40,
			numParticulas: 6,
			magnitud: 10,
			duracion: 20,
			atenuacion: 8,
			f_crear: function(ent) {
				ent.reel("giro", 400, [[0, 0], [32, 0], [64, 0], [96, 0]]).animate("giro", -1);
			}
		});
		par.iniciar();
		this._padre.bloqueFijado(); // Notificar al padre
	},
	
	// Oculta la pieza y destruye su cuerpo box2d
	ocultar: function() {
		this.addTween({ alpha: 0 }, "linear", 5, function() { this.visible = false; world.DestroyBody(this.body); });
		return this;
	},
	
	// Muestra la pieza y construye su cuerpo box2d
	aparecer: function(posIni) {
		this.rotation = 0;
		if (posIni) {
			this.x = posIni.x;
			this.y = posIni.y;
			this.rotation = posIni.rotation;
		}
		else {
			this.x = 0;
			this.y = 0;
		}
		
		this.visible = true;
		this.initFisica();
		this.addTween({ alpha: 1 }, "linear", 5, function() {
			
		});
		
		return this;
	},
	
	// TRUE si la pieza se encuentra dentro de su región de tolerancia
	bienColocada: function() {
		var mbr = this.mbr();
		var x1 = mbr._x;
		var y1 = mbr._y;
		
		var rot = Math.floor(this._rotation);
		while (rot < 0) rot += 360;
		console.log(rot)
		
		if (this.num === 6 || this.num === 7 || this.num === 8 || this.num === 9) {
			if (y1 < 420) return false;
			if (x1 < 330 || (x1 > 509 && x1 < 755) || x1 > 920) return false;
			if ((rot < 359 && rot > 181) || (rot < 179 && rot > 1)) return false;
		}
		else if (this.num === 4 || this.num === 5) {
			if (y1 < 420) return false;
			if (x1 < 500 || (x1 > 556 && x1 < 677) || x1 > 725) return false;
			if ((rot < 359 && rot > 181) || (rot < 179 && rot > 1)) return false;
		}
		else if (this.num === 2 || this.num === 3) {
			if (y1 < 375 || y1 > 400) return false;
			if (x1 < 275 || x1 > 670) return false;
			if ((rot < 359 && rot > 181) || (rot < 179 && rot > 1)) return false;
		}
		else if (this.num === 1) {
			if (y1 < 208 || y1 > 240) return false;
			if (x1 < 409 || x1 > 470) return false;
			if ((rot < 359 && rot > 181) || (rot < 179 && rot > 1)) return false;
		}
		else if (this.num === 0) {
			if (y1 > 40) return false;
			if (x1 < 540 || x1 > 580) return false;
			if ((rot < 359 && rot > 181) || (rot < 179 && rot > 1)) return false;
		}
		
		return true;
	}
});