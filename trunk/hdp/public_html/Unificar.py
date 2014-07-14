import glob
import os
import msvcrt

#toma el archivo index.html y por cada etiqueta script,
#obtiene el path del archivo .js y lo escribe en un archivo .js
print('iniciado minimizacion...')

archivoresultado = open('index.js','w', encoding='utf8')
index = 1
for line in open('index.html','r'):
	if line.find('script') != -1:
		ruta = line.split('"')[1]
		if ruta == 'lib/crafty.js':
			ruta = 'lib/m-crafty.js'

		pathfile = os.getcwd()+'\\'+ruta
		
		if os.path.isfile(pathfile):
			archivo, extension = os.path.splitext(pathfile)
			if extension == '.js':
				with open(pathfile, 'r', encoding='utf8') as f:
					fileRead = f.read()
					archivoresultado.write('\n/*'+pathfile+'*/\n'+fileRead)
			print(str(index) + '. '+ ruta)
			index += 1
archivoresultado.close()

nombre = "popayan.zip"
if os.path.isfile(nombre):
	os.remove(nombre)

os.system('"C:\Program Files\WinRAR\winrar.exe" a -afzip '+nombre+' index.js img audio')
#msvcrt.getch()

print ("completado")