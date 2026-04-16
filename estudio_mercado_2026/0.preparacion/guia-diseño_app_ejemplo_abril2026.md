### inspiracion diseÃ±o ui/ux

| Plataforma 		| DescripciÃ³n 																		  | Precio 				| Enlace 										|
| :---------------- | :---------------------------------------------------------------------------------- | :----------------- 	| :-------------------------------------------- |
| **Behance** 		| Red social de Adobe para casos de estudio completos y procesos de diseÃ±o. 		  | Gratis 				| [Behance](https://www.behance.net/) 			|
| **Dribbble** 		| Red social lÃ­der para componentes UI, shots y tendencias visuales rÃ¡pidas. 		  | Gratis (NavegaciÃ³n) | [Dribbble](https://dribbble.com/) 			|
| **Awwwards** 		| GalerÃ­a de sitios web premiados, vanguardistas y altamente creativos. 			  | Gratis (NavegaciÃ³n) | [Awwwards](https://www.awwwards.com/) 		|
| **Godly** 		| GalerÃ­a de diseÃ±o web moderno, minimalista y enfocado en startups/SaaS. 			  | Gratis 	 			| [Godly](https://godly.website/) 				|
| **Collect UI** 	| InspiraciÃ³n diaria organizada por patrones, categorÃ­as y mÃ©tricas de popularidad.   | Gratis 	 			| [Collect UI](https://collectui.com/) 		 	|
| **SiteInspire** 	| GalerÃ­a curada manualmente con enfoque en diseÃ±o web limpio y funcional.            | Gratis 	 			| [SiteInspire](https://www.siteinspire.com/) 	|
| **Pttrns** 		| Biblioteca clÃ¡sica de patrones de diseÃ±o mÃ³vil organizados por flujo de usuario. 	  | Gratis 	 			| [Pttrns](https://pttrns.com/) 				|
| **Mobbin** 		| Biblioteca masiva de flujos y pantallas de apps reales (iOS/Android). 			  | Freemium 			| [Mobbin](https://mobbin.com/) 				|
| **Screenlane** 	| Capturas de interfaces mÃ³viles recientes con filtros por tipo de pantalla. 		  | Freemium 			| [Screenlane](https://screenlane.com/) 		|
| **UI Sources** 	| Enfoque en interacciÃ³n, micro-interacciones y experiencia de usuario (UX). 		  | Freemium 			| [UI Sources](https://www.uisources.com/) 		|
| **refero** 		| plataforma inspiraciÃ³n y biblioteca de referencias diseÃ±ada para diseÃ±adores UX/UI  | gratis 	 			| [refero](https://refero.design/) 				|
| **awesome_design**| repositorio con el diseÃ±o y ordenes de las 55 web imporntes de marca 				  | gratis 	 			| [awesome_design](https://github.com/VoltAgent/awesome-design-md) |

### INDISPIACION 404

## 404

| Sitio Web                       | DescripciÃ³n                                | Enlace                                                                                                                       |
| :------------------------------ | :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **Templates 404**               | Plantillas de pÃ¡ginas 404                  | [https://dev.to/stackfindover/35-html-404-page-templates-5bge](https://dev.to/stackfindover/35-html-404-page-templates-5bge) |
| **github 404 css**              | repos github templates 404_css             | [github_topics_404_css](https://github.com/topics/404-pages?l=css 										  					  |
| **github 404 html**             | repos github Plantillas de 404             | [github_404_template_html](https://github.com/topics/404-template?l=html&o=desc&s=stars) 								  	  |
| **github 404 error**            | repos github 404 error                 	   | [github_404_error](https://github.com/topics/404-error-page?o=asc) 														  |
| **github page custom 404**      | github page config custom 404              | [github-page_custom_404](https://docs.github.com/es/enterprise-cloudlatest/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site) |
| **Templates 404**               | Plantillas de pÃ¡ginas 404                  | [https://dev.to/stackfindover/35-html-404-page-templates-5bge](https://dev.to/stackfindover/35-html-404-page-templates-5bge) |




# 🎨 Guía de Referencia UI/UX 2026
### Diseño Diferenciado • Sin Estética IA • Recursos Gratuitos • Tailwind + CSS

> **Objetivo**: Crear productos digitales con identidad propia, evitando los clichés de IA (lilas, azules genéricos, gradientes artificiales). Esta guía prioriza autenticidad, accesibilidad y tendencias validadas [[1]][[4]].

---

## 🚫 Lo que EVITAREMOS (Señales de "Hecho por IA")

| Elemento | Por qué evitarlo | Alternativa humana |
|----------|-----------------|-------------------|
| 🔵 Azules/lilas saturados | Sobreutilizados en demos de IA | Tonos tierra, terracota, verdes apagados [[4]] |
| ✨ Gradientes arcoíris | Parecen generados automáticamente | Degradados sutiles de una misma familia cromática [[4]] |
| 🤖 Ilustraciones 3D genéricas | Sin personalidad, muy repetitivas | Fotografía auténtica, ilustración artesanal o minimalismo tipográfico |
| 📐 Layouts perfectamente simétricos | Falta de humanidad | Asimetría intencional, espacios en blanco orgánicos [[13]] |
| 🎨 Paletas de 6+ colores | Sobrecarga visual | **Máximo 3-4 colores** con jerarquía clara |
| ⚪ Blancos puros de fondo | Fatiga visual | Tonos "Cloud Dancer" o crema cálido para reducir fatiga [[4]] |

---

## 🎨 Paletas de Color por Industria (3-4 colores máx.)

> ✅ Todas las paletas cumplen ratio de contraste WCAG AA (4.5:1 mínimo para texto) [[39]][[41]]

### 🏃 Deporte & Fitness
*Energía sin caer en lo obvio*

```css
/* CSS Variables */
:root {
  --color-primary: #C86405;    /* Terracota vibrante - acción */
  --color-secondary: #4A7C59;  /* Verde bosque - equilibrio */
  --color-neutral: #F5F1E6;    /* Crema cálido - fondo */
  --color-text: #2C2C2C;       /* Carbón - texto */
}
```

```js
// Tailwind CSS Config
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#C86405', hover: '#A55204' },
        secondary: { DEFAULT: '#4A7C59', hover: '#3A6246' },
        neutral: { DEFAULT: '#F5F1E6', dark: '#E8E1D1' },
        text: { DEFAULT: '#2C2C2C', light: '#5A5A5A' }
      }
    }
  }
}
```

> Inspiración: Paletas deportivas con tonos cálidos que transmiten potencia sin recurrir al azul corporativo [[53]].

---

### 💼 Negocios & Servicios Profesionales
*Confianza moderna, sin frialdad*

```css
/* CSS Variables */
:root {
  --color-primary: #B46D46;    /* Bronce terroso - autoridad cálida */
  --color-secondary: #6B7F6A;  /* Verde salvia - crecimiento */
  --color-neutral: #F8F5F0;    /* Marfil - limpieza visual */
  --color-text: #3A3A3A;       /* Gris profundo - jerarquía */
}
```

```js
// Tailwind CSS Config
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#B46D46', hover: '#965A3A' },
        secondary: { DEFAULT: '#6B7F6A', hover: '#556654' },
        neutral: { DEFAULT: '#F8F5F0', dark: '#EBE5DC' },
        text: { DEFAULT: '#3A3A3A', light: '#6B6B6B' }
      }
    }
  }
}
```

> Los tonos tierra y verdes apagados proyectan profesionalismo con calidez humana [[1]][[90]].

---

### 🍽️ Restaurantes & Gastronomía
*Estimular el apetito con sofisticación*

```css
/* CSS Variables */
:root {
  --color-primary: #D68A6B;    /* Terracota suave - calidez/comida */
  --color-secondary: #A0A088;  /* Verde oliva - frescura/natural */
  --color-neutral: #F7F3E8;    /* Hueso - elegancia minimalista */
  --color-text: #4A4A4A;       /* Gris cálido - legibilidad */
}
```

```js
// Tailwind CSS Config
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#D68A6B', hover: '#C47555' },
        secondary: { DEFAULT: '#A0A088', hover: '#8A8A72' },
        neutral: { DEFAULT: '#F7F3E8', dark: '#ECE6D8' },
        text: { DEFAULT: '#4A4A4A', light: '#7A7A7A' }
      }
    }
  }
}
```

> Los tonos cálidos como terracota y dorado estimulan el apetito y crean ambientes acogedores [[56]][[62]].

---

### 👗 Moda & E-commerce (Ropa)
*Estilo atemporal con toque moderno*

```css
/* CSS Variables */
:root {
  --color-primary: #C37A67;    /* Rosa arcilla - sofisticación */
  --color-secondary: #747C70;  /* Gris verde - neutralidad elegante */
  --color-neutral: #FFFFFF;    /* Blanco puro - limpieza visual */
  --color-text: #2E2E2E;       /* Negro suave - contraste premium */
}
```

```js
// Tailwind CSS Config
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#C37A67', hover: '#B06554' },
        secondary: { DEFAULT: '#747C70', hover: '#5E665A' },
        neutral: { DEFAULT: '#FFFFFF', dark: '#F5F5F5' },
        text: { DEFAULT: '#2E2E2E', light: '#5A5A5A' }
      }
    }
  }
}
```

> Las tendencias 2026 favorecen tonos tierra y neutros cálidos para marcas de moda [[68]][[70]].

---

### 🥦 Alimentación & Orgánicos
*Frescura, naturalidad y confianza*

```css
/* CSS Variables */
:root {
  --color-primary: #8BAE9B;    /* Verde menta apagado - frescura */
  --color-secondary: #E7BABA;  /* Rosa suave - cercanía humana */
  --color-neutral: #FCF7EF;    /* Crema natural - pureza */
  --color-text: #3D3D3D;       /* Gris neutro - legibilidad */
}
```

```js
// Tailwind CSS Config
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#8BAE9B', hover: '#749A87' },
        secondary: { DEFAULT: '#E7BABA', hover: '#DCA5A5' },
        neutral: { DEFAULT: '#FCF7EF', dark: '#F2EBD9' },
        text: { DEFAULT: '#3D3D3D', light: '#6B6B6B' }
      }
    }
  }
}
```

> Los earth tones transmiten naturalidad y son ideales para marcas sostenibles [[154]][[156]].

---

### ✍️ Blogs Personales & Creativos
*Personalidad sin distracciones*

```css
/* CSS Variables */
:root {
  --color-primary: #7B6F72;    /* Gris lavanda apagado - creatividad sutil */
  --color-secondary: #C9A49A;  /* Rosa viejo - calidez humana */
  --color-neutral: #F9F2F0;    /* Rosa pálido - fondo acogedor */
  --color-text: #3E3A39;       /* Marrón grisáceo - lectura cómoda */
}
```

```js
// Tailwind CSS Config
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#7B6F72', hover: '#655A5D' },
        secondary: { DEFAULT: '#C9A49A', hover: '#B88E84' },
        neutral: { DEFAULT: '#F9F2F0', dark: '#F0E5E0' },
        text: { DEFAULT: '#3E3A39', light: '#6B6563' }
      }
    }
  }
}
```

> Tipografía expresiva y colores vibrantes hacen que el texto sea imposible de ignorar y añade calidez [[11]].

---

## 🔤 Tipografía por Tema (Google Fonts - 100% Gratis)

> Todas las fuentes son open-source y libres para uso comercial [[57]][[58]]

### 🏃 Deporte & Fitness
```css
/* Combinación: Energía + Legibilidad */
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@600;700&family=Inter:wght@400;500&display=swap');

:root {
  --font-heading: 'Barlow', sans-serif;    /* Títulos: Bold, dinámico */
  --font-body: 'Inter', sans-serif;        /* Cuerpo: Legible, neutro */
}
```
- **Barlow**: Geométrica con personalidad, ideal para titulares de acción [[53]]
- **Inter**: Optimizada para interfaces, excelente legibilidad en pantallas

### 💼 Negocios & Servicios
```css
/* Combinación: Profesionalismo + Calidez */
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;700&family=Source+Sans+3:wght@400;500&display=swap');

:root {
  --font-heading: 'Manrope', sans-serif;   /* Títulos: Moderno, confiable */
  --font-body: 'Source Sans 3', sans-serif;/* Cuerpo: Amigable, profesional */
}
```
- **Manrope**: Sans-serif moderna con excelente jerarquía visual [[57]]
- **Source Sans 3**: Primera fuente open-source de Adobe, optimizada para UI

### 🍽️ Restaurantes & Gastronomía
```css
/* Combinación: Elegancia + Legibilidad */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@400;500&display=swap');

:root {
  --font-heading: 'Playfair Display', serif; /* Títulos: Editorial, sofisticado */
  --font-body: 'Lato', sans-serif;           /* Cuerpo: Cálido, legible */
}
```
- **Playfair Display**: Serif elegante para transmitir calidad y tradición [[52]]
- **Lato**: "Serio pero amigable", perfecto para descripciones de menú

### 👗 Moda & E-commerce
```css
/* Combinación: Minimalismo + Estilo */
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500&display=swap');

:root {
  --font-heading: 'DM Serif Display', serif; /* Títulos: Editorial, premium */
  --font-body: 'DM Sans', sans-serif;        /* Cuerpo: Limpio, moderno */
}
```
- **DM Serif Display**: Serif contemporáneo para titulares de impacto [[57]]
- **DM Sans**: Geométrico pero cálido, ideal para e-commerce

### 🥦 Alimentación & Orgánicos
```css
/* Combinación: Natural + Accesible */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;700&family=Plus+Jakarta+Sans:wght@400;500&display=swap');

:root {
  --font-heading: 'Fraunces', serif;         /* Títulos: Orgánico, artesanal */
  --font-body: 'Plus Jakarta Sans', sans-serif; /* Cuerpo: Fresco, legible */
}
```
- **Fraunces**: Serif con personalidad "hecha a mano", ideal para marcas naturales [[13]]
- **Plus Jakarta Sans**: Moderna y amigable, excelente para contenido informativo

### ✍️ Blogs Personales & Creativos
```css
/* Combinación: Expresividad + Lectura */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Lexend:wght@400;500&display=swap');

:root {
  --font-heading: 'Space Grotesk', sans-serif; /* Títulos: Único, con carácter */
  --font-body: 'Lexend', sans-serif;           /* Cuerpo: Optimizado para lectura */
}
```
- **Space Grotesk**: Sans-serif con toques geométricos únicos [[57]]
- **Lexend**: Diseñada científicamente para mejorar la velocidad de lectura

---

## 🛠️ Herramientas Gratuitas y Repositorios

### 🎨 Generadores de Paletas de Color
| Herramienta | Características | Enlace |
|------------|----------------|--------|
| **Coolors** | Generación instantánea con spacebar, extracción de imágenes, check de accesibilidad [[36]][[63]] | [coolors.co](https://coolors.co) |
| **Adobe Color** | Armonías basadas en teoría del color, integración con Creative Cloud [[34]] | [color.adobe.com](https://color.adobe.com) |
| **ColorSpace** | Generador de gradientes y paletas matching [[38]] | [mycolor.space](https://mycolor.space) |
| **UI Colors** | Generador específico para Tailwind CSS con exportación directa [[93]] | [uicolors.app](https://uicolors.app) |

### 🔤 Recursos de Tipografía
| Recurso | Descripción | Enlace |
|---------|------------|--------|
| **Typewolf Google Fonts** | Curated collection de las 40 mejores fuentes gratis para web [[57]] | [typewolf.com/google-fonts](https://www.typewolf.com/google-fonts) |
| **Google Fonts** | +1500 fuentes open-source, integración nativa con Figma, Canva, etc. [[58]] | [fonts.google.com](https://fonts.google.com) |
| **Font Pairings by Heather Jones** | Combinaciones probadas para webs profesionales [[52]] | [heather-jones.com](https://heather-jones.com/google-font-pairings/) |

### 🧩 UI Kits & Recursos de Diseño (Figma)
| Recurso | Tipo | Enlace |
|---------|------|--------|
| **Plus UI Free Kit** | Design System completo con variables y auto-layout para 2026 [[69]] | [Figma Community](https://www.figma.com/community/file/1310670219738074447) |
| **iOS 26 UI Kit** | Componentes nativos para iPhone/iPad actualizados [[75]][[77]] | [freefigmamockups.com](https://freefigmamockups.com/ios-ipados-26-ui-kit-figma/) |
| **Material 3 Design Kit** | Sistema oficial de Google para Android [[77]] | [Figma Community](https://www.figma.com/community) |
| **Figma Community** | +1000 templates gratuitos filtrables por categoría [[26]][[28]] | [figma.com/community](https://www.figma.com/community) |

### 🖼️ Ilustraciones & Assets Gratuitos
| Recurso | Tipo | Licencia |
|---------|------|----------|
| **unDraw** | Ilustraciones SVG personalizables, sin atribución requerida [[79]][[80]] | Open Source |
| **Undesign** | Biblioteca de arte e ilustraciones free para proyectos [[86]] | Free |
| **Free Illustrations XYZ** | Colección curada de recursos SVG/PNG [[83]] | Varies (check each) |

### 📚 Repositorios de Diseño (Inspiración + Código)
| Recurso | Descripción | Enlace |
|---------|------------|--------|
| **Awesome DESIGN.md** | Colección de DESIGN.md para que agentes de IA generen UI consistente (tu referencia) [[GitHub]] | [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) |
| **Mobbin** | Biblioteca de patrones de UI reales de apps populares (con previews animadas) [[4]] | [mobbin.com](https://mobbin.com) |
| **UIUX Repo** | Recursos free para Figma, Sketch, XD organizados por categoría [[20]] | [uiuxrepo.com](https://www.uiuxrepo.com) |

### ♿ Validación de Accesibilidad
| Herramienta | Función | Enlace |
|------------|---------|--------|
| **WebAIM Contrast Checker** | Verifica ratio de contraste WCAG AA/AAA [[44]] | [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/) |
| **Color Contrast Analyzer** | Extensión para Figma/Chrome que valida contraste en tiempo real [[45]] | [accessibleweb.com](https://accessibleweb.com/color-contrast-checker/) |
| **MDN Accessibility Guide** | Documentación oficial de estándares WCAG 2.2 [[41]][[46]] | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility) |

---

## 📐 Principios de Diseño Moderno (2026)

### ✅ DO's: Lo que SÍ funciona
1. **Neutral-First Design**: Usa beiges, off-whites y grises suaves como base, dejando que los acentos destaquen [[1]]
2. **Tipografía expresiva**: Combina pesos contrastados y kerning juguetón para añadir ritmo [[10]][[11]]
3. **Gradientes sutiles**: Degradados low-contrast y atmosféricos solo para backgrounds/hero sections [[4]]
4. **Asimetría intencional**: Rompe la cuadrícula de forma deliberada para añadir humanidad [[13]]
5. **Dark mode nativo**: Diseña sistemas de color adaptativos desde el inicio [[2]][[14]]

### ❌ DON'Ts: Lo que EVITAR
1. **Paletas genéricas de IA**: Evita lilas (#8B5CF6), azules eléctricos (#3B82F6) y gradientes arcoíris
2. **Sobrecarga visual**: Máximo 3-4 colores + escala de grises para texto
3. **Ilustraciones 3D stock**: Prefiere fotografía auténtica o ilustración con estilo propio
4. **Simetría perfecta**: Los layouts demasiado "limpios" parecen generados por algoritmo
5. **Ignorar accesibilidad**: Todo texto debe cumplir 4.5:1 de contraste mínimo [[39]][[41]]

---

## 🚀 Checklist de Implementación Rápida

```markdown
## [ ] Paleta de Color
- [ ] 3-4 colores máximo definidos en CSS variables + Tailwind config
- [ ] Contraste validado con herramienta WCAG (mín. 4.5:1 para texto)
- [ ] Tonos hover/focus definidos para interacción

## [ ] Tipografía
- [ ] 2 fuentes máximo (heading + body) de Google Fonts
- [ ] Escala tipográfica definida (h1-h6, body, small)
- [ ] Line-height optimizado para lectura (1.5-1.7 para body)

## [ ] Componentes Base
- [ ] Botones con estados: default, hover, active, disabled
- [ ] Cards con sistema de elevación consistente (shadow o border)
- [ ] Inputs con focus visible y mensajes de error accesibles

## [ ] Responsive
- [ ] Breakpoints definidos (mobile: <640px, tablet: 640-1024px, desktop: >1024px)
- [ ] Touch targets mín. 44x44px para móviles
- [ ] Tipografía fluida con clamp() o escalado responsive

## [ ] Accesibilidad
- [ ] Alt text en todas las imágenes
- [ ] Navegación por teclado funcional
- [ ] Focus visible en todos los elementos interactivos
```

---

> 💡 **Pro Tip**: Usa el formato `DESIGN.md` del repositorio de referencia [[GitHub]] para documentar tu sistema de diseño. Los agentes de IA lo leerán directamente y generarán UI consistente con tu visión, sin caer en clichés genéricos.

```markdown
<!-- Ejemplo mínimo de DESIGN.md -->
# DESIGN.md - Mi Proyecto

## Color Palette
- primary: #C86405 (botones, CTAs)
- secondary: #4A7C59 (acento secundario)
- neutral: #F5F1E6 (fondos)
- text: #2C2C2C (contenido principal)

## Typography
- heading: 'Barlow', 600-700
- body: 'Inter', 400-500
- scale: h1: 2.5rem, h2: 2rem, body: 1rem

## Components
- Button: rounded-lg, padding: 0.75rem 1.5rem, transition: all 0.2s
- Card: shadow-sm, border: 1px solid neutral-200, rounded-xl
```

---

*Esta guía se actualiza constantemente con tendencias validadas. Última revisión: Abril 2026.*  
*Fuentes consultadas: [[1]][[4]][[10]][[13]][[36]][[57]][[79]] y repositorio Awesome DESIGN.md.*