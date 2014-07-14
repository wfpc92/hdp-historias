Crafty.c('PisoBox2D', {
	coordenadas: [],
	piso: [],
	init: function() {
		this.requires('2D, Canvas, Box2D');
	},
	dibujarPiso: function() {
		for (var i = 0; i < this.coordenadas.length - 1; i++) {
			this.piso[i] = Crafty.e('2D, Canvas, Box2D')
					.box2d({
						bodyType: 'static',
						shape: [this.coordenadas[i], this.coordenadas[i + 1]]
					});
		}
		return this;
	}
});