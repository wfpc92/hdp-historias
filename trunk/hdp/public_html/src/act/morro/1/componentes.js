/**
 * Componentes de Morro - Actividad 1
 */

Crafty.c("M1Capa", {
	posYmostrar: 0, // Posición Y de la capa en su lugar adecuado
	posYocultar: 0, // Posición Y de la capa oculta
	tiempoTween: 25, // ms de duración del tween completo de aparecer / desaparecer
	estado: -2, // -2: oculto e invisible. -1: ocultando. 1: mostrando. 2: mostrandose y visible

	init: function() {
		this.requires("2D, Canvas, Tweener");
		this.visible = false;
		return this;
	},
	// NumCapa: de 0 a 20 (de abajo a arriba).
	// yMostrar: posición Y de la capa en su lugar adecuado
	// yOcultar: posición Y de la capa en su lugar oculto
	M1Capa: function(spr, numCapa, yMostrar, yOcultar) {
		this.requires(spr + numCapa);
		this.posYmostrar = yMostrar;
		this.posYocultar = yOcultar;
		//this.y = yMostrar;
		this.y = yOcultar;
		return this;
	},
	mostrar: function() {
		this.visible = true;
		this.cancelTweener();

		this.estado = 1;
		this.addTween({y: this.posYmostrar}, 'easeInOutQuad', this.tiempoTween, function() {
			this.estado = 2;
		});

		return this;
	},
	ocultar: function() {
		this.cancelTweener();
		this.estado = -1;
		this.addTween({y: this.posYocultar}, 'easeInOutQuad', this.tiempoTween, function() {
			this.visible = false;
			this.estado = -2;
		});
		return this;
	}
});


Crafty.c("H1_Personaje", {
	init: function() {
		this.requires("2D, Canvas, Tweener");
	},
	caminar: function(attr) {
		this.addTween({x: attr.x, y: attr.y}, "linear", attr.t);
		return this;
	}
});