
niveles[1] = {
	nombre: 'Sebastian de Belalcazar',
	subnivel: [
		{
			id: 1,
			duracion: 6000,
			//duracion: 7000,
			fondo: 'img/act/belalcaz/1/fondo.png',
			dato: '\b< Sebastián de Belalcazar >\b\nFué el conquistador español que el \b13\nde enero de 1537\b fundó la ciudad de\n\bPopayán\b, en inmediaciones del valle de\nPubenza.\nSu verdadero nombre fué \bSebastián\n Moyano\b y adoptó el nombre del pueblo\n donde nació (Belalcazar, Andalucía).',
			pista: { ladoIzq: true, y: 90 },
			actividad: function() {
				var actividad = new ActBelalcaz1();
				actividad.totAciertos = 4;
				return actividad;
			}
		},
		{
			id: 2,
			duracion: 25000,
			fondo: 'img/act/belalcaz/2/fondo.png',
			dato: '"Popayán" proviene de \b"pop-pioyá-n"\b,\ndonde \b"pop"\b significa gran cacique y\nla \b"n"\b al final representa la designación\nde un lugar. Los conquistadores al\nmando de Belalcazar asumieron este\nnombre del cacique de la región, pues\nsus intérpretes Yucatecos las llamaban\n\b"tierras del cacique Pioyán"\b.',
			pista: { ladoIzq: true, y: 250 },
			actividad: function() {
				var actividad = new ActBelalcaz2();
				actividad.totAciertos = 3;
				return actividad;
			}
		},
		{
			id: 3,
			duracion: 3000000,
			fondo: 'img/act/belalcaz/3/fondo.png',
			dato: 'Mientras conquistaba Popayán, atravesó\nlo que hoy se conoce como Timbío -en\noctubre de 1535- y venció a \b3000\nindígenas\b con un ejército de tan solo\n\b100 hombres\b.',
			pista: { ladoIzq: true, y: 250 },
			actividad: function() {
				var actividad = new ActBelalcaz3();
				return actividad;
			}
		},
		{
			id: 4,
			duracion: 4000,
			fondo: 'img/act/belalcaz/4/fondo.png',
			dato: 'Mientras buscaba el tesoro de\n \bEl Dorado\b, también fundó la ciudades\n de \bQuito\b y \bGuayaquil\b, en Ecuador,\n y \bSantiago de Cali\b y \bNeiva\b, en\n Colombia.',
			pista: { ladoIzq: true, y: 250 },
			actividad: function() {
				var actividad = new ActBelalcaz4();
				return actividad;
			}
		},
		{
			id: 5,
			duracion: 28000,
			fondo: 'img/act/belalcaz/5/fondo.jpg',
			dato: 'En mayo de 1540, \bvolvió a España\b para\nlegitimar sus derechos, y en la corte de\n\bCarlos V\b de Alemania y \bCarlos I\b de\nEspaña, fue declarado \bprimer\n gobernador\b de la Provincia de Popayán.\n Reconocidos sus derechos por el\n emperador, regresó a las américas.',
			pista: { ladoIzq: true, y: 250 },
			actividad: function() {
				var actividad = new ActBelalcaz5();
				return actividad;
			}
		},
		{
			id: 6,
			duracion: 17000,
			fondo: 'img/act/belalcaz/6/fondo.jpg',
			dato: 'Murió de avanzada edad, a causa de una\n \benfermedad\b mientras preparaba su\núltimo viaje a España, en \bCartagena\n de Indias\b en 1551.',
			pista: { ladoIzq: true, y: 250 },
			actividad: function() {
				var actividad = new ActBelalcaz6();
				return actividad;
			}
		}
	]
};
