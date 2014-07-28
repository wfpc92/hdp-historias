/*
 * Interacción de giros alternativa
 * El área de rotación rota junto con el dedo
 */
Crafty.c("GirosDany", {
	oriX: 0, // Coords globales del centro
	oriY: 0,
	mouseX: 0, // Coords globales del mouse
	mouseY: 0,
	e_grafico: null, // Entidad del gráfico que rota
	gradosAnt: 0, // medida de grados anterior
	paso0: true, // si no está en 0 está en 1
	dirReloj: true, // true si está girando en dir. de las manecillas del reloj
	movil: false, // true si el área de rotación se está moviendo
	inicial: true, // Bandera true sólo para el primer evento Mouse registrado
	
	cbk_vuelta: null, // Callback invocado cada que se realiza una vuelta completa
	cbk_rotar: null, // Callback invocado cada que se detecta un cambio en el ángulo
	
	init: function() {
		this.requires("2D, Canvas, Mouse");
	},
	
	/**
	 * Constructor
	 * @param {int} x0 Coord. inicial.
	 * @param {int} y0 Coord. inicial.
	 * @param {int} ancho Ancho de área de rotación.
	 * @param {int} alto
	 * @param {boolean} movil TRUE si el área de rotación se va a mover
	 * @returns {GirosDany}
	 */
	GirosDany: function(x0, y0, ancho, alto, movil) {
		// Establecemos coordenadas y tamaño de forma obligatoria
		this.x = x0;
		this.y = y0;
		this.w = ancho;
		this.h = alto;
		this.movil = movil;
		
		this.oriX = this._x + this._w / 2;
		this.oriY = this._y + this._h / 2;
		
		this.bind("MouseMove", this._rotando);
		
		return this;
	},
	
	_rotando: function(e) {
		// Calculamos siempre en caso de que el área se mueva
		if (this.movil) {
			this.oriX = this._x + this._w / 2;
			this.oriY = this._y + this._h / 2;
		}

		var mPos = mouseCoords(e);

		// distancia entre los 2 puntos
		var dX = mPos.x - this.oriX;
		var dY = this.oriY - mPos.y;
		var grados = Math.atan2(dY, dX) * 180 / Math.PI;
		if (grados < 0) grados += 360;
		
		// Descartar el primer mouseMove porque es detectado como vuelta completa (BUGFIX)
		if (this.inicial) {
			this.inicial = false;
			this.gradosAnt = grados;
			return;
		}
		
		if (this.cbk_rotar) this.cbk_rotar(-grados); // Callback de rotación

		// Detectamos si ha ocurrido una vuelta
		if (this.paso0) {
			if (this.gradosAnt >= 0 && this.gradosAnt < 90) {
				if (grados >= 90 && grados < 180) {
					this.paso0 = false;
					this.dirReloj = false;
					console.log("vuelta anticlock!");
					if (this.cbk_vuelta) this.cbk_vuelta(false); // Callback de vuelta completa
				}
				else if (grados > 270) {
					this.paso0 = false;
					this.dirReloj = true;
					console.log("vuelta clock! " + grados);
					if (this.cbk_vuelta) this.cbk_vuelta(true); // Callback de vuelta completa
				}
			}
		}
		else {
			if (this.gradosAnt > 180 && this.gradosAnt <= 270) {
				if (grados > 270) {
					if (!this.dirReloj) {
						this.paso0 = true;
						console.log("mediavuelta anticlock!");
						if (this.cbk_vuelta) this.cbk_vuelta(false); // Callback de vuelta completa
					}
					else {
						this.dirReloj = false;
					}
				}
				else if (grados <= 180) {
					if (this.dirReloj) {
						this.paso0 = true;
						console.log("mediavuelta clock!");
						if (this.cbk_vuelta) this.cbk_vuelta(true); // Callback de vuelta completa
					}
					else {
						this.dirReloj = true;
					}
				}
			}
		}

		this.gradosAnt = grados;
	},
	
	// Detiene este componente y evita futura interacción
	detener: function() {
		this.unbind("MouseMove");
		return this;
	},
	
	// Invocar para mostrar el área de rotación
	debug: function() {
		this.addComponent("Color").color("#33FFAA");
		this.alpha = 0.3;
		return this;
	}
});