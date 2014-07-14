Crafty.defineScene('PreguntaMultiple', function() {
	console.log('Iniciando Escena PreguntaMultiple');
	var pregunta = juego.test.siguientePregunta();

	if (juego.test.terminoTestActual()) {
		console.log('Finalizando Escena PreguntaMultiple');
		Crafty.scene('Finalizar');
		return;
	}

	/**
	 * funcion para invocar la siguiente escena y almacenar respuesta
	 * @param {type} e
	 * @returns {undefined}
	 */
	var siguienteEscena = function(e) {
		juego.test.guardarSeleccion(this.numeroPregunta);
		Crafty("BotonSeleccionMultiple").destroy();
		Crafty("CajaTexto").destroy();
		Crafty.scene('PreguntaMultiple');
	};

	//dibujar el parrafo de texto
	Crafty.e("CajaTexto")
			.attr({x: 120, y: 100, z: 0, w: 500, h: 100})
			.setTexto(pregunta.parrafo)
			.mostrarPag();

	//posicion de los botones
	var attrBotonRespuesta = [
		{x: 120, y: 200, w: 157, h: 75},
		{x: 320, y: 200, w: 157, h: 75},
		{x: 120, y: 300, w: 157, h: 75},
		{x: 320, y: 300, w: 157, h: 75}
	];

	//dibujar los botones y las respuestas
	for (var index in attrBotonRespuesta) {
		var numeroPregunta = parseInt(index) + 1;
		var respuesta = pregunta.respuestas[index];
		var botonRespuesta = Crafty.e('BotonSeleccionMultiple')
				.attr(attrBotonRespuesta[index])
				.setNumeroPregunta(numeroPregunta)
				.setRespuesta(respuesta);
		botonRespuesta.bind('MouseDown', siguienteEscena);
	}

});


