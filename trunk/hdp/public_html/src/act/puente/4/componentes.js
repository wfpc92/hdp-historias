// Ficha del tablero
Crafty.c("H4_Ficha", {
	num: 0, // Número de la ficha en el arreglo de fichas
	numSimbolo: -1, // Número de simbolo
	e_padre: null,
	e_tapa: null,
	tapada: true, // true si está tapada
	bloqueado: true, // false si recibe eventos del mouse
	
	init: function() {
		this.requires("2D, Canvas, sprH4_ficha, Tweener, Mouse");
		this.e_tapa = Crafty.e("2D, Canvas, sprH4_ficha, Tweener").attr({ x: 1, alpha: 0 });
		this.attach(this.e_tapa);
		
		// Al hacer click, destapar
		this.bind("MouseUp", this.destapar);
		
		return this;
	},
	
	H4_Ficha: function(num, numSimbolo, e_padre) {
		this.num = num;
		this.e_padre = e_padre;
		this.simbolo(numSimbolo);
		var self = this;
		this.e_tapa.addTween({ alpha: 0.5 }, "linear", 25, function() {
			self.bloqueado = false;
			self.alpha = 1;
		});
		return this;
	},
	
	// Muestra el símbolo
	destapar: function() {
		console.log("destapadas: " + this.e_padre.numDestapadas)
		if (!this.bloqueado && this.tapada && this.e_padre.numDestapadas < 2) {
			this.alpha = 1;
			this.tapada = false;
			this.bloqueado = true; // bloqueamos hasta que sevuelva a tapar
			this.visible = true;
			this.e_tapa.addTween({ alpha: 0 }, "linear", 5);
			this.addTween({ y: this._y - 30 }, "easeOutCubic", 8, function() {
				this.addTween({ y: this._y + 30 }, "easeOutElastic", 26);
			});
			
			this.e_padre.fichaDestapada(this);
		}
		return this;
	},
	
	// Esconde el símbolo
	tapar: function() {
		if (!this.tapada) {
			this.tapada = true;
			this.e_tapa.alpha = 0;
			this.e_tapa.visible = true;
			this.e_tapa.addTween({ alpha: 1 }, "linear", 5);
			this.addTween({ y: this._y - 30 }, "easeOutCubic", 8, function() {
				this.addTween({ y: this._y + 30 }, "easeOutElastic", 20, function() {
					this.bloqueado = false;
				});
			});
			
		}
		return this;
	},
	
	// Animación para remover la ficha del tablero
	remover: function() {
		this.addTween({ y: this._y - 40, alpha: 0 }, "easeInBack", 16, function() { this.visible = false; });
		return this;
	},
	
	// Establece el símbolo de esta ficha
	simbolo: function(num) {
		this.numSimbolo = num;
		if (num < 7) {
			this.sprite(0, num * 136);
		}
		else {
			this.sprite(135, (num - 7) * 136);
		}
		return this;
	}
});


