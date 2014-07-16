/**
 * Actividad Puente Humilladero 1:
 * Tocar la pantalla para construir el puente, la actividad finaliza cuando 
 * se ha construido todo el puente, los personajes salen caminando, sobre el puente.
 */
function ActPuente1() {
	this.aciertosObjetivo = 0;
	this.temporizadorActividad = 0;
	this.toque = null;
	this.arrCapas = [];
	this.particulas = null;

	this.e_morroVerde = null;
	this.e_obrero = null;

	this.coordsX = [
		[-136, 1280], [-136, 1280], [-136, 1280], [-136, 1257], [-136, 1195],
		[-136, 1217], [-136, 1167], [-136, 1129], [-136, 996], [-136, 949],
		[-136, 930], [-136, 882], [-136, 840], [-136, 795], [-136, 753],
		[-136, 708], [-136, 642],
	]; // Coordenadas xIni y xFin de las capas en pantalla

	this.init = function() {
		Crafty.e("2D, Canvas, Image").image("img/act/puente/1/fondo.jpg");
		var pri_plano = Crafty.e("2D, Canvas, Image").image("img/act/puente/1/primer_plano.png");
		pri_plano.attr({x: 0, y: 800 - pri_plano.h, z: 100});

		// Inicializamos las capas de la construcción
		var yMostrar = [680, 659, 638, 624, 611, 594, 580, 567, 540, 525, 496, 471, 441, 423, 393, 376, 320];

		//se reutliza la misma sprite pero con posiciones diferentes.
		var consSpritesXW = [{x: 0, w: 419}, {x: 419, w: 278}, {x: 697, w: 280}, {x: 976, w: 278}, {x: 1254, w: 297}];
		//valores constantes por sprite
		var consSpritesYH = [{y: 921, h: 33}, {y: 864, h: 55}, {y: 808, h: 54}, {y: 756, h: 48}, {y: 719, h: 34}, {y: 679, h: 38}, {y: 612, h: 65}, {y: 565, h: 45}, {y: 512, h: 51}, {y: 459, h: 51}, {y: 396, h: 61}, {y: 329, h: 65}, {y: 265, h: 62}, {y: 206, h: 57}, {y: 137, h: 67}, {y: 81, h: 55}, {y: 0, h: 79}
		];
		var nArcos = 5;
		var nSprites = 17;
		var contArrCapas = 0;
		for (var arcos = 0; arcos < nArcos; arcos++) {
			for (var i = 0; i < nSprites; i++) {
				var posx = consSpritesXW[arcos].x - 136, sprx = consSpritesXW[arcos].x, spry = consSpritesYH[i].y, sprw = consSpritesXW[arcos].w, sprh = consSpritesYH[i].h;

				this.arrCapas[contArrCapas] = Crafty.e("M1Capa, Sprite")
						.M1Capa("sprH1_puente", i, yMostrar[i], yMostrar[i] + 50)
						.attr({x: posx, z: 50 - i});
				this.arrCapas[contArrCapas].sprite(sprx, spry, sprw, sprh).attr({w: sprw, h: sprh})
				contArrCapas += 1;
			}
		}

		this.toque = new ToqueRapido();
		this.toque.incremento = ((debug) ? 20 : 4);
		this.toque
				.init(this)
				.callbackCambio(this.cambioVal)
				.callbackMaximo(this.ganarActividad);
		this.toque.val = 10;
		this.toque.vMin = 10;
		this.toque.vMax = 420;

		//Inicialmente mostramos las primeras capas
		for (i = 0; i < 2; i++) {
			this.arrCapas[i].visible = true;
			this.arrCapas[i].estado = 2;
			this.arrCapas[i].y = yMostrar[i];
		}

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
				.Gesto(1, {coords: [600, 300], duracion: 200, retardo: 40});
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
		if (n > this.arrCapas.length - 1)
			n = this.arrCapas.length - 1; // máximo 20

		if (this.arrCapas[n].estado === 2) {
			// capa ya visible; asegurarnos de que las capas de arriba se oculten
			for (i = this.arrCapas.length - 1; i > n; i--) {
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

			/*
			 var ultcapa = n;
			 var e_ultcapa = this.arrCapas[ultcapa];
			 this.particulas.y = e_ultcapa._y - 20;
			 this.particulas.x = this.coordsX[ultcapa][0];
			 this.particulas.deltaOriX = this.coordsX[ultcapa][1];
			 this.particulas.deltaOriY = e_ultcapa._h / 2;
			 this.particulas.iniciar();*/
		}
	};


	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		return this;
	};

	// Sólo invocada al ganar la actividad
	this.ganarActividad = function ganarActividad() {
		gesActividad.temporizador.parar();

		for (var i = 0; i < 23; i++) {
			var y0 = Crafty.math.randomInt(313, 333);
			var newy = Crafty.math.randomInt(278, 295);
			var newt = Crafty.math.randomInt(250, 650);

			Crafty.e("H1_Personaje, sprH1_personajeAdulto")
					.sprite(i, 0)
					.attr({x: -63, y: y0})
					.caminar({x: 1280, y: newy, t: newt})
		}
		var f = i + 4;
		for (var j = i; j < f; j++) {
			//Crafty.e("2D, Canvas, Sprite, sprH1_personajeNino").sprite(23, 0);
		}
		var self = this;
		Crafty.e("Delay").delay(function() {
			//gesActividad.mostrarPuntaje();
		}, 1500);
		return this;
	};
}
;


