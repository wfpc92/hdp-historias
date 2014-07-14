Crafty.c("AC_Perdiste", {
	e_fondo: null, // transparencia que cubre toda la pantalla
	e_btSalir: null,
	e_btReiniciar: null,
	
	init: function() {
		
		this.requires("2D, Canvas, Image, Persist")
								.attr({ y: 140, z: 10000 }).image("img/global/perdiste.png");
		this.e_fondo = Crafty.e("2D, Canvas, Color, Persist")
								.attr({ w:1280, h:800, z:9999, alpha:0.75 })
								.color("#000000");
								
		
		this.e_btSalir = Crafty.e("Boton, Tweener, Persist")
								.attr({ x: 70, y: this._y + 371, z: this._z })
								.Boton("sprPAU_btSalir", "sprPAU_btSalir2");
		this.e_btReiniciar = Crafty.e("Boton, Tweener, Persist")
								.attr({ x: 174, y: this._y + 370, z: this._z })
								.Boton("sprPAU_btReiniciar", "sprPAU_btReiniciar2");
						
		this.ocultar();
		
		// Acciones de los botones
		var self = this;
		
		// Volver al menú de cuadros
		this.e_btSalir.bind("MouseUp", function() {
			self.ocultar();
			gesActividad.terminar();
			if (Crafty.isPaused()) Crafty.pause(); // despausamos crafty	
			Crafty.scene('MenuCuadros');
		});
		
		// Reiniciar esta actividad
		this.e_btReiniciar.bind("MouseUp", function() {
			self.ocultar();
			if (Crafty.isPaused()) Crafty.pause(); // despausamos crafty	
			gesActividad.reiniciar();
		});
	},
	
	mostrar: function() {
		this.visible = true;
		this.e_fondo.visible = true;
		this.e_btSalir.visible = true;
		this.e_btReiniciar.visible = true;
		//Crafty.pause();
		Crafty.trigger("RenderScene");
		return this;
	},
	
	ocultar: function() {
		console.log(Crafty.isPaused());
		if (Crafty.isPaused()) Crafty.pause();
		this.visible = false;
		this.e_fondo.visible = false;
		this.e_btSalir.ocultar();
		this.e_btReiniciar.ocultar();
		return this;
	}
});