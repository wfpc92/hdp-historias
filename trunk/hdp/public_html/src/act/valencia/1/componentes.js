
Crafty.c("V1_Area", {
	init: function() {
		this.requires("2D, Canvas, Mouse, Color")
	},
	V1_Area: function(acuerdo) {
		this.acuerdo = acuerdo;
		this.e_figura = Crafty.e("V1_Figura").attr({z: this.z + 1});
		this.bind("MouseDown", this.eventoMouse);
		return this;
	},
	eventoMouse: function() {
		//this.unbind("MouseDown");
		this.animar();
	},
	animAcuerdo: function() {
		this.e_figura.mostrar();
		return this;
	},
	animDesacuerdo: function() {
		this.e_figura.mostrar();
		return this;
	}
});



Crafty.c("V1_Figura", {
	cllMostrar: null,
	cllOcultar: null, //funcion que se ejecuta luego de mostrar
	w0: 0,
	h0: 0,
	init: function() {
		this.requires("2D, Canvas, Tweener");
	},
	V1_Figura: function(spr) {
		this.requires(spr);
		this.x0 = this.x;
		this.y0 = this.y;
		this.w0 = this.w;
		this.h0 = this.h;
		return this;
	},
	mostrar: function() {
		this.attr({
			x: this.x0,
			y: this.y0,
			w: this.w0 * 0.6,
			h: this.h0 * 0.6,
			visible: true
		}).addTween({
			x: this.x - 40,
			y: this.y - this.h0,
			w: this.w0,
			h: this.h0
		}, 'easeOutSine', 10, this.cllMostrar)
		return this;
	},
	attrInicial: function() {
		this.cancelTweener();
		this.addTween({
			x: this.x0,
			y: this.y0,
			w: this.w0 * 0.6,
			h: this.h0 * 0.6
		}, 'easeOutSine', 8);
		return this;
	},
	ocultar: function() {
		this.cancelTweener();
		this.addTween({
			x: this.x0,
			y: this.y0 + 20,
			w: this.w0 * 0.6,
			h: this.h0 * 0.6
		}, 'easeOutSine', 8, function() {
			this.visible = false;
		});
		return this;
	}
})