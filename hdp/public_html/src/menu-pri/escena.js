Crafty.defineScene("menuPrincipal", function() {
	// Menú principal
	var e_fondo, e_cielo, e_pisoFondo, e_pisoFrente, e_caballo, e_caballoSomb, e_nubeIzq, e_nubeDer, e_logo; // decoración
	var e_btJugar, e_btConfig, e_btAudio, e_btLike; // botones menú principal
	var e_logoConfig, e_btReset, e_btFaq, e_btTutorial, e_btCreditos, e_btAtras; // menú configuración
	var e_dialogReset, e_dialogCredi;
	var objCortina = new Cortina();
	

	function crearEntidades() {
		// Decoración menú principal
		e_fondo = Crafty.e("2D, Canvas, Color")
				.attr({x: 0, y: 0, w: Crafty.viewport._width, h: Crafty.viewport._height})
				.color("#688fa0");
		e_cielo = Crafty.e("2D, Canvas, Image, Tweener")
				.attr({x: 0, y: 70, z: 1})
				.image("img/menu-pri/fondo.png");
		e_pisoFrente = Crafty.e("2D, Canvas, Image, Tweener")
				.attr({x: 373, y: 840, z: 20, w: 908, h: 145})
				.image("img/menu-pri/piso-frente.png");
		e_pisoFondo = Crafty.e("2D, Canvas, Image, Tweener")
				.attr({x: 0, y: 680, z: 10})
				.image("img/menu-pri/piso-fondo.png");
		e_caballoSomb = Crafty.e("2D, Canvas, Image, Tweener")
				.attr({x: 905, y: 845, z: 25, w: 153, h: 94})
				.image("img/menu-pri/caballo-somb.png");
		e_caballo = Crafty.e("2D, Canvas, sprMI_caballo, SpriteAnimation")
				.attr({x: 845, y: 656, z: 25, w: 210, h: 204})
				.reel("contemplar", 3500, [
					[0, 0], [210, 0], [420, 0], [630, 0], [840, 0], [1050, 0], [1260, 0], [1470, 0], [0, 204], [210, 204], [420, 204], [630, 204], [840, 204], [1050, 204], [1260, 204], [1470, 204], [0, 408], [210, 408], [420, 408], [630, 408], [840, 408], [1050, 408], [1260, 408], [1470, 408], [0, 612], [210, 612], [420, 612], [630, 612], [840, 612], [1050, 612], [1260, 612], [1470, 612], [0, 816], [210, 816], [420, 816], [630, 816], [840, 816], [1050, 816], [1260, 816], [1470, 816]
				]);
		e_nubeIzq = Crafty.e("2D, Canvas, Image, Tweener, Oscilador")
				.attr({x: -190, y: 410, z: 5})
				.image("img/menu-pri/nube-izq.png");
		e_nubeDer = Crafty.e("2D, Canvas, Image, Tweener, Oscilador")
				.attr({x: 850, y: 360, z: 5})
				.image("img/menu-pri/nube-der.png");
		e_logo = Crafty.e("2D, Canvas, Image, Tweener, Delay")
				.attr({x: 440, y: 174, z: 25, alpha: 0.0})
				.image("img/menu-pri/logo.png");

		// Botones menú principal
		e_btJugar = Crafty.e("MI_btJugar")
				.posIni(560, 388)
				.attr({ z: 7, visible: false, alpha: 0.0 });
		e_btConfig = Crafty.e("MI_btConfig")
				.attr({ x: 1280, y: 186, z: 25 }).posIni(1165, 186).ocultarLateral();
		e_btAudio = Crafty.e("MI_btAudio")
				.attr({ x: 1280, y: 289, z: 25 }).posIni(1154, 289).ocultarLateral();
		e_btLike = Crafty.e("MI_btLike")
				.attr({ x: 1280, y: 385, z: 25 }).posIni(1168, 385).ocultarLateral();

		// Decoración menú configuración
		e_logoConfig = Crafty.e("2D, Canvas, Image, Tweener, Delay")
				.attr({x: 495, y: 106, z: 25, alpha: 0.0, visible: false})
				.image("img/menu-pri/logo-config.png");

		// Botones menú configuración
		e_btReset = Crafty.e("MI_btReset")
				.attr({z: 25, alpha: 0.0, visible: false}).posIni(461, 309);
		/*
		e_btFaq = Crafty.e("MI_btFaq")
				.attr({z: 25, alpha: 0.0, visible: false}).posIni(469, 380);
		e_btTutorial = Crafty.e("MI_btTutorial")
				.attr({z: 25, alpha: 0.0, visible: false}).posIni(519, 451);
		*/
		e_btCreditos = Crafty.e("MI_btCreditos")
				//.attr({z: 25, alpha: 0.0, visible: false}).posIni(541, 519);
				.attr({z: 25, alpha: 0.0, visible: false}).posIni(541, 380);
		
		e_btAtras = Crafty.e("MI_btAtras")
				.attr({z: 25}).posIni(1165, 185).ocultar();
		
		// Diálogos
		e_dialogReset = Crafty.e("MP_DialogReset");
		e_dialogCredi = Crafty.e("MP_DialogCredi");
		
	}

	// Animación de entrada del menú principal
	function animEntradaIni() {
		// FadeOut desde cortina blanca
		var objCortina = new Cortina();
		objCortina.desaparecer(100);

		// el cielo, los pisos y las nubes suben en perspectiva
		e_cielo.addTween({y: 0}, "easeOutCubic", 150);
		e_pisoFondo.addTween({y: 588}, "easeOutCubic", 170);
		e_caballo.animate("contemplar", -1);
		e_caballo.attach(e_caballoSomb);
		e_pisoFrente.attach(e_caballo).addTween({y: 656}, "easeOutCubic", 250);
		e_nubeIzq.addTween({x: -170, y: 310}, "easeOutCubic", 190, function() {
			this.oscilarX(20, 480);
		});
		e_nubeDer.addTween({x: 815, y: 260}, "easeOutCubic", 190, function() {
			this.oscilarX(20, 450);
		});
		// el logo aparece con fadein
		e_logo.delay(function() {
			this.addTween({alpha: 1.0}, "linear", 100);
		}, 1000);

		// luego de un momento, los botones aparecen
		Crafty.e("DelayFrame").delay(function() {
			// btJugar sube detrás de las montañas
			e_btJugar.animMostrar();

			// Los botones laterales se deslizan desde su borde de la pantalla
			e_btConfig.animMostrar(0);
			e_btAudio.animMostrar(200);
			e_btLike.animMostrar(400);
		}, 120);
	}

	// Animación de transición desde el menú principal al menú de configuración
	function animEntrarMenuConfig() {
		// Los botones se repliegan de donde salieron
		e_btAudio.animEsconder(120);
		e_btLike.animEsconder(240);
		e_btJugar.animEsconder();

		// el logo se desvanece, y aparece su versión del menú de config
		e_logo.addTween({alpha: 0.0}, "linear", 50, function() {
			this.visible = false;
			e_logoConfig.attr({visible: true}).addTween({alpha: 1.0}, "linear", 50);
		});

		// aparecen los botones de config. desde abajo
		Crafty.e("Delay").delay(function() {
			e_btReset.animMostrar(70, 0);
			//e_btFaq.animMostrar(90, 100);
			//e_btTutorial.animMostrar(110, 200);
			//e_btCreditos.animMostrar(130, 300);
			e_btCreditos.animMostrar(90, 100);

			e_btAtras.animMostrar(0);
		}, 1400);

		// los pisos y las nubes se mueven para crear ilusión de perspectiva
		e_nubeIzq.addTween({x: (e_nubeIzq._x - 6)}, "easeOutCubic", 70);
		e_nubeDer.addTween({x: (e_nubeDer._x - 6)}, "easeOutCubic", 70);
		e_pisoFondo.addTween({x: -10}, "easeOutCubic", 70);
		e_pisoFrente.addTween({x: (e_pisoFrente._x + 35)}, "easeOutCubic", 70);
	}

	// Animación de transición desde el menú de configuración al menú principal
	function animSalirMenuConfig() {
		// Desvanecer el logo pequeño y aparecer el grande
		e_logoConfig.addTween({alpha: 0.0}, "linear", 60, function() {
			this.visible = false;
			e_logo.attr({visible: true}).addTween({alpha: 1.0}, "linear", 60);
		});

		// Deslizar abajo y desvanecer los botones de configuración
		e_btCreditos.animEsconder(130, 0);
		/*e_btTutorial.animEsconder(110, 60);
		e_btFaq.animEsconder(90, 120);
		e_btReset.animEsconder(70, 180);*/
		e_btReset.animEsconder(110, 60);

		// Regresamos las montañas y nubes a su ubicación original
		e_nubeIzq.addTween({x: (e_nubeIzq._x + 6)}, "easeOutCubic", 70);
		e_nubeDer.addTween({x: (e_nubeDer._x + 6)}, "easeOutCubic", 70);
		e_pisoFondo.addTween({x: 0}, "easeOutCubic", 70);
		e_pisoFrente.addTween({x: (e_pisoFrente._x - 35)}, "easeOutCubic", 70);

		// Mostramos el boton jugar y los botones de opciones
		Crafty.e("Delay").delay(function() {
			e_btConfig.animMostrar(0);
			e_btAudio.animMostrar(200);
			e_btLike.animMostrar(400);
			e_btJugar.animMostrar();
		}, 1200);
	}


	// Animación de transición de salida de esta escena a la selección de postal
	// Activa la siguiente escena
	function transicionJugar() {
		// Escondemos los botones laterales
		e_btConfig.animEsconder(0);
		e_btAudio.animEsconder(40);
		e_btLike.animEsconder(80);

		// desplazamos los terrenos y las nubes hacia abajo
		e_pisoFrente.addTween({y: 1000}, "easeInCubic", 75);
		e_pisoFondo.addTween({y: 800}, "easeInCubic", 105);
		e_nubeIzq.pararOscilar().addTween({y: 800}, "easeInCubic", 140);
		e_nubeDer.pararOscilar().addTween({y: 800}, "easeInCubic", 145);
		e_cielo.addTween({y: 100}, "easeInCubic", 200);

		e_btJugar.animEsconder();
		e_logo.addTween({alpha: 0.0}, "linear", 40);

		Crafty.e("Delay").delay(function() {
			objCortina.aparecer(60, "MenuCuadros");
		}, 250);
	}
	
	// Bloquear los botones del menú de configuración
	function bloquearBtConfig() {
		e_btReset.bloquear();
		e_btCreditos.bloquear();
		//e_btTutorial.bloquear();
		//e_btFaq.bloquear();
	}
	// Habilitar los botones del menú de configuración
	function desbloquearBtConfig() {
		e_btReset.habilitar();
		e_btCreditos.habilitar();
		//e_btTutorial.habilitar();
		//e_btFaq.habilitar();
	}

	gesSonido.crear('m_inicio', 'audio/global/tema.ogg');
	gesSonido.reproducirMusica('m_inicio');
	
	crearEntidades();

	// Mostrar menu de configuracíon al hacer click en el botón config
	e_btConfig.bind("MouseUp", function() {
		if (!this.bloqueado) {
			this.animEsconder(30);
			animEntrarMenuConfig();
		}
	});

	// Mostrar menu de configuracíon al hacer click en el botón config
	e_btAudio.bind("MouseUp", function() {
		var mute = gesSonido.silenciar();
		this.cambiarSprite(mute);
	});
	
	// Like en facebook
	e_btLike.bind("MouseUp", function() {
		CocoonJS.App.openURL("https://www.facebook.com/historiaspopayan");
	});
	
	// Al hacer click en btAtras, ocultar el menú de configuración y volver al menú principal
	e_btAtras.bind("MouseUp", function() {
		console.log("MouseUp bloqueado=" + this.bloqueado)
		if (!this.bloqueado) {
			this.animEsconder(0);
			animSalirMenuConfig();
		}
	});

	// Al hacer click en btJugar, activar la transición a la escena de jugar
	e_btJugar.bind("MouseUp", function() {
		if (!this.bloqueado) {
			this.bloquear();
			transicionJugar();
		}
	});
	
	// Mostrar diálogo de reestablecer progreso
	e_btReset.bind("MouseUp", function() {
		if (!this.bloqueado) {
			bloquearBtConfig();
			e_dialogReset.f_callback = desbloquearBtConfig;
			e_dialogReset.mostrar();
		}
	});
	
	// Mostrar diálogo de créditos
	e_btCreditos.bind("MouseUp", function() {
		if (!this.bloqueado) {
			bloquearBtConfig();
			e_dialogCredi.f_callback = desbloquearBtConfig;
			e_dialogCredi.mostrar();
		}
	});

	animEntradaIni();
});