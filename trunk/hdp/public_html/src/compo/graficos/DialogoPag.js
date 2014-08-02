Crafty.c("DialogoPag", {
	e_cubierta: null, // Cubierta para evitar eventos del mouse
	e_ventana: null, // Ventana de fondo
	paginas: null, // Arreglo de callbacks de páginas
	e_btCerrar: null, // Botón de cerrar diálogo
	e_btAnterior: null, // Botón de ant pag
	e_btSiguiente: null, // Botón de sig pag
	e_numPagActual: null, // Paginador: número de página actual
	e_numPagTotal: null, // Paginador: número total de página
	e_numPagSepara: null, // Paginador: separador
	
	z0: 10100, // z base del diálogo
	x0: 0, // Coordenadas relativas para pasar a las entidades internas
	y0: 0,
	anchoMargen: 0, // Tamaño de la ventana (incluídos márgenes)
	altoMargen: 0,
	numPag: -1, // Número de página actualmente visible
	titulo: "", // (Opcional) Título
	
	f_callback: null, // Invocar al cerrar el diálogo
	
	init: function() {
		var z0 = this.z0;
		
		this.e_cubierta = Crafty.e("2D, Canvas, Color, Mouse")
								.attr({ w:1280 , h: 800, z: z0 - 1, alpha: 0.5, visible: false })
								.color("#222222");
		this.e_ventana = Crafty.e("Ventana").ocultar();
		this.e_btCerrar = Crafty.e("Boton")
						.attr({ z: z0 + 1000 })
						.Boton("sprGL_btCancelar", "sprGL_btCancelar2")
						.ocultar();
		this.e_btAnterior = Crafty.e("Boton")
						.attr({ z: z0 + 1000 })
						.Boton("sprGL_btAnterior", "sprGL_btAnterior2")
						.ocultar();
		this.e_btSiguiente = Crafty.e("Boton")
						.attr({ z: z0 + 1000 })
						.Boton("sprGL_btSiguiente", "sprGL_btSiguiente2")
						.ocultar();		
		this.paginas = [];
		
		this.e_numPagActual = Crafty.e("DialDigito").attr({ z: z0 + 1000, visible: false }).DialDigito(1);
		this.e_numPagTotal = Crafty.e("DialDigito").attr({ z: z0 + 1000, visible: false }).DialDigito(1);
		this.e_numPagSepara = Crafty.e("DialDigito").attr({ z: z0 + 1000, visible: false }).sprite(0, 320);
		
		// Al destruir, destruir también el contenido de todas las páginas
		this.bind("Remove", function() {
			for (i = 0 ; i < this.numPag ; i++) {
				Crafty("PAG" + i).each(function() {
					this.destroy();
				});
			}
		});
		
		// Cerrar el diálogo al hacer click en el botón cerrar
		var self = this;
		this.e_btCerrar.f_callback = function() {
			self.ocultar();
			if (self.f_callback) self.f_callback();
		};
		
	},
	
	// El ancho y alto son el area "efectiva". Se agregarán márgenes automáticamente
	DialogoPag: function(ancho, alto, titulo) {
		if (titulo) this.titulo = titulo;
		
		this.anchoMargen = ancho + 60;
		this.altoMargen = alto + 120;
		
		if (titulo) {
			this.e_titulo = Crafty.e("BloqueTexto").attr({ z: this.z0, visible: false }).BloqueTexto(titulo, false);
			this.altoMargen += this.e_titulo._h;
			this.y0 += 30 + this.e_titulo._h;
		}
		this.e_ventana.Ventana(this.anchoMargen, this.altoMargen);
		
		// posicionamos ahora que existe la ventana
		this.y0 += this.e_ventana._y;
		this.x0 = this.e_ventana._x + 30;
		
		var yPaginador = this.e_ventana._y + this.altoMargen - 80;
		this.e_btAnterior.y = yPaginador;
		this.e_btSiguiente.y = yPaginador;
		
		var self = this;
		this.e_btAnterior.f_callback = function() { self.anterior(); };
		this.e_btSiguiente.f_callback = function() { self.siguiente(); };
		
		// colocamos el título opcional
		if (titulo) {
			this.e_titulo.x = this.e_ventana._x + ((this.anchoMargen - this.e_titulo._w) / 2);
			this.e_titulo.y = this.e_ventana._y + 20;
		}
		
		this.e_btCerrar.x = this.e_ventana._x + this.anchoMargen - 20;
		this.e_btCerrar.y = this.e_ventana._y - 40;
		
		return this;
	},
	
	// Muestra la página especificada
	mostrarPag: function(num) {
		// Ocultamos página anterior
		if (this.numPag >= 0) {
			Crafty("PAG" + this.numPag).each(function() {
				this.visible = false;
			});
		}
		
		// Mostramos la siguiente página
		Crafty("PAG" + num).each(function() {
			this.visible = true;
		});
		
		this.numPag = num;
		this.mostrarPaginador();
		
		return this;
	},
	
	// Muestra la siguiente página
	siguiente: function() {
		var sigPag = this.numPag + 1;
		this.mostrarPag(sigPag);
		this.e_numPagActual.setDigito(sigPag + 1);
		return this;
	},
	
	// Muestra la página anterior
	anterior: function() {
		var sigPag = this.numPag - 1;
		this.mostrarPag(sigPag);
		this.e_numPagActual.setDigito(sigPag + 1);
		return this;
	},
	
	// Agrega una página al diálogo
	// Cada pagina es una función que construye las entidades de la página
	// Todas las entidades de la página deben tener el componente PAG<n>, donde n es el número de página
	// El número de página se pasa por parámetro a la función (p.num) para concatenarlo fácilmente
	agregarPag: function(f_crearPagina) {
		var nuevoNum = this.paginas.length;
		
		f_crearPagina({
			ent: this,
			num: nuevoNum,
			x: this.x0,
			y: this.y0,
			z: this.z0
		});
		
		// Inicialmente ocultamos las entidades de la página
		var self = this;
		Crafty("PAG" + nuevoNum).each(function() {
			this.visible = false;
			this.z += self.z0 + 1;
		});
		
		this.paginas.push(f_crearPagina);
		
		return this;
	},
	
	// Muestra el paginador
	mostrarPaginador: function() {
		var yPaginador = this.e_ventana._y + this.altoMargen - 80;
		var xCentro = this.e_ventana._x + (this.anchoMargen / 2);
		
		if (this.numPag === 0) {
			// Sólo mostrar el siguiente
			this.e_btAnterior.ocultar();
			this.e_btSiguiente.attr({ x: xCentro - 33 + 100, visible: true });
		}
		else if (this.numPag < this.paginas.length - 1) {
			// Mostrar ambos
			this.e_btAnterior.attr({ x: xCentro - 33 - 100, visible: true });
			this.e_btSiguiente.attr({ x: xCentro - 33 + 100, visible: true });
		}
		else {
			// Sólo mostrar anterior
			this.e_btSiguiente.ocultar();
			this.e_btAnterior.attr({ x: xCentro - 33 - 100, visible: true });
		}
		
		this.e_numPagActual.attr({ x: xCentro - 10 - 32, y: yPaginador + 20 });
		this.e_numPagSepara.attr({ x: xCentro - 16, y: yPaginador + 18 });
		this.e_numPagTotal.attr({ x: xCentro + 10, y: yPaginador + 20 });
		
		return this;
	},
	
	// Muestra el diálogo
	mostrar: function() {
		this.e_ventana.mostrar();
		this.e_cubierta.visible = true;
		this.e_btCerrar.visible = true;
		this.e_titulo.mostrar();
		
		this.e_numPagActual.visible = true;
		this.e_numPagTotal.DialDigito(this.paginas.length);
		this.e_numPagTotal.visible = true;
		this.e_numPagSepara.visible = true;
		
		this.mostrarPag(0);
		
		return this;
	},
	
	// Ocultar el diálogo sin destruirlo
	// @TODO: destruir todo
	ocultar: function() {
		// ocultamos las entidades de la página
		var self = this;
		Crafty("PAG" + this.numPag).each(function() {
			this.visible = false;
		});
		
		this.e_cubierta.visible = false;
		this.e_btCerrar.ocultar();
		this.e_ventana.ocultar();
		this.e_btAnterior.ocultar();
		this.e_btSiguiente.ocultar();
		this.e_titulo.ocultar();
		
		this.e_numPagActual.visible = false;
		this.e_numPagTotal.visible = false;
		this.e_numPagSepara.visible = false;
		
		return this;
	}
});

// Digito de paginación en el diálogo
Crafty.c("DialDigito", {
	num: 0,
	
	init: function() {
		this.requires("2D, Canvas, sprGL_dialDigito, Tweener");
	},
	
	DialDigito: function(n) {
		this.num = n;
		this.sprite(0, n * 32);
		
		return this;
	},
	
	setDigito: function(num) {
		if (this.num !== num) {
			this.cancelTweener();
			
			var y0 = this._y;
			this.addTween({ y: y0 - 10, alpha: 0.1 }, "easeInCubic", 10, function() {
				this.sprite(0, num * 32);
				this.num = num;
				this.addTween({ y: y0, alpha: 1 }, "easeOutCubic", 10);
			});
		}
		
		return this;
	}
});