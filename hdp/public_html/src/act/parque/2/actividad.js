/**
 * Actividad parque caldas, armar la estructura monumento del FJCaldas
 * @returns {ActParque2}
 */
var ActParque2 = function() {
	this.e_piso = null; // Entidad que se pasa como referencia para el MouseBind
	this.e_fondoColor = null; // Fondo a color
	this.huecos = Array(8);
	//con esta cantidad se gana la actividad
	this.totAciertos = 4;
	this.duracion = 20000;
	//si se ha ganado la actividad
	this.actividadGanada = false;
	//si se ha ganado la actividad
	this.aciertos = 0;
	

	this.b2a = new B2arrastre();
	
	// Generador de partículas de polvo
	this.particulas = new Particulas({
		componentes: "spr_polvo, SpriteAnimation",
		z: 500,
		vx: 0,
		deltaVx: 2,
		periodo: 50,
		numParticulas: 6,
		magnitud: 10,
		duracion: 20,
		atenuacion: 8,
		f_crear: function(ent) {
			ent.reel("giro", 400, [[0, 0], [32, 0], [64, 0], [96, 0]]).animate("giro", -1);
		}
	});
	
	// Partículas de explosión inicial
	this.partExplota = new Particulas({
		componentes: "spr_nube, SpriteAnimation",
		x: 546, y: 180, z: 600,
		vx: 0,
		deltaVx: 4,
		periodo: 5,
		deltaOriX: 145, deltaOriY: 360,
		numParticulas: 9,
		magnitud: 100,
		duracion: 20,
		atenuacion: 80,
		f_crear: function(ent) {
			ent.reel("explota", 400, [[0,0],[96,0],[192,0],[288,0]]).animate("explota", -1);
		}
	});

	
	this.init = function() {
		this.crearEntidades();
		
		// Inicializamos el objeto gestor de arrastre de la escena
		this.b2a.init(this.e_piso);
		this.desMonumento();
		
		Crafty.e("Gesto")
				.Gesto(2, { coords: [258, 488], coordsFin: [600, 340], repetir: 1, retardo: 80 });
		Crafty.e("Gesto")
				.Gesto(2, { coords: [1100, 470], coordsFin: [630, 340], repetir: 1, retardo: 120 });
		
		return this;
	};


	this.crearEntidades = function() {
		Crafty.e("2D, Canvas, Image").image("img/act/parque/2/fondo.jpg").attr({z: 0 });
		
		this.e_fondoColor = Crafty.e("2D, Canvas, Image, Tweener")
									.attr({ z: 1, alpha: 1 })
									.image("img/act/parque/2/fondo_color.jpg")
									.addTween({alpha: 0}, 'linear', 25, function() {
										this.visible = false;
									});

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
					.attr({ x: this.attrPartes[i].x, y: this.attrPartes[i].y, z: 30 })
					.P2Bloque(this, //referencia a la actividad padre
						this.huecos[i], //referencia al hueco donde va a encajar
						i, //numero asignado como identificador
						this.attrPartesBloques[i], //figura de componente
						"sprP1_estatua" + i, //sprite de componente
						this.bloquesObli[i]);//bloques que deben estar encajados para que encaje
		}
	};


	// mover los bloques para diferentes partes. (aplicar un impulso)
	this.desMonumento = function() {
		var fX, fY, fuerza, pos;
		var magnitud = 2000 * 32;
		var self = this;
		
		Crafty.e("Delay").delay(function() {
			self.partExplota.iniciar();
			
			Crafty("P2Bloque").each(function() {
				//obteniendo la fuerza necesaria para mover los bloques
				fX = randomFloat(-1, 1);
				fY = randomFloat(-1, 0.2);
				
				// Aplicar fuerza personalizada a los bloques de la base para más desorden
				pos = this.body.GetPosition();
				if (this.num === 0) { fX = -1; fY = 0.5; pos.x = 0; pos.y -= 3; }
				else if (this.num === 1) { fX = 1; fY = 0.5; pos.x += 5; pos.y -= 3; }
				
				fuerza = new b2Vec2(fX * magnitud, fY * magnitud);
				
				this.body.ApplyImpulse(fuerza, pos);
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
		console.log(this.aciertos);
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
		
		this.e_fondoColor.visible = true;
		this.e_fondoColor.addTween({ alpha: 1 }, 'linear', 30, function() {
			gesActividad.mostrarPuntaje();
		});
		return this;
	};
};