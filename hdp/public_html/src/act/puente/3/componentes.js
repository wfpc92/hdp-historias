Crafty.c("H3_GenLadrillos", {
    init: function() {
        this.requires("Mouse")
                .bind("MouseDown", function() {
                    this.genLadrillo();
                });
    },
    H3_GenLadrillos: function(actividad) {
        this.actividad = actividad;
        return this;
    },
    posGenerador: function(posx, posy, posz) {
        this.posx = posx;
        this.posy = posy;
        this.posz = posz;
        this.tInterval = 3500;
        this.tIntervalMin = 1000;
        this.bloqueado = false;
        this.genLadrillos();
        return this;
    },
    genLadrillos: function() {
        this._intervalos();
        return this;
    },
    //generar 
    _intervalos: function() {
        var self = this;
        var rndNum = Crafty.math.randomInt(this.tInterval, this.tIntervalMin);
        setTimeout(function() {
            if (!self.bloqueado) {
                self.tInterval -= 60;
                if (self.tInterval <= self.tIntervalMin) {
                    self.tInterval = self.tIntervalMin;
                }
                self.crearLadrillo();
                self._intervalos();
            }
        }, rndNum);
        return this;
    },
    crearLadrillo: function() {
        var self = this;
        var ladrillo = Crafty.e("H3_Ladrillo")
                .attr({x: this.posx, y: this.posy, z: this.posz})
                .H3_Ladrillo(this.actividad.mesa, this.actividad.puente)
                .iniciarMovimiento();
        //inicialmente el ladrillo pasa entre las dos torres del reloj, entonces hacer esto para que el ladrillo quede sobre las torres
        setTimeout(function() {
            ladrillo.z = self.posz + 10;
        }, 100);
        return this;
    },
    pararGenLadillo: function() {
        this.bloqueado = true;
        return this;
    }
});

Crafty.c("H3_Ladrillo", {
    init: function() {
        this.requires("H3_Cuerpo, Image, Tweener")
                .image("img/act/puente/3/ladrillo.png");
    },
    H3_Ladrillo: function(mesa, puente) {
        this.mesa = mesa;
        this.puente = puente;
        return this;
    },
    //el ladrillo colisiona con la mesa si se encuentra en sus mismas coodenadas en x y 10 pixeles mas abajo que su primera y
    colisionMesa: function() {
        if (this.y + this.h > this.mesa.y)
            return this.x > this.mesa.x && this.x + this.w < this.mesa.x + this.mesa.w - 20
                    && this.y + this.h > this.mesa.y && this.y + this.h < this.mesa.y + 10;
        else
            return false;
    },
    //el ladrillo colisiona con el puente si sus posiciones se encuentran dentro de la misma area.
    colisionPuente: function() {
        if (this.x > this.puente.x)
            return this.y < this.puente.y + this.puente.h;//if (this.y + this.h > this.puente.y)        return this.x + this.w > this.puente.x && this.x < this.puente.x + this.puente.w&& this.y + this.h < this.puente.y + this.puente.h;
        else
            return false;
    },
    twPuente: function() {
        this.vy = 0;
        this.vx = 0;
        this.ay = 0;
        this.addTween({x: this.puente.x + 50, y: this.puente.y + 60}, "linear", 60, function() {
            this.destroy();
            this.puente.construirPuente();
        });
        return this;
    }
});

