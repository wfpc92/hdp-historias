/*la actividad es girar
 hacer un medidor
 que cuantos mas giros entonces anvanza mas, 
 si se suelta, el medidor disminuye.
 */

var ActividadToqueRapido = function() {
	//con esta cantidad se gana la actividad
	this.totAciertos = 0;
	//temporizados global de la actividad
	this.duracion = 0;
	//numero de aciertos: numero de veces que se golpeo a topo
	this.aciertos = 0;
	this.fracasos = 0;

	this.init = function() {
		var x0 = 400;
		var y0 = 200;
		var w0 = 200;
		var h0 = 200;

		var attrs = {x: x0, y: y0, w: w0, h: h0};

		//dibujar la barra de energia que aumenta o disminuye
		this.barra = Crafty.e('BarraPoder')
				.setAttr({x: 900, y: 300, w: 30, h: 300})
				.setActividad(this)
				.bind('EnterFrame', function() {
					this.disminuir();
				});

		var estaBarra = this.barra;
		//dibujar base de un ventilador(
		this.areaToque = Crafty.e('2D, Canvas, Color, Mouse')
				.attr({x: attrs.x, y: attrs.y, w: attrs.w * 2, h: attrs.h * 2})
				.color('red')
				.bind('MouseDown', function() {
					estaBarra.aumentar();
				});

		return this;
	};

	//se invoca cuando se termina el tiempo, se gana o se pierde la actividad
	this.terminarActividad = function() {
		juego.actividad.temporizador.pararTemporizador();
		juego.actividad.temporizador.destroy();
		//Crafty.scene("MostrarResultadosActividad");
		return this;
	};
};