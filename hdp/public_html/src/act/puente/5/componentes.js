Crafty.c("H5_Topo", {
	init: function() {
		this.requires("2D, Canvas, Tweener, Mouse")
				.bind("MouseDown", function() {
					this.bajar();
				});
	},
	H5_Topo: function(attr) {
		var self = this;
		this.tSubida = attr.ts;
		this.tEstadia = attr.te;
		this.tBajada = attr.tb;

		this.posXInicial = this.x;
		this.posYInicial = this.y;
		this.posXFinal = this.x;
		this.posYFinal = this.y - this.h;

		return this;
	},
	subir: function() {
		var self = this;
		this.cancelTweener();
		this.addTween({x: this.posXFinal, y: this.posYFinal}, 'easeOutBack', this.tSubida, function() {
			Crafty.e("DelayFrame").delay(function() {
				self.bajar();
			}, this.tEstadia);
		});
		return this;
	},
	bajar: function() {
		var self = this;
		this.cancelTweener();
		this.addTween({x: this.posXInicial, y: this.posYInicial}, 'easeInOutBack', this.tBajada, function() {
			Crafty.e("DelayFrame").delay(function() {
				self.subir();
			}, this.tEstadia);
		});
		return this;
	}
});