Crafty.defineScene("MenuCuadros", function() {
	//boton de atras para la postal
	var e_btAtrasFondo, e_btAtrasCuadro;
	var e_fondo, e_logo; // Fondo
	var cuadros = new Array(5); // Cuadros en la pared

	var numCuadroActivo = -1; // Cuadro [1:5] actualmente activo (-1 si ninguno)
	var e_grillaH, e_grillaV, e_sombraH;
	var actividades = new Array(6);
	var e_btAtras;
	var objCortina = new Cortina();
	

	function crearEntidades() {
		e_fondo = Crafty.e("2D, Canvas, Image, Tweener")
				.image("img/menu-cuadros/fondo.jpg")
				.attr({x: 0, y: -190, w: 1280, h: 990});
		e_logo = Crafty.e("2D, Canvas, Image")
				.image("img/menu-cuadros/logo.png")
				.attr({x: 514, y: 670, w: 249, h: 92});
		e_fondo.attach(e_logo);

		// Actividades
		for (i = 0; i < 6; i++) {
			actividades[i] = Crafty.e("MC_btActiv").MC_btActiv(i + 1);
		}
		
		e_grillaH = Crafty.e("MC_grilla").MC_grilla(true);
		e_grillaV = Crafty.e("MC_grilla").MC_grilla(false);
		
		e_sombraH = Crafty.e("MC_Sombra");
		
		// Cuadros en la pared
		cuadros[0] = Crafty.e("MC_Cuadro")
							.MC_Cuadro(1, 200, 80, 500, 291, actividades, e_grillaH, e_sombraH)
							.attr({ x: 200, y: -480, w: 367, h: 254})
							.crearCandado(2, 0);
		cuadros[1] = Crafty.e("MC_Cuadro")
							.MC_Cuadro(2, 550, 30, 542, 248, actividades, e_grillaV, null)
							.attr({ x: 550, y: -400, w: 248, h: 343})
							.crearCandado(-17, -18);
		cuadros[2] = Crafty.e("MC_Cuadro")
							.MC_Cuadro(3, 770, 120, 473, 290, actividades, e_grillaH, e_sombraH)
							.attr({ x: 770, y: -500, w: 395, h: 256})
							.crearCandado(2, 0);
		cuadros[3] = Crafty.e("MC_Cuadro")
							.MC_Cuadro(4, 241, 343, 481, 292, actividades, e_grillaH, e_sombraH)
							.attr({ x: 241, y: -300, w: 376, h: 260})
							.crearCandado(2, 0);
		cuadros[4] = Crafty.e("MC_Cuadro")
							.MC_Cuadro(5, 730, 365, 494, 304, actividades, e_grillaH, e_sombraH)
							.attr({ x: 730, y: -300, w: 350, h: 242})
							.crearCandado(1, 0);

		

		// Botón de atrás para la escena
		e_btAtras = Crafty.e("Boton, Tweener")
								.attr({z: 100}).posIni(53, 675)
								.Boton("sprGL_btAtras", "sprGL_btAtras2")
								.bloquear();
		e_fondo.attach(e_btAtras);

		// Botón de atrás para cada cuadro
		e_btAtrasCuadro = Crafty.e("Boton, Tweener")
								.attr({ z: 101, alpha: 0.0 }).posIni(1130, 141)
								.Boton("sprMC_btAtrasCuadro", "sprMC_btAtrasCuadro2")
								.bloquear();
	}

	// Establecer funcionalidad de entidades
	function initAcciones() {
		// Cuadros
		for (i = 0; i < 5; i++) {
			cuadros[i].bind("MouseUp", function() {
				if (!this.bloqueado) {
					if (!this.candado) {
						numCuadroActivo = this.num;
						animMostrarCuadro(this.num);
					}
				}
			});
		}

		// Botón de atrás para la escena
		e_btAtras.bind("MouseUp", function() {
			if (!this.bloqueado) {
				
				this.bloquear();
				objCortina.aparecer(40, 'Inicio');
			}
		});

		// Botón de atrás para cada cuadro
		e_btAtrasCuadro.bind("MouseUp", function() {
			if (!this.bloqueado) {
				this.bloquear();
				animSalirCuadro(numCuadroActivo);
			}
		});
	}

	// Animación de entrada del menú principal
	function animEntradaIni() {
		// Deslizamos los cuadrados desde arriba
		for (i = 0 ; i < 5 ; i++) {
			cuadros[i].bloquear()
						.addTween({y: cuadros[i].yIni}, "easeOutQuad", 50, function() {
							if (!this.candado) this.habilitar();
						});
		}
		Crafty.e("Delay").delay(function() { e_btAtras.habilitar(); }, 400);
		
	}

	// Retirar el botón de atrás, empequeñecer el cuadro, devolver los otros cuadros a sus lugares, devolver la pared a su estado normal
	function animSalirCuadro(numCuadro) {
		var e_cActivo = cuadros[numCuadro - 1];
		e_cActivo.animOcultarGrande();
		
		// Mostramos los otros cuadros
		for (i = 0 ; i < 5 ; i++) {
			if (numCuadro !== i + 1)
				cuadros[i].animMostrar();
		}

		// volvemos a colocar el fondo
		e_fondo.addTween({y: -190}, "easeInOutCubic", 40);
		
		// Quitamos el botón "atrás" de los cuadros
		e_btAtrasCuadro.bloquear();
		e_btAtrasCuadro.addTween({alpha: 0}, "linear", 8);
	}

	// Retirar los cuadros y desplazar la cámara hacia arriba
	// También posicionar el cuadro accedido
	function animMostrarCuadro(numCuadro) {
		var e_cActivo = cuadros[numCuadro - 1];
		e_cActivo.bloquear();

		// Escondemos los otros cuadros
		for (i = 0 ; i < 5 ; i++) {
			if (numCuadro !== i + 1)
				cuadros[i].animEsconder();
		}

		// desplazamos el fondo hacia arriba
		e_fondo.addTween({y: 0}, "easeInOutCubic", 40);
		
		// Mostramos el cuadro en su versión grande
		e_cActivo.animMostrarGrande();
		
		Crafty.e("Delay").delay(function() {
			e_btAtrasCuadro.addTween({alpha: 1}, "linear", 15, function() { this.habilitar(); });
		}, 1200);
	}

	// Bloquea los niveles de acuerdo con el progreso del jugador
	function actEstadoCuadros() {
		for (i = 0 ; i < 5 ; i++) {
			cuadros[i].actualizarProgreso();
		}
	}


	// Cargamos recursos del menú de cuadros y luego iniciamos la escena
	objCortina.visible();
	cargarRecursos(Recursos.menuCuadros, false, function() {
		console.log("Recursos cargados!");
		
		crearEntidades();
		initAcciones();
		actEstadoCuadros();

		objCortina.desaparecer(50);
		Crafty.e("Delay").delay(function() {
			animEntradaIni();
		}, 700);
		gesSonido.reproducirMusica('m_inicio');
	});
});