
Crafty.c("CajaTexto", {
	colsSprite: 32,
	posXMax: 0,
	lineHeight: 23,
	pag: 0,
	fontWidth: new Array(4, 6, 9, 9, 14, 11, 3, 5, 5, 7, 11, 4, 6, 4, 6, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 4, 4, 11, 11, 11, 7, 13, 11, 10, 10, 12, 9, 9, 12, 12, 4, 7, 10, 8, 14, 12, 12, 10, 12, 10, 9, 9, 12, 10, 15, 10, 10, 10, 5, 6, 5, 11, 9, 5, 9, 10, 8, 10, 9, 5, 10, 10, 4, 4, 8, 4, 15, 10, 10, 10, 10, 6, 7, 6, 10, 9, 13, 8, 8, 8, 5, 4, 5, 11, 9, 9, 9, 4, 9, 6, 18, 9, 9, 5, 21, 9, 5, 16, 9, 10, 9, 9, 4, 4, 6, 6, 5, 9, 18, 5, 11, 7, 5, 16, 9, 8, 10, 4, 4, 9, 9, 9, 9, 4, 9, 5, 12, 6, 8, 11, 6, 8, 5, 6, 11, 6, 5, 5, 10, 9, 4, 5, 4, 6, 8, 14, 14, 14, 7, 11, 11, 11, 11, 11, 11, 14, 10, 9, 9, 9, 9, 4, 4, 4, 4, 12, 12, 12, 12, 12, 12, 12, 11, 12, 12, 12, 12, 12, 10, 10, 10, 9, 9, 9, 9, 9, 9, 14, 8, 9, 9, 9, 9, 4, 4, 4, 4, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 8, 10, 8),
	paginas: new Array(),
	e_letras: [],
	init: function() {
	},
	setTexto: function(texto) {
		this.paginas[this.pag] = texto;
		return this;
	},
	limpiarPantalla: function() {
		Crafty("LetraCaja").destroy();
		return this;
	},
	/**
	 * Dibujar las palabras compuestas de letras, empezando desde la posicion 
	 * dada por la funcion attr(), 
	 * @returns {Anonym$0}
	 */
	mostrarPag: function() {
		var i = 0;
		var letra = '';
		var code = 0;
		var fila = 0;
		var col = 0;
		var texto = this.paginas[this.pag];
		var len = texto.length;
		//console.log('mostrar: x: '+this.x+', y: '+this.y+', z: '+this.z+', w: '+this.w+', h: '+this.h);
		var posX = this.x;
		var posY = this.y;
		var posX0 = this.x;
		var posY0 = this.y;
		this.posXMax = this.x + this.w;
		this.posYMax = this.y + this.h;

		//Representa una palabra del texto, se dibuja al final de su recorrido letra a letra
		var objPalabra = new wPalabra(this, posX, posY);

		for (i = 0; i < len; i++) {
			// obtenemos el codigo correspondiente
			letra = texto.charAt(i);
			if (letra === ' ') {
				//dibujar la palabra que acaba de terminar de construirse
				objPalabra.dibujar();
				//la nueva posicion de la palabra que acabo de dibujarse mas 8 será la nueva posición de la nueva palabra
				posX = objPalabra.x0 + 8;
				//lanueva palabra
				objPalabra = new wPalabra(this, posX, posY);
			}
			else if (letra === "\n") {
				//dibujar la palabra que se estaba construyendo
				objPalabra.dibujar();
				//ubicarse en la posicion X original para la nueva palabra y aumentar la Y
				posX = posX0;
				posY += this.lineHeight;
				objPalabra = new wPalabra(this, posX, posY);
			}
			else {
				code = letra.charCodeAt(0) - 33;
				fila = Math.floor(code / this.colsSprite);
				col = code - (fila * 32);

				//agregar una nueva letra a la palabra
				objPalabra.nuevaLetra(col, fila, this.fontWidth[code]);
				//calcular la siguiente posisicion de la proxima letra 
				posX += this.fontWidth[code];

				//si la posicion se sale del tamano establecido. se ubica en la siguiente linea
				if (posX > this.posXMax) {
					posX = posX0;
					posY += this.lineHeight;

					//actualizar posicion de la palabra que se esta construyendo
					objPalabra.x0 = posX;
					objPalabra.y0 = posY;
				}
			}
			if (i === (len - 1)) {
				objPalabra.dibujar();
			}
		}
		this.pag++;
		return this;
	}
});

