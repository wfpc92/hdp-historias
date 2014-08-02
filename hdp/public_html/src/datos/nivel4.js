
niveles[4] = {
	nombre: 'Casa Museo Guillermo Valencia',
	subnivel: [
		{
			id: 1,
			duracion: 200000,
			fondo: 'img/belalcaz/1/fondo.png',
			dato : '',
			actividad: function() {
				var actividad = new ActValencia1();
				return actividad;
			}
		},
		{
			id: 2,
			duracion: 200000,
			fondo: 'img/belalcaz/2/fondo.png',
			dato : '',
			actividad: function() {
				var actividad = new ActValencia2();
				return actividad;
			}
		},
		{
			id: 3,
			duracion: 200000,
			fondo: 'img/belalcaz/3/fondo.png',
			dato : '',
			actividad: function() {
				var actividad = new ActValencia3();
				return actividad;
			}
		},
		{
			id: 4,
			duracion: 2000000000,
			fondo: 'img/belalcaz/4/fondo.png',
			dato : '',
			actividad: function() {
				var actividad = new ActValencia4();
				return actividad;
			}
		},
		{
			id: 5,
			duracion: 2000000000,
			fondo: 'img/belalcaz/5/fondo.png',
			dato : '',
			actividad: function() {
				var actividad = new ActValencia5();
				return actividad;
			}
		},
		{
			id: 6,
			duracion: 2000000000,
			fondo: 'img/belalcaz/6/fondo.png',
			dato : '',
			actividad: function() {
				var actividad = new ActValencia6();
				return actividad;
			}
		}
	]
};

