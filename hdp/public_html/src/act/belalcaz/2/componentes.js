Crafty.c("Cocodrilo", {
    emerger: false,
    init: function() {
        this.requires('2D, Canvas, SpriteAnimation');
    },
    Cocodrilo: function(spr) {
        this.requires(spr)
                .reel("emerger", 1000, [[5, 0], [4, 0], [3, 0], [2, 0], [1, 0], [0, 0]])
                .reel("sumergir", 1000, [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]])
                .reel("bajo_agua", Crafty.math.randomInt(0, 200), [[5, 0]])
                .animate("bajo_agua", 1)
                .bind('AnimationEnd', function() {
                    var tmin = 120, tmax = 240;
                    var est = this;
                    //si finalizo la animacion de emerger entonces que se quede quieto
                    Crafty.e("DelayFrame").delay(function() {
						if (est.getReel().id === "emerger") {
                            est.animate("sumergir", 1);
                        }
                        else {
                            est.animate("emerger", 1);
                        }
					}, Crafty.math.randomInt(tmin, tmax));
                });
        return this;
    }
});


Crafty.c("Tronco", {
    dejar_caer: false,
    tomado: false,
	
	xIni: 0, // Coordenadas iniciales del tronco
	yIni: 0,
	zIni: 10, // z original antes de ser tomado
	xFin: 0, // Coords finales
	yFin: 0,
	ay: 0.8, // aceleración gravitacional apra caer
    
	init: function() {
		this.requires('Arrastrable');
		//quitar comportamiento de componente arrastrable
		//this.unbind("EnterFrame");
		
		this.bind("MouseDown", function() {
			//quitamos comportamiento inicial
			this.cancelTweener();
			//this.unbind("EnterFrame", this.caer);
			this.z = 20;
			if (this.rotation !== 0) {
				this.addTween({ rotation: 0}, "linear", 5);
			}
			this.tomado = true;
		});
		
		
		this.bind("MouseUp", function() {
			this.soltar();
		});
    },
	
    //movimiento inicial del tronco, salir y esconderse
    movInicial: function() {
		this.dejar_caer = false;
		
		// Escogemos la posición de salida del tronco
		var rand = randomInt(11, 14);
		this.z = rand;
		this.zIni = this.z;
		
		switch (rand) {
			case 11:
				this.xIni = randomInt(400, 430);
				this.yIni = randomInt(542, 590);
				break;
			case 12:
				this.xIni = randomInt(900, 960);
				this.yIni = randomInt(540, 580);
				break;
			case 13:
				this.xIni = randomInt(944, 986);
				this.yIni = randomInt(566, 610);
				break;
			case 14:
				this.xIni = randomInt(455, 500);
				this.yIni = randomInt(596, 610);
				break;
		}
		this.x = this.xIni;
		this.y = this.yIni;
		this.xFin = this.xIni - this._w;
		this.yFin = this.yIni - this._h;
		this.rotation = 20;
		this.visible = true;
		
		this.cancelTweener();
		this.addTween({ alpha: 1 }, "linear", 8);
		this.addTween({ x: this.xFin + (this._w / 2) }, "easeOutCubic", 40);
		this.addTween({ y: this.yFin, rotation: 10 }, "easeOutCubic", 40, function() {
			this.addTween({ x: this.xFin, rotation: -10 }, "linear", 50);
			this.addTween({ y: 800 }, "easeInCubic", 60, function() {
				this.visible = false;
				this.alpha = 0;
			});
		});
    },
	
	
   // Cuando se suelta el click del tronco
	soltar: function() {
		this.z = this.zIni;
		this.cancelTweener();
		this.tomado = false;
		
		return this;
    }
	
});



