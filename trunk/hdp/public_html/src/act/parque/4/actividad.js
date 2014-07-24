/**
 * Actividad de los ataudes, consiste en arrastrar los ataudes sobre una serie de obstaculos
 * intentar no tocarlos para hacerlos enchoclar sobre los huecos.
 * @returns {ActParque4}
 */
var ActParque4 = function() {
	this.e_piso = null; // Entidad que se pasa como referencia para el MouseBind
	//con esta cantidad se gana la actividad
	this.totAciertos = 4;
	//tiempo en que se cambia de un topo a otro (milisegundos)
	this.duracion = 20000;
	//si se ha ganado la actividad
	this.actividadGanada = false;
	//si se ha ganado la actividad
	this.aciertos = 0;
	this.b2a = new B2arrastre();
	this.grupoBarras = new Array(4); // Arreglo de entidades P4Barras
	
	this.init = function() {
		this.crearEntidades();
		this.b2a.init(this.e_piso);
		Crafty("P4Barra").each(function() {
			this.arrancar();
		});
		Crafty.e("2D, Canvas, Image").attr({x: 568, y: -6, z: 20}).image("img/act/parque/4/lampara.png");
		Crafty.e("2D, Canvas, Image").attr({x: 132, y: -48, z: 20}).image("img/act/parque/4/lampara.png");
		return this;
	};
	this.crearEntidades = function() {
		var self = this;
		//crear fondo
		Crafty.e("2D, Canvas, Image").image("img/act/parque/4/fondo.jpg").attr({x: 0, y: 0, z: 0});
		var piso = Crafty.e("2D, Canvas, Image").image("img/act/parque/4/piso.png");
		piso.attr({y: Crafty.viewport.height - piso.h, z: 10});
		
		//aqui van 4 barras grandes
		this.grupoBarras[0] = Crafty.e("P4Barras").P4Barras("sprP4_barraM0", 3, 33, 140, 1, 184, 1);
		//aqui van 4 barras pequeñas
		this.grupoBarras[1] = Crafty.e("P4Barras").P4Barras("sprP4_barraM1", 4, 93, 270, 1.5, 225, -1);
		//aqui van 2 barras grandes estaticas
		this.grupoBarras[2] = Crafty.e("P4Barras").P4Barras("sprP4_barraE0", 2, 38, 370, 0, 320, 0);
		//aqui van 5 barras pequeñas 
		this.grupoBarras[3] = Crafty.e("P4Barras").P4Barras("sprP4_barraM1", 5, 39, 500, 2, 118, 1);
		
		this.posCofres = [
			{x: 11, y: 622}, {x: 95, y: 631}, {x: 177, y: 638},
			{x: 258, y: 643}, {x: 340, y: 644}, {x: 425, y: 643},
			{x: 515, y: 642}, {x: 595, y: 634}, {x: 678, y: 626},
			{x: 772, y: 620}, {x: 856, y: 615}, {x: 941, y: 609},
			{x: 1025, y: 608}, {x: 1105, y: 607}, {x: 1190, y: 613}
		];
		this.cofres = [];
		var numCofres = this.posCofres.length;
		for (var i = 0; i < numCofres; i++) {
			var forma = [[0,9],[37,0],[74,8],[70,46],[7,46]];
			var hueco = Crafty.e("P4Hueco").P4Hueco(this);
			this.cofres[i] = Crafty.e("P4Cofre").attr(this.posCofres[i]).P4Cofre(this, forma);
			var posx = 61 + (this.cofres[i].w + 1) * i; //posicion en el ejex
			hueco.attr({x: posx, y: 68, w: this.cofres[i].w, h: this.cofres[i].h});
		}

		var piso = Crafty.e("PisoBox2D");
		piso.coordenadas = [
			[0, 668], [130, 682], [296, 692], [524, 688],
			[718, 670], [940, 656], [1110, 654], [1276, 666]
		];
		piso.dibujarPiso();
		Crafty.e('2D, Canvas, Box2D').attr({x:0,y:-800,w:1280,h:800}).box2d({bodyType: 'static', shape: 'box'});
		Crafty.e('2D, Canvas, Box2D').attr({x:-800,y:0,w:800,h:800}).box2d({bodyType: 'static', shape: 'box'});
		Crafty.e('2D, Canvas, Box2D').attr({x:1280,y:0,w:800,h:800}).box2d({bodyType: 'static', shape: 'box'});
		this.e_piso = Crafty.e('2D, Canvas, Box2D').attr({x:0,y:800,w:1280,h:800}).box2d({bodyType: 'static', shape: 'box'});
		if (!cocoon) {
			//Crafty.box2D.showDebugInfo();
		}
	};
	//verificar si ya se han colocados todos los numeros.
	// Invocada por cada bloque al ser fijado
	this.bloqueFijado = function() {
		this.aciertos++;
		if (this.aciertos >= this.totAciertos) {
			this.ganarActividad();
		}
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