var Test = function() {
	this.nivel = 0;
	this.banco = null;
	this.preguntaActual = null;
	this.contRespuestasOK = 0;
	this.numPreguntas = 0; // Número de preguntas que se debe aprobar para concluir el test
	this.f_inicializar = null; // Función a ejecutar para inicializar la pregunta
	
	this.e_numero = null; // Referencia al número de test
};

// Elige una pregunta aleatoria
Test.prototype.elegirPregunta = function() {
	this.preguntaActual = Crafty.math.randomElementOfArray(this.banco);
};

// Inicia la escena de test
Test.prototype.iniciarTest = function(nivel) {
	//obtener las preugntas de la base de datos
	//obtener aleatoriamente la pregunta
	//mosrtar la pregunta
	this.nivel = nivel;
	this.banco = tests[nivel].pregunta;
	this.numPreguntas = tests[nivel].numPreguntas;
	this.contRespuestasOK = 0;
	gesSonido.pararMusica();
	
	cargarRecursos(Recursos.test, true, function() {
		Crafty.enterScene("TestPregunta");
	});
};

Test.prototype.siguientePregunta = function() {
	//obtener aleatoriamente la pregunta
	//mosrtar la pregunta
	var sigP = Crafty.math.randomElementOfArray(this.banco);
	if (sigP === this.preguntaActual) {
		this.siguientePregunta();
	}
	else {
		this.preguntaActual = sigP;
		this.f_inicializar();
	}
	return this;
};

Test.prototype.verificarPregunta = function(num) {
	//verificar que los campos correspondan con las opciones
	var contR = 0;
	var contRT = 0;
	Crafty("TestEspacio").each(function() {
		if (this.resultado !== null) {
			contR += 1;
			if (this.resultado) {
				contRT += 1;
			}
		}
	});
	if (contR >= num) {
		//en caso que este completo el test se muestran los resultados
		//mostrar los resultados con imagenes chulito y equis
		Crafty("TestEspacio").each(function() {
			this.mostrarResultado();
		});
		
		if (contRT === contR) {
			this.contRespuestasOK += 1;
			
			if (this.contRespuestasOK >= this.numPreguntas) {
				this.finalizarTest();
			}
			else {
				var self = this;
				Crafty.e("Delay").delay(function() {
					self.e_numero.incrementar();
					self.siguientePregunta();
				}, 2000);
			}
		} else {
			//mostrar pantalla repetir en caso de perdida
			this.mostrarPantallaRepetir();
			this.e_numero.TE_Numero(0);
		}

	}
	return this;
};
Test.prototype.mostrarPantallaRepetir = function() {
	//obtener los componentes para hacer una pregunta nueva
	//en caso de pregunta nueva se escoje aleatoriamente
	//sino se va a la escena de postal
	this.contRespuestasOK = 0;
	var fondo = Crafty.e("2D, Canvas, Color, Tweener")
			.attr({x: 0, y: 0, z: 1000, w: 1280, h: 800, alpha: 0})
			.color("#3F3B2F");
	var imgIntentar = Crafty.e("2D, Canvas, Image, Tweener")
			.attr({x: 520, y: 101, z: 1001, alpha: 0})
			.image("img/test/prueba_de_nuevo.png");
	var e_btAceptar = Crafty.e("Boton, Tweener")
			.attr({x: 514, y: 595, z: 9001, alpha: 0})
			.Boton("sprTE_btAceptar", "sprTE_btAceptar2");
	var e_btCancelar = Crafty.e("Boton, Tweener")
			.attr({x: 651, y: 595, z: 9001, alpha: 0})
			.Boton("sprTE_btCancelar", "sprTE_btCancelar2");
	
	var self = this;
	e_btAceptar.bind("MouseUp", function() {
		self.siguientePregunta();
		fondo.addTween({alpha: 0}, 'easeInOutQuad', 16, function() {
			fondo.destroy();
			imgIntentar.destroy();
			e_btAceptar.destroy();
			e_btCancelar.destroy();
		});
		imgIntentar.addTween({alpha: 0}, 'easeInOutQuad', 15);
		e_btAceptar.addTween({alpha: 0}, 'easeInOutQuad', 15);
		e_btCancelar.addTween({alpha: 0}, 'easeInOutQuad', 15);
	});
	e_btCancelar.bind("MouseUp", function() {
		Crafty.scene("MenuCuadros");
	});
	
	Crafty.e("Delay")
			.delay(function() {
				fondo.addTween({alpha: 1}, 'easeInOutQuad', 15);
				imgIntentar.addTween({alpha: 1}, 'easeInOutQuad', 15);
				e_btAceptar.addTween({alpha: 1}, 'easeInOutQuad', 15);
				e_btCancelar.addTween({alpha: 1}, 'easeInOutQuad', 15);
			}, 1000);

	return this;
};

// Cuando se aprueban todas las preguntas del test...
Test.prototype.finalizarTest = function() {
	var self = this;
	Crafty.e("Delay").delay(function() {
		progreso[self.nivel + 1].bloqueado = false;
		Crafty.enterScene("MenuCuadros");
	}, 2000);
	return this;
};