var cocoon = (navigator.isCocoonJS);
var gesActividad; // Inicia las actividades
var actPuntaje; // Muestra el panel de puntaje y dato
var gesSonido; // Gestor de audios
var world = null; // Mundo Box2D
var debug = true; // True para activar el modo desarrollador

window.onload = function() {
	Crafty.init(1280, 800);
	if (!cocoon) {
		Crafty.canvas.init();
	}
	Crafty.timer.FPS(60);
	Crafty.timer.steptype("variable"); // variable, fixed, semifixed

	// Cargamos progreso de memoria
	var progresoGuardado = Crafty.storage('progreso');
	if (progresoGuardado) {
		progreso = progresoGuardado;
	}

	// Inicializamos el objeto único global Box2D
	Crafty.box2D.init(0, 10, 32, true);
	world = Crafty.box2D.world;
	//if (!cocoon) Crafty.box2D.showDebugInfo();
	gesSonido = new Sonido();

	// Cargamos recursos globales (incluídos sprites) antes de hacer cualquier cosa
	cargarRecursos(Recursos.global, false, function() {
		gesActividad = new Actividad(); // sólo inicializar 1 vez
		actPuntaje = new ActPuntaje();
		gestorTest = new Test(); //gestor de tests

		gesActividad.ejecutar(3, 2); // Nivel de 0 a 4, Subnivel de 0 a 5
		//gestorTest.iniciarTest(0);
		//Crafty.enterScene("Inicio");
		gesSonido.silenciar();
	});

	// Desbloquear todos los niveles en modo debug
	if (debug) {
		for (i = 0; i < 5; i++) {
			progreso[i].bloqueado = false;
			progreso[i].puntaje = [1, 1, 1, 1, 1, 1];
		}
	}
};
