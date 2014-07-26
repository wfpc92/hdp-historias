//en esta escena se muestra la pregunta actual del gestor de test
Crafty.defineScene("TestPregunta", function() {
	var colorFrente, colorFondo;
	var et; // bloque de texto
	var opciones = []; // entidades de opciones
	var texto = ""; // Texto de la pregunta
	var textosTrampa = []; // Arreglo de textos de opciones trampa
	var inicializar;
	var e_txtInicio; // Entidad de texto de bienvenida
	
	et = Crafty.e("BloqueTexto").attr({ x: 100, y: 180 });
	
	// Creamos entidades decorativas
	e_txtInicio = Crafty.e("2D, Canvas, Image, Tweener").attr({ x: 430, y: 230, z: 600 }).image("img/test/txt-inicio.png");
	var e_fondo = Crafty.e("2D, Canvas, Color").attr({w: 1280, h: 800});
	var e_llave = Crafty.e("2D, Canvas, Image").attr({ x: 1080, y: 48, visible: false }).image("img/test/llave.png");
	var e_linea1 = Crafty.e("2D, Canvas, sprTE_linea").attr({x: 20, y: 566, visible: false });
	var e_linea2 = Crafty.e("2D, Canvas, sprTE_linea").attr({x: 531, y: 566, visible: false });
	var e_linea3 = Crafty.e("2D, Canvas, sprTE_linea").attr({x: 1042, y: 566, visible: false }).crop(0, 0, 211, 14);
	gestorTest.e_numero = Crafty.e("TE_Numero").attr({x: 95, y: 70, visible: false });
	
	//Crafty.e("2D, Canvas, Color, Mouse").color("#FFFFFF").attr({ w: 30, h: 30, z: 5566}).bind("MouseUp", function() { inicializar(); });
	
	// *** FUNCIONES DE LA ESCENA ***
	
	// Elige una pregunta aleatoria del nivel y compone el escenario acorde
	inicializar = function inicializar() {
		gestorTest.elegirPregunta();
		texto = gestorTest.preguntaActual.texto;
		textosTrampa = gestorTest.preguntaActual.trampa;
	
		et.reset();
		for (i = 0 ; i < opciones.length ; i++) {
			opciones[i].destroy();
		}
		opciones = [];
		
		elegirColor();
		e_fondo.color(colorFondo);
		et.colorFrente = colorFrente;
		et.colorFondo = colorFondo;
		
		construirPregunta();
	};
	
	gestorTest.f_inicializar = inicializar;
	
	// Primero mostramos el letrero de bienvenida, luego mostramos la primer pregunta
	elegirColor();
	e_fondo.color(colorFondo);
		
	e_txtInicio.alpha = 0.5;
	e_txtInicio.y = -190;
	e_txtInicio.addTween({ alpha: 1 }, "linear", 10);
	e_txtInicio.addTween({ y: 280 }, "easeInOutBack", 60, function() {
		Crafty.e("DelayFrame").delay(function() {
			e_txtInicio.addTween({ y: 600, alpha: 0 }, "easeInCubic", 30, function() {
				Crafty.e("DelayFrame").delay(function() {
					e_llave.visible = true;
					e_linea1.visible = true;
					e_linea2.visible = true;
					e_linea3.visible = true;
					gestorTest.e_numero.visible = true;
					inicializar();
				}, 20);
			});
		}, 60);
		
	});
	
	
	// Establece el color de frente y de fondo de la pregunta actual
	function elegirColor() {
		var numColor = randomInt(0, 4);
		switch (numColor) {
			case 0: colorFrente = "#D3554A"; colorFondo = "#EA6054"; break;
			case 1: colorFrente = "#33766A"; colorFondo = "#4CAB9A"; break;
			case 2: colorFrente = "#645A35"; colorFondo = "#938759"; break;
			case 3: colorFrente = "#BD721E"; colorFondo = "#EA881B"; break;
			case 4: colorFrente = "#58801C"; colorFondo = "#80BA27"; break;
		}
	}
	
	
	// Muestra una por una las opciones disponibles
	function animMostrarOpciones() {
		var e_op, i = 0;
		for (i = 0; i < opciones.length; i++) {
			e_op = opciones[i];
			e_op.delay(function() { this.animAparecer(); }, 20 * (i + 1));
		}
	}
	
	
	// Crea la pregunta y las respuestas de la pregunta actual
	function construirPregunta() {
		// Preparamos los datos de esta pregunta
		var trampas = [];
		var textosVerdad = [];
		var texto = gestorTest.preguntaActual.texto;
		var textosTrampa = gestorTest.preguntaActual.trampa;

		// Obtenemos todas las opciones incluídas en el texto
		var i, j, letra;
		var len = texto.length;
		for (i = 0 ; i < len ; i++) {
			letra = texto.charAt(i);
			if (letra === "|") {
				j = i + 1;
				while (texto.charAt(j) !== '|' && j < len) { j++; }
				textosVerdad.push(texto.slice(i+1, j));
				i = j + 1;
			}
		}

		var e_opcion;

		// Obtenemos el ancho máximo de las opciones verdaderas
		var anchoMaxOpcion = 0;
		for (i = 0; i < textosVerdad.length; i++) {
			e_opcion = Crafty.e("TestOpcion").TestOpcion(textosVerdad[i], null);
			if (anchoMaxOpcion < e_opcion._w) anchoMaxOpcion = e_opcion._w;
			e_opcion.destroy();
		}

		// Creamos todas las opciones trampa y actualizamos el ancho máximo
		for (i = 0; i < textosTrampa.length; i++) {
			e_opcion = Crafty.e("TestOpcion").TestOpcion(textosTrampa[i], null, colorFrente, colorFondo);
			if (anchoMaxOpcion < e_opcion._w) anchoMaxOpcion = e_opcion._w;
			trampas.push(e_opcion);
		}

		// Construimos el bloque de texto
		et.anchoCajaOpcion = anchoMaxOpcion;
		et.BloqueTexto(texto, true);
		
		// Ubicamos las opciones
		opciones = trampas.concat(et.getOpciones()); // Opciones contiene todas las entidades
		shuffle(opciones);

		var totOpciones = opciones.length;
		var posX = 100;
		var maxX = 1150;
		var posY = 600;

		var e_op, anchoOp, resto;
		var opcionesLinea = [];

		for (i = 0; i < totOpciones; i++) {
			e_op = opciones[i];
			anchoOp = e_op._w;

			if (posX + anchoOp > maxX) {
				// Alineamos al centro
				resto = (maxX - posX) / 2;
				for (j = 0; j < opcionesLinea.length; j++) {
					opcionesLinea[j].x += resto + 25;
				}
				opcionesLinea = [];

				posX = 100;
				posY += 65;
			}

			e_op.x = posX;
			e_op.y = posY;
			opcionesLinea.push(e_op);
			posX += anchoOp + 50;
		}

		// Alineamos última línea
		resto = (maxX - posX) / 2;
		for (j = 0; j < opcionesLinea.length; j++) {
			opcionesLinea[j].x += resto + 25;
		}

		// Fijamos posiciones iniciales luego de alinear
		// También establecemos las referencias al arreglo de espacios
		var arrEsp = et.getArrEspacios();
		for (i = 0; i < totOpciones; i++) {
			e_op = opciones[i];
			e_op.setPosIni();
			e_op.setArrEspacios(arrEsp);
		}
		
		// mostramos el texto y las opciones
		et.animMostrar(function() {
			animMostrarOpciones();
		});
	}
});
