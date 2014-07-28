/**
 * Actividad 2 Puente: recoger 82 firmas de personajes.
 */
var ActPuente2 = function() {
    //con esta cantidad se gana la actividad
    this.totAciertos = 4;
    //tiempo en que se cambia de un topo a otro (milisegundos)
    this.duracion = 20000;
    //si se ha ganado la actividad
    this.actividadGanada = false;
    //si se ha ganado la actividad
    this.aciertos = 0;

    this.init = function() {
        var actividad = this;
        this.crearEntidades();

        //aqui se define el objeto que genera personajes posicionado aleatoriamente.
        this.genPersonajes = {
            bloqueado: false, //para permitir que genere o no personajes.
            tInterval: 30, //timpo de generacion entre personajes.
            caminos: [//estos son los caminos por donde salen los personajes.
                {x0min: 1280, x0max: 1280, y0min: 294, y0max: 672, t: 0, x1min: -64, x1max: -64, y1min: 425, y1max: 732, dir: -1},
                {x0min: -64, x0max: -64, y0min: 425, y0max: 732, t: 0, x1min: 1280, x1max: 1280, y1min: 425, y1max: 732, dir: 1}
            ],
            //cada cierto tiempo se genera un peraobnje para que salga desde una parte de la pantalla
            genPersonajes: function() {
                var self = this;
                Crafty.e("DelayFrame").delay(function() {
                    if (!self.bloqueado) {
                        var camino = Crafty.math.randomElementOfArray(self.caminos);
                        self.crearPersonaje(camino);
                        self.genPersonajes();
                        console.log("se esta creando un persoanje")
                    }
                }, this.tInterval);
                return this;
            },
            crearPersonaje: function(camino) {
                //posiciones iniciales de los personajes.
                var x0 = Crafty.math.randomInt(camino.x0min, camino.x0max),
                        y0 = Crafty.math.randomInt(camino.y0min, camino.y0max),
                        x1 = Crafty.math.randomInt(camino.x1min, camino.x1max),
                        y1 = Crafty.math.randomInt(camino.y1min, camino.y1max),
                        t = camino.t,
                        dir = camino.dir,
                        id = Crafty.math.randomInt(0, 26),
                        spr = (id < 23 ? "sprH2_pAdulto" : "sprH2_pNino" + id);

                var personaje = Crafty.e("H2_Personaje, " + spr)
                        .attr({x: x0, y: y0, z: 15})
                        .puntoFinal({x: x1, y: y1, t: t, dir: dir})
                        .caminarAleatorio();

                personaje.esNino = (id < 23 ? false : true);
                if (id < 23) {
                    personaje.sprite(id, 0);
                }
                //dibujarle un indicador al personaje
                return personaje;
            },
            indicador: function(personaje) {
                var posx, posy;
                if (personaje.esNino) {//el indicador varia de posicion segun el tamaño del personaje.
                    posx = personaje.x - 6;
                    posy = personaje.y - 20;
                } else {
                    posx = personaje.x;
                    posy = personaje.y - 12;
                }
                personaje.e_indicador = Crafty.e("2D, Canvas, Image, Mouse")
                        .image("img/act/puente/2/indicador.png")
                        .attr({x: posx, y: posy, z: personaje.z});
                personaje.attach(personaje.e_indicador);
                personaje.indicador = true;//tienen una entidad de indicador.
                personaje.e_indicador.bind("MouseDown", function() {
                    if (personaje.indicador) {
                        var ad = null;
                        if (personaje.esNino) {
                            ad = Crafty.e("Advertencia").attr({x: personaje.x + 30, y: personaje.y - 70, z: personaje.z}).mostrar(2, 40);
                            actividad.ninoIndicador();
                        } else {
                            ad = Crafty.e("Advertencia").attr({x: personaje.x + 40, y: personaje.y - 60, z: personaje.z}).mostrar(0, 40);
                            actividad.adultoIndicador();
                            this.destroy();
                            personaje.indicador = false;
                        }
                        personaje.attach(ad);
                    }
                }).bind("EnterFrame", function() {
                    if (this.x < 0 || this.x > 1260) {
                        this.destroy();
                        actividad.siguienteIndicador();
                    }
                });
                return this;
            },
            parar: function() {
                this.bloqueado = true;
                return this;
            }
        };


        //empezar a generar personajes.
        this.genPersonajes.genPersonajes();
        var numPIni = 30; //numero de personajes iniciales.
        for (var i = 0; i < numPIni; i++) {
            var dir = Crafty.math.randomElementOfArray([-1, 1]);
            var x0 = Crafty.math.randomInt(-64, 1200);//posicion en x inicial
            var x1 = (dir == -1 ? -64 : 1280);//posicion final en x
            var pers = this.genPersonajes.crearPersonaje({
                x0min: x0, x0max: x0,
                y0min: 425, y0max: 732,
                t: 2000,
                x1min: x1, x1max: x1,
                y1min: 425, y1max: 732,
                dir: dir
            });
        }

        this.genPersonajes.indicador(pers);
        return this;
    };

    this.crearEntidades = function() {
        Crafty.e("2D, Canvas, Image").image("img/act/puente/2/fondo.jpg");
        this.e_contador = Crafty.e("H2_Contador, Image")
                .image("img/act/puente/2/hoja.png")
                .attr({x: 557, y: 10})
                .H2_Contador(this);
        return this;
    };

    this.aumentaContador = function() {
        //cuando se recogen todas las firmas.
        if (++this.aciertos == this.totAciertos) {
            this.ganarActividad();
        }
        return this;
    };

    this.ninoIndicador = function() {
        console.log("tiene indicador pero es un niño, los niños no pueden firmar.");
        this.siguienteIndicador();
        return this;
    };

    this.adultoIndicador = function() {
        this.e_contador.aumentar();
        this.siguienteIndicador();
        return this;
    };

    this.siguienteIndicador = function() {
        var numPers = Crafty("H2_Personaje").length - 1;
        var alea = Crafty.math.randomInt(0, numPers);
        for (var i = 0; i < Crafty("H2_Personaje").length; i++) {
            if (i == alea) {
                var personaje = Crafty(Crafty("H2_Personaje")[i]);
                if (!personaje.indicador &&
                        (personaje.x > 0 && personaje.x < 1280)) {
                    this.genPersonajes.indicador(personaje);
                } else {
                    this.siguienteIndicador();
                }
                break;
            }
        }
        return this;
    };

    // Siempre invocada al terminar la actividad
    this.terminarActividad = function() {
        this.genPersonajes.parar();
        return this;
    };

    this.ganarActividad = function() {
        this.terminarActividad();
        gesActividad.temporizador.parar();
        gesActividad.mostrarPuntaje();
        return this;
    };
};