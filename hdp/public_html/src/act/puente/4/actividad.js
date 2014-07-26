/**
 */
var ActPuente4 = function() {
	//con esta cantidad se gana la actividad
	this.totAciertos = 12;
	//si se ha ganado la actividad
	this.aciertos = 0;
	
	this.numDestapadas = 0; // num fichas actualmente destapadas
	this.e_olla = null;
	this.e_destapada1 = null; // referencia a ficha destapada 1
	this.e_destapada2 = null; // referencia a ficha destapada 2
	this.e_fichas = new Array(24); // arreglo de entidades de fichas
	
	this.e_aviso1 = null; // entidades para avisar que se tomò una pareja corecta
	this.e_aviso2 = null;

	this.init = function() {
		this.crearEntidades();
		this.initParticulas();
		
		Crafty.e("Gesto")
				.Gesto(1, { coords: [130, 127], duracion: 145, retardo: 40, deltaX: 145 });
		
		return this;
	};

	// Construir entidades de la escena
	this.crearEntidades = function() {
		Crafty.e("2D, Canvas, Image").image("img/act/puente/4/fondo.jpg");
		Crafty.e("2D, Canvas, Image").attr({ x: 42, y: 40 }).image("img/act/puente/4/tablero.png");
		this.e_olla = Crafty.e("H4_Olla").mostrar();
		
		// Avisos
		this.e_aviso1 = Crafty.e("Advertencia");
		this.e_aviso2 = Crafty.e("Advertencia");
		
		// fichas con símbolos aleatorios
		var arrSimbolos = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12];
		var i = 0, posX = 65, posY = 63;
		var indice, numSimbolo;
		for (i = 0 ; i < 24 ; i++) {
			do {
				indice = randomInt(0, 23);
				numSimbolo = arrSimbolos[indice];
				arrSimbolos[indice] = 0;
			} while (numSimbolo === 0);
			
			this.e_fichas[i] = Crafty.e("H4_Ficha")
									.attr({ x: posX, y: posY })
									.H4_Ficha(i, numSimbolo, this);
			posX += 145;
			if (posX > 1100) {
				posX = 65;
				posY += 150;
			}
		}
	};
	
	// Callback invocado al destapar una ficha
	this.fichaDestapada = function(e_ficha) {
		var self = this;
		this.numDestapadas++;
		console.log("destapadas: " + this.numDestapadas);
		
		if (this.numDestapadas === 1) {
			this.e_destapada1 = e_ficha;
		}
		else if (this.numDestapadas === 2) {
			// Hay 2 destapadas, hay que compararlas
			this.e_destapada2 = e_ficha;
			var e_ficha1 = this.e_destapada1;
			var e_ficha2 = this.e_destapada2;
			
			// comparar y ocultar
			if (e_ficha1.numSimbolo === e_ficha2.numSimbolo) {
				this.aciertos++;
				
				// Mostrar los avisos de pareja correcta
				this.e_aviso1.attr({ x: e_ficha1._x + 125, y: e_ficha1._y - 70 }).mostrar(0, 50);
				this.e_aviso2.attr({ x: e_ficha2._x + 125, y: e_ficha2._y - 70 }).mostrar(0, 50);
				e_ficha1.ganada = true;
				e_ficha2.ganada = true;
				
				// Si no son sangre cal o barro, ocultarlas
				var simbolo = e_ficha1.numSimbolo;
				if (simbolo < 10) {
					Crafty.e("DelayFrame").delay(function() {
						e_ficha1.remover();
						e_ficha2.remover();
					}, 50);
				}
				else {
					// Si es un ingrediente, agregarlo a la olla
					Crafty.e("DelayFrame").delay(function() {
						self.particulas.iniciar();
					}, 17);
					
					this.e_olla.agregarIngrediente(simbolo - 10);
				}
				
				this.numDestapadas -= 2;
				
				if (this.aciertos === this.totAciertos) {
					this.ganarActividad();
				}
			}
			else {
				// Las fichas son diferentes, volverlas a tapar
				Crafty.e("DelayFrame").delay(function() {
					console.log("tapando automaticamente")
					e_ficha1.tapar();
					e_ficha2.tapar();
					
				}, 60);
			}
		} else if (this.numDestapadas === 3) {
			// Hay varias destapadas y queremos mostrar otra? forzar tapar las 2 anteriores!
			var e_ficha1 = this.e_destapada1;
			var e_ficha2 = this.e_destapada2;
			console.log("forzar tapar!");
			console.log("ficha 1 tapada: " + e_ficha1.tapada);
			console.log("ficha 2 tapada: " + e_ficha2.tapada);
			var numActual = e_ficha.num;
			for (i = 0 ; i < 24 ; i++) {
				if (i !== numActual) { 
					if (!this.e_fichas[i].tapada && !this.e_fichas[i].ganada) {
						this.e_fichas[i].tapar();
					}
				}
			}
			
			this.e_destapada1 = e_ficha;
		}
		
		return this;
	},
	
	
	// Inicializar partículas
	this.initParticulas = function() {
		this.particulas = new Particulas({
			componentes: "spr_partCubo, SpriteAnimation",
			x: 570, y: 630, z: 600,
			vx: 0,
			deltaVx: 15,
			periodo: 20,
			deltaOriX: 70, deltaOriY: 40,
			numParticulas: 16,
			magnitud: 180,
			duracion: 40,
			atenuacion: 15,
			f_crear: function(ent) {
				ent.reel("rotar", 400, [[0, 0], [40, 0], [80, 0], [120, 0]]).animate("rotar", -1);
			}
		});
		
		return this;
	};
	
	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		return this;
	};

	this.ganarActividad = function() {
		/*gesActividad.temporizador.parar();
		Crafty.e("DelayFrame").delay(function() {
			gesActividad.mostrarPuntaje();
		}, 60);*/
		
		return this;
	};
};