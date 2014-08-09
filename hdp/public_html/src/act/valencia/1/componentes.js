Crafty.c("V1_Area", {
	init: function() {
		this.requires("2D, Canvas, Mouse, Color")
	},
	V1_Area: function(acuerdo) {
		this.acuerdo = acuerdo;
		if (this.acuerdo) {
			this.color("green")
		}
		else {
			this.color("red")
		}
		this.bind("MouseDown", function() {
			this.animar();
		})
		return this;
	},
	animar: function() {
		if (this.acuerdo) {
			this.animAcuerdo();
		}
		else {
			this.animDesacuerdo();
		}
		return this;
	},
	animAcuerdo: function() {
		alert("animacion acuerdo")
		return this;
	},
	animDesacuerdo: function() {
		alert("animacion desacuerdo")
		return this;
	}
});

Crafty.c("V1_Contador", {
	spr: "sprV1_num",
	cont: 0,
	contAnt : 0,
	init: function() {
		this.requires("2D, Canvas, Mouse, sprV1_num" + this.cont)
		
		this.bind("MouseDown", function() {
			this.aumentar()
		})
	},
	aumentar: function() {
		return this;
	},
	disminuir : function(){
		this.contAnt = this.cont;
		this.cont--;
		if(this.cont < 0){
			this.cont = 0;
		}
		return this;
	},
	actualizar:function(){
		this.removeComponent("sprV1_num" + this.cont);
		this.addComponent("sprV1_num" + (++this.cont))
		return this;
	}

})