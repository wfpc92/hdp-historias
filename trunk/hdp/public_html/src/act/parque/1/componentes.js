
Crafty.c("P1BloqueManz", {
        juego: {}, //referencia a la matriz representacion matricial del juego
        fila: -1, // posicion de la fila en la matriz
        columna: -1, //posicion de la columna en la matriz
        e_numero: null, //entidad que se comporta como numero.
        init: function() {
                this.requires("2D, Canvas, Image, Tweener, Mouse");
        },
        P1BloqueManz: function(numero, juego, fila, columna) {
                this.image("img/act/parque/1/manzana" + (1 + numero) + ".png")
                this.numero = numero;
                this.juego = juego;
                this.filaIni = fila;
                this.columnaIni = columna;
                this.fila = fila;
                this.columna = columna;
                this.velMov = 10;
                this.e_numero = Crafty.e("2D, Canvas, sprP1_numero, Sprite, Tweener")
                        .sprite(0, this.numero);
                this.e_numero.attr({
                        x: this.x + this.w / 2 - this.e_numero.w / 2,
                        y: this.y + this.h / 2 - this.e_numero.h / 2,
                        z: this.z + 1
                });
                this.attach(this.e_numero);
                return this;
        },
        //asignar evento de movimiento.
        iniciar: function() {
                this.bind("MouseDown", function() {
                        this.imprimirMatriz();
                        if (this.juego.matriz[this.fila][this.columna] == 1) {
                                //validar por cada posicion si tiene el vecino vacio
                                // a la derecha
                                if (this.actPosicion(this.fila, this.columna + 1)) {
                                        return;
                                }
                                //a la izquierda
                                if (this.actPosicion(this.fila, this.columna - 1)) {
                                        return;
                                }
                                // hacia arriba
                                if (this.actPosicion(this.fila - 1, this.columna)) {
                                        return;
                                }
                                // hacia abajo
                                if (this.actPosicion(this.fila + 1, this.columna)) {
                                        return;
                                }
                        }
                });
                return this;
        },
        imprimirMatriz: function() {
                console.log(this.juego.matriz);
        },
        actPosicion: function(nfila, ncolumna) {
                if (this.juego.matriz[nfila] != null) {
                        if (this.juego.matriz[nfila][ncolumna] == 0) { // si hay un cero en la posicion dada, intercambiar valores
                                this.mover(nfila, ncolumna);
                                this.verificarPosicion();
                                return true;
                        }
                }
                return false;
        },
        //calcula la nueva posicion en la matriz y saca su siguiente posicion
        mover: function(nfila, ncolumna, cllbck) {
                //quitar el bloque de la posicion actual
                this.juego.matriz[this.fila][this.columna] = 0;
                this.juego.matriz[nfila][ncolumna] = 1;
                //calcular nueva posicion
                var nposx = this.juego.posiciones[nfila][ncolumna].x;
                var nposy = this.juego.posiciones[nfila][ncolumna].y;
                //colocarlo en una posicion nueva
                this.addTween({x: nposx, y: nposy}, "easeInOutQuad", this.velMov, function() {
                        if (cllbck) {
                                cllbck();
                        }
                });
                //actualizar posiciones
                this.fila = nfila;
                this.columna = ncolumna;
        },
        verificarPosicion: function() {
                var posCorrecta = true;
                Crafty("P1BloqueManz").each(function() {
                        if (this.fila != this.filaIni || this.columna != this.columnaIni) {
                                posCorrecta = false;
                        }
                });
                if (posCorrecta) {
                        this.juego.posicionesOK();
                }
        },
        mostrarNumero: function(sw) {
                this.e_numero.addTween({alpha: (sw ? 1.0 : 0.0)}, "linear", 20);
                return this;
        }
});



