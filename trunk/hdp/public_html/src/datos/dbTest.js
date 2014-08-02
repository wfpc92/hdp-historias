//banco de preguntas del test
﻿var tests = [];
//esta corresponde al banco de preguntas de la primera postal

//el Morro
tests[0] = {
	totalPreguntas: 1,
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
	totalPreguntas: 3,
	pregunta: [
		{
			texto: 'Sebastián de Belalcázar fué el |Conquistador| que\n |Fundó| la ciudad de Popayán.',
			trampa: ["Descubrió", "Emperador"]
		},
		{
			texto: 'El verdadero Nombre de Sebastián de Belalcázar\n era |Sebastián| |Moyano|.',
			trampa: ["Aguirre", "Nicolás", "Cabrera", "Quijote"]
		},
		{
			texto: 'La palabra \bPopayán\b proviene de "|Pop|-|Pioyá|-|n|".',
			trampa: ["Pap", "Pa", "Ya", "Pillá"]
		},
		{
			texto: 'Los conquistadores asumieron el nombre \bPopayán\b porque sus\nintérpretes |Yucatecos| las designaron como las \b"Tierras\n del cacique |Pioyán|"\b',
			trampa: ["Mayas", "Paeces", "Paellán", "Papaya"]
		},
		{
			texto: 'Mientras conquistaba |Popayán|, Belalcázar Atravesó lo que\n hoy se conoce como |Timbío| -en Octubre de 1535-, donde\n venció a 3.000 indígenas.',
			trampa: ["Cali", "Neiva", "Quito", "Cartagena"]
		},
		{
			texto: 'Cuentan los historiadores que en Timbío, Belalcázar venció a\n |3000| indígenas con un Ejército de |100| hombres.',
			trampa: ["1000", "2000", "10"]
		},
		{
			texto: 'Mientras buscaba el tesoro de El Dorado, también fundó las\nciudades de |Quito y Guayaquil|, en Ecuador, y\n|Santiago de Cali y Neiva|, en Colombia.',
			trampa: ["Quito y Otavalo", "Guayaquil e Ibarra", "Cartagena y Neiva"]
		},
		{
			texto: 'En mayo de 1540 Sebastián de Belalcázar volvió a |España|\n para legitimar sus |derechos|.',
			trampa: ["Ecuador", "Portugal", "acciones"]
		},
		{
			texto: 'Belalcázar fué declarado primer |Gobernador| de la Provincia\n de Popayán en la corte del |Emperador| de España.',
			trampa: ["Alcalde", "Ministro", "Caballero", "Juez"]
		},
		{
			texto: 'Belalcázar murió de avanzada edad, a causa de una \benfermedad\b\n mientras preparaba su último viaje a |España|, en la\n ciudad de |Cartagena| en 1551.',
			trampa: ["Ecuador", "Portugal", "Popayán", "Huila"]
		}
	]
};

