// Objeto que gestiona la pantalla de puntaje
function ActPuntaje() {
	this.puntos = -1; // puntuación a mostrar
	this.puntosMax = -1; // máxima puntuación del nivel

	this.e_cortinaSup = null;
	this.e_cortinaInf = null;
	this.e_bloRojo = null;
	this.e_fonTexto = null;
	this.e_muyBien = null;
	this.e_lblPuntuacion = null;
	this.e_numPuntos = null;
	this.e_baudilio1 = null;
	this.e_baudilio2 = null;
	this.e_baudilio3 = null;
	this.e_dato = null;
	this.e_datoImg = null;
	this.e_btSalir = null;
	this.e_btRepetir = null;
	this.e_btSiguiente = null;
	this.e_comillaIni = null;
	this.e_comillaFin = null;

	//estos numeros representan la actividad actual, se utilizan para conocer 
	//la siguiente actividad 
	this.config = null;

	this.init();
};


// Inicialización del objeto
ActPuntaje.prototype.init = function init() {
	this.crearEntidades();
};

// Crear las entidades de la interfaz de puntaje
ActPuntaje.prototype.crearEntidades = function crearEntidades() {
	this.e_fondo = Crafty.e("2D, Canvas, Persist, Mouse") //esta entidad no va a permitir que se ejecuten eventos de clic sobre la actividad
			.attr({ x:0, y:0, z:1000, w:1280, h:800, alpha: 0, visible: false });
	// contenedores
	this.e_bloRojo = Crafty.e("2D, Canvas, Image, Tweener, Persist")
			.attr({x: 1280, y: 0, z: 1010, visible: false})
			.image("img/puntaje/blo-rojo.png");
	this.e_cortinaSup = Crafty.e("2D, Canvas, sprAP_cortinaSup, Tweener, Persist")
			.attr({x: 0, y: -195, z: 1005, visible: false});
	this.e_cortinaInf = Crafty.e("2D, Canvas, sprAP_cortinaInf, Tweener, Persist")
			.attr({x: 0, y: 800, z: 1005, visible: false});
	this.e_titulo = Crafty.e("2D, Canvas, sprAP_titulo, Tweener, Persist")
			.attr({x: 400, y: -180, z: 1006, visible: false});
	this.e_cortinaSup.attach(this.e_titulo);
	
	this.e_bloTexto = Crafty.e("2D, Canvas, Image, Tweener, Persist")
			.attr({x: 1280, y: 0, z: 1001, alpha: 1, visible: false})
			.image("img/puntaje/fon-texto.png");

	// Info de puntaje
	this.e_muyBien = Crafty.e("2D, Canvas, Image, Tweener, Persist")
			.attr({x: 981, y: 46, z: 1020, alpha: 0.0, visible: false})
			.image("img/puntaje/muy-bien.png");
	this.e_lblPuntuacion = Crafty.e("2D, Canvas, Image, Tweener, Persist")
			.attr({x: 1012, y: 369, z: 1020, alpha: 0.0, visible: false})
			.image("img/puntaje/txt-puntuacion.png");

	this.e_baudilio1 = Crafty.e("AP_Baudilio, Persist").AP_Baudilio(1000, 520);
	this.e_baudilio2 = Crafty.e("AP_Baudilio, Persist").AP_Baudilio(1132, 520);
	this.e_baudilio3 = Crafty.e("AP_Baudilio, Persist").AP_Baudilio(1067, 627);

	this.e_numPuntos = Crafty.e("AP_Numero, Persist")
			.attr({x: 1020, y: 417, z: 1020})
			.Numero()
			.baudilios(this.e_baudilio1, this.e_baudilio2, this.e_baudilio3);

	this.e_dato = Crafty.e("BloqueTexto, Persist").attr({ x: 260, y: 165, z: 1025, visible: false });
	this.e_comillaIni = Crafty.e("2D, Canvas, sprAP_comillaIni, Persist").attr({ x: 210, y: 165, z: 1020, visible: false });
	this.e_comillaFin = Crafty.e("2D, Canvas, sprAP_comillaFin, Persist").attr({ z: 1020, visible: false });
	
	this.e_datoImg = Crafty.e("2D, Canvas, sprAP_dato, Tweener, Persist")
			.attr({x: 980, y: 600, z: 1005, visible: false });

	this.e_btSalir = Crafty.e('Boton, Tweener, Persist')
			.attr({z: 1020, visible: false}).posIni(63, 685)
			.Boton("sprAP_btAtras", "sprAP_btAtras2");
	this.e_btRepetir = Crafty.e('Boton, Tweener, Persist')
			.attr({z: 1020, visible: false}).posIni(155, 683)
			.Boton("sprAP_btRepetir", "sprAP_btRepetir2");
	this.e_btSiguiente = Crafty.e('Boton, Tweener, Persist')
			.attr({z: 1020, visible: false}).posIni(275, 688)
			.Boton("sprAP_btSig", "sprAP_btSig2");
	
	
	//asignar comportamento a los botones
	var self = this;
	
	this.e_btSalir.bind("MouseUp", function() {
		self.reset();
		gesActividad.terminar();
		Crafty.scene("MenuCuadros");
	});
	
	this.e_btRepetir.bind("MouseUp", function() {
		gesActividad.reiniciar();
	});
	
	this.e_btSiguiente.bind("MouseUp", function() {
		self.ocultar();
		gesActividad.siguienteActiv();
	});
};

