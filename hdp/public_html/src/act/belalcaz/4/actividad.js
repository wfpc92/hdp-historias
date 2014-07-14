/**
 * @returns {ActBelalcaz4}
 */
var ActBelalcaz4 = function() {
	//con esta cantidad se gana la actividad
	this.totAciertos = 4;
	//tiempo en que se cambia de un topo a otro (milisegundos)
	this.duracion = 10000;
	//si se ha ganado la actividad
	this.actividadGanada = false;
	//si se ha ganado la actividad
	this.aciertos = 0;


	this.init = function() {
		this.iniciarComponentes();

		//proporcionar tamaño de caballo y poner espada
		this.caballo.prop(0.6, "sprB4_espada");
		this.caballo.posiciones = [
			{x: 200, y: 398, t: 10},
			{x: 378, y: 400, t: 10},
			{x: 280, y: 580, t: 10},
			{x: 540, y: 50, t: 50}, // Cali
			{x: 568, y: 218, t: 40},
			{x: 888, y: 204, t: 10}
		];
		this.caballo.posActual = 0;
		var vpp = this.caballo.posiciones[this.caballo.posActual];
		this.caballo.caminar({x: vpp.x, y: vpp.y}, 20);

		this.fecQui.alpha = 0;
		this.fecGua.alpha = 0;
		this.fecCal.alpha = 0;
		this.fecPop.alpha = 0;
		this.fecNei.alpha = 0;

		this.flecha1.alpha = 0;
		this.flecha2.alpha = 0;
		this.flecha3.alpha = 0;
		this.flecha4.alpha = 0;

		this.btnQui.v = {ant: null, sig: this.btnGua, flecha: null, fecha: this.fecQui};
		this.btnGua.v = {ant: this.btnQui, sig: this.btnCal, flecha: this.flecha1, fecha: this.fecGua};
		this.btnCal.v = {ant: this.btnGua, sig: this.btnPop, flecha: this.flecha2, fecha: this.fecCal};
		this.btnPop.v = {ant: this.btnCal, sig: this.btnNei, flecha: this.flecha3, fecha: this.fecPop};
		this.btnNei.v = {ant: this.btnPop, sig: null, flecha: this.flecha4, fecha: this.fecNei};


		this.btnQui.sprOK = "sprB4_btnVerAbj";
		this.btnGua.sprOK = "sprB4_btnVerAbj";
		this.btnCal.sprOK = "sprB4_btnVerAbj";
		this.btnPop.sprOK = "sprB4_btnVerAbj";
		this.btnNei.sprOK = "sprB4_btnVerAbj";

		this.btnQui.act = this;
		this.btnGua.act = this;
		this.btnCal.act = this;
		this.btnPop.act = this;
		this.btnNei.act = this;

		return this;
	};

	this.iniciarComponentes = function() {
		//colocar fondo de actividad
		Crafty.e('2D, Canvas, sprB4_fondo').attr({z: 1});
		var map = Crafty.e('2D, Canvas, sprB4_mapa');
		map.attr({x: 266, z: 2});
		var pj = Crafty.e('2D, Canvas, sprB4_priPlano');
		pj.attr({x: 0, y: 800 - pj.h, z: 10});

		//personajes de la actividad
		//this.caballo = Crafty.e("Caballo, Ubicador").attr({x: 898, y: 34, z: 6});
		this.caballo = Crafty.e("Caballo").Caballo("sprB4_caballo").attr({x: 50, y: 398, z: 10});


		//elementos de decoracion: flechas
		this.flecha1 = Crafty.e('2D, Canvas, sprB4_flecha2, Tween').attr({x: 497, y: 527, z: 7});
		this.flecha2 = Crafty.e('2D, Canvas, sprB4_flecha1, Tween').attr({x: 394, y: 118, z: 7});
		this.flecha3 = Crafty.e('2D, Canvas, sprB4_flecha3, Tween').attr({x: 645, y: 194, z: 7});
		this.flecha4 = Crafty.e('2D, Canvas, sprB4_flecha4, Tween').attr({x: 748, y: 190, z: 7});

		//titulos de ciudades
		this.ciuCal = Crafty.e('2D, Canvas, sprB4_ciuCal').attr({x: 789, y: 115, z: 5});
		this.ciuNei = Crafty.e('2D, Canvas, sprB4_ciuNei').attr({x: 939, y: 197, z: 5});
		this.ciuPop = Crafty.e('2D, Canvas, sprB4_ciuPop').attr({x: 793, y: 267, z: 5});
		this.ciuQui = Crafty.e('2D, Canvas, sprB4_ciuQui').attr({x: 611, y: 477, z: 5});
		this.ciuGua = Crafty.e('2D, Canvas, sprB4_ciuGua').attr({x: 504, y: 660, z: 5});

		//titulos de ciudades
		this.fecQui = Crafty.e('B4_Fecha').B4_Fecha(1534).attr({x: 487, y: 345, z: 8});
		this.fecGua = Crafty.e('B4_Fecha').B4_Fecha(1535).attr({x: 376, y: 530, z: 8});
		this.fecCal = Crafty.e('B4_Fecha').B4_Fecha(1536).attr({x: 661, y: 0, z: 8});
		this.fecPop = Crafty.e('B4_Fecha').B4_Fecha(1537).attr({x: 665, y: 152, z: 8});
		this.fecNei = Crafty.e('B4_Fecha').B4_Fecha(1539).attr({x: 814, y: 70, z: 8});

		this.btnQui = Crafty.e('B4_Boton').B4_Boton(0).attr({ x: 518, y: 446, z: 5 });
		this.btnGua = Crafty.e('B4_Boton').B4_Boton(1).attr({ x: 408, y: 632, z: 5 });
		this.btnCal = Crafty.e('B4_Boton').B4_Boton(2).attr({ x: 692, y: 100, z: 5 });
		this.btnPop = Crafty.e('B4_Boton').B4_Boton(3).attr({ x: 700, y: 254, z: 5 });
		this.btnNei = Crafty.e('B4_Boton').B4_Boton(4).attr({ x: 844, y: 166, z: 5 });
	};

	this.sigPosCaballo = function() {
		this.caballo.posActual += 1;
		var vpp = this.caballo.posiciones[this.caballo.posActual];
		this.caballo.caminar({x: vpp.x, y: vpp.y}, vpp.t);
	};

	this.iniPosCaballo = function() {
		this.caballo.posActual = 0;
		var vpp = this.caballo.posiciones[this.caballo.posActual];
		this.caballo.caminar({x: vpp.x, y: vpp.y}, 30);
	};

	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		return this;
	};

	this.ganarActividad = function() {
		gesActividad.temporizador.parar();
		var self = this;
		console.log("ganar actividad");
		setTimeout(function() {
			self.caballo.caminar({x: self.caballo._x + 100, y: -200 }, 75, function() {
				gesActividad.mostrarPuntaje();
			});
		}, 500);
	};
};
