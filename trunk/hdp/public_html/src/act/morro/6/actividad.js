/**
 * Actividad 6 Morro
 * Dato: 
 * Interacción: Remover las piezas de la cima del morro
 */

var ActMorro6 = function() {

	//si se ha ganado la actividad
	this.actividadGanada = false;

	// Arreglos de entidades de las 6 columnas de piezas
	this.arrCol0 = Array(1);
	this.arrCol1 = Array(2);
	this.arrCol2 = Array(4);
	this.arrCol3 = Array(4);
	this.arrCol4 = Array(4);
	this.arrCol5 = Array(1);

	this.numBloques = 16; // Cuántos bloques hay en la pantalla
	this.e_estatua = null; // Estatua de belalcazar
	this.e_sombra = null; // Sombra de la estatua de belalcazar
	this.e_guias = null; // Guías de bloques
	this.e_piso = null; // Entidad que se pasa como referencia para el MouseBind
	
	this.b2a = new B2arrastre(); // objeto gestor de arrastre de la escena

	this.init = function() {
		this.crearEntidades();
		this.b2a.init(this.e_piso);
		
		Crafty.e("Gesto")
				.Gesto(2, { coords: [590, 420], coordsFin: [600, 120], repetir: 2, retardo: 40, desplX: 130 });
		
		return this;
	};

	// Crea las entidades de esta actividad
	this.crearEntidades = function() {
		Crafty.e("2D, Canvas, Image").image("img/act/morro/6/fondo.jpg");
		var e_morro = Crafty.e("2D, Canvas, Image,Tween")
				.image("img/act/morro/6/morro-base.png")
				.attr({y: 450, z: 10});

		// Cuerpo del piso (dividido en 2 partes por su concavidad)
		this.e_piso = Crafty.e('2D, Canvas, Box2D').attr({x: 0, y: 0})
				.box2d({
					bodyType: 'static',
					shape: [[0, 595], [217, 463], [251, 458], [522, 452], [798, 462], [798, 800], [0, 800]]
				});
		Crafty.e('2D, Canvas, Box2D').attr({x: 0, y: 0})
				.box2d({
					bodyType: 'static',
					shape: [[798, 462], [1035, 456], [1093, 456], [1146, 471], [1280, 567], [1280, 800], [798, 800]]
				});
		
		// tapa en el techo
		Crafty.e('2D, Canvas, Box2D').attr({x: 0, y: 0})
				.box2d({
					bodyType: 'static',
					shape: [[0, 0], [1280, 0]]
				});

		this.crearBloques();

		this.e_guias = Crafty.e("2D, Canvas, Image, Tween")
				.image("img/act/morro/6/guia.png")
				.attr({x: 125, y: 140, z: 15, alpha: 1.0});

		this.e_estatua = Crafty.e("2D, Canvas, Image, Tweener")
				.image("img/act/morro/6/estatua.png")
				.attr({x: 333, y: 460, z: 6});
		this.e_estatua.visible = false;

		this.e_sombra = Crafty.e("2D, Canvas, Image, Tween")
				.image("img/act/morro/6/sombra.png")
				.attr({x: 355, y: 450, z: 15, alpha: 0.0});
		this.e_sombra.visible = false;
	};

	// Crear los bloques de esta escena (invocada por crearActividades)
	this.crearBloques = function() {
		this.arrCol0[0] = Crafty.e("M6Bloque").attr({x: 245, y: 409}).M6Bloque(this, 0, 0, [[0, 47], [75, 1], [75, 45]]);
		this.arrCol1[0] = Crafty.e("M6Bloque").attr({x: 321, y: 387}).M6Bloque(this, 0, 1, [[1, 22], [22, 8], [170, 1], [170, 62], [0, 67]]);
		this.arrCol2[0] = Crafty.e("M6Bloque").attr({x: 490, y: 385}).M6Bloque(this, 0, 2, [[1, 3], [171, 1], [172, 68], [0, 65]]);
		this.arrCol3[0] = Crafty.e("M6Bloque").attr({x: 661, y: 386}).M6Bloque(this, 0, 3, [[2, 0], [171, 10], [172, 76], [2, 69]]);
		this.arrCol4[0] = Crafty.e("M6Bloque").attr({x: 831, y: 392}).M6Bloque(this, 0, 4, [[1, 1], [172, 2], [172, 60], [1, 68]]);
		this.arrCol5[0] = Crafty.e("M6Bloque").attr({x: 1004, y: 370}).M6Bloque(this, 0, 5, [[1, 1], [98, 82], [0, 84]]);

		this.arrCol1[1] = Crafty.e("M6Bloque").attr({x: 343, y: 297}).M6Bloque(this, 1, 1, [[3, 97], [149, 0], [149, 92]]);
		this.arrCol2[1] = Crafty.e("M6Bloque").attr({x: 490, y: 331}).M6Bloque(this, 1, 2, [[1, 1], [171, 1], [171, 55], [1, 57]]);
		this.arrCol3[1] = Crafty.e("M6Bloque").attr({x: 661, y: 332}).M6Bloque(this, 1, 3, [[2, 1], [171, 1], [171, 65], [2, 56]]);
		this.arrCol4[1] = Crafty.e("M6Bloque").attr({x: 831, y: 330}).M6Bloque(this, 1, 4, [[1, 3], [102, 1], [171, 43], [171, 66], [1, 68]]);

		this.arrCol2[2] = Crafty.e("M6Bloque").attr({x: 492, y: 289}).M6Bloque(this, 2, 2, [[2, 5], [170, 2], [170, 44], [2, 44]]);
		this.arrCol3[2] = Crafty.e("M6Bloque").attr({x: 663, y: 278}).M6Bloque(this, 2, 3, [[2, 12], [60, 2], [170, 24], [170, 51], [2, 53]]);
		this.arrCol4[2] = Crafty.e("M6Bloque").attr({x: 832, y: 305}).M6Bloque(this, 2, 4, [[1, 1], [76, 2], [103, 22], [2, 24]]);

		this.arrCol2[3] = Crafty.e("M6Bloque").attr({x: 496, y: 250}).M6Bloque(this, 3, 2, [[0, 43], [56, 6], [71, 1], [91, 1], [120, 13], [163, 38]]);
		this.arrCol3[3] = Crafty.e("M6Bloque").attr({x: 722, y: 250}).M6Bloque(this, 3, 3, [[2, 28], [34, 6], [61, 1], [89, 7], [110, 16], [110, 52]]);
		this.arrCol4[3] = Crafty.e("M6Bloque").attr({x: 832, y: 268}).M6Bloque(this, 3, 4, [[1, 1], [74, 40], [1, 38]]);

		/*this.arrCol0[0].arrastrable = true;
		 this.arrCol1[1].arrastrable = true;
		 this.arrCol2[3].arrastrable = true;
		 this.arrCol3[3].arrastrable = true;
		 this.arrCol4[3].arrastrable = true;
		 this.arrCol5[0].arrastrable = true;*/

	};

	// Sólo invocada al ganar la actividad
	this.ganarActividad = function ganarActividad() {
		gesActividad.temporizador.parar();
		
		if (!this.actividadGanada) {
			this.actividadGanada = true;
			console.log("WIN");
			var self = this;

			// Mostramos la animación final
			this.e_guias.tween({alpha: 0.0}, 300);

			var part = new Particulas({
				componentes: "spr_polvo, SpriteAnimation",
				x: 480,
				y: 440,
				z: 600,
				vx: 0,
				deltaVx: 2,
				periodo: 90,
				deltaOriY: 0,
				deltaOriX: 430,
				numParticulas: 16,
				magnitud: 10,
				duracion: 33,
				atenuacion: 12,
				f_crear: function(ent) {
					ent.reel("giro", 400, [[0, 0], [32, 0], [64, 0], [96, 0]]).animate("giro", -1);
				}
			});
			part.iniciar();

			this.e_estatua.visible = true;
			this.e_estatua.addTween({y: 0}, "easeInOutQuad", 85, function() {
				self.e_sombra.visible = true;
				self.e_sombra.tween({alpha: 1.0}, 300);
				
				self.terminarActividad();
				gesActividad.mostrarPuntaje();
			});

		}

		return this;
	};

	// Siempre invocada al terminar la actividad
	this.terminarActividad = function terminarActividad() {
		return this;
	};

	// Invocado por un callback en los bloques
	// Registra la salida de un bloque de la pantalla
	this.saleBloque = function(fila, col) {
		this.numBloques--;
		if (this.numBloques <= 0) {
			this.ganarActividad();
		}
	};
};