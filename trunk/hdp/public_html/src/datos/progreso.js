// Conserva el progreso del jugador en el videojuego
var progreso = [
	{	// morro
		bloqueado: false, // true si este cuadro está deshabilitado
		baudilios: [0,0,0,0,0,0], // número de baudilios por nivel
		puntaje: [0,0,0,0,0,0] // puntaje por nivel
	},
	{	// belalcazar
		bloqueado: true,
		baudilios: [0,0,0,0,0,0],
		puntaje: [0,0,0,0,0,0]
	},
	{	// parque
		bloqueado: true,
		baudilios: [0,0,0,0,0,0],
		puntaje: [0,0,0,0,0,0]
	},
	{	// humilladero
		bloqueado: true,
		baudilios: [0,0,0,0,0,0],
		puntaje: [0,0,0,0,0,0]
	},
	{	// valencia
		bloqueado: true,
		baudilios: [0,0,0,0,0,0],
		puntaje: [0,0,0,0,0,0]
	},
	{
		// Posición 5 del arreglo de progreso: Configuración persistente
		version: 1.1, // Necesario para comparar datos en cada nueva actualización
		mostrarComoJugar: true, // Mostrar el diálogo de cómo jugar al hacer click en jugar por primera vez
		mostrarDialogoTerminado: true // Mostrar la felicitación al completar todos los niveles
	}
];
