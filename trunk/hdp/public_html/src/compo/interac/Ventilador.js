Crafty.c("Ventilador", {
	//velocidad angular
	va: 0,
	//aceleracion angular
	aa: 0,
	//aceleracion friccion
	af: 0,
	baseX: 0, // Desplazamiento de la base (opcional9
	baseY: 0,
	//referencia a la ProgressBar que refleja el avance 
	barra: null,
	//imagen de fondo del ventilador
	base: null,
	init: function() {
		this.requires('2D, Canvas');
		this.bind('EnterFrame', function() {
			if (this.va >= 0) {
				this.rotation += this.va;
				this.va += this.aa;
				this.va += this.af;
				if (this.barra !== null) {
					this.barra.aumentar(this.va / 3);
				}//0.1
				this.aa = 0;
			} else {
				this.va = 0;
				if (this.barra !== null) {
					this.barra.disminuir();
				}
			}
		});
	},
	proporcion: function(prop) {
		this.w = this.w * prop;
		this.h = this.h * prop;
		this.base.w = this.base.w * prop;
		this.base.h = this.base.h * prop;
		return this;
	},
	arrancar: function() {
		this.origin(this.w / 2.0, this.h / 2.0);
		this.base.x = this.x - ((this.base.w - this.w) / 2.0) + this.baseX;//ubicar el ventilador en la mitad de la base
		this.base.y = this.y - 25 + this.baseY;//ubicar el ventilador en la mitad de la base
		this.base.z = this.z - 1;

		this.areaRotacion = Crafty.e('AreaRotacion')
				.attr({x: this.x, y: this.y, w: this.w / 2, h: this.h / 2});
		this.areaRotacion.ventilador = this;
		this.areaRotacion.iniciar();
		return this;
	},
	girar: function() {
		this.aa += 0.4;
		return this;
	},
	
	// Invocar para que el ventilador deje de recibir eventos del mouse
	bloquear: function() {
		this.unbind("EnterFrame");
		this.areaRotacion.bloquear();
		return this;
	}

});