// Gota de ingrediente que cae en la olla
Crafty.c("H4_Gota", {
	color: "#FFFFFF",
	largo: 100, // largo del chorro
	y0: 0,
	angulo: 0, // angulo de arco de gota cuando se sumerge
	maxY: 650,
	vy: 24, // velocidad de caída (px)
	estirando: true, // false si ya no se debe estirar la gota
	
	init: function() {
		this.requires("2D, Canvas");
		
		this.attr({ x: 620, z: 400, w: 40, h: 800 });
	},
	
	H4_Gota: function(numColor) {
		switch(numColor) {
			case 0: this.color = "#FFFFFF"; break;
			case 1: this.color = "#E84D2E"; break;
			case 2: this.color = "#70421D"; break;
		}
		
		this.bind("Draw", this._dibujarCaer);
		this.bind("EnterFrame", this._caer);
        this.ready = true;
	},
	
	// Movimiento de caída
	_caer: function() {
		if (this.estirando && this.largo > this.maxY) {
			this.estirando = false;
			this.largo += 20;
		}

		if (this.estirando) {
			this.largo += this.vy;
		}
		else {
			this.y0 += this.vy;
			this.largo -= this.vy;
			if (this.largo <= 25) {
				this.unbind("EnterFrame", this._caer);
				this.unbind("Draw", this._dibujarCaer);
				
				this.bind("EnterFrame", this._sumergir);
				this.bind("Draw", this._dibujarSumergir);
			}
		}
		
		this.trigger("Invalidate");
		this.draw();
	},
	
	_sumergir: function() {
		if (this.angulo >= 1) {
			this.unbind("EnterFrame", this._sumergir);
			this.unbind("Draw", this._dibujarSumergir);
			this.destroy();
		}
		this.angulo += 0.2;
		this.y0 += 4;
		this.trigger("Invalidate");
		this.draw();
		
	},
	
	_dibujarSumergir: function(e) {
		if (this.angulo < 1) {
			var ctx = e.ctx;
			ctx.fillStyle = this.color;

			// dibujar cuerpo del chorro
			ctx.beginPath();
			ctx.arc(e.pos._x + 20, e.pos._y + this.y0 + 25, 20, Math.PI * (0.5 - this.angulo), Math.PI * (0.5 + this.angulo), true); 
			ctx.closePath();
			ctx.fill();
		}
	},
	
	_dibujarCaer: function(e) {
		var ctx = e.ctx;
		ctx.fillStyle = this.color;

		// dibujar cuerpo del chorro
		ctx.beginPath();
		ctx.rect(e.pos._x, e.pos._y + this.y0 + 20, 40, this.largo);
		ctx.fill();

		// dibujar circulo arriba
		ctx.beginPath();
		ctx.arc(e.pos._x + 20, e.pos._y + this.y0 + 20, 20, 0, Math.PI * 2, true); 
		ctx.closePath();
		ctx.fill();

		if (this.estirando) {
			// dibujar circulo abajo
			ctx.beginPath();
			ctx.arc(e.pos._x + 20, e.pos._y + this.y0 + 20 + this.largo, 20, 0, Math.PI * 2, true); 
			ctx.closePath();
			ctx.fill();
		}
    }
});


// Olla en que se mezclan los ingredientes
Crafty.c("H4_Olla", {
	e_color: null, // entidad color de la mezcla
	e_color2: null, // entidad empleada para la animación de cambio de color
	ingredientes: [], // arreglo boleano de ingredientes [cal, sangre, barro]
	
	init: function() {
		this.requires("2D, Canvas, Image, Tweener")
			.image("img/act/puente/4/olla.png")
			.attr({ x:395, y: 670, w: 491, h: 308, z: 10 });
	
		this.ingredientes = [false, false, false];
		
		this.e_color = Crafty.e("2D, Canvas, Color")
				.color("#2E2E2E")
				.attr({ x: 513, y: 704, w: 256, h: 54, z: 8 });
		this.attach(this.e_color);
		
		this.e_color2 = Crafty.e("2D, Canvas, Color, Tweener")
				.attr({ x: 513, y: 704, w: 256, h: 54, z: 9, visible: false });
		this.attach(this.e_color2);
	},
	
	mostrar: function() {
		this.addTween({ y: 620 }, "easeOutBack", 30);
		return this;
	},
	
	/**
	 * Notificar que se ha agregado uno de los ingredientes de la mezcla y hay que cambiar el color
	 * @param int nuevoColor 0:cal, 1:sangre, 2:barro
	 */
	agregarIngrediente: function(numIngr) {
		this.ingredientes[numIngr] = true;
		var ing = this.ingredientes;
		var nuevoColor;
		
		if		(!ing[0] && !ing[1] && ing[2]) nuevoColor = "#70421D";
		else if (!ing[0] && ing[1] && !ing[2]) nuevoColor = "#E84D2E";
		else if (!ing[0] && ing[1] && ing[2]) nuevoColor = "#7A2C1A";
		else if (ing[0] && !ing[1] && !ing[2]) nuevoColor = "#FFFFFF";
		else if (ing[0] && !ing[1] && ing[2]) nuevoColor = "#9E8562";
		else if (ing[0] && ing[1] && !ing[2]) nuevoColor = "#E8725D";
		else if (ing[0] && ing[1] && ing[2]) nuevoColor = "#7A5433";
		
		Crafty.e("H4_Gota").H4_Gota(numIngr);
		var self = this;
		Crafty.e("DelayFrame").delay(function() { self.colorMezcla(nuevoColor); }, 10);
		
		return this;
	},
	
	// Cambia el color de la mezcla de forma animada
	colorMezcla: function(nuevoColor) {
		this.e_color2.visible = false;
		console.log(this.e_color2);
		this.e_color2.color(this.e_color._color);
		this.e_color2.alpha = 1;
		this.e_color2.visible = true;
		this.e_color.color(nuevoColor);
		this.e_color2.addTween({ alpha: 0 }, "linear", 60);
		
		return this;
	}
});