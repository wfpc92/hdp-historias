/* 
 * Permite arrastrar una entidad box2D
 * Suponemos que box2D ya se ha inicializado y que "world" es una var. global con Crafty.world
 * Para emplear este objeto, lo declaramos como var. global así: var b2a = null;
 * Y lo inicializamos con una referencia a un objeto piso.
 */

var B2arrastre = function() {
	this.dragging = false; // True mientras se está arrastrando un elemento
	this.mJoint = null; // Mouse Joint
	this.mouseX = 0; // Posición x del mouse en coordenadas de box2D (dividir entre relación pixel-metro)
	this.mouseY = 0;
	this.e_cuerpo = null; // Referencia a entidad que se encuentra arrastrando
	this.eventoMove = "mousemove";
	this.eventoUp = "mouseup";
		
	// Inicializa el funcionamiento del componente B2arrastre
	// Obligatorio invocarla antes de utilizar el componente
	// e_piso debe ser una entidad existente box2d que represente el piso (o cualquier estática)
	this.init = function(e_piso) {
		this.e_piso = e_piso;
		
		if (cocoon) { this.eventoMove = "touchmove"; this.eventoUp = "touchend"; }
		
		Crafty.addEvent(this, Crafty.stage.elem, this.eventoMove, this.arrastrar);
		Crafty.addEvent(this, Crafty.stage.elem, this.eventoUp, this.soltar);
	};
	
	this.arrastrar = function(e) {
		if (this.dragging) {
			var pos = this.b2dPosMouse(e);
			this.mJoint.SetTarget(new b2Vec2(pos.x, pos.y));
		}
	};
	
	this.soltar = function(e) {
		if (this.dragging) {
			world.DestroyJoint(this.mJoint);
			this.mJoint = null;
			this.dragging = false;

			this.e_cuerpo.arrastrando = false;
			this.e_cuerpo = null;
		}
	};
	
	
	// Amarra un cuerpo al mouse creando una MouseJoint
	// Suponemos que world contiene Crafty.box2d.world y e_piso contiene una entidad cualquiera
	this.crearMouseJoint = function(e_cuerpo, b2MouseX, b2MouseY) {
		// por seguridad, eliminamos cualquier otro joint existente
		if (this.mJoint) {
			world.DestroyJoint(this.mJoint);
			this.mJoint = null;
		}
		
		this.e_cuerpo = e_cuerpo;
		e_cuerpo.arrastrando = true;
		var md = new b2MouseJointDef();
		md.bodyA = this.e_piso.body; // necesario para crear el mouseJoint
		md.bodyB = e_cuerpo.body;
		md.target = new b2Vec2(b2MouseX, b2MouseY);
		md.collideConnected = true;
		md.maxForce = 1000.0 * e_cuerpo.body.GetMass();
		md.dampingRatio = 0;
		this.mJoint = world.CreateJoint(md);
		e_cuerpo.body.SetAwake(true);
	};
	
	// Normalizamos las coordenadas del mouse correspondientes a Box2D
	// Invocar esta función siempre que se requiera obtener las coords. del mouse
	this.b2dPosMouse = function(e) {
		if (cocoon) {
			if (e.type === 'touchend' || e.type === 'touchcancel' ) {
				return { x: e.changedTouches[0].clientX / 32, y: e.changedTouches[0].clientY / 32 };
			}
			else {
				return { x: e.targetTouches[0].clientX / 32, y: e.targetTouches[0].clientY / 32 };
			}
		}
		else {
			return { x: e.clientX / 32, y: e.clientY / 32 };
		}
		
	};
	
	// Destruye este objeto para poder crear otros
	this.destruir = function() {
		Crafty.removeEvent(this, Crafty.stage.elem, this.eventoMove, this.arrastrar);
		Crafty.removeEvent(this, Crafty.stage.elem, this.eventoUp, this.soltar);
	};
};


// Componente que permite arrastrar la entidad con el mouse
// Antes de usar el componente, debe existir una instancia global inicializada del objeto B2arrastre llamada b2a
// La entidad debe ser un objeto Box2d válido
Crafty.c("B2arrastre", {
	arrastrable: true, // La entidad puede deshabilitar el arrastre con esta bandera
	arrastrando: false, // true si se está arrastrando
	b2a: null, // referencia al gestor de arrastre
	
	init: function() {
		this.requires("2D, Canvas, Box2D, Mouse");
		return this;
	},
	
	// Obligatorio invocar. Asocia el gestor de arrastre con este objeto
	B2arrastre: function(objB2A) {
		this.b2a = objB2A;
		
		this.bind("MouseDown", function(e) {
			console.log("MouseDown")
			if (this.arrastrable) {
				var pos = objB2A.b2dPosMouse(e);
				this.b2a.crearMouseJoint(this, pos.x, pos.y);
				this.b2a.dragging = true;
			}
		});
		
		return this;
	}
});