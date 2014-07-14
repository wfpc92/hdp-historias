Crafty.c('BarraPoderEolico', {
	deltaDisminuir: 0,
	deltaAumentar: 0,
	h0: 0,
	posY0: 0,
	actividad: null,
	init: function() {
		this.requires('2D, Canvas, Color')
				.color('green');
		this.barraFondo = Crafty.e('2D, Canvas, Color')
				.color('blue');
		this.deltaAumentar = 2;
		this.deltaDisminuir = 1;
	},
	setActividad: function(actividad) {
		this.actividad = actividad;
		return this;
	},
	setAttr: function(attr) {
		p = 70;//porcentaje inicial de la barra vacia
		this.posY0 = (p*attr.h/100);
		this.attr({x: attr.x, y: attr.y + this.posY0, z: 1, w: attr.w, h: attr.h - this.posY0});
		this.barraFondo.attr({x: attr.x, y: attr.y, z: 0, w: attr.w, h: attr.h});
		this.h0 = attr.h;
		return this;
	},
	aumentar: function(deltaAumentar) {
		this.deltaAumentar = deltaAumentar;
		if (this.h + this.deltaAumentar >= this.h0) {
			this.actividad.terminarActividad();
		}
		else {
			this.h = this.h + this.deltaAumentar;
			this.y = this.y - this.deltaAumentar;
		}
		return this;
	},
	disminuir: function() {
		if (this.h - this.deltaDisminuir <= 0) {
			this.actividad.terminarActividad();
			this.destroy();
		}
		else {
			this.h = this.h - this.deltaDisminuir;
			this.y = this.y + this.deltaDisminuir;
		}
		return this;

	}
});

