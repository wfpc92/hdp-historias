/*
 * MC_Cuadro(num, xi, yi, xc, yc, act, grilla)
 * posIni(x, y)
 * crearCandado(offsetX, offsetY)
 * ponerCandado()
 * quitarCandado()
 * ponerAprobado()
 * habilitar()
 * bloquear()
 * animMostrarGrande()
 * animOcultarGrande()
 * animEsconder()
 * animMostrar()
 */

Crafty.c("MC_Cuadro", {
	num: 0, // 1 a 5 -> id del cuadro
	bloqueado: true, // bloqueado para no responder a eventos del mouse
	candado: true, // poner candado para no permitir acceder por falta de progreso en el juego DIFERENTE A BLOQUEADO
	xIni: 0,
	yIni: 0,
	wIni: 0,
	hIni: 0,
	xCentro: 0, // coords donde se "centraría" el cuadro
	yCentro: 0,
	
	e_cGrande: null, // entidad del cuadro grande
	ordenActiv: new Array(6), // Orden de las actividades
	_actividades: null, // Referencia al arreglo de entidades de actividades
	dirOcultar: 0, // Dirección hacia la cual se desliza el cuadro para ocultarse
	e_grilla: null, // Referencia a la grilla
	e_sombra: null, // Referencia a la sombra del cuadro grande

	e_candado: null, // Candado que acompaña al cuadro
	e_baudilio: null, // Moneda del cuadro
	vertical: false, // El cuadro es vertical?

	init: function() {
		this.requires("2D, Canvas, Tint, Tweener, Mouse");
	},

	MC_Cuadro: function(num, xi, yi, xc, yc, act, grilla, sombra) {
		this.num = num;
		this.posIni(xi, yi);
		this.xCentro = xc;
		this.yCentro = yc;
		this._actividades = act;
		this.e_grilla = grilla;
		this.e_sombra = sombra;
		
		this.requires("sprMC_c" + num);
		
		this.e_baudilios = Crafty.e("MC_Baudilios");
		
		switch (num) {
			case 1: this.ordenActiv = [3,4,1,6,5,2];
					this.dirOcultar = 0;
					this.areaMap([38,38],[273,38],[273,180],[38,180]);
					this.e_baudilios.attr({x: this.x + 78, y: this.y + 190}).MC_Baudilios();
			break;
			case 2: this.ordenActiv = [1,3,4,5,2,6];
					this.dirOcultar = 0;
					this.areaMap([20,21],[178,21],[178,282],[20,282]);
					this.e_baudilios.attr({x: this.x + 20, y: this.y + 290}).MC_Baudilios();
					this.vertical = true;
			break;
			case 3: this.ordenActiv = [1,2,3,4,5,6];
					this.dirOcultar = 3;
					this.areaMap([41,29],[294,29],[294,183],[41,183]);
					this.e_baudilios.attr({x: this.x + 86, y: this.y + 190}).MC_Baudilios();
			break;
			case 4: this.ordenActiv = [1,2,3,4,5,6];
					this.dirOcultar = 1;
					this.areaMap([40,39],[280,39],[280,185],[40,185]);
					this.e_baudilios.attr({x: this.x + 77, y: this.y + 190}).MC_Baudilios();
			break;
			case 5: this.ordenActiv = [1,2,3,4,5,6];
					this.dirOcultar = 1;
					this.areaMap([36,36],[259,36],[259,172],[36,172]);
					this.e_baudilios.attr({x: this.x + 70, y: this.y + 180}).MC_Baudilios();
					break;
		}

		var props = { x: 128, y: 85, z: 90, alpha: 0.0, visible: false };
		if (this.vertical) props = { x: 385, y: 8, z: 90, alpha: 0.0, visible: false };
		
		this.e_cGrande = Crafty.e("2D, Canvas, Image, Tweener")
								.image("img/menu-cuadros/c" + num + "gra.jpg")
								.attr(props);
		this.wIni = this._w;
		this.hIni = this._h;
		
		this.attach(this.e_baudilios);
		
		return this;
	},
	
	// setter de las coords iniciales
	posIni: function(x, y) {
		this.xIni = x;
		this.yIni = y;
		return this;
	},
	
	crearCandado: function(offsetX, offsetY) {
		this.e_candado = Crafty.e("2D, Canvas, sprMC_conCandado")
				.attr({x: this._x + offsetX, y: this._y + offsetY});
		this.attach(this.e_candado);
		return this;
	},
	// Pone un candado al cuadro y lo deshabilita
	ponerCandado: function() {
		this.candado = true;
		this.e_candado.sprite(0, 78);
		this.bloquear();
		this.removeComponent("sprMC_c" + this.num).addComponent("sprMC_c" + this.num + "apaga");
		return this;
	},
	// Quita el candado (o chulo) del cuadro
	quitarCandado: function() {
		this.candado = false;
		this.e_candado.visible = false;
		this.removeComponent("sprMC_c" + this.num + "apaga").addComponent("sprMC_c" + this.num);
		this.habilitar();
		return this;
	},
	// Pone el chulo en el cuadro
	ponerAprobado: function() {
		this.candado = false;
		this.e_candado.sprite(0, 0);
		return this;
	},
	habilitar: function() {
		this.bloqueado = false;
		return this;
	},
	bloquear: function() {
		this.bloqueado = true;
		return this;
	},
	
	
	// Muestra este cuadro en su versión grande, con sus respectivas actividades
	animMostrarGrande: function() {
		var self = this;
		
		this.e_baudilios.ocultar();
		
		// Actualizamos el estado de las actividades para este cuadro
		var act, orden;
		
		for (i = 0 ; i < 6 ; i++) {
			orden = this.ordenActiv[i] - 1;
			act = this._actividades[orden];
			act.numAct = i;
			act.imgCuadro(this.num);
			act.actualizarBaudAct();
			
			if (progreso[this.num - 1].puntaje[i - 1] > 0 || i === 0)
				act.habilitar();
			else
				act.bloquear();
		}
		
		// centrar y volver grande
		var props = { x: 300, y: 140, w: 800, h: 600 };
		if (this.vertical) props = { x: 420, y: 70, w: 520, h: 700 };
		
		this.addTween({x: this.xCentro, y: this.yCentro}, "easeInOutCubic", 35, function() {
			this.addTween(props, "linear", 10);
			
			// aparecer el cuadro grande
			
			this.e_cGrande
				.attr({visible: true})
				.addTween({alpha: 1.0}, "linear", 12, function() {
					self.e_grilla.animAparecer();
					// vamos habilitando las actividades en orden

					for (i = 0; i < 6; i++) {
						self._actividades[i].animMostrar();
					}

					if (self.e_sombra !== null) self.e_sombra.animMostrar();
			});
		});
	},
	
	// Animación para esconder el cuadro grande y volver a ubicar al pequeño
	animOcultarGrande: function() {
		this.e_grilla.animOcultar();
		for (i = 0; i < 6; i++) {
			this._actividades[i].animOcultar();
		}
		this.e_cGrande.addTween({alpha: 0}, "linear", 12);
		if (this.e_sombra !== null) this.e_sombra.ocultar();
		this.addTween({x: this.xIni, y: this.yIni, w: this.wIni, h: this.hIni}, "linear", 10, function() {
			this.habilitar();
			this.e_baudilios.mostrar();
		});
	},
	
	// Desplaza el cuadro para esconderlo en la dirección "dir" (0 arr,1 der,2 aba,3 izq)
	animEsconder: function() {
		this.bloquear();
		var props;
		switch (this.dirOcultar) {
			case 0: props = {y: -this._h}; break;
			case 1: props = {x: 1280}; break;
			case 2: props = {y: 800}; break;
			case 3: props = {x: -this._w}; break;
		}

		this.addTween(props, "easeInQuad", 18, function() {
			this.visible = false;
		});
	},
	
	// Desliza el cuadro desde un lado para mostrarlo en su posicion normal
	animMostrar: function() {
		this.visible = true;
		this.addTween({ x:this.xIni, y:this.yIni}, "easeInQuad", 18, function() {
			if (!this.candado) this.habilitar();
		});
	},
	
	// Actualiza su estado según el progreso del jugador
	actualizarProgreso: function() {
		if (progreso[this.num - 1].bloqueado) this.ponerCandado();
		else this.quitarCandado();

		// calculamos el total de baudilios del cuadro
		var b = 0;
		for (j = 0 ; j < 6 ; j++) b += progreso[this.num - 1].baudilios[j];

		this.e_baudilios.numBaudilios(b);
	}
});