/**
 * Valencia1: actividad de aplausos
 * Esta interacción es basada en la interacción de los morritos (morro 4). 
 * está la gente del publico escuchando el discurso. Si tocas a alguien, 
 * aparece la animación de aplaudir o la animación de estar en desacuerdo.
 *  La animación de desacuerdo es que aparezca el icono pequeño, se vuelve 
 *  grande temporalmente y rebota para volver a ser pequeño (todo muy rapido)y se queda pequeño.
 * a animación de aplauso es igual, pero cuando esta grande salen las manitos
 *  y se rotan aplaudiendo 2 o 3 veces, luego se esconden las manitos y queda  pequeño.
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

		return this;
	};

	this.crearEntidades = function() {
		Crafty.e("2D, Canvas, Image").image("img/act/valencia/1/fondo.png");
		var numPersonas = 17;
		for (var i = 0; i < numPersonas; i++) {
			Crafty.e("V1_Area")
					.attr({w: 93, h: 308, z: 20 + i})
					.attr(this.attrCab[i])
					.attr({alpha: 0.3 + i / 20})
					.V1_Area(Crafty.math.randomElementOfArray([true, false]))
		}
		Crafty.e("V1_Contador, Ubicador")

		this.e_contador = Crafty.e("Contador, Mouse")
				.attr({x: 615, y: 40, w: 100, h: 100})
				.Contador("sprV1_numero", this.aumentarContador)
				.bind("MouseDown",function(){
					this.aumentar();
				})
	};

	this.aumentarContador = function() {
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