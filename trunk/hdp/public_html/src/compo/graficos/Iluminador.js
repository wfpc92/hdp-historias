// Permite iluminar un elemento con un overlay semitransparente
// Evanece y desvanece un bloque de las mismas medidas de la entidad a la que se agrega el iluminador
// Para usar, invocar la función "iluminar()" con el color HEX, la opacidad (0-1) y el número de frames de animación
Crafty.c("Iluminador", {
	e_ilumina: null, // recubre la entidad
	f_ilumCback: null, // apuntar a una función si hay que invocar algún callback al terminar de iluminar
	
	init: function() {
		this.e_ilumina = Crafty.e("2D, Canvas, Color, Tweener")
								.attr({ visible:false, alpha:0.0, z:3000 });
	},
	
	
	iluminar: function(color, opacidad, frames, f_callback) {
		var self = this;
		
		var hayCallback = (arguments.length === 4);
		
		this.e_ilumina
				.attr({ x: this._x, y: this._y, h: this._h, w: this._w , visible:true, alpha: 0.0 })
				.color(color)
				.addTween({ alpha:opacidad }, "easeOutCubic", frames, function() {
					this.addTween({ alpha:0.0 }, "easeOutCubic", frames, function() {
						this.visible = false;
						if (hayCallback) f_callback();
					});
				});
		return this;
	}
});