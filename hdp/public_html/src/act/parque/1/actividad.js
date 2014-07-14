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

	this.init = function() {
		var self = this;
		Crafty.e('2D, Canvas, Color')
				.attr({x: 0, y: 0, z: 0, h: 800, w: 1280})
				.color("#1A1A1A");

		this.crearEntidades();
		//cambiar la velocidad con la que se mueve 
		//animacion inicial, revolver
		this.juegoB.manzanas[7].mover(2, 2, function() {
			self.juegoB.manzanas[4].mover(2, 1, function() {
				self.juegoB.manzanas[5].mover(1, 1, function() {
					self.juegoB.manzanas[2].mover(1, 2, function() {
						self.juegoB.manzanas[1].mover(0, 2, function() {
							self.juegoB.manzanas[0].mover(0, 1, function() {
								self.juegoB.manzanas[3].mover(0, 0, function() {
									self.juegoB.manzanas[6].mover(1, 0, function() {
										self.juegoB.manzanas[4].mover(2, 0, function() {
											self.juegoB.manzanas[5].mover(2, 1, function() {
												self.juegoB.manzanas[2].mover(1, 1, function() {
													self.juegoB.manzanas[1].mover(1, 2, function() {
														self.juegoB.manzanas[0].mover(0, 2, function() {
															self.juegoB.manzanas[3].mover(0, 1, function() {
																Crafty("P1BloqueManz").each(function() {
																	this.velMov = 25;
																	this.iniciar();
																	this.mostrarNumero();
																});
																self.e_btPregunta.bind("MouseDown", function() {
																	Crafty("P1BloqueManz").each(function() {
																		this.mostrarNumero(true);
																		var self = this;
																		setTimeout(function() {
																			self.mostrarNumero(false);
																		}, 1500);
																	});
																});
															});
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
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
				[{x: 215, y: 3, z: 10}, {x: 487, y: 3, z: 10}, {x: 759, y: 3, z: 10}],
				[{x: 215, y: 269, z: 10}, {x: 487, y: 269, z: 10}, {x: 759, y: 269, z: 10}],
				[{x: 215, y: 535, z: 10}, {x: 487, y: 535, z: 10}, {x: 759, y: 535, z: 10}]
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
				this.manzFondo[i] = Crafty.e("2D, Canvas, Image")
						.image("img/act/parque/1/manzana9.png")
						.attr({x: posx, y: posy, z: posz - 1});

				if (this.juegoB.matriz[i][j] == 1) {
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
		this.e_btPregunta = Crafty.e('Boton, Tweener').attr({z: 60})
				.Boton("sprP1_btPregunta", "sprP1_btPregunta2").posIni(1127, 540);
	};

	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		return this;
	};

	this.ganarActividad = function() {
		gesActividad.temporizador.parar();
		gesActividad.mostrarPuntaje();
	};
};