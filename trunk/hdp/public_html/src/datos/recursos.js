// Contiene arreglos de recursos a cargar y descargar
var Recursos = {
	// Recursos que nunca se descargan de memoria (disponibles globalmente)
	global: {
		cargado: false,
		spritesListas: false,
		rutas: [
			"img/carga/pvd-titulo.png", "img/carga/pvd-logos.png",
			"img/global/bt-atras.png",
			"img/global/temporizador.png",
			"img/global/fondo-pistas.png", "img/global/pistas.png",
			"img/puntaje/botones.png", "img/puntaje/blo-rojo.png", "img/puntaje/muy-bien.png", "img/puntaje/txt-puntuacion.png", "img/puntaje/cortinas.png", "img/puntaje/digitos.png", "img/puntaje/baudilio.png",
			
			"img/particulas/corazon.png","img/particulas/fuegos.png","img/particulas/nube.png","img/particulas/polvo.png","img/particulas/star.png","img/particulas/triangulo.png",
			
			"img/puntaje/fon-texto.png", "img/puntaje/comillas.png", "img/puntaje/spr-datos.png",
			
			"img/global/myriad.png", "img/global/font-asap36.png", "img/global/font-asap36bold.png",
			"img/global/pau-botones.png", "img/global/pau-arbol.png", "img/global/pau-hoja.png", "img/global/pau-leyenda.png",
			"img/global/perdiste.png",
			"img/global/mano.png", "img/global/gestos.png", "img/global/advertencias.png",
			"img/test/linea.png", "img/test/numeros.png",
			"img/carga/pajaro.png", "img/carga/cargando.png", "img/carga/logo.png"

		],
		initSprites: spritesGlobal
	},
	// Menú principal y sus sub-menús
	menuPrincipal: {
		cargado: false,
		spritesListas: false,
		rutas: [
			"img/menu-pri/fondo.png", "img/menu-pri/piso-frente.png", "img/menu-pri/piso-fondo.png", "img/menu-pri/nube-izq.png", "img/menu-pri/nube-der.png", "img/menu-pri/caballo-somb.png", "img/menu-pri/logo.png", "img/menu-pri/logo-config.png", "img/menu-pri/caballo.png", "img/menu-pri/bt-jugar.png", "img/menu-pri/bt-opciones.png", "img/menu-pri/bt-configurac.png",
			"img/menu-pri/fon-dialogo.png", "img/menu-pri/creditos.png"
		],
		initSprites: spritesMenuPri
	},
	// Menú de cuadros
	menuCuadros: {
		cargado: false,
		spritesListas: false,
		rutas: [
			"img/menu-cuadros/fondo.jpg", "img/menu-cuadros/logo.png", "img/menu-cuadros/grilla1-hor.png", "img/menu-cuadros/grilla1-ver.png", "img/menu-cuadros/grilla2-hor.png", "img/menu-cuadros/grilla2-ver.png", "img/puntaje/btn_regresar.png",
			"img/menu-cuadros/numeros-act.png", "img/menu-cuadros/baudilio-peq.png",
			"img/menu-cuadros/candado.png", "img/menu-cuadros/monedas.png", "img/menu-cuadros/numeros.png", "img/menu-cuadros/num-total.png", "img/menu-cuadros/bt-atras.png",
			"img/menu-cuadros/sombra-sup.png", "img/menu-cuadros/sombra-inf.png", "img/menu-cuadros/sombra-izq.png", "img/menu-cuadros/sombra-der.png",
			"img/menu-cuadros/c1gra.jpg", "img/menu-cuadros/c2gra.jpg", "img/menu-cuadros/c3gra.jpg", "img/menu-cuadros/c4gra.jpg", "img/menu-cuadros/c5gra.jpg",
			"img/menu-cuadros/c1.png", "img/menu-cuadros/c2.png", "img/menu-cuadros/c3.png", "img/menu-cuadros/c4.png", "img/menu-cuadros/c5.png",
			"img/menu-cuadros/c1desv.jpg", "img/menu-cuadros/c2desv.jpg", "img/menu-cuadros/c3desv.jpg", "img/menu-cuadros/c4desv.jpg", "img/menu-cuadros/c5desv.jpg"],
		initSprites: spritesMenuCuadros
	},
	// Escena de test
	test: {
		cargado: false,
		spritesListas: false,
		rutas: [
			"img/test/linea.png",
			"img/test/llave.png",
			"img/menu-pri/bt-dialogo.png",
			"img/test/prueba_de_nuevo.png"
		],
		initSprites: spritesTest
	},
	// Subniveles morro
	morro: [
		{
			act: 1,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/morro/1/fondo.jpg",
				"img/act/morro/1/morro-verde.png",
				"img/act/morro/1/obrero.png",
				"img/act/morro/1/spr-capas-1.png",
				"img/act/morro/1/spr-capas-2.png"
			],
			musica: ["morro1", "audio/act/morro/morro1.ogg"],
			initSprites: spritesMorro1
		},
		{
			act: 2,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/morro/2/fondo.jpg",
				"img/act/morro/2/hierba.png",
				"img/act/morro/2/piezas.png",
				"img/act/morro/2/piezas-hov.png",
				"img/act/morro/2/trampas.png",
				"img/act/morro/2/trampas-hov.png",
				"img/act/morro/2/huecos.png",
				"img/act/morro/2/fijos.png"],
			musica: ["morro2", "audio/act/morro/morro2.ogg"],
			initSprites: spritesMorro2
		},
		{
			act: 3,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/morro/3/fondo.jpg",
				"img/act/morro/3/piedras.png",
				"img/act/morro/3/ventilador.png",
				"img/act/morro/3/nube.png",
				"img/act/morro/3/lluvia.png",
				"img/act/morro/3/capa-suelo.png"
			],
			musica: ["morro3", "audio/act/morro/morro3.ogg"],
			initSprites: spritesMorro3
		},
		{
			act: 4,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/morro/4/fondo.jpg",
				"img/act/morro/4/montana.png",
				"img/act/morro/4/calaca.png",
				"img/act/morro/4/morrito.png",
				"img/act/morro/4/numeros.png"
			],
			musica: ["morro4", "audio/act/morro/morro4.ogg"],
			initSprites: spritesMorro4
		},
		{
			act: 5,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/morro/5/pasto.png",
				"img/act/morro/5/ganchos.png",
				"img/act/morro/5/fondo.jpg",
				"img/act/morro/5/manivela.png",
				"img/act/morro/5/polea_fuerza.png",
				"img/act/morro/5/palanca.png",
				"img/act/morro/5/vasija.png",
				"img/act/morro/5/vasija_sola.png",
				"img/act/morro/5/cuerda_vasija.png",
				"img/act/morro/5/cuerda_prueba.png",
				"img/act/morro/5/vasija_rota.png",
				"img/act/morro/5/secuencia_cuerda.png",
				"img/act/morro/5/piedras.png"
			],
			musica: ["morro5", "audio/act/morro/morro5.ogg"],
			initSprites: spritesMorro5
		},
		{
			act: 6,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/morro/6/fondo.jpg",
				"img/act/morro/6/morro-base.png",
				"img/act/morro/6/guia.png",
				"img/act/morro/6/estatua.png",
				"img/act/morro/6/sombra.png",
				"img/act/morro/6/spr-piezas.png"
			],
			musica: ["morro6", "audio/act/morro/morro1.ogg"],
			initSprites: spritesMorro6
		}
	],
	// Subniveles belalcazar
	belalcazar: [
		{
			act: 1,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/belalcaz/1/fondo.png",
				"img/act/belalcaz/1/primer-plano.png",
				"img/act/belalcaz/1/asta.png",
				"img/act/belalcaz/1/estandarte.png",
				"img/act/belalcaz/1/numeros.png",
				"img/act/belalcaz/1/anio.png",
				"img/act/belalcaz/1/caballo.png"//este recurso es usado en otras actividades
			],
			musica: ["belal1", "audio/act/belalcaz/belalcaz1.ogg"],
			initSprites: spritesBelalcaz1
		},
		{
			act: 2,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/belalcaz/2/fondo.png",
				"img/act/belalcaz/2/cascada.png",
				"img/act/belalcaz/2/fondo_agua.png",
				"img/act/belalcaz/2/espada.png",
				"img/act/belalcaz/2/troncos.png",
				"img/act/belalcaz/2/titulos.png",
				"img/act/belalcaz/2/troncos_lineas.png",
				"img/act/belalcaz/2/primer_plano.png",
				"img/act/belalcaz/2/agua_2.png",
				"img/act/belalcaz/2/agua_1.png",
				"img/act/belalcaz/2/cocodrilo.png",
				//recurso de la anterior actividad
				"img/act/belalcaz/1/caballo.png"
			],
			musica: ["belal2", "audio/act/belalcaz/belalcaz2.ogg"],
			initSprites: spritesBelalcaz2
		},
		{
			act: 3,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/belalcaz/3/elementos.png",
				"img/act/belalcaz/3/cascada.png",
				"img/act/belalcaz/3/agua.png",
				"img/act/belalcaz/3/plano1.png",
				"img/act/belalcaz/3/plano2.png",
				"img/act/belalcaz/3/plano3.png",
				"img/act/belalcaz/3/oso_anteojos.png",
				"img/act/belalcaz/3/indio-salto.png",
				//recurso de la anterior actividad   
				"img/act/belalcaz/1/caballo.png",
				"img/act/belalcaz/2/espada.png"
			],
			musica: ["belal3", "audio/act/belalcaz/belalcaz3.ogg"],
			initSprites: spritesBelalcaz3
		},
		{
			act: 4,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/belalcaz/4/fondo.jpg",
				"img/act/belalcaz/4/mapa.jpg",
				"img/act/belalcaz/4/primer_plano.png",
				"img/act/belalcaz/4/flechas_1.png",
				"img/act/belalcaz/4/flechas_2.png",
				"img/act/belalcaz/4/ciudades.png",
				"img/act/belalcaz/4/botones.png",
				"img/act/belalcaz/4/fechas.png",
				//recurso de la anterior actividad   
				"img/act/belalcaz/1/caballo.png",
				"img/act/belalcaz/2/cocodrilo.png"
			],
			musica: ["belal4", "audio/act/belalcaz/belalcaz4.ogg"],
			initSprites: spritesBelalcaz4
		},
		{
			act: 5,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/belalcaz/5/fondo.jpg",
				"img/act/belalcaz/5/aves.png",
				"img/act/belalcaz/5/barco.png",
				"img/act/belalcaz/5/bestia.png",
				"img/act/belalcaz/5/elementos.png",
				"img/act/belalcaz/5/linea_punteada.png",
				"img/act/belalcaz/5/mar.png",
				"img/act/belalcaz/5/mar_brillo_1.png",
				"img/act/belalcaz/5/mar_brillo_2.png",
				"img/act/belalcaz/5/montana_1.png",
				"img/act/belalcaz/5/montana_2.png",
				"img/act/belalcaz/5/montana_3.png",
				"img/act/belalcaz/5/montana_mar.png",
				"img/act/belalcaz/5/ojo.png",
				"img/act/belalcaz/5/sombra.png",
				"img/act/belalcaz/5/tiburon.png",
				"img/act/parque/3/onomatopeyas.png"
			],
			musica: ["belal5", "audio/act/belalcaz/belalcaz5.ogg"],
			initSprites: spritesBelalcaz5
		},
		{
			act: 6,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/belalcaz/6/fondo.jpg",
				"img/act/belalcaz/6/elementos.png",
				"img/act/belalcaz/6/plano1_arbusto.png"
			],
			musica: ["belal6", "audio/act/belalcaz/belalcaz1.ogg"],
			initSprites: spritesBelalcaz6
		}
	],
	parque: [
		{
			act: 1,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/parque/1/carro.png",
				"img/act/parque/1/manzana1.png",
				"img/act/parque/1/manzana2.png",
				"img/act/parque/1/manzana3.png",
				"img/act/parque/1/manzana4.png",
				"img/act/parque/1/manzana5.png",
				"img/act/parque/1/manzana6.png",
				"img/act/parque/1/manzana7.png",
				"img/act/parque/1/manzana8.png",
				"img/act/parque/1/manzana9.png",
				"img/act/parque/1/nubes.png",
				"img/act/parque/1/botones.png",
				"img/act/parque/1/numerosayuda.png"
			],
			musica: ["parque1", "audio/act/parque/parque1.ogg"],
			initSprites: spritesParque1
		},
		{
			act: 2,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/parque/2/fondo.jpg",
				"img/act/parque/2/fondo_color.jpg",
				"img/act/parque/2/partes.png",
				"img/act/parque/2/sombras.png",
				"img/act/parque/2/caldas_completo.png"
			],
			musica: ["parque2", "audio/act/parque/parque2.ogg"],
			initSprites: spritesParque2
		},
		{
			act: 3,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/parque/3/enredadera.png",
				"img/act/parque/3/flor.png",
				"img/act/parque/3/fondo.jpg",
				"img/act/parque/3/gota.png",
				"img/act/parque/3/hormiga_camina.png",
				"img/act/parque/3/hormiga_muerde.png",
				"img/act/parque/3/hormiga_muerta.png",
				"img/act/parque/3/onomatopeyas.png",
				"img/act/parque/3/primer_plano.png",
				"img/act/parque/3/rama.png",
				"img/act/parque/3/regadera.png"
			],
			musica: ["parque3", "audio/act/parque/parque3.ogg"],
			initSprites: spritesParque3
		},
		{
			act: 4,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/parque/4/fondo.jpg",
				"img/act/parque/4/barras.png",
				"img/act/parque/4/cofre_grande.png",
				"img/act/parque/4/cofre_pequeno.png",
				"img/act/parque/4/lampara.png",
				"img/act/parque/4/piso.png"
			],
			musica: ["parque4", "audio/act/parque/parque4.ogg"],
			initSprites: spritesParque4
		},
		{
			act: 5,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/parque/5/fondo.jpg",
				"img/act/parque/5/carruaje.png",
				"img/act/parque/5/cubo.jpg",
				"img/act/parque/5/cuerda.png",
				"img/act/parque/5/engranajes.png",
				"img/act/parque/5/fondo_nubes.jpg",
				"img/act/parque/5/hombre-fuerza.png",
				"img/act/parque/5/hombre-sube.png",
				"img/act/parque/5/llanta.png",
				"img/act/parque/5/nubes.png",
				"img/act/parque/5/torre.png"
			],
			musica: ["parque5", "audio/act/parque/parque5.ogg"],
			initSprites: spritesParque5
		},
		{
			act: 6,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/parque/6/fondo.jpg",
				"img/act/parque/6/casas.png",
				"img/act/parque/6/catedral.png",
				"img/act/parque/6/catedral_cupula.png",
				"img/act/parque/6/catedral_partes.png",
				"img/act/parque/6/nubes.png",
				"img/act/parque/6/piso.png"
			],
			musica: ["parque6", "audio/act/parque/parque3.ogg"],
			initSprites: spritesParque6
		}
	],
	puente: [
		{
			act: 1,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/puente/1/fondo.jpg",
				"img/act/puente/1/partes_puente.png",
				"img/act/puente/1/personajes.png",
				"img/act/puente/1/primer_plano.png"
			],
			musica: ["puente1", "audio/act/puente/puente1.ogg"],
			initSprites: spritesPuente1
		},
		{
			act: 2,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/puente/2/fondo.jpg",
				"img/act/puente/2/hoja.png",
				"img/act/puente/2/indicador.png",
				"img/act/puente/2/numeros.png",
				"img/act/puente/1/personajes.png"
			],
			musica: ["puente2", "audio/act/puente/puente2.ogg"],
			initSprites: spritesPuente2
		},
		{
			act: 3,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/puente/3/fondo.png",
				"img/act/puente/3/ladrillo.png",
				"img/act/puente/3/ladrillo_sombra.png",
				"img/act/puente/3/lanzar.png",
				"img/act/puente/3/mesa.png",
				"img/act/puente/3/nube.png",
				"img/act/puente/3/primer_plano.png",
				"img/act/puente/3/puente_partes.png",
				"img/act/puente/3/torre_dividida.png"
			],
			musica: ["puente3", "audio/act/puente/puente3.ogg"],
			initSprites: spritesPuente3
		},
		{
			act: 4,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/puente/4/barro.png",
				"img/act/puente/4/barro_cal.png",
				"img/act/puente/4/cal.png",
				"img/act/puente/4/fondo.jpg",
				"img/act/puente/4/fondo_azul.png",
				"img/act/puente/4/iconos.png",
				"img/act/puente/4/mezcla_final.png",
				"img/act/puente/4/particula.png",
				"img/act/puente/4/sangre.png",
				"img/act/puente/4/sangre_barrro.png",
				"img/act/puente/4/sangre_cal.png",
				"img/act/puente/4/vasijas.png"
			],
			musica: ["puente4", "audio/act/puente/puente4.ogg"],
			initSprites: spritesPuente4
		},
		{
			act: 5,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/puente/5/fondo.png",
				"img/act/puente/5/nube.png",
				"img/act/puente/5/personajes.png",
				"img/act/puente/5/primer_plano.png",
				"img/act/puente/5/puente.png",
				"img/act/puente/5/segundo_plano.png"
			],
			musica: ["puente5", "audio/act/puente/puente5.ogg"],
			initSprites: spritesPuente5
		},
		{
			act: 6,
			cargado: false,
			spritesListas: false,
			rutas: [
				"img/act/puente/6/fondo.jpg",
				"img/act/puente/6/barra.png",
				"img/act/puente/6/brazos.png",
				"img/act/puente/6/indicador.png",
				"img/act/puente/6/nubes_1.png",
				"img/act/puente/6/nubes_2.png",
				"img/act/puente/6/personaje.png",
				"img/act/puente/6/pimer_plano.png",
				"img/act/puente/6/rotar.png"
			],
			musica: ["puente6", "audio/act/puente/puente2.ogg"],
			initSprites: spritesPuente6
		}
	],
	valencia: [
		{
			act: 1,
			cargado: false,
			spritesListas: false,
			rutas: [
			],
			musica: ["valencia1", "audio/act/valencia/valencia1.ogg"],
			initSprites: spritesValencia1
		},
		{
			act: 2,
			cargado: false,
			spritesListas: false,
			rutas: [
			],
			musica: ["valencia2", "audio/act/valencia/valencia2.ogg"],
			initSprites: spritesValencia2
		},
		{
			act: 3,
			cargado: false,
			spritesListas: false,
			rutas: [
			],
			musica: ["valencia3", "audio/act/valencia/valencia3.ogg"],
			initSprites: spritesValencia3
		},
		{
			act: 4,
			cargado: false,
			spritesListas: false,
			rutas: [
			],
			musica: ["valencia4", "audio/act/valencia/valencia4.ogg"],
			initSprites: spritesValencia4
		},
		{
			act: 5,
			cargado: false,
			spritesListas: false,
			rutas: [
			],
			musica: ["valencia5", "audio/act/valencia/valencia5.ogg"],
			initSprites: spritesValencia5
		},
		{
			act: 6,
			cargado: false,
			spritesListas: false,
			rutas: [
			],
			musica: ["valencia6", "audio/act/valencia/valencia6.ogg"],
			initSprites: spritesValencia6
		},
	]
};
