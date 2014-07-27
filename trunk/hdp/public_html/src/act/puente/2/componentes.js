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
        if(despy > 750){
            despy = 750;
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

Crafty.c("H2_Contador", {
    e_numeros: [], //entidades de numeros.
    init: function() {
        this.requires("2D, Canvas, Tweener");
    },
    H2_Contador: function(actividad) {
        this.actividad = actividad;
        this.contador = 0;
        this.dibujar();
        return this;
    },
    aumentar: function() {
        this.contador += 1;
        this.dibujar();
        this.actividad.aumentaContador();
        return this;
    },
    dibujar: function() {
        if (this.e_numeros.length > 0) {//borrar los numeros que esten dibujados.
            for (var i = 0; i < this.e_numeros.length; i++) {
                this.e_numeros[i].destroy();
            }
            this.e_numeros = [];
        }
        var strContador = this.contador + "";//convertir el contador en cadena
        for (var i = 0; i < strContador.length; i++) {
            var intNumero = strContador[i];
            this.e_numeros[i] = Crafty.e("2D, Canvas, H2_Numero, sprH2_numero" + intNumero);
            //posicion del numero: posicion de la hoja de contador mas un desplazamiento segun si el numero es de una o dos cifras
            var despx = this.x + (this.contador < 10 ? 67 : 40) + i * (this.e_numeros[i].w + 6);
            this.e_numeros[i].attr({x: despx, y: this.y + 30});
        }
        return this;
    }
});