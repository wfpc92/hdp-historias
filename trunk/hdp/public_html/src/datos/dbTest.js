//banco de preguntas del test
﻿var tests = [];
//esta corresponde al banco de preguntas de la primera postal

//el Morro
tests[0] = {
	numPreguntas: 1,
	pregunta: [
		{
			texto: "El Morro |de Tulcán| es una montaña |Artificial|\nprehispánica.",
			trampa: ["Natural", "de Popayán"]
		},
		{
			texto: "El Morro es considerado el sitio |Arqueológico| más\n importante de |Popayán|.",
			trampa: ["Colombia", "Botánico"]
		},
		{
			texto: "El Morro fué |Construido| por los |Indígenas|\ndel Valle de |Pubenza|.",
			trampa: ["Cauca", "Misioneros"]
		},
		{
			texto: "El Morro fué |Construido| con bloques de |Adobe|.",
			trampa: ["Decorado", "Cemento"]
		},
		{
			texto: "En 1957, fuertes |Lluvias| causaron un derrumbe\n en el Morro, el cual dejó |Tumbas| a la vista.",
			trampa: ["Joyas", "Temblores"]
		},
		{
			texto: "En el Morro encontraron una |Moneda|, al parecer de la\n época de |Fernando| VII.",
			trampa: ["Calavera", "Carlos"]
		},
		{
			texto: "Investigaciones |Arqueológicas| encontraron en\nel interior del Morro 14 |Enterramientos|.",
			trampa: ["Collares", "Antropológicas"]
		},
		{
			texto: "El Instituto Etnológico de la Universidad del |Cauca|\n comprobó la |Autenticidad| de los restos encontrados\nen el Morro.",
			trampa: ["Valle", "Antiguedad"]
		},
		{
			texto: "Al parecer el |Morro| era un sitio |Sagrado|.",
			trampa: ["Oscuro", "Trono"]
		},
		{
			texto: "En el Morro se hacían |Ritos| |Fúnebres|.",
			trampa: ["Musicales", "Fiestas"]
		},
		{
			texto: "La |Estatua| de Sebastián de Belalcázar fue ubicada\n sobre el Morro en |1937|.",
			trampa: ["1935", "Pintura"]
		},
		{
			texto: "La estatua de |Belalcázar| se instaló en el morro\n para celebrar el |Cumpleaños| de Popayán.",
			trampa: ["Bolivar", "Nombramiento"]
		}
	]
};


//Sebastian de Belalcazar
tests[1] = {
	numPreguntas: 2,
	pregunta: [
		{
			texto: 'Sebastián de Belalcázar fue el |Conquistador| que |Fundó| la\nciudad de Popayán.',
			trampa: ["Descubrió", "Emperador"]
		},
		{
			texto: 'El verdadero |Nombre| de Sebastián de Belalcázar era Sebastián\n|Moyano|.',
			trampa: ["Aguirre ", "Motivo"]
		},
		{
			texto: 'La palabra |Popayán| proviene de "|pop-pioyá-n|".',
			trampa: ["Papiyón", "Pipián"]
		},
		{
			texto: 'Los conquistadores asumieron el nombre Popayán porque sus\n|Intérpretes| Yucatecos las designaron como las "|Tierras|\ndel cacique Pioyán"',
			trampa: ["Discípulos", "Amigos", "Huestes"]
		},
		{
			texto: 'Mientras conquistaba Popayán, Belalcázar |Atravesó| lo que\nhoy se conoce como Timbío -en |Octubre| de 1535-.',
			trampa: ["Agosto", "Mayo", "Incendió"]
		},
		{
			texto: 'Belalcázar venció a |3000| indígenas con un |Ejército| de 100\nhombres.',
			trampa: ["1000", "2000", "Tumulto"]
		},
		{
			texto: 'Mientras buscaba el tesoro de El Dorado, también fundó las\nciudades de |Quito y Guayaquil|, en Ecuador, y\n|Santiago de Cali y Popayán|, en Colombia.',
			trampa: ["Quito y Otavalo", "Guayaquil e Ibarra", "Santiago de Cali y Neiva"]
		},
		{
			texto: 'En mayo de |1540| Sebastián de Belalcázar volvió a |España|\npara legitimar sus derechos.',
			trampa: ["Perú", "Italia", "1537"]
		},
		{
			texto: 'Belalcázar fue declarado primer |Gobernador| de la Provincia\nde Popayán en la corte de |Carlos I| de España.',
			trampa: ["Carlos V", "Carlos II", "Emancipador"]
		},
		{
			texto: 'Belalcázar murió de avanzada edad, a causa de una enfermedad\nmientras preparaba su último viaje a |España|, en Cartagena de\nIndias en |1551|.',
			trampa: ["1552", "Italia", "1557"]
		}
	]
};

