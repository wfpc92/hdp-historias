/**
 * Actividad 5 actividad del barco.
 * @returns {ActBelalcaz5}
 */
var ActBelalcaz5 = function() {
	//con esta cantidad se gana la actividad
	this.totAciertos = 4;
	this.duracion = 20000;
	//si se ha ganado la actividad
	this.actividadGanada = false;
	//si se ha ganado la actividad
	this.aciertos = 0;
	
	this.barco = null; // referencia a la entidad barco

	this.init = function() {

		var self = this;
		this.iniciarComponentes();

		//movimiento de brillo del agua
		this.elem[0].vx = Crafty.math.randomNumber(0.05, 0.3);
		this.elem[1].vx = Crafty.math.randomNumber(0.05, 0.3);
		this.elem[0].x0 = this.elem[0].x;
		this.elem[1].x0 = this.elem[1].x;
		
		var movAgua = function() {
			this.x += this.vx;
			if (this.x > this.x0 + 10) {
				this.vx = -Crafty.math.randomNumber(0.05, 0.3);
			}
			if (this.x < this.x0) {
				this.vx = Crafty.math.randomNumber(0.05, 0.3);
			}
		};
		this.elem[0].bind("EnterFrame", movAgua);
		this.elem[1].bind("EnterFrame", movAgua);

		this.barco = Crafty.e("B5_Barco").attr({ visible: false });

		Crafty.e("DelayFrame").delay(function() {
			self.elem[2].addTween({y: self.elem[2].y + self.elem[2].h}, 'easeOutQuad', 70);
			self.elem[3].addTween({x: -self.elem[3].w}, 'easeOutQuad', 55);
			self.elem[4].addTween({x: 1280}, 'easeOutQuad', 40);
			self.elem[5].addTween({x: 1160}, 'easeOutQuad', 50, function() {
				
				self.barco.attr({ x: -self.barco.w + 50, y: 198, z: 10, visible: true });
				self.barco.act = self;
				self.barco.aparecer();
				
				// 2 gestos: uno para el barco y otro para los barriles
				var g = Crafty.e("Gesto")
					.Gesto(1, { coords: [self.barco._x + 230, self.barco._y + 200], duracion: 180, retardo: 40 });
				self.barco.attach(g);
				
				Crafty.e("Gesto")
						.Gesto(1, { coords: [230, 60], duracion: 180, retardo: 40, deltaX: 180 });
				
				//ojo que sale del mar y verifica que toque el barco para que la bestia se coma el barco
				self.ojo = Crafty.e("B5_Ojo")
						.attr({x: 300, y: 500})
						//referencia al barco que debe vigilar,
						//posicion e y inicial y posicion minima y maxima de desplazamiento sobre eje x
						.B5_Ojo(self.barco, 323);
				
				self.areaBarriles.B5AreaBarriles(self.ojo, self.barco);
			});

		}, 60);

		//poner los tiburones a moverse
		this.elem[6].bind("EnterFrame", function() {
			this.x += 0.2;
		});
		this.elem[7].bind("EnterFrame", function() {
			this.x += 0.2;
		});
		
		
		
		return this;
	};

	this.iniciarComponentes = function() {
		this.barco = {}; //componente del barco de belalcazar 
		this.ojo = {}; //componente del ojo que observa el barco
		this.elem = []; //elementos de la actividad montañas y todo lo demas
		//poner fondo a la actividad
		Crafty.e("2D, Canvas, Image").image('img/act/belalcaz/5/fondo.jpg').attr({z: 0});
		//elementos estaticos sin movimiento
		Crafty.e("2D, Canvas, Image").image("img/act/belalcaz/5/aves.png").attr({x: 667, y: 344, z: 0});
		Crafty.e("2D, Canvas, Image").image("img/act/belalcaz/5/mar.png").attr({x: 0, y: 425, z: 20});
		//poner a mover estos dos brillos
		this.elem[0] = Crafty.e("2D, Canvas, Image, Tweener").image("img/act/belalcaz/5/mar_brillo_1.png").attr({x: 294, y: 448, z: 21});
		this.elem[1] = Crafty.e("2D, Canvas, Image, Tweener").image("img/act/belalcaz/5/mar_brillo_2.png").attr({x: 299, y: 443, z: 21});
		//quitar estas tres montañas hacia abajo y hacia los lados, dejar solamente la montaña del mar
		this.elem[2] = Crafty.e("2D, Canvas, Image, Tweener").image("img/act/belalcaz/5/montana_1.png").attr({x: -29, y: 326, z: 5});
		this.elem[3] = Crafty.e("2D, Canvas, Image, Tweener").image("img/act/belalcaz/5/montana_2.png").attr({x: -208, y: 365, z: 30});
		this.elem[4] = Crafty.e("2D, Canvas, Image, Tweener").image("img/act/belalcaz/5/montana_3.png").attr({x: 1090, y: 460, z: 30});
		//montaña del mar sale despues del ocultamiento de las otras montañas
		this.elem[5] = Crafty.e("2D, Canvas, Image, Tweener").image("img/act/belalcaz/5/montana_mar.png").attr({x: 1280, y: 285, z: 20});
		//dibujar los tiburones en el mar, dos 
		this.elem[6] = Crafty.e("2D, Canvas, Image")
				.image("img/act/belalcaz/5/tiburon.png")
				.attr({x: 264, y: 642, z: 25});
		this.elem[7] = Crafty.e("2D, Canvas, Image")
				.image("img/act/belalcaz/5/tiburon.png")
				.attr({x: 975, y: 507, z: 25});
		//area de toque de los barriles que salen en caida libre
		this.areaBarriles = Crafty.e("B5_AreaBarriles")
				.attr({x: 0, y: 0, z: 50, w: 1280, h: 168});

		//corona tgrande que va encima de la montana mar
		this.coronaGrande = Crafty.e("2D, Canvas, sprB5_coronaGrande")
				.attr({x: 1280 + 20, y: 193, z: this.elem[5].z});
		this.elem[5].attach(this.coronaGrande);
		return this;
	};


	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		Crafty("DelayFrame").each(function() { this.destroy(); });
		this.ojo.cancelTweener().destroy();
		return this;
	};

	this.ganarActividad = function() {
		this.terminarActividad();
		gesActividad.temporizador.parar();
		gesActividad.mostrarPuntaje();
		return this;
	};
};