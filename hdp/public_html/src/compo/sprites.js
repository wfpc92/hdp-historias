function spritesGlobal() {
	Crafty.sprite("img/global/temporizador.png", {
		sprBarraFondo: [0, 0, 628, 26],
		sprBarraTemporizador: [7, 78, 618, 18],
		sprReloj: [629, 0, 56, 64],
		sprPausa: [688, 0, 62, 64]
	});
	
	Crafty.sprite("img/global/fondo-pistas.png", {
		sprAC_fonPistaIzq: [0,0,512,256],
		sprAC_fonPistaDer: [0,256,512,256]
	});
	Crafty.sprite("img/global/pistas.png", {
		sprAC_msgPista: [0,0,204,170]
	});
	
	Crafty.sprite(16, 23, "img/global/myriad.png", {
		spr_letra: [0, 0]
	});
	Crafty.sprite("img/global/font-asap36.png", { "spr_asapNormal": [0,0, 37, 47] });
	Crafty.sprite("img/global/font-asap36bold.png", { "spr_asapBold": [0,0, 37, 47] });

	// Escena de pausa y perdiste
	Crafty.sprite("img/global/pau-botones.png", {
		sprPAU_btSalir: [0,0,60,60],
		sprPAU_btSalir2: [79,0,60,60],
		sprPAU_btReiniciar: [0,61,79,63],
		sprPAU_btReiniciar2: [79,61,79,63],
		sprPAU_btContinuar: [0,125,43,53],
		sprPAU_btContinuar2: [79,125,43,53]
	});
	Crafty.sprite("img/global/pau-hoja.png", {
		sprPAU_hoja: [0,0,8,7]
	});

	// Partículas
	//se usa en la actividad de bloques-morro
	Crafty.sprite("img/particulas/polvo.png", {
		spr_polvo: [0, 0, 32, 28]
	});
	Crafty.sprite("img/particulas/fuegos.png", {
		spr_fuegosArt: [0, 0, 23, 21]
	});
	Crafty.sprite("img/particulas/nube.png", {
		spr_nube: [0, 0, 96, 94]
	});
	Crafty.sprite("img/particulas/nube-verde.png", {
		spr_nubeVerde: [0, 0, 96, 94]
	});
	Crafty.sprite("img/particulas/cubo40.png", {
		spr_partCubo: [0, 0, 40, 40]
	});
	Crafty.sprite(23, 21, "img/particulas/corazon.png", {
		spr_partCorazon: [0, 0]
	});
	
	
	Crafty.sprite("img/global/bt-atras.png", {
		sprGL_btAtras: [0,0,63,64],
		sprGL_btAtras2: [0,65,63,63]
	});
	
	// Sprites de gestos indicadores
	Crafty.sprite("img/global/gestos.png", {
		sprGL_gestoTap: [0,0,56,36],
		sprGL_gestoDrag: [0,64,52,49],
		sprGL_gestoRot: [0,128,64,64]
	});

	// icono de acierto o error, reutilizado en varias partes
	Crafty.sprite("img/global/advertencias.png", {
		sprGL_advBien: [0, 0, 75, 76],
		sprGL_advMal: [0, 76, 75, 76],
		sprGL_advExclama: [0, 152, 75, 76]
	});

	spritesPuntaje();
}