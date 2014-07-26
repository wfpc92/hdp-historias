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
        Crafty.e("2D, Canvas, Image").image("img/act/puente/3/nube.png").attr({x: 586, y: -22, z: 1});
        this.priPlano = Crafty.e("2D, Canvas, Image").image("img/act/puente/3/primer_plano.png");
        this.priPlano.attr({x: 0, y: 800 - this.priPlano.h, z: 10});

        //la torre del reloj esta dividida en dos partes.
        this.torreIzq = Crafty.e("2D, Canvas, sprH3_torreIzq")
                .attr({x: -82, y: 197, z: 30});
        this.torreDer = Crafty.e("2D, Canvas, sprH3_torreDer")
                .attr({x: this.torreIzq.x + this.torreIzq.w - 5, y: this.torreIzq.y, z: this.torreIzq.z - 10});
        //la mesa hace que los ladrillos reboten.
        this.mesa = Crafty.e("H3_Mesa").attr({x: 554, y: 657, z: 50}).H3_Mesa(-20, 918);
        //El puente que se va construyendo a medida que los ladrillos caen sobre él.
        this.puente = Crafty.e("H3_Puente").attr({x: 1070, y: 595, z: 50}).H3_Puente(this);
        //el generador de ladrillos hace que se creen nuevos ladrillos.
        this.genLadrillos = Crafty.e("H3_GenLadrillos").H3_GenLadrillos(this).posGenerador(90, 330, 25);//(45, 458, 25);

        return this;
    };

    // Siempre invocada al terminar la actividad
    this.terminarActividad = function() {
        this.genLadrillos.pararGenLadillo();
        Crafty("H3_Ladrillo").each(function() {
            this.unbind("EnterFrame")
            this.addTween({ alpha: 0 }, "linear", 10);
        });
        return this;
    };

    this.ganarActividad = function() {
        this.terminarActividad();
        gesActividad.temporizador.parar();
        Crafty.e("Delay").delay(function() {
            gesActividad.mostrarPuntaje();
        }, 700);
        return this;
    };
};