
niveles[4] = {
	nombre: 'Casa Museo Guillermo Valencia',
	subnivel: [
		{
			id: 1,
			duracion: 200000,
			fondo: 'img/belalcaz/1/fondo.png',
			dato : 'Uno de los payaneses más ilustres del\núltimo siglo. Nació en 1873, y como fue\nun gran orador obtuvo\nreconocimiento político desde muy joven,\ntalento que le heredaron sus hijos\nGuillermo León, presidente de Colombia\nentre 1962 y 1966, y Josefina, primera\nmujer en ser gobernadora del Cauca y\nministra de Educación.',
			pista: {ladoIzq: true, y: 90},
			actividad: function() {
				var actividad = new ActValencia1();
				return actividad;
			}
		},
		{
			id: 2,
			duracion: 200000,
			fondo: 'img/belalcaz/2/fondo.png',
			dato : 'Fue un poeta prodigioso. Mucha de su obra se condensa en "Ritos", libro publicado mientras Valencia aún vivía. También es autor de numerosas traducciones literarias al español de reconocidos autores como Oscar Wilde, Víctor Hugo, Goethe, Baudelaire y Gustave Flaubert, entre otros.',
			pista: {ladoIzq: true, y: 90},
			actividad: function() {
				var actividad = new ActValencia2();
				return actividad;
			}
		},
		{
			id: 3,
			duracion: 200000,
			fondo: 'img/belalcaz/3/fondo.png',
			dato : 'Escribió el himno de la Universidad del Cauca y para musicalizarlo invitó al compositor caucano Avelino Paz. Lo interpretaron por primera vez el 11 de noviembre de 1922 en la coronación del reinado universitario.',
			pista: {ladoIzq: true, y: 90},
			actividad: function() {
				var actividad = new ActValencia3();
				return actividad;
			}
		},
		{
			id: 4,
			duracion: 2000000000,
			fondo: 'img/belalcaz/4/fondo.png',
			dato : 'La casona donde vivió y murió es monumento nacional por Ley 80 de diciembre de 1943. Funciona allí el Museo Nacional Guillermo Valencia y exhibe, entre otras reliquias, retratos de amigos y personajes que admiraba, obras de arte de La Colonia y La Independencia y una biblioteca con más de 7.000 libros.',
			pista: {ladoIzq: true, y: 90},
			actividad: function() {
				var actividad = new ActValencia4();
				return actividad;
			}
		},
		{
			id: 5,
			duracion: 2000000000,
			fondo: 'img/belalcaz/5/fondo.png',
			dato : 'A la vuelta de la Casa Museo Valencia está ubicada la casona donde nació y vivió el Gral. Tomas Cipriano de Mosquera, posteriormente dividida en dos, donde funcionan actualmente la Casa Museo Mosquera y el Centro de Investigaciones Históricas José María Arboleda Llorente.',
			pista: {ladoIzq: true, y: 90},
			actividad: function() {
				var actividad = new ActValencia5();
				return actividad;
			}
		},
		{
			id: 6,
			duracion: 2000000000,
			fondo: 'img/belalcaz/6/fondo.png',
			dato : 'Hay una estatua del Maestro Valencia vigilando la entrada del puente del Humilladero, recurrente en miles de postales y registros fotográficos. Fue construida por Victorio Macho, el mismo escultor del monumento a Sebastián de Belalcázar que se posa en el Morro de Tulcán.',
			pista: {ladoIzq: true, y: 90},
			actividad: function() {
				var actividad = new ActValencia6();
				return actividad;
			}
		}
	]
};

