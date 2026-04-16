## ejemplo 5, crear best sistema:
https://www.youtube.com/watch?v=61K-2VRaC6s&list=PL4cUxeGkcC9h9RbDpG8ZModUzwy45tLjb&index=1&t=8s
1. specify init --here
2 poner:
	-constituicon
		- raiz '.specify'
		- dentro  '.specify/memory'
	- specifactions 
		- raiz '.specify'
	- DESIGN.
		- raiz proyecto
		

| Comando 					| Descripción 																		|
|:--------------------------|:----------------------------------------------------------------------------------|
| `/speckit.constitution` 	| Crear o actualizar los principios rectores del proyecto y las guías de desarrollo |
| `/speckit.specify` 		| Definir lo que quieres construir (requisitos e historias de usuario) 				|
| `/speckit.clarify` 		| (Opcional) Aclarar áreas poco definidas (recomendado antes de `/speckit.plan`     |
| `/speckit.checklist` 	    | (opcional) Generar listas de verificación de calidad personalizadas que validan   |
| `/speckit.plan` 			| Crear planes de implementación técnica con tu pila tecnológica elegida 			|
| `/speckit.tasks` 			| Generar listas de tareas accionables para la implementación 						|
| `/speckit.analyze` 		| (opcional)Análisis de consistencia y cobertura entre artefactos                   |
| `/speckit.implement` 		| Ejecutar todas las tareas para construir la funcionalidad según el plan 			|


## instalar
0. crear antes instalacion basica del framework
1. instalar todos los paquetes necesarios(tailwind,shadcn, supabaseo, cloudflare similar)
2. automatizar las skills vercel segun projecto terminal: npx autoskills --agent copilot/kilo
3. instalar uv using winget instlar spec-kit,PS: winget install astral-sh.uv
4. PREFERENTE ESTE Instalar speckit using uv one-time,PS: uvx — from git+https://github.com/github/spec-kit.git specify init --here
	- yes
	- copilot/kilo
	- powershell
	
5. verificar instalacion, PS: specify --version
6. verificar instalacion, PS: specify --help

## crear proyecto
0. constitution *“The rules of the game”*:

````prompt
adjuntar (package.json)
/constitution 
- trabajar con principios de codigo limpio,DRY,SOLID,KISS, diseño modular y reutilizable. 
- interfecie simple UX, responsive design prioridad moviles, dependencias minimas, rapido de navegar y cargar. 
- No testing( no unit test, no integrations test, no e2e tests) 
- esta 4 directriz anteriores sera la principal y no se susituiran
- projecto en astro  con htmx, islas reacts ultima version como pone en el archivo 'package.json'  
```` 
1. specify (crear varios especificadores) *que?,porque?*:
	<!-- nombre_especificacion_commit - xxxx... -->
	- especificacion 1
		```
		/specify
		Configuración inicial de la página - esta aplicación debe ser una aplicación web de seguimiento de objetivos llamada 'doit'. Debe haber dos columnas: una izquierda donde se muestran los objetivos actuales, junto con cuántos días le quedan al usuario para lograr el objetivo, y una derecha donde están los objetivos completados. Cada objetivo se puede 'marcar' usando una casilla de verificación, y luego se puede mover a la columna de completados o eliminarse permanentemente. Para añadir nuevos objetivos, un usuario puede hacer clic en un botón para abrir un formulario de nuevo objetivo en un modal (campos de título y fecha de finalización). Los objetivos que alcanzan su fecha de finalización (dentro de 3 días) se resaltan. Usemos un tema claro moderno con colores pastel divertidos.
		````
	- especificacion 2 :
	```
		/specify
		nombre_especificacion_commit - xxxx...
	````
2. opcionales pero importantes : 
	- `/clarify`  (imprescindible)	
		- preguntas - opciones (A-D) u otra
	- `/checklist`
0. leer y chequear especificacion. sino gusta cambiar
3.  plan *parte tecnica*:
	````
	/plan
	planifica esto usando:
	- tailwind @theme para los colores del tema,shadcn/motion para los componentes de interfaz de usuario. 
	- fuentes monserrat de google-fonts light,medium,bold
	- Usar date-fns para el formateo de fechas. 
	- No se necesitan pruebas unitarias, pruebas de integración ni pruebas e2e.
	- gestores paquete bun, pnpm
	- datos en json mismo proyecto
	- configurar x github page
	- archivos dentro de './src' y dentro de esta carpeta crear carpeta minimas de 'layouts, components, util, interface,apis,webhooks, library,pages' menos los de configuracion que iran en raiz
	- utilizar skill del proyecto
	- especificar librerias x uso
	
	
	````
4. tareas : `/tasks` 			
5. analizar : `/analyze`
0. crear nuevo chat para la implementaion x el contexto                 
6. implementar: `/implement` 
7. añadir nueva elementos proyecto existente:

	0. specify:
	
	````
	/specify
	 arrastrar y soltar: hagamos que los usuarios puedan reordenar los objetivos arrastrándolos y soltándolos por encima o por debajo de otros objetivos en la lista.
	````
	1. clarificar: `/clarify`  (imprescindible) - preguntas/respuetas
	2.  plan *parte tecnica*:
	````
	/plan
	 esto usando la librería sortable para ordenar los elementos de la lista y tailwind para el estilo. Nada de pruebas en absoluto.
	 ````
	3. tareas : `/tasks` 			
	4. analizar : `/analyze`
	0. crear nuevo chat para la implementaion x el contexto                 
	5. implementar: `/implement` 