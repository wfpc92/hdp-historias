/**
 * Componente de temporizacion de actividades, esta fuertemente acoplado 
 * con juego.actividad, envia mensajes de terminacion o pausa.
 */
Crafty.c('Temporizador', {
	tiempoInicial: 0,
	id: 0,
	maxAncho: 0, // maximo de tamano de ancho de la barra
	anchoBarra : 0, // ancho actual de la barra
	msIntervalo: 33, // ms por intervalo
	contadorIntervalos: 0,
	maxIntervalos: 0, // contadorIntervalos cuenta hasta esto
	delta: 0,
	activo: false, // true si está contando tiempo
	
	e_barra: null, // barra que disminuye
	e_reloj: null, // reloj que se desplaza
	e_pausa: null, // botón de pausa
	e_panelPausa: null, // panel completo de interfaz de pausa
	
	intervalPausa: null, // Interval de pantalla de pausa que despacha los frames
	f_cbackTerminar: null, // función de callback a invocar cuando se termina el tiempo
	
	init: function() {
		var self = this;
		var w1 = Crafty.canvas._canvas.width;
		
		// dibujar en esta entidad la barra de fondo
		this.requires('2D, Canvas, sprBarraFondo, Persist');
		
		// calcular posicion x del temporizador (centrado)
		var w2 = this.w;
		var x0 = (w1 - w2) / 2.0;
		this.attr({ x:x0, y:713, z:900 });
		
		// dibujar la barra que va disminuyendo
		this.e_barra = Crafty.e('2D, Canvas, sprBarraTemporizador, Persist')
							.attr({x: this._x + 6, y: this._y + 4, z: this.z + 1});
		
		this.maxAncho = this.e_barra.w;
		
		this.e_reloj = Crafty.e('2D, Canvas, Mouse, sprReloj, Persist')
				.attr({x: this._x + 595, y: this._y - 25, z: this.z + 2});

		// Componente para pausar o despausar actividad
		this.e_pausa = Crafty.e("2D, Canvas, Mouse, sprPausa, Persist")
			.attr({x: this._x + 760, y: this._y - 25, z: this.z})
			.bind("MouseUp", function() {
				self.pausar();
			});
		
		this.e_panelPausa = Crafty.e("Pausa").Pausa(this);
		
		this.ocultar(); // Inicialmente oculto; mostrar manualmente con mostrar()
	},
	
	/**
	 * Empieza con el temporizador o hace que continue con su ejecucion
	 * hasta el limite de tiempo. 
	 * (actua como una funcion toogle de pausa y despausa)
	 */
	iniciar: function() {
		this.activo = true;
		this.delta = this.maxAncho * this.msIntervalo / this.tiempoInicial;
		this.maxIntervalos = Math.floor(this.tiempoInicial / this.msIntervalo);
		// iniciar temporizador de tiempo, cada msIntervalo milisegundos se ejecuta una funcion de actualizacion 
		var self = this;
		
		this.myInterval = setInterval(function() {
			self.actualizar();
			// si se llego al limite de tiempo, entonces terminar actividad.
			if ((++self.contadorIntervalos) >= self.maxIntervalos) {
				self.parar();
				gesActividad.mostrarPerdiste();
			}
		}, this.msIntervalo);
		
		return this;
	},
	
	/**
	 * Hace cambiar el tamaño de la barra y actualiza el contador. de segundos
	 * y milisegundos
	 */
	actualizar: function() {
		// disminuir el tamaño de la barra 
		this.anchoBarra = (this.e_barra.w - this.delta) > 0 ? this.e_barra.w - this.delta : 0;
		this.e_barra.crop(0, 0, this.anchoBarra, 18);
		// actualizar reloj para que se posicione siempre 
		this.e_reloj.x = this.e_barra.x + this.e_barra.w - 25;
		return this;
	},
	
	/**
	 * Se llama cuando el tiempo se ha agotado, o cuando la actividad se 
	 * ha ganado.
	 */
	parar: function() {
		if (this.activo) {
			clearInterval(this.myInterval);
			this.activo = false;
			this.ocultarBtPausa();
		}
		return this;
	},
	
	// Reinicia todas las variables del temporizador
	reset: function() {
		this.delta = 0;
		this.activo = false;
		this.contadorIntervalos = 0;
		this.e_barra.crop(0, 0, 618, 18);
		this.actualizar();
		return this;
	},
	
	// Pausa el juego
	// La entidad de panel de pausa tiene su propio timer aparte de Crafty
	pausar: function() {
		clearInterval(this.myInterval);
		this.e_pausa.visible = false;
		Crafty.pause();
		this.e_panelPausa.mostrar();
		return this;
	},
	
	// Des-pausa el juego
	despausar: function() {
		Crafty.pause();
		this.iniciar();
		this.e_pausa.visible = true;
		return this;
	},
	
	// Muestra el temporizador en pantalla
	mostrar: function() {
		this.visible = true;
		this.e_barra.visible = true;
		this.e_reloj.visible = true;
		this.e_pausa.visible = true;
		return this;
	},
	
	// Oculta el temporizador
	ocultar: function() {
		this.visible = false;
		this.e_barra.visible = false;
		this.e_reloj.visible = false;
		this.e_pausa.visible = false;
		return this;
	},
	
	// Incrementa el tiempo el número de intérvalos dado
	incrementar: function(ms) {
		var numInt = Math.floor(ms / this.msIntervalo);
		this.contadorIntervalos -= numInt;
		if (this.contadorIntervalos < 0)
			this.contadorIntervalos = 0;
		
		var nuevoAncho = this.anchoBarra + numInt * this.delta;
		if (nuevoAncho > this.maxAncho) nuevoAncho = this.maxAncho;
		this.e_barra.crop(0, 0, nuevoAncho, 18);
		return this;
	},
	
	setDuracion: function(t) {
		this.tiempoInicial = t;
		return this;
	},
	
	mostrarBtPausa: function() {
		this.e_pausa.visible = true;
		return this;
	},
	
	ocultarBtPausa: function() {
		this.e_pausa.visible = false;
		return this;
	},
	
	// Devuelve el tiempo restante
	getTiempoRestante: function() {
		var tRestante = this.tiempoInicial - this.contadorIntervalos * this.msIntervalo;
		return tRestante;
	}
});