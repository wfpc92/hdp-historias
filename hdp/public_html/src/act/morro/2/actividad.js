/**
 * Actividad 2 Morro
 * Dato: 
 * Interacción: Enchoclar piezas en los huecos
 */
var ActMorro2 = function() {
	this.e_piso = null; // Entidad que se pasa como referencia para el MouseBind
	this.huecos = Array(7);
	this.trampas = Array(6);
	this.totAciertos = 7; // Total de bloques fijados para ganar
	this.aciertos = 0; // Cuenta de aciertos
	this.b2a = new B2arrastre();

	this.init = function() {
		this.crearEntidades();
		this.b2a.init(this.e_piso); // Inicializamos el objeto gestor de arrastre de la escena
		
		Crafty.e("Gesto")
				.Gesto(2, { coords: [449, 570], coordsFin: [578, 300], repetir: 2, retardo: 40, desplX: 180 });
		
		return this;
	};

	// Crea las entidades de esta actividad
	this.crearEntidades = function() {
		Crafty.e("2D, Canvas, Image").image("img/act/morro/2/fondo.jpg");
		Crafty.e("2D, Canvas, Image").image("img/act/morro/2/hierba.png").attr({x: 280, y: 195, z: 6});

		// Cuerpo del piso (dividido en 2 partes por su concavidad)
		this.e_piso = Crafty.e('2D, Canvas, Box2D').attr({x: 0, y: 632})
				.box2d({
					bodyType: 'static',
					shape: [[0, 0], [545, 17], [764, 31], [764, 779], [0, 779]]
				});
		Crafty.e('2D, Canvas, Box2D').attr({x: 0, y: 631})
				.box2d({
					bodyType: 'static',
					shape: [[765, 32], [1280, 8], [1280, 779], [765, 779]]
				});
				
		// Paredes
		Crafty.e('2D, Canvas, Box2D').box2d({bodyType: 'static', shape: [[0, 0], [1280, 0]]});
		Crafty.e('2D, Canvas, Box2D').box2d({bodyType: 'static', shape: [[0, 0], [0, 800]]});
		Crafty.e('2D, Canvas, Box2D').box2d({bodyType: 'static', shape: [[1280, 0], [1280, 800]]});
		this.crearBloques();
	};

	// Retorna un entero aleatorio entre 0 y max
	this.rand = function(max) {
		return Math.floor(Math.random() * (max));
	};

	// Crear los bloques de esta escena
	this.crearBloques = function() {
		this.huecos[0] = Crafty.e("M2Hueco").attr({x: 288, y: 236, z: 5}).M2Hueco(this, 0);
		this.huecos[1] = Crafty.e("M2Hueco").attr({x: 526, y: 245, z: 5}).M2Hueco(this, 1);
		this.huecos[2] = Crafty.e("M2Hueco").attr({x: 381, y: 335, z: 5}).M2Hueco(this, 2);
		this.huecos[3] = Crafty.e("M2Hueco").attr({x: 540, y: 341, z: 5}).M2Hueco(this, 3);
		this.huecos[4] = Crafty.e("M2Hueco").attr({x: 658, y: 247, z: 5}).M2Hueco(this, 4);
		this.huecos[5] = Crafty.e("M2Hueco").attr({x: 821, y: 245, z: 5}).M2Hueco(this, 5);
		this.huecos[6] = Crafty.e("M2Hueco").attr({x: 994, y: 242, z: 5}).M2Hueco(this, 6);

		Crafty.e("M2Bloque").attr({x: this.rand(900), y: 400, z: 10})
				.M2Bloque(this, this.huecos[0], 0, [[102, 0], [255, 7], [215, 87], [73, 176], [0, 168]]);
		Crafty.e("M2Bloque").attr({x: 900, y: this.rand(400), z: 10})
				.M2Bloque(this, this.huecos[1], 1, [[43, 0], [169, 3], [131, 80], [2, 75]]);
		Crafty.e("M2Bloque").attr({x: 25, y: this.rand(400), z: 10})
				.M2Bloque(this, this.huecos[2], 2, [[47, 0], [179, 5], [136, 82], [0, 77]]);
		Crafty.e("M2Bloque").attr({x: this.rand(900), y: 350, z: 10})
				.M2Bloque(this, this.huecos[3], 3, [[43, 1], [109, 1], [294, 47], [278, 81], [1, 77]]);
		Crafty.e("M2Bloque").attr({x: 300, y: 0, z: 10})
				.M2Bloque(this, this.huecos[4], 4, [[63, 0], [192, 1], [135, 127], [0, 123]]);
		Crafty.e("M2Bloque").attr({x: this.rand(900), y: 150, z: 10})
				.M2Bloque(this, this.huecos[5], 5, [[59, 2], [188, 2], [211, 98], [178, 173], [26, 179], [1, 128]]);
		Crafty.e("M2Bloque").attr({x: 200, y: this.rand(400), z: 10})
				.M2Bloque(this, this.huecos[6], 6, [[33, 2], [72, 0], [40, 79], [0, 80]]);

		this.trampas[0] = Crafty.e("M2Bloque").attr({x: 0, y: 50, z: 10}).M2Trampa(this, 0, [[0, 157], [94, 0], [229, 4], [134, 162]]);
		this.trampas[1] = Crafty.e("M2Bloque").attr({x: this.rand(900), y: this.rand(400), z: 10}).M2Trampa(this, 1, [[50, 0], [178, 3], [133, 95], [1, 90]]);
		this.trampas[2] = Crafty.e("M2Bloque").attr({x: this.rand(900), y: 100, z: 10}).M2Trampa(this, 2, [[1, 109], [70, 0], [178, 38], [135, 116]]);
		this.trampas[3] = Crafty.e("M2Bloque").attr({x: 900, y: this.rand(400), z: 10}).M2Trampa(this, 3, [[63, 2], [190, 1], [135, 127], [1, 124]]);
		this.trampas[4] = Crafty.e("M2Bloque").attr({x: this.rand(900), y: 0, z: 10}).M2Trampa(this, 4, [[87, 0], [240, 7], [199, 87], [72, 147], [0, 140]]);
		this.trampas[5] = Crafty.e("M2Bloque").attr({x: this.rand(900), y: 409, z: 10}).M2Trampa(this, 5, [[69, 2], [133, 2], [295, 77], [279, 111], [2, 106]]);
	};

	// Invocada por cada bloque al ser fijado
	this.bloqueFijado = function() {
		this.aciertos++;
		if (this.aciertos >= this.totAciertos) {
			this.ganarActividad();
		}
	},
	
	// Sólo invocada al ganar la actividad
	this.ganarActividad = function ganarActividad() {
		gesActividad.temporizador.parar();

		for (i = 0; i < 6; i++) {
			this.trampas[i].attr({alpha: 1.0}).addTween({alpha: 0.0}, 'linear', 45, function() {
				world.DestroyBody(this.body);
				this.destroy();
			});
		}

		Crafty.e("Delay").delay(function() {
			gesActividad.mostrarPuntaje();
		}, 1500);
		
		return this;
	};

	// Siempre invocada al terminar la actividad
	this.terminarActividad = function terminarActividad() {
		return this;
	};
};