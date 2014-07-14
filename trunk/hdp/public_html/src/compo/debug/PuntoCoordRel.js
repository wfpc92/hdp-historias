/* Componenete que permite obtener un array con todos los puntos
 * por los que se ha pasado, presionar ESPACIO para 
 * guardar la coordenada, presionar la tecla E para imprimir las coordenadas
 * COORDENADAS RELATIVAS A LA ENTIDAD */
Crafty.c('PuntoCoordRel', {
	e_punto: null,
	
	init: function() {
		var e_padre = this;
		this.e_punto = Crafty.e('2D, Canvas, Image, Keyboard, Draggable')
				.image('img/otros/mira-coords.png')
				.attr({x: this.x, y: this.y, z: 50000, w: 31, h: 31});
		
		this.e_punto.coordenadas = [];
		
		this.e_punto.bind('KeyDown', function() {
			if (this.isDown('E')) {
				var txt = "[";
				var primer = true;
				for (i = 0 ; i < this.coordenadas.length ; i++) {
					if (primer) { primer = false; }
					else { txt += ","; }
					txt += "[" + this.coordenadas[i][0] + "," + this.coordenadas[i][1] + "]";
				}
				txt += "]";
				console.log(txt);
			}
			else if (this.isDown('UP_ARROW')) { this.y -= 1; }
			else if (this.isDown('DOWN_ARROW')) { this.y += 1; }
			else if (this.isDown('RIGHT_ARROW')) { this.x += 1; }
			else if (this.isDown('LEFT_ARROW')) { this.x -= 1; }
			else if (this.isDown('SPACE')) {
				Crafty.e("2D, Canvas, Color").attr({ w: 3, h: 3, x: this.x + 14, y: this.y + 14, z: 49999 }).color("#FFFFFF");
				this.coordenadas.push([this.x + 15 - e_padre.x, this.y + 15 - e_padre.y]);
			}
		});
		
		return this;
	}
});