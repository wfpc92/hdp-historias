/**
 * Actividad 1 Morro
 * Dato: Es una montaña artificial prehispánica -al parecer data del año 1600 - 600 a.C.- de carácter ceremonial funerario, ubicada en el costado noreste de Popayán, considerado el sitio arqueológico más importante de la ciudad.
 * Interacción: Construir el morro mediante toque rápido
 */
function ActMorro1() {
	this.aciertosObjetivo = 0;
	this.temporizadorActividad = 0;
	this.toque = null;
	this.arrCapas = new Array(21);
	this.particulas = null;

	this.e_morroVerde = null;
	this.e_obrero = null;
	
	this.coordsX = [[164,1280],[0,1280],[0,1280],[0,1257],[0,1195],[0,1217],[0,1167],[0,1129],[0,996],[0,949],[0,930],[0,882],[0,840],[0,795],[0,753],[0,708],[18,642],[39,590],[125,506],[182,454],[239,383]]; // Coordenadas xIni y xFin de las capas en pantalla

	this.init = function() {
		Crafty.e("2D, Canvas, Image").image("img/act/morro/1/fondo.jpg");

		// Inicializamos las capas de la construcción
		var yMostrar = [743, 660, 632, 608, 613, 582, 556, 490, 475, 457, 438, 421, 406, 385, 365, 349, 308, 279, 265, 250, 248];
		var yOcultar = [0, 744, 710, 659, 674, 646, 623, 577, 546, 554, 510, 483, 450, 449, 446, 424, 378, 338, 320, 315, 287];
		for (i = 0; i < 21; i++) {
			this.arrCapas[i] = Crafty.e("M1Capa").M1Capa("sprM1_capa", i + 1, yMostrar[i] + 4, yOcultar[i]).attr({z: 50 - i});
		}

		this.toque = new ToqueRapido();
		this.toque.incremento = ((debug) ? 4 : 4);
		this.toque
				.init(this)
				.callbackCambio(this.cambioVal)
				.callbackMaximo(this.ganarActividad);
		this.toque.val = 10;
		this.toque.vMin = 10;
		
		// Inicialmente mostramos las primeras capas
		for (i = 0; i < 3; i++) {
			this.arrCapas[i].visible = true;
			this.arrCapas[i].estado = 2;
			this.arrCapas[i].y = yMostrar[i];
		}

		// morro verde
		this.e_morroVerde = Crafty.e("2D, Canvas, Image, Tween")
				.image("img/act/morro/1/morro-verde.png")
				.attr({ z: 200, alpha: 0.0, visible: false });

		// obrero
		this.e_obrero = Crafty.e("2D, Canvas, Image, Delay, Tween")
				.image("img/act/morro/1/obrero.png")
				.attr({x: 310, y: 265, z: 199, visible: false });
		
		this.particulas = new Particulas({
			componentes: "spr_polvo, SpriteAnimation",
			x: 480, y: 440, z: 600,
			vx: 0,
			deltaVx: 2,
			periodo: 90,
			deltaOriY: 10, deltaOriX: 430,
			numParticulas: 3,
			magnitud: 10,
			duracion: 33,
			atenuacion: 12,
			f_crear: function(ent) {
				ent.reel("giro", 400, [[0, 0], [32, 0], [64, 0], [96, 0]]).animate("giro", -1);
			}
		});
		
		Crafty.e("Gesto")
				.Gesto(1, { coords: [600, 300], duracion: 200, retardo: 40 });
		
		return this;
	};

	// función a ejecutar cuando cambia el valor del ToqueRapido
	// su ámbito es el objeto ToqueRapido (referirse a este objeto con this._padre)
	this.cambioVal = function cambioVal() {
		var val = this.val;
		var numCapa = Math.floor(val / 5);
		this._padre.mostrarCapa(numCapa);
	};

	this.mostrarCapa = function mostrarCapa(n) {
		var i;
		if (n > 20)
			n = 20; // máximo 20

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
			
			var ultcapa = n;
			var e_ultcapa = this.arrCapas[ultcapa];
			this.particulas.y = e_ultcapa._y - 20;
			this.particulas.x = this.coordsX[ultcapa][0];
			this.particulas.deltaOriX = this.coordsX[ultcapa][1];
			this.particulas.deltaOriY = e_ultcapa._h / 2;
			this.particulas.iniciar();
		}
	};


	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		return this;
	};

	// Sólo invocada al ganar la actividad
	this.ganarActividad = function ganarActividad() {
		gesActividad.temporizador.parar();
		
		var self = this._padre;
		this._padre.e_morroVerde.visible = true;
		this._padre.e_morroVerde.tween({alpha: 1.0}, 1000);

		this._padre.e_obrero.delay(function() {
			this.visible = true;
			this.tween({y: 117}, 150);
		}, 1000);
		
		Crafty.e("Delay").delay(function() {
			gesActividad.mostrarPuntaje();
			self.terminarActividad();
		}, 1500);
		return this;
	};
}
;