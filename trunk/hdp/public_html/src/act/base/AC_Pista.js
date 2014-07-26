// Representa el mensaje emergente de pista al principio de cada escena
Crafty.c("AC_Pista", {
	e_msg: null, // Sprite de mensaje
	e_cubierta: null, // Cubierta de pantalla completa
	e_delay: null, // Referencia a delay (útil para destruirlo manualmente)
	xIni: 0, // Coords de inicio
	xFin: 0, // Coords de finalización
	actConfig: null, // Referencia a la configuración de la pista en la actividad
	
	init: function() {
		this.requires("2D, Canvas, sprAC_fonPistaIzq, Tweener, Persist");
		this.e_msg = Crafty.e("2D, Canvas, sprAC_msgPista, Persist");
		//this.e_msg.addComponent("Color").color("#FFFFFF")
		this.attach(this.e_msg);
		
		this.z = 9000;
		this.e_msg.z = this._z;
		
		this.e_cubierta = Crafty.e("2D, Canvas, Mouse, Persist").attr({ w: 1280, h: 800, z: 900, visible: false });
		this.e_cubierta._padre = this;
		this.e_cubierta.bind("MouseDown", this._removerPista);
		
		this.ocultar(); // Inicia oculto
	},
	
	// Remueve forzosamente la pista y cualquier gesto existente, e iniciamos la actividad
	_removerPista: function() {
		Crafty("Gesto").each(function() { this.destroy(); });
		this._padre.cancelTweener();
		this._padre.ocultar();
		this._padre.e_delay.destroy();
		gesActividad.temporizador.mostrar().iniciar();
		return this;
	},
	
	// Muestra y luego esconde la pista
	// pasar izquierda TRUE para que salga por la izquierda, sino sale por la derecha
	mostrar: function() {
		this.actConfig = gesActividad.config.pista;
		var izquierda = this.actConfig.ladoIzq;
		
		this.e_delay = Crafty.e("DelayFrame"); // Reconstruir por si fué destruído
		this.mensajePista(gesActividad.nivel, gesActividad.subnivel);
		this.visible = true;
		this.e_msg.visible = true;
		
		// ponemos la pista a la izquierda o a la derecha
		if (izquierda) {
			this.sprite(0, 0);
			this.xIni = -this._w;
			this.xFin = -20;
			// Temporalmente volvemos a x=0 para no alterar el offset
			this.x = 0;
			this.e_msg.x = 205;
		}
		else {
			this.sprite(0, 256);
			this.xIni = 1280 + this._w;
			this.xFin = 1280 - this._w + 20;
			
			this.x = 0;
			this.e_msg.x = 100;
		}
		this.x = this.xIni;
		this.y = this.actConfig.y;
		this.e_msg.y = this.y + 37;
		
		// Cubrimos con una capa transparente que evite interactuar antes de tiempo
		this.e_cubierta.visible = true;
		
		// Animación de entrada y salida
		var self = this;
		var xMid = (izquierda ? (this.xIni + 460) : (this.xIni - 950));
		
		this.addTween({ x: xMid }, "easeInCubic", 20, function() {
			this.addTween({ x: this.xFin }, "easeOutElastic", 50, function() {
				self.e_delay.delay(function() {
					self.addTween({ x: self.xIni }, "easeInCubic", 15, function() {
						this.ocultar();
						// Mostramos e iniciamos el temporizador
						gesActividad.temporizador.mostrar().iniciar();
					});
				}, 65);
			});
		});
		
		return this;
	},
	
	// Establece el mensaje de la pista de acuerdo con el nivel y subnivel
	mensajePista: function(nivel, subnivel) {
		var fila = 0;
		var col = 0;
		
		var numMsg = nivel * 6 + subnivel;
				
		if (numMsg >= 5) {
			fila = Math.floor(numMsg / 5);
		}
		
		col = numMsg - (fila * 5);
		this.e_msg.sprite(col * 204, fila * 170);
		return this;
	},
	
	// Ubica la pista de forma oculta y la invisibiliza
	ocultar: function() {
		this.x = this.xIni;
		this.visible = false;
		this.e_msg.visible = false;
		this.e_cubierta.visible = false;
		return this;
	}
});
