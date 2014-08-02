/**
 * Actividad 1 Morro
 * Dato: Es una montaña artificial prehispánica -al parecer data del año 1600 - 600 a.C.- de carácter ceremonial funerario, ubicada en el costado noreste de Popayán, considerado el sitio arqueológico más importante de la ciudad.
 * Interacción: Construir el morro mediante toque rápido
 */
Crafty.c("ImageCanvas", {
	url: "",
	alto: 0,
	ancho: 0,
	
	init: function() {
		this.requires("2D, Canvas");
	},
	
	_dibujar: function(e) {
		var ctx = e.ctx;
		ctx.drawImage(Crafty.assets[this.url], this._x, this._y, this.ancho, this.alto);
	},
	
	image: function(url, ancho, alto) {
		this.url = url;
		this.ancho = ancho;
		this.alto = alto;
		this.attr({ w: ancho, h: alto });
		
		this.bind("Draw", this._dibujar);
		this.ready = true;
		
		return this;
	}
});

function ActMorro1() {
	this.aciertosObjetivo = 0;
	this.temporizadorActividad = 0;
	this.toque = null;
	this.arrCapas = new Array(21);
	this.particulas = null;
	this.numCapaActual = 0; // Número de la capa superior actualmente visible

	this.e_morroVerde = null;
	this.e_obrero = null;
	
	this.coordsX = [[164,1280],[0,1280],[0,1280],[0,1257],[0,1195],[0,1217],[0,1167],[0,1129],[0,996],[0,949],[0,930],[0,882],[0,840],[0,795],[0,753],[0,708],[18,642],[39,590],[125,506],[182,454],[239,383]]; // Coordenadas xIni y xFin de las capas en pantalla

	this.init = function() {
		//Crafty.e("2D, Canvas, Image").image("img/act/morro/1/fondoback.jpg");
		Crafty.e("ImageCanvas").image("img/act/morro/1/fondo.jpg", 1280, 800);
		
		// Inicializamos las capas de la construcción
		var yMostrar = [743, 660, 632, 608, 613, 582, 556, 490, 475, 457, 438, 421, 406, 385, 365, 351, 309, 279, 265, 251, 248];
		var yOcultar = [0, 744, 710, 659, 674, 646, 623, 577, 546, 554, 510, 483, 450, 449, 446, 424, 378, 338, 320, 315, 287];
		var xCapa = [163,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,25,121,176,237];
		for (i = 0; i < 21; i++) {
			this.arrCapas[i] = Crafty.e("M1Capa")
									.M1Capa("sprM1_capa", i + 1, yMostrar[i] + 4, yOcultar[i]).attr({ x: xCapa[i], z: 50 - i });
		}

		var self = this;
		this.toque = new ToqueRapido();
		this.toque.incremento = 6;
		this.toque.vRestar = 1;
		this.toque.numFrames = 5;
		this.toque
				.init(this)
				.callbackCambio(this.cambioVal)
				.callbackMaximo(function() { self.ganarActividad(); });
		this.toque.val = 10;
		this.toque.vMin = 10;
		
		// Inicialmente mostramos las primeras capas
		for (i = 0; i < 3; i++) {
			this.arrCapas[i].visible = true;
			this.arrCapas[i].estado = 2;
			this.arrCapas[i].y = yMostrar[i];
		}

		// morro verde
		this.e_morroVerde = Crafty.e("ImageCanvas, Tweener")
				.image("img/act/morro/1/morro-verde.png", 1280, 638)
				.attr({ y: 162, z: 200, alpha: 0.0, visible: false });

		// obrero
		this.e_obrero = Crafty.e("2D, Canvas, Image, Delay, Tweener")
				.image("img/act/morro/1/obrero.png")
				.attr({x: 310, y: 265, z: 199, visible: false });
		
		this.particulas = new Particulas({
			componentes: "spr_polvo, SpriteAnimation",
			x: 480, y: 440, z: 600,
			vx: 0,
			deltaVx: 2,
			periodo: 90,
			deltaOriY: 10, deltaOriX: 430,
			numParticulas: 1,
			magnitud: 10,
			duracion: 33,
			atenuacion: 12,
			f_crear: function(ent) {
				ent.reel("giro", 400, [[0, 0], [32, 0], [64, 0], [96, 0]]).animate("giro", -1);
			}
		});
		
		Crafty.e("Gesto")
				.Gesto(1, { coords: [600, 350], duracion: 150, retardo: 40 });
		
		return this;
	};

	// función a ejecutar cuando cambia el valor del ToqueRapido
	// su ámbito es el objeto ToqueRapido (referirse a este objeto con this._padre)
	this.cambioVal = function cambioVal() {
		var val = this.val;
		var numCapa = Math.floor(val / 5);
		if (numCapa > 20) numCapa = 20; // Evitar error JS por seleccionar capas no existentes
		
		this._padre.mostrarCapa(numCapa);
		this._padre.numCapaActual = numCapa;
		
		// mostramos particulas de polvo
		var self = this._padre;
		var ultcapa = self.numCapaActual;
		var e_ultcapa = self.arrCapas[ultcapa];
		self.particulas.y = e_ultcapa._y - 20;
		self.particulas.x = self.coordsX[ultcapa][0];
		self.particulas.deltaOriX = self.coordsX[ultcapa][1];
		self.particulas.deltaOriY = e_ultcapa._h / 2;
		self.particulas.iniciar();
	};

	this.mostrarCapa = function mostrarCapa(n) {
		var i;
		if (n > 20)
			n = 20; // máximo 20
		
		this.numCapaActual = n;
		
		if (this.arrCapas[n].estado === 2) {
			// capa ya visible; asegurarnos de que las capas de arriba se oculten
			for (i = 20; i > n; i--) {
				if (this.arrCapas[i].estado > 0) {
					this.arrCapas[i].ocultar();
				}
			}
		}
		else if (this.arrCapas[n].estado < 0) {
			// capa descendiendo o invisible; mostrar esta y las de abajo
			for (i = 1; i <= n; i++) {
				if (this.arrCapas[i].estado < 0) {
					this.arrCapas[i].mostrar();
				}
			}
		}
	};


	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		return this;
	};

	// Sólo invocada al ganar la actividad
	this.ganarActividad = function ganarActividad() {
		gesActividad.temporizador.parar();
		
		var self = this;
		var e_verde = this.e_morroVerde;
		var e_obrero = this.e_obrero;
		var capas = this.arrCapas;
		var i;
		
		e_verde.visible = true;
		e_verde.addTween({ alpha: 1.0 }, "linear", 50, function() {
			// desaparecemos las capas para ahorrar memoria
			for (i = 0 ; i < 21 ; i++) capas[i].destroy();
			
			e_obrero.visible = true;
			e_obrero.addTween({ y: 117 }, "linear", 10, function() {
				Crafty.e("DelayFrame").delay(function() {
					gesActividad.mostrarPuntaje();
					self.terminarActividad();
				}, 30);
			});
		});
	};
}
;