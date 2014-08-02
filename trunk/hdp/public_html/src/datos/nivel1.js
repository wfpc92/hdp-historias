
niveles[1] = {
	nombre: 'Sebastián de Belalcázar',
	subnivel: [
		{
			id: 1,
			duracion: 6000,
			fondo: 'img/act/belalcaz/1/fondo.png',
			dato: 'Fue el conquistador español que el\n \b13 de enero de 1537\b fundó en el\n valle de Pubenza, la ciudad de\n \bPopayán\b.\n\n Su verdadero nombre era \bSebastián\n Moyano\b y adoptó el nombre del\n pueblo donde nació (Belalcazar,\n Andalucía).',
			pista: { ladoIzq: true, y: 90 },
			actividad: function() {
				var actividad = new ActBelalcaz1();
				actividad.totAciertos = 4;
				return actividad;
			}
		},
		{
			id: 2,
			duracion: 15000,
			fondo: 'img/act/belalcaz/2/fondo.png',
			dato: '"Popayán" proviene de \b"pop-pioyá-n"\b,\n donde "pop" significa \bgran cacique\b y\n la "n" al final representa \bun lugar\b.\n\n Los conquistadores tomaron este\n nombre del cacique de la región,\n pues sus intérpretes Yucatecos las\n llamaban "tierras del cacique Pioyán".',
			pista: { ladoIzq: true, y: 250 },
			actividad: function() {
				var actividad = new ActBelalcaz2();
				actividad.totAciertos = 3;
				return actividad;
			}
		},
		{
			id: 3,
			duracion: 16000,
			fondo: 'img/act/belalcaz/3/fondo.png',
			dato: 'Se dice que mientras conquistaba\n Popayán, atravesó lo que hoy se\n conoce como Timbío (en octubre\n de 1535) y venció a \b3000 indígenas\b\n con un ejército de tan solo\n\b100 hombres\b.',
			pista: { ladoIzq: true, y: 250 },
			actividad: function() {
				var actividad = new ActBelalcaz3();
				return actividad;
			}
		},
		{
			id: 4,
			duracion: 8000,
			fondo: 'img/act/belalcaz/4/fondo.png',
			dato: 'Mientras buscaba el tesoro de\n \bEl Dorado\b, también fundó las\n ciudades de \bQuito\b y \bGuayaquil\b en\n Ecuador, así como \bSantiago de\n Cali\b y \bNeiva\b en Colombia.',
			pista: { ladoIzq: true, y: 250 },
			actividad: function() {
				var actividad = new ActBelalcaz4();
				return actividad;
			}
		},
		{
			id: 5,
			duracion: 25000,
			fondo: 'img/act/belalcaz/5/fondo.jpg',
			dato: 'En mayo de 1540, \bvolvió a España\b\n para legitimar sus derechos, y en\n la corte del emperador, fue\n declarado \bprimer gobernador\b de\n la Provincia de Popayán.\n\n Reconocidos sus derechos por el\n emperador, regresó a Colombia.',
			pista: { ladoIzq: true, y: 250 },
			actividad: function() {
				var actividad = new ActBelalcaz5();
				return actividad;
			}
		},
		{
			id: 6,
			duracion: 23000,
			fondo: 'img/act/belalcaz/6/fondo.jpg',
			dato: 'Murió de avanzada edad, a causa de\n una \benfermedad\b mientras preparaba\n su último viaje a España, en\n \bCartagena de Indias\b en 1551.',
			pista: { ladoIzq: false, y: 30 },
			actividad: function() {
				var actividad = new ActBelalcaz6();
				return actividad;
			}
		}
	]
};

