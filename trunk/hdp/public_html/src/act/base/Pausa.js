Crafty.c("Pausa", {
	_objTempo: null, // Referencia al objeto Temporizador (creador)
	
	e_fondo: null, //fondo transparente de la pausa que evita eventos no deseados sobre componentes de la actividad en primer plano
	e_sombra: null, // Sombra del bloque
	e_arbol: null, // arbol
	e_leyenda: null, // texto "Pausa"
	
	e_btSalir: null,
	e_btReiniciar: null,
	e_btContinuar: null,
	
	_interval: null, // timer propio de este panel
	hojasInterval: null, // Intervalo de caída de hojas
	arrHojas: [], // Referencias de hojas que caen
	
	init: function() {
		this.requires("2D, Canvas, Color, Persist")
								.attr({ x: 0, y: 150, w: 1280, h: 475, z: 10000, alpha: 0.8 })
								.color("#111111");
		this.crearEntidades();
		
		this.ocultar(); // Panel inicialmente oculto
	},
	
	crearEntidades: function() {
		this.e_fondo = Crafty.e("2D, Canvas, Color, Persist, Mouse")//esta entidad no va a permitir que se ejecuten eventos de clic sobre la actividad
								.attr({x:0, y:0, z:this._z-1, w:1280, h:800, alpha:0.0})
								.color("#000000")
								.bind("MouseDown", function(){})
								.bind("MouseUp", function(){})
								.bind("MouseMove", function(){})
						
		this.e_sombra = Crafty.e("2D, Canvas, Color, Persist")
								.attr({ y: this._y + 475, z: this._z, w: 1280, h: 7, alpha: 0.28 })
								.color("#000000");
		this.e_arbol = Crafty.e("2D, Canvas, Image, Persist")
								.image("img/global/pau-arbol.png")
								.attr({ x: 481, y: this._y + 60, z: this._z });
		this.e_leyenda = Crafty.e("2D, Canvas, Image, Persist")
								.image("img/global/pau-leyenda.png")
								.attr({ x: 583, y: this._y + 345, z: this._z });
		
		this.e_btSalir = Crafty.e("Boton, Tweener, Persist")
								.attr({ x: 70, y: this._y + 371, z: this._z })
								.Boton("sprPAU_btSalir", "sprPAU_btSalir2");
		this.e_btReiniciar = Crafty.e("Boton, Tweener, Persist")
								.attr({ x: 174, y: this._y + 370, z: this._z })
								.Boton("sprPAU_btReiniciar", "sprPAU_btReiniciar2");
		this.e_btContinuar = Crafty.e("Boton, Tweener, Persist")
								.attr({ x: 309, y: this._y + 375, z: this._z })
								.Boton("sprPAU_btContinuar", "sprPAU_btContinuar2");
		
		// Acciones de los botones
		var self = this;
		
		// Volver al menú de cuadros
		this.e_btSalir.bind("MouseUp", function() {
			self.ocultar();
			if (Crafty.isPaused()) Crafty.pause(); // despausamos crafty	
			gesActividad.terminar();
			Crafty.scene('MenuCuadros');
		});
		
		// Reiniciar esta actividad
		this.e_btReiniciar.bind("MouseUp", function() {
			self.ocultar();
			if (Crafty.isPaused()) Crafty.pause(); // despausamos crafty	
			gesActividad.reiniciar();
		});
		
		// Despausar el juego
		this.e_btContinuar.bind("MouseUp", function() {
			self.ocultar();
			self._objTempo.despausar();
		});
	},
	
	Pausa: function(obj_t) {
		this._objTempo = obj_t;
		return this;
	},
	
	// avanza manualmente el enterFrame de los hijos
	tic: function(f) {
		//Crafty.timer.step()
		this.trigger("EnterFrame");
		
		this.e_btSalir.trigger("EnterFrame", { frame: f, dt: 1000 / 60 });;
		this.e_btReiniciar.trigger("EnterFrame");
		this.e_btContinuar.trigger("EnterFrame");
		for (i = 0 ; i < this._children.length ; i++) {
			this._children[i].trigger("EnterFrame", { frame: f, dt: 1000 / 60 });
		}
		Crafty.DrawManager.drawAll();
		Crafty.trigger("RenderScene");
		Crafty.trigger("PostRender");
	},
	
	
	mostrar: function() {
		this.visible = true;
		this.e_fondo.visible = true;
		this.e_sombra.visible = true;
		this.e_arbol.visible = true;
		this.e_leyenda.visible = true;
		
		var self = this;
		
		setTimeout(function() {
			self.e_btSalir.attr({alpha: 0, visible: true}).addTween({ alpha: 1 }, "linear", 10);
			self.e_btReiniciar.attr({alpha: 0, visible: true}).addTween({ alpha: 1 }, "linear", 15);
			self.e_btContinuar.attr({alpha: 0, visible: true}).addTween({ alpha: 1 }, "linear", 20);
		}, 300);
		
		this.hojasInterval = setInterval(function() {
			self.soltarHoja();
		}, 1000);
		
		// Iniciamos un timer propio para despachar las frames en la pantalla de Pausa
		var i = 0;
		Crafty.trigger("RenderScene");
		
		this._interval = setInterval(function() {
			self.tic(i);
			i++;
		}, 20);
	},
	
	ocultar: function() {
		// Quitamos las hojas
		clearInterval(this.hojasInterval);
		var numHojas = this._children.length;
		for (i = 0 ; i < numHojas ; i++) {
			this._children[0].cancelTweener();
			this._children[0].visible = false;
			this._children[0].destroy();
		}
		
		this.visible = false;
		this.e_fondo.visible = false;
		this.e_sombra.visible = false;
		this.e_arbol.visible = false;
		this.e_leyenda.visible = false;
		this.e_btSalir.ocultar();
		this.e_btReiniciar.ocultar();
		this.e_btContinuar.ocultar();
		
		clearInterval(this._interval);
	},
	
	
	// Dejar caer una hoja desde una posición aleatoria
	soltarHoja: function() {
		var e_h = Crafty.e("PAU_Hoja");
		e_h.PAU_Hoja(this.e_arbol);
		this.attach(e_h);
	}
});

// Hoja que cae del arbol
Crafty.c("PAU_Hoja", {
	_padre: null, // referencia al arbol del que caen las hojas
	
	init: function() {
		this.requires("2D, Canvas, Tweener, SpriteAnimation, sprPAU_hoja");
		this.reel("girar", 700, [[0,0],[0,7],[0,14],[0,21],[0,28],[0,35],[0,42]]);
	},
	PAU_Hoja: function(padre) {
		this._padre = padre;
		
		this.x = padre._x + 74 + randomFloat(0, 160);
		this.y = padre._y + 160 + randomFloat(0, 20);
		
		this.attr({ z: padre._z, visible: true});
		this.animate("girar", -1);
		
		this.addTween({ y: this._y + 65 }, "easeOutCubic", 250, function() {
			this.destroy();
		});
	}
});