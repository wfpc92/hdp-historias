/**
 * Una caja de diálogo reutilizable. puede tener botones de aceptar y cancelar, o sólo un botón de cerrar
 * Para utilizar, crear la entidad, establecer los callbacks, invocar el constructor y llamar a mostrar();
 * Ejemplo: 
 * var ec = Crafty.e("CajaDialogo")
 *					.CajaDialogo(0, "Se eliminará todo tu\n progreso.", {
 *						aceptar: function() { alert("Aceptar!"); }
 *					})
 *					.mostrar();
 */ 
Crafty.c("CajaDialogo", {
	e_cubierta: null,
	e_ventana: null,
	e_texto: null,
	e_btAceptar: null,
	e_btCancelar: null,
	f_aceptar: null, // Callback a ejecutar al aceptar
	f_cancelar: null, // Callback a ejecutar al cancelar
	
	tipo: 0, // 0: ok, 1: aceptar y cancelar
	
	init: function() {
		var z0 = 10000;
		
		this.e_cubierta = Crafty.e("2D, Canvas, Color, Mouse")
								.attr({ w:1280 , h: 800, z: z0 - 1, alpha: 0.5, visible: false })
								.color("#222222");
		this.e_ventana = Crafty.e("Ventana").ocultar();
		this.e_texto = Crafty.e("BloqueTexto").attr({ z: z0, visible: false });
		this.e_btAceptar = Crafty.e("Boton")
						.attr({ z: z0 })
						.Boton("sprGL_btAceptar", "sprGL_btAceptar2")
						.ocultar();
		this.e_btCancelar = Crafty.e("Boton")
						.attr({ z: z0 })
						.Boton("sprGL_btCancelar", "sprGL_btCancelar2")
						.ocultar();
		
		// Cerrar el diálogo al hacer click en el botón cerrar
		var self = this;
		this.e_btCancelar.f_callback = function() { self.ocultar(); };
	},
	
	/**
	 * Constructor
	 * Se deben asignar funciones de callback ANTES de invocar el constructor.
	 * @param {int} numTipo Tipo de diálogo (0, 1 o 2).
	 * @param {String} texto Texto del diálogo.
	 * @param {Object} callbacks Objeto de callbacks { aceptar: function(){}, cancelar: function(){} }.
	 */
	CajaDialogo: function(numTipo, texto, callbacks) {
		this.e_texto.BloqueTexto(texto, false, 2);
		this.tipo = numTipo;
		
		// Calculamos dimensiones de la ventana según el texto
		var tamano = this.e_texto.getDimensiones();
		var ancho = tamano[0] + 100;
		var alto = tamano[1] + 84;
		
		if (numTipo === 0) {
			alto += 80;
		} else if (numTipo === 1) {
			alto += 85;
		}
		
		this.e_ventana.Ventana(ancho, alto);
		
		// Asignamos cualidades del tipo
		switch (numTipo) {
			case 0: // Sólo botón aceptar
				this.e_btAceptar.x = this.e_ventana._x + (ancho / 2) - 33;
				this.e_btAceptar.y = this.e_ventana._y + alto - 80;
				
				var self = this;
				this.e_btAceptar.f_callback = function() {
					self.ocultar();
				};
				break;
			
			case 1: // Aceptar o cancelar
				var centroX = this.e_ventana._x + (ancho / 2);
				var centroY = this.e_ventana._y + alto - 80;
				this.e_btAceptar.x = centroX - 103;
				this.e_btAceptar.y = centroY;
				this.e_btCancelar.x = centroX + 40;
				this.e_btCancelar.y = centroY;
				break;
			
			case 2: // Sólo botón cerrar
				this.e_btCancelar.x = this.e_ventana._x + ancho - 20;
				this.e_btCancelar.y = this.e_ventana._y - 40;
				break;
		}
		
		this.e_texto.x = this.e_ventana._x + 50;
		this.e_texto.y = this.e_ventana._y + 50;
		
		// Asignamos callbacks
		var self = this;
		if (callbacks) {
			if (callbacks.aceptar) {
				this.e_btAceptar.f_callback = function() {
					callbacks.aceptar();
					self.ocultar();
				};
			};
			if (callbacks.cancelar) {
				this.e_btCancelar.f_callback = function() {
					callbacks.cancelar();
					self.ocultar();
				};
			};
		}
		
		return this;
	},
	
	// Muestra el diálogo
	mostrar: function() {
		this.e_cubierta.visible = true;
		this.e_ventana.mostrar();
		this.e_texto.mostrar();
		
		switch (this.tipo) {
			case 0:
				this.e_btAceptar.visible = true;
				break;
			case 1:
				this.e_btAceptar.visible = true;
				this.e_btCancelar.visible = true;
				break;
			case 2:
				this.e_btCancelar.visible = true;
				break;
		}
		
		return this;
	},
	
	// Oculta el diálogo
	ocultar: function() {
		this.e_cubierta.visible = false;
		this.e_btAceptar.ocultar();
		this.e_btCancelar.ocultar();
		this.e_ventana.ocultar();
		this.e_texto.ocultar();
		return this;
	}
	
});

