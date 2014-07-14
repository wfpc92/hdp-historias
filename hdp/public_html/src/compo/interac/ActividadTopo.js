var ActividadTopo = function() {
	//con esta cantidad se gana la actividad
	this.totAciertos = 0;
	//tiempo en que se cambia de un topo a otro (milisegundos)
	this.temporizadorCambiarTopo = 0;
	//temporizados global de la actividad
	this.duracion = 0;
	//numero de aciertos: numero de veces que se golpeo a topo
	this.aciertos = 0;
	this.fracasos = 0;
	//referencias a componenetes topos
	this.topo = null;

	this.init = function() {
		//asignar posicion aleatoria a topo y empezar a moverse
		this.topo = Crafty.e("Topo")
				.setActividadPadre(this)
				.setTiempoSubida(this.tiempoSubida)
				.setTiempoBajada(this.tiempoBajada)
				.setDuracionArriba(this.duracionArriba)
				.setDuracionAbajo(this.duracionAbajo)
				.setAttrHuecos(this.attrHuecos)
				.posicionAleatoria()
				.asignarEventoMovimiento();
		//asociar evento para golpear topo y aumentar aciertos.
		this.asociarEventoTocarTopo(true);
		this.topo.subiendo = true;
		return this;

	};

	this.asociarEventoTocarTopo = function(asociar) {
		if (asociar) {
			juego.actividad.topo.bind("MouseDown", function() {
				juego.actividad.aciertos++;
				console.log('aciertos: ' + juego.actividad.aciertos);
				if (juego.actividad.aciertos >= juego.actividad.totAciertos) {
					juego.actividad.terminarActividad();
				}

			});
		}
		else {
			actividad.topo.unbind("MouseDown");
		}
	};

	//se invoca cuando se termina el tiempo, se gana o se pierde la actividad
	this.terminarActividad = function() {
		juego.actividad.temporizador.pararTemporizador();
		juego.actividad.temporizador.destroy();
		//Crafty.scene("MostrarResultadosActividad");
		return this;
	};
};