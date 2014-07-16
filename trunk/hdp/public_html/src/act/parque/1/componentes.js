
Crafty.c("P1BloqueManz", {
	juego: {}, //referencia a la matriz representacion matricial del juego
	fila: -1, // posicion de la fila en la matriz
	columna: -1, //posicion de la columna en la matriz
	e_numero: null, //entidad que se comporta como numero.
	bloqueado: true, // true para que no reaccione frente a eventos del mouse
	
	init: function() {
		this.requires("2D, Canvas, Tweener, Mouse");
		
		this.bind("MouseDown", function() {
			if (!this.bloqueado) {
				this.accionar();
			}
		});
	},

	// Dispara la acción de la ficha (moverse si es posible)
	accionar: function() {
		//validar por cada posicion si tiene el vecino vacio
		if (this.juego.matriz[this.fila][this.columna] === 1) {
			// a la derecha
			if (this.actPosicion(this.fila, this.columna + 1)) {
				return true;
			}
			//a la izquierda
			if (this.actPosicion(this.fila, this.columna - 1)) {
				return true;
			}
			// hacia arriba
			if (this.actPosicion(this.fila - 1, this.columna)) {
				return true;
			}
			// hacia abajo
			if (this.actPosicion(this.fila + 1, this.columna)) {
				return true;
			}
		}
		return false;
	},

	P1BloqueManz: function(numero, juego, fila, columna) {
		// Asignar sprites
		if (numero < 8) {
			this.addComponent("sprP1_cuadra" + (numero + 1));
		}
		
		this.numero = numero;
		this.juego = juego;
		this.filaIni = fila;
		this.columnaIni = columna;
		this.fila = fila;
		this.columna = columna;
		this.velMov = 10;
		this.e_numero = Crafty.e("2D, Canvas, sprP1_numero, Sprite, Tweener")
				.sprite(0, this.numero);
		this.e_numero.attr({
				x: this.x + this.w / 2 - this.e_numero.w / 2 + 5,
				y: this.y + this.h / 2 - this.e_numero.h / 2 + 2,
				z: this.z + 1
		});
		this.attach(this.e_numero);
		return this;
	},

	imprimirMatriz: function() {
		console.log(this.juego.matriz);
	},

	// Intenta mover la ficha a la posición recibida, retorna TRUE si fué posible
	actPosicion: function(nfila, ncolumna) {
		var mat = this.juego.matriz;

		if (nfila >= 0 && nfila <= 2 && ncolumna >= 0 && ncolumna <= 2) {
			if (mat[nfila][ncolumna] === 0) { // si hay un cero en la posicion dada, intercambiar valores
				this.mover(nfila, ncolumna);
				this.verificarPosicion();
				return true;
			}
		}
		return false;
	},
	//calcula la nueva posicion en la matriz y saca su siguiente posicion
	mover: function(nfila, ncolumna, cllbck) {
		//quitar el bloque de la posicion actual
		this.juego.matriz[this.fila][this.columna] = 0;
		this.juego.matriz[nfila][ncolumna] = 1;
		//calcular nueva posicion
		var nposx = this.juego.posiciones[nfila][ncolumna].x;
		var nposy = this.juego.posiciones[nfila][ncolumna].y;
		//colocarlo en una posicion nueva
		this.addTween({x: nposx, y: nposy}, "easeInOutQuad", this.velMov, function() {
			if (cllbck) cllbck();
		});
		//actualizar posiciones
		this.fila = nfila;
		this.columna = ncolumna;
	},
	
	verificarPosicion: function() {
		var posCorrecta = true;
		Crafty("P1BloqueManz").each(function() {
			if (this.fila !== this.filaIni || this.columna !== this.columnaIni) {
				posCorrecta = false;
			}
		});
		if (posCorrecta) {
			this.juego.posicionesOK();
		}
	},
	
	// TRUE si esta ficha puede ser accionada (tiene el espacio contiguo)
	puedeMoverse: function() {
		var mat = this.juego.matriz;
		
		if (this.fila > 0) {
			if (mat[this.fila - 1][this.columna] === 0) return true;
		}
		if (this.fila < 2) {
			if (mat[this.fila + 1][this.columna] === 0) return true;
		}
		if (this.columna > 0) {
			if (mat[this.fila][this.columna - 1] === 0) return true;
		}
		if (this.columna < 2) {
			if (mat[this.fila][this.columna + 1] === 0) return true;
		}
		
		return false;
	},
	
	mostrarNumero: function(sw) {
		this.e_numero.addTween({alpha: (sw ? 1.0 : 0.0)}, "linear", 20);
		return this;
	}
});