//Puente de Humilladero
tests[2] = {
	totalPreguntas: 3,
	pregunta: [
		{
			texto: 'El Puente del Humilladero fue |Construido| bajo la dirección de\nFray Serafín Barbetti y se inauguró el |31 de julio| de 1873.',
			trampa: ["21 de julio", "31 de junio", "Diseñado"]
		},
		{
			texto: 'El |Obispo| de la ciudad tuvo la idea de agradecer\n|Públicamente| a Barbetti por su buen trabajo y 82\npersonalidades firmaron una nota.',
			trampa: ["Alcalde", "Solemnemente", "Regidor"]
		},
		{
			texto: 'El Puente del humilladero es un |Viaducto| estilo romano con\n|Doce| arcos y una longitud de 240 metros.',
			trampa: ["Trece", "Quince", "Edificio"]
		},
		{
			texto: 'El Puente del humilladero fue construido para unir el\n|Sector| de |El Callejón| -hoy barrio Bolívar- y el\ncentro de la ciudad, que se encuentra atravesado por el\nRío |Molino|.',
			trampa: ["El Placer", "Mirador", "El Poblado", "Ejido", "Viaducto"]
		},
		{
			texto: 'Barbetti le dio forma al puente con los |Ladrillos| que se\ndescartaron de la reconstrucción de la |Catedral| de\nPopayán -destruida por el terremoto de 1736- y las obras de\nla Torre del Reloj.',
			trampa: ["Implementos", "Diócesis", "Alcaldía", "Penitenciaria", "1736", "1735"]
		},
		{
			texto: 'La mezcla usada para |Pegar| los ladrillos del Puente\ndel Humilladero era de |Cal y barro| pero le agregaron\n|Sangre| de bueyes para que los ladrillos se adhieran más.',
			trampa: ["Cal y yeso", "Saliva", "Cal y arena", "Alisar", "Cal y estuco"]
		},
		{
			texto: 'Para |Inaugurar| el Puente del Humilladero Barbetti hizo\npasar una recua de |Mulas| cargadas y |Almorzó| bajo el\narco principal.',
			trampa: ["Acampó", "Ovejas", "Clausurar", "Durmió", "Vacas"]
		},
		{
			texto: 'Se dice que lo del "Humilladero" se debe a que las\n|Personas| que por allí subían al |Centro| lo\nhacían casi |Arrodillados|.',
			trampa: ["Llorando", "Arrastrados", "Desesperados", "Norte", "Caravanas"]
		},
		{
			texto: 'En |1883| la Legislatura del |Estado| lo\nbautizó como |Puente Bolívar|.',
			trampa: ["1884", "Puente Cauca", "Puente Mayor", "Puente Central", "Cauca"]
		}
	]
};


//Parque Francisco Jose de Caldas
tests[3] = {
	totalPreguntas: 4,
	pregunta: [
		{
			texto: 'El Parque Francisco José de Caldas se creó con la fundación\nde Popayán, en |1537|.',
			trampa: ["1535", "1536", "1539"]
		},
		{
			texto: 'En las ciudades fundadas los |Conquistadores| españoles\nelegían un espacio amplio y trazaban a partir suyo las calles,\ny edificaban alrededor |Casonas| gubernamentales, una\niglesia católica y las |Viviendas| de los nuevos pobladores.',
			trampa: ["Haciendas", "Pacificadores", "Huertas"]
		},
		{
			texto: 'En el centro del Parque Caldas hay un |Monumento| al\nprócer Francisco José de Caldas, llamado también el\n|Sabio| Caldas.',
			trampa: ["Busto", "General", "Capitán", "Poema", "Obelisco"]
		},
		{
			texto: 'Caldas es uno de los |Hijos| ilustres de\nPopayán y fue |Reconocido| también por sus\nestudios en |Botánica y astronomía|.',
			trampa: ["Botánica y Matemáticas", "Botánica e ingeniería", "Ovacionado", "Botánica y arquitectura", "Señores", "Políticos"]
		},
		{
			texto: 'La estatua de Caldas que adorna el Parque se construyó para\nconmemorar los |100 años| de la independencia de Colombia.',
			trampa: ["80 años", "90 años", "99 años", "98 años"]
		},
		{
			texto: 'Las |Placas| de la estatua de Caldas tienen su firma, una\nmuestra de |La planta| Bomarea caldasii -llamada así en su\nhonor- e imágenes de un octante y un |Hipsómetro|, su invento\npara determinar la |Altitud| de un lugar sobre el nivel del\nmar mediante la ebullición del agua.',
			trampa: ["Barómetro", "Embudo", "El hongo", "La roca", "Bielas", "Longitud", "Acidez"]
		},
		{
			texto: 'A 10 metros del parque se encuentra el Panteón de los\n|Próceres|, un monumento que contiene los sepulcros\nde |15| hijos ilustres de Popayán: |Camilo| Torres,\nTomás Cipriano de Mosquera y Francisco José de Caldas,\nentre otros.',
			trampa: ["Alejandro", "Maestros", "13", "Caudillos", "16", "Francisco"]
		},
		{
			texto: 'Frente al parque se levanta la Torre |Del Reloj|, uno\nde los |Símbolos| más representativos de Popayán\nque se terminó de construir en |1682|.',
			trampa: ["1690", "Lugares", "del Gobernador ", "del Parque", "1684", "1680", "Espacios"]
		},
		{
			texto: 'En 1737 se le adjuntó a la torre junto al parque un reloj de\nfabricación |Inglesa|, que funcionaría continuamente\nhasta 1814, cuando se le extrajeron sus |Pesas| para\nhacer |Municiones|.',
			trampa: ["Estribos", "Japonesa", "Claustros", "Tornillos", "Francesa", "Resortes", "Suiza", "Cuchillos"]
		},
		{
			texto: 'Junto al parque está la Catedral Basílica Nuestra |Señora|\nde la Asunción, una iglesia |Católica| ofrendada a la\nVirgen María terminada de construir en |Junio de 1906| sobre\nlos cimientos de antiguas iglesias.',
			trampa: ["Madre", "Gótica", "Hermana", "Junio de 1907", "Junio de 1905", "Antigua"]
		}
	]
};