// Configuramos el texto e imagen del dato a mostrar
ActPuntaje.prototype.initDato = function() {
	this.e_dato.reset();
	this.config = gesActividad.config;
	this.e_dato.BloqueTexto(this.config.dato, true);
	this.e_comillaFin.attr({x: this.e_dato.ultPosX + 25, y: this.e_dato._y + this.e_dato.altoBloque - 50 });
	this.e_datoImg.sprite(gesActividad.subnivel * 170, gesActividad.nivel * 204);
	return this;
};

// Resetea el estado y contenido del panel de puntaje
ActPuntaje.prototype.ocultar = function() {
	Crafty("DelayFrame").destroy();
	
	// Evitamos que se sigan disparando partículas
	this.e_fondo.attr({ x: 1280, visible: false });
	this.e_bloRojo.attr({ x: 1280, visible: false });
	this.e_cortinaSup.attr({ y: -195, visible: false });
	this.e_cortinaInf.attr({ y: 800, visible: false });
	this.e_bloTexto.attr({ x: 1280, visible: false });
	this.e_muyBien.attr({ alpha: 0.0, visible: false });
	this.e_lblPuntuacion.attr({ alpha: 0.0, visible: false });
	this.e_numPuntos.ocultar(); // También resetea los baudilios
	this.e_datoImg.attr({ x: 980, visible: false });
	this.e_dato.ocultar();
	
	this.e_btSalir.ocultar();
	this.e_btRepetir.ocultar();
	this.e_btSiguiente.ocultar();
	
	this.e_comillaIni.visible = false;
	this.e_comillaFin.visible = false;
	
	return this;
};

ActPuntaje.prototype.reset = function ocultar() {
	this.e_dato.reset();
	this.ocultar();
};

// Animaciòn para mostrar la interfaz de puntaje y dato
// invocada en mostrarPuntaje()
ActPuntaje.prototype.animMostrar = function() {
	var self = this;
	
	// configuramos el título correcto
	this.e_titulo.sprite(0, 50 * gesActividad.nivel);
	//mostramos el fondo transparente para evitar eventos no deseados sobre la actividad en primer plano
	this.e_fondo.visible = true;
	
	// primero deslizamos el bloque rojo
	this.e_bloRojo.attr({visible: true}).addTween({x: 938}, "easeOutCubic", 25, function() {
		// deslizamos las cortinas
		self.e_titulo.visible = true;
		self.e_cortinaSup.attr({visible: true}).addTween({x: self.e_cortinaSup.x, y: 0}, "easeOutCubic", 45);
		self.e_cortinaInf.attr({visible: true}).addTween({x: self.e_cortinaInf.x, y: 605}, "easeOutCubic", 20, function() {
			// Deslizamos el bloque de texto
			self.e_bloTexto.attr({visible: true}).addTween({x: 179}, "easeOutCubic", 20, function() {
				// Mostramos el texto y la imagen del dato
				self.e_comillaIni.attr({ visible: true });
				
				self.e_dato.animMostrar(function() {
					self.e_comillaFin.visible = true;
					self.e_btSalir.animMostrar();
					self.e_btRepetir.animMostrar();
					self.e_btSiguiente.animMostrar();
				});	
	
				self.e_datoImg.attr({visible: true})
						.addTween({x: 1280 - self.e_bloRojo.w - self.e_datoImg.w + 15}, "easeOutCubic", 50);
			});
		});
		
		// mostramos el "muy bien" y la información de puntaje
		var yIni = self.e_muyBien._y;
		self.e_muyBien
				.attr({y: yIni + 20, visible: true})
				.addTween({alpha: 1.0}, "linear", 10)
				.addTween({y: yIni}, "easeOutElastic", 60);

		self.e_lblPuntuacion.attr({visible: true}).addTween({alpha: 1.0}, "linear", 10);

		// Mostramos los baudilios
		self.e_baudilio1.animAparecer(0);
		self.e_baudilio2.animAparecer(7);
		self.e_baudilio3.animAparecer(14);

		// Contamos hasta el puntaje total
		self.e_numPuntos.contar(self.puntos, self.puntosMax);
	});

	return this;
};


