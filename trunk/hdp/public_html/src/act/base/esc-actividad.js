// Escena que representa una de las actividades (subniveles)
Crafty.defineScene("Actividad", function(objActividad) {
	objActividad.objAct.init(); // Inicializamos esta actividad
	objActividad.mostrarPista(); // Mostramos la pista (al ocultarse la pista inicia el temporizador)
});