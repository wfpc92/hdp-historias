var Test = function() {
	this.nivel = 0;
	this.banco = null;
	this.preguntaActual = null;
	this.cuentaPreguntas = 0; // Preguntas ya respondidas
	this.totalPreguntas = 0; // Número de preguntas que se debe aprobar para concluir el test
	this.f_inicializar = null; // Función a ejecutar para inicializar la pregunta
	this.f_animFinalizar = null; // Referencia a función de finalización en la escena
	this.arrPreguntasAnt = []; // Almacena los números de pregunta que ya se contestaron
	
	this.e_numero = null; // Referencia al número de test
};

// Elige una pregunta aleatoria y la almacena en el arreglo de preguntas anteriores
Test.prototype.elegirPregunta = function() {
	var numPregunta;
	
	// si se acaban las preguntas, resetear
	if (this.arrPreguntasAnt.length >= this.banco.length) {
		this.arrPreguntasAnt = [];
	} 
	
	do {
		numPregunta = randomInt(0, this.banco.length - 1);
	} while (this.arrPreguntasAnt.indexOf(numPregunta) >= 0);
	
	this.arrPreguntasAnt.push(numPregunta);
	this.preguntaActual = this.banco[numPregunta];
};

// Inicia la escena de test
//obtener las preugntas de la base de datos
//obtener aleatoriamente la pregunta
//mosrtar la pregunta
Test.prototype.iniciarTest = function(nivel) {
	this.nivel = nivel;
	this.banco = tests[nivel].pregunta;
	this.totalPreguntas = tests[nivel].totalPreguntas;
	this.cuentaPreguntas = 0;
	gesSonido.pararMusica();
	
	cargarRecursos(Recursos.test, true, function() {
		Crafty.enterScene("TestPregunta");
	});
};

Test.prototype.siguientePregunta = function() {
	this.elegirPregunta();
	this.f_inicializar();
	return this;
};

Test.prototype.verificarPregunta = function(num) {
	//verificar que los campos correspondan con las opciones
	var camposLlenos = 0; // campos que ya han sido respondidos
	var camposCorrectos = 0; // campos con la respuesta correcta
	
	Crafty("TestEspacio").each(function() {
		if (this.resultado !== null) {
			camposLlenos += 1;
			if (this.resultado) {
				camposCorrectos += 1;
			}
		}
	});
	
	if (camposLlenos >= num) {
		//en caso que se llenen todos los espacios de la pregunta, se muestran los resultados
		Crafty("TestEspacio").each(function() {
			this.mostrarResultado();
		});
		
		if (camposCorrectos === camposLlenos) {
			this.cuentaPreguntas += 1;
			
			if (this.cuentaPreguntas >= this.totalPreguntas) {
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
	this.cuentaPreguntas = 0;
	var fondo = Crafty.e("2D, Canvas, Color, Tweener")
			.attr({x: 0, y: 0, z: 1000, w: 1280, h: 800, alpha: 0})
			.color("#3F3B2F");
	var imgIntentar = Crafty.e("2D, Canvas, Image, Tweener")
			.attr({x: 520, y: 101, z: 1001, alpha: 0})
			.image("img/test/prueba_de_nuevo.png");
	var e_btAceptar = Crafty.e("Boton, Tweener")
			.attr({x: 514, y: 595, z: 9001, alpha: 0})
			.Boton("sprGL_btAceptar", "sprGL_btAceptar2");
	var e_btCancelar = Crafty.e("Boton, Tweener")
			.attr({x: 651, y: 595, z: 9001, alpha: 0})
			.Boton("sprGL_btCancelar", "sprGL_btCancelar2");
	
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
	this.f_animFinalizar();
	return this;
};