/** Actividad de guerra de Belalcazar
 */
var ActBelalcaz3 = function() {
	this.e_caballo = null;
	this.indigenas = null; // arreglo de entidades de indìgenas
	this.guerra = Crafty.e("B3_Guerra"); // Objeto que gestiona el estado de la guerra
	this.particulas = null;
	
	this.init = function() {
		var guerra = this.guerra;
		var self = this;
		
		this.crearEntidades();
		guerra.B3_Guerra(this.e_caballo, this.indigenas);
		guerra.activ = this;
		
		this.e_caballo.bind("MouseUp", function() {
			guerra.incrementarV();
		});
		
		// Anexamos al caballo el indicador de item bueno o malo
		this.e_caballo.aviso = Crafty.e("B3_Aviso").attr({ x: 140, y: 350, z: 50 });
		this.e_caballo.attach(this.e_caballo.aviso);
		
		guerra.iniciar();
		
		Crafty.e("DelayFrame").interval(function() {
			Crafty.e("B3_Hoja").acel(guerra.v).attr({ x: randomInt(50, 1200), y: -53 });
		}, 40);
		
		Crafty.e("DelayFrame").interval(function() {
			Crafty.e("B3_Arma")
					.acel(guerra.v)
					.attr({ x: randomInt(50, 1200), y: -175 })
					.bind("MouseDown", function() {
						self.particulas.x = this._x;
						self.particulas.y = this._y;
						self.particulas.iniciar();
						
						this.destroy();
						if (this.espada) {
							guerra.ventajaEspada();
							self.e_caballo.aviso.mostrar(true);
						} else {
							guerra.ventajaLanza();
							self.e_caballo.aviso.mostrar(false);
						}
					});
		}, 100);
		
		this.particulas = new Particulas({
			componentes: "spr_nube, SpriteAnimation",
			z: 600,
			vx: 0,
			deltaVx: 4,
			periodo: 5,
			deltaOriY: 5, deltaOriX: 5,
			numParticulas: 3,
			magnitud: 100,
			duracion: 20,
			atenuacion: 80,
			f_crear: function(ent) {
				ent.reel("explota", 400, [[0,0],[96,0],[192,0],[288,0]]).animate("explota", -1);
			}
		});
		
		var g = Crafty.e("Gesto")
				.Gesto(1, { coords: [this.e_caballo._x + 110, this.e_caballo._y + 100], duracion: 180, retardo: 40 });
		this.e_caballo.attach(g);
		
		return this;
	};
	
	// Callback invocado al ganar
	this.cbk_ganar = function() {
		this.e_caballo.unbind("MouseUp");
		this.ganarActividad();
	};
	
	// Callback invocado al perder
	this.cbk_perder = function() {
		Crafty("DelayFrame").destroy();
		this.terminarActividad();
		gesActividad.mostrarPerdiste();
	};

	this.crearEntidades = function() {
		Crafty.e('2D, Canvas, Image').image("img/act/belalcaz/3/plano3.png").attr({z: 1});
		Crafty.e('2D, Canvas, Image, Oscilador')
				.image("img/act/belalcaz/3/agua.png")
				.attr({ z: 2, x: 15 })
				.oscilarX(10, 200);
		Crafty.e('2D, Canvas, Image, Oscilador')
				.image("img/act/belalcaz/3/cascada.png")
				.attr({x: 0, y: 409, z: 3})
				.oscilarY(4, 30);
		Crafty.e('2D, Canvas, Image').image("img/act/belalcaz/3/plano2.png").attr({z: 4, y: 10});
		Crafty.e('2D, Canvas, Image').image("img/act/belalcaz/3/plano1.png").attr({x: 784, y: 550, z: 20});
		Crafty.e('2D, Canvas, Image').image("img/act/belalcaz/3/oso_anteojos.png").attr({x: 10, y: 640, z: 16});
	 
		//crear los indigenas, estos salen de la parte derecha del canvas
		this.indigenas = [];
		this.indigenas[0] = Crafty.e('B3_Indigena').attr({ x: 1000, y: 420, z: 10 });
		this.indigenas[1] = Crafty.e('B3_Indigena').attr({ x: 800, y: 432, z: 10 });
		this.indigenas[2] = Crafty.e('B3_Indigena').attr({ x: 600, y: 445, z: 10 });
		this.indigenas[3] = Crafty.e('B3_Indigena').attr({ x: 400, y: 434, z: 10 });
		this.indigenas[4] = Crafty.e('B3_Indigena').attr({ x: 200, y: 434, z: 10 });

		this.e_caballo = Crafty.e("Caballo, Mouse").Caballo("sprB3_caballo");
		this.e_caballo.attr({x: 0, y: 400, z: 10});
		
	};

	// Sólo invocada al ganar la actividad
	this.ganarActividad = function ganarActividad() {
		gesActividad.temporizador.parar();
		gesActividad.mostrarPuntaje();
		this.terminarActividad();
		return this;
	};
	
	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		Crafty("DelayFrame").destroy();
		Crafty("B3_Arma").destroy();
		Crafty("B3_Hoja").destroy();
		return this;
	};
};