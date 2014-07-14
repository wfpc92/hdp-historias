Crafty.c('BotonSeleccionMultiple', {
	numeroPregunta: -1,
	textoRespuesta: null,
	init: function() {
		this.requires('2D, Canvas, sprBoton, Mouse');
		this.textoRespuesta = Crafty.e('CajaTexto');
	},
	setNumeroPregunta: function(numeroPregunta) {
		this.numeroPregunta = numeroPregunta;
		return this;
	},
	setRespuesta: function(textoRespuesta) {
		this.textoRespuesta.setTexto(textoRespuesta);
		this.dibujarRespuesta(15,15);
		return this;
	},
	/**
	 * Dibuja el texto con su respectiva respuesta
	 * precondicion: ya ha sido asignado un texto
	 * @param {type} pdx pixeles que se le aumentan a boton.x
	 * @param {type} pdy pixeles que se le aumentan a boton.y
	 * @param {type} z 
	 * @returns {Anonym$0}
	 */
	dibujarRespuesta: function(pdx, pdy) {
		var boton = this;
		//console.log('x: '+(boton.x + pdx)+', y: '+(boton.y + pdy)+', w: '+(boton.w)+', h: '+(boton.h));
		this.textoRespuesta.attr({
			x: boton.x + pdx,
			y: boton.y + pdy,
			w: boton.w,
			h: boton.h
		});
		this.textoRespuesta.mostrarPag();
		return this;
	}

});
