// Hueco donde se inserta el bloque
Crafty.c("P6Hueco", {
	num: 0, // ID del bloque corespondiente
	_padre: null, // Referencia al objeto creador

	init: function() {
		this.requires("2D, Canvas");
		return this;
	},
	P6Hueco: function(objPadre, num, spr) {
		this._padre = objPadre;
		this.num = num;
		this.requires(spr);//asignarle la sprite al componente
		return this;
	}
});

Crafty.c("P6Parte", {
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
							Crafty("P6Parte").each(function() {
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
					});
				}
			}
		});

		return this;
	},
	P6Parte: function(objPadre, e_hueco, num, b2shape, spr, bloqobli) {
		this._padre = objPadre;
		this.num = num;
		this.requires(spr);
		this._e_hueco = e_hueco;
		this._b2shape = b2shape;
		this._bloqObliga = bloqobli;

		switch (num) {
			case 0:
				this.areaMap([84, 0], [146, 113], [175, 193], [168, 257], [1, 258], [0, 190], [30, 114]);
				break;
			case 1:
				this.areaMap([200, 0], [374, 30], [401, 64], [404, 166], [0, 167], [0, 67], [24, 35]);
				break;
			case 2:
				this.areaMap([19, 0], [343, 0], [342, 44], [19, 49], [0, 20]);
				break;
			case 3:
				this.areaMap([2, 0], [326, 0], [343, 22], [324, 46], [0, 45]);
				break;
			case 4:
			case 5:
			case 8:
			case 9:
				this.areaMap([0, 0], [34, 0], [34, 258], [0, 258]);
				break;
			case 6:
			case 7:
				this.areaMap([0, 0], [60, 0], [60, 258], [0, 258]);
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
	}
});