//Puente de Humilladero
tests[2] = {
	numPreguntas: 3,
	pregunta: [
		{
			texto: 'El Puente del Humilladero fue |Construido| bajo la dirección de\nFray Serafín Barbetti y se inauguró el |31 de julio| de 1873.',
			trampa: ["21 de julio", "31 de junio", "Diseñado"]
		},
		{
			texto: 'El |Obispo| de la ciudad tuvo la idea de agradecer |Públicamente|\na Barbetti por su buen trabajo y 82 personalidades firmaron una nota.',
			trampa: ["Alcalde", "Solemnemente", "Regidor"]
		},
		{
			texto: 'El Puente del humilladero es un |Viaducto| estilo romano con\n|Doce| arcos y una longitud de 240 metros.',
			trampa: ["Trece", "Quince", "Edificio"]
		},
		{
			texto: 'El Puente del humilladero fue construido para unir el |Sector|\nde |El Callejón| -hoy barrio Bolívar- y el centro de la ciudad,\nque se encuentra atravesado por el Río |Molino|.',
			trampa: ["El Placer", "Mirador", "El Poblado", "Ejido", "Viaducto"]
		},
		{
			texto: 'Barbetti le dio forma al puente con los |Ladrillos| que se\ndescartaron de la reconstrucción de la |Catedral| de Popayán\n-destruida por el terremoto de 1736- y las obras de la\nTorre del Reloj.',
			trampa: ["Implementos", "Diócesis", "Alcaldía", "Penitenciaria", "1736", "1735"]
		},
		{
			texto: 'La mezcla usada para |Pegar| los ladrillos del Puente del\nHumilladero era de |Cal y barro| pero le agregaron |Sangre|\nde bueyes para que los ladrillos se adhieran más.',
			trampa: ["Cal y yeso", "Saliva", "Cal y arena", "Alisar", "Cal y estuco"]
		},
		{
			texto: 'Para |Inaugurar| el Puente del Humilladero Barbetti hizo pasar una\nrecua de |Mulas| cargadas y |Almorzó| bajo el arco principal.',
			trampa: ["Acampó", "Ovejas", "Clausurar", "Durmió", "Vacas"]
		},
		{
			texto: 'Se dice que lo del "Humilladero" se debe a que las |Personas|\nque por allí subían al |Centro| lo hacían casi |Arrodillados|.',
			trampa: ["Llorando", "Arrastrados", "Desesperados", "Norte", "Caravanas"]
		},
		{
			texto: 'En |1883| la Legislatura del |Estado| lo bautizó como\n|Puente Bolívar|.',
			trampa: ["1884", "Puente Cauca", "Puente Mayor", "Puente Central", "Cauca"]
		}
	]
};


//Parque Francisco Jose de Caldas
tests[3] = {
	numPreguntas: 4,
	pregunta: [
		{
			texto: 'El Parque Francisco José de Caldas se creó con la fundación de Popayán, en |1537|.',
			trampa: ["1535", "1536", "1539"]
		},
		{
			texto: 'En las ciudades fundadas los |Conquistadores| españoles elegían un espacio amplio y trazaban a partir suyo las calles, y edificaban alrededor |Casonas| gubernamentales, una iglesia católica y las |Viviendas| de los nuevos pobladores.',
			trampa: ["Haciendas", "Pacificadores", "Huertas"]
		},
		{
			texto: 'En el centro del Parque Caldas hay un |Monumento| al prócer Francisco José de Caldas, llamado también el |Sabio| Caldas.',
			trampa: ["Busto", "General", "Capitán", "Poema", "Obelisco"]
		},
		{
			texto: 'Caldas es uno de los |Hijos| ilustres de Popayán y fue |Reconocido| también por sus estudios en |Botánica y astronomía|.',
			trampa: ["Botánica y Matemáticas", "Botánica e ingeniería", "Ovacionado", "Botánica y arquitectura", "Señores", "Políticos"]
		},
		{
			texto: 'La estatua de Caldas que adorna el Parque se construyó para conmemorar los |100 años| de la independencia de Colombia.',
			trampa: ["80 años", "90 años", "99 años", "98 años"]
		},
		{
			texto: 'Las |Placas| de la estatua de Caldas tienen su firma, una muestra de |La planta| Bomarea caldasii -llamada así en su honor- e imágenes de un octante y un |Hipsómetro|, su invento para determinar la |Altitud| de un lugar sobre el nivel del mar mediante la ebullición del agua.',
			trampa: ["Barómetro", "Embudo", "El hongo", "La roca", "Bielas", "Longitud", "Acidez"]
		},
		{
			texto: 'A 10 metros del parque se encuentra el Panteón de los |Próceres|, un monumento que contiene los sepulcros de |15| hijos ilustres de Popayán: |Camilo| Torres, Tomás Cipriano de Mosquera y Francisco José de Caldas, entre otros.',
			trampa: ["Alejandro", "Maestros", "13", "Caudillos", "16", "Francisco"]
		},
		{
			texto: 'Frente al parque se levanta la Torre |Del Reloj|, uno de los |Símbolos| más representativos de Popayán que se terminó de construir en |1682|.',
			trampa: ["1690", "Lugares", "del Gobernador ", "del Parque", "1684", "1680", "Espacios"]
		},
		{
			texto: 'En 1737 se le adjuntó a la torre junto al parque un reloj de fabricación |Inglesa|, que funcionaría continuamente hasta 1814, cuando se le extrajeron sus |Pesas| para hacer |Municiones|.',
			trampa: ["Estribos", "Japonesa", "Claustros", "Tornillos", "Francesa", "Resortes", "Suiza", "Cuchillos"]
		},
		{
			texto: 'Junto al parque está la Catedral Basílica Nuestra |Señora| de la Asunción, una iglesia |Católica| ofrendada a la Virgen María terminada de construir en |Junio de 1906| sobre los cimientos de antiguas iglesias.',
			trampa: ["Madre", "Gótica", "Hermana", "Junio de 1907", "Junio de 1905", "Antigua"]
		}
	]
};



