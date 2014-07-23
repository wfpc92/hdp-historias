/**
 * Actividad Ladrillos, lanzar ladrillos desde la torre del reloj para hacerlos aterrizar a un punto especifico
 */
var ActPuente3 = function() {
    //con esta cantidad se gana la actividad
    this.totAciertos = 4;
    //tiempo en que se cambia de un topo a otro (milisegundos)
    this.duracion = 20000;
    //si se ha ganado la actividad
    this.actividadGanada = false;
    //si se ha ganado la actividad
    this.aciertos = 0;

    this.init = function() {
        this.crearEntidades();



        return this;
    };

    this.crearEntidades = function() {
        Crafty.e("2D, Canvas, Image").image("img/act/puente/3/fondo.png");
        this.priPlano = Crafty.e("2D, Canvas, Image").image("img/act/puente/3/primer_plano.png");
        this.priPlano.attr({x: 0, y: 800 - this.priPlano.h, z: 10});
        Crafty.e("2D, Canvas, Image").image("img/act/puente/3/nube.png").attr({x: 586, y: -22, z: 1});

        Crafty.e("2D, Canvas, sprH3_torreIzq").attr({x: -82, y: 197, z: 30});
        Crafty.e("2D, Canvas, sprH3_torreDer").attr({x: 110, y: 197, z: 20});

        Crafty.e("H3_GenLadrillos")
                .H3_GenLadrillos(42, 365, 25)
                .attr({x: 1089, y: 119, z: 50});

        Crafty.e("H3_Mesa").attr({x: 554, y: 657, z: 50}).H3_Mesa(264, 956);

        Crafty.e("H3_Puente").attr({x: 1070, y: 595, z: 50}).H3_Puente(this);
        return this;
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