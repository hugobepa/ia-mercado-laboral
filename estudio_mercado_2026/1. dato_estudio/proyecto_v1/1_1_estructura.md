
```
ia-mercado-laboral/
├── .github/
│   └── workflows/
│       └── deploy.yml          # ← Para GitHub Pages (lo creamos después)
├── public/
│   └── 404.html                # ← CRÍTICO para GitHub Pages
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   └── Navigation.astro
│   │   ├── charts/
│   │   │   ├── BarChart.astro
│   │   │   └── DonutChart.astro
│   │   └── sections/
│   │       ├── Hero.astro
│   │       └── DataSection.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── PageLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── 404.astro
│   ├── styles/
│   │   └── global.css
│   ├── data/
│   │   ├── randstad-catalunya.json
│   │   ├── idescat-provincias.json
│   │   └── charts-config.json
│   └── utils/
│       ├── formatters.js
│       └── chart-helpers.js
├── astro.config.ts             # ← TypeScript, NO .mjs
├── tailwind.config.js
├── package.json
└── bun.lockb
```