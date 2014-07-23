Crafty.c("H3_GenLadrillos", {
    init: function() {
        this.requires("Mouse")
                .bind("MouseDown", function() {
                    this.genLadrillo();
                });
    },
    H3_GenLadrillos: function(posx, posy, posz) {
        this.posx = posx;
        this.posy = posy;
        this.posz = posz;
        return this;
    },
    genLadrillo: function() {
        var ladrillo = Crafty.e("H3_Ladrillo")
                .attr({x: this.posx, y: this.posy, z: this.posz})
                .iniciarMovimiento();
        return this;
    }
});

Crafty.c("H3_Ladrillo", {
    init: function() {
        this.requires("H3_Cuerpo, Image, Ubicador")
                .image("img/act/puente/3/ladrillo.png");
    }
});

Crafty.c("H3_Cuerpo", {
    init: function() {
        this.requires("2D, Canvas");
    },
    iniciarMovimiento: function() {
        this.vx = 4;
        this.ax = 0.8;
        this.vxmax = 100;
        this.ay = -2.5;
        this.aymax = 2.5;
        this.vy = 0;

        this.bind("EnterFrame", function() {
            var self = this;
            this.x += this.vx;
            this.vx += this.ax;
            if(this.vx > this.vxmax){
                this.vx = this.vxmax;
            }
            this.y += this.vy;
            this.vy += this.ay;
            this.ay += 0.5;
            if (this.ay > this.aymax) {
                this.ay = this.aymax;
            }
            Crafty("H3_Mesa").each(function() {
                if (self.x > this.x && self.x + self.w < this.x + this.w
                        && self.y + self.h > this.y && self.y + self.h < this.y + 30) {
                    self.ay = -4;
                    self.ax = 0;
                    self.vx = 4;
                    self.vy = -10;
                }
            });
            //collision con el puente, si ocurre una colision entonces se debe construir el puente
            Crafty("H3_Puente").each(function() {
                if (self.x + self.w > this.x && self.x < this.x + this.w
                        && self.y + self.h > this.y && self.y + self.h < this.y + this.h) {
                    self.destroy();
                    this.construirPuente();
                }
            });
            //destruir la entidad cuando sobre pase los limites
            if (this.x > 1280 || this.y > 800) {
                this.destroy();
            }



            Crafty.e("2D, Canvas, Color").color("blue").attr({x: this.x, y: this.y, z: this.z, w: 3, h: 3});

        })
        return this;
    }
});

Crafty.c("H3_Mesa", {
    init: function() {
        this.requires("2D, Canvas, Image, Mouse")
                .image("img/act/puente/3/mesa.png")
                .bind("MouseDown", function(e) {
                    var pos = mouseCoords(e);
                    this.mouseIniX = pos.x;
                    this.presionado = true;
                })
                .bind("MouseUp", function() {
                    this.presionado = false;
                })
                .bind("MouseMove", function(e) {
                    if (this.presionado) {
                        var nuevaPos = mouseCoords(e);
                        this.x += nuevaPos.x - this.mouseIniX;
                        this.y = this.y0;
                        this.mouseIniX = nuevaPos.x;

                        if (this.x < this.xmin) {
                            this.x = this.xmin;
                        }
                        if (this.x > this.xmax) {
                            this.x = this.xmax;
                        }
                    }
                });
    },
    //argumentos, valores minimos y maximos sobre los que se puede mover la mesa.
    H3_Mesa: function(xmin, xmax) {
        this.xmin = xmin;
        this.xmax = xmax;
        this.y0 = this.y;
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
