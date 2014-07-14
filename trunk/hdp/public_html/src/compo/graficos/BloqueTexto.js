Crafty.c("BloqueTexto", {
	anchoCelda: 37,
	altoCelda: 47,
	colsSprite: 21,
	lineHeight: 49,
	bold: false, // true si se usa la fuente bold+
	anchoBloque: 0, // dimensiones MBR
	altoBloque: 0,
	animar: false,
	ultPosX: 0, // posX del último caracter escrito
	anchoCajaOpcion: 10, // Ancho de la caja donde se encaja la opción
	
	colorFrente: "#D3554A", // Color de las opciones de test generadas
	colorFondo: "#D3554A", // Color de fondo del test
	
	sprNormal: "spr_asapNormal",
	sprBold: "spr_asapBold",
	
	fontWidth: [
	5,11,19,17,24,21,4,10,10,11, 17,5,10,5,17,18,17,19,16,16,17,
	17,16,17,5,6,18,17,18,15,29, 22,17,20,21,15,14,21,21,4,12,19,
	15,25,20,24,18,23,18,17,20,21, 21,31,22,20,20,7,8,14,22,16,17,
	16,17,16,10,19,15,5,9,15,8, 26,15,18,17,17,10,14,11,16,16,26,
	17,16,15,9,9,17,22,16,7,20, 23,20,21,16,17,7,17,18,16,15],
	
	fontWidthB: [
	8,14,19,18,26,23,5,10,10,12, 18,7,11,7,17,17,17,20,17,18,18,
	18,18,18,7,8,18,18,19,16,29, 23,19,21,22,17,15,22,22,7,13,20,
	16,26,21,24,19,24,20,18,20,22, 22,33,23,22,21,8,8,15,22,17,18,
	16,18,17,12,19,17,6,10,17,10, 27,17,19,18,18,12,14,12,17,18,27,
	18,18,16,10,10,18,23,17,9,22, 24,21,22,17,17,8,18,19,17,17],
	
	_texto: "Aqui va el _texto", // \n para saltos de línea, \b para activar y desactivar negrilla
	ordenLetras: ['!','"','#','$','%','&',"'",'(',')','*','+',',','-','.','1','2','3','4','5','6','7','8','9','0',':',';','<','=','>','?','@','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','[',']','^','_','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','{','}','¿','Á','É','Í','Ñ','Ó','Ú','Ü','á','é','í','ñ','ó','ú','ü'],
	
	_arrLetras: null, // arreglo de letras a mostrar
	_numLetraAnim: 0, // letra actualmente animando
	_animInterval: null, // referencia al interval para cerrarlo
	
	_arrEspacios: null, // arreglo de espacios de test
	_arrOpciones: null, // arreglo de opciones de test
	
	init: function() {
		this.requires("2D, Canvas");
		this._arrLetras = [];
		this._arrEspacios = [];
		this._arrOpciones = [];
	},
	
	BloqueTexto: function(txt, animar) {
		var i = 0;
		var letra = '';
		var code = 0;
		var fila = 0;
		var col = 0;
		this._texto = txt;
		var texto = txt;
		var len = texto.length;
		var posX = this._x;
		var posY = this._y;
		var anchoLetra;
		this.animar = animar;
		this.anchoBloque = 0;
		this.altoBloque = this._y + this.lineHeight;
		var espaciado;
		var sigLetra;
		var e_letra;
		var txtOpcion;
		var e_espacio;
		var anchoEspacio, longitudOpcion;
		var numOpciones;

		for (i = 0 ; i < len ; i++) {
			// obtenemos el código correspondiente
			letra = texto.charAt(i);
			
			// Campo de test
			if (letra === "|") {
				// Obtenemos el texto de la opción
				j = i + 1;
				while (texto.charAt(j) !== '|' && j < len) {
					j++;
				}
				txtOpcion = texto.slice(i+1, j);
				longitudOpcion = txtOpcion.length;
				
				// Construimos la opción y su correspondiente espacio
				e_espacio = Crafty.e("TestEspacio");
				this._arrEspacios.push(e_espacio);
				
				var e_opcion = Crafty.e("TestOpcion").TestOpcion(txtOpcion, e_espacio, this.colorFrente, this.colorFondo);
				this._arrOpciones.push(e_opcion);
				
				anchoEspacio = this.anchoCajaOpcion;
				e_espacio.attr({ x: posX, y: posY + 2, w: anchoEspacio, h: this.altoCelda - 4, z: this._z, visible: (!this.animar) });
				
				numOpciones++;
				i += longitudOpcion + 1;
				posX += anchoEspacio;
			}
			else {
				// Espacio
				if (letra === ' ') {
					if (posX > this._x) {
						posX += 11;
					}
				}
				// Salto de línea
				else if (letra === "\n") {
					// actualizamos ancho y alto de bloque
					posX = this._x;
					posY += this.lineHeight;
					this.altoBloque = posY + this.lineHeight - this._y;
				}
				// Marca de negrilla
				else if (letra === "\b") {
					this.bold = !this.bold;
				}
				// * Caracter normal
				else {
					charNum = this.getCharNum(letra);
					charPos = this.getCharCoords(charNum);
					fila = charPos[1];
					col = charPos[0];
					
					if (!this.bold) anchoLetra = this.fontWidth[charNum];
					else anchoLetra = this.fontWidthB[charNum];
					
					// ubicamos el sprite correcto
					e_letra = Crafty.e("Canvas, 2D");
					if (this.has("Persist")) e_letra.addComponent("Persist");
					
					if (!this.bold) e_letra.addComponent(this.sprNormal);
					else e_letra.addComponent(this.sprBold);
					
					e_letra.attr({ x: posX, y: posY, z: this._z, w: anchoLetra, h: this.altoCelda, visible: (!this.animar), alpha: 1 })
							.sprite(col * this.anchoCelda, fila * this.altoCelda, anchoLetra, this.altoCelda);
					
					this._arrLetras.push(e_letra);
					//console.log(this._arrLetras)
					
					// espaciado de letra
					espaciado = (this.bold) ? anchoLetra + 3.2 : anchoLetra + 3.6;
					
					if (!this.bold) {
						// normal
						if (letra === 'o' || letra === 'i' || letra === 'f' || letra === 'c') espaciado -= 1;
						else if (letra === 'í' || letra === 's' || letra === '1' || letra === '2' || letra === '7') espaciado -= 2;
						
						if (i < len - 1) {
							sigLetra = texto.charAt(i + 1);
							if (sigLetra === 'o' || sigLetra === 'f') espaciado -= 1;
							else if (sigLetra === 'j') espaciado -= 2.5;
						}
					}
					else {
						// negrilla
						if (letra === 'v' || letra === 'f' || letra === 'l' || letra === 'y' || letra === 'r') espaciado -= 1;
						
						if (i < len - 1) {
							sigLetra = texto.charAt(i + 1);
							if (sigLetra === 'j') espaciado -= 3.5;
							else if (sigLetra === 'o' || sigLetra === 'f' || sigLetra === 's' || sigLetra === 'y') espaciado -= 1;
						}
					}
					
					posX += espaciado;
				}
				
				if ((posX - this._x) > this.anchoBloque)
					this.anchoBloque = posX - this._x;
			}
		}
		
		this.w = this.anchoBloque;
		this.h = this.altoBloque;
		
		// Ya que tenemos las dimensiones del bloque, amarramos las letras
		var numEntLetras = this._arrLetras.length;
		for (i = 0 ; i < numEntLetras ; i++) {
			this.attach(this._arrLetras[i]);
		}
		
		this.ultPosX = this._arrLetras[numEntLetras - 1]._x;
		
		return this;
	},
	
	animMostrar: function(f_cBack) {
		var self = this;
		this._numLetraAnim = 0;
		this._animInterval = setInterval(function() {
			if (self._numLetraAnim < self._arrLetras.length) {
				self._arrLetras[self._numLetraAnim].visible = true;
				self._numLetraAnim++;
				
			} else {
				clearInterval(self._animInterval);
				self.mostrarEspacios();
				if (f_cBack) f_cBack();
			}
		}, 5);
		
		return this;
	},
	
	// Muestra los espacios disponibles
	mostrarEspacios: function() {
		var numEsp = this._arrEspacios.length;
		var e_esp;
		for (i = 0 ; i < numEsp ; i++) {
			e_esp = this._arrEspacios[i];
			e_esp.attr({ alpha: 0, visible: true })
					.addTween({ alpha: 1 }, "linear", 10);
		}
		return this;
	},
	
	// Destruye todas las entidades de letras en el bloque y resetea las variables
	reset: function() {
		clearInterval(this._animInterval); // evitar creación de más letras
		
		var numEntLetras = this._arrLetras.length;
		for (i = 0 ; i < numEntLetras ; i++) {
			this._arrLetras[i].destroy();
		}
		this.bold = false;
		this.anchoBloque = 0;
		this.altoBloque = 0;
		this.animar = false;
		this.ultPosX = 0;
		this._numLetraAnim = 0;
		this._arrLetras = [];
		
		var cuenta;
		// Destruimos espacios de test
		cuenta = this._arrEspacios.length;
		for (i = 0 ; i < cuenta ; i++) {
			this._arrEspacios[i].destroy();
		}
		this._arrEspacios = [];
		
		// Destruimos opciones de test
		cuenta = this._arrOpciones.length;
		for (i = 0 ; i < cuenta ; i++) {
			this._arrOpciones[i].destroy();
		}
		this._arrOpciones = [];
		
		
		return this;
	},
	
	// vuelve invisibles las letras del bloque de texto sin destruirlas ni modificar la entidad
	ocultar: function() {
		var numEntLetras = this._arrLetras.length;
		for (i = 0 ; i < numEntLetras ; i++) {
			this._arrLetras[i].visible = false;
		}
		return this;
	},
	
	// vuelve visibles inmediatamente las letras del bloque de texto
	mostrar: function() {
		var numEntLetras = this._arrLetras.length;
		for (i = 0 ; i < numEntLetras ; i++) {
			this._arrLetras[i].visible = true;
		}
		return this;
	},
	
	// Devuelve las entidades de opciones
	getOpciones: function() {
		return this._arrOpciones;
	},
	
	// Devuelve el ancho y alto del bloque [w, h]
	getDimensiones: function() {
		return [this.anchoBloque, this.altoBloque];
	},
	
	getCharNum: function(c) {
		var i = 0;
		for (i = 0 ; i < 104 ; i++) {
			if (c === this.ordenLetras[i]) return i;
		}
		return -1;
	},
	
	getCharCoords: function(n) {
		var x = 0, y = 0;
		while (n >= 21) {
			n -= 21;
			y++;
		}
		return [n, y];
	},
	
	getArrEspacios: function() { return this._arrEspacios; }
});