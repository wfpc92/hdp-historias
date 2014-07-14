
Crafty.c('Nube', {
	ventilador: null,
	velocidadRetorno: 0,
	velocidad: 0,
	e_lluvia: null,
	
	init: function() {
		this.requires('2D, Canvas, sprM3_nube')
				.bind('EnterFrame', function() {
					if (this.x >= -10 && this.x <= 1280 - this.w) {
						this.x -= this.velocidadRetorno;
					}
					if (this.x < 1110 - this.w) {
						this.x += this.velocidad;
					}
				});
		
		this.e_lluvia = Crafty.e("2D, Canvas, sprM3_LluviaAnimada, SpriteAnimation, Tweener")
				.attr({x: this.x + 30, y: this.y + 130, z: 3});
		this.e_lluvia.ocultar = function() {
			this.addTween({ alpha: 0 }, "linear", 5);
		};

		this.e_lluvia.reel("lloviendo", 1000, [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
			[0, 1], [1, 1], [2, 1], [3, 1]]);
		this.e_lluvia.animate('lloviendo', -1);
		this.attach(this.e_lluvia);
	},
	pararNube: function(ms) {
		var estaNube = this;
		this.max
		Crafty.e("Delay").delay(function() {
			estaNube.e_lluvia.ocultar();
			estaNube.unbind('EnterFrame');
		}, ms);
		return this;
	}
});

Crafty.c('Piedras', {
	init: function() {
		this.seAplicoFisica = false;
		this.piedras = [];
		//this.nPiedras = 15;
		this.nPiedras = 9;

		this.attrPiedras = [
			{x: 730, y: 269, z: 2, r: 1}, {x: 683, y: 312, z: 2, r: 1.1}, {x: 820, y: 186, z: 2, r: 0.8},
			{x: 695, y: 265, z: 2, r: 0.65}, {x: 758, y: 220, z: 2, r: 0.7}, {x: 774, y: 177, z: 2, r: 0.7},
			{x: 797, y: 239, z: 2, r: 0.6}, {x: 723, y: 240, z: 2, r: 0.5}, {x: 167, y: 574, z: 2, r: 1},
			{x: 735, y: 273, z: 2, r: 1}, {x: 762, y: 250, z: 2, r: 1}, {x: 775, y: 229, z: 2, r: 1}, 
			{x: 674, y: 370, z: 2, r: 1}, {x: 710, y: 284, z: 2, r: 1}, {x: 671, y: 332, z: 2, r: 1}
		];
		
		this.nPiedras = 9;
		
		//dibujar las piedras en las posiciones dadas y asignarles un numero.
		for (var i = 0; i < this.nPiedras; i++) {
			var sprite = 'sprM3_piedra' + (1 + i);
			this.piedras[i] = Crafty.e('2D, Canvas, Box2D, ' + sprite)
									.attr(this.attrPiedras[i]);
			
			var shp = new b2CircleShape(this.attrPiedras[i].r);
			if (i !== this.nPiedras - 1) {
				this.piedras[i].box2d({
					bodyType: 'dynamic',
					shape: shp,
					friction: 1
				});
			}
									
			this.piedras[i].num = 1 + i;
		}

		//dibujar el piso para las piedras
		this.pisoBox2D = Crafty.e('PisoBox2D');
		this.pisoBox2D.coordenadas = [[0,626],[314,592],[443,601],[522,598],[576,545],[781,350],[910,187],[1108,0]];
		this.pisoBox2D.dibujarPiso();
	}
});