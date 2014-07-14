Crafty.c("P4Barras", {
	e_barras: [],
	vx: 1,
	/**
	 * Generar las barras
	 * @param {type} spr correponde a la sprite
	 * @param {type} n numero de barras
	 * @param {type} x0 posicion inicial de movimiento en el eje x
	 * @param {type} y0 posicion inicial de moviemintoe en el eje y
	 * @param {type} vx velocidad de desplazamiento de las barras sobre el eje x
	 * @param {type} desp distancia entre las barras
	 * @param {type} dir direccion de movimiento (izquierda o derecha)
	 * @returns {Anonym$0}
	 */
	P4Barras: function(spr, n, x0, y0, vx, desp, dir) {
		this.spr = spr;
		this.n = n;
		this.x0 = x0;
		this.y0 = y0;
		this.vx = vx;
		this.desp = desp;
		this.dir = dir;

		for (var i = 0; i < n; i++) {
			this.e_barras[i] = Crafty.e("P4Barra, Box2D, " + this.spr);
			this.e_barras[i].attr({x: this.x0 + i * (this.e_barras[i].w + this.desp), y: this.y0})
					.P4Barra(this.vx, this.dir)
					.box2d({
						bodyType: 'kinestatic',
						shape: this.dir == 0 ? [[0, 0], [442, 0], [442, 24], [0, 24]]
								: [[0, 0], [this.e_barras[i].w, 0], [this.e_barras[i].w, 24], [0, 24]]
					});
		}
		return this;
	}
});

Crafty.c("P4Barra", {
	dir: "",
	vx: 0,
	init: function() {
		this.requires("2D, Canvas");
	},
	P4Barra: function(vx, dir) {
		this.vx = vx;
		this.dir = dir;
                if(this.dir != 0){
                    this.requires("BarraColision");
                }
		return this;
	},
	arrancar: function() {
		this.body.SetLinearVelocity(new b2Vec2(this.dir * this.vx, 0))
		this.bind("EnterFrame", function() {
			if (this.x + this.w < 0) {
				this.body.SetPosition(new b2Vec2(1280 / 32, this.y / 32));
			}
			if (this.x > 1280) {
				this.body.SetPosition(new b2Vec2(-this.w / 32, this.y / 32));
			}
		});
		return this;
	}
});

// Parte de Monumento de PArque Caldas arrastrable con soporte de física
Crafty.c("P4Cofre", {
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
		this.requires("B2arrastre, Tweener, sprP4_cofre");
		this.arrastrable = true;
		this.bind("MouseUp", function(e) {
			var self = this;
			if (this.insertable) {
				var pos = mouseCoords(e);
				// obtenemos las coordenadas de destino
				var band = false;
				var self = this;
				Crafty("P4Hueco").each(function() {
					var destX1 = this._x;
					var destY1 = this._y;
					var destX2 = destX1 + this._w;
					var destY2 = destY1 + this._h;
					if (pos.x > destX1 && pos.x < destX2 && pos.y > destY1 && pos.y < destY2) {
						band = true;
						self.destX1 = destX1;
						self.destY1 = destY1;
						this.destroy();
					}
				});
				if (band) {
					this.enchoclar();
				}
			}
		}).bind("EnterFrame", function() {
                    //verificar el caso en que se haya salido del cuadro (escena(
                    //entonces se trae hacia el centro para que se pueda arrastrar ed nuevo.
                    if(this.y < -50 || this.y > 850 || this.x < -50 || this.x > 1320){
                        this.body.SetPosition(new b2Vec2(632/32.0, 594/32.0));
                    } 
                })
		return this;
	},
	P4Cofre: function(objPadre, b2shape) {
		this._padre = objPadre;
		this._b2shape = b2shape;
		this.areaMap([0, 0], [0, this.h], [this.w, this.h], [this.w, 0]);
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
		return this;
	},
        enchoclar : function(){
            this.arrastrable = false;
            this.unbind("MouseUp");
            this.unbind("MouseDown");
            this.unbind("MouseMove");

            world.DestroyBody(this.body);
            this.body = null;
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
        },
	// Fijar el bloque en su lugar y no permitir que lo vuelvan a manipular
	fijar: function() {
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
		return this;
	}
});



// Hueco donde se inserta el ataud
Crafty.c("P4Hueco", {
	num: 0, // ID del bloque corespondiente
	_padre: null, // Referencia al objeto creador

	init: function() {
		this.requires("2D, Canvas");
		return this;
	},
	P4Hueco: function(objPadre) {
		this._padre = objPadre;
		//this.num = num;
		//this.requires(spr);//asignarle la sprite al componente
		return this;
	}
});