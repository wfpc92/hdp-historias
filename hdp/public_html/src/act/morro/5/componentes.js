Crafty.c("Vasija", {
	cuerpoVasija: null,
	mJoint: null,
	cuerda: null,
	polea: null,
	e_nudo: null,
	e_vasijaSola: null, // Vasija que se muestra sola, sin romperse
	suelta: false, // true al soltarse, bandera para evitar bucles
		
	init: function() {
		this.requires('2D, Canvas, sprM5_vasija');
		this.origin(52,15);
		
		this.e_nudo = Crafty.e("2D, Canvas, SpriteAnimation, sprM5_nudo");
		this.e_nudo.reel('soltarse', 800, [
			[0, 0], [1, 0], [2, 0], [3, 0],
			[4, 0], [3, 0], [2, 0], [3, 0],
			[4, 0], [3, 0], [4, 0]
		]);
		
		this.e_nudo.visible = false;
	},
	
	Vasija: function(attr, attrNudo, polea, cuerda, cuerdaEntrePoleas, padre) {
		this.attr(attr);
		this.e_nudo.attr(attrNudo);
		this.polea = polea;
        this.cuerda = cuerda;
        this.cuerdaEntrePoleas = cuerdaEntrePoleas;
        this.actividad = padre;
		
		this.cuerda.attach(this.e_nudo);
		this.e_nudo.y = this.cuerda.h + 233;
		
		return this;
	},
	
	//disminuir tamaño de la cuerda, subir vasija y verificar momento de romper la vasija
	aumentar: function(fuerza) {
		var pot = 5;
		fuerza *= pot;
		if (fuerza > 0) {
			if (this.cuerda.h - fuerza > 0 &&
					this.cuerda.h - fuerza < this.cuerda.maxH &&
					this.y - fuerza > 44) {
				this.cuerda.y -= fuerza;
				this.cuerdaEntrePoleas.resumeAnimation();
				this.y -= fuerza;
			}
			if (this.visible) {
				this.actualizarJoint();
				if (fuerza > 0.8 * pot) { //2 maximo
					if (!this.suelta) this.soltarse();
				}
			}
		}
	},
	//aumentar tamaño de la cuerda y bajar vasija
	disminuir: function() {
		if (this.y + 5 < 645) {
			this.polea.rotation -= 1;
			this.y += 2;
			this.actualizarJoint();
		}
		else {
			this.cuerda.pauseAnimation();
			this.cuerdaEntrePoleas.pauseAnimation();
		}
		if (this.cuerda.y < -25) {
			this.cuerda.y += 2;
		}
	},
	
	//colocar el cuerpo respecto a la vasija
	actualizarJoint: function() {
		this.cx = (this._x + 51) / 32;
		this.cy = (this._y + 20) / 32;
		this.mJoint.SetTarget(new b2Vec2(this.cx, this.cy));
		this.rotation = Crafty.math.radToDeg(this.cuerpoVasija.body.GetAngle());
		
		if (this.y < 90) {
			this.actividad.ganarActividad();
			this.actualizarJoint = function() {
			};
		}
	},
	
	soltarse: function() {
		this.suelta = true;
		this.e_nudo.visible = true;
		this.e_nudo.animate('soltarse', 1);
		
		this.removeComponent("sprM5_vasija").addComponent("sprM5_vasijaSola");
		
		this.bind('EnterFrame', function() {
			this.x = this.cuerpoVasija._x;
			this.y = this.cuerpoVasija._y - 60;
			
			if (this._y > 520) {
				this.unbind('EnterFrame');
				this.romperse();
			}
		});
		
		world.DestroyJoint(this.mJoint);
	},
	
	//accion que se ejecuta cuando se rompe la vasija, mostrar fragmentos de vasija
	romperse: function() {
		Crafty.box2D.world.DestroyBody(this.cuerpoVasija.body);
		this.cuerpoVasija.destroy();

		this.visible = false;
		var yRomp = this._y;
		var xRomp = this._x;
		var attrVasijaRota = [
			{x: xRomp + 2, y: yRomp + 27, z: 2}, {x: xRomp, y: yRomp + 75, z: 2},
			{x: xRomp + 40, y: yRomp + 72, z: 2}, {x: xRomp + 2, y: yRomp + 102, z: 2},
			{x: xRomp + 34, y: yRomp + 121, z: 2}, {x: xRomp + 22, y: yRomp + 135, z: 2}
		];
		var attrShapeVasija = [
			[[0, 51], [34, 0], [63, 0], [92, 50]],
			[[3, 1], [54, 8], [43, 37], [0, 25]],
			[[11, 7], [54, 1], [53, 50], [0, 39]],
			[[0, 0], [92, 23], [19, 57]],
			[[0, 16], [57, 0], [45, 32]],
			[[0, 17], [16, 0], [61, 15], [29, 49]]
		];
		var v = new Array(6);
		var i;
		for (i = 0 ; i < 6 ; i++) {
			console.log("crear entidad")
			v[i] = Crafty.e("2D, Canvas, sprM5_vasijaRota" + (1 + i) + ", Box2D");
			v[i].attr(attrVasijaRota[i]);
			v[i].box2d({
				bodyType: 'dynamic',
				shape: attrShapeVasija[i],
				friction: 0.3
			});
			v[i].body.ApplyImpulse({x: (i % 2 == 0 ? 5 : -5), y: -2}, v[i].body.GetWorldCenter());
		}

		
		Crafty.e("Delay").delay(function() {
			gesActividad.mostrarPerdiste();
		}, 2000);
			
	/*
		};
		
		var polygon = new Crafty.polygon([0, 77], [49, 22], [102, 84], [61, 186], [39, 186]);
		
		
		this.e_vasijaSola.collision(polygon)
				.onHit('piedraCollision', this.romperse));
		
		Crafty.e("Delay").delay(function() {
			gesActividad.mostrarPerdiste();
		}, 2000);
		*/
	},

	//crear un cuerpo box2d, que simula el volumen de la vasija.
	crearVolumen: function() {
		this.cuerpoVasija = Crafty.e("2D, Canvas, Box2D")
				.attr({x: this.x, y: this.y + 65, z: 2})
				.box2d({
					bodyType: 'dynamic',
					shape: [[20, 0], [46, 0], [81, 0], [100, 16],[93, 64], [75, 102], [49, 121],[31, 106], [3, 49], [1, 20]],		
					density: 1,
					restitution: 0
				});
		
		var ljd = new Box2D.Dynamics.Joints.b2MouseJointDef();
		ljd.bodyA = Crafty.box2D.world.GetGroundBody();
		ljd.bodyB = this.cuerpoVasija.body;
		var tx = this._x + 51;
		var ty = this._y + 25;
		ljd.target = new b2Vec2(tx / 32, ty / 32);
		ljd.collideConnected = true;
		ljd.maxForce = 1000.0 * this.cuerpoVasija.body.GetMass();
		ljd.dampingRatio = 0;
		this.mJoint = Crafty.box2D.world.CreateJoint(ljd);
		this.cuerpoVasija.body.SetAwake(true);
	},
	
	// Detiene la interacción
	detener: function() {
		this.unbind('EnterFrame');
		return this;
	}
});


Crafty.c('CuerdaAnimada', {
	init: function() {
		this.requires('2D, Canvas, SpriteAnimation');
		this.reel('cuerdaAnimada', 500, [[0, 0], [1, 0], [2, 0], [1, 0]]);
		this.animate('cuerdaAnimada', -1);
		this.pauseAnimation();
	}
});