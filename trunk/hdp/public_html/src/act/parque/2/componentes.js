/**
 * Componentes de Parque - Actividad 2
 */

// Parte de Monumento de PArque Caldas arrastrable con soporte de física
Crafty.c("P2Bloque", {
	num: 0, // ID del bloque
	b2shape: null, // Arreglo de posiciones [x,y] relativas a la entidad. Describe el polígono de colisión
	callbackDestroy: null, // Función de callback al destruir este objeto
	_padre: null, // Referencia al objeto creador
	_e_hueco: null, // Referencia a la entidad hueco correspondiente (si aplica)
	destX1: 0, // posiciones que definien el MBR del hueco correspondiente
	destX2: 0,
	destY1: 0,
	destY2: 0,
	insertable: true, // false si es una trampa

	init: function() {
		this.requires("B2arrastre, Tweener");
		this.arrastrable = true;


		this.bind("MouseUp", function(e) {
			var self = this;
			if (this.insertable) {
				var pos = mouseCoords(e);
				if (pos.x > this.destX1 && pos.x < this.destX2 && pos.y > this.destY1 && pos.y < this.destY2) {
					if (self._bloqObliga != null) {
						var pasa = true;
						//verificar por cada uno de los bloques que son obligatorios de que esten colocados
						//para poder ubicarlo en su posicion correcta
						for (var i = 0; i < self._bloqObliga.length; i++) {
							Crafty("P2Bloque").each(function() {
								if (this.num == self._bloqObliga[i]) {
									if (this.arrastrable) {
										pasa = false;
									}
								}
							});
						}
						if (!pasa) {
							return;
						}
					}

					this.arrastrable = false;
					this.unbind("MouseUp");
					this.unbind("MouseDown");
					this.unbind("MouseMove");

					world.DestroyBody(this.body);

					var grados = this.rotation;
					while (grados < 0) {
						grados += 360;
					}
					while (grados >= 360) {
						grados -= 360;
					}
					this.rotation = grados;

					this.addTween({
						rotation: (grados > 180) ? 360 : 0,
						x: this.destX1,
						y: this.destY1
					}, 'easeInOutQuad', 25, function() {
						this.fijar();
						this.ponerSombra();
					});
				}
			}
		});

		return this;
	},
	P2Bloque: function(objPadre, e_hueco, num, b2shape, spr, bloqobli) {
		this._padre = objPadre;
		this.num = num;
		this.requires(spr);
		this._e_hueco = e_hueco;
		this._b2shape = b2shape;
		this._bloqObliga = bloqobli;

		switch (num) {
			case 0:
				this.areaMap([24, 0], [126, 0], [126, 170], [0, 170]);
				break;
			case 1:
				this.areaMap([0, 0], [103, 0], [126, 170], [0, 170]);
				break;
			case 2:
				this.areaMap([32, 0], [56, 0], [84, 76], [0, 76]);
				break;
			case 3:
				this.areaMap([0, 0], [77, 1], [54, 77], [23, 76]);
				break;
			case 4:
				this.areaMap([23, 0], [46, 0], [76, 74], [0, 77]);
				break;
			case 5:
				this.areaMap([22, 0], [46, 0], [59, 53], [2, 53]);
				break;
			case 6:
				this.areaMap([11, 0], [69, 0], [118, 56], [104, 83], [69, 94], [0, 93]);
				break;
			case 7:
				this.areaMap([10, 0], [80, 0], [101, 93], [2, 93]);
				break;
		}

		if (b2shape.length > 0) {
			this.b2shape = b2shape;
			this.box2d({
				bodyType: 'dynamic',
				density: 500, //0.000001,
				friction: 0.5,
				restitution: 0.2,
				shape: this.b2shape
			});
		}
		this.body.SetAngularDamping(3);

		this.B2arrastre(this._padre.b2a);

		// obtenemos las coordenadas de destino
		this.destX1 = e_hueco._x;
		this.destY1 = e_hueco._y;
		this.destX2 = this.destX1 + e_hueco._w;
		this.destY2 = this.destY1 + e_hueco._h;
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
	//colocar segun sea el bloque la sombra correspondiente
	ponerSombra: function() {
		if (this.num == 0) {
			Crafty.e("2D, Canvas, sprP1_sombra0, Tweener")
					.attr({x: 437, y: 533, z: 1, alpha: 0})
					.addTween({alpha: 1}, 'easeInOutQuad', 15);
		}
		if (this.num == 1) {
			Crafty.e("2D, Canvas, sprP1_sombra1, Tweener")
					.attr({x: 550, y: 533, z: 1, alpha: 0})
					.addTween({alpha: 1}, 'easeInOutQuad', 15);
		}
		if (this.num == 3) {
			Crafty.e("2D, Canvas, sprP1_sombra2, Tweener")
					.attr({x: 439, y: 533, z: 1, alpha: 0})
					.addTween({alpha: 1}, 'easeInOutQuad', 15);
		}
		if (this.num == 4) {
			Crafty.e("2D, Canvas, sprP1_sombra3, Tweener")
					.attr({x: 434, y: 533, z: 1, alpha: 0})
					.addTween({alpha: 1}, 'easeInOutQuad', 15);
		}
	}
});



// Hueco donde se inserta el bloque
Crafty.c("P2Hueco", {
	num: 0, // ID del bloque corespondiente
	_padre: null, // Referencia al objeto creador

	init: function() {
		this.requires("2D, Canvas");
		return this;
	},
	P2Hueco: function(objPadre, num, spr) {
		this._padre = objPadre;
		this.num = num;
		this.requires(spr);//asignarle la sprite al componente
		return this;
	}
});




