
//Componente del barco, debe poder detectar algunos componentes
Crafty.c("B5_Barco", {
	vx: 2,
	vxmax :2.5,
	dir : 1,//1 para derecha -1 para izquierda
	vy: 1,
	y0: 198,
	
	init: function() {
		this.requires("2D, Canvas, sprB5_barco, Mouse, SpriteAnimation");
		//asignar sombra
		this.sombra = Crafty.e("2D, Canvas, sprB5_bSombra, Sprite, Tweener")
				.attr({x: this.x, y: this.y + this.h - 30, z: 21});
		
		this.attach(this.sombra);
		
		this.corona = Crafty.e("2D, Canvas, sprB5_coronaPequena").attr({ visible: false });
		
		//movimiento del barco en dos direcciones al inicio direccion hacia la derecha
		//cuando llega a la montaña da un giro y se regresa
		this.bind("EnterFrame", function() {
			//movimiento en el eje X
			this.x += this.vx*this.dir;
			
			// cuando llega al limite derecho, rota y recoge la corona
			if (this.dir === 1 && this.x > 1180) {
				this.dir = -1;
				this.sprite(1, 0);
				this.sombra.sprite(1, 0);
				this.act.coronaGrande.visible = false;
				this.corona.attr({ x: this.x + this.w / 2 - this.corona.w / 2 + 25, y: this.y - this.corona.h, z: this.z, visible: true });
				this.attach(this.corona);
			}
			else if (this.dir === -1 && this.x < -60) {
				this.unbind("EnterFrame");
				this.sprite(0, 0);
				this.act.ganarActividad();
			}
			
			//movimiento en el ejeY
			this.y += this.vy;
			if (this.y > this.y0 + Crafty.math.randomInt(5, 15)) {
				this.vy = -0.5;
			}
			if (this.y < this.y0) {
				this.vy = Crafty.math.randomNumber(0.2, 1);
			}
			
			if(this.vx > 0){
				this.vx -= 0.01;
			}
		});
		
		this.bind("MouseDown",function(){
			this.vx += 0.15;
			if(this.vx > this.vxmax){
				this.vx = this.vxmax;
			}
		});
	},
	//funcion invocada para hundir al barco en el mar
	desaparecer: function() {
		this.unbind("EnterFrame");
		this.visible = false;
		this.destroy();
		this.sombra.destroy();
		if (this.corona) {
			this.corona.destroy();
		}
		return this;
	},
	
	// Fuerza el barco a detenerse
	detenerse: function() {
		this.vx = 0;
		this.removeComponent("Mouse");
		return this;
	},
	
    //retorna un objeto con los limites donde debe aparecer el ojo
    limitesOjo : function(){
            var liminf = 0;
            var limsup = 0;
            if(this.dir === 1){
                liminf= this.x;
                if(this.x + this.w > 1280){
                    limsup = 1280-100;
                }else{
                    limsup=this.x+this.w + 150;
                }
            }else{
                if(this.x + this.w > 1280){
                    limsup = 1280 - 100;
                }else{
                    limsup = this.x + this.w;
                }
                if(this.x - 200 < 0){
                    liminf = 0;
                }else{
                    liminf = this.x - 150;
                }
            }
            return {liminf:liminf, limsup:limsup};
        }
});

//area tocable para crear barriles
Crafty.c("B5_AreaBarriles", {
	t_delay: 1000, //demora en que se activan el evento del mouse
	bloqueado: false,
	init: function() {
		this.requires("2D, Canvas, Mouse");
	},
	B5AreaBarriles: function(ojo, barco) {
		var self = this;
		this.e_ojo = ojo;
		this.e_barco = barco;
		Crafty.e("2D, Canvas, Image")
				.attr({x: 40, y: this.h})
				.image("img/act/belalcaz/5/linea_punteada.png");
		
		this.bind("MouseDown", function(e) {
			if (!this.bloqueado) {
				this.bloqueado = true;
				var pos = mouseCoords(e);
				Crafty.e("B5_Barril")
						.attr({ x: pos.x, y: pos.y, z: this.e_ojo.z })
						.B5_Barril(self);
				setTimeout(function() {
					self.bloqueado = false;
				}, self.t_delay);
			}
		});
		return this;
	},
	golpearOjo: function() {
		this.e_ojo.visible = false;
	}
});

//compoenetes barriles, debe detectar el ojo 
Crafty.c("B5_Barril", {
	ay: 0.5,
	vy: 0.0,
	init: function() {
		this.requires("2D, Canvas, sprB5_barril");
		this.alpha = 0;
	},
	
	B5_Barril: function(area) {
		this.e_area = area;
		this.bind("EnterFrame", function() {
			if (this.alpha < 1) { this.alpha += 0.08; }
			this.vy += this.ay;
			this.y = this._y + this.vy;
			if (this.y > 800) {
				this.unbind("EnterFrame");
				this.destroy();
			}
			//Verificar que ambos componetes se toquen
			if (this.x + this.w > this.e_area.e_ojo.x &&
					this.x < this.e_area.e_ojo.x + this.e_area.e_ojo.w &&
					this.y + this.h > this.e_area.e_ojo.y &&
					this.y + this.h < this.e_area.e_ojo.y + this.e_area.e_ojo.h &&
					this.y + this.h < this.e_area.e_ojo.ymin) {//verificar que sea mayor del nuvel del mar
				if (!this.yapego) {//verificacion para que el barril solamente pueda golpear una sola vez el ojo
					this.yapego = true;
					this.e_area.e_ojo.golpearOjo();
					//mostrar Mensaje onomatopeya
					Crafty.e("2D, Canvas, Tweener, sprB5_kapaw")
							.attr({x: this.x, y: this.y, z: this.z})
							.addTween({alpha: 0}, 'easeOutQuad', 0, function() {
								this.destroy();
							});
				}
			}
		});
		return this;
	}
});

