/**
 * Actividad parque caldas, armar la estructura monumento del FJCaldas
 * @returns {ActParque1}
 */
var ActParque2 = function() {
	this.e_piso = null; // Entidad que se pasa como referencia para el MouseBind
	this.huecos = Array(8);
	//con esta cantidad se gana la actividad
	this.totAciertos = 4;
	//tiempo en que se cambia de un topo a otro (milisegundos)
	this.duracion = 20000;
	//si se ha ganado la actividad
	this.actividadGanada = false;
	//si se ha ganado la actividad
	this.aciertos = 0;

	this.b2a = new B2arrastre();

	
	this.init = function() {
		this.crearEntidades();
		// Inicializamos el objeto gestor de arrastre de la escena

		this.b2a.init(this.e_piso);
		this.desMonumento();
		if (!cocoon) {
			Crafty.box2D.showDebugInfo();
		}
		return this;
	};


	this.crearEntidades = function() {
		Crafty.e("2D, Canvas, Image").image("img/act/parque/2/fondo.jpg").attr({z: 0});
		// Cuerpo del piso 
		this.e_piso = Crafty.e('2D, Canvas, Box2D')
				.box2d({
					bodyType: 'static',
					shape: [[0, 550], [1280, 550]]
				});
		// Paredes
		Crafty.e('2D, Canvas, Box2D').box2d({bodyType: 'static', shape: [[0, 0], [1280, 0]]});
		Crafty.e('2D, Canvas, Box2D').box2d({bodyType: 'static', shape: [[0, 0], [0, 800]]});
		Crafty.e('2D, Canvas, Box2D').box2d({bodyType: 'static', shape: [[1280, 0], [1280, 800]]});
		Crafty.e('2D, Canvas, Box2D').box2d({bodyType: 'static', shape: [[0, 800], [1280, 800]]});
		this.crearPartes();
		return this;
	};

	this.crearPartes = function() {
		var n = 8;
		//posiciones donde deben estar ubicados los bloques
		this.attrPartes = [
			{x: 496, y: 362, z: 5, alpha: 0.1},
			{x: 622, y: 362, z: 5, alpha: 0.1},
			{x: 526, y: 288, z: 5, alpha: 0.1},
			{x: 583, y: 288, z: 5, alpha: 0.1},
			{x: 637, y: 288, z: 5, alpha: 0.1},
			{x: 591, y: 46, z: 5, alpha: 0.1},
			{x: 581, y: 100, z: 5, alpha: 0.1},
			{x: 569, y: 194, z: 5, alpha: 0.1}
		];
		//figuras de los bloques
		this.attrPartesBloques = [
			[[24, 0], [126, 0], [126, 170], [0, 170]],
			[[0, 0], [103, 0], [126, 170], [0, 170]],
			[[32, 0], [56, 0], [84, 76], [0, 76]],
			[[0, 0], [77, 1], [54, 77], [23, 76]],
			[[23, 0], [46, 0], [76, 74], [0, 77]],
			[[22, 0], [46, 0], [59, 53], [2, 53]],
			[[11, 0], [69, 0], [118, 56], [104, 83], [69, 94], [0, 93]],
			[[10, 0], [80, 0], [101, 93], [2, 93]]
		];
		//estos son los bloques obligatorios que deben estar ubicados para poder ponerlo en la posicion correcta
		this.bloquesObli = [
			null,
			null,
			[0],
			[0, 1],
			[1],
			[6],
			[7],
			[2, 4]
		];

		//crear los huecos en las posiciones donde deben ir encajando y los bloques en la misma posicion
		for (var i = 0; i < n; i++) {
			//crear el hueco para hacer encajar las partes del monumento
			this.huecos[i] = Crafty.e("P2Hueco")
					.attr(this.attrPartes[i])
					.P2Hueco(this, i, "sprP1_estatua" + i);
			//partes del monumento
			Crafty.e("P2Bloque")
					.attr({x: this.attrPartes[i].x, y: this.attrPartes[i].y, z: 10})
					.P2Bloque(this, //referencia a la actividad padre
							this.huecos[i], //referencia al hueco donde va a encajar
							i, //numero asignado como identificador
							this.attrPartesBloques[i], //figura de componente
							"sprP1_estatua" + i, //sprite de componente
							this.bloquesObli[i]);//bloques que deben estar encajados para que encaje
		}
	};

	//Hacer mover los bloques para diferentes partes. (aplicar un impulso)
	this.desMonumento = function() {
		var self = this;
		Crafty.e("2D, Canvas, Color, Ubicador").color("blue").attr({z: 20, h: 10, w: 10})

		Crafty.e("Delay").delay(function() {
			Crafty("P2Bloque").each(function() {
				//obteniendo la fuerza necesaria para mover los bloques
				var force = new b2Vec2(
						(Crafty.math.randomElementOfArray([-1, 1]) * this.body.GetMass() * 10),
						-this.body.GetMass() * 3);
				this.body.ApplyImpulse(force, this.body.GetWorldCenter());
			});
			Crafty.e("Delay").delay(function() {
				Crafty("BolaDestroy").each(function() {
					world.DestroyBody(this.body);
				});
			}, 2000);
		}, 1000);

	};

	//verificar si ya se han colocados todos los numeros.
	// Invocada por cada bloque al ser fijado
	this.bloqueFijado = function() {
		this.aciertos++;
		if (this.aciertos >= this.totAciertos) {
			this.ganarActividad();
		}
	};


	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		return this;
	};

	this.ganarActividad = function() {
		gesActividad.temporizador.parar();
		var self = this;
		Crafty.e("2D, Canvas, Image, Tweener")
				.attr({z: 1, alpha: 0})
				.image("img/act/parque/2/fondo_color.jpg")
				.addTween({alpha: 1}, 'easeInOutQuad', 25, function() {
					gesActividad.mostrarPuntaje();
				});
		return this;
	};
};