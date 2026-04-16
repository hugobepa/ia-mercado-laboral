## 🔧 Configuración Completa: Smart Spec-Kit MCP en VS Code

### 📦 Instalación Paso a Paso

```bash
# 1. Instalar el CLI globalmente (recomendado)
npm install -g smart-spec-kit-mcp

# 2. O ejecutar directamente con npx (sin instalación)
npx smart-spec-kit-mcp setup
```

---

## ⚙️ Configuración de VS Code para MCP

### Opción A: Configuración Automática (Recomendada)

```bash
# Ejecuta el setup interactivo
npx smart-spec-kit-mcp setup

# Responde las preguntas:
# - ¿Proyecto actual o global? → project
# - ¿Framework? → astro (o tu stack)
# - ¿Incluir workflows? → yes
# - ¿Configurar MCP server? → yes
```

### Opción B: Configuración Manual

#### 1. Crear/Modificar `.vscode/settings.json`

```json
{
  "mcp": {
    "servers": {
      "spec-kit": {
        "command": "npx",
        "args": ["-y", "smart-spec-kit-mcp"],
        "env": {
          "SPEC_KIT_WORKSPACE": "${workspaceFolder}",
          "SPEC_KIT_FRAMEWORK": "astro"
        },
        "disabled": false,
        "autoApprove": [
          "speckit_specify",
          "speckit_plan",
          "speckit_tasks"
        ]
      }
    }
  },
  "github.copilot.advanced": {
    "mcpServers": ["spec-kit"]
  }
}
```

#### 2. Crear `.vscode/extensions.json` (extensiones recomendadas)

```json
{
  "recommendations": [
    "github.copilot",
    "github.copilot-chat",
    "github.vscode-github-actions"
  ]
}
```

---

## 🚀 Comandos Específicos del MCP

### Verificar Conexión MCP

```bash
# En VS Code: Ctrl+Shift+P → "Copilot: Open MCP Status"
# Deberías ver:
# ✅ spec-kit (connected)
```

### Comandos Slash Disponibles (ahora más rápidos)

| Comando | Función | Tiempo Vanilla | Tiempo con MCP |
|:---|:---|:---|:---|
| `/speckit.specify` | Crear especificación | 5-8 seg | **1-2 seg** |
| `/speckit.plan` | Generar plan | 8-12 seg | **2-3 seg** |
| `/speckit.tasks` | Desglosar tareas | 6-10 seg | **1-2 seg** |
| `/speckit.analyze` | Analizar consistencia | 10-15 seg | **3-4 seg** |
| `/speckit.implement` | Implementar código | 15-30 seg | **5-8 seg** |

### Flujo Optimizado con MCP

```bash
# Un solo prompt ejecuta múltiples comandos
/speckit.implement "Crea componente de login con Astro"

# El MCP automáticamente:
# 1. Detecta contexto actual
# 2. Verifica si hay spec/plan/tasks previos
# 3. Si no existen, los genera automáticamente
# 4. Ejecuta implementación
```

---

## 🧪 Verificación de Instalación

### Comandos de Diagnóstico

```bash
# 1. Verificar que el MCP server está corriendo
npx smart-spec-kit-mcp --version

# 2. Verificar estructura de archivos
ls -la .spec-kit/
ls -la .github/agents/
ls -la .github/skills/

# 3. Probar comando básico en VS Code
# Abre Copilot Chat (Ctrl+Shift+I) y escribe:
/speckit.help
```

### Estructura de Archivos Esperada

```bash
mi-proyecto/
├── .spec-kit/
│   ├── config.yml           # Configuración MCP
│   ├── workflows/           # Workflows YAML
│   │   ├── feature-quick.yaml
│   │   ├── feature-standard.yaml
│   │   └── feature-full.yaml
│   └── memory/              # Persistencia contexto
│       └── decisions.md
├── .github/
│   ├── agents/              # 6 agentes nativos
│   │   ├── spec-agent.md
│   │   ├── plan-agent.md
│   │   ├── tasks-agent.md
│   │   ├── gov-agent.md
│   │   ├── test-agent.md
│   │   └── conductor.md
│   ├── skills/              # 3 skills compartidos
│   │   ├── spec-driven-dev.md
│   │   ├── security-validation.md
│   │   └── api-design.md
│   └── prompts/             # Plantillas slash
│       └── speckit.*.md
└── .vscode/
    ├── settings.json        # Config MCP
    └── extensions.json      # Extensiones recomendadas
```

---

## ⚡ Trucos Avanzados con MCP Específico

### Truco 1: Workflow de una línea

```bash
# Ejecuta feature completa con un solo comando
/speckit.feature "Dashboard analytics con gráficos"

# El MCP ejecuta automáticamente:
# → /speckit.specify
# → /speckit.clarify (solo si hay ambigüedades)
# → /speckit.plan
# → /speckit.tasks
# → /speckit.analyze
# → /speckit.implement
```

### Truco 2: Memoria entre sesiones

```bash
# Sesión 1 (lunes)
/speckit.specify "API REST con autenticación JWT"
# Se guarda en .spec-kit/memory/decisions.md

# Sesión 2 (martes) - Copilot recuerda
/speckit.plan
# Copilot: "Basado en tu especificación de API REST con JWT..."
```

### Truco 3: Approval gates automáticos

```yaml
# .spec-kit/workflows/feature-standard.yaml
approval_gates:
  - step: specify
    require_confirmation: false  # automático
  - step: plan
    require_confirmation: true   # pide confirmación
  - step: implement
    require_confirmation: true   # pide confirmación
```

### Truco 4: Debug del MCP

```bash
# Ver logs en tiempo real
tail -f ~/.cache/smart-spec-kit-mcp/logs/mcp.log

# Modo debug
DEBUG=mcp:* npx smart-spec-kit-mcp
```

---

## 🔄 Actualización y Mantenimiento

```bash
# Actualizar a última versión
npm update -g smart-spec-kit-mcp

# O con npx (siempre última versión)
npx smart-spec-kit-mcp@latest setup

# Verificar versión actual
npx smart-spec-kit-mcp --version
```

---

## ✅ Checklist Final de Configuración

- [ ] Ejecuté `npx smart-spec-kit-mcp setup`
- [ ] `.vscode/settings.json` tiene configuración MCP
- [ ] VS Code muestra "✅ spec-kit (connected)" en MCP status
- [ ] `/speckit.help` responde en <1 segundo
- [ ] Los archivos se generan en `.spec-kit/` y `.github/`
- [ ] Copilot Chat reconoce comandos `/speckit.*`

---

## 🎯 Resumen: Antes vs Después

| Actividad | Antes (Vanilla) | Después (con MCP) |
|:---|:---|:---|
| Setup | 15-30 min manual | 30 seg `npx ... setup` |
| Crear spec | Copiar plantilla manual | `/speckit.specify` |
| Planificar | 5 comandos separados | Un comando con workflow |
| Contexto | Copilot olvida | Persistente entre sesiones |
| Build post-implementación | Manual | Automático en workflow |

**¿Configuración completada?** Prueba con:
```bash
/speckit.feature "Componente de navegación responsive con Astro"
```

¿Necesitas ayuda con algún error específico durante la configuración?