Crafty.c("B5_Ojo", {
	bestia: null, //referencia a la bestia que sale del agua
	e_advertencia: null, // advertencia que se muestra cuando el ojo toca el barco
	ymax: 0,
	ymin: 0,
	xmin: 100, // límites estáticos de pos X del ojo
	xmax: 1100,
	cuenta: 0, // indicador de tiempo en que mantiene contacto el ojo con el barco
	cuentaMax: 60, // frames de colision para que el ojo llame la bestia
	limxi: 0, // Rango dinámico de pos X del ojo
	limxs: 0,
	
	init: function() {
		this.requires("2D, Canvas, sprB5_ojo, Tweener");
		
		this.e_advertencia = Crafty.e("Advertencia");
		this.e_advertencia.attr({ x: 70, y: -76 });
		this.attach(this.e_advertencia);
	},
	
	B5_Ojo: function(barco, y0) {
		this.e_barco = barco;
		this.ymax = y0;//posicion por encima del mar 
		this.ymin = y0 + this.h; //posicion por debajo del mar
		this.z = this.e_barco.z;
		this.emerger(); //iniciar el movimiento en alguna posicion del ejeX
		
		this.bestia = Crafty.e("2D, Canvas, Image, Tweener")
				.attr({ y: y0 + 110, z: this.e_barco.z + 1 })
				.image("img/act/belalcaz/5/bestia.png");
		
		this.bind("EnterFrame", this.colisionBarco);

		return this;
	},
	
	// Verifica si está tocando al barco y llama a la bestia
	colisionBarco: function() {
		if (this.x + this.w > this.e_barco.x &&
				this.x < this.e_barco.x + this.e_barco.w &&
				this.y + this.h > this.e_barco.y &&
				this.y + this.h < this.e_barco.y + this.e_barco.h)
		{
			this.cuenta += 1;
			if (this.cuenta >= this.cuentaMax) {
				if (!this.siLlamarBestia) {//verificacion para que el barril solamente pueda golpear una sola vez el ojo
					this.siLlamarBestia = true;
					this.unbind("EnterFrame", this.colisionBarco);
					var self = this;

					this.e_advertencia.mostrar(2, 40);
					
					// sumergimos el ojo
					this.cancelTweener();
					this.addTween({ y: this.ymin }, "easeInOutCubic", 50);
					this.cuenta = 0;
					
					Crafty.e("DelayFrame").delay(function() {
						self.llamarBestia();
					}, 50);
				}
			}
		}
		var limitesBarco = this.e_barco.limitesOjo();
		if (limitesBarco.liminf < this.xmin) limitesBarco.liminf = this.xmin;
		if (limitesBarco.limsup > this.xmax) limitesBarco.limsup = this.xmax;
		this.limxi = limitesBarco.liminf;
		this.limxs = limitesBarco.limsup;
	},
	
	//mover ojo en el eje x haciendo algunos movimientos
	emerger: function() {
		var self = this;
		this.sprite(0, 0);
		
		this.cancelTweener();
		this.addTween({ y: this.ymax }, "easeOutQuad", 30, function() {
			Crafty.e("DelayFrame").delay(function() {
				self.sumergir();
			}, 90);
		});
		return this;
	},
	
	//sumergir el componente al mar
	sumergir: function() {
		var self = this;
		var y1 = this.ymin;//siguiente posicion por debajo del mar

		this.cancelTweener();
		this.addTween({ y: y1 }, "easeInCubic", 25, function() {
			this.cuenta = 0; //reiniciar la cuenta 
			Crafty.e("DelayFrame").delay(function() {
				if (self.y >= self.ymin) {
					self.x = randomInt(self.limxi, self.limxs);
					self.emerger();
				}
			}, 60);
		});

	},
	//funcion que se llama cuando el barril toca el ojo, para poder ocultarlo debajo del mar
	golpearOjo: function() {
		this.cuenta = 0;//reiniciar la cuenta del tiempo para saber si se toca el ojo y el barco
		this.cancelTweener();
		this.sprite(1, 0);
		this.sumergir();
		return this;
	},
	
	llamarBestia: function() {
		var self = this;
		this.e_barco.detenerse();
		var y0 = this.y + 100;
		
		//ubicar la bestia de forma que el ojo quede en la boca de la bestia.
		var posx = this.e_barco.x + this.e_barco.w / 2 - this.bestia.w / 2;
		self.e_barco.sombra.addTween({alpha: 0.0}, "easeInOutCubic", 40);
		
		//movimiento de salida posterior bajada y borrado de 
		this.bestia.attr({x: posx})
				.addTween({y: -250}, "easeInOutCubic", 60, function() {
					self.e_barco.desaparecer();
					self.destroy();
					Crafty.e("DelayFrame").delay(function() {
						self.bestia.addTween({y: y0 + 20}, "easeInCubic", 40, function() {
							Crafty.e("DelayFrame").delay(function() {
								gesActividad.mostrarPerdiste();
							}, 60);
						});
					}, 25);
				});
		return this;
	}
});