// Sombra del cuadro grande
Crafty.c("MC_Sombra", {
	e_sup: null, e_inf: null, e_izq: null, e_der: null,
	
	init: function() {
		this.e_sup = Crafty.e("2D, Canvas, Image, Tweener").image("img/menu-cuadros/sombra-sup.png").attr({ x:128, y:21, alpha:0.0, visible:false });
		this.e_inf = Crafty.e("2D, Canvas, Image, Tweener").image("img/menu-cuadros/sombra-inf.png").attr({ x:128, y:709, alpha:0.0, visible:false });
		this.e_izq = Crafty.e("2D, Canvas, Image, Tweener").image("img/menu-cuadros/sombra-izq.png").attr({ x:64, y:-10, alpha:0.0, visible:false });
		this.e_der = Crafty.e("2D, Canvas, Image, Tweener").image("img/menu-cuadros/sombra-der.png").attr({ x:1152, y:-10, alpha:0.0, visible:false });
	},
	
	animMostrar: function() {
		this.e_sup.visible = true;
		this.e_inf.visible = true;
		this.e_izq.visible = true;
		this.e_der.visible = true;
		this.e_sup.addTween({ alpha:1.0 }, "linear", 5);
		this.e_inf.addTween({ alpha:1.0 }, "linear", 5);
		this.e_izq.addTween({ alpha:1.0 }, "linear", 5);
		this.e_der.addTween({ alpha:1.0 }, "linear", 5);
		return this;
	},
	
	ocultar: function() {
		this.e_sup.visible = false;
		this.e_inf.visible = false;
		this.e_izq.visible = false;
		this.e_der.visible = false;
		return this;
	}
});

// Grilla en cuadros horizontales o verticales
Crafty.c("MC_grilla", {
	e_lineaA: null,
	e_lineaB1: null,
	e_lineaB2: null,
	
	MC_grilla: function(horizontal) {
		this.e_lineaA = Crafty.e("2D, Canvas, Image, Tweener");
		this.e_lineaB1 = Crafty.e("2D, Canvas, Image, Tweener");
		this.e_lineaB2 = Crafty.e("2D, Canvas, Image, Tweener");
		
		if (horizontal) {
			this.e_lineaA.attr({x: 161, y: 397, z: 97, alpha: 0.0, visible: false}).image("img/menu-cuadros/grilla1-hor.png");
			this.e_lineaB1.attr({x: 480, y: 121, z: 97, alpha: 0.0, visible: false}).image("img/menu-cuadros/grilla1-ver.png");
			this.e_lineaB2.attr({x: 800, y: 121, z: 97, alpha: 0.0, visible: false}).image("img/menu-cuadros/grilla1-ver.png");
		} else {
			this.e_lineaA.attr({x: 639, y: 57, z: 97, alpha: 0.0, visible: false}).image("img/menu-cuadros/grilla2-ver.png");
			this.e_lineaB1.attr({x: 444, y: 285, z: 97, alpha: 0.0, visible: false}).image("img/menu-cuadros/grilla2-hor.png");
			this.e_lineaB2.attr({x: 444, y: 515, z: 97, alpha: 0.0, visible: false}).image("img/menu-cuadros/grilla2-hor.png");
		}
		
		return this;
	},
	
	init: function() {
		
	},
	
	animAparecer: function() {
		this.e_lineaA.attr({visible: true}).addTween({alpha: 1.0}, "linear", 5);
		this.e_lineaB1.attr({visible: true}).addTween({alpha: 1.0}, "linear", 5);
		this.e_lineaB2.attr({visible: true}).addTween({alpha: 1.0}, "linear", 5);
		return this;
	},
	animOcultar: function() {
		this.e_lineaA.addTween({alpha: 0.0}, "linear", 5, function () { this.visible = false; });
		this.e_lineaB1.addTween({alpha: 0.0}, "linear", 5, function () { this.visible = false; });
		this.e_lineaB2.addTween({alpha: 0.0}, "linear", 5, function () { this.visible = false; });
		return this;
	}
});