//Guillermo Valencia
tests[4] = {
	totalPreguntas: 5,
	pregunta: [
		{
			texto: 'La |Casona| donde vivió y murió Guillermo Valencia\nes monumento nacional por Ley 80 de diciembre de 1943.\nFunciona allí el Museo |Nacional| Guillermo Valencia\ny exhibe, entre otras reliquias, |retratos| de amigos y\npersonajes que él admiraba, obras de arte de La Colonia y\nLa Independencia, y una biblioteca con más de |7.000|\nlibros.',
			trampa: ["Moderno", "6.000", "Departamental", "8.000", "Estancia", "Joyas ", "Hacienda", "Objetos", "6.500"]
		},
		{
			texto: 'Guillermo Valencia fue uno de los payaneses más ilustres\ndel último |Siglo|. Nació en |1873|, y\ncomo fue un gran |Orador| obtuvo reconocimiento\n|Político| desde muy joven.',
			trampa: ["Administrativo", "Encomendador", "Académico", "1871", "1870", "Decenio", "1870", "Terrateniente", "1872", "Social", "Lustro"]
		},
		{
			texto: 'Aunque Valencia fue un |Poeta| prodigioso la mayoría\nde su obra se condensa en |Ritos|, un libro |Publicado|\nen 1899, cuando tenía |25| años.',
			trampa: ["Editado ", "Literato", "Impreso", "Nostalgias", "Escritor", "Sueños", "26", "Humanista", "27", "Misterios"]
		},
		{
			texto: 'Su hijo Guillermo León fue presidente de Colombia entre\n|1962 y 1966|, y su hija Josefina fue la primera mujer en\nser |Gobernadora| del Cauca y ministra de Educación.',
			trampa: ["1966 y 1970", "Intendente", "Minas y energía", "1958 y 1962", "Senadora", "Concejal", "Cultura", "1960 y 1964", "Educación", "Regente", "Desarrollo"]
		},
		{
			texto: 'A la vuelta de la Casa Museo Valencia está ubicada la\n|Casona| donde nació y vivió el |General| Tomas\nCipriano de Mosquera, donde funcionan actualmente la Casa\nMuseo Mosquera y el |Centro| de Investigaciones\n|Históricas| José María |Arboleda| Llorente.',
			trampa: ["Capitán", "Sociales", "Gobernador", "Mosquera", "López", "Módulo", "Médicas", "Edificio", "Hacienda", "Científicas"]
		},
		{
			texto: 'Hay una estatua del Maestro Valencia vigilando la entrada\ndel Puente del |Humilladero|, recurrente en miles de registros\n|fotográficos|. Fue construida por Victorio Macho, el mismo\n|escultor| del monumento a Sebastián de Belalcázar\nque |Reposa| en el Morro de Tulcán.',
			trampa: ["Amor", "Victorino", "Judiciales", "Pintor", "Decorador", "Bolívar", "Adorna", "Banco", "Diseñador", "Florentino"]
		},
		{
			texto: 'Valencia escribió el |Himno| de la Universidad del\nCauca y para musicalizarlo invitó al |Compositor| caucano\n|Avelino Paz|. Lo |Interpretaron| por primera vez el 11\nde noviembre de 1922 en la coronación del |Reinado|\nuniversitario.',
			trampa: ["Avelino Pérez", "Periódico", "Socializaron", "Avelino Pasos", "Músico", "Cantaron", "Reglamento ", "Carnaval", "Arreglista", "Avelino Páez", "Desfile"]
		}
	]
};