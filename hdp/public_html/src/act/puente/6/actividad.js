/**
 */
var ActPuente6 = function() {
	
	this.e_pj = null; // Referencia a torso del personaje
	this.e_brazos = null; // Referencia a los brazos interactivos
	this.particulas = null;
	
	this.init = function() {
		this.crearEntidades();
		
		this.e_pj.iniciarCaminata();
		
		this.initParticulas();
		
		var g = Crafty.e("Gesto")
				.Gesto(3, { coords: [50, 550], duracion: 155, retardo: 40, radio: 100 });
		this.e_pj.e_centroGiro.attach(g);
		
		return this;
	};

	this.crearEntidades = function() {
		Crafty.e("2D, Canvas, Image").image("img/act/puente/6/fondo.jpg");
		Crafty.e("2D, Canvas, Image, Oscilador").image("img/act/puente/6/nube.png").attr({ x: -100, y: 0 }).oscilarX(100, 600);
		
		this.e_pj = Crafty.e("H6_Personaje").H6_Personaje(this);
	};

	this.initParticulas = function() {
		this.particulas = new Particulas({
			componentes: "spr_nubeVerde, SpriteAnimation",
			x: 570, y: 630, z: 600,
			vx: 0,
			deltaVx: 4,
			periodo: 5,
			deltaOriX: 350, deltaOriY: 100,
			numParticulas: 10,
			magnitud: 100,
			duracion: 40,
			atenuacion: 50,
			f_crear: function(ent) {
				ent.reel("explota", 400, [[0,0],[96,0],[192,0],[288,0],[384,0],[480,0],[576,0]]).animate("explota", -1);
			}
		});
		
		return this;
	};

	// Siempre invocada al terminar la actividad
	this.terminarActividad = function() {
		return this;
	};

	this.ganarActividad = function() {
		this.e_pj.e_flechas.ocultar();
		this.e_pj.noRotar();
		gesActividad.temporizador.parar();
		
		Crafty.e("DelayFrame").delay(function() {
			gesActividad.mostrarPuntaje();
		}, 60);
		return this;
	};
};