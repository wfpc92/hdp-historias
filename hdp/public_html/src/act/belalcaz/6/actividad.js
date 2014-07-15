/**
 * Actividad de laberinto de belalcazar
 * @returns {ActBelalcaz6}
 */
var ActBelalcaz6 = function() {
	//con esta cantidad se gana la actividad
	this.totAciertos = 4;
	//tiempo en que se cambia de un topo a otro (milisegundos)
	this.duracion = 20000;
	//si se ha ganado la actividad
	this.actividadGanada = false;
	//si se ha ganado la actividad
	this.aciertos = 0;
	this.e_cartagena = null; // salida del laberinto
	this.particulas = null; // corazones que salen al coger uno

	this.init = function() {
		this.iniciarComponentes();
		Crafty("Soles").each(function() {
			Crafty.e("Gesto")
						.Gesto(1, { coords: [this.x + 45, this.y + 50], duracion: 90, retardo: 40 });
		});
		
		//this.ganarActividad();
		
		// Corazones pequeños que saltan
		this.particulas = new Particulas({
			componentes: "spr_partCorazon, SpriteAnimation",
			z: 600,
			vx: 0,
			deltaVx: 1,
			periodo: 10,
			deltaOriY: 20, deltaOriX: 10,
			numParticulas: 4,
			magnitud: 25,
			duracion: 45,
			atenuacion: 22,
			f_crear: function(ent) {
				ent.reel("escalar", 400, [[0, 0], [1,0], [2,0], [3,0]]).animate("escalar", -1);
			}
		});
		
		return this;
	};


	this.iniciarComponentes = function() {
		Crafty.e("2D, Canvas, Image").image("img/act/belalcaz/6/fondo.jpg").attr({z: 0});
		var arbusto = Crafty.e("2D, Canvas, Image").image("img/act/belalcaz/6/plano1_arbusto.png");
		arbusto.attr({x: 0, y: 800 - arbusto.h, z: 20});
		this.cabeza = Crafty.e("Laberinto_cabeza").Laberinto_cabeza("sprB6_cabeza");
		this.cabeza.actividad = this;
		
		// Agregamos la salida del laberinto (cartagena)
		this.e_cartagena = Crafty.e("B6_Cartagena");
	};


	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		Crafty("Soles").each(function() {
			this.destroy();
		});
		this.cabeza.destroy();
		return this;
	};

	this.ganarActividad = function() {
		Crafty("Soles").each(function() {
			this.destroy();
		});
		
		var cabeza = this.cabeza;
		var e_tumba = Crafty.e("2D, Canvas, Tweener, sprB6_tumba").attr({ alpha: 0, z: 15 });
		e_tumba.x = cabeza._x;
		e_tumba.y = cabeza._y - 5;
		
		var e_cortinaNegra = Crafty.e("2D, Canvas, Color, Tweener")
									.color("#000000")
									.attr({ w: 1280, h: 800, z: 14, alpha: 0 });
		
		this.e_cartagena.visible = false;
		
		// Mostramos la cortina negra
		gesActividad.temporizador.parar();
		e_cortinaNegra.addTween({ alpha: 0.8 }, "linear", 10, function() {
					cabeza.addTween({ y: cabeza._y - 250, alpha: 0 }, "easeInQuart", 60);
					// Mostramos la tumba y terminamos
					e_tumba.addTween({ alpha: 1 }, "easeOutCubic", 30, function() {
						Crafty.e("DelayFrame").delay(function() {
							gesActividad.mostrarPuntaje();
						}, 60);
					});
				});
	};
};