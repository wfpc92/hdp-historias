
niveles[3] = {
	nombre: 'Puente del Humilladero',
	subnivel: [
		{
			id: 1,
			duracion: 7000,
			fondo: '',
			dato: 'Es un viaducto estilo romano de\n \b12 arcos\b y una longitud de\n 240 metros, construido para unir\n el sector de "El Callejón" (hoy\n barrio Bolívar) y el centro de\n la ciudad, los cuales se encuentran\n separados por el \bRío Molino\b.',
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
			dato: 'Fue levantado bajo la dirección de\n \bFray Serafín Barbetti\b y se inauguró\n el 31 de julio de 1873.\n\n El obispo de la ciudad, tuvo la idea\n de agradecerle públicamente a\n Barbetti, y 82 personalidades de\n la ciudad le \bfirmaron\b una nota.',
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
			dato: 'Para construir el puente, Barbetti\n también utilizó los \bladrillos\b que\n sobraron de la reconstrucción de\n \bla Catedral\b (recientemente destruida\n por el terremoto de 1736) y las\n obras de la \bTorre del Reloj\b.',
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
			dato: 'La mezcla usada para pegar los\n ladrillos del puente era de \bcal\b\n y \bbarro\b, pero le agregaron \bsangre\n de bueyes\b para que los ladrillos\n se unieran más entre sí.',
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
			dato: 'Para inaugurar el Puente del\n Humilladero, Barbetti hizo pasar\n una recua de \bmulas cargadas\b\n mientras almorzaba \bdebajo del\n arco principal\b, desafiando una\n denuncia (hecha por un profesor ante\n las autoridades gubernamentales)\n de que la obra colapsaría.',
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
			dato: 'Se cree que el nombre \b"Puente del\n humilladero"\b se debe a que, antes\n de construirlo, la cuesta era tan\n empinada que quienes por allí subían\n al centro lo hacían casi de rodillas.\n\n En 1883, la Legislatura del Estado\n lo bautizó formalmente como\n \b"Puente Bolívar"\b.',
			pista: {ladoIzq: true, y: 90},
			actividad: function() {
				var actividad = new ActPuente6();
				return actividad;
			}
		}
	]
};

