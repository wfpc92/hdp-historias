Crafty.defineScene("Inicio", function() {
	
	// Cargamos recursos de esta escena antes de renderizar
	cargarRecursos(Recursos.global, false, function() {
		Crafty.e("2D, Canvas, Color").attr({ w:1280, h:800 }).color("#FFFFFF");

		Crafty.e("2D, Canvas, Image")
				.attr({ x: 467, y: 320, z: 1 })
				.image("img/carga/pvd-titulo.png");

		Crafty.e("2D, Canvas, Image")
				.attr({ x: 184, y: 626, z: 1 })
				.image("img/carga/pvd-logos.png");


		// Cargamos recursos del menú principal y mostramos su escena
		cargarRecursos(Recursos.menuPrincipal, false, function() {
			var objCortina = new Cortina();
			objCortina.aparecer(80, 'menuPrincipal');
		});
	});
});

