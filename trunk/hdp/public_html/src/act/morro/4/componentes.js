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
		
		this.bind('MouseDown', this.arrancar);
	},
	
	Morrito: function(nid, e_punt, yIni, objPart) {
		this.objPartic = objPart;
		this.nid = nid;
		this.e_puntaje = e_punt;
		this.yIni = yIni;
		return this;
	},
	
	// animación de elevar y desaparecer la calavera (para el final)
	elevarCalaca: function() {
		this.unbind('MouseUp');
		if (!this.trampa) {
			this.e_calaca.addTween({ y: this._y - 100, alpha: 0 }, "easeInCubic", 38, function() { this.destroy(); });
		}
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
			this.removeComponent("Mouse");
			this.animate("saleRaiz", 1);
			this.addTween({ y: (this.yIni - 150), alpha: 0 }, 'easeOutCubic', 30, function() {	
				this.visible = false;
				if (!this.trampa) {
					this.e_calaca.addTween({ y: (this.e_calaca.y - 20) }, 'easeOutCubic', 10);
					this.arrancado = true;
				}
				
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
		this.e_calaca.addTween({ y: (this.e_calaca.y + 20) }, 'easeInCubic', 8);
		this.addTween({ y: this.yIni, alpha: 1 }, 'easeInCubic', 10, function() {
			this.e_hueco.visible = false;
			this.e_calaca.visible = false;
			this.bloqueado = false;
			this.addComponent("Mouse");
		});
		return this;
	}
});

// Un dígito del puntaje
Crafty.c("M4_Digito", {
	num: 1, // número que muestra este dígito
	y0: 0,
	
	init: function() {
		this.requires("2D, Canvas, Tweener, sprM4_num1");
	},
	
	M4_Digito: function() {
		// almacena el y inicial
		this.y0 = this.y;
		return this;
	},
	
	setDigito: function(num) {
		
		if (this.num !== num) {
			this.cancelTweener();
			
			this.addTween({ y: this.y0 - 10, alpha: 0.1 }, "easeInCubic", 5, function() {
				this.removeComponent("sprM4_num" + this.num).addComponent("sprM4_num" + num);
				this.num = num;
				this.addTween({ y: this.y0, alpha: 1 }, "easeOutCubic", 5);
			});
		}
		
		return this;
	}
});


Crafty.c('M4_Puntaje', {
	numFaltan: 0, // Calaveras que faltan por desenterrar
	morritos: null, // referencia al arreglo de morritos
	numArrancados: 0, // cuenta morritos ya arrancados
	maxEnterrar: 3, // número máximo de morritos a volver a enterrar
	_padre: null,
	
	e_error: null, // Entidad alerta que se muestra en error
	e_digito0: null, // entidades de los 2 digitos
	e_digito1: null,
	
	init: function() {
		this.requires("2D");
		this.e_digito0 = Crafty.e("M4_Digito");
		this.e_digito1 = Crafty.e("M4_Digito");
		this.e_error = Crafty.e("Advertencia");
		this.e_digito1.x += 75;
		
		this.attach(this.e_digito0);
		this.attach(this.e_digito1);
	},
	
	Puntaje: function(padre, numIni) {
		this._padre = padre;
		this.morritos = padre.morritos;
		this.numFaltan = numIni;
		
		this.e_digito0.M4_Digito();
		this.e_digito1.M4_Digito();
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
			
			// Mostramos la alerta de error
			this.e_error.attr({ x: morro._x + 70, y: morro._y + 110 }).mostrar(1, 60);
			
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
		console.log("actualizar numFaltan = " + this.numFaltan)
		if (this.numFaltan > 9) {
			// Número de 2 digitos
			if (this.e_digito0.num !== 1) {
				this.e_digito0.setDigito(1);
			}
			
			var decimas = this.numFaltan - 10;
			this.e_digito1.visible = true;
			this.e_digito1.setDigito(decimas);
		}
		else {
			// Número de 1 digito
			this.e_digito0.setDigito(this.numFaltan);
			this.e_digito1.visible = false;
		}
		
		return this;
	}
});