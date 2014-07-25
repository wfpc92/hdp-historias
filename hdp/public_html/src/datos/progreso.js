// Conserva el progreso del jugador en el videojuego
var progreso = [
	{	// morro
		bloqueado: false, // true si este cuadro está deshabilitado
		baudilios: [3,3,3,2,0,0], // número de baudilios por nivel
		puntaje: [1,0,0,0,0,0] // puntaje por nivel
	},
	{	// belalcazar
		bloqueado: true,
		baudilios: [3,3,3,3,0,0],
		puntaje: [0,0,0,0,0,0]
	},
	{	// parque
		bloqueado: true,
		baudilios: [3,3,3,3,1,0],
		puntaje: [0,0,0,0,0,0]
	},
	{	// humilladero
		bloqueado: true,
		baudilios: [3,3,3,3,2,0],
		puntaje: [0,0,0,0,0,0]
	},
	{	// valencia
		bloqueado: true,
		baudilios: [3,3,3,3,3,0],
		puntaje: [0,0,0,0,0,0]
	}
];