Crafty.c("H3_Cuerpo", {
    init: function() {
        this.requires("2D, Canvas")
    },
    iniciarMovimiento: function() {
        this.origin(this.w / 2.0, this.h / 2.0);
        //velocidad de la rotacion
        this.vr = 3;
        this.ar = 0.1;
        this.vrmin = -10;
        this.vrmax = 10;

        this.vx = 1.2;
        //iniciar con una velocidad negativa para que asuma una trayectoria parabolica
        this.vy = Crafty.math.randomNumber(-6, -1.5);
        //aceleracion en y constante
        this.ay = 0.06;

        //porcentaje de atenuacion del movimiento
        this.atenua = 0.5;//el rango de atenuacion es de 0.5 a 1.5.

        this.bind("EnterFrame", function() {
            //velocidad en x constante
            this.x += this.vx;
            //velocidad en y variable
            this.y += this.vy;
            this.vy += this.ay;

            //hacer que el cuerpo gire sobre su eje.
            this.rotation += this.vr;
            //aumentar velocidad de giro.
            if ((this.vr += this.ar) > this.vrmax) {
                this.vr = this.vrmax;
            }
            if (this.vr < this.vrmin) {
                this.vr = this.vrmin;
            }

            //collision con la mesa, efecto de rebote
            if (this.colisionMesa()) {
                this.vy = -this.vy;//cambio de direccion
                //el efecto de atenuacion va a depender de donde toque el ladrillo a la mesa.
                this.vy += this.calcAtenuacion();
                //cuando la velocidad en Y es bastante baja, entonces hacer que el ladrillo caiga y no siga rebotando.
                if (this.vy > -1.2 && this.vy < 0.5) {
                    this.colisionMesa = this.desFunc;
                } else {
                    this.y += this.vy; //para que el ladrillo retroceda un poco (rebote instantaneo)
                }
            }
            //collision con el puente, si ocurre una colision entonces se debe construir el puente
            if (this.colisionPuente()) {
                this.colisionPuente = this.desFunc;
                this.twPuente();
            }
            //destruir la entidad cuando sobre pase los limites
            if (this.x > 1280 || this.y > 800) {
                this.unbind("EnterFrame")
                this.destroy();
            }
            //Seguimiento de trayectoria: borrar la siguiente linea de codigo que provoca lentitud en la aplicacion
            //Crafty.e("2D, Canvas, Color").color("blue").attr({x: this.x, y: this.y, z: this.z, w: 3, h: 3, alpha: 0.2});
        });
        return this;
    },
    desFunc: function() {
        return false;
    },
    calcAtenuacion: function() {
        var choquex = this.x - this.mesa.x;
        var atenuaR = 0;
        if (choquex < 20) {//primer caso: el ladrillo rebota en direccion contraria a la que lleva
            atenuaR = Crafty.math.randomNumber(0.5, 1.0);
            this.vx -= 2;
            this.vr = -this.vr;
            this.ar = -0.1;
        } else if (choquex < 87) {//segundo caso: el ladrillo 
            atenuaR = Crafty.math.randomNumber(1.2, 1.5);
            this.vx += 0.8;
            this.vr = Math.abs(this.vr);
            this.ar = 0.1;
        } else {
            atenuaR = Crafty.math.randomNumber(0.5, 1.0);
            this.vx += 0.1;
            this.vr = Math.abs(this.vr);
            this.ar = 0.1;
        }
        return atenuaR;
    }
});
Crafty.c("H3_Mesa", {
    init: function() {
        this.requires("2D, Canvas, Image, Arrastrable")
                .image("img/act/puente/3/mesa.png")
                .unbind("EnterFrame");
    },
    //argumentos, valores minimos y maximos sobre los que se puede mover la mesa.
    H3_Mesa: function(xmin, xmax) {
        this.xmin = xmin;
        this.xmax = xmax;
        this.y0 = this.y;
        this.bind("EnterFrame", function() {
            this.y = this.y0;
            if (this.x < this.xmin) {
                this.x = this.xmin;
            }
            if (this.x > this.xmax) {
                this.x = this.xmax;
            }
        });
        return this;
    }
});

Crafty.c("H3_Puente", {
    init: function() {
        this.requires("2D, Canvas, Tweener");
        this.spr = [];
        this.limites = [];
        for (var i = 0; i < 5; i++) {
            this.spr[i] = "sprH3_puente" + i;
            this.limites[i] = i;
        }
        this.spr_cont = 0;
        this.eng_cont = 0;
    },
    H3_Puente: function(actividad) {
        this.actividad = actividad;
        this.cambiarSprite();
        return this;
    },
    construirPuente: function() {
        //criterio para cambiar el sprite.
        for (var i = 0; i < this.limites.length; i++) {
            //si el contador es igual al limite.
            if (this.eng_cont == this.limites[i]) {
                this.cambiarSprite();
                i = this.limites.length;
            }
        }
        this.eng_cont++;
        //si ya se han contado todos los limites entonces se gana la actividad.
        if (this.eng_cont == this.limites.length - 1) {
            this.actividad.ganarActividad();
        }
        return this;
    },
    cambiarSprite: function() {
        if (this.spr_cont < this.spr.length) {
            var h_old = this.h;//altura antigua para colocarlo sobre el suelo.
            this.removeComponent(this.spr[this.spr_cont - 1]);
            this.addComponent(this.spr[this.spr_cont]);
            if (h_old) {
                this.y -= this.h - h_old;//posicion inicial relativa al suelo
            }
            this.spr_cont++;
        }
        return this;
    }
});
