/**
 * Actividad de numneros, el jugador debe tomar unos numeros
 * y arrastraslos hacia unas lineas punteadas
 * para formar el numero "1537"
 * @returns {ActBelalcaz1}
 */
var ActBelalcaz1 = function() {
	//con esta cantidad se gana la actividad
	this.totAciertos = 4;
	//tiempo en que se cambia de un topo a otro (milisegundos)
	this.duracion = 20000;
	//si se ha ganado la actividad
	this.actividadGanada = false;
	//si se ha ganado la actividad
	this.aciertos = 0;
	this.particulas = null;

	this.init = function() {
		var est = this;
		var areaNumeros = [];
		var numeros = [];
		var wmax = 544 / 4;
		var cont = 0;
		var numI = [1, 5, 3, 7];

		//colocar fondo de actividad
		Crafty.e('2D, Canvas, sprB1_fondo')
				.attr({x: 0, y: 0, z: 0});
		Crafty.e('2D, Canvas, sprB1_priPlano')
				.attr({x: 0, y: 479, z: 5});

		// Fuegos artificiales
		this.particulas = new Particulas({
			componentes: "spr_fuegosArt, SpriteAnimation",
			x: 375, y: 120, z: 600,
			vx: 0,
			deltaVx: 5,
			periodo: 6,
			deltaOriY: 193, deltaOriX: 504,
			numParticulas: 10,
			magnitud: 125,
			duracion: 63,
			atenuacion: 22,
			f_crear: function(ent) {
				ent.reel("quemar", 400, [[0, 0], [23, 0], [46, 0], [69, 0]]).animate("quemar", -1);
			}
		});
		

		//crear las areas de empate para los numeros.
		for (var i = 0; i < 4; i++) {
			areaNumeros[i] = Crafty.e('AreaCajon')
					.addComponent('sprB1_numFecha' + (1 + i))
					.attr({x: 368 + (i * (544 / 4)), y: 118, z: 2});
			areaNumeros[i].numero = numI[i];
		}

		numI = [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 2, 5, 3, 1, 7, 8, 5, 7];

		for (var i = 0; i < numI.length; i++) {
			//efecto de caida de los numeros al inicio de la actividad
			setTimeout(function() {
				//rangos de posiciones donde se ubicaran los numeros que caen
				var xPos = Crafty.math.randomNumber(100 + wmax, 850);

				//obtener un elemento del array de los numeros que van a caer
				var elem = Crafty.math.randomElementOfArray(numI);
				var index = numI.indexOf(elem);
				var I = parseInt(numI.splice(index, 1));

				//componentes que representan los numeros que son arrastrables
				numeros[cont] = Crafty.e('Arrastrable, sprB1_numBel' + I);
				numeros[cont].attr({x: xPos, y: -numeros[cont].h, z: 3});
				//asignar una velocidad en x aleatoria para efecto de dispercion
				numeros[cont].vx = Crafty.math.randomElementOfArray([Crafty.math.randomNumber(-6, -3), Crafty.math.randomNumber(3, 6)]);
				numeros[cont].spr = "sprB1_numBel" + I;
				numeros[cont].act = est;

				//el area es seleccionada solo si es un numero que pertenece al conjunto [1,5,3,7]
				var k = I === 1 ? 0 :
						((I === 5) ? 1 :
								((I === 3) ? 2 :
										((I === 7) ? 3 : -1)));
				if (k !== -1) {
					//asignar area de empate solo a los numeros que coinciden en sus sprites
					numeros[cont].areaCajon = areaNumeros[k];
				}
				cont++;
			}, Crafty.math.randomInt(0, 200));
		}
		
		Crafty.e("Gesto")
				.Gesto(2, { coords: [574, 550], coordsFin: [574, 216], repetir: 2, retardo: 40, desplX: 146 });
		
		return this;
	};

	//verificar si ya se han colocados todos los numeros.
	this.arrastreCompleto = function() {
		//contar el numero de entidades de tipo Completo
		this.aciertos = Crafty("Completo").length;
		if (this.aciertos === this.totAciertos) {
			this.ganarActividad();
		}
	};



	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		return this;
	};



	this.ganarActividad = function() {
		gesActividad.temporizador.parar();
		var est = this;
		//ocultar cada numero despues de ganar la actividad. efecto de ocultarse
		Crafty("Arrastrable").each(function() {
			this.addTween({x: this.x, y: 800}, 'easeOutQuad', Crafty.math.randomInt(40, 80), function() {
				this.destroy();
			});
		});
		var caballo = Crafty.e("Caballo").Caballo("sprB1_caballo");
		var posCX = -caballo.w;
		var posCY = 428;
		caballo.attr({x: posCX, y: posCY, z: 4});
		var baseEstandarte = Crafty.e("2D, Canvas, sprB1_baseEst, Tween")
				.attr({x: posCX + 172, y: 288, z: caballo.z - 1});
		var estandarte = Crafty.e("2D, Canvas, sprB1_estandarte, Tween")
				.attr({x: posCX + 130, y: 340, z: baseEstandarte.z + 1});

		estandarte.dir = 1;
		estandarte.maxR = 20;
		estandarte.dR = 2;
		estandarte.rango = estandarte.maxR;
		estandarte.origin(estandarte.w / 2, 0)
				.bind("EnterFrame", function() {
					this.rotation += this.dir * this.dR;
					if (this.rotation > this.maxR) {
						this.dir = -1;
						this.maxR = Crafty.math.randomNumber(this.rango, this.rango + 5);
						this.dR = Crafty.math.randomNumber(1, 2);
					}
					if (this.rotation < -this.maxR) {
						this.dir = 1;
						this.maxR = Crafty.math.randomNumber(this.rango, this.rango + 5);
						this.dR = Crafty.math.randomNumber(1, 2);
						this.rango -= 1;
					}
					if (this.rango < 0) {
						this.rotation = 0;
						this.unbind("EnterFrame");
					}
				});

		baseEstandarte.rotation = 10;
		baseEstandarte.attach(estandarte);
		caballo.attach(baseEstandarte);

		caballo.caminar({x: 800, y: caballo.y}, 40, function() {
			baseEstandarte.tween({x: baseEstandarte.x, y: baseEstandarte.y - 60, rotation: 0}, 120);
			caballo.detach(baseEstandarte);
			baseEstandarte.bind("TweenEnd", function() {
				est.particulas.iniciar();
				baseEstandarte.tween({x: baseEstandarte.x, y: baseEstandarte.y + 60}, 60);
				baseEstandarte.unbind("TweenEnd");
				setTimeout(function() {
					estandarte.unbind("EnterFrame");
					estandarte.tween({rotation: 0}, 1000);
				}, 500);

				caballo.caminar({x: 1280 + caballo.w, y: caballo.y}, 40, function() {
					gesActividad.mostrarPuntaje();
				});
			});
		});
	};

};