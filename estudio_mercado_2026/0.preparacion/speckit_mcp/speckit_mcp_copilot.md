## 📊 Comparativa de Planes de GitHub Copilot (2026)

| Plan | Precio mensual | Completions | Premium Requests | Agentes | Modelos disponibles | ¿Bueno para Spec-Kit? |
|:---|:---|:---|:---|:---|:---|:---|
| **Free** | $0 | 2,000/mes | 50/mes | ❌ No | Limitado (Claude 3.5 Sonnet, GPT-4o) | ⚠️ Muy limitado |
| **Pro** ✅ | **$10** | **Ilimitadas** | **300/mes** | ✅ Sí (coding agent) | Completo (Claude Opus 4.6, GPT-5.3-Codex, Gemini 3 Pro) | ✅ **Recomendado** |
| **Pro+** | $39 | Ilimitadas | 1,500/mes | ✅ Sí + priority access | Todos + acceso prioritario | ✅ Para uso intensivo |
| **Business** | $19/usuario | Ilimitadas | Ilimitadas | ✅ Sí | Completo | ✅ Equipos |
| **Enterprise** | $39/usuario | Ilimitadas | Ilimitadas | ✅ Sí + custom models | Completo + modelos personalizados | ✅ Empresas |

---

## 🎯 Análisis: ¿Por qué Copilot Pro a $10 es la mejor opción para Spec-Kit?

### 1. Spec-Kit requiere comandos slash (`/speckit.*`)

Spec-Kit funciona mediante comandos como `/speckit.specify`, `/speckit.plan`, `/speckit.tasks` y `/speckit.implement` . Estos comandos se ejecutan en **Copilot Chat** y consumen **premium requests**.

| Comando Spec-Kit | Función | Consumo |
|:---|:---|:---|
| `/speckit.specify` | Crea especificación desde descripción | 1 premium request |
| `/speckit.clarify` | Análisis de ambigüedades | 1 premium request |
| `/speckit.plan` | Genera plan técnico | 1 premium request |
| `/speckit.tasks` | Desglosa en tareas | 1 premium request |
| `/speckit.analyze` | Verifica consistencia | 1 premium request |
| `/speckit.implement` | Ejecuta implementación automática | 1+ premium requests |

### 2. Cálculo de consumo mensual con Spec-Kit

Si trabajas con **una feature por semana** (4 features/mes):

| Actividad | Requests por feature | Total mensual |
|:---|:---|:---|
| Especificación (`/speckit.specify`) | 1 | 4 |
| Clarificación (`/speckit.clarify`) | 2-3 | 10 |
| Plan (`/speckit.plan`) | 1 | 4 |
| Tareas (`/speckit.tasks`) | 1 | 4 |
| Análisis (`/speckit.analyze`) | 1 | 4 |
| Implementación (`/speckit.implement`) | 5-10 | 30 |
| **Total** | **11-17** | **~56** |

**Conclusión:** El uso normal de Spec-Kit consume ~50-100 premium requests/mes. El plan **Pro (300)** es más que suficiente. El plan **Free (50)** se quedaría corto .

### 3. Modelos necesarios para Spec-Kit

Spec-Kit funciona mejor con modelos potentes para:
- **Planificación arquitectónica** → Claude Opus 4.6 o GPT-5.3-Codex
- **Generación de tareas** → Claude Sonnet 4.6
- **Implementación autónoma** → GPT-5.3-Codex

| Modelo | Plan Free | Plan Pro ($10) | Plan Pro+ ($39) |
|:---|:---|:---|:---|
| Claude 3.5 Sonnet | ✅ | ✅ | ✅ |
| GPT-4o | ✅ | ✅ | ✅ |
| **Claude Opus 4.6** | ❌ | ✅ (3x costo) | ✅ |
| **GPT-5.3-Codex** | ❌ | ✅ (1x costo) | ✅ |
| **Gemini 3 Pro** | ❌ | ✅ | ✅ |

**Pro ($10) desbloquea todos los modelos necesarios** para Spec-Kit .

---

## 🔧 Smart Spec-Kit MCP: La herramienta que necesitas

Para maximizar el valor de Copilot Pro con Spec-Kit, existe **`smart-spec-kit-mcp`** :

```bash
npx smart-spec-kit-mcp setup
```

### ¿Qué instala automáticamente?

| Componente | Ubicación | Función |
|:---|:---|:---|
| **6 Agentes nativos** | `.github/agents/` | Spec, Plan, Governance, Test, Conductor, Implement |
| **3 Skills compartidos** | `.github/skills/` | spec-driven-dev, security-validation, api-design |
| **Slash commands** | `.github/prompts/` | `/speckit.*` para Copilot |
| **Workflows YAML** | `.spec-kit/workflows/` | feature-quick, feature-standard, feature-full |
| **MCP Server** | Configura VS Code | Comunicación nativa con Copilot |

### Ventajas frente a GitHub Spec-Kit vanilla

| Aspecto | GitHub Spec-Kit | Smart Spec-Kit MCP |
|:---|:---|:---|
| Instalación | Copiar manual archivos | `npx ... setup` |
| Actualización | Volver a copiar | `npx ...@latest setup` |
| Workflows | Manual | Automatizados con approval gates |
| Agentes | Prompts fijos | Personalizables (`.spec-kit/agents/`) |
| MCP Server | ❌ | ✅ |


---

## 📝 Setup recomendado para Copilot Pro + Spec-Kit

```bash
# 1. Suscríbete a Copilot Pro ($10/mes)
# 2. Instala Smart Spec-Kit MCP
npx smart-spec-kit-mcp setup

# 3. Configura VS Code (automático con el setup)
# Verifica en .vscode/settings.json:
{
  "mcp": {
    "servers": {
      "spec-kit": {
        "command": "npx",
        "args": ["-y", "smart-spec-kit-mcp"]
      }
    }
  }
}

# 4. Comienza una feature
/speckit.specify "Implementar autenticación con OAuth2"
```

¿Necesitas que profundice en la configuración de Smart Spec-Kit MCP o en algún comando específico de Copilot para Spec-Kit?