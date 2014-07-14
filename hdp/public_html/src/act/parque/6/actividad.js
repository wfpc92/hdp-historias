/**
 * @returns {ActParque1}
 */
var ActParque6 = function() {
	//con esta cantidad se gana la actividad
	 this.totAciertos = 0;
	 //tiempo en que se cambia de un topo a otro (milisegundos)
	 this.duracion = 20000;
	 //si se ha ganado la actividad
	 this.actividadGanada = false;
	 //si se ha ganado la actividad
	 this.aciertos = 0;
	 this.b2a = new B2arrastre();
	 
	 
	 this.init = function() {
	 this.crearEntidades();
	 this.desMonumento();
	 // Inicializamos el objeto gestor de arrastre de la escena
	 this.b2a.init(this.e_piso);
	 
	 if (!cocoon) {
	 Crafty.box2D.showDebugInfo();
	 }
	 return this;
	 };
	 
	 this.crearEntidades = function() {
	 Crafty.e("2D, Canvas, Image").image("img/act/parque/6/fondo.jpg").attr({x: 0, y: 0, z: 0});
	 Crafty.e("2D, Canvas, Image").image("img/act/parque/6/casas.png").attr({x: 0, y: 440, z: 2});
	 Crafty.e("2D, Canvas, Image").image("img/act/parque/6/catedral.png").attr({x: 300, y: 53, z: 20, alpha: 0.1});
	 Crafty.e("2D, Canvas, Image").image("img/act/parque/6/nubes.png").attr({z: 1});
	 this.piso = Crafty.e("2D, Canvas, Image").image("img/act/parque/6/piso.png");
	 this.piso.attr({y: 800 - this.piso.h, z: 3});
	 
	 // Cuerpo del piso 
	 this.e_piso = Crafty.e('2D, Canvas, Box2D')
	 .box2d({
	 bodyType: 'static',
	 shape: [[0, 750], [1280, 750]]
	 });
	 // Paredes
	 Crafty.e('2D, Canvas, Box2D').box2d({bodyType: 'static', shape: [[0, 0], [1280, 0]]});
	 Crafty.e('2D, Canvas, Box2D').box2d({bodyType: 'static', shape: [[0, 0], [0, 800]]});
	 Crafty.e('2D, Canvas, Box2D').box2d({bodyType: 'static', shape: [[1280, 0], [1280, 800]]});
	 Crafty.e('2D, Canvas, Box2D').box2d({bodyType: 'static', shape: [[0, 800], [1280, 800]]});
	 this.crearPartes();
	 };
	 
	 this.crearPartes = function() {
	 var n = 10;
	 //posiciones donde deben estar ubicados los bloques
	 this.attrPartes = [
	 {x: 555, y: 53, z: 15, alpha: 0.1},
	 {x: 439, y: 280, z: 15, alpha: 0.1},
	 {x: 300, y: 439, z: 15, alpha: 0.1},
	 {x: 639, y: 440, z: 15, alpha: 0.1},
	 {x: 528, y: 455, z: 15, alpha: 0.1},
	 {x: 692, y: 455, z: 15, alpha: 0.1},
	 {x: 364, y: 455, z: 15, alpha: 0.1},
	 {x: 453, y: 455, z: 15, alpha: 0.1},
	 {x: 795, y: 455, z: 15, alpha: 0.1},
	 {x: 883, y: 455, z: 15, alpha: 0.1}
	 ];
	 //figuras de los bloques
	 this.attrPartesBloques = [
	 [[84, 0], [146, 113], [175, 193], [168, 257], [1, 258], [0, 190], [30, 114]],
	 [[200, 0], [374, 30], [401, 64], [404, 166], [0, 167], [0, 67], [24, 35]],
	 [[19, 0], [343, 0], [342, 44], [19, 49], [0, 20]],
	 [[2, 0], [326, 0], [343, 22], [324, 46], [0, 45]],
	 [[0, 0], [59, 0], [59, 261], [0, 261]],
	 [[0, 0], [59, 0], [59, 261], [0, 261]],
	 [[0, 0], [30, 0], [30, 261], [0, 261]],
	 [[0, 0], [30, 0], [30, 261], [0, 261]],
	 [[0, 0], [30, 0], [30, 261], [0, 261]],
	 [[0, 0], [30, 0], [30, 261], [0, 261]],
	 ];
	 //estos son los bloques obligatorios que deben estar ubicados para poder ponerlo en la posicion correcta
	 this.bloquesObli = [
	 [1],
	 [2, 3],
	 [4, 5, 6],
	 [7, 8, 9],
	 null,
	 null,
	 null,
	 null,
	 null,
	 null
	 ];
	 
	 this.huecos = [];
	 
	 
	 //crear los huecos en las posiciones donde deben ir encajando y los bloques en la misma posicion
	 for (var i = 0; i < n; i++) {
	 //crear el hueco para hacer encajar las partes del monumento
	 this.huecos[i] = Crafty.e("P6Hueco")
	 .attr(this.attrPartes[i])
	 .P6Hueco(this, i, "sprP6_parte" + i);
	 //partes de la catedral
	 Crafty.e("P6Parte")
	 .attr({x: this.attrPartes[i].x, y: this.attrPartes[i].y, z: 20})
	 .P6Parte(this, //referencia a la actividad padre
	 this.huecos[i], //referencia al hueco donde va a encajar
	 i, //numero asignado como identificador
	 this.attrPartesBloques[i], //figura de componente
	 "sprP6_parte" + i, //sprite de componente
	 this.bloquesObli[i]);//bloques que deben estar encajados para que encaje
	 }
	 };
	 
	 //Hacer mover los bloques para diferentes partes. (aplicar un impulso)
	 this.desMonumento = function() {
	 var self = this;
	 Crafty.e("Delay").delay(function() {
	 Crafty("P6Parte").each(function() {
	 //obteniendo la fuerza necesaria para mover los bloques
	 var force = new b2Vec2(
	 (Crafty.math.randomElementOfArray([-1, 1]) * this.body.GetMass() * 10),
	 -this.body.GetMass() * 3);
	 this.body.ApplyImpulse(force, this.body.GetWorldCenter());
	 });
	 Crafty.e("Delay").delay(function() {
	 Crafty("BolaDestroy").each(function() {
	 world.DestroyBody(this.body);
	 });
	 }, 2000);
	 }, 1000);
	 
	 };
	 
	 //verificar si ya se han colocados todos los numeros.
	 // Invocada por cada bloque al ser fijado
	 this.bloqueFijado = function() {
	 this.aciertos++;
	 if (this.aciertos >= this.totAciertos) {
	 this.ganarActividad();
	 }
	 };
	 // Siempre invocada al terminar la actividad
	 this.terminarActividad = function() {
	 return this;
	 };
	 
	 this.ganarActividad = function() {
         gesActividad.temporizador.parar();
	 gesActividad.mostrarPuntaje();
	 return this;
	 };
};