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
	this.e_fondo = Crafty.e("2D, Canvas, Color, Persist, Mouse")//esta entidad no va a permitir que se ejecuten eventos de clic sobre la actividad
			.attr({x:0, y:0, z:1010, w:1280, h:800, alpha:0.0, visible:false})
			.color("#000000")
			.bind("MouseDown", function(){})
			.bind("MouseUp", function(){})
			.bind("MouseMove", function(){})
	// contenedores
	this.e_bloRojo = Crafty.e("2D, Canvas, Image, Tweener, Persist")
			.attr({x: 1280, y: 0, z: 1010, visible: false})
			.image("img/puntaje/blo-rojo.png");
	this.e_cortinaSup = Crafty.e("2D, Canvas, sprAP_cortinaSup, Tweener, Persist")
			.attr({x: 0, y: -195, z: 1005, visible: false});
	this.e_cortinaInf = Crafty.e("2D, Canvas, sprAP_cortinaInf, Tweener, Persist")
			.attr({x: 0, y: 800, z: 1005, visible: false});
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

	this.e_baudilio1 = Crafty.e("AP_Baudilio, Persist").attr({x: 1000, y: 520, z: 1020, alpha: 0.0, visible: false});
	this.e_baudilio2 = Crafty.e("AP_Baudilio, Persist").attr({x: 1132, y: 520, z: 1020, alpha: 0.0, visible: false});
	this.e_baudilio3 = Crafty.e("AP_Baudilio, Persist").attr({x: 1067, y: 627, z: 1020, alpha: 0.0, visible: false});

	this.e_numPuntos = Crafty.e("AP_Numero, Persist")
			.attr({x: 1020, y: 417, z: 1020})
			.Numero()
			.baudilios(this.e_baudilio1, this.e_baudilio2, this.e_baudilio3);

	this.e_dato = Crafty.e("BloqueTexto, Persist").attr({ x: 270, y: 170, z: 1025, visible: false });
	this.e_comillaIni = Crafty.e("2D, Canvas, sprAP_comillaIni, Persist").attr({ x: 220, y: 165, z: 1020, visible: false });
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
	// Evitamos que se sigan disparando partículas
	this.e_fondo.attr({ x: 1280, visible: false });
	this.e_bloRojo.attr({ x: 1280, visible: false });
	this.e_cortinaSup.attr({ y: -195, visible: false });
	this.e_cortinaInf.attr({ y: 800, visible: false });
	this.e_bloTexto.attr({ x: 1280, visible: false });
	this.e_muyBien.attr({ alpha: 0.0, visible: false });
	this.e_lblPuntuacion.attr({ alpha: 0.0, visible: false });
	this.e_baudilio1.attr({ alpha: 0.0, visible: false }).reset();
	this.e_baudilio2.attr({ alpha: 0.0, visible: false }).reset();
	this.e_baudilio3.attr({ alpha: 0.0, visible: false }).reset();
	this.e_datoImg.attr({ x: 980, visible: false });
	this.e_dato.ocultar();
	this.e_btSalir.ocultar();
	this.e_btRepetir.ocultar();
	this.e_btSiguiente.ocultar();
	this.e_numPuntos.ocultar();
	this.e_comillaIni.visible = false;
	this.e_comillaFin.visible = false;
	return this;
};

ActPuntaje.prototype.reset = function ocultar() {
	this.e_dato.reset();
	this.ocultar();
	/*
	var self = this;
	// primero deslizamos el bloque rojo para ocultarlo 
	this.e_bloRojo.addTween({x: 1280 + this.e_bloRojo.w}, "easeOutCubic", 25);
	self.e_cortinaSup.addTween({x: self.e_cortinaSup.x, y: -self.e_cortinaSup.h}, "easeOutCubic", 45);
	self.e_cortinaInf.addTween({x: self.e_cortinaInf.x, y: 800 + self.e_cortinaInf.h}, "easeOutCubic", 20);
	// Deslizamos el bloque de texto para ocultarlo
	self.e_bloTexto.addTween({x: 1280 + self.e_bloTexto.w}, "easeOutCubic", 20);
	// ocultar el texto y la imagen del dato
	self.e_dato.addTween({x: 1280 + self.e_dato.w}, "linear", 30);
	self.e_datoImg.addTween({y: 800 + self.e_datoImg.h}, "easeOutBack", 50);
	self.e_btSalir.addTween({y: 800 + self.e_btSalir.h}, "easeOutCubic", 45);
	self.e_btRepetir.addTween({y: 800 + self.e_btRepetir.h}, "easeOutCubic", 45);
	self.e_btSiguiente.addTween({x: 800 + self.e_btSiguiente.h}, "easeOutCubic", 45);
	// ocultar el "muy bien" y la información de puntaje
	self.e_muyBien.addTween({x: 1280 + self.e_muyBien.w}, "linear", 10);
	self.e_lblPuntuacion.addTween({x: 1280 + self.e_muyBien.w}, "linear", 10);
	// Mostramos los baudilios
	self.e_baudilio1.addTween({x: 1280 + self.e_baudilio1.w}, "linear", 20);
	self.e_baudilio2.addTween({x: 1280 + self.e_baudilio2.w}, "linear", 20);
	self.e_baudilio3.addTween({x: 1280 + self.e_baudilio3.w}, "linear", 20);
	Crafty("AP_Digito").destroy();
	self.e_numPuntos.destroy();
	*/
};

// Animaciòn para mostrar la interfaz de puntaje y dato
// invocada en mostrarPuntaje()
ActPuntaje.prototype.animMostrar = function() {
	var self = this;
	//mostramos el fondo para evitar eventos no deseados sobre la actividad en primer plano
	this.e_fondo.attr({x:0, visible: true});
	// primero deslizamos el bloque rojo
	this.e_bloRojo.attr({visible: true}).addTween({x: 938}, "easeOutCubic", 25, function() {
		// deslizamos las cortinas
		self.e_cortinaSup.attr({visible: true}).addTween({x: self.e_cortinaSup.x, y: 0}, "easeOutCubic", 45);
		self.e_cortinaInf.attr({visible: true}).addTween({x: self.e_cortinaInf.x, y: 605}, "easeOutCubic", 20, function() {
			// Deslizamos el bloque de texto
			self.e_bloTexto.attr({visible: true}).addTween({x: 179}, "easeOutCubic", 20, function() {
				// Mostramos el texto y la imagen del dato
				self.e_comillaIni.attr({ visible: true });
				self.e_dato.animMostrar(function() {
					self.e_comillaFin.visible = true;
					self.e_btSalir.attr({ visible: true }).addTween({ alpha:1 }, "linear", 15);
					self.e_btRepetir.attr({ visible: true }).addTween({ alpha:1 }, "linear", 15);
					self.e_btSiguiente.attr({ visible: true }).addTween({ alpha:1 }, "linear", 15);
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
		self.e_baudilio1.attr({visible: true}).addTween({alpha: 1.0}, "linear", 20);
		self.e_baudilio2.attr({visible: true}).delay(function() {
			this.addTween({alpha: 1.0}, "linear", 20);
		}, 100);
		self.e_baudilio3.attr({visible: true}).delay(function() {
			this.addTween({alpha: 1.0}, "linear", 20);
		}, 200);

		// Contamos hasta el puntaje total
		self.e_numPuntos.contar(self.puntos, self.puntosMax);
	});

	return this;
};


