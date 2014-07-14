function Cortina() {
	this.e_cortina = null; // Referencia a la entidad de la cortina en crafty
	
	this.init();
}

Cortina.prototype.init = function() {
	this.e_cortina = Crafty.e("2D, Canvas, Color, Tweener")
							.color("#FFFFFF")
							.attr({ x:0, y:0, w:1280, h:800, z:9000, alpha:0.0, visible:false});
};

// Mostrar la cortina de una vez
Cortina.prototype.visible = function() {
	this.e_cortina.attr({ alpha:1.0, visible:true });
};

// Aparece la cortina tapando todo
// Opcionalmente, se puede pasar una escena como cadena o una función a ejecutar
Cortina.prototype.aparecer = function(duracion, escena) {
	this.e_cortina
			.attr({ alpha:0.0, visible:true })
			.addTween({ alpha:1.0 }, "easeInCubic", duracion, function() {
				if(typeof(escena) === 'string') {
					Crafty.enterScene(escena);
				}
				else if(typeof(escena) === 'function') {
					escena();
				}
			});
};

// Desaparece la cortina
Cortina.prototype.desaparecer = function(duracion) {
	this.e_cortina
			.attr({ alpha:1.0, visible:true })
			.addTween({ alpha:0.0 }, "easeOutCubic", duracion, function() { this.visible = false; });
};