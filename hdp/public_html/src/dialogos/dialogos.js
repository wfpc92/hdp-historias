// Construye y muestra el diálogo "Cómo jugar"
function dialComoJugar(f_callback) {
	var dialComoJugar = Crafty.e("DialogoPag").DialogoPag(512, 512, "\bCómo jugar\b");
	dialComoJugar.f_callback = f_callback;
	
	dialComoJugar.agregarPag(function (p) {
		Crafty.e("2D, Canvas, sprGL_dialComoJugar, PAG" + p.num)
				.sprite(0, 0)
				.attr({ x: p.x, y: p.y });
	})
	.agregarPag(function (p) {
		Crafty.e("2D, Canvas, sprGL_dialComoJugar, PAG" + p.num)
				.sprite(512, 0)
				.attr({ x: p.x, y: p.y });
	})
	.agregarPag(function (p) {
		Crafty.e("2D, Canvas, sprGL_dialComoJugar, PAG" + p.num)
				.sprite(0, 512)
				.attr({ x: p.x, y: p.y });
	})
	.agregarPag(function (p) {
		Crafty.e("2D, Canvas, sprGL_dialComoJugar, PAG" + p.num)
				.sprite(512, 512)
				.attr({ x: p.x, y: p.y });
	});
	
	dialComoJugar.mostrar();
}