// Describe un botón con una posición inicial almacenada, que al hacerle click muestra una sprite diferente
// Tiene un posible estado de bloqueo
// inicializar con Boton(nomSprNormal, nomSprActivo)
Crafty.c("Boton", {
	spriteNormal: "",
	spriteActivo: "",
	xIni: 0, // Coordenadas donde aparece normalmente el botón
	yIni: 0,
	e_btActivo: null, // Entidad que temporalmente aparece mostrando el estado activo
	bloqueado: false, // poner en true cuando no debería responder a eventos
	
	init: function() {
		this.requires("2D, Canvas, Mouse");
		this.e_btActivo = Crafty.e("2D, Canvas, Tweener").attr({ alpha: 0.0, visible: false });
	},
	
	habilitar: function() {
		this.bloqueado = false;
		return this;
	},
	bloquear: function() {
		this.bloqueado = true;
		return this;
	},
	
	// setter de las coords iniciales
	posIni: function(x, y) {
		this.xIni = x;
		this.yIni = y;
		this.x = x;
		this.y = y;
		return this;
	},
	
	Boton: function(nomSprNormal, nomSprActivo) {
		this.addComponent(nomSprNormal);
		this.e_btActivo.addComponent(nomSprActivo).attr({ x: this._x, y: this._y, z: 99999 });
		if (this.has("Persist"))
			this.e_btActivo.addComponent("Persist");
		
		this.attach(this.e_btActivo);
		
		this.bind("MouseDown", function(e) {
			if (!this.bloqueado) {
				this.mostrarActivo();
			}
		}).bind("MouseUp", function(e) {
			if (!this.bloqueado) {	
				this.ocultarActivo();
			}
		}).bind("MouseOut", function(e) {
			if (!this.bloqueado) {
				this.ocultarActivo();
			}
		});
		
		return this;
	},
	
	mostrarActivo: function() {
		this.e_btActivo.attr({ visible: true }).addTween({ alpha: 1.0 }, "linear", 5);
		return this;
	},
	ocultarActivo: function() {
		if (this.e_btActivo._visible && this.e_btActivo._alpha > 0) {
			this.e_btActivo.attr({ alpha: 1.0 }).addTween({ alpha: 0.0 }, "linear", 5, function() { this.visible = false; });
		}
		return this;
	},
	
	// muestra el botón en un fadeIn
	aparecer: function() {
		this.attr({ alpha: 0, visible: true }).addTween({ alpha: 1.0 }, "linear", 5);
		return this;
	},
	
	// Oculta de inmediato el botón y su entidad de estado activo
	ocultar: function() {
		this.visible = false;
		this.e_btActivo.visible = false;
		return this;
	}
});