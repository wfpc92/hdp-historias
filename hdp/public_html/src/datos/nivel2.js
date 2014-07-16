niveles[2] = {
	nombre: 'Parque Caldas',
	subnivel: [
		{
			id: 1,
			duracion: 50000,
			fondo: '',
			dato: "Apareció con la fundación de la ciudad,\nen 1537. Como era costumbre en las\nciudades coloniales españolas, los\nconquistadores elegían un espacio\namplio y trazaban las calles de forma\nperpendicular para edificar los edificios\nque representaban los poderes\nen España.",
			pista: { ladoIzq: true, y: 570 },
			actividad: function() {
				var actividad = new ActParque1();
				actividad.totAciertos = 4;
				return actividad;
			}
		},
		{
			id: 2,
			duracion: 12000,
			fondo: 'img/act/parque/2/fondo.jpg',
			dato: 'En el centro del parque hay un\nmonumento a Francisco José de Caldas,\nreconocido botánico, astrónomo y\nprócer colombiano (también llamado\n"sabio Caldas"); uno de los grandes\nhijos ilustres de Popayán. Éste\nmonumento se construyó para\nconmemorar los 100 años de la\nindependencia de Colombia.',
			pista: { ladoIzq: false, y: 550 },
			actividad: function() {
				var actividad = new ActParque2();
				actividad.totAciertos = 8;
				return actividad;
			}
		},
		{
			id: 3,
			duracion: 60000,
			fondo: 'img/act/parque/3/fondo.jpg',
			dato: "Las placas que acompañan el\nmonumento al sabio Caldas exponen\nsu firma, una muestra de la planta\ntrepadora Bomarea caldasii - llamada\nasí en su honor - y la figura de un\noctante y un hipsómetro, un invento\nsuyo.",
			pista: { ladoIzq: true, y: 90 },
			actividad: function() {
				var actividad = new ActParque3();
				return actividad;
			}
		},
		{
			id: 4,
			duracion: 30000000000,
			fondo: 'img/act/parque/4/fondo.jpg',
			dato: 'A 10 metros del parque se encuentra el\nPanteón de los Próceres, un monumento\nque contiene los sepulcros de 15 hijos\nilustres de Popayán: Camilo Torres,\nTomás Cipriano de Mosquera, Francisco\nJosé de Caldas, entre otros.',
			pista: { ladoIzq: true, y: 90 },
			actividad: function() {
				var actividad = new ActParque4();
				actividad.totAciertos = 15;
				return actividad;
			}
		},
		{
			id: 5,
			duracion: 15000,
			fondo: 'img/act/parque/5/fondo.jpg',
			dato: 'Frente al parque se levanta la Torre del\nReloj, uno de los símbolos más\nrepresentativos de Popayán. Terminó de\nconstruirse en 1682 y en 1737 se le\nadjuntó un reloj de fabricación inglesa,\nque funcionaría continuamente hasta\n1814, cuando se le extrajeron sus pesas\nde plomo para hacer municiones durante\nlas guerras de la Independencia.',
			pista: { ladoIzq: true, y: 90 },
			actividad: function() {
				var actividad = new ActParque5();
				return actividad;
			}
		},
		{
			id: 6,
			duracion: 15000,
			fondo: 'img/act/parque/6/fondo.jpg',
			dato: 'En el parque se encuentra la Catedral\nBasílica Nuestra Señora de la Asunción,\nuna iglesia católica ofrendada a la\nVirgen María terminada de construir en\njunio de 1906 sobre los cimientos de\nantiguas iglesias. Ha sido afectada por\nvarios terremotos, que le han requerido\nvarias reconstrucciones. En ella se\ncentran varios actos religiosos de la\nSemana Santa.',
			pista: { ladoIzq: true, y: 90 },
			actividad: function() {
				var actividad = new ActParque6();
				actividad.totAciertos = 10;
				return actividad;
			}
		}
	]
};