// Ventana emergente personalizable
Crafty.c("Ventana", {
	e_esquinas: null,
	e_bordeSup: null,
	e_bordeInf: null,
	e_esqInfIzq: null,
	e_bordeDer: null,
	e_cuerpo: null,
	
	init: function() {
		this.requires("2D");
		
		this.e_esquinas = new Array(4);
		
		var i;
		this.e_bordeSup = Crafty.e("2D, Canvas, sprGL_dialBordesVert").attr({ visible: false, z: 10000 });
		this.e_bordeInf = Crafty.e("2D, Canvas, sprGL_dialBordesVert").sprite(0, 8).attr({ visible: false, z: 10000 });
		this.e_esqInfIzq = Crafty.e("2D, Canvas, sprGL_dialBordesVert").crop(0, 8, 8, 8).attr({ visible: false, z: 10000 });
		this.e_bordeDer = Crafty.e("2D, Canvas, sprGL_dialBordeDer").attr({ visible: false, z: 10000 });
		this.e_cuerpo = Crafty.e("2D, Canvas, Color").color("#363228").attr({ visible: false, z: 10000 });
		
		for (i = 0 ; i < 4 ; i++) {
			this.e_esquinas[i] = Crafty.e("2D, Canvas, Image").image("img/global/dialogo-esq.png").attr({ visible: false, z: 10000 });
		}
		
	},
	
	
	Ventana: function(ancho, alto) {
		// Calculamos x y y para que siempre esté centrada
		var x0 = ((1280 - ancho) / 2);
		var y0 = ((800 - alto) / 2) - 6;
		
		this.x = x0;
		this.y = y0;
		
		this.e_esquinas[0].attr({ x: x0 - 22, y: y0 - 20 });
		this.e_esquinas[1].attr({ x: x0 + ancho + 7, y: y0 - 20 });
		this.e_esquinas[2].attr({ x: x0 + ancho + 7, y: y0 + alto + 16 });
		this.e_esquinas[3].attr({ x: x0 - 22, y: y0 + alto + 16 });
		
		this.e_bordeSup.attr({ x: x0, y: y0 }).crop((1024 - (ancho + 8)), 0, (ancho + 8), 8);
		this.e_bordeInf.attr({ x: x0 + 8, y: y0 + alto + 8 }).crop((1024 - ancho), 0, ancho, 8);
		this.e_esqInfIzq.attr({ x: x0, y: y0 + alto + 8 });
		this.e_bordeDer.attr({ x: x0 + ancho + 0, y: y0 + 8 }).crop(0, 0, 8, alto);
		this.e_cuerpo.attr({ x: x0, y: y0 + 8 }).attr({ w: ancho + 1, h: alto + 1 });
		
		return this;
	},
	
	mostrar: function() {
		this.e_esquinas[0].visible = true;
		this.e_esquinas[1].visible = true;
		this.e_esquinas[2].visible = true;
		this.e_esquinas[3].visible = true;
		
		this.e_bordeSup.visible = true;
		this.e_bordeInf.visible = true;
		this.e_esqInfIzq.visible = true;
		this.e_bordeDer.visible = true;
		this.e_cuerpo.visible = true;
		
		return this;
	},

	ocultar: function() {
		this.e_esquinas[0].visible = false;
		this.e_esquinas[1].visible = false;
		this.e_esquinas[2].visible = false;
		this.e_esquinas[3].visible = false;
		
		this.e_bordeSup.visible = false;
		this.e_bordeInf.visible = false;
		this.e_esqInfIzq.visible = false;
		this.e_bordeDer.visible = false;
		this.e_cuerpo.visible = false;
		
		return this;
	}

});