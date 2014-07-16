var ToqueRapido = function() {
	this.val = 0; // Valor actual
	this.vMax = 100; // Valor máximo
	this.vMin = 0;
	this.vRestar = 1; // Velocidad con que se resta al valor actual
	this.incremento = 4; // Cantidad de incremento por cada click
	
	this.numFrames = 3; // Decrementar cada número de frames
	this._cuenta = 0; // Cuenta interna de frames
	this._callbackCambio = null; // Callback a invocar en evento de cambio de valor
	this._callbackMaximo = null; // Callback a invocar en evento de alcanzar el máximo
	
	this.e_area = null; // Entidad Crafty de área de click
	this._padre = null; // Referencia al objeto creador
	
	// objPadre es una referencia al objeto creador
	this.init = function(objPadre) {
		this._padre = objPadre;
		this.e_area = Crafty.e("2D, Canvas, Mouse").attr({ x: 0, y: 0, w: 1280, h: 700 });
		//this.e_area.requires("Color").color("#33FF66");
		this.e_area.objToque = this; // Referencia al objeto ToqueRapido
		
		this.e_area.bind("MouseDown", function() { this.objToque.incrementar(); });
		this.e_area.bind("EnterFrame", function() { this.objToque.tic(); });
		return this;
	};
	
	// Cada tic del reloj (invocada en EnterFrame)
	this.tic = function tic() {
		this._cuenta++;
		if (this._cuenta === this.numFrames) {
			this._cuenta = 0;
			this.decrementar();
		}
	};
	
	// decrementar valor
	this.decrementar = function decrementar() {
		if (this.val > this.vMin) {
			this.val -= this.vRestar;
			if(this._callbackCambio) { this._callbackCambio(); }
		}
	};
	
	// incrementar valor
	this.incrementar = function incrementar() {
		this.val += this.incremento;
		if(this._callbackCambio) { this._callbackCambio(); }
		if (this.val >= this.vMax) {
			this.maximoAlcanzado();
		}
	};
	
	// evento al alcanzar el máximo
	this.maximoAlcanzado = function maximoAlcanzado() {
		console.log("maximo!");
		this.e_area.unbind("MouseDown");
		this.e_area.unbind("EnterFrame");
		if(this._callbackMaximo) { this._callbackMaximo(); }
	};
	
	// Establecer el callback de evento de cambio (su ámbito será este objeto, referirse al padre con this._padre)
	this.callbackCambio = function(refFuncion) {
		this._callbackCambio = refFuncion;
		return this;
	};
	
	// Establecer el callback de evento de alcanzar el máximo (su ámbito será este objeto, referirse al padre con this._padre)
	this.callbackMaximo = function(refFuncion) {
		this._callbackMaximo = refFuncion;
		return this;
	};
};