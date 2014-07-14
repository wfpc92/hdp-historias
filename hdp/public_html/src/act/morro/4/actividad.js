var ActMorro4 = function() {
	this.totAciertos = 0; //con esta cantidad se gana la actividad
	this.duracion = 0;
	this.attrsMorritos = null;
	this.animacionActiva = false;
	this.e_puntaje = null;
	this.numTrampas = 4; // Número de morritos trampa
	this.morritos = []; // Arreglo con entidades de morritos
	this.particulas = null;
	    
    this.init = function() {
		Crafty.e('Fondo').image(gesActividad.config.fondo);
		Crafty.e('2D, Canvas, Image')
				.attr({ z: 2 })
				.image('img/act/morro/4/montana.png');
		
		this.e_puntaje = Crafty.e('Puntaje').attr({ x: 960, y: 21, z: 1 });
		this.e_puntaje.numero = 14;

		this.particulas = new Particulas({
			componentes: "spr_polvo, SpriteAnimation",
			x: 480, y: 440, z: 600,
			vx: 0,
			deltaVx: 2,
			periodo: 90,
			deltaOriY: 70, deltaOriX: 90,
			numParticulas: 3,
			magnitud: 10,
			duracion: 33,
			atenuacion: 12,
			f_crear: function(ent) {
				ent.reel("giro", 400, [[0, 0], [32, 0], [64, 0], [96, 0]]).animate("giro", -1);
			}
		});

		//posiciones de los morritos
		this.attrsMorritos = [
			{x: 114, y: 166, z: 5}, {x: 244, y: 156, z: 5}, {x: 375, y: 139, z: 5},
			{x: 502, y: 122, z: 5}, {x: 622, y: 101, z: 5}, {x: 745, y: 83, z: 5},
			{x: 118, y: 297, z: 5}, {x: 275, y: 291, z: 5}, {x: 419, y: 283, z: 5},
			{x: 564, y: 258, z: 5}, {x: 711, y: 234, z: 5}, {x: 866, y: 227, z: 5},
			{x: 146, y: 458, z: 5}, {x: 314, y: 460, z: 5}, {x: 479, y: 435, z: 5},
			{x: 651, y: 422, z: 5}, {x: 803, y: 398, z: 5}, {x: 954, y: 371, z: 5}
		];
		
		var attrs;
		var objPart = this.particulas;
		
		for (i = 0; i < 18; i++) {
			attrs = this.attrsMorritos[i];
			var m = Crafty.e('Morrito')
							.Morrito(i, this.e_puntaje, attrs.y, this.particulas)
							.attr(attrs);
			m.attr0 = attrs;
			
			//posicionar el hueco y la calavera
			m.e_hueco.attr({ x: attrs.x + 5, y: attrs.y + 60, z: 4 });
			m.e_calaca.attr({ x: attrs.x + 20, y: attrs.y + 35, z: 4 });
			
			this.morritos.push(m);
		}
		
		// Elegimos las posiciones de las trampas y las almacenamos en un arrray
		var arrPosTrampas = Array(this.numTrampas);
		var i, posTrampa;
		for (i = 0 ; i < this.numTrampas ; i++) {
			do {
				posTrampa = randomInt(0, 17);
			} while (arrPosTrampas.indexOf(posTrampa) > -1);
			arrPosTrampas[i] = posTrampa;
		}
		
		// Establecemos las trampas
		for (i = 0 ; i < this.numTrampas ; i++) {
			this.morritos[arrPosTrampas[i]].esTrampa();
		}
		
		this.e_puntaje.Puntaje(this, 14); // Inicializamos el objeto puntaje
		
		Crafty.e("Gesto")
				.Gesto(1, { coords: [166, 245], duracion: 150, retardo: 40, deltaX: 130, deltaY: -13 });
		
		return this;
	};

	this.ganarActividad = function() {
		gesActividad.temporizador.parar();
		gesActividad.mostrarPuntaje();
	};

	//se invoca cuando se termina el tiempo, se gana o se pierde la actividad
	this.terminarActividad = function() {
		return this;
	};
};
