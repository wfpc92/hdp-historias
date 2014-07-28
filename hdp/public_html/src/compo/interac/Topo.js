Crafty.c("Topo", {
	x_inicial: 0,
	y_inicial: 0,
	tiempoSubida: 0,
	tiempoBajada: 0,
	duracionArriba: 0,
	duracionAbajo: 0,
	actividadPadre: null,
	huecos: [],
	posicion: -1,
	init: function() {
		this.requires('2D, Canvas, sprTopo, Mouse, SpriteAnimation, Tweener');
		this.z = 1;
		this.w = this.w / 3.0;
		this.h = this.h / 3.0;
	},
	setActividadPadre: function(actividadPadre) {
		this.actividadPadre = actividadPadre;
		return this;
	},
	setTiempoSubida: function(tiempoSubida) {
		this.tiempoSubida = tiempoSubida;
		return this;
	},
	setTiempoBajada: function(tiempoBajada) {
		this.tiempoBajada = tiempoBajada;
		return this;
	},
	setDuracionArriba: function(duracionArriba) {
		this.duracionArriba = duracionArriba;
		return this;
	},
	setDuracionAbajo: function(duracionAbajo) {
		this.duracionAbajo = duracionAbajo;
		return this;
	},
	setAttrHuecos: function(attrs) {
		var posXCentral = 0;
		var posYCentral = 0;
		for (var index in attrs) {
			var attr = attrs[index];
			this.huecos[index] = {};
			this.huecos[index].hueco = Crafty.e('2D, Canvas, sprHuecoFrente');
			this.huecos[index].fondo = Crafty.e('2D, Canvas, sprHuecoFondo');
			this.huecos[index].direccion = attr.direccion;
			this.huecos[index].hueco.attr({x: attr.x, y: attr.y, z: 2});

			posXCentral = this.huecos[index].hueco.x + this.huecos[index].hueco.w / 4.0;
			posYCentral = attr.y;

			if (attr.direccion == 'vertical') {
				this.huecos[index].hueco.origin(this.huecos[index].hueco.w / 2.0, this.huecos[index].hueco.h / 2.0);
				this.huecos[index].fondo.origin(this.huecos[index].fondo.w / 2.0, this.huecos[index].fondo.h / 2.0);
				this.huecos[index].hueco.rotation = 90;
				this.huecos[index].fondo.rotation = 90;
			}
			this.huecos[index].fondo.attr({x: posXCentral, y: posYCentral, z: 0});
		}
		return this;
	},
	asignarEventoMovimiento: function() {
		var topo = this;

		var animacion_salir = function() {
			var posXFinal = 0, posYFinal;
			if (topo.direccion == 'horizontal') {
				topo.rotation = 0;
				posXFinal = topo.x_inicial;
				posYFinal = topo.y_inicial - topo.h;
			}
			else if (topo.direccion == 'vertical') {
				topo.rotation = 90;
				posXFinal = topo.x_inicial + topo.w;
				posYFinal = topo.y_inicial;
			}
			topo.addTween({x: posXFinal, y: posYFinal}, 'easeOutBack', topo.tiempoSubida,
					function() {
						setTimeout(animacion_entrar, topo.duracionArriba);
					});
		};
		var animacion_entrar = function() {
			setTimeout(function() {
				topo.addTween({x: topo.x_inicial, y: topo.y_inicial}, 'easeInOutBack', topo.tiempoBajada,
						function() {
							topo.posicionAleatoria();
							animacion_salir();
						});
			}, topo.duracionAbajo);

		};
		animacion_salir();
		return this;
	},
	posicionAleatoria: function() {
		//numero aleatorio para comenzar el juego.
		var indexPosicion = 0;
		while (true) {
			indexPosicion = Crafty.math.randomInt(0, this.huecos.length - 1);
			if (indexPosicion !== this.posicion) {
				break;
			}
		}
		this.posicion = indexPosicion;
		this.direccion = this.huecos[this.posicion].direccion;
		this.x_inicial = this.huecos[this.posicion].hueco.x + (this.huecos[this.posicion].hueco.w / 4.0);
		this.y_inicial = this.huecos[this.posicion].hueco.y;
		this.x = this.x_inicial;
		this.y = this.y_inicial;
		return this;
	}
});