//Guillermo Valencia
tests[4] = {
	numPreguntas: 5,
	pregunta: [
		{
			texto: 'La |Casona| donde vivió y murió Guillermo Valencia es monumento nacional por Ley 80 de diciembre de 1943. Funciona allí el Museo |Nacional| Guillermo Valencia y exhibe, entre otras reliquias, |retratos| de amigos y personajes que él admiraba, obras de arte de La Colonia y La Independencia, y una biblioteca con más de |7.000| libros.',
			trampa: ["Moderno", "6.000", "Departamental", "8.000", "Estancia", "Joyas ", "Hacienda", "Objetos", "6.500"]
		},
		{
			texto: 'Guillermo Valencia fue uno de los payaneses más ilustres del último |Siglo|. Nació en |1873|, y como fue un gran |Orador| obtuvo reconocimiento |Político| desde muy joven.',
			trampa: ["Administrativo", "Encomendador", "Académico", "1871", "1870", "Decenio", "1870", "Terrateniente", "1872", "Social", "Lustro"]
		},
		{
			texto: 'Aunque Valencia fue un |Poeta| prodigioso la mayoría de su obra se condensa en |Ritos|, un libro |Publicado| en 1899, cuando tenía |25| años.',
			trampa: ["Editado ", "Literato", "Impreso", "Nostalgias", "Escritor", "Sueños", "26", "Humanista", "27", "Misterios"]
		},
		{
			texto: 'Su hijo Guillermo León fue presidente de Colombia entre |1962 y 1966|, y su hija Josefina fue la primera mujer en ser |Gobernadora| del Cauca y ministra de Educación.',
			trampa: ["1966 y 1970", "Intendente", "Minas y energía", "1958 y 1962", "Senadora", "Concejal", "Cultura", "1960 y 1964", "Educación", "Regente", "Desarrollo"]
		},
		{
			texto: 'A la vuelta de la Casa Museo Valencia está ubicada la |Casona| donde nació y vivió el |General| Tomas Cipriano de Mosquera, donde funcionan actualmente la Casa Museo Mosquera y el |Centro| de Investigaciones |Históricas| José María |Arboleda| Llorente.',
			trampa: ["Capitán", "Sociales", "Gobernador", "Mosquera", "López", "Módulo", "Médicas", "Edificio", "Hacienda", "Científicas"]
		},
		{
			texto: 'Hay una estatua del Maestro Valencia vigilando la entrada del Puente del |Humilladero|, recurrente en miles de registros |fotográficos|. Fue construida por Victorio Macho, el mismo |escultor| del monumento a Sebastián de Belalcázar que |Reposa| en el Morro de Tulcán.',
			trampa: ["Amor", "Victorino", "Judiciales", "Pintor", "Decorador", "Bolívar", "Victorio", "Adorna", "Gubernamentales", "Banco", "Diseñador", "Florentino"]
		},
		{
			texto: 'Valencia escribió el |Himno| de la Universidad del Cauca y para musicalizarlo invitó al |Compositor| caucano |Avelino Paz|. Lo |Interpretaron| por primera vez el 11 de noviembre de 1922 en la coronación del |Reinado| universitario.',
			trampa: ["Avelino Pérez", "Periódico", "Socializaron", "Avelino Pasos", "Músico", "Cantaron", "Reglamento ", "Carnaval", "Arreglista", "Avelino Páez", "Desfile"]
		}
	]
};