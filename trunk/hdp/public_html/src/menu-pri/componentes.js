// Agrupa algunas funcionalidades comunes a los botones laterales de esta escena
Crafty.c("MI_btLateral", {
	init: function() {
		this.requires("Boton, Tweener, Delay");
	},
	
	// Deslizarse desde su lado de la pantalla a su posición visible
	animMostrar: function(retardo) {
		this.ocultarLateral();
		this.visible = true;
		this.delay(function() {
			this.addTween({ x:this.xIni }, "easeOutBack", 60, function() { this.habilitar(); }); 
		}, retardo);
	},
	
	// Deslizarse desde su lado de la pantalla a su posición visible
	animEsconder: function(retardo) {
		this.bloquear()
			.delay(function() {
				this.addTween({ x:1280 }, "easeInCubic", 40, function() { this.visible = false; }); 
			}, retardo);
	},
	
	// Inmediatamente mueve al lado de la pantalla y vuelve invisible
	ocultarLateral: function() {
		this.x = 1280;
		this.visible = false;
		return this;
	}
});

Crafty.c("MI_btJugar", {
	init: function() {
		this.requires("Boton, Tweener")
			.Boton("sprMI_btJugar", "sprMI_btJugar2");
	},
	
	// desliza hacia abajo y desvanece
	animEsconder: function() {
		this.bloquear()
			.addTween({ y:488, alpha:0.0 }, "easeInCubic", 60, function() {
				this.visible = false;
			});
		return this;
	},
	
	// desliza hacia arriba y aparece
	animMostrar: function() {
		this.attr({ y: 488, alpha: 0, visible: true })
			.addTween({ y: 388, alpha: 1.0 }, "easeOutCubic", 80, function() { this.habilitar(); });
		return this;
	}
});

Crafty.c("MI_btConfig", {
	init: function() {
		this.requires("MI_btLateral")
			.Boton("sprMI_btConfig", "sprMI_btConfig2");
	}
});

Crafty.c("MI_btAudio", {
	activo: false,
	
	init: function() {
		this.spr_audio = "sprMI_btAudio";
		this.spr_mute = "sprMI_btAudio2";
		this.requires("MI_btLateral")
			.Boton(this.spr_audio, this.spr_mute);
		this.unbind("MouseDown");
		this.unbind("MouseUp");
		this.bind("MouseDown", function() {
			if (this.activo) {
				this.activo = false;
			} else {
				this.activo = true;
			};
		});
		var mute = gesSonido.isMuted();
		if(mute){
			this.cambiarSprite(mute);
		}
	},
	cambiarSprite : function(mute){
		if(mute){
			//poner sprite de mute
			this.removeComponent(this.spr_audio);
			this.addComponent(this.spr_mute);
		}
		else {
			//poner sprite de audio
			this.removeComponent(this.spr_mute);
			this.addComponent(this.spr_audio);
		}
		return this;
	}
});

Crafty.c("MI_btLike", {
	init: function() {
		this.requires("MI_btLateral")
			.Boton("sprMI_btLike", "sprMI_btLike2");
	}
});


// Componentes de la pantalla de configuración

// Botón del menú de configuración
Crafty.c("MI_btMenuConfig", {
	init: function() {
		this.requires("Boton, Tweener, Delay")
			.attr({ visible: false, alpha: 0.0 });
		this.bloquear();
	},
	
	// deslizar y aparecer desde abajo
	animMostrar: function (deltaY, atraso) {
		this.attr({y: (this.yIni + deltaY), visible: true});
		this.delay(function() {
			this.addTween({y:this.yIni, alpha:1.0}, "easeOutCubic", 50, function() {
				this.habilitar();
			});
		}, atraso);
	},
	
	// desaparece y desliza hacia abajo
	animEsconder: function (deltaY, atraso) {
		this.bloquear();
		this.delay(function() {
			this.addTween({y: (this.yIni + deltaY), alpha: 0.0}, "easeInQuad", 30, function() {
				this.visible = false;
			});
		}, atraso);
	}
});


Crafty.c("MI_btReset", {
	init: function() {
		this.requires("MI_btMenuConfig");
		this.Boton("sprMI_btReset", "sprMI_btReset2");
	}
});

Crafty.c("MI_btFaq", {
	init: function() {
		this.requires("MI_btMenuConfig");
		this.Boton("sprMI_btFaq", "sprMI_btFaq2");
	}
});

Crafty.c("MI_btTutorial", {
	init: function() {
		this.requires("MI_btMenuConfig");
		this.Boton("sprMI_btTutorial", "sprMI_btTutorial2");
	}
});

Crafty.c("MI_btCreditos", {
	init: function() {
		this.requires("MI_btMenuConfig");
		this.Boton("sprMI_btCreditos", "sprMI_btCreditos2");
	}
});

Crafty.c("MI_btAtras", {
	init: function() {
		this.requires("MI_btLateral")
			.Boton("sprGL_btAtras", "sprGL_btAtras2");
	}
});