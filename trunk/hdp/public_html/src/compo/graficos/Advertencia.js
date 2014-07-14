// Globo de advertencia para mostrar
// Puede mostrar un chulo, una equis o una exclamación, según el estado solicitado
// Aviso que se anexa al caballo
// Para usarlo, crear la advertencia y 
Crafty.c("Advertencia", {
	tipoAviso: 0, // 0: OK, 1: MAL, 2: Exclamación
	spriteActual: "",
	duracion: 0, // frames
	
	init: function() {
		this.requires("2D, Canvas, Tweener").attr({ alpha: 0, z: 900, visible: false });
	},
	
	/*
	 * Muestra el aviso en la [x,y] actual.
	 * Desaparece luego de "duracion" frames.
	 */
	mostrar: function(tipoAviso, duracion) {
		this.duracion = duracion;
		
		if (tipoAviso !== this.tipoAviso) {
			// Quitamos el Sprite anterior
			if (this.spriteActual !== "") {
				this.removeComponent(this.spriteActual);
			}

			switch (tipoAviso) {
				case 0: this.spriteActual = "sprGL_advBien"; break;
				case 1: this.spriteActual = "sprGL_advMal"; break;
				case 2: this.spriteActual = "sprGL_advExclama"; break;
			}
			this.addComponent(this.spriteActual);
		}
		
		// Mostramos temporalmente y luego escondemos
		var y0 = this._y;
		this.y -= 50;
		this.alpha = 0;
		this.visible = true;
		this.addTween({ y: y0, alpha: 1 }, "easeOutElastic", 40);
		
		var self = this;
		Crafty.e("DelayFrame").delay(function() {
			self.alpha = 0;
			self.visible = false;
		}, duracion);
		
		return this;
	}
});