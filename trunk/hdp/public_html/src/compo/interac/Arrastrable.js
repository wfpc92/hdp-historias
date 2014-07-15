/**
 * Juego de componentes que permite arrastrar y soltar entidades
 */

Crafty.c('Arrastrable', {
	mouseIniX: 0, // Coordenadas del mouse
	mouseIniY: 0,
	
	// variables de caída libre
	vy: 0.0,
	vx: 0.0,
	ay: 0.8,
	
	art_cayendo: false, // true si el número está cayendo o rebotando
	ini: false, //true si el componente a acabo de ser soltado.
	presionado: false, //verdadero si el componente esta presionado
	areaCajon: null, //(obligatorio) referencia a entidad AreaCajon 
	act: null, //(obligatorio) objeto que implementa funcion que se ejecuta luego de ajustar la entidad al cajon

	eventoMove: "mousemove", // Nombres de los eventos de mouse asociados
	eventoUp: "mouseup",
	
	init: function() {
		this.requires('2D, Canvas, Tweener, Mouse')
			.bind('MouseDown', function(e) {
				this.art_cayendo = false;
				this.presionado = true;
				this.vy = 0;
				
				// Configuramos los eventos para esta entidad
				if (cocoon) { this.eventoMove = "touchmove"; this.eventoUp = "touchend"; }
		
				Crafty.addEvent(this, Crafty.stage.elem, this.eventoMove, this.Art_arrastrar);
				Crafty.addEvent(this, Crafty.stage.elem, this.eventoUp, this.Art_soltar);

				
				var pos = mouseCoords(e);
				this.mouseIniX = pos.x;
				this.mouseIniY = pos.y;
			})
			.bind("EnterFrame", this.eventoFrame);
	},
	
	// Asociada al MouseMove
	Art_arrastrar: function(e) {
		if (this.presionado) {
			var nuevaPos = mouseCoords(e);

			this.x += nuevaPos.x - this.mouseIniX;
			this.y += nuevaPos.y - this.mouseIniY;

			// Actualizamos posición del mouse
			this.mouseIniX = nuevaPos.x;
			this.mouseIniY = nuevaPos.y;
		}
	},
	
	Art_soltar: function(e) {
		Crafty.removeEvent(this, Crafty.stage.elem, this.eventoMove, this.Art_arrastrar);
		Crafty.removeEvent(this, Crafty.stage.elem, this.eventoUp, this.Art_soltar);
		
		this.art_cayendo = true;
		this.presionado = false;
		this.ini = true;

		var pos = mouseCoords(e);
		this.mXSol = pos.x;
		this.mYSol = pos.y;
		
		return this;
	},
	
	eventoFrame: function() {
		// caer si es necesario
		if (this.art_cayendo) {
			this.vy += this.ay;
			this.y = this._y + this.vy;
			
			// si se sale de la pantalla, dejar de caer y resetear variables
			if (this._y > 800) {
				this.art_cayendo = false;
				this.visible = false;
				this.vy = 0;
			}
			
			// Si choca contra el suelo, atenuar y rebotar
			if (this.y >= this.maxY && this.vy > 0) {
				this.vy = -(this.vy - this.atenua * this.vy);
				this.y = this.maxY;

				// Si la velocidad es demasiado pequeña, dejar de caer
				if (this.vy > -0.3 && this.vy < 1) {
					//this.art_cayendo = false;
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
				
				var act = this.act;
				var areaCajon = this.areaCajon;
				Crafty.removeEvent(this, Crafty.stage.elem, this.eventoMove, this.Art_arrastrar);
				Crafty.removeEvent(this, Crafty.stage.elem, this.eventoUp, this.Art_soltar);
				this.unbind("EnterFrame", this.eventoFrame);
				this.unbind("MouseDown");
				this.unbind("MouseMove");
				this.unbind("MouseUp");
				
				// ajustarse al cajón
				this.addTween({x: this.areaCajon.x, y: this.areaCajon.y, rotation: 0}, 'easeOutCubic', 15, function() {
					this.addComponent("Completo");
					if (act.arrastreCompleto) {
						act.arrastreCompleto(this);
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