var niveles = [];

niveles[0] = {
	nombre: 'El morro',
	subnivel: [
		{
			id: 0,
			duracion: 8000,
			//esto se podria simplificar a una variable que se llame PATH
			fondo: 'img/act/morro/1/fondo.png',
			dato: "Es una \bmontaña artificial\b\n prehispánica -al parecer data del\n año \b1600 - 600 a.C.\b- de carácter\n \bceremonial funerario\b, ubicada en el\n costado noreste de Popayán,\n considerada el \bsitio arqueológico\b\n más importante de la ciudad.",
			pista: { ladoIzq: true, y: 250 },
			actividad: function() {
				var actividad = new ActMorro1();
				return actividad;
			}
		},
		{
			id: 1,
			duracion: 21000,
			fondo: 'img/act/morro/2/fondo.png',
			dato: 'Esta \bpirámide truncada\b fué\n construída por los \baborígenes\b de la\n zona aprovechando una elevación\n natural, moldeada empleando\n \bbloques de adobe y relleno\b,\n cuidadosamente ubicados para\n lograr la estructura final.',
			pista: { ladoIzq: true, y: 200 },
			actividad: function() {
				var actividad = new ActMorro2();
				return actividad;
			}
		},
		{
			id: 2,
			duracion: 5000,
			fondo: 'img/act/morro/3/fondo.jpg',
			dato: 'En \b1957\b, fuertes lluvias causaron\n un derrumbe en uno de sus costados\n y dejó a la vista \btumbas, cerámicas\n y osarios\b. También encontraron una\n \bmoneda\b al parecer de la época de\n \bFernando VII\b, pues tenía grabada\n una flor de lis que indicaba la\n dinastía de los \bBorbón\b.',
			pista: { ladoIzq: false, y: 350 },
			actividad: function() {
				var actividad = new ActMorro3();
				actividad.totAciertos = 1;
				actividad.attrVentilador = {x: 60, y: 215, z: 10};
				actividad.attrNube = {x: -10, y: 18, z: 4};
				actividad.velocidadAngular = 4;//velocidad angular de ventilador
				actividad.aceleracionFriccion = -0.05;//aceleracion friccion
				actividad.nubeVelocidadRetorno = 1;
				return actividad;
			}
		},
		{
			id: 3,
			duracion: 15000,
			fondo: 'img/act/morro/4/fondo.jpg',
			dato: 'Investigaciones arqueológicas\n encontraron el interior del morro,\n enterramientos de \b14 tumbas\b con\n esqueletos de niños y adultos de\n hace más de 700 años.\n El arqueólogo \bJulio Cubillos\b entregó\n los restos al Instituto Etnológico de\n la Universidad del Cauca, que\n comprobó su autenticidad.',
			pista: { ladoIzq: false, y: 510 },
			actividad: function() {
				var actividad = new ActMorro4();
				actividad.totAciertos = 14;
				return actividad;
			}
		},
		{
			id: 4,
			duracion: 8000,
			fondo: 'img/act/morro/5/fondo.png',
			dato: 'Al parecer, este cerro era \bsagrado\b\n y en él se hacían \britos fúnebres\b,\n pues además de tumbas, se\n encontraron en su cima restos de\n \bvasijas de cerámica\b.',
			pista: { ladoIzq: true, y: 300 },
			actividad: function() {
				var actividad = new ActMorro5();
				actividad.totAciertos = 1;
				actividad.attrComplementoPolea = {x: 664, y: -382, z: 4};
				actividad.attrPolea = {x: 916, y: 126, z: 6};
				actividad.velocidadAngular = 4;
				actividad.aceleracionFriccion = -0.05;
				return actividad;
			}
		},
		{
			id: 5,
			duracion: 7000,
			fondo: 'img/act/morro/6/fondo.png',
			dato: 'En \b1937\b, para celebrar el\n cumpleaños \b400 de Popayán\b, se\n niveló su cima para hacer una\n plataforma donde se ubicaría la\n estatua de \bSebastián de Belalcázar\b,\n lo que causó el daño total de la\n cúspide original de la pirámide.',
			pista: { ladoIzq: true, y: 100 },
			actividad: function() {
				var actividad = new ActMorro6();
				return actividad;
			}
		}
	]
};
