/* 
 * Debug: permite arrastrar la entidad e imprime la posición en la que se encuentra
 * También dibuja unas marcas en las esquinas del rectángulo contenedor
 */
Crafty.c("Ubicador", {
	init: function() {
		this.requires("Draggable");
		this.bind("MouseUp", function() {
			console.log("x: " + this.x + ", y: " + this.y);
		});
		
		this.bind("Draw", function(e) {
			var ctx = e.ctx;
			ctx.strokeStyle = "#FFFF00";
			ctx.fillRect(this.x,this.y,1,1);
		});
	}
});

