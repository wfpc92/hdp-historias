niveles[2] = {
	nombre: 'Parque Caldas',
	subnivel: [
		{
			id: 1,
			duracion: 23000,
			fondo: '',
			dato: "Apareció con la fundación\n de la ciudad, en \b1537\b.\n Como era costumbre en las\n \bciudades coloniales españolas\b, los\n conquistadores eligieron un espacio\n amplio y trazaron las calles en\n forma \bperpendicular\b para construir\n los edificios que representaban\n los poderes en España.",
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
			dato: 'En el centro del parque, hay un\n monumento a Francisco José de\n Caldas (apodado \b"Sabio Caldas"\b),\n  reconocido botánico, astrónomo y\nprócer colombiano; uno de los\n hijos ilustres de Popayán.\n El monumento se construyó para\n conmemorar los \b100 años de la\n independencia\b de Colombia.',
			pista: { ladoIzq: false, y: 550 },
			actividad: function() {
				var actividad = new ActParque2();
				actividad.totAciertos = 8;
				return actividad;
			}
		},
		{
			id: 3,
			duracion: 32000,
			fondo: 'img/act/parque/3/fondo.jpg',
			dato: "Las \bplacas\b que adornan el\n monumento al sabio Caldas exponen\nsu \bfirma\b, una muestra de la planta\n trepadora \bBomarea caldasii\b (llamada\n así en su honor), la figura de un\n \boctante\b y un \bhipsómetro\b, un invento\n suyo.",
			pista: { ladoIzq: false, y: 285 },
			actividad: function() {
				var actividad = new ActParque3();
				return actividad;
			}
		},
		{
			id: 4,
			duracion: 32000,
			fondo: 'img/act/parque/4/fondo.jpg',
			dato: 'A 10 metros del parque se encuentra\n el \bPanteón de los Próceres\b, un\n monumento que contiene las cenizas\n de \b15 hijos ilustres\b de Popayán,\n entre los que se encuentran Camilo\n Torres, Tomás Cipriano de Mosquera\n y Francisco José de Caldas.',
			pista: { ladoIzq: true, y: 120 },
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
			dato: 'Frente al parque se encuentra la\n \bTorre del Reloj\b, uno de los símbolos\n representativos de Popayán.\n Terminó de construirse en 1682 y en\n 1737 se le instaló un \breloj inglés\b,\n que funcionaría hasta 1814, cuando\n se le extrajeron sus \bpesas de plomo\b\n para hacer \bmuniciones\b durante las\n guerras de la Independencia.',
			pista: { ladoIzq: false, y: 120 },
			actividad: function() {
				var actividad = new ActParque5();
				return actividad;
			}
		},
		{
			id: 6,
			duracion: 51000,
			fondo: 'img/act/parque/6/fondo.jpg',
			dato: 'Frente al parque está la \bCatedral \nBasílica Nuestra Señora de la\n Asunción\b, una iglesia católica\n ofrendada a la \bVirgen María\b,\n construída en 1906 sobre cimientos\n de antiguas iglesias. Ha requerido\n reconstrucciones a causa de varios\n \bterremotos\b. En ella se centran actos\n de la \bSemana Santa\b.',
			pista: { ladoIzq: true, y: 35 },
			actividad: function() {
				var actividad = new ActParque6();
				actividad.totAciertos = 10;
				return actividad;
			}
		}
	]
};

