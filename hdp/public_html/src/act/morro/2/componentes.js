/**
 * Componentes de Morro - Actividad 2
 */

// Bloque arrastable con soporte de física
Crafty.c("M2Bloque", {
	num: 0, // ID del bloque
	b2shape: null, // Arreglo de posiciones [x,y] relativas a la entidad. Describe el polígono de colisión
	callbackDestroy: null, // Función de callback al destruir este objeto
	_padre: null, // Referencia al objeto creador
	_e_hueco: null, // Referencia a la entidad hueco correspondiente (si aplica)
	destX1: 0, // posiciones que definien el MBR del hueco correspondiente
	destX2: 0,
	destY1: 0,
	destY2: 0,
	insertable: true, // false si es una trampa
	
	// fase: 0 normal, 1 hover
	cambiarSprite: function(fase) {
		
		var sprNombre = (this.insertable) ? "sprM2_pieza" : "sprM2_trampa";
		if (fase === 1) {
			this.removeComponent(sprNombre + this.num);
			this.addComponent(sprNombre + this.num + "h");
		}
		else {
			this.removeComponent(sprNombre + this.num + "h");
			this.addComponent(sprNombre + this.num);
		}
	},
	
	init: function() {
		this.requires("B2arrastre, Tweener");
		this.arrastrable = true;

		this.bind("MouseDown", function(e) {
			this.cambiarSprite(1);
		});
		
		this.bind("MouseUp", function(e) {
			if (this.insertable) {
				var pos = mouseCoords(e);
				if (pos.x > this.destX1 && pos.x < this.destX2 && pos.y > this.destY1 && pos.y < this.destY2) {
					this.arrastrable = false;
					this.unbind("MouseUp");
					this.unbind("MouseDown");
					this.unbind("MouseMove");
					
					world.DestroyBody(this.body);
					
					var grados = this.rotation;
					while (grados < 0) { grados += 360; }
					while (grados >= 360) { grados -= 360; }
					this.rotation = grados;

					this.addTween({
							rotation: (grados > 180) ? 360 : 0,
							x: this.destX1,
							y: this.destY1
						},
						'easeInOutQuad',
						25,
						function() { this.fijar(); });
				}
				else {
					this.cambiarSprite(0);
				}
			}
			else {
				this.cambiarSprite(0);
			}
		});
		
		return this;
	},
	
	M2Bloque: function(objPadre, e_hueco, num, b2shape, spr) {
		this._padre = objPadre;
		this.num = num;
		if(spr){
			this.requires(spr);
		}else{
			this.requires("sprM2_pieza" + num);
		}
		this._e_hueco = e_hueco;
		
		switch (num) {
			case 0: this.areaMap([102,0],[255,7],[215,87],[73,176],[0,168]); break;
			case 1: this.areaMap([43,0],[169,3],[131,80],[2,75]); break;
			case 2: this.areaMap([47,0],[179,5],[136,82],[0,77]); break;
			case 3: this.areaMap([43,1],[109,1],[294,47],[278,81],[1,77]); break;
			case 4: this.areaMap([63,0],[192,1],[135,127],[0,123]); break;
			case 5: this.areaMap([59,2],[188,2],[211,98],[178,173],[26,179],[1,128]); break;
			case 6: this.areaMap([33,2],[72,0],[40,79],[0,80]); break;
		}
		
		if (b2shape.length > 0) {
			this.b2shape = b2shape;
			this.box2d({
				bodyType:'dynamic',
				density: 0.000001,
				friction: 0.5,
				restitution: 0.2,
				shape: this.b2shape
			});
		}
		this.body.SetAngularDamping(3);
		
		this.B2arrastre(this._padre.b2a);
		
		// obtenemos las coordenadas de destino
		this.destX1 = e_hueco._x;
		this.destY1 = e_hueco._y;
		this.destX2 = this.destX1 + e_hueco._w;
		this.destY2 = this.destY1 + e_hueco._h;
		return this;
	},
	
	M2Trampa: function(objPadre, num, b2shape) {
		this._padre = objPadre;
		this.num = num;
		this.insertable = false;
		this.requires("sprM2_trampa" + num);
		switch (num) {
			case 0: this.areaMap([0,157],[94,0],[229,4],[134,162]); break;
			case 1: this.areaMap([50,0],[178,3],[133,95],[1,90]); break;
			case 2: this.areaMap([1,109],[70,0],[178,38],[135,116]); break;
			case 3: this.areaMap([63,2],[190,1],[135,127],[1,124]); break;
			case 4: this.areaMap([87,0],[240,7],[199,87],[72,147],[0,140]); break;
			case 5: this.areaMap([69,2],[133,2],[295,77],[279,111],[2,106]); break;
		}
		
		if (b2shape.length > 0) {
			this.b2shape = b2shape;
			this.box2d({
				bodyType:'dynamic',
				density: 0.000001,
				friction: 0.5,
				restitution: 0.2,
				shape: this.b2shape
			});
		}
		this.body.SetAngularDamping(3);
		this.B2arrastre(this._padre.b2a);
		
		return this;
	},
	
	// Fijar el bloque en su lugar y no permitir que lo vuelvan a manipular
	fijar: function() {
		this.requires("sprM2_fijo" + this.num);
		this.z = 3; // Detrás de las otras piezas
		this._e_hueco.visible = false;
		
		var par = new Particulas({
			componentes: "spr_polvo, SpriteAnimation",
			x: this._x, y: this._y, z: 5,
			vx: 0,
			deltaVx: 2,
			periodo: 50,
			deltaOriY: this._h,
			deltaOriX: this._w - 40,
			numParticulas: 6,
			magnitud: 10,
			duracion: 20,
			atenuacion: 8,
			f_crear: function(ent) {
				ent.reel("giro", 400, [[0,0],[32,0],[64,0],[96,0]]).animate("giro", -1);	
			}
		});
		par.iniciar();
		this._padre.bloqueFijado(); // Notificar al padre
	}
});



// Hueco donde se inserta el bloque
Crafty.c("M2Hueco", {
	num: 0, // ID del bloque corespondiente
	_padre: null, // Referencia al objeto creador
	
	init: function() {
		this.requires("2D, Canvas");
		return this;
	},
	
	M2Hueco: function(objPadre, num,spr) {
		this._padre = objPadre;
		this.num = num;
		if(spr){
			this.requires(spr);
		}
		this.requires("sprM2_hueco" + num);
		return this;
	}
});