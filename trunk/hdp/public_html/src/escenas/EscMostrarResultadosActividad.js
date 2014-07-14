Crafty.defineScene("MostrarResultadosActividad", function() {

	console.log('Iniciando Escena MostrarResultadosActividad');

	var numero = juego.actividad.tActividad;
	var i = 0;
	var tmp = function() {
		var tex = Crafty.e('2D, Canvas, CajaTexto')
				.attr({x: 60, y: 80})
				.setTexto(i + '')
				.mostrarPag();
		setTimeout(function() {
			i += 100;
			tex.limpiarPantalla();
			if (i < numero) {
				tmp();
			}
			else {
				Crafty.e('2D, Canvas, CajaTexto')
						.attr({x: 60, y: 80})
						.setTexto(numero + '')
						.mostrarPag();
			}
		}, 40);
	};
	tmp();


	//colocar fondo de actividad
	Crafty.e('Fondo');

	Crafty.e('2D, Canvas, sprBotonReiniciar, Mouse')
			.attr({x: 500, y: 700})
			.bind('MouseDown', function() {
				juego.actualizarActividad();
				Crafty("CajaTexto").destroy();
				Crafty.scene('Actividad');
			});
	Crafty.e('2D, Canvas, sprBotonSalir, Mouse')
			.attr({x: 600, y: 700})
			.bind('MouseDown', function() {
				Crafty("CajaTexto").destroy();
				Crafty.scene("Postal");
			});
	Crafty.e('2D, Canvas, sprBotonSiguiente, Mouse')
			.attr({x: 700, y: 700})
			.bind('MouseDown', function() {
				Crafty("CajaTexto").destroy();
				juego.subNivel = juego.subNivel + 1;
				if (juego.subNivel > 6) {
					//aqui supongo que pasa al test
				} else {
					juego.actualizarActividad();
					Crafty.scene('Actividad');
				}
			});

	console.log('Finalizando Escena MostrarResultadosActividad');
});

