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

	this.init = function() {
		this.iniciarComponentes();
		var self = this;
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

	//verificar si ya se han colocados todos los numeros.
	this.arrastreCompleto = function() {
		//contar el numero de entidades de tipo Completo
		if (this.aciertos === this.totAciertos) {
			this.ganarActividad();
		}
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
		e_tumba.x = cabeza._x + 10;
		e_tumba.y = cabeza._y - 30;
		
		// Mostramos la cortina negra
		Crafty.e("2D, Canvas, Color, Tweener")
				.color("#000000")
				.attr({ w: 1280, h: 800, z: 14, alpha: 0 })
				.addTween({ alpha: 1 }, "linear", 10, function() {
					cabeza.addTween({ y: this._y - 50, alpha: 0 }, "easeInQuart", 60, function() {
						e_tumba.addTween({ alpha: 1 }, "linear", 30, function() {
							gesActividad.temporizador.parar();
							gesActividad.mostrarPuntaje();
						});
					});
				});
	};
};