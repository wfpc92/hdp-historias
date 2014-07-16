Crafty.c("TestOpcion", {
	e_espacioVerdad: null, // referencia su espacio correspondiente en el test (null si no tiene)
	e_bloTexto: null, // bloque de texto
	e_sombra: null, // sombra de la opción
	e_cubierta: null, // color sólido usado para cubrir esta entidad (desvanecerla)
	xIni: 0, // posición inicial de esta opción
	yIni: 0,
	arrEspacios: null, // referencia al arreglo de espacios del BloqueTexto
	bloqueado: false, // true si ya no se deja manipular
	colorNormal: "#D3554A",
	colorHover: "#C81F10",
	
	init: function() {
		this.requires("2D, Canvas, Draggable, Color, Tweener, DelayFrame").attr({ z: 1 });
		this.e_sombra = Crafty.e("2D, Canvas, Color").color("#222222").attr({ alpha: 0.5 });
		this.e_cubierta = Crafty.e("2D, Canvas, Color, Tweener").attr({ alpha: 1 });
		this.attach(this.e_sombra);
		this.attach(this.e_cubierta);

		this.bind("StartDrag", function() {
			this.hover();
		});

		this.bind("MouseUp", function(e) {
			if (!this.bloqueado) {
				var mCoords = mouseCoords(e);
				var num = this.arrEspacios.length;
				var e_espacio;

				for (i = 0; i < num; i++) {
					e_espacio = this.arrEspacios[i];
					if (!e_espacio.bloqueado) {
						if (e_espacio.isAt(mCoords.x, mCoords.y)) {
							if (e_espacio._w >= this._w) {
								// Se soltó la opción sobre un espacio -> acomodar la opción
								this.bloquear();
								e_espacio.bloqueado = true;
								
								var xCentro = e_espacio._x + (e_espacio._w - this._w) / 2;
								this.addTween({ x: xCentro, y: e_espacio._y }, "easeInOutCubic", 12, function() {
									e_espacio.visible = false;
									e_espacio.e_opcion = this;
									
									this.noHover();
									this.e_sombra.visible = false;
									// agregar puntaje
									//verificar si el espacio asignado es igual al espcio enchoclado
									if (this.e_espacioVerdad === e_espacio) {
										e_espacio.resultado = true;
									} else {
										e_espacio.resultado = false;
									}
									//verificar si todos los campos fueron diligenciados
									gestorTest.verificarPregunta(num);
								});
							}
							break;
						}
					}
				}

				if (!this.bloqueado)
					this.animVolverIni();
			}
		});
	},
	
	TestOpcion: function(texto, e_espacio, colorFrente, colorCubierta) {
		this.e_espacioVerdad = e_espacio;
		if (colorFrente) this.colorNormal = colorFrente;
		if (colorCubierta) this.e_cubierta.color(colorCubierta);
		
		this.e_bloTexto = Crafty.e("BloqueTexto");
		this.e_bloTexto.z = this._z + 1;
		this.e_bloTexto.bold = true;
		this.e_bloTexto.BloqueTexto(texto, false);
		this.e_bloTexto.x = 10;
		this.e_bloTexto.y = -2;
		
		var dim = this.e_bloTexto.getDimensiones();
		this.w = dim[0] + 20;
		this.h = dim[1] - 6;
		this.attach(this.e_bloTexto);
		
		
		
		this.color(this.colorNormal);
		this.e_sombra.attr({ x: 2, y: 2, w: this._w, h: this._h, z: 0 });
		this.e_cubierta.attr({ x: 0, y: 0, w: this._w + 2, h: this._h + 2, z: 900 });
		return this;
	},
	
	setArrEspacios: function(arrEsp) {
		this.arrEspacios = arrEsp;
		return this;
	},
	
	setPosIni: function() {
		this.xIni = this._x;
		this.yIni = this._y;
		return this;
	},
	
	// Destaca la opción
	hover: function() {
		this.z = 100;
		this.e_bloTexto.z = this._z + 1;
		this.e_sombra.z = this._z - 1;
		var children = this.e_bloTexto._children;
		var num = children.length;
		for (i = 0; i < num; i++) {
			children[i].z = this._z + 1;
		}

		this.color(this.colorHover);
		return this;
	},
	
	noHover: function() {
		this.z = 1;
		this.e_bloTexto.z = this._z + 1;
		this.e_sombra.z = this._z - 1;
		var children = this.e_bloTexto._children;
		var num = children.length;
		for (i = 0; i < num; i++) {
			children[i].z = this._z + 1;
		}

		this.color(this.colorNormal);
		return this;
	},
	
	animVolverIni: function() {
		if (!this.bloqueado) {
			this.bloqueado = true;
			this.disableDrag();
			this.addTween({x: this.xIni, y: this.yIni}, "easeOutCubic", 40, function() {
				this.noHover();
				this.enableDrag();
				this.bloqueado = false;
			});
		}
		return this;
	},
	
	// Evita recibir más eventos del mouse
	bloquear: function() {
		this.removeComponent("Draggable");
		this.removeComponent("Mouse");
		this.unbind("MouseUp");
		this.bloqueado = true;
		return this;
	},
	
	// Quita la cubierta de esta opción, revelando su contenido
	animAparecer: function() {
		var y0 = this._y;
		this.y = y0 + 15;
		this.addTween({ y: y0 }, "easeOutBack", 12);
		this.e_cubierta.addTween({ alpha: 0 }, "linear", 5, function() { this.visible = false; });
		return this;
	}
});

Crafty.c("TestEspacio", {
	bloqueado: false, // true si ya no recibe opciones
	resultado: null,
	e_resultado: null, // Marca de calificación de este espacio
	e_opcion: null, // Referencia a entidad actualmente encajada en este espacio
	
	init: function() {
		this.requires("2D, Canvas, Color, Mouse, Tweener")
			.color("#F6F0BB");
	
		this.e_resultado = Crafty.e("Advertencia")
									.attr({ z: 30 });
		
		this.bind("Remove", function() {
			this.e_resultado.destroy();
			return this;
		});
	},
	
	// dibujar si esta bien o si esta mal en las respuestas.
	mostrarResultado: function() {
		this.e_resultado.attr({ x: this.e_opcion._x + this.e_opcion._w, y: this._y - 75 });
		
		if (this.resultado) {
			this.e_resultado.mostrar(0, 60);
		}
		else {
			this.e_resultado.mostrar(1, 60);
		}
		
		return this;
	}

});

Crafty.c("TE_Numero", {
	num: 0, // número actualmente representado por esta entidad
	
	init: function() {
		this.requires("2D, Canvas, sprTE_numeros");
	},
	
	TE_Numero: function(num) {
		this.num = num;
		this.sprite(0, 60 * num);
		return this;
	},
	
	incrementar: function() {
		this.TE_Numero(this.num + 1);
		return this;
	}
});