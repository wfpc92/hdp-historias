

Crafty.c("H1_Personaje", {
	init: function() {
		this.requires("2D, Canvas, Tweener");
	},
	caminar: function(attr) {
		this.cancelTweener();
		this.addTween({x: attr.x, y: attr.y}, "linear", attr.t);
		return this;
	}
});