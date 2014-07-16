// *** Funciones disponibles globalmente para todo el proyecto

// Extrae las coordenadas del mouse de un evento de mouse, esté lanzándose desde Cocoon o en PC
function mouseCoords(e) {
	if (cocoon) {
		if (e.type === 'touchend' || e.type === 'touchcancel') {
			return {x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY};
		}
		else {
			return {x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY};
		}
	} else {
		return {x: e.clientX, y: e.clientY};
	}
}

// Generates a random float between 2 values
function randomFloat(min, max) {
	return Math.random() * (max - min + 1) + min;
}
;

// Generates a random integer between 2 values
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
;

//obtener y eliminar un elemento aleatorio de un array
function getRandomArray(arr) {
	var elem = Crafty.math.randomElementOfArray(arr);
	var index = arr.indexOf(elem);
	return arr.splice(index, 1);
}

//+ Desordenar un array
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o) { //v1.0
	for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
		;
	return o;
}
;


// Intenta dejar el mundo Box2D totalmente vacío
function resetBox2D() {
	if (world.GetBodyCount() > 0) {
		var ventana = world.GetBodyList();
		var temp;
		// Iteramos entre todos los cuerpos existentes para destruirlos
		while (ventana !== null) {
			temp = ventana;
			world.DestroyBody(temp);
			ventana = ventana.m_next;
		}
	}

	Crafty.box2D.unpause(); // Despausamos por si está pausado
}


/* ***** GESTIÓN DE MEMORIA ***** */

// Intenta descargar una lista de recursos de memoria (CocoonJS)
function limpiarRecurso(datos) {

	var num = datos.rutas.length;
	var ruta;
	for (i = 0; i < num; i++) {
		ruta = datos.rutas[i];
		// Si el objeto existe,
		if (!!Crafty.assets[ruta]) {
			console.log("Desechando " + ruta);
			if (cocoon)
				Crafty.assets[ruta].dispose();
			delete Crafty.assets[ruta];
		}
	}
	datos.cargado = false;
}

// Intenta limpiar todos los recursos de memoria (excepto los globales)
function limpiarTodo() {
	if (Recursos.menuPrincipal.cargado)
		limpiarRecurso(Recursos.menuPrincipal);
	if (Recursos.menuCuadros.cargado)
		limpiarRecurso(Recursos.menuCuadros);
}

// Carga los recursos descritos en el objeto "datos" (elemento del objeto Recursos)
// Cuando termina de cargarlos, ejecuta la función f()
// Cada escena es responsable de cargar sus propios recursos
// Si mostrarCortina es true se muestra la cortina de carga por defecto
// Automáticamente se limpia la memoria antes de cargar un nuevo set de recursos
function cargarRecursos(datos, mostrarCortina, f) {
	if (datos.cargado === false) {
		//limpiarTodo(); // Inicialmente, limpiamos la memoria
		console.log("Cargando recursos en memoria (" + (datos.rutas.length + (datos.audio ? 1 : 0)) + ")...");
		datos.cargado = true;

		if (mostrarCortina) {
			// eliminamos las entidades no persistentes
			Crafty("2D").each(function () {
				if (!this.has("Persist")) this.destroy();
			});
			
			// Mostramos cortina de carga	
			Crafty.e("2D, Canvas, Color").attr({ w: 1280, h: 800, z: 90000 }).color("#EB6054");
			Crafty.e("2D, Canvas, Image").attr({ x: 540, y: 330, z: 90000 }).image("img/carga/pajaro.png");
			Crafty.e("2D, Canvas, Image").attr({ x: 588, y: 518, z: 90000 }).image("img/carga/cargando.png");
			Crafty.e("2D, Canvas, Image").attr({ x: 577, y: 707, z: 90000 }).image("img/carga/logo.png");
		}
		
		Crafty.load(datos.rutas, function() {
			console.log("Carga terminada; Creando sprites...");
			if (!datos.spritesListas) {
				datos.initSprites();
				datos.spritesListas = true;
			}
			console.log("Sprites creadas!");
			f();
		});

	}
	else {
		console.log("Recursos ya cargados");
		f();
	}
}

// Elimina todo el progreso del jugador
function resetProgreso() {
	var i;
	for (i = 0 ; i < 5 ; i++) {
		progreso[i].bloqueado = true;
		progreso[i].baudilios = [0,0,0,0,0,0];
		progreso[i].puntaje = [0,0,0,0,0,0];
	}
	progreso[0].bloqueado = false; // primer nivel
	
	Crafty.storage('progreso', progreso);
}