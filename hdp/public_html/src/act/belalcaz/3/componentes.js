// Barra indicadora que acompaña al caballo
Crafty.c("B3_Barra", {
	e_barra: null,
	positivo: true, // false si el valor de al barra es negativo
	
	init: function() {
		this.requires("2D, Canvas, Color").attr({ w: 110, h: 20, z: 49, alpha: 0.5 }).color("#271300");
		
		this.e_barra = Crafty.e("2D, Canvas, Color").color("#B58010").attr({ x: 52, y: 2, h: 16, z: 50 });
		this.e_barra.origin(0, 8);
		this.e_barra.rotation = 0;
		this.e_barra.color("#4DB849");
		
		this.attach(this.e_barra);
	},
	
	// Actualiza el tamaño de la barra según el valor
	actualizar: function(v) {
		var anchoBarra = v * 33;
		
		if (anchoBarra > 0) {
			if (!this.positivo) {
				this.e_barra.rotation = 0;
				this.e_barra.color("#4DB849");
				this.positivo = true;
			}
			this.e_barra.w = anchoBarra;
				
		}
		else {
			if (this.positivo) {
				this.e_barra.rotation = 180;
				this.e_barra.color("#AF2800");
				this.positivo = false;
			}
			this.e_barra.w = -anchoBarra;
		}
	}
});

Crafty.c("B3_Indigena", {
	init: function() {
		var periodo = randomInt(0, 100) + 750;
		this.requires('2D, Canvas, sprB3_indioSalto, SpriteAnimation')
			.reel("saltar", periodo, [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0]]);
		this.animate("saltar", -1);
	}
});

Crafty.c("B3_Hoja", {
	vx: 0, // Velocidad en x
	vy: 2,
	ax: -0.1, // Aceleración en x
	
	init: function() {
		this.requires('2D, Canvas, sprB3_hoja' + randomInt(1, 3));
		this.z = 15;
		
		this.bind("EnterFrame", function() {
			this.y += this.vy;
			this.vy += 0.07;
			this.x += this.vx;
			this.vx += this.ax;
			
			// Hora de destruir esta hoja?
			if (this.y >= 800 || this.x < -52 || this.x > 1335) {
				this.destroy();
			}
		});
	},
	
	// Setter de la aceleración
	acel: function(a) {
		this.ax = a * 0.1;
		return this;
	}
	
});

// Arma que cae
Crafty.c("B3_Arma", {
	vx: 0, // Velocidad en x
	vy: 2,
	ax: -0.1, // Aceleración en x
	espada: true, // false si es lanza, true si es espada
	
	init: function() {
		this.espada = (randomInt(0, 2) === 0);
		this.requires('2D, Canvas, Mouse, ' + (this.espada ? "sprB3_espadaCae" : "sprB3_lanzaCae"));
		this.z = 15;
		
		this.bind("EnterFrame", function() {
			this.y += this.vy;
			this.vy += 0.08;
			this.x += this.vx;
			this.vx += this.ax;
			
			// Hora de destruir esta arma?
			if (this.y >= 800 || this.x < -130 || this.x > 1280) {
				this.destroy();
			}
		});
	},
	
	// Setter de la aceleración
	acel: function(a) {
		this.ax = a * 0.1;
		return this;
	}
});