//Objeto para controlar las palabras, x0:posicion en x inicial de la 
//palabra y0:posicion en y in icial de la palabra
var wPalabra = function(cajaTexto, x0, y0) {
	this.index = 0;
	//atributos: 0:posX, 1:posY, 2:ancho, 3:alto, 4:columna, 5:fila, 6:anchoEfectivo
	this.attr = [];
	this.x0 = x0;
	this.y0 = y0;
	this.anchoLetra = 16;
	this.altoLetra = 23;

	this.nuevaLetra = function(col, fila, anchoEfectivo) {
		this.attr[this.index] = [col, fila, anchoEfectivo];
		this.index = this.index + 1;
		return this;
	};

	this.dibujar = function() {
		for (var i = 0; i < this.index; i++) {
			if (this.index > 0) {
				var l = Crafty.e("Canvas, 2D, spr_letra, LetraCaja")
						.attr({x: this.x0, y: this.y0, z: 3, w: this.anchoLetra, h: this.altoLetra})
						.sprite(this.attr[i][0], this.attr[i][1]);
				cajaTexto.e_letras.push(l);
			}
			this.x0 += this.attr[i][2];
		}
		return this;
	};
};








/**
 * @fileoverview Archivo de prueba.
 ////aqui tomo el objeto palabra y se dibuja independientemente.
 Crafty.c("CajaTexto", {
 anchoLetra: 16,
 altoLetra: 23,
 colsSprite: 32,
 posXMax: 384,
 lineHeight: 23,
 pag: 0,
 fontWidth: new Array(4, 6, 9, 9, 14, 11, 3, 5, 5, 7, 11, 4, 6, 4, 6, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 4, 4, 11, 11, 11, 7, 13, 11, 10, 10, 12, 9, 9, 12, 12, 4, 7, 10, 8, 14, 12, 12, 10, 12, 10, 9, 9, 12, 10, 15, 10, 10, 10, 5, 6, 5, 11, 9, 5, 9, 10, 8, 10, 9, 5, 10, 10, 4, 4, 8, 4, 15, 10, 10, 10, 10, 6, 7, 6, 10, 9, 13, 8, 8, 8, 5, 4, 5, 11, 9, 9, 9, 4, 9, 6, 18, 9, 9, 5, 21, 9, 5, 16, 9, 10, 9, 9, 4, 4, 6, 6, 5, 9, 18, 5, 11, 7, 5, 16, 9, 8, 10, 4, 4, 9, 9, 9, 9, 4, 9, 5, 12, 6, 8, 11, 6, 8, 5, 6, 11, 6, 5, 5, 10, 9, 4, 5, 4, 6, 8, 14, 14, 14, 7, 11, 11, 11, 11, 11, 11, 14, 10, 9, 9, 9, 9, 4, 4, 4, 4, 12, 12, 12, 12, 12, 12, 12, 11, 12, 12, 12, 12, 12, 10, 10, 10, 9, 9, 9, 9, 9, 9, 14, 8, 9, 9, 9, 9, 4, 4, 4, 4, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 8, 10, 8),
 paginas: new Array(
 "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies nisi a neque tincidunt laoreet id ut tortor. Aenean diam massa, auctor\n et nisi id, lacinia venenatis dui. Sed aliquam\n pulvinar tellus, malesuada semper ante\n malesuada vel.",
 "El t�rmino saga se utiliza para referirse a una narraci�n parecida a una epopeya familiar que se extiende a varias generaciones, dividida en episodios, actos o vol�menes."
 ),
 init: function() {
 this.requires("2D, Canvas, Draggable, Keyboard")
 .bind('KeyDown', function() {
 if (this.isDown('SPACE')) {
 Crafty("LetraCaja").destroy();
 this.mostrarPag();
 }
 });
 },
 setTexto: function(texto) {
 this.paginas[this.pag] = texto;
 return this;
 },
 mostrarPag: function() {
 var i = 0;
 var letra = '';
 var code = 0;
 var fila = 0;
 var col = 0;
 var texto = this.paginas[this.pag];
 var len = texto.length;
 var posX = 0;
 var posY = 0;
 
 var wPalabra = function() {
 this.index = 0;
 //atributos: 0:posX, 1:posY, 2:ancho, 3:alto, 4:columna, 5:fila
 this.attr = [];
 
 this.nuevaLetra = function(posX, posY, anchoLetra, altoLetra, col, fila) {
 this.attr[this.index] = [posX,posY,anchoLetra,altoLetra,col,fila];
 this.index = this.index + 1;
 return this;
 };
 
 this.dibujar = function() {
 for (var i = 0; i < this.index; i++) {
 Crafty.e("Canvas, 2D, spr_letra, Draggable, LetraCaja")
 .attr({x: this.attr[i][0],  y: this.attr[i][1], w: this.attr[i][2], h: this.attr[i][3]})
 .sprite(this.attr[i][4], this.attr[i][5]);
 }
 return this;
 };
 };
 var objPalabra = new wPalabra();
 
 for (i = 0; i < len; i++) {
 // obtenemos el c�digo correspondiente
 letra = texto.charAt(i);
 if (letra === ' ') {
 if (posX > 0) {
 posX += 8;
 }
 //////////////////////
 objPalabra.dibujar();
 objPalabra = new wPalabra();
 }
 else if (letra === "\n") {
 posX = 0;
 posY += this.lineHeight;
 /////////////////////////
 objPalabra.dibujar();
 objPalabra = new wPalabra();
 }
 //////////////////////////
 else if (i === (len - 1)) {
 objPalabra.dibujar();
 objPalabra = new wPalabra();
 }
 else {
 code = letra.charCodeAt(0) - 33;
 fila = Math.floor(code / this.colsSprite);
 col = code - (fila * 32);
 console.log(letra, code, fila, col);
 // ubicamos el sprite correcto
 //Crafty.e("Canvas, 2D, spr_letra, Draggable, LetraCaja")
 // .attr({w: this.anchoLetra, h: this.altoLetra, x: posX, y: posY})
 // .sprite(col, fila);
 
 
 ///////////////////
 objPalabra.nuevaLetra(posX, posY, this.anchoLetra, this.altoLetra, col, fila);
 
 posX += this.fontWidth[code];
 if (posX > this.posXMax) {
 posX = 0;
 posY += this.lineHeight;
 }
 }
 }
 
 this.pag++;
 return this;
 }
 });
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 /**
 * @fileoverview Archivo de prueba.
 
 Crafty.c("CajaTexto", {
 anchoLetra: 16,
 altoLetra: 23,
 colsSprite: 32,
 posXMax: 384,
 lineHeight: 23,
 pag: 0,
 fontWidth: new Array(4,6,9,9,14,11,3,5,5,7,11,4,6,4,6,9,9,9,9,9,9,9,9,9,9,4,4,11,11,11,7,13,11,10,10,12,9,9,12,12,4,7,10,8,14,12,12,10,12,10,9,9,12,10,15,10,10,10,5,6,5,11,9,5,9,10,8,10,9,5,10,10,4,4,8,4,15,10,10,10,10,6,7,6,10,9,13,8,8,8,5,4,5,11,9,9,9,4,9,6,18,9,9,5,21,9,5,16,9,10,9,9,4,4,6,6,5,9,18,5,11,7,5,16,9,8,10,4,4,9,9,9,9,4,9,5,12,6,8,11,6,8,5,6,11,6,5,5,10,9,4,5,4,6,8,14,14,14,7,11,11,11,11,11,11,14,10,9,9,9,9,4,4,4,4,12,12,12,12,12,12,12,11,12,12,12,12,12,10,10,10,9,9,9,9,9,9,14,8,9,9,9,9,4,4,4,4,10,10,10,10,10,10,10,11,10,10,10,10,10,8,10,8),
 paginas: new Array (
 "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies nisi a neque tincidunt laoreet id ut tortor. Aenean diam massa, auctor\n et nisi id, lacinia venenatis dui. Sed aliquam\n pulvinar tellus, malesuada semper ante\n malesuada vel.",
 "El t�rmino saga se utiliza para referirse a una narraci�n parecida a una epopeya familiar que se extiende a varias generaciones, dividida en episodios, actos o vol�menes."
 ),
 
 init: function() {
 this.requires("2D, Canvas, Draggable, Keyboard")
 .bind('KeyDown', function () {
 if (this.isDown('SPACE')) {
 Crafty("LetraCaja").destroy();
 this.mostrarPag();
 }
 });
 },
 
 setTexto : function (texto) {
 this.paginas[this.pag] = texto;
 return this;
 },
 mostrarPag: function() {
 var i = 0;
 var letra = '';
 var code = 0;
 var fila = 0;
 var col = 0;
 var texto = this.paginas[this.pag];
 var len = texto.length;
 var posX = 0;
 var posY = 0;
 
 
 for (i = 0 ; i < len ; i++) {
 // obtenemos el c�digo correspondiente
 letra = texto.charAt(i);
 if (letra === ' ') {
 if (posX > 0) {
 posX += 8;
 }
 }
 else if (letra === "\n") {
 posX = 0;
 posY += this.lineHeight;
 }
 else {
 code = letra.charCodeAt(0) - 33;
 fila = Math.floor(code / this.colsSprite);
 col = code - (fila * 32);
 console.log(letra, code, fila, col);
 
 // ubicamos el sprite correcto
 Crafty.e("Canvas, 2D, spr_letra, Draggable, LetraCaja")
 .attr({ w: this.anchoLetra, h: this.altoLetra, x: posX, y: posY })
 .sprite(col, fila);
 posX += this.fontWidth[code];
 if (posX > this.posXMax) {
 posX = 0;
 posY += this.lineHeight;
 }
 }
 }
 
 this.pag++;
 return this;
 }
 });*/

    