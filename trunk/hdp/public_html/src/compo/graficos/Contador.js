/**
 * Componente para hacer contadores de numeros dado una sprite del 0 al 9
 * 
 * @param {type} param1
 * @param {type} param2
 */
Crafty.c("Contador", {
	e_numeros: [], //entidades de numeros.
	init: function() {
		this.requires("2D, Canvas, Tweener");
	},
	Contador: function(spr, cllAum, cllDism) {
		this.spr = spr;//sprite base de los numeros 
		this.cllAum = cllAum;//callback despues de aumentar
		this.cllDism = cllDism;//callback despues de disminuir
		this.contador = 0;
		this.dibujar();
		return this;
	},
	aumentar: function() {
		this.contador += 1;
		this.dibujar();
		if (this.cllAum)
			this.cllAum();
		return this;
	},
	disminuir: function() {
		this.contador -= 1;
		this.dibujar();
		if (this.cllDism)
			this.cllDism();
		return this;
	},
	dibujar: function() {
		this.limpiar();
		var strContador = this.contador + "";//convertir el contador en cadena
		for (var i = 0; i < strContador.length; i++) {
			var intNumero = strContador[i];
			var sprite = this.spr + "" + intNumero;
			this.e_numeros[i] = Crafty.e("2D, Canvas, " + sprite + "");
			this.e_numeros[i].attr({x: this.despx(i), y: this.despy()});
		}
		return this;
	},
	limpiar: function() {
		if (this.e_numeros.length > 0) {//borrar los numeros que esten dibujados.
			for (var i = 0; i < this.e_numeros.length; i++) {
				this.e_numeros[i].destroy();
			}
			this.e_numeros = [];
		}
		return this;
	},
	despx: function(i) {
		return this.x + i * (this.e_numeros[i].w);
	},
	despy: function() {
		return this.y;
	}
});

