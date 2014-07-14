/**
 * Componentes de Morro - Actividad 6
 */

// Bloque arrastable con soporte de física
Crafty.c("M6Bloque", {
	fila: 0, // Posición del bloque en el monte (fila 0-3, col 0-5)
	col: 0,
	b2shape: null, // Arreglo de posiciones [x,y] relativas a la entidad. Describe el polígono de colisión
	callbackDestroy: null, // Función de callback al destruir este objeto
	_padre: null, // Referencia al objeto creador

	init: function() {
		this.requires("B2arrastre");
		this.arrastrable = true;

		this.bind("EnterFrame", function() {
			if (this.fueraDePantalla()) {
				world.DestroyBody(this.body);
				this.destroy();
				this._padre.saleBloque(this.fila, this.col);
			}
		});

		return this;
	},
	fueraDePantalla: function() {
		return (this._x > (Crafty.viewport._width + 180) || this._x < -(this._w + 180) || this._y > 800);
	},
	
	M6Bloque: function(objPadre, nFila, nCol, b2shape) {
		this._padre = objPadre;
		this.fila = nFila;
		this.col = nCol;
		this.requires("sprM6_f" + nFila + "c" + nCol);
		if (b2shape.length > 0) {
			this.b2shape = b2shape;
			this.box2d({
				bodyType: 'dynamic',
				density: 0.000001,
				friction: 0.5,
				restitution: 0.2,
				shape: this.b2shape
			});
		}
		this.body.SetAngularDamping(3);
		
		this.B2arrastre(this._padre.b2a);
		
		return this;
	}
});