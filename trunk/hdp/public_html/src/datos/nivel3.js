
niveles[3] = {
	nombre: 'Puente Humilladero',
	subnivel: [
		{
			id: 1,
			duracion: 7000,
			fondo: '',
			dato: 'Es un viaducto estilo romano con doce\narcos y una longitud de 240 metros,\nconstruido para unir el sector de\nEl Callejón -hoy barrio Bolívar- y el\ncentro de la ciudad, que se encuentra\natravesado por el Río Molino.',
			pista: {ladoIzq: true, y: 90},
			actividad: function() {
				var actividad = new ActPuente1();
				return actividad;
			}
		},
		{
			id: 2,
			duracion: 25000,//23000
			fondo: 'img/puente/2/fondo.png',
			dato: 'Fue levantado bajo la dirección de\nFray Serafín Barbetti y se inauguró el\n31 de julio de 1873. El obispo de la\nciudad tuvo la idea de agradecer\npúblicamente a Barbetti y 82\npersonalidades firmaron una nota.',
			pista: {ladoIzq: true, y: 90},
			actividad: function() {
				var actividad = new ActPuente2();
                                actividad.totAciertos = 82;
				return actividad;
			}
		},
		{
			id: 3,
			duracion: 17000,
			fondo: 'img/puente/3/fondo.png',
			dato: 'Barbetti le dio forma al puente con los\nladrillos que se descartaron de la\nreconstrucción de la Catedral de\nPopayán -destruida por el terremoto\nde 1736- y las obras de la\nTorre del Reloj.',
			pista: {ladoIzq: true, y: 90},
			actividad: function() {
				var actividad = new ActPuente3();
				return actividad;
			}
		},
		{
			id: 4,
			duracion: 20000,
			fondo: 'img/puente/4/fondo.png',
			dato: 'La mezcla usada para pegar los\n ladrillos del puente era de \bcal\b y \bbarro\b,\n pero le agregaron \bsangre de bueyes\b\n para que los ladrillos se adhieran\n más entre sí.',
			pista: {ladoIzq: false, y: 500},
			actividad: function() {
				var actividad = new ActPuente4();
				return actividad;
			}
		},
		{
			id: 5,
			duracion: 2000000000,
			fondo: 'img/puente/5/fondo.png',
			dato: 'Para inaugurar el Puente del\nHumilladero, Barbetti hizo pasar una\nrecua de mulas cargadas y almorzó\nbajo el arco principal, desafiando una\ndenuncia -hecha por un profesor ante\nlas autoridades gubernamentales- de\nque la obra colapsaría.',
			pista: {ladoIzq: true, y: 90},
			actividad: function() {
				var actividad = new ActPuente5();
				return actividad;
			}
		},
		{
			id: 6,
			duracion: 2000000000,
			fondo: 'img/puente/6/fondo.png',
			dato: 'Se cree que el nombre \b"Puente del\n humilladero"\b se debe a que, antes\n de construirlo, la cuesta era tan\n enpinada que quienes por allí subían\n al centro lo hacían casi de rodillas.\n\n En 1883, la Legislatura del Estado\n lo bautizó formalmente \b"Puente\n Bolívar"\b.',
			pista: {ladoIzq: true, y: 90},
			actividad: function() {
				var actividad = new ActPuente6();
				return actividad;
			}
		}
	]
};

