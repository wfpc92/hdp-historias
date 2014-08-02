//en esta escena se muestra la pregunta actual del gestor de test
Crafty.defineScene("TestPregunta", function() {
	var colorFrente, colorFondo;
	var et; // bloque de texto
	var opciones = []; // entidades de opciones
	var texto = ""; // Texto de la pregunta
	var textosTrampa = []; // Arreglo de textos de opciones trampa
	var inicializar;
	var e_txtInicio; // Entidad de texto de bienvenida
	var particulas, particulasLlave;
	
	et = Crafty.e("BloqueTexto").attr({ x: 100 });
	
	// Creamos entidades decorativas
	var e_fondo = Crafty.e("2D, Canvas, Color").attr({w: 1280, h: 800});
	var e_fondo2 = Crafty.e("2D, Canvas, Color, Tweener").attr({w: 1280, h: 800, alpha: 0, visible: false }); // usado para el cambio suave
	
	e_txtInicio = Crafty.e("2D, Canvas, Image, Tweener").attr({ x: 430, y: 230, z: 600, alpha: 0, visible: false }).image("img/test/txt-inicio.png");
	var e_llave = Crafty.e("2D, Canvas, Image, Tweener")
						.attr({ x: 1122, y: 58, w: 55, h: 55, visible: false })
						.image("img/global/llave.png");
	var e_linea1 = Crafty.e("2D, Canvas, sprTE_linea, Tweener").attr({x: 20, y: 566, visible: false });
	var e_linea2 = Crafty.e("2D, Canvas, sprTE_linea, Tweener").attr({x: 531, y: 566, visible: false });
	var e_linea3 = Crafty.e("2D, Canvas, sprTE_linea, Tweener").attr({x: 1042, y: 566, visible: false }).crop(0, 0, 211, 14);
	
	gestorTest.e_numero = Crafty.e("TE_Numero").attr({x: 60, y: 60, visible: false });
	
	
	//Crafty.e("2D, Canvas, Color, Mouse").color("#FFFFFF").attr({ w: 30, h: 30, z: 5566}).bind("MouseUp", function() { inicializar(); });
	//Crafty.e("2D, Canvas, Color, Mouse").color("#FF00FF").attr({ x: 100, w: 30, h: 30, z: 5566}).bind("MouseUp", function() { gestorTest.finalizarTest(); });
	initParticulas();
	animEntrada();
	
	// ************************** FUNCIONES DE LA ESCENA **************************
	
	
	// Elige una pregunta aleatoria del nivel y compone el escenario acorde
	function inicializar() {
		gestorTest.elegirPregunta();
		texto = gestorTest.preguntaActual.texto;
		textosTrampa = gestorTest.preguntaActual.trampa;
	
		et.reset();
		for (i = 0 ; i < opciones.length ; i++) {
			opciones[i].destroy();
		}
		opciones = [];
		
		if (gestorTest.cuentaPreguntas > 0) {
			elegirColor();
			cambiarFondo(colorFondo);
		}
		et.colorFrente = colorFrente;
		et.colorFondo = colorFondo;
		
		construirPregunta();
	}
	gestorTest.f_inicializar = inicializar;
	
	
	// Hace un cambio suave del color de fondo
	function cambiarFondo(color) {
		e_fondo2.color(e_fondo._color);
		e_fondo.color(color);
		e_fondo2.visible = true;
		e_fondo2.alpha = 1;
		e_fondo2.addTween({ alpha: 0 }, "linear", 8, function() { this.visible = false; });
	}
	
	// Muestra el título inicial del test y luego la primer pregunta
	function animEntrada() {
		elegirColor();
		e_fondo.color(colorFondo);
		
		e_txtInicio.attr({ y: -190, alpha: 0, visible: true })
					.addTween({ y: 280, alpha: 1 }, "easeInOutBack", 60, function() {
						Crafty.e("DelayFrame").delay(function() {
							e_txtInicio.addTween({ y: 500, alpha: 0 }, "easeInBack", 40, function() {
								Crafty.e("DelayFrame").delay(function() {
									animMostrarDecorado();
									inicializar();
								}, 10);
							});
						}, 60);
		});
	}
	
	
	// Animación para mostrar los elementos de decorado del test
	function animMostrarDecorado() {
		e_llave.attr({ visible: true, alpha: 0 }).addTween({ alpha: 1 }, "linear", 15);
		e_linea1.attr({ visible: true, alpha: 0 }).addTween({ alpha: 1 }, "linear", 15);
		e_linea2.attr({ visible: true, alpha: 0 }).addTween({ alpha: 1 }, "linear", 15);
		e_linea3.attr({ visible: true, alpha: 0 }).addTween({ alpha: 1 }, "linear", 15);
		gestorTest.e_numero.attr({ visible: true, alpha: 0 }).addTween({ alpha: 1 }, "linear", 15);
	};
	
	// Animación para ocultar todos los elementos del test (excepto la llave)
	function animOcultarTodo() {
		e_linea1.addTween({ alpha: 0 }, "linear", 10, function() { this.visible = false; });
		e_linea2.addTween({ alpha: 0 }, "linear", 10, function() { this.visible = false; });
		e_linea3.addTween({ alpha: 0 }, "linear", 10, function() { this.visible = false; });
		gestorTest.e_numero.addTween({ alpha: 0 }, "linear", 10, function() { this.visible = false; });
		et.reset();
		for (i = 0 ; i < opciones.length ; i++) {
			opciones[i].animOcultar();
		}
	};
	gestorTest.f_animFinalizar = function() {
		animOcultarTodo();
		
		// animamos la llave y disparamos partículas
		particulasLlave.e_origen = e_llave;
		particulasLlave.deltaOriX = e_llave._w;
		particulasLlave.deltaOriY = e_llave._h;
		particulasLlave.iniciar();
		
		e_llave.addTween({ x: 560, y: 340 }, "easeInOutCubic", 60, function() {
			Crafty.e("DelayFrame").delay(function() {
				
				e_llave.addTween({ y: -100 }, "easeInBack", 40, function() {
					particulasLlave.detener();
					cambiarFondo("#FFFFFF");
					Crafty.e("DelayFrame").delay(function() {
						// Desbloquear el siguiente nivel sólo si es necesario
						console.log("Desboquear: " + progreso[gestorTest.nivel + 1].bloqueado);
						if (progreso[gestorTest.nivel + 1].bloqueado) {
							Crafty.enterScene("MenuCuadros", { desbloquear: gestorTest.nivel + 1 });
						}
						else {
							Crafty.enterScene("MenuCuadros");
						}
					}, 60);
				});
			}, 60);
		});
		
		/*
		Crafty.e("DelayFrame").delay(function() {
			progreso[gestorTest.nivel + 1].bloqueado = false;
			Crafty.enterScene("MenuCuadros");
		}, 60);*/
	};
	
	
	// Establece el color de frente y de fondo de la pregunta actual
	function elegirColor() {
		var colorFondoAnt = colorFondo;
		var numColor;
		do {
			numColor = randomInt(0, 4);
			switch (numColor) {
				case 0: colorFrente = "#D3554A"; colorFondo = "#EA6054"; break;
				case 1: colorFrente = "#33766A"; colorFondo = "#4CAB9A"; break;
				case 2: colorFrente = "#645A35"; colorFondo = "#938759"; break;
				case 3: colorFrente = "#BD721E"; colorFondo = "#EA881B"; break;
				case 4: colorFrente = "#58801C"; colorFondo = "#80BA27"; break;
			}
		} while (colorFondoAnt === colorFondo);
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

		// Construimos y centramos el bloque de texto
		et.anchoCajaOpcion = anchoMaxOpcion;
		et.BloqueTexto(texto, true);
		et.y = 140 + (400 - et._h) / 2;
		et.x = ((1280 - et._w) / 2) - 10;
		
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
		
		// Establecemos la referencia a las particulas
		var numEsp = arrEsp.length;
		for (i = 0 ; i < numEsp ; i++) {
			arrEsp[i].particulas = particulas;
		}
		
		// mostramos el texto y las opciones
		et.animMostrar(function() {
			animMostrarOpciones();
		});
	}
	
	
	// Inicializar partículas
	function initParticulas() {
		particulas = new Particulas({
			componentes: "spr_fuegosArt, SpriteAnimation",
			z: 600,
			vx: 0,
			deltaVx: 2,
			periodo: 3,
			deltaOriY: 40,
			numParticulas: 9,
			magnitud: 40,
			duracion: 25,
			atenuacion: 20,
			f_crear: function(ent) {
				ent.reel("quemar", 400, [[0,0],[23,0],[46,0],[69,0]]).animate("quemar", -1);
			}
		});
		
		particulasLlave = new Particulas({
			componentes: "spr_partEstrella, SpriteAnimation",
			z: 600,
			vx: 0,
			deltaVx: 2,
			periodo: 35,
			deltaOriY: 40,
			numParticulas: 100,
			magnitud: 35,
			duracion: 60,
			atenuacion: 12,
			f_crear: function(ent) {
				ent.reel("girar", 400, [[0,0],[16,0],[32,0],[64,0]]).animate("girar", -1);
			}
		});
		
		return this;
	};
});
