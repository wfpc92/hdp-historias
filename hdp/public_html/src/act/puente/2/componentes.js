Crafty.c("H2_Personaje", {
    indicador: false,
    init: function() {
        this.requires("2D, Canvas, Tweener");
    },
    H2_Personaje: function() {
        return this;
    },
    caminar: function(attr, cll) {
        this.cancelTweener();
        if (cll != null) {
            this.addTween({x: attr.x, y: attr.y}, "linear", attr.t, cll);
        } else {
            this.addTween({x: attr.x, y: attr.y}, "linear", attr.t);
        }
        return this;
    },
    puntoFinal: function(pf) {
        this.pf = pf;
        return this;
    },
    caminarAleatorio: function() {
        var despx = this.x + (this.pf.dir == -1 ?
                Crafty.math.randomInt(-100, -50) :
                Crafty.math.randomInt(50, 100));
        var despy = this.y + Crafty.math.randomInt(-1, 1) * Crafty.math.randomInt(10, 60);
        var despt = Crafty.math.randomInt(70, 100);
        if(despy > 650){
            despy = 650;
        }
        this.caminar({x: despx, y: despy, t: despt}, function() {
            //si llega al final verificar que haya llegado al punto final .pf
            if (this.pf.dir == -1) {//de derecha a izquierda
                if (this.x < this.pf.x) {
                    this.destroy();
                } else {
                    this.caminarAleatorio();
                }
            } else if (this.pf.dir == 1) { //de izquierda a derecha
                if (this.x > this.pf.x) {
                    this.destroy();
                } else {
                    this.caminarAleatorio();
                }
            }
        });
        return this;
    }
});

