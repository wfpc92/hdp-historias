// Botón de actividad
Crafty.c("MC_btActiv", {
	num: 0, // 1-6, ubicación de botón en el sprite
	numC: 0, // 1-5, num de cuadro
	numAct: 0, // 1-6, num de actividad a ejecutar. Puede no corresponder a la ubicación en el sprite
	bloqueado: true,
	e_baudiliosActiv: null, // indicador de baudilios de esta actividad
	e_numAct: null, // Indicador de número de actividad
	
	init: function() {
		this.requires("2D, Canvas, Mouse, Sprite, Tweener, Iluminador")
				.attr({ z:96, alpha:0, visible:false });
		
		this.e_baudiliosActiv = Crafty.e("MC_BaudiliosAct");
		
		this.e_numAct = Crafty.e("2D, Canvas, sprMC_numAct")
								.attr({ z:100, visible:false });
		
		var self = this;
		
		this.bind("MouseUp", function() {
			if (!this.bloqueado) {
				this.bloqueado = true;
				
				this.iluminar("#FFFFFF", 0.5, 5, function() {
					var objCortina = new Cortina();
					objCortina.aparecer(25, function() {
						gesActividad.ejecutar(self.numC - 1, self.numAct);
					});
				});
			}
		});
	},
	
	MC_btActiv: function(n) {
		this.num = n;
		return this;
	},
	
	// Reposiciona este botón según el sentido del cuadro
	// También posiciona los baudilios del botón
	posicionar: function(vertical) {
		var n = this.num - 1;
		var fila = 0, col = 0;
		
		if (!vertical) {
			// Cuadro horizontal
			if (n < 3) {
				this.x = 162 + n * 320;
				this.y = 118;
			} else {
				this.x = 162 + (n - 3) * 320;
				this.y = 118 + 280;
			}
			
			this.e_baudiliosActiv.attr({ x: this._x + 70, y: this._y + 120 });
			this.e_numAct.x = this._x + 259;
			this.e_numAct.y = (this.num < 3) ? this._y + 1 : this._y;
		}
		else {
			// Vertical
			if (n === 1 || n === 3 || n === 5) col = 1;
			
			if (n === 2 || n === 3) fila = 1;
			else if (n === 4 || n === 5) fila = 2;
			
			this.x = 444 + col * 197;
			this.y = 57 + fila * 230;
			
			this.e_baudiliosActiv.attr({ x: this._x + 11, y: this._y + 95 });
			this.e_numAct.x = this._x + 137;
			this.e_numAct.y = (this.num < 2) ? this._y : this._y - 1;
		}
		
		return this;
	},
	
	// Establece el sprite de este botón, con el num de cuadro
	// Reposiciona las actividades según la orientación del cuadro
	imgCuadro: function(nc) {
		this.removeComponent("sprMC_c" + this.numC + "desv");
		this.numC = nc;
		this.addComponent("sprMC_c" + this.numC + "desv");

		var vertical = (nc === 2);
		
		if (vertical) {
			switch (this.num) {
				case 1: this.sprite(0,0,197,230); break;
				case 2: this.sprite(197,0,197,230); break;
				case 3: this.sprite(0,230,197,230); break;
				case 4: this.sprite(197,230,197,230); break;
				case 5: this.sprite(0,460,197,231); break;
				case 6: this.sprite(197,460,197,231); break;
			}
		}
		else {
			switch (this.num) {
				case 1: this.sprite(0,0,320,280); break;
				case 2: this.sprite(320,0,320,280); break;
				case 3: this.sprite(640,0,319,280); break;
				case 4: this.sprite(0,281,320,280); break;
				case 5: this.sprite(320,281,320,280); break;
				case 6: this.sprite(640,281,319,280); break;
			}
		}
		
		this.posicionar(vertical);
		
		return this;
	},
	
	// actualiza el número de baudilios activados para este botón
	actualizarBaudAct: function() {
		this.e_baudiliosActiv.numBaudilios(progreso[this.numC - 1].baudilios[this.numAct]);
		this.e_numAct.sprite(0, (this.numAct) * 61);
		return this;
	},
	
	habilitar: function() {
		this.bloqueado = false;
		this.alpha = 0;
		return this;
	},
	bloquear: function() {
		this.bloqueado = true;
		this.alpha = 1.0;
		return this;
	},
	
	animOcultar: function() {
		this.visible = false;
		this.e_numAct.visible = false;
		this.e_baudiliosActiv.ocultar();
		return this;
	},
	
	// Mostrar este botón de actividad (sea transparente o no)
	animMostrar: function() {
		this.alpha = 0.0;
		this.visible = true;
			
		if (this.bloqueado) {
			this.addTween({ alpha: 1.0 }, "linear", 5);
		}
		else {
			this.e_baudiliosActiv.animMostrar();
			this.e_numAct.visible = true;
		}
		
		return this;
	}
});