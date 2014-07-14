function spritesBelalcaz3() {
	Crafty.sprite("img/act/belalcaz/3/elementos.png", {
        sprB3_lanzaCae: [0, 0, 130, 173],
        sprB3_espadaCae: [0, 175, 130, 133],
        sprB3_hoja1: [28, 310, 51, 52],
        sprB3_hoja2: [28, 364, 51, 52],
        sprB3_hoja3: [28, 418, 51, 50]
    });
	
    Crafty.sprite(139, 183, "img/act/belalcaz/3/indio-salto.png", {
        sprB3_indioSalto: [0, 0]
    });

    //recursos tomados de otras actividades:
    Crafty.sprite(242, 229, "img/act/belalcaz/1/caballo.png", {
        sprB3_caballo: [0, 0]
    });
    Crafty.sprite("img/act/belalcaz/2/espada.png", {
        sprB3_espada: [0, 0, 30, 87]
    });
}
