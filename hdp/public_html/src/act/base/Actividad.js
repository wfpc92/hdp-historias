/**
 * Objeto global que gestiona las actividades del videojuego
 * Encargado de iniciar y detener las actividades con su puntaje e interfaces
 * Se crea sólo una vez
 */
var Actividad = function() {
	this.objAct = null; // referencia a una actividad para mostrar
	this.nivel = -1; // número de nivel actual
	this.subnivel = -1; // número de subnivel actual
	this.config = null; // referencia a la configuración del subnivel
	this.e_pista = Crafty.e("AC_Pista");
	this.temporizador = Crafty.e("Temporizador");
	this.panelPerdiste = Crafty.e("AC_Perdiste");
	this.terminada = false; // True cuando una actividad ya ha terminado (evitar ganar y perder al tiempo)

	this.temporizador.f_cbackTerminar = this.mostrarPerdiste;
};

// Muestra la pista y al terminar inicia el temporizador
Actividad.prototype.mostrarPista = function() {
	this.e_pista.mostrar(); // Mostrar la pista
	return this;
};


// Inicia una actividad
// nivel va de 0 a 4, subnivel va de 0 a 5
Actividad.prototype.ejecutar = function(nivel, subnivel) {
	// Cargamos la información y el objeto de la actividad
	this.nivel = nivel;
	this.subnivel = subnivel;
	this.terminada = false;
	this.config = niveles[nivel].subnivel[subnivel];
	this.objAct = this.config.actividad();

	// Obtenemos los recursos de la actividad
	var arrNomRec = ["morro", "belalcazar", "parque", "puente", "valencia"];
	var recursosAct = Recursos[arrNomRec[nivel]][subnivel];

	// Reconfiguramos el temporizador
	this.temporizador.reset();
	var duracionAct = (debug) ? 900000 : this.config.duracion;
	this.temporizador.setDuracion(duracionAct);

	// Reseteamos física
	resetBox2D();
	actPuntaje.initDato(); // Configuramos el dato de la actividad en la pantalla de puntaje

	// Cargar los recursos en RAM antes de iniciar actividad 
	var self = this;
	
	cargarRecursos(recursosAct, true, function() {
		Crafty.enterScene("Actividad", self);
		//reproducir el audio de fondo
		gesSonido.crear(recursosAct.musica[0], recursosAct.musica[1]);
		gesSonido.reproducirMusica(recursosAct.musica[0]);
		
		//self.mostrarPuntaje();
	});
};

// Reinicia la actividad actual
Actividad.prototype.reiniciar = function() {
	this.terminar();
	if (this.objAct.terminarActividad)
		this.objAct.terminarActividad();
	
	this.objAct = this.config.actividad();
	console.log("reiniciar actividad " + this.nivel + " - " + this.subnivel);

	this.temporizador.reset();
	var duracionAct = (debug) ? 100000 : this.config.duracion;
	this.temporizador.setDuracion(duracionAct);

	actPuntaje.ocultar();
	this.terminada = false;
	Crafty.enterScene("Actividad", this);
	
};

Actividad.prototype.siguienteActiv = function() {
	this.terminar();
	actPuntaje.ocultar();
	//verificar si la siguiente actividad corresponde a un test
	if (this.subnivel >= 5) {
		gestorTest.iniciarTest(this.nivel);
	} else {
		this.ejecutar(this.nivel, this.subnivel + 1);
	}
};


// Calcula y muestra la interfaz de puntaje
Actividad.prototype.mostrarPuntaje = function() {
	if (!this.terminada) {
		this.terminada = true;
		actPuntaje.puntosMax = 5000;

		// Calculamos el número de puntos a partir del t restante
		var tRestante = this.temporizador.getTiempoRestante();
		var calificacion = tRestante / this.temporizador.tiempoInicial; // [0:1]
		var puntosObtenidos = Math.floor(calificacion * 6000);
		
		// Actualizamos progreso
		progreso[this.nivel].puntaje[this.subnivel] = puntosObtenidos;
		progreso[this.nivel].baudilios[this.subnivel] = Math.floor(puntosObtenidos / (actPuntaje.puntosMax * 0.33));
		
		// Guardamos progreso en memoria no volátil
		

		// Desbloquear siguiente nivel si es el caso
		if (this.subnivel === 5) {
			if (this.nivel < 4) {
				progreso[this.nivel + 1].bloqueado = false;
			}
		}

		actPuntaje.puntos = puntosObtenidos;
		actPuntaje.animMostrar();
	}
};

// Muestra la interfaz de perdiste
Actividad.prototype.mostrarPerdiste = function() {
	if (!this.terminada) {
		this.terminada = true;
		this.detener();
		this.panelPerdiste.mostrar();
		this.temporizador.ocultarBtPausa();
	}
	return this;
};

// Resetear Box2D y detener el temporizador
Actividad.prototype.detener = function() {
	this.temporizador.parar();
	if (this.objAct.b2a) {
		this.objAct.b2a.destruir();
		delete this.objAct.b2a;
	}
	
	Crafty("Tweener").each(function() {
		this.cancelTweener();
	});
	
	if (this.objAct.terminarActividad)
		this.objAct.terminarActividad();

	resetBox2D(); // limpiamos Box2D
};

// Detener la actividad y ocultar el temporizador
Actividad.prototype.terminar = function() {
	this.terminada = true;
	this.detener();
	this.temporizador.ocultar();
	return this;
};