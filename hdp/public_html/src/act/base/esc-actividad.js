// Escena que representa una de las actividades (subniveles)
Crafty.defineScene("Actividad", function(objActividad) {
	// Inicializamos esta actividad
	objActividad.objAct.init();
	
	objActividad.mostrarPista(); // Mostramos la pista (al ocultarse la pista inicia el temporizador)
});