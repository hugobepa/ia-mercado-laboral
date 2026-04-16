 <rol>
  creador de contenido: profesor senior de economia que busca la excelencia. que tiene que hacer 
  creados pagina web:  dessarollador full stack que busca la excelencia
</rol>
<objectivo>
 - un estudio sobre el impacto de la IA y automatizacion en la sociedad y economia española en especial de la catalana.
 - el mercado laboral de como afectara la IA y la automatizacion en la en el empleo (estidisticas de ocupacion,empleo,sueldo,...). 
 - explicada a nivel de gente de estudios no universitarios con explicaciones coloquiales y ejemplos sencillos.
 - inspiaracion en:
	- [pagina_orientativa](https://karpathy.ai/jobs/)
	- [promp_orientativo](https://github.com/karpathy/jobs/blob/master/prompt.md)
	- [repositorio_orientativo](https://github.com/karpathy/jobs)
</objetivo>
<contexto>
la idea es utilizar este estudio para crear un pagina web amena y didactica. 
- explicaciones breves y sencillas, 
- graficas comparativas situacion actual y la prevista
- comparativas de afectacion a lo empleos, oficios, epecializades, sueldos,... actuales  con la situacion actual y previsible
- utilizaremos valores de los varometros: oficios, sueldos , edad, estudios  
</contexto>
<restriciones>
- solo trabajaras con fuentes, en el archivo tienes una cuantas:
	- oficioles gobernatalmente, union europea,..
	- universidades o funcaciones reputadas
	- fuentes de refeencia reptada
	- utilizar tambien los ultimos despidos en el sector tecnologico por culpa de IA como ejemplo
- descartras las otras fuentes
- descarta a niño becerra
</restriciones> 
<formato>
- el target es la gente cotidiana y sin estudios universitarios osea dapta todo el texto y lenguaje a ese target.
	- explicaciones breves concisas y claras. utilizaras palabras coloquiales (no vulgares)
	- ejemplos sencillos claros de la vida cotidiana de la clase media
	- crearas listas y tablas  para mejor entendimiento
- los datos tiene que estar pensados para trabajar facilamente en la creacion de la pagina web:
	- formato escrito para rellenar un pagina web
	- crea datos para luego hacer  graficas y comparativas  a la situacion actual  a la prevista tanto en formato json,csv,.. 
	- listado de la webs en tabla tipo markdown para trabajar mejor luego con nombre de estudio en negrita, tipo de estudio(economico, empleo,..), tipo fuente(gobermental,universitaria, fundacion,..) , nombre fuente (nombre univerdid, nombre organismo oficial) , descipcion del estudio maximo 40 acarcteres, links del estudio en formato markdown con el nombre solo nombre estudio estudio 
</formato> 

<fuentes obligatorias>
**Metodología de trabajo decente: evolución, indicadores y adaptación en la era de la digitalización** | Tomsk Polytechnic University | [Metodología de trabajo decente: evolución, indicadores y adaptación en la era de la digitalización](https://libcat.scu.edu/EdsRecord/edsdoj,edsdoj.44b7c08a0d14473fa1a55201c9661a88?sid=11574144) |
 
 | **Navigating inflation and employment in an era of supply shocks and AI** | European Central Bank (ECB) | Estanflación, shocks oferta y rol del IA | [Navigating inflation and employment in an era of supply shocks and AI](https://www.ecb.europa.eu/press/key/date/2026/html/ecb.sp260306_1~a4943607d7.ga.html) |
 
 | **Employment Projections 2024-2034 Technical Note** | U.S. Bureau of Labor Statistics (BLS) | Metodología proyecciones empleo y IA | [Employment Projections 2024-2034](https://www.bls.gov/news.release/ecopro.tn.htm) |
 (https://www.randstadresearch.es/ia-mercado-trabajo-espana/)[RANDSTAD-RESEARCH-Informe-IA.pdf]
</fuentes obligatorias>
<fuentes sugeridas>
- [fuentes_sugeridas](link_estudio_mercado.md)
</fuentes sugeridas>

<web>
 - la web:
	- conceptos:
		- web reponsive principalmente para movil, aunque tambien tiene que ver se para tablet y web.
		- rapida cargar, facil y visible de navegar, minimalista y seo 
		- que no parezca hecha por IA
		- trabajaremos con el metodo spec-kit y pencil desde visual studio code
		- ultimas versiones estables de los frameworks y librerias obligatorios 
		- trabajaremos con bun gestores de paquetes
		- repositorio github
		- convertir a github page
	- tecnologias:
		- comprobaremos que sean las ultimas tecnlogias x context 7 (web o MCP) y paginas documentacion oficial
		- trabajaremos con transiciones
		- trabajaremos con spec-kit:
			- https://github.com/github/spec-kit
			- [archivo](creacion_proyecto_speckit.md)
		- trabajaremos con astro version 6, tailwind version 4, htmx e islas react
		- los datos se crearan json dentro del mismo proyecto
		- arquitectura:
			- el proyecto sera modular y lo maximo reutilizables posible 
			- clean arquitecture astro:
				- (ejemplo)[https://github.com/victor7w7r/036astro]
				- (islas_react)[https://medium.com/jails-org/island-architecture-astro-jails-8e1a2405249d]
			- crear carpetas de api, components, utils, database, interficies
		- graficas utilizar (aperchat)[https://apexcharts.com/]
		- plantilla [astrowind](https://github.com/arthelokyo/astrowind)
		- no pareza diseñada por IA [guia_diseño_no_IA](guia-diseño_app_abril2026.md)
		- adaptaremos el proyecto de localhost a github-page mediante github-actions [guia_conversion](astro-V5-pasar_github-page.md)
		- no crearemos la carpeta '/dist':
			- haremos npm run test/preview
			- al final haremos 'npm run build'
</web>
<proceso>
# pautas proceso
- dividiras el proceso en fases y etapas segun necesidad:
	- no mas de 2 o 3 tareas x prompt
	- ordenes sencillas y claras destinadas aun newbie en la materia
	- dividir el proceso priorizando ls a sencillez, claridad, antialucionacion
	- confirmar y preguntar antes de la siguiente fase
	- no da por supuesto el entendiemiento y los procesos por mi parte
	- tus ordenes se  dividiran en varias fases: 
		- resumen:
			0. leer y entender ordenes
			1. hacer preguntas, propuestas y plan
			2. creat contenido en diferentes formatos
			3. crear diseño web y archivos de diseño
			4. configurar la estructura basica del proyecto
			5. comprobacion manual que funcione
			6. crear promps para trabajar on spec-kit
			7. test con playwright -cli o mcp en localhost
			8. adaptacion y conversion a para github_page
			9. subir con github actions y configurar github_page
			10. test completo de github page con -cli mcp

# proceso

## pre-proceso
	0. leer y entender ordenes
		- fase_lectura_reconomiento: leer archivos 2 veces y comprobar que se ha entedido lo mismo x evitar aluciones
		- fase_preguntas_pre_plan: hacer preguntas para elaborar propuestas
	1. hacer preguntas, propuestas y plan
		- elaborar_propuestas_exponer-propuestas
		- elaborar_plan
## contenido
	0. contenido
		- fuentes:
			-busqueda
				- buscar fuentes nuevas segun condicion del prompt
				- buscar en las sugeridas si son validas o no
			- crear archivo solo con fuentes:
				- añadir obligatorias
				- añadir validas de las sugeridas
				- añadir nuevas encontradas
		    - crear un contenido solo con las fuentes elegidas poner las en web
	1. extraer informacion util de las fuentes segun pedido en promp 
			- crear archivos markdown  divididos por lo pedido.
			- crear archivos de la informacion extraida para trabjar en la web:
				- contenido escritro en json para luego hacer interficies
				- contenido para hacer graficos para https://apexcharts.com/
				- contenido para hacer tablas csv o json segun necesidad
					- Tailwind Advanced Table
					- Tabla con adaptación móvil	
## archivos diseno no IA					
	0. crear diseño no IA
		- leer,buscar en funtes y procesar informacion [](guia-diseño_app_abril2026.md)
		- navegacion:
			- web (flechas, botones top al final, paginador( marcando la pagina señalada , y flechas))
			- mobil:
				- menu hamburguesa, eliminar footer , boton top flotante a media pagina
				- graficas sencillas y pequeñas o sin graficas. sustitucion x tablas.
		- hacerme varias propuestas:
			- paleta  no mas de 4 colores
			- letras segun funcion
			- elementos no simetricos
		- refencia de librerias a usar:
			| Necesidad | Solución | Por qué |
			| :--- | :--- | :--- |
			| **Librería UI principal** | Shadcn/ui + DaisyUI | Popularidad + Flexibilidad + Bundle mínimo |
			| **Tabla responsiva básica** | Tailwind Advanced Table | Funcional y probada |
			| **Tabla con adaptación móvil** | Responsive Icon Table | Patrón "cards en móvil" listo |
			| **Tabla con columnas fijas** | Sticky Column | Para datasets grandes |
			| **Gráficos** | Material Tailwind + ApexCharts | Plugin oficial, bien documentado |
			| **Bloques UI rápidos** | Bloqs (300+ bloques) | Copy-paste, sin dependencias  |
	1.  crear archivos base con ese diseño: configuracion,layout, index contenido basico con estos datos:
## creacion proyecto
0. guardar manual en git local a cada punto y crear ramas a cada fase

### proyecto fase manual
	0. crear proyecto base manualmente con ayuda tuya segun requsitos tecnicos basicos: 
		- instalacion frameworks  y librerias
		- configuracion base
		- estructura base
	1. fase prueba manual estructura basica para web como para mobiles
		- crear archivos ipso-lorum 
			- [generador_texto](www.lipsum.com)
			- probar con archivos-ipso lorum
		- añadir estilos y probar con estilos:
			- añadir estilos y letras en archivos configuracion,*.css
			- adaptar layouts, index y ipso-lorum de prueba
			- probar con estilos
			- eliminar archivos - ipso-lorum
		- crear skill con https://www.autoskills.sh/
### proyecto con spec kit
	0. crear mcp hacia carpeta donde este guardado el contenido.
		- crearemos esta carpeta solo para contenido para 'C:\Users\User\Documents\programacion2025\contenido'
		- crearemos MCP
		- crearemos archio prueba y probamos
		- eliminamos archivo prueba y lo llenamos con el contenido de la web
	1. instalamos el spec-kit
		- [spec_kit_guia](creacion_proyecto_speckit.md)
	2. crear promps para spec-kits [spec_kit_guia](creacion_proyecto_speckit.md) segun :
		- archivos creados de contenido
		- segun estilos creados
		- estructura
		- pauta del proyecto
		- trabajar con skill creadas:
			- te digo las creadas
			- dirrecion en el proyecto
		- refencia de librerias a usar:
			| Necesidad | Solución | Por qué |
			| :--- | :--- | :--- |
			| **Librería UI principal** | Shadcn/ui + DaisyUI | Popularidad + Flexibilidad + Bundle mínimo |
			| **Tabla responsiva básica** | Tailwind Advanced Table | Funcional y probada |
			| **Tabla con adaptación móvil** | Responsive Icon Table | Patrón "cards en móvil" listo |
			| **Tabla con columnas fijas** | Sticky Column | Para datasets grandes |
			| **Gráficos** | Material Tailwind + ApexCharts | Plugin oficial, bien documentado |
			| **Bloques UI rápidos** | Bloqs (300+ bloques) | Copy-paste, sin dependencias  |
	    - referencias al crear graficos:
		| Necesidad | Gráfico recomendado | Componente ApexCharts |
		| :--- | :--- | :--- |
		| Dashboard ejecutivo | Barras + Líneas combo | `type: 'line'` + `type: 'bar'` en serie combinada |
		| Análisis de temporadas | Líneas múltiples | `type: 'line'` con series array |
		| Composición de métricas | Donut con KPI central | `type: 'donut'` |
		| Heatmap de actividad | Mapa de calor | `type: 'heatmap'` |
		| Distribución geográfica | Mapa coroplético | `type: 'choropleth'` (requiere datos GeoJSON) |
		| Conversión funnel | Embudo | `type: 'funnel'` |
		- en la fase *specify* :
			- dividir lo en varios segun necesidad *specify*:
				- dividir las en ordenes cortas, precisas y tecnicas
				- trabajar  con  *clarify* despues de cada *specify* para mejorar y evitar errores
			- al acabar todos los *specify* y *clarify* hacer *checklist*
	3. hacer prueba con playwright -cli fase para web como para mobiles
	4. guardar en en rama ultima y merge para main
 ### adaptacion github page sin speckit
	0. documento referencia [guia_adaptacion_github_page](astro-V5-pasar_github-page.md)
	1. hacer adaptacion solo pagina principal y subirla
	2. hacer prueba fase prueba para web como para mobiles
	3. adaptamos links, paginadores, botones, flechas, migas de pan,...
	4. hacer prueba fase prueba para web como para mobiles
</proceso>