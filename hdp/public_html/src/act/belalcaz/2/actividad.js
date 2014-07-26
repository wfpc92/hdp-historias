/**
 * Actividad de los troncos, el jugador debe tomar unos troncos
 * y hacerlos encajar en sobre una figura punteada,
 * al final un caballo da unos saltos.
 * @returns {ActBelalcaz2}
 */
var ActBelalcaz2 = function() {
	//con esta cantidad se gana la actividad
	this.totAciertos = 4;
	//tiempo en que se cambia de un topo a otro (milisegundos)
	this.duracion = 10000;
	//si se ha ganado la actividad
	this.actividadGanada = false;
	//si se ha ganado la actividad
	this.aciertos = 0;
	this.delayTroncos = null; // entidad DelayFrame que lanza los troncos

	this.init = function() {
		this.iniciarComponentes();

		var self = this;
		this.e_caballo.espada("sprB2_espada");
		
		var tr = this.tronco;
		this.e_caballo.caminar({x: 80, y: this.e_caballo.y}, 20, function() {
			//this.pauseAnimation();
		});

		//efecto de movimiento en el lago
		this.vx = 1.8;
		this.e_fondoAgua.vx = Crafty.math.randomNumber(0.05, 0.3);
		this.e_fondoAgua.bind("EnterFrame", function() {
			this.x += this.vx;
			if (this.x < 210 || this.x > 220) {
				this.vx = -this.vx;
			}
		});

		//efecto de movimiento en la espuma del agua
		Crafty("Espuma").each(function() {
			this.posY0 = this.y;
			this.posYMax = this.y + 10;
			this.vy = Crafty.math.randomNumber(0.5, 1.5);
			this.bind("EnterFrame", function() {
				this.y += this.vy;
				if (this.y < this.posY0 || this.y > this.posYMax) {
					this.vy = -this.vy;
					this.posYMax = this.posY0 + Crafty.math.randomInt(15, 20);
				}
			});
		});

		//configurar los troncos 
		for (var i = 0; i < 12; i++) {
			var tr = this.tronco[i];
			tr.act = this;
			if (i < 3) {//tomar los tres primeros troncos y asignarles el area de encaje
				tr.areaCajon = this.areaTronco[i];
			}
			tr.rotation = Crafty.math.randomNumber(15, 25);
			tr.visible = false;
			tr.presionado = false;
			tr.dejar_caer = false;
		}

		var self = this;
		this.delayTroncos = Crafty.e("DelayFrame").interval(function() {
			var tr, rnd;
			var recursion = 100;
			while (recursion > 0) {
				rnd = Crafty.math.randomInt(0, self.tronco.length - 1);
				tr = self.tronco[rnd];
				if (!tr.visible) {
					tr.movInicial();
					recursion = 0;
				}
				else {
					recursion--;
				}
			}
		}, 35);
		
		Crafty.e("Gesto")
				.Gesto(2, { coords: [466, 606], coordsFin: [467, 231], repetir: 2, retardo: 40, desplX: 304 });
		
		return this;
	};

	this.iniciarComponentes = function() {
		//colocar fondo de actividad
		Crafty.e('2D, Canvas, sprB2_fondo');
		Crafty.e('2D, Canvas, sprB2_cascada').attr({ y: 40, z: 10 });
		Crafty.e('2D, Canvas, sprB2_plano1').attr({z: 20});
		var caballo = Crafty.e("Caballo").Caballo("sprB2_caballo");
		caballo.attr({x: -caballo.w, y: 100, z: 9});
		var cocodrilo1 = Crafty.e('Cocodrilo').Cocodrilo("sprB2_cocodrilo").attr({x: 267, y: 88, z: 3});
		var cocodrilo2 = Crafty.e('Cocodrilo').Cocodrilo("sprB2_cocodrilo");
		cocodrilo2.attr({x: 367, y: 71, z: 3, w: cocodrilo1.w * 0.8, h: cocodrilo1.h * 0.8});

		var fondoAgua = Crafty.e("2D, Canvas, sprB2_reflejAgua").attr({x: 215, y: 0, z: 1});
		Crafty.e("2D, Canvas, Espuma, sprB2_espumaAgua1").attr({x: 0, y: 432, z: 11});
		Crafty.e("2D, Canvas, Espuma, sprB2_espumaAgua2").attr({x: 839, y: 580, z: 18 });
		Crafty.e("2D, Canvas, Espuma, sprB2_espumaAgua3").attr({x: 620, y: 570, z: 12 });
		Crafty.e("2D, Canvas, Espuma, sprB2_espumaAgua4").attr({x: 400, y: 530, z: 15 });
		Crafty.e("2D, Canvas, Espuma, sprB2_espumaAgua5").attr({x: 184, y: 565, z: 12 });
		
		var tit_cacique = Crafty.e("2D, Canvas, Titulo, Tweener, sprB2_granCacique").attr({ x: 350, y: 50, alpha: 0 });
		var tit_pioya = Crafty.e("2D, Canvas, Titulo, Tweener, sprB2_pioya").attr({ x: 640, y: 76, alpha: 0 });
		var tit_tierras = Crafty.e("2D, Canvas, Titulo, Tweener, sprB2_tierras").attr({ x: 915, y: 68, alpha: 0 });
		
		var trL_cacique = Crafty.e("2D, Canvas, sprB2_troncoLinea1").attr({x: 330, y: 220, z: 10});
		var trL_pioya = Crafty.e("2D, Canvas, sprB2_troncoLinea2").attr({x: 630, y: 228, z: 10});
		var trL_tierras = Crafty.e("2D, Canvas, sprB2_troncoLinea3").attr({x: 945, y: 225, z: 10});
		trL_cacique.e_titulo = tit_cacique;
		trL_pioya.e_titulo = tit_pioya;
		trL_tierras.e_titulo = tit_tierras;

		this.tronco = [];
		for (var i = 0; i < 12; i++) {
			var I = (1 + i);
			var tr = Crafty.e("Tronco, sprB2_tronco" + String(I));
			this.tronco[i] = tr;
		}

		this.e_caballo = caballo;
		this.e_fondoAgua = fondoAgua;
		this.areaTronco = [trL_cacique, trL_pioya, trL_tierras];
		this.titulos = [tit_cacique, tit_pioya, tit_tierras];
	};

	// cada vez que se enchocla un tronco, mostrar su leyenda y verificar si ya están todos
	this.arrastreCompleto = function(e_tronco) {
		e_tronco.areaCajon.e_titulo.alpha = 1;
		
		this.aciertos = Crafty("Completo").length;
		if (this.aciertos === this.totAciertos) {
			this.ganarActividad();
		}
	};

	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		this.delayTroncos.destroy();
		Crafty("DelayFrame").each(function() { this.destroy(); });
		Crafty("Espuma").each(function() { this.unbind("EnterFrame"); });
		return this;
	};

	this.ganarActividad = function() {
		var self = this;
		gesActividad.temporizador.parar();
		this.e_caballo.saltar();
		
		Crafty.e("DelayFrame").delay(function() {
			self.terminarActividad();
			gesActividad.mostrarPuntaje();
		}, 180);
	};
};