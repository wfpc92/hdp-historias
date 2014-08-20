/**
 * Valencia1: actividad de aplausos
 * Esta interacción es basada en la interacción de los morritos (morro 4). 
 * está la gente del publico escuchando el discurso. Si tocas a alguien, 
 * aparece la animación de aplaudir o la animación de estar en desacuerdo.
 * 
 * La animación de desacuerdo es que aparezca el icono pequeño, se vuelve 
 * grande temporalmente y rebota para volver a ser pequeño (todo muy rapido)y se queda pequeño.
 * a animación de aplauso es igual, pero cuando esta grande salen las manitos
 * y se rotan aplaudiendo 2 o 3 veces, luego se esconden las manitos y queda  pequeño.
 * La interacción es tocar las personas y acumular sólo los que están aplaudiendo 
 * sin tocar ninguno de los malos. Si toca alguno malo se esconden TODOS y toca
 *  volver a comenzar (esto para dificultad adicional porque esta interacción está 
 *  mas fácil que la del morro).
 */
var ActValencia1 = function() {
	//con esta cantidad se gana la actividad
	this.totAciertos = 4;
	//si se ha ganado la actividad
	this.actividadGanada = false;
	//si se ha ganado la actividad
	this.aciertos = 0;

	this.init = function() {
		var actividad = this;
		this.attrCab = [
			{x: 136, y: 370}, {x: 264, y: 346}, {x: 380, y: 376},
			{x: 508, y: 350}, {x: 632, y: 356}, {x: 758, y: 354},
			{x: 878, y: 354}, {x: 998, y: 354}, {x: 1118, y: 362},
			//segunda fila
			{x: 196, y: 468}, {x: 316, y: 474}, {x: 436, y: 474},
			{x: 558, y: 468}, {x: 686, y: 462}, {x: 806, y: 464},
			{x: 930, y: 458}, {x: 1054, y: 466}
		];
		this.crearEntidades();

		for (var i = 0; i < this.area.length; i++) {
			var area = this.area[i];
			if (area.acuerdo) {
				//area.color("green")
				area.animar = area.animAcuerdo;
				var figura = area.e_figura;
				figura.attr({
					x: this.area[i].x + 8,
					y: this.area[i].y - 55,
					visible: true
				}).V1_Figura("sprV1_caraBien").attrInicial();

				figura.manoIzq = Crafty.e("2D, Canvas, sprV1_aplauso1")
						.attr({x: figura.x - 5, y: figura.y - 70, z: figura.z + 1, visible: true});
				figura.manoDer = Crafty.e("2D, Canvas, sprV1_aplauso2")
						.attr({x: figura.x + 75, y: figura.y - 70, z: figura.z + 1, visible: true});
				figura.exc = Crafty.e("2D, Canvas, sprV1_excAplauso")
						.attr({visible: true});
				figura.attach(figura.manoIzq)
						.attach(figura.manoDer)

				figura.cllMostrar = function() {
					var self = this;
					actividad.aumentarContador();

					this.exc.attr({x: this.x - 50, y: this.y - 150, visible: true});
					self.manoIzq.visible = true;
					self.manoDer.visible = true;

					Crafty.e("DelayFrame").delay(function() {
						self.exc.visible = true;
					}, 10);
					Crafty.e("DelayFrame").delay(function() {
						self.exc.visible = false;
					}, 20);
					Crafty.e("DelayFrame").delay(function() {
						self.exc.visible = true;
					}, 30);
					Crafty.e("DelayFrame").delay(function() {
						self.attrInicial();
						self.exc.visible = false;
					}, 40);
				};
			}
			else {
				//area.color("red");
				area.animar = area.animDesacuerdo;
				var figura = area.e_figura;
				figura.V1_Figura("sprV1_caraMal").attr({visible: false});
				figura.cllMostrar = function() {
					actividad.contadorCeros();
					Crafty.e("DelayFrame").delay(function() {
						Crafty("V1_Figura").each(function() {
							this.ocultar();
						});

					}, 40)
				};
			}
		}
		return this;
	};

	this.crearEntidades = function() {
		Crafty.e("2D, Canvas, Image").image("img/act/valencia/1/fondo.png");
		var numAreas = 17,
				areaTF = new Array(numAreas),
				contAc = 0;
		this.area = [];
		this.totAciertos = 13;

		//seleccionar posiciones aleatorias para el acuerdo o desacuerdo.
		while (contAc < this.totAciertos) {
			var pos = Crafty.math.randomInt(0, numAreas - 1);
			if (!areaTF[pos]) {
				contAc += 1;
				areaTF[pos] = true;
			}
		}

		for (var i = 0; i < numAreas; i++) {
			var acDes = areaTF[i];
			this.area[i] = Crafty.e("V1_Area")
					.attr({w: 93, h: 308, z: 20 + i, alpha: 0.3 + i / 20})
					.attr(this.attrCab[i])
					.V1_Area(acDes);
		}

		this.e_contador = Crafty.e("Contador, Mouse")
				.attr({x: 615, y: 40, w: 100, h: 100})
				.Contador("sprV1_numero");
	};



	this.verificar = function() {
		if (++this.aciertos >= this.totAciertos) {
			this.ganarActividad();
		}
		return this;
	};

	this.aumentarContador = function() {
		this.e_contador.aumentar();
		this.verificar();
		return this;
	};

	this.contadorCeros = function() {
		this.e_contador.setContador(0);
		this.aciertos = 0;
		return this;
	};

	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		return this;
	};

	this.ganarActividad = function() {
		gesActividad.temporizador.parar();
		gesActividad.mostrarPuntaje();
		return this;
	};
};