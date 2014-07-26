var ActMorro5 = function() {
	//con esta cantidad se gana la actividad
	this.totAciertos = 0;
	//tiempo en que se cambia de un topo a otro (milisegundos)
	this.duracion = 0;
	//si se ha ganado la actividad
	this.actividadGanada = false;
	this.e_barra = null;

	this.init = function() {
		this.attrPasto = {x: 0, y: 1174 - 301, z: 3};
		this.attrComplementoPolea = {x: 664, y: 0, z: 4};
		this.attrPolea = {x: 926, y: 516, z: 10};
		this.attrCuerda = {x: 688, y: 277, z: 1};
		this.attrCuerdaEntrePoleas = {x: 750, y: 262, z: 1};
		this.attrVasija = {x: 648, y: 940, z: 2};
		this.attrNudo = {x: 669, y: 920, z: 2};
		this.polPasto = new Crafty.polygon([
			[4, 245], [637, 125], [695, 135], [777, 108],
			[1102, 78], [1274, 78], [1274, 300], [3, 300]]);

		this.coordPisoBox2D = [
			[126, 794], [360, 749], [637, 704],
			[686, 716], [709, 715], [766, 690],
			[966, 671], [1164, 657], [1271, 655]
		];
		
		this.e_barra = Crafty.e("M5_Barra").attr({ x: 919, y: 175 });

		var posp = 305;
		this.attrPiedras = [
			{x: 516, y: posp + 690, z: 2}, {x: 566, y: posp + 635, z: 2},
			{x: 669, y: posp + 630, z: 2}, {x: 732, y: posp + 645, z: 2}
		];
		this.attrShapePiedras = [
			[[1, 5], [8, 1], [24, 0], [45, 13], [45, 20], [39, 22], [10, 24], [0, 15]],
			[[2, 61], [35, 15], [65, 0], [82, 2], [109, 19], [113, 38], [91, 64], [50, 76], [8, 72]],
			[[19, 2], [65, 11], [67, 16], [59, 28], [40, 39], [7, 34], [1, 25]],
			[[2, 22], [20, 4], [49, 5], [64, 23], [50, 37], [11, 46], [1, 41]]
		];

		this.fondo = Crafty.e("2D, Canvas, sprM5_fondo, Tweener");

		this.pasto = Crafty.e('2D, Canvas, sprM5_pasto')
				.attr(this.attrPasto);

		this.complementoPolea = Crafty.e("2D, Canvas, sprM5_ganchos")
				.attr(this.attrComplementoPolea);

		this.polea = Crafty.e('Ventilador, sprM5_manivela');
		this.polea.attr(this.attrPolea).origin(89, 118);
		this.polea.incremento = 0.1;
		this.polea.va = 2; //this.velocidadAngular;
		this.polea.af = -0.015; //this.aceleracionFriccion;
		this.polea.base = Crafty.e('2D, Canvas');

		this.cuerda = Crafty.e('sprM5_cuerdaAnimada')
							.addComponent('CuerdaAnimada')
							.attr(this.attrCuerda);
		this.cuerda.maxH = this.cuerda.h;

		this.cuerdaEntrePoleas = Crafty.e('sprM5_cuerdaEntrePoleasAnimada')
										.addComponent('CuerdaAnimada')
										.attr(this.attrCuerdaEntrePoleas);
		this.cuerdaEntrePoleas.rotation = -39;

		this.vasija = Crafty.e('Vasija')
							.Vasija(this.attrVasija, this.attrNudo, this.polea, this.cuerda, this.cuerdaEntrePoleas, this);
		this.vasija.fuerzaMax = 4;

		Crafty.e('2D, Canvas, Box2D')
				.box2d({
					bodyType: 'static',
					shape: [[336, 749], [641, 699], [641, 800], [336, 800]]
				});

		Crafty.e('2D, Canvas, Box2D')
				.box2d({
					bodyType: 'static',
					shape: [[751, 684], [1014, 659], [1014, 800], [751, 800]]
				});

		this.piedras = [];
		for (var i = 0; i < 4; i++) {
			this.piedras[i] = Crafty.e('2D, Canvas, piedraCollision, sprM5_piedra' + (1 + i));
			this.piedras[i].attr(this.attrPiedras[i]);
			this.fondo.attach(this.piedras[i]);
		}

		this.fondo.attach(this.pasto);
		this.fondo.attach(this.complementoPolea);
		this.fondo.attach(this.polea);
		this.fondo.attach(this.cuerda);
		this.fondo.attach(this.cuerdaEntrePoleas);
		this.fondo.attach(this.vasija);

		this.fondo.attrShapePiedras = this.attrShapePiedras;
		this.fondo.piedras = this.piedras;
		this.fondo.vasija = this.vasija;
		this.fondo.polea = this.polea;
		
		//animacion principal y colocar piedras con fisica//200
		var self = this;
		this.fondo.addTween({ x: this.fondo.x, y: this.fondo.y - 301 }, 'easeInOutCubic', 165, function() {
			self.e_barra.mostrar();
			self.asignarFisica();
		});

		Crafty.e("Gesto")
				.Gesto(3, {coords: [1012, 632], duracion: 155, retardo: 40, radio: 90, desplY: -3.2 });
		
		return this;
	};

	this.asignarFisica = function() {
		for (var i = 0; i < this.attrShapePiedras.length; i++) {
			this.piedras[i].addComponent('Box2D');
			this.piedras[i].box2d({
				bodyType: 'dynamic',
				shape: this.attrShapePiedras[i],
				friction: 1,
				density: 0.5,
				restitution: 0.1
			});
		}

		this.vasija.crearVolumen();
		this.polea.barra = this.vasija;
		this.polea.arrancar();
		this.polea.origin(89, 118);
	};

	this.ganarActividad = function() {
		gesActividad.temporizador.parar();
		gesActividad.mostrarPuntaje();
		this.terminarActividad();
	};

	// tareas finales
	this.terminarActividad = function() {
		this.vasija.detener();
		//this.polea.bloquear();
		return this;
	};
};