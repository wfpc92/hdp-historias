/**
 * @returns {ActParque6}
 */
var ActParque6 = function() {
	//con esta cantidad se gana la actividad
	this.totAciertos = 0;
	//tiempo en que se cambia de un topo a otro (milisegundos)
	this.duracion = 20000;
	//si se ha ganado la actividad
	this.actividadGanada = false;
	//si se ha ganado la actividad
	this.aciertos = 0;
	this.b2a = new B2arrastre();
	this.ciclosTerremoto = 30; // Número de movimientos del terremoto
	this.e_piezas = new Array(10); // Entidades piezas de la catedral
	this.e_huecos = new Array(10); // Entidades huecos correspondientes
	this.particulas = null; // partículas
	this.particulas2 = null; // partículas

	this.init = function() {
		this.crearEntidades();
		
		var self = this;
		Crafty.e("DelayFrame").delay(function() {
			self.desMonumento();
		}, 60);
		
		
		this.b2a.init(this.e_piso); // Inicializamos el objeto gestor de arrastre de la escena

		this.initParticulas();

		Crafty.e("Gesto")
				.Gesto(2, { coords: [258, 630], coordsFin: [580, 440], repetir: 1, retardo: 80 });
		Crafty.e("Gesto")
				.Gesto(2, { coords: [1100, 620], coordsFin: [720, 440], repetir: 1, retardo: 120 });

		return this;
	};
	
	this.terremoto = function() {
		Crafty.viewport.x = randomFloat(-10, 10);
		Crafty.viewport.y = randomFloat(-10, 10);
		this.ciclosTerremoto--;
		
		if (this.ciclosTerremoto > 0) {
			var self = this;
			var frames = randomInt(2, 6);
			Crafty.e("DelayFrame").delay(function() { self.terremoto(); }, frames);
		}
		else {
			Crafty.viewport.x = 0;
			Crafty.viewport.y = 0;
		}
	};

//Hacer mover los bloques para diferentes partes. (aplicar un impulso)
	this.desMonumento = function() {
		var self = this;
		
		self.terremoto();

		var pos;
		
		pos = this.e_piezas[4].body.GetPosition();	
		this.e_piezas[4].body.ApplyImpulse(new b2Vec2(-6, -5), pos);
		pos = this.e_piezas[5].body.GetPosition();	
		this.e_piezas[5].body.ApplyImpulse(new b2Vec2(6, -5), pos);
		

		Crafty.e("DelayFrame").delay(function() {
			for (i = 0 ; i < 10 ; i++) {
				self.e_piezas[i].initEventos();
				if (i > 1) self.e_huecos[i].mostrar();
			}

			self.e_piezas[0].ocultar();
			self.e_piezas[1].ocultar();
		}, 30);
	};

	this.crearEntidades = function() {
		Crafty.e("2D, Canvas, Image").image("img/act/parque/6/fondo.jpg").attr({x: 0, y: 0, z: 0});
		Crafty.e("2D, Canvas, Image").image("img/act/parque/6/casas.png").attr({x: 0, y: 410, z: 2});
		Crafty.e("2D, Canvas, Image").image("img/act/parque/6/nubes.png").attr({z: 1});
		this.piso = Crafty.e("2D, Canvas, Image").image("img/act/parque/6/piso.png").attr({y: 800 - 127, z: 3 });

		// Paredes y cuerpo del piso 
		this.e_piso = Crafty.e('2D, Canvas, Box2D')
							.box2d({bodyType: 'static', shape: [[0,676],[1280,676],[1280,800],[0,800]]});
		Crafty.e('2D, Canvas, Box2D').box2d({bodyType: 'static', shape: [[0,-100],[1280,-100],[1280,0],[0,0]]});
		Crafty.e('2D, Canvas, Box2D').box2d({bodyType: 'static', shape: [[-100,0],[0,0],[0,700],[-100,700]]});
		Crafty.e('2D, Canvas, Box2D').box2d({bodyType: 'static', shape: [[1280,0],[1380,0],[1380,700],[1280,700]]});
		
		this.crearPartes();
	};

	this.crearPartes = function() {
		var n = 10;
		//posiciones donde deben estar ubicados los bloques
		this.attrPartes = [
			{x: 555, y: 25, z: 15 },
			{x: 439, y: 229, z: 15 },
			
			{x: 300, y: 378, z: 15 },
			{x: 641, y: 378, z: 15 },
			
			{x: 532, y: 423, z: 15 },
			{x: 692, y: 423, z: 15 },
			
			{x: 366, y: 423, z: 15 },
			{x: 458, y: 423, z: 15 },
			{x: 793, y: 423, z: 15 },
			{x: 887, y: 423, z: 15 }
		];
		
		// poligonos de los bloques
		this.poligonos = [
			[[85,20],[163,150],[163,240],[8,240],[8,150]],
			[[374,35],[400,64],[400,150],[0,150],[0,67],[24,35]],
			[[19,1],[341,1],[341,46],[19,46],[0,20]],
			[[2,1],[326,1],[342,22],[322,45],[2,45]],
			[[0,0],[59,0],[59,252],[0,252]],
			[[0,0],[59,0],[59,252],[0,252]],
			[[0,0],[30,0],[30,252],[0,252]],
			[[0,0],[30,0],[30,252],[0,252]],
			[[0,0],[30,0],[30,252],[0,252]],
			[[0,0],[30,0],[30,252],[0,252]]
		];
		
		//estos son los bloques obligatorios que deben estar ubicados para poder ponerlo en la posicion correcta
		this.bloquesObli = [
			[1],
			[2, 3],
			[4, 5, 6],
			[7, 8, 9],
			null,
			null,
			null,
			null,
			null,
			null
		];

		//crear los huecos en las posiciones donde deben ir encajando y los bloques en la misma posicion
		for (var i = 0; i < n; i++) {
			//crear el hueco para hacer encajar las partes del monumento
			
			this.e_huecos[i] = Crafty.e("P6Hueco")
									.attr(this.attrPartes[i])
									.P6Hueco(this, i);
			
			// pieza de la catedral
			this.e_piezas[i] = Crafty.e("P6Parte");
			this.e_piezas[i].P6Parte(this, //referencia a la actividad padre
							i, //numero asignado como identificador (0: cupula, 1: techo, 2,3: plancha 2do piso, 4:9 columnas)
							this.poligonos[i]);
			this.e_piezas[i].attr({x: this.attrPartes[i].x, y: this.attrPartes[i].y, z: 20});
			this.e_piezas[i].initFisica();
		}
	};

	
	// verificar si todas las piezas del primer piso ya están ubicadas
	this.primerPisoBien = function() {
		return (this.e_piezas[2].colocada && this.e_piezas[3].colocada && this.e_piezas[4].colocada && this.e_piezas[5].colocada && this.e_piezas[6].colocada && this.e_piezas[7].colocada && this.e_piezas[8].colocada && this.e_piezas[9].colocada);
	},

	//
	// 
	/**
	 * Invocada por cada bloque al ser fijado
	 * verificar si ya se han colocados todos los numeros.
	 * @param int numHueco El número de hueco más aproximado a la pieza.
	 */
	this.piezaColocada = function(numPieza, numHueco) {
		// Ocultamos el hueco correspondiente
		if (this.e_huecos[numHueco].visible) {
			this.e_huecos[numHueco].ocultar();
			this.e_piezas[numPieza].e_hueco = this.e_huecos[numHueco];
		}
		
		if (!this.e_piezas[0].visible) {
			if (this.primerPisoBien()) {
				this.e_piezas[0].aparecer({ x: 56, y: 380, rotation: 0 });
				this.e_piezas[1].aparecer({ x: 619, y: 227, rotation: 90 });
				
				this.particulas.x = this.e_piezas[0]._x;
				this.particulas.y = this.e_piezas[0]._y;
				this.particulas.deltaOriX = this.e_piezas[0]._w;
				this.particulas.deltaOriY = this.e_piezas[0]._h;
				this.particulas.iniciar();
				
				this.particulas2.x = this.e_piezas[1]._x;
				this.particulas2.y = this.e_piezas[1]._y;
				this.particulas2.deltaOriX = this.e_piezas[1]._w;
				this.particulas2.deltaOriY = this.e_piezas[1]._h;
				this.particulas2.iniciar();
				
				this.e_huecos[0].mostrar();
				this.e_huecos[1].mostrar();
			}
		}
		else {
			if (this.primerPisoBien() && this.e_piezas[0].colocada && this.e_piezas[1].colocada) {
				this.ganarActividad();
			}
		}
	};
	
	// Inicializar partículas
	this.initParticulas = function() {
		this.particulas = new Particulas({
			componentes: "spr_fuegosArt, SpriteAnimation",
			z: 600,
			vx: 0,
			deltaVx: 4,
			periodo: 10,
			deltaOriY: 5, deltaOriX: 5,
			numParticulas: 16,
			magnitud: 100,
			duracion: 20,
			atenuacion: 80,
			f_crear: function(ent) {
				ent.reel("quemar", 400, [[0, 0], [23, 0], [46, 0], [69, 0]]).animate("quemar", -1);
			}
		});
		
		this.particulas2 = new Particulas({
			componentes: "spr_fuegosArt, SpriteAnimation",
			z: 600,
			vx: 0,
			deltaVx: 4,
			periodo: 10,
			deltaOriY: 5, deltaOriX: 5,
			numParticulas: 16,
			magnitud: 100,
			duracion: 20,
			atenuacion: 80,
			f_crear: function(ent) {
				ent.reel("quemar", 400, [[0, 0], [23, 0], [46, 0], [69, 0]]).animate("quemar", -1);
			}
		});
		return this;
	};
	
	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		return this;
	};

	this.ganarActividad = function() {
		gesActividad.temporizador.parar();
		
		Crafty("P6Parte").each(function() {
			this.removeComponent(this.spr).addComponent(this.spr + "N");
			this.unbind("EnterFrame");
			this.unbind("MouseDown");
			this.unbind("MouseUp");
			world.DestroyBody(this.body);
		});
		
		Crafty.e("DelayFrame").delay(function() {
			gesActividad.mostrarPuntaje();
		}, 60);
		
		return this;
	};
};