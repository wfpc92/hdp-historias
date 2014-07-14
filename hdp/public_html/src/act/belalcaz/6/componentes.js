Crafty.c("Laberinto_cabeza", {
	fila: -1,
	columna: -1,
	corazones: 0,
	cor: [],
	m: null,
	init: function() {
		this.requires("2D, Canvas, Tweener");
	},
	Laberinto_cabeza: function(spr) {
		this._spr = spr;
		this.requires(spr);
		this.m = matrizLaberinto();
		this.buscarPosIni();
		return this;
	},
	//buscar una posicion inicial donde se pueda arrancar
	buscarPosIni: function() {
		//this.fila = Crafty.math.randomInt(0, this.m.length - 1);
		//this.columna = Crafty.math.randomInt(0, this.m[0].length - 1);
		this.fila = 3;
		this.columna = 6;
		if (this.m[this.fila][this.columna].d === null) {
			//se llama a esta funcion de nuevo en caso que no se encuentre en una posicion valida.
			this.buscarPosIni();
		}
		var posx = this.m[this.fila][this.columna].posCab.x;
		var posy = this.m[this.fila][this.columna].posCab.y;
		this.attr({x: posx, y: posy, z: 15});
		this.direccion = "";
		//poner en posicion los 5 corazones: 
		this.cor[0] = Crafty.e("Corazon").posicionInicial(0, 0);
		this.cor[1] = Crafty.e("Corazon").posicionInicial(0, 5);
		this.cor[2] = Crafty.e("Corazon").posicionInicial(4, 5);
		this.cor[3] = Crafty.e("Corazon").posicionInicial(5, 5);
		this.cor[4] = Crafty.e("Corazon").posicionInicial(5, 9);

		this.m[0][0].corazon = this.cor[0];
		this.m[0][5].corazon = this.cor[1];
		this.m[4][5].corazon = this.cor[2];
		this.m[5][5].corazon = this.cor[3];
		this.m[5][9].corazon = this.cor[4];
		return this.sigPos();//dibujar las posiciones que se puedan realizar	
	},
	//por cada posicion siguiente 
	sigPos: function() {
		var self = this;
		//obtener todas las siguientes posiciones 
		var sig = this.m[this.fila][this.columna];
		var destinos = sig.d;

		//construir un  componente por cada uno de los siguientes destinos
		for (var i = 0; i < destinos.length; i++) {
			var destinoX = destinos[i][0];
			var destinoY = destinos[i][1];
			//console.log(destinoX + " " + destinoY);
			var posxsol = 152 + destinoX * 105;
			var posysol = 78 + destinoY * 105;

			var destinoSol = Crafty.e("2D, Canvas, sprB6_sol, Soles, Mouse, Tweener")
					.attr({x: posxsol, y: posysol, z: this.z - 3});
			destinoSol.fila = destinoY;
			destinoSol.columna = destinoX;
			destinoSol.bind("MouseDown", function() {
				var self2 = this;
				Crafty("Soles").each(function() {
					this.unbind("MouseDown");
					this.addTween({alpha: 0}, 'easeInOutQuad', 20, function() {
						this.destroy();
					});
				});
				self.determinarDireccion(this.columna)
						.mover(this.fila, this.columna);
			});
		}
		return this;
	},
	/**
	 * mover la cabeza hacia una posicion en la matriz
	 * @param {type} posX posicion equivalente a al fila en la matriz
	 * @param {type} posY posicion equivalente a la columnav en la matriz
	 */
	mover: function(fila, columna) {
		var self = this;
		var sigposx = 150 + columna * 104;
		var sigposy = 68 + fila * 105;
		this.fila = fila;
		this.columna = columna;
		//this.attr({x: sigposx, y: sigposy});
		//this.sigPos();

		this.addTween({x: sigposx, y: sigposy}, 'easeInOutQuad', 20, function() {
			var cor = self.m[fila][columna].corazon;
			if (cor != null) {
				cor.ocultar();
                                self.m[fila][columna].corazon = null;
				self.corazones += 1;
				if (self.corazones == 5) {
					console.log("gana actividad");
					self.actividad.ganarActividad();
				}
			}
			self.sigPos();
		});
	},
	//determina la direccion de acuerdo a la posicion en X y en Y actuales del componente.
	determinarDireccion: function(col) {
		if (this.columna != col) {
			if (this.columna < col) {
				this.sprite(0, 0);
			}
			else {
				this.sprite(1, 0);
			}
		}
		return this;
	}
});

Crafty.c("Corazon", {
	init: function() {
		this.requires("2D, Canvas, sprB6_corazon");
	},
	Corazon: function() {

	},
	posicionInicial: function(fila, columna) {
		this.fila = fila;
		this.columna = columna;
		this.attr({x: 161 + this.columna * 104, y: 85 + this.fila * 105, z: 14});
		return this;
	},
	ocultar: function() {
		this.visible = false;
		console.log("ocultando corzon");
		this.destroy();
		return this;
	}
});

function matrizLaberinto() {
	var filas = 6;
	var columnas = 10;

	/**
	 * Posibles destino de cada 
	 * @type Array
	 */
	var destinos = [
		//fila 0:
		[
			[[1, 0]], //0,0
			[[2, 0], [1, 1], [0, 0]], //1,0
			[[4, 0], [2, 1], [1, 0]], //2,0
			null, //3,0
			[[4, 2], [2, 0]], //4,0
			[[7, 0]], //5,0
			null, //6,0
			[[7, 1], [5, 0]], //7,0
			[[9, 0], [8, 2]], //8,0
			[[9, 5], [8, 0]]//9,0
		],
		//fila 1:
		[
			[[1, 1], [0, 5]], //0,1
			[[0, 1], [1, 0]], //1,1
			[[3, 1], [2, 0]], //2,1
			[[3, 2], [2, 1]], //3,1
			null, //4,1
			[[7, 1], [5, 2]], //5,1
			null, //6,1
			[[5, 1], [7, 0]], //7,1
			null, //8,1
			null, //9,1
		],
		//fila 2:
		[
			null, //0,2
			[[1, 3]], //1,2
			[[3, 2], [2, 3]], //2,2
			[[2, 2], [3, 1]], //3,2
			[[5, 2], [4, 3], [4, 0]], //4,2
			[[4, 2], [5, 1]], //5,2
			[[7, 2]], //6,2
			[[8, 2], [7, 4], [6, 2]], //7,2
			[[8, 5], [7, 2], [8, 0]], //8,2
			null//9,2
		],
		//fila 3:
		[
			null, //0,3
			[[2, 3], [1, 2]], //1,3
			[[3, 3], [1, 3], [2, 2]], //2,3
			[[3, 4], [2, 3]], //3,3
			[[5, 3], [4, 4], [4, 2]], //4,3
			[[6, 3], [5, 4], [4, 3]], //5,3
			[[6, 5], [5, 3]], //6,3
			null, //7,3
			null, //8,3
			null //9,3
		],
		//fila 4:
		[
			null, //0,4
			[[2, 4], [1, 5]], //1,4
			[[2, 5], [1, 4]], //2,4
			[[3, 3]], //3,4
			[[4, 3]], //4,4
			[[5, 3]], //5,4
			null, //6,4
			[[7, 2]], //7,4
			null, //8,4
			null //9,4
		],
		//fila 5:
		[
			[[1, 5], [0, 1]], //0,5
			[[1, 4], [0, 5]], //1,5
			[[5, 5], [2, 4]], //2,5
			null, //3,5
			null, //4,5
			[[2, 5]], //5,5
			[[8, 5], [6, 3]], //6,5
			null, //7,5
			[[6, 5], [8, 2]], //8,5
			[[9, 0]]//9,5
		]
	];

	/**
	 * Funcion para generar una matriz (array de varios array)
	 * @param {type} filas numero de filas que va a tener la matriz
	 * @param {type} columnas numero de columnas 
	 * @param {type} f Funcion que determina el contenido de la celda.
	 */
	function armarMatriz(filas, columnas, f) {
		var matriz = [];
		for (var i = 0; i < filas; i++) {
			matriz[i] = [];
			for (var j = 0; j < columnas; j++) {
				matriz[i][j] = f(i, j);
			}
		}
		return matriz;
	}

	/**
	 * Calcular las posiciones de las cabezas   
	 */
	var posicionesCabeza = armarMatriz(filas, columnas, function(i, j) {
		return {
			x: 150 + j * 104,
			y: 68 + i * 105
		};
	});

	/**
	 * Calcular las posiciones de los corazones   
	 */
	var posicionesCorazon = armarMatriz(filas, columnas, function(i, j) {
		return {
			x: 161 + j * 104,
			y: 85 + i * 105
		};
	});

	/**
	 * Calcular las posiciones de los corazones   
	 */
	var posicionesSol = armarMatriz(filas, columnas, function(i, j) {
		return {
			x: 152 + j * 105,
			y: 78 + i * 105
		};
	});

	/**
	 * Funcion para retornar el contenido de una celda del labertinto
	 * debe tener los destinos, indicadores si es corazon y si esta activo
	 * y la posicion en pixeles de la celda
	 * @param {type} i posicion en x
	 * @param {type} j posicion en y
	 * @returns {matrizLaberinto.celda.Anonym$1}
	 */
	function celda(i, j) {
		return {
			d: destinos[i][j],
			corazon: null,
			activo: false,
			posCab: posicionesCabeza[i][j],
			posCor: posicionesCorazon[i][j],
			posSol: posicionesSol[i][j]
		};
	}

	/**
	 * Matriz que representa el laberinto de la actividad
	 * contenido de cada celda: 
	 * posMov : matriz con los posibles movimientos a las celdas vecinas
	 * corazon: bandera para indicar true si hay un corazon.
	 * activo: bandera para indicar si hay que calcular/mostrar los posibles movimientos.
	 * pos: array con posiciones a X y Y relativas a la matriz
	 */
	this.matriz = armarMatriz(filas, columnas, celda);
	return this.matriz;
}
