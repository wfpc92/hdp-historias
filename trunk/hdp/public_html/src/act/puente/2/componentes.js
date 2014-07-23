Crafty.c("H2_Personaje", {
	init: function() {
		this.requires("2D, Canvas, Tweener");
	},
	H2_Personaje: function(posx, posy) {
		return this;
	},
	caminar: function(attr) {
		this.cancelTweener();
		this.addTween({x: attr.x, y: attr.y}, "linear", attr.t);
		return this;
	}
});