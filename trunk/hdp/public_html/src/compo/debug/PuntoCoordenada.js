/*Componenete que permite obtener un array con todos los puntos
 * por los que se ha pasado, presionar una tecla cualquiera para 
 * guardar la coordenada, presionar la tecla E para imprimir las coordenadas */
Crafty.c('PuntoCoordenada', {
	coordenadas: [],
	init: function() {
		this.requires('2D, Canvas, Color, Keyboard, Draggable')
				.color('white')
				.attr({x: 900, y: 500, z: 5, w: 5, h: 5});

		this.bind('KeyDown', function() {
			if (this.isDown('E')) {
				var txt = "[";
				var primer = true;
				for (i = 0 ; i < this.coordenadas.length ; i++) {
					if (primer) { primer = false; }
					else { txt += ", "; }
					txt += "[" + this.coordenadas[i][0] + "," + this.coordenadas[i][1] + "]";
				}
				console.log(txt);
			}
			else {
				this.coordenadas.push([this.x, this.y]);
			}
		});

	}
});