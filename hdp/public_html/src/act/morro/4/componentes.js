Crafty.c("Morrito", {
	nid: 0, // Identificador del morrito, util para debugging
	yIni: 0, // Posición y inicial
	trampa: false, // True si este morrito es trampa
	e_hueco: null,
	e_calaca: null,
	e_puntaje: null, // Referencia a la entidad que administra el puntaje y los eventos de morritos
	bloqueado: false, // true para evitar que el morrito responda a eventos de mouse
	arrancado: false, // true cuando este morrito ha sido arrancado
	objPartic: null, // Referencia al generador de partículas
	
	init: function() {
		this.requires('2D, Canvas, Mouse, sprM4_morrito, SpriteAnimation, Tweener');
		this.e_hueco = Crafty.e('2D, Canvas, sprM4_hueco').attr({ visible: false });
		this.e_calaca = Crafty.e('2D, Canvas, sprM4_calavera, Tweener').attr({ visible: false });
		this.reel("saleRaiz", 250, [[0,0],[106,0],[212,0],[318,0],[424,0],[530,0]]);
		
		this.areaMap(new Crafty.polygon([5,66], [61,25], [109,86], [101,118], [28,119]));
		this.bind('MouseUp', this.arrancar);
	},
	
	Morrito: function(nid, e_punt, yIni, objPart) {
		this.objPartic = objPart;
		this.nid = nid;
		this.e_puntaje = e_punt;
		this.yIni = yIni;
		return this;
	},
	
	// Arranca este morrito de la tierra
	arrancar: function() {
		if (!this.bloqueado) {
			//mostrar entidades de hueco y calavera
			this.e_hueco.visible = true;
			if (!this.trampa) this.e_calaca.visible = true;

			// Disparar partículas
			this.objPartic.y = this._y + 30;
			this.objPartic.x = this._x;
			this.objPartic.iniciar();
					
			//animar morrito, direccion de movimiento
			this.bloqueado = true;
			this.animate("saleRaiz", 1);
			this.addTween({ y: (this.yIni - 150), alpha: 0 }, 'easeOutCubic', 35, function() {	
				if (!this.trampa) {
					this.e_calaca.addTween({ y: (this.e_calaca.y - 20) }, 'easeOutCubic', 15);
					this.arrancado = true;
				}
				this.visible = false;
				this.e_puntaje.reportarArranque(this);
			});
		}
	},
	
	// Configura este morrito como una trampa
	esTrampa: function() {
		this.trampa = true;
		return this;
	},
	
	// Vuelve a enterrar este morrito
	enterrar: function() {
		this.arrancado = false;
		this.visible = true;
		this.reelPosition(0).pauseAnimation();
		this.e_calaca.addTween({ y: (this.e_calaca.y + 20) }, 'easeInCubic', 10);
		this.addTween({ y: this.yIni, alpha: 1 }, 'easeInCubic', 15, function() {
			this.e_hueco.visible = false;
			this.e_calaca.visible = false;
			this.bloqueado = false;
		});
		return this;
	}
});


Crafty.c('Puntaje', {
	numFaltan: 0, // Calaveras que faltan por desenterrar
	morritos: null, // referencia al arreglo de morritos
	numArrancados: 0, // cuenta morritos ya arrancados
	maxEnterrar: 3, // número máximo de morritos a volver a enterrar
	_padre: null,
	
	init: function() {
		this.requires("2D");
	},
	
	Puntaje: function(padre, numIni) {
		this._padre = padre;
		this.morritos = padre.morritos;
		this.numFaltan = numIni;
		this.actualizar();
	},
	
	// Reportarle a esta entidad que se ha arrancado un morrito
	// esTrampa es TRUE si se arrancó una trampa
	reportarArranque: function(morro) {
		var esTrampa = morro.trampa;
		
		if (!esTrampa) {
			// acierto!
			if (this.numFaltan > 0) this.numFaltan--;
			this.numArrancados++;
			
			if (this.numFaltan === 0) {
				this._padre.ganarActividad();
			}
		}
		else {
			// trampa: volver a enterrar este morro y otros 3 destapados aleatorios
			var i;
			
			morro.enterrar();
			
			var numEnterrar = (this.numArrancados > this.maxEnterrar) ? 3 : this.numArrancados;
			var morroTemp;
			
			// Enterrar <numEnterrar> morritos
			for (i = 0 ; i < numEnterrar ; i++) {
				// Encontrar un morrito aleatorio arrancado
				do {
					morroTemp = this.morritos[randomInt(0, 17)];
				} while (!morroTemp.arrancado);
				morroTemp.enterrar();
				this.numArrancados--;
				this.numFaltan++;
			}
		}
		
		this.actualizar();
	},
	
	actualizar: function() {
		Crafty("PuntajeLetra").destroy();
		var numString = this.numFaltan + '';
		for (var i = 0; i < numString.length; i++) {
			var letra = Crafty.e('PuntajeLetra, 2D, Canvas, Sprite, sprM4_numero, PosicionXY');
			letra.attr({x: this._x + (letra.w * i), y: this._y, z: this._z});
			letra.sprite(numString[i], 0);
		}
		
		return this;
	}
});