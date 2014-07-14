Crafty.c('AreaRotacion', {
	siguienteCuadroActual: 0,
	cuadroActual: 0,
	ventilador: null,
	attrs: [],
	_cuadros: [],
	
	init: function() {
	},
	iniciar: function() {
		var x0 = this.x;
		var y0 = this.y;
		var w0 = this.w / 2;
		var h0 = this.h / 2;
		this.attrs = [
			{x: x0 - 2 * w0, y: y0 - 2 * h0, w: 4 * w0, h: 4 * h0, z: 10},
			{x: x0 + 2 * w0, y: y0 - 2 * h0, w: 4 * w0, h: 4 * h0, z: 10},
			{x: x0 + 2 * w0, y: y0 + 2 * h0, w: 4 * w0, h: 4 * h0, z: 10},
			{x: x0 - 2 * w0, y: y0 + 2 * h0, w: 4 * w0, h: 4 * h0, z: 10}
		];
		var estaArea = this;
		var cuadros = [];
		//dibujar las areas para el mouse
		var colores = ['blue', 'green', 'black', 'white'];
		for (var i = 0; i < this.attrs.length; i++) {
			cuadros[i] = Crafty.e('2D, Canvas, Mouse').attr(this.attrs[i]);
			cuadros[i].cuadro = i;
			cuadros[i].siguienteCuadro = (1 + i) < this.attrs.length ? 1 + i : 0;
			
			// Opcional: colorear los cuadros
			//cuadros[i].addComponent("Color").color(colores[i]).attr({ alpha: 0.5 });
			
			cuadros[i].bind('MouseOver',
					function() {
						if (!Crafty.isPaused()) {
							estaArea.cuadroActual = this.cuadro;
							if (estaArea.cuadroActual === estaArea.siguienteCuadroActual) {
								estaArea.ventilador.girar();//se avanza con el ventilador.
							}
						}
					});
			cuadros[i].bind('MouseOut',
					function() {
						estaArea.siguienteCuadroActual = this.siguienteCuadro;
					});
		}
		
		this._cuadros = cuadros;
	},
	
	// Invocar para que el área de rotación deje de recibir eventos del Mouse
	bloquear: function() {
		var i;
		var numCuadros = this._cuadros.length;
		for (i = 0; i < numCuadros; i++) {
			this._cuadros[i].unbind("MouseOver");
			this._cuadros[i].unbind("MouseOut");
		}
		return this;
	}
});