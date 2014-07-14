var Test = function() {
	this.nivel = 0;
	this.banco = null;
	this.preguntaActual = null;
	this.contRespuestasOK = 0;
	this.numPreguntas = 0; // Número de preguntas que se debe aprobar para concluir el test
	this.f_inicializar = null; // Función a ejecutar para inicializar la pregunta
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
					self.siguientePregunta();
				}, 2000);
			}
		} else {
			//mostrar pantalla repetir en caso de perdida
			this.mostrarPantallaRepetir();
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
			.attr({x: 0, y: 0, z: 100, w: 1280, h: 800, alpha: 0})
			.color("#3F3B2F");
	var imgIntentar = Crafty.e("2D, Canvas, Image, Tweener")
			.attr({x: 520, y: 101, z: 101, alpha: 0})
			.image("img/test/prueba_de_nuevo.png");
	var e_btAceptar = Crafty.e("Boton, Tweener")
			.attr({x: 514, y: 595, z: 9001, alpha: 0})
			.Boton("sprTE_btAceptar", "sprTE_btAceptar2")
	var e_btCancelar = Crafty.e("Boton, Tweener")
			.attr({x: 651, y: 595, z: 9001, alpha: 0})
			.Boton("sprTE_btCancelar", "sprTE_btCancelar2")
	
	var self = this;
	e_btAceptar.bind("MouseUp", function() {
		fondo.addTween({alpha: 0}, 'easeInOutQuad', 15);
		imgIntentar.addTween({alpha: 0}, 'easeInOutQuad', 15);
		e_btAceptar.addTween({alpha: 0}, 'easeInOutQuad', 15);
		e_btCancelar.addTween({alpha: 0}, 'easeInOutQuad', 15, function() {
			self.siguientePregunta();
		});
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

Test.prototype.finalizarTest = function() {
	Crafty.e("Delay").delay(function() {
		Crafty.enterScene("MenuCuadros");
	}, 2000);
	return this;
};


/**
 * Estructura que contiene la logica para realizar un test
 * almacenado en el objeto tests[this.indexTest]
 
 var Test = function() {
 this.indexTest = -1;
 this.indexPregunta = -1;
 this.respuestasSeleccionadas = [];
 this.ACIERTO = '1';
 this.FRACASO = '-1';
 
 /**
 * Comenzar el test que se encuentra en tests[indexTest]
 * @param {type} indexTest posicion del test en la estructura de tests
 * @returns {Juego}
 
 this.iniciarTest = function(indexTest) {
 //Iniciar el gestor de contenido de tests 
 this.indexTest = indexTest;
 this.indexPregunta = -1;
 return this;
 };
 
 /**
 * Obtener la siguiente pregunta del test actual.
 * @returns {unresolved}
 
 this.siguientePregunta = function() {
 this.indexPregunta = this.indexPregunta + 1;
 return tests[this.indexTest].getPregunta(this.indexPregunta);
 };
 
 /**
 * retorna true si ha recorrido todo el test actual
 * @returns {Boolean}
 
 this.terminoTestActual = function() {
 //pregunta si la pregunta actual es el numero de preguntas del test.
 return tests[this.indexTest].preguntas.length === this.indexPregunta;
 };
 
 /**
 * Almacena la seleccion de una pregunta 
 * @param {type} respuesta
 * @returns {Juego}
 
 this.guardarSeleccion = function(respuesta) {
 this.respuestasSeleccionadas[this.indexPregunta] = respuesta;
 return this;
 };
 
 /**
 * calcula los resultados comparando las respuestas seleccionadas con 
 * las respeestas correctas del test actual
 * @returns {Juego}
 
 this.resultadosRespMultiple = function() {
 this.aciertos = 0;
 this.fracasos = 0;
 for (var indexRespuestas in this.respuestasSeleccionadas) {
 var respuestaCorrecta = tests[this.indexTest].getPregunta(indexRespuestas).respuestaCorrecta;
 var respuestaSeleccionada = this.respuestasSeleccionadas[indexRespuestas];
 
 
 console.log(respuestaSeleccionada+' correct: '+ respuestaCorrecta);
 if (respuestaSeleccionada === respuestaCorrecta) {
 this.aciertos++;
 }
 else {
 this.fracasos++;
 }
 }
 return this;
 }
 };*/

