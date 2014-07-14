/**
 * Actividad parque caldas, armar la estructura monumento del FJCaldas
 * @returns {ActParque1}
 */
var ActParque3 = function() {
	//con esta cantidad se gana la actividad
	this.totAciertos = 4;
	//tiempo en que se cambia de un topo a otro (milisegundos)
	this.duracion = 20000;
	//si se ha ganado la actividad
	this.actividadGanada = false;
	//si se ha ganado la actividad
	this.aciertos = 0;


	this.init = function() {
		this.crearEntidades();
		return this;
	};

	this.crearEntidades = function() {
		Crafty.e("2D, Canvas, Image").image("img/act/parque/3/fondo.jpg").attr({x: 0, y: 0, z: 0});

		var tope = 300;
		var numHormigas = 20;
		var dc = 10;//delta de crecimiento cuando se riega 
		var dch = 0.1;//Delta de decrecimiento cuando se la come una hormiga
		this.rama = Crafty.e("P3_Rama").attr({x: 614, y: -30}).P3_Rama(this, tope, dc, dch);
		this.regadera = Crafty.e("P3_Regadera").attr({x: 300, y: 40, z: 50}).P3_Regadera(this.rama);

		this.priplano = Crafty.e("2D, Canvas, Image").image("img/act/parque/3/primer_plano.png");
		this.priplano.attr({x: 0, y: Crafty.viewport.height - this.priplano.h, z: 1});

		this.generadorHormigas = Crafty.e("P3_GeneradorHormigas")
				.P3_GeneradorHormigas(this.rama, numHormigas);
		
		return this;
	};

	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		this.generadorHormigas.bloqueado = true;
		Crafty("Hormiga").each(function() {
			this.destroy();//eliminar las hormigas porque no son necesarias
		});
		return this;
	};

	//es invocada cuando las hormigas se comen la enredadera
	this.perder = function() {
		this.generadorHormigas.bloqueado = true;
		gesActividad.mostrarPerdiste();
		Crafty("Hormiga").each(function() {
			this.destroy();//eliminar las hormigas porque no son necesarias
		});
		return this;
	};

	this.ganarActividad = function() {
		gesActividad.temporizador.parar();
		this.generadorHormigas.bloqueado = true;
		Crafty("Hormiga").each(function() {
			this.destroy();//eliminar las hormigas porque no son necesarias
		});
		Crafty.e("Delay")
				.delay(function() {
					gesActividad.mostrarPuntaje();
				}, 500);
		return this;
	};
};
