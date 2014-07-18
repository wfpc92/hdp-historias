/**
 * Actividad parque caldas, armar la estructura monumento del FJCaldas
 * @returns {ActParque1}
 */
var ActParque1 = function() {
	//con esta cantidad se gana la actividad
	this.totAciertos = 4;
	//tiempo en que se cambia de un topo a otro (milisegundos)
	this.duracion = 20000;
	//si se ha ganado la actividad
	this.actividadGanada = false;
	//si se ha ganado la actividad
	this.aciertos = 0;
	this.movDesordenar = 20; // Movimientos restantes por desordenar
	this.ultFicha = -1; // número de la última ficha accionada

	this.init = function() {
		var self = this;
		Crafty.e('2D, Canvas, Color')
				.attr({x: 0, y: 0, z: 0, h: 800, w: 1280})
				.color("#1A1A1A");
		
		Crafty.e('2D, Canvas, Image')
				.attr({x: 300, y: 0, z: 0, h: 800, w: 1280})
				.image("img/act/parque/1/fondo.png");

		this.crearEntidades();
		
		// Para el desordenar, cambiar la velocidad con la que se mueve 
		Crafty("P1BloqueManz").each(function() {
			this.velMov = 5;
		});
		
		this.desordenar();
		Crafty("P1BloqueManz").each(function() {
				this.mostrarNumero(false);
		});
		this.e_btPregunta.bind("MouseDown", function() {
			Crafty("P1BloqueManz").each(function() {
				this.mostrarNumero(true);
				var self = this;
				Crafty.e("DelayFrame").delay(function() {
					self.mostrarNumero(false);
				}, 90);
			});
		});
		
		Crafty("P1Nube").each(function() {
			this.x0 = this.x;
			this.vx = Crafty.math.randomNumber(0.05, 0.5);
			this.bind("EnterFrame", function() {
				this.x += this.vx;
				if (this.x > 1280) {
					this.y = Crafty.math.randomInt(0, 600);
					this.x = -this.w;
				}
			});
		});

		return this;
	};

	this.crearEntidades = function() {
		var self = this;
		//objeto indicador de posiciones del juego
		this.juegoB = {
			posiciones: [
				[{x: 320, y: 0, z: 10}, {x: 549, y: 0, z: 10}, {x: 778, y: 0, z: 10}],
				[{x: 320, y: 233, z: 10}, {x: 549, y: 233, z: 10}, {x: 778, y: 233, z: 10}],
				[{x: 320, y: 465, z: 10}, {x: 549, y: 465, z: 10}, {x: 778, y: 465, z: 10}]
			],
			matriz: [[1, 1, 1], [1, 1, 1], [1, 1, 0]],
			manzanas: [],
			posicionesOK: function() {
				self.ganarActividad();
			}
		};
		//representacion matricial de las manzanas
		this.manzFondo = [];//fondo del juego
		var count = 0; //var local contador
		for (var i = 0; i < this.juegoB.matriz.length; i++) {
			for (var j = 0; j < this.juegoB.matriz[0].length; j++) {
				var posx = this.juegoB.posiciones[i][j].x;
				var posy = this.juegoB.posiciones[i][j].y;
				var posz = this.juegoB.posiciones[i][j].z;
				//dibujar fondo del juego
				this.manzFondo[i] = Crafty.e("2D, Canvas")
						.attr({x: posx, y: posy, z: posz - 1});
				
				if (this.juegoB.matriz[i][j] === 1) {
					this.juegoB.manzanas[count] = Crafty.e("P1BloqueManz")
							.attr({x: posx, y: posy, z: posz})
							.P1BloqueManz(count, this.juegoB, i, j);
					count += 1;
				}
			}
		}

		//mostrar las nubes
		Crafty.e("2D, Canvas, sprP1_nube0, P1Nube").attr({x: 56, y: 200, z: 50});
		Crafty.e("2D, Canvas, sprP1_nube1, P1Nube").attr({x: 941, y: 237, z: 50});
		Crafty.e("2D, Canvas, sprP1_nube2, P1Nube").attr({x: 532, y: 510, z: 50});
		Crafty.e("2D, Canvas, sprP1_nube2, P1Nube").attr({x: 766, y: 411, z: 50});
		
		//dibujar el boton de ayuda
		this.e_btPregunta = Crafty.e('Boton, Tweener')
				.attr({ z: 60, visible: false })
				.Boton("sprP1_btPregunta", "sprP1_btPregunta2")
				.posIni(1094, 540);
	};

	// Desordena el puzzle aleatoriamente
	this.desordenar = function() {
		this.moverAleatorio();
		this.movDesordenar--;
		
		var self = this;
		if (this.movDesordenar > 0) {
			Crafty.e("DelayFrame").delay(function() {
				self.desordenar();
			}, 5);
		}
		else {
			// ya terminamos de desordenar
			this.e_btPregunta.visible = true;
			
			Crafty("P1BloqueManz").each(function() {
				this.velMov = 15;
				this.mostrarNumero(false);
				this.bloqueado = false;
				
				// Mostramos el gesto de tap en las fichas que se puedan mover
				if (this.puedeMoverse()) {
					Crafty.e("Gesto")
						.Gesto(1, { coords: [(this.columna * 236) + 425, (this.fila * 236) + 100], duracion: 100, retardo: 40 });
				}
			});
		}
	};
	
	// Realiza un movimiento aleatorio cualquiera
	this.moverAleatorio = function() {
		var movido = false;
		var posRandom;
		while (!movido) {
			posRandom = randomInt(0, 7);
			if (posRandom !== this.ultFicha) {
				movido = this.juegoB.manzanas[posRandom].accionar();
			}
		}
		this.ultFicha = posRandom;
	};

	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		return this;
	};

	this.ganarActividad = function() {
		Crafty("P1BloqueManz").each(function() {
			this.bloqueado = false;
		});
		
		gesActividad.temporizador.parar();
		gesActividad.mostrarPuntaje();
	};
};