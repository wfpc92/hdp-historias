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
		[-136, 708], [-136, 642]
	]; // Coordenadas xIni y xFin de las capas en pantalla


	this.arcos = [true, false, false, false, false]

	this.init = function() {
		Crafty.e("2D, Canvas, Image").image("img/act/puente/1/fondo.jpg");
		var pri_plano = Crafty.e("2D, Canvas, Image").image("img/act/puente/1/primer_plano.png");
		pri_plano.attr({x: 0, y: 800 - pri_plano.h, z: 100});
		for (var i = 0; i < 23; i++) {
			var y0 = Crafty.math.randomInt(313, 333);
			Crafty.e("H1_Personaje, sprH1_personajeAdulto").sprite(i, 0).attr({x: -63, y: y0});
		}

		// Inicializamos las capas de la construcción
		var yMostrar = [680, 659, 638, 624, 611, 594, 580, 567, 540, 525, 496, 471, 441, 423, 393, 376, 320];
		//por cada arco se debe de variar la posicion en 'x' y su ancho 'w'
		var consSpritesXW = [{x: 0, w: 419}, {x: 419, w: 278}, {x: 697, w: 280}, {x: 976, w: 278}, {x: 1254, w: 297}];
		//por cada sprite (17 en total), se reutilizan los valores de su posiion en 'y' y su altura 'h'.
		var consSpritesYH = [{y: 921, h: 33}, {y: 864, h: 55}, {y: 808, h: 54}, {y: 756, h: 48},
			{y: 719, h: 34}, {y: 679, h: 38}, {y: 612, h: 65}, {y: 565, h: 45}, {y: 512, h: 51},
			{y: 459, h: 51}, {y: 396, h: 61}, {y: 329, h: 65}, {y: 265, h: 62}, {y: 206, h: 57},
			{y: 137, h: 67}, {y: 81, h: 55}, {y: 0, h: 79}];
		var nArcos = 5;
		var nSprites = 17;
		var contArrCapas = 0;
		for (var arcos = 0; arcos < nArcos; arcos++) {
			for (var i = 0; i < nSprites; i++) {
				var posx = consSpritesXW[arcos].x - 136,
						sprx = consSpritesXW[arcos].x,
						spry = consSpritesYH[i].y,
						sprw = consSpritesXW[arcos].w,
						sprh = consSpritesYH[i].h;
				this.arrCapas[contArrCapas] = Crafty.e("M1Capa, Sprite")
						.M1Capa("sprH1_puente", i, yMostrar[i], yMostrar[i] + 50)
						.attr({x: posx, z: 50 - i});
				this.arrCapas[contArrCapas].sprite(sprx, spry, sprw, sprh).attr({w: sprw, h: sprh})
				contArrCapas += 1;
			}
		}

		this.toque = new ToqueRapido();
		this.toque.incremento = ((debug) ? 10 : 4);
		this.toque.init(this)
				.callbackCambio(this.cambioVal)
				.callbackMaximo(this.ganarActividad);
		this.toque.val = 10;
		this.toque.vMin = 10;
		this.toque.vMax = 440; //este valor es el maximo al completar el morro hasta el final.

		this.toque.e_area.requires("Color, Tweener").color("#bab94c");
		this.toque.e_area.attr({y: 320, w: 280, h: 400, alpha: 0.1});
		this.toque.e_area.attrAreaToque = [0, 280, 280 * 2, 280 * 3, 280 * 4];
		
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
		Crafty.e("Gesto").Gesto(1, {coords: [200, 450], duracion: 200, retardo: 40});
		//para que los personajes se puedan mover se disponen de estas variables
		var bAvanz = 4;
		//por cada arco se establece una capa limite para hacer avanzar los personajes
		//17 es el numero de capas por arco, bAvanz se coloca para que haya tiempo de que los personajes avancen y retrocedan
		this.arrPuntosAvance = [0, 17 + bAvanz, 17 * 2 + bAvanz, 17 * 3 + bAvanz, 17 * 4 + bAvanz, 17 * 5];
		//posiciones limites de los personajes sobre el arco del puente.
		this.attrPersonajes = [
			//por cada arco hay unos attr de ubicacion de los personajes
			{xmin: -63, xmax: -63, ymin: 319, ymax: 327}, //para la parte inferior izquierda
			{xmin: 0, xmax: 279 - 39, ymin: 319, ymax: 327}, //arco 1
			{xmin: 287, xmax: 557 - 39, ymin: 307, ymax: 312}, //arco2
			{xmin: 568, xmax: 835 - 39, ymin: 299, ymax: 309}, //arco3
			{xmin: 846, xmax: 1112 - 39, ymin: 291, ymax: 301}//arco4
		];
		return this;
	};
	//función a ejecutar cuando cambia el valor del ToqueRapido
	//su ámbito es el objeto ToqueRapido (referirse a este objeto con this._padre)
	this.cambioVal = function cambioVal() {
		var val = this.val;
		var numCapa = Math.floor(val / 5);
		this._padre.mostrarCapa(numCapa);
	};
	this.mostrarCapa = function mostrarCapa(n) {
		var i, mostrandose = true;
		if (n > this.arrCapas.length - 1)
			n = this.arrCapas.length - 1; // máximo 17*5-1

		if (this.arrCapas[n].estado === 2) {
			// capa ya visible; asegurarnos de que las capas de arriba se oculten
			for (i = this.arrCapas.length - 1; i > n; i--) {
				if (this.arrCapas[i].estado > 0) {
					this.arrCapas[i].ocultar();
				}
			}
			mostrandose = false;
		}
		else if (this.arrCapas[n].estado < 0) {
			// capa descendiendo o invisible; mostrar esta y las de abajo
			for (i = 1; i <= n; i++) {
				if (this.arrCapas[i].estado < 0) {
					this.arrCapas[i].mostrar();
				}
			}
			mostrandose = true; // la capa se esta ocultado.

			var ultcapa = n;
			var arr = this.arrCapas[ultcapa].arrSprite;
			var e_ultcapa = this.arrCapas[ultcapa];
			this.particulas.y = e_ultcapa._y - 20;
			this.particulas.x = e_ultcapa.x;
			this.particulas.deltaOriX = e_ultcapa.x + e_ultcapa.w;
			this.particulas.deltaOriY = e_ultcapa._h / 2;
			this.particulas.iniciar();
		}

		//verificar si los personajes deben avanzar o se deben devolver 
		//si se encuentra dentro de los puntos de avance.
		var nArco = this.buscarArco(n);
		if (!this.arcos[nArco]) {
			//array de banderas que me dice en que arco me encuentro situado.
			for (var i = 0; i < this.arcos.length; i++) {
				this.arcos[i] = (i == nArco ? true : false);
			}
			//incrementar el numero de capas para que el area de toque permanezca mas tiempo en el nuevo sitio
			if (mostrandose) {
				//si el puente va subiendo entonces se incrementan las capas 
				this.toque.incrementar();
				this.toque.incrementar();
				this.toque.incrementar();
			}
			this.moverAreaToque(this.toque.e_area.attrAreaToque[nArco]);
			var attrP = this.attrPersonajes[nArco];
			Crafty("H1_Personaje").each(function() {
				this.caminar({//numeros aleatorios
					x: Crafty.math.randomInt(attrP.xmin, attrP.xmax),
					y: Crafty.math.randomInt(attrP.ymin, attrP.ymax),
					t: Crafty.math.randomInt(30, 60)
				});
			});
		}

	};
	//hacer que el area de toque haga un fadeout fadein.
	this.moverAreaToque = function(newx) {
		var area = this.toque.e_area;
		var tTween = 5;
		var self = this;
		//area.x = newx;//esto es lo que se quiere al final.
		area.addTween({alpha: 0.0}, "easeInCubic", tTween, function() {
			this.x = newx;
			//this.alpha = 0.1//asi esta ok
			this.addTween({alpha: 0.1}, "easeInCubic", tTween, function() {
				Crafty.e("Gesto").Gesto(1, {coords: [newx + 70, 450], duracion: 40, retardo: 0});
			});
		});
		return this;
	};
	//buscar dentro del array de puntos de avance para ver donde se encuentra el arco.
	this.buscarArco = function(capa) {
		var arco = 0;
		for (var i = 0; i < this.arrPuntosAvance.length - 1; i++) {
			if (capa >= this.arrPuntosAvance[i] && capa < this.arrPuntosAvance[i + 1]) {
				return arco;
			}
			arco++;
		}
		return -1;
	};
	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		return this;
	};
	// Sólo invocada al ganar la actividad
	this.ganarActividad = function ganarActividad() {
		gesActividad.temporizador.parar();
		//hacer que los personajes caminen hacia la parte izquierda para que desaparezcan
		Crafty("H1_Personaje").each(function() {
			var newt = Crafty.math.randomInt(100, 250);
			this.caminar({x: 1280, y: 300, t: newt});
		});
		var self = this;
		//esperar a que los personajes caminen
		Crafty.e("Delay").delay(function() {
			gesActividad.mostrarPuntaje();
		}, 2000);
		return this;
	};
}
;


