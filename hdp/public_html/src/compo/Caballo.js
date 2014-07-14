Crafty.c('Caballo', {
    saltos: 0,
    
	init: function() {
        this.requires('2D, Canvas, Tweener, SpriteAnimation');
    },
    
	Caballo: function(spr) {
        this.sprCaballo = spr;
        this.requires(spr)
                .reel('caminando', 1000, [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]])
                .animate('caminando', -1);
        return this;
    },
    
	caminar: function(nvaPosicion, tiempo, callback) {
		this.cancelTweener();
        this.addTween({x: nvaPosicion.x, y: nvaPosicion.y}, 'easeOutQuad', tiempo, callback);
        return this;
    },
	
	// Agrega una espada (o algùn otro sprite) al caballo
	// Si se pasa una cadena vacía, se le quita la espada
    espada: function(spr) {
        if (spr !== "") {
			this.sprEspada = spr;
			this._espada = Crafty.e("2D, Canvas, " + spr)
								.attr({x: this.x + 140, y: this.y - 37, z: this.z - 1});
			this._espada.vy = 0.1755;
			this._espada.y0 = this._espada.y;
			this.attach(this._espada);
		}
		else {
			this.sprEspada = "";
			if (this._espada) {
				this._espada.destroy();
				this._espada = null;
			}
		}
        /*
		espada.bind("EnterFrame", function() {
            this.y += this.vy;
            if (this.y < this.y0 || this.y > (this.y0 + 2)) {
                this.vy = -this.vy;
            }
        });*/
        
        return this;
    },
    prop: function(prop, spr) {
        this.w = this.w * prop;
        this.h = this.h * prop;
        if (spr) {
            this.sprEspada = spr;
            this.espada(this.sprEspada);
            this._espada.w = this._espada.w * prop;
            this._espada.h = this._espada.h * prop;
            this._espada.x = this.x + 140 * prop;
            this._espada.y = this.y - 37 * prop;
        }
        return this;
    },
    t: 0, // Cuenta interna para la función
    dt: 0, // Incremento a sumar a la cuenta interna cada frame
    ciclo1: false, // true si está en el ciclo 0. Se alterna entre ciclo 0 y 1 (true-false)
    xIni: 0, // Posición inicial de la entidad
    amplitud: 0, // amplitud de oscilación
    /**
     * realiza un recorrido con forma de parabolica
     * @param {type} saltarA :objeto con x,y posiciones 
     * @param {type} t
     * @returns {undefined}
     */
    saltar: function() {
        this.z = 15;
        this.y -= 100;
        this.svx = 10;
        this.oscilarX(90, 28);
        //Crafty.e("2D,Canvas,Color,Draggable").color('blue').attr({x: this.x, y: this.y, w: 50, h: 50})
        //Crafty.e("2D,Canvas,Color,Draggable").color('blue').attr({x: this.x, y: this.y, w: 70, h: 70})

    },
    _calculo: function(t) {
        return 1 - 4 * (t - 0.5) * (t - 0.5);
    },
    // Oscilar un deltaX como máximo alrededor de la posición actual
    oscilarX: function(amplitud, periodo) {
        this.dt = 1 / periodo;
        this.xIni = this.y;
        this.amplitud = amplitud;

        this.osc = this.bind("EnterFrame", this.frame);

        return this;
    },
    // Invocada cada EnterFrame
    frame: function() {
        this.t += this.dt;
        if (this.t >= 1) {
            this.ciclo1 = (this.ciclo1 ? false : true);
            this.t = 0;
            this.saltos += 1;
        }
        this.x += this.svx;
        this.y = this.xIni - this.amplitud * this._calculo(this.t);

        if (this.saltos == 4) {
            this.unbind("EnterFrame");
            this.animate("caminando", -1);
            this.caminar({x: this.x + 100, y: this.y}, 4);
        }
        //Crafty.e("2D,Canvas,Color").color('blue').attr({x: this.x, y: this.y, w: 10, h: 10})
    },
});