// Baudilios de botón de actividad
Crafty.c("MC_BaudiliosAct", {
	e_baud1: null,
	e_baud2: null,
	e_baud3: null,
	
	init: function() {
		this.requires("2D");
		this.e_baud1 = Crafty.e("2D, Canvas, sprMC_BaudilioPeq, Tweener").attr({ z: 100, alpha: 0.0, visible: false });
		this.e_baud2 = Crafty.e("2D, Canvas, sprMC_BaudilioPeq, Tweener").attr({ x: 60, z: 100, alpha: 0.0, visible: false });
		this.e_baud3 = Crafty.e("2D, Canvas, sprMC_BaudilioPeq, Tweener").attr({ x: 120, z: 100, alpha: 0.0, visible: false });
		this.attach(this.e_baud1);
		this.attach(this.e_baud2);
		this.attach(this.e_baud3);
	},
	
	animMostrar: function() {
		var b2 = this.e_baud2;
		var b3 = this.e_baud3;
		
		this.e_baud1.visible = true;
		this.e_baud2.visible = true;
		this.e_baud3.visible = true;
		this.e_baud1.addTween({ alpha:1.0 }, "linear", 5, function() {
			b2.addTween({ alpha:1.0 }, "linear", 5, function() {
				b3.addTween({ alpha:1.0 }, "linear", 5);
			});
		});
		return this;
	},
	ocultar: function() {
		this.e_baud1.alpha = 0.0;
		this.e_baud2.alpha = 0.0;
		this.e_baud3.alpha = 0.0;
		this.e_baud1.visible = false;
		this.e_baud2.visible = false;
		this.e_baud3.visible = false;
		return this;
	},
	
	// Muestra un determinado número de baudilios
	numBaudilios: function(n) {
		switch(n) {
			case 0: this.e_baud1.sprite(0,0); this.e_baud2.sprite(0,0); this.e_baud3.sprite(0,0); break;
			case 1: this.e_baud1.sprite(0,51); this.e_baud2.sprite(0,0); this.e_baud3.sprite(0,0); break;
			case 2: this.e_baud1.sprite(0,51); this.e_baud2.sprite(0,51); this.e_baud3.sprite(0,0); break;
			case 3: this.e_baud1.sprite(0,51); this.e_baud2.sprite(0,51); this.e_baud3.sprite(0,51); break;
		}
		return this;
	}
});


/* Medidor de baudilios de cada cuadro */
Crafty.c("MC_Baudilios", {
	e_monedas: null, // imagen de monedas
	e_numBaud: null, // numero de baudilios
	e_numTotal: null, // entidad de num total

	init: function() {
		this.requires("2D");
		
		this.requires("2D, Canvas, Image, Tweener")
					.image("img/menu-cuadros/monedas.png")
					.attr({ z: 90 });
		
		this.e_numTotal = Crafty.e("2D, Canvas, Image").image("img/menu-cuadros/num-total.png");
		this.e_numBaud = Crafty.e("MC_NumBaud");
		
		this.attach(this.e_numBaud);
		this.attach(this.e_numTotal);
	},
	
	MC_Baudilios: function(numCuadro) {
		// Posicionamos los baudilios relativamente al cuadro
		switch (numCuadro) {
			case 1: this.x += 78; this.y += 190; break;
			case 2: this.x += 20; this.y += 290; break;
			case 3: this.x += 86; this.y += 190; break;
			case 4: this.x += 77; this.y += 190; break;
			case 5: this.x += 70; this.y += 180; break;
		}
		
		this.e_numBaud.attr({ x:this.x + 73, y: this.y + 20 });
		this.e_numTotal.attr({ x:this.x + 105, y: this.y + 18 });
		
		return this;
	},
	
	// Establece el número de baudilios
	numBaudilios: function(n) {
		this.e_numBaud.MC_NumBaud(n);
		if (n < 10) {
			this.e_numBaud.x = this._x + 58;
			this.e_numTotal.x = this._x + 92;
		}
		else {
			this.e_numBaud.x = this._x + 73;
			this.e_numTotal.x = this._x + 107;
		}
		return this;
	},
	
	// oculta el medidor
	ocultar: function() {
		this.visible = false;
		this.e_numBaud.ocultar();
		this.e_numTotal.visible = false;
		return this;
	},
	mostrar: function() {
		this.visible = true;
		this.e_numBaud.mostrar();
		this.e_numTotal.visible = true;
		return this;
	}
});

/* Número de baudilios en el medidor de baudilios */
Crafty.c("MC_NumBaud", {
	num: 0, // numero a mostrar
	e_digito0: null,
	e_digito1: null,

	init: function() {
		this.requires("2D");
		this.h = 20;
		this.e_digito0 = Crafty.e("2D, Canvas, sprMC_numBaud");
		this.e_digito1 = Crafty.e("2D, Canvas, sprMC_numBaud");
		this.attach(this.e_digito0);
		this.attach(this.e_digito1);
		
		this.e_digito0.attr({ visible: false });
		this.e_digito1.attr({ visible: true, x: 14 });
	},
	
	MC_NumBaud: function(num) {
		this.num = num;
		
		if (num < 10) {
			this.e_digito0.visible = false;
			this.e_digito1.sprite(0, num * this.e_digito1._h); // sólo mostrar el segundo dígito
		}
		else {
			this.e_digito0.sprite(0, this.e_digito1._h).attr({ visible: true });
			this.e_digito1.sprite(0, (num - 10) * this.e_digito1._h);
		}

		return this;
	},
	
	ocultar: function() {
		this.e_digito0.visible = false;
		this.e_digito1.visible = false;
	},
	mostrar: function() {
		if (this.num > 9) this.e_digito0.visible = true;
		this.e_digito1.visible = true;
	}
});

