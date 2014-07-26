// Actividad lluvia

var ActMorro3 = function() {
	//con esta cantidad se gana la actividad
	this.totAciertos = 0;
	//si se ha ganado la actividad
	this.actividadGanada = false;
	
	this.velocidadAngular = 1; //velocidad angular de ventilador
	this.aceleracionFriccion = -0.09; //aceleracion friccion
	this.nubeVelocidadRetorno = 1; //velocidad con la que se devuelve la nube
	this.nubeMaxX = 870; // Cuando la nube llega a esta posición se gana la interacción
	this.e_vasija = null;
	this.e_moneda = null;
          
	this.init = function() {
		//colocar fondo de actividad
		Crafty.e('Fondo').image(gesActividad.config.fondo);
		
		// primer plano
		Crafty.e("2D, Canvas, Image").attr({ y:3, z:20 }).image("img/act/morro/3/capa-suelo.png");

		//dibujar el ventilador y su base
		this.ventilador = Crafty.e('Ventilador, sprM3_ventiladorAspa')
								.attr({x: 39, y: 226, z: 1});
		this.ventilador.va = this.velocidadAngular;
		this.ventilador.af = this.aceleracionFriccion;
		this.ventilador.base = Crafty.e('2D, Canvas, sprM3_ventiladorBase');
		this.ventilador.baseY = 4;
		this.ventilador.arrancar();

		//Dibujar las piedras que se ubican en la colina
		this.piedras = Crafty.e('Piedras');
		
		// Vasija y moneda
		this.e_vasija = Crafty.e("Canvas, 2D, sprM3_vasija, Tweener").attr({ x: 750, y: 300, z: 1, rotation: -40 });
		this.e_moneda = Crafty.e("Canvas, 2D, sprM3_moneda, Tweener").attr({ x: 810, y: 227, z: 1, rotation: -40 });
		
		//Dibujar la nube y asignar el ventilador que lo sopla
		this.nube = Crafty.e('Nube');
		this.nube.e_padre = this; // Referencia al objeto creador
		var nubeMaxX = this.nubeMaxX;
		
		this.nube.attr({x: -10, y: 18, z: 2})
					.bind('EnterFrame', function() {
						//con esta velocidad la nube avanza
						this.velocidad = this.e_padre.ventilador.va * 0.2;
						//con el acierto de esta condicion se gana la actividad
						if (this.x + 397 >= nubeMaxX) {
							this.unbind("EnterFrame");
							this.e_padre.ganarActividad();
						}
					});
		this.nube.velocidadRetorno = this.nubeVelocidadRetorno;
		
		Crafty.box2D.pause(); // suspendemos la física hasta que se gane la partida
		
		Crafty.e("Gesto")
				.Gesto(3, { coords: [132, 321], duracion: 155, retardo: 40, radio: 100 });
		
		return this;
	};

	this.ganarActividad = function() {
		gesActividad.temporizador.parar();
		this.ventilador.bloquear();
		
		var self = this;
		setTimeout(function() {
			self.e_vasija.addTween({ x: self.e_vasija._x - 20, y: self.e_vasija._y - 10}, "easeOutCubic", 100);
			self.e_moneda.addTween({ x: self.e_moneda._x - 10, y: self.e_moneda._y - 20}, "easeOutCubic", 100);
		}, 2000);

		Crafty.box2D.unpause();
		this.nube.pararNube(100);

		setTimeout(function() {
			gesActividad.mostrarPuntaje();
		}, 4000);
	};
	
	//se ejecuta cuando se pierde la actividad por el tiempo, para evitar que el componente de lluvia siga avanzando
	this.terminarActividad = function(){
		//parar la nube para que no siga avanzando y no permita que se ejecute "this.ganarActividad()"
		this.nube.unbind("EnterFrame");
		return this;
	};
};