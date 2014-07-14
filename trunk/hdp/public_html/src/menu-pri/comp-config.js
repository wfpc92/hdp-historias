// Diálogo de reestablecer progreso
Crafty.c("MP_DialogReset", {
	e_texto: null,
	e_btAceptar: null,
	e_btCancelar: null,
	f_callback: null, // Invocar al hacer ocultar este diálogo
	
	init: function() {
		this.requires("2D, Canvas, Image, Tweener")
				.attr({ x: 315, y: 200, z: 9000, alpha: 0, visible: false })
				.image("img/menu-pri/fon-dialogo.png");
		
		this.e_texto = Crafty.e("BloqueTexto")
						.attr({ x: this._x + 85, y: this._y + 130, z: 9001 })
						.BloqueTexto("Se eliminará todo tu progreso.\n\b¿Estás de acuerdo?", false)
						.ocultar();
		this.e_btAceptar = Crafty.e("Boton")
						.attr({ x: this._x + 226, y: this._y + 302, z: 9001 })
						.Boton("sprMI_btAceptar", "sprMI_btAceptar2")
						.ocultar();
		this.e_btCancelar = Crafty.e("Boton")
						.attr({ x: this._x + 353, y: this._y + 302, z: 9001 })
						.Boton("sprMI_btCancelar", "sprMI_btCancelar2")
						.ocultar();
				
		// Acciones
		var self = this;
		
		this.e_btCancelar.bind("MouseUp", function() {
			self.ocultar();
		});
		
		this.e_btAceptar.bind("MouseUp", function() {
			resetProgreso();
			self.ocultar();
		});
	},
	
	mostrar: function() {
		this.visible = true;
		this.addTween({ alpha: 1 }, "linear", 5, function() {
			this.e_texto.mostrar();
			this.e_btAceptar.visible = true;
			this.e_btCancelar.visible = true;
		});
		
		return this;
	},
	
	ocultar: function() {
		this.visible = false;
		this.alpha = 0;
		this.e_texto.ocultar();
		this.e_btAceptar.ocultar();
		this.e_btCancelar.ocultar();
		this.f_callback();
		return this;
	}
});


Crafty.c("Scroller", {
	scrY: 0,
	altoReal: 0,
	vy: 0,
	hMarco: 0,
	
	init: function() {
		this.requires("2D, Canvas");
	},
	
	Scroller: function(nomSprite, vy, hMarco) {
		this.vy = vy;
		this.addComponent(nomSprite);
		this.altoReal = this._h;
		this.hMarco = hMarco;
		this.h = hMarco;
		this.sprite(0, -this.hMarco, this._w, this.hMarco);
		
		return this;
	},
	
	scroll: function() {
		this.sprite(0, this.scrY, this._w, this.hMarco);
		this.scrY += this.vy;
		
		if (this.scrY >= this.altoReal) {
			this.unbind("EnterFrame");
		}
	},
	
	mostrar: function() {
		this.scrY = -this.hMarco;
		this.bind("EnterFrame", this.scroll);
		this.visible = true;
		
		return this;
	},
	
	ocultar: function() {
		this.visible = false;
		this.unbind("EnterFrame");
		return this;
	}
});

// Diálogo de créditos
Crafty.c("MP_DialogCredi", {
	e_scroll: null,
	e_btAceptar: null,
	f_callback: null, // Invocar al hacer ocultar este diálogo
	
	init: function() {
		this.requires("2D, Canvas, Image, Tweener")
				.attr({ x: 315, y: 200, z: 9000, alpha: 0, visible: false })
				.image("img/menu-pri/fon-dialogo.png");
		
		this.e_scroll = Crafty.e("Scroller")
						.attr({ x: this._x + 65, y: this._y + 45, z: 9001, visible: false })
						.Scroller("sprMI_creditos", 0.6, 320);
		this.e_btAceptar = Crafty.e("Boton")
						.attr({ x: this._x + 290, y: this._y + 375, z: 9001 })
						.Boton("sprMI_btAceptar", "sprMI_btAceptar2")
						.ocultar();
		
		// Acciones
		var self = this;
		
		this.e_btAceptar.bind("MouseUp", function() {
			self.ocultar();
		});
	},
	
	mostrar: function() {
		this.visible = true;
		this.addTween({ alpha: 1 }, "linear", 5, function() {
			this.e_scroll.mostrar();
			this.e_btAceptar.visible = true;
		});
		
		return this;
	},
	
	ocultar: function() {
		this.visible = false;
		this.alpha = 0;
		this.e_scroll.ocultar();
		this.e_btAceptar.ocultar();
		this.f_callback();
		return this;
	}
});