Crafty.c('Arrastrable', {
	encontrado: false,
	//numero: 0, // identificador, sirve para 
	maxY: 450,
	// variables de caída libre
	vy: 0.0,
	vx: 0.0,
	ay: 0.8,
	atenua: 0.4, // (porcentaje) atenuación por choque con el suelo
	cayendo: true, // true si el número está cayendo o rebotando
	ini: false, //true si el componente a acabo de ser soltado.
	presionado: false, //verdadero si el componente esta presionado
	areaCajon: null, //(obligatorio) referencia a entidad AreaCajon 
	act: null, //(obligatorio) objeto que implementa funcion que se ejecuta luego de ajustar la entidad al cajon
	spr: '', //(obligatorio) sprite del componente 

	init: function() {
		this.requires('2D, Canvas, Tweener, Mouse')
				.bind('MouseDown', function(e) {
					this.cayendo = false;
					this.presionado = true;
					var pos = mouseCoords(e);
					this.mX0 = pos.x;
					this.mY0 = pos.y;
				})
				.bind('MouseUp', function(e) {
					this.cayendo = true;
					this.presionado = false;
					this.ini = true;

					var pos = mouseCoords(e);
					this.mXSol = pos.x;
					this.mYSol = pos.y;
				})
				.bind('MouseOut', function(e) {
					this.cayendo = true;
					this.presionado = false;
				})
				.bind("MouseMove", function(e) {
					var pos = mouseCoords(e);
					if (this.presionado) {
						this.mX1 = pos.x;
						this.mY1 = pos.y;
						var difX = this.mX1 - this.mX0;
						var difY = this.mY1 - this.mY0;
						this.x += difX;
						this.y += difY;
					}
					this.mX0 = pos.x;
					this.mY0 = pos.y;
				})
				.bind("EnterFrame", this.eventoFrame);

	},
	eventoFrame: function() {
		// caer si es necesario
		if (this.cayendo) {
			this.vy += this.ay;
			this.y = this._y + this.vy;

			// Si choca contra el suelo, atenuar y rebotar
			if (this.y >= this.maxY && this.vy > 0) {
				this.vy = -(this.vy - this.atenua * this.vy);
				this.y = this.maxY;

				// Si la velocidad es demasiado pequeña, dejar de caer
				if (this.vy > -0.3 && this.vy < 1) {
					//this.cayendo = false;
					this.ini = false;
				}
			}
			if (this.x + this.vx < 0 || this.x + this.w + this.vx > 1280) {
				this.vx = -this.vx;
			}
			this.x += this.vx;

			if (this.ini) {
				this.detectarCajon();
			}
		}
	},
	detectarCajon: function() {
		//verificar si el numero del area corresponde con el numero actual
		if (this.areaCajon && !this.areaCajon.encontrado) {
			if (this.mXSol > this.areaCajon.x && this.mXSol < (this.areaCajon.x + this.areaCajon.w)
					&& this.mYSol > this.areaCajon.y && this.mYSol < (this.areaCajon.y + this.areaCajon.h)) {
				this.areaCajon.encontrado = true;
				//construir nuevo elemento
				var nvaEnt = Crafty.e("2D, Canvas, Completo, Tweener, " + this.spr)
						.attr({x: this.x, y: this.y, z: this.z - 1});
				nvaEnt.rotation = this.rotation;
				//destruir el elemento actual para evitar problemas con el evento ondrag
				this.destroy();
				var act = this.act;
				var areaCajon = this.areaCajon;
				//efecto de ajustarse a los punticos
				var velTw = 15;
				nvaEnt.addTween({x: this.areaCajon.x, y: this.areaCajon.y, rotation: 0}, 'easeOutCubic', velTw, function() {
					if (act.arrastreCompleto) {
						act.arrastreCompleto();
					}
					areaCajon.visible = false;
				});
				
				return true;
			}
		}
		return false;
	}
});

Crafty.c('AreaCajon', {
	//numero: 0,
	encontrado: false,
	init: function() {
		this.requires('2D, Canvas');
	}
});





