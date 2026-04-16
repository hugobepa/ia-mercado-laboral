// Client-side validation for province selection and filtering
// Comprehensive validation with user feedback and error recovery

const BASE_URL = import.meta.env.BASE_URL || "/";

function withBasePath(path) {
  if (!path.startsWith("/")) {
    return path;
  }

  if (BASE_URL === "/") {
    return path;
  }

  const normalizedBase = BASE_URL.endsWith("/")
    ? BASE_URL.slice(0, -1)
    : BASE_URL;

  return `${normalizedBase}${path}`;
}

/**
 * Province Selection Validator
 * Handles client-side validation for province filtering with accessibility
 */
class ProvinceValidator {
  constructor() {
    this.validProvinces = new Set();
    this.validationRules = new Map();
    this.errorMessages = new Map();

    this.init();
  }

  /**
   * Initialize validator with province data and validation rules
   */
  async init() {
    try {
      // Load valid provinces from data sources
      await this.loadValidProvinces();

      // Set up validation rules
      this.setupValidationRules();

      // Set up event listeners
      this.setupEventListeners();

      console.log("ProvinceValidator initialized successfully");
    } catch (error) {
      console.error("Failed to initialize ProvinceValidator:", error);
    }
  }

  /**
   * Load valid provinces from available data
   */
  async loadValidProvinces() {
    // Default valid provinces (can be extended with dynamic loading)
    const provinces = [
      "all", // Special case for "all provinces"
      // Cataluña
      "barcelona",
      "girona",
      "lleida",
      "tarragona",
      // Madrid
      "madrid",
      // Andalucía
      "sevilla",
      "malaga",
      "cordoba",
      "granada",
      "almeria",
      "cadiz",
      "huelva",
      "jaen",
      // Valencia
      "valencia",
      "alicante",
      "castellon",
      // País Vasco
      "vizcaya",
      "guipuzcoa",
      "alava",
      // Galicia
      "a-coruna",
      "vigo",
      "lugo",
      "ourense",
      // Other provinces
      "zaragoza",
      "valladolid",
      "murcia",
    ];

    provinces.forEach((province) => {
      this.validProvinces.add(province.toLowerCase());
    });

    // Try to load additional provinces dynamically
    try {
      const response = await fetch(withBasePath("/api/provinces"));
      if (response.ok) {
        const additionalProvinces = await response.json();
        additionalProvinces.forEach((province) => {
          this.validProvinces.add(province.id.toLowerCase());
        });
      }
    } catch (error) {
      console.warn("Could not load additional provinces:", error);
    }
  }

  /**
   * Set up validation rules
   */
  setupValidationRules() {
    // Rule: Province must be in valid list
    this.validationRules.set("validProvince", {
      test: (value) => this.validProvinces.has(value.toLowerCase()),
      message: "La provincia seleccionada no es válida",
      severity: "error",
    });

    // Rule: Province must not be empty (unless "all" is allowed)
    this.validationRules.set("notEmpty", {
      test: (value) => value && value.trim() !== "",
      message: "Debes seleccionar una provincia",
      severity: "error",
    });

    // Rule: Check for potential typos in province names
    this.validationRules.set("noTypos", {
      test: (value) => {
        if (this.validProvinces.has(value.toLowerCase())) return true;

        // Check for close matches (simple Levenshtein distance)
        const similarProvinces = this.findSimilarProvinces(value);
        return similarProvinces.length === 0; // If we find similar ones, it might be a typo
      },
      message: (value) => {
        const similar = this.findSimilarProvinces(value);
        if (similar.length > 0) {
          return `¿Quisiste decir "${similar[0]}"?`;
        }
        return "Nombre de provincia no reconocido";
      },
      severity: "warning",
      suggestions: (value) => this.findSimilarProvinces(value),
    });

    // Rule: Check data availability
    this.validationRules.set("dataAvailable", {
      test: async (value) => {
        try {
          const response = await fetch(
            `${withBasePath("/api/check-data")}?province=${encodeURIComponent(value)}`,
          );
          return response.ok;
        } catch (error) {
          return false;
        }
      },
      message: "No hay datos disponibles para esta provincia",
      severity: "warning",
      async: true,
    });
  }

  /**
   * Set up event listeners for form validation
   */
  setupEventListeners() {
    // Validate on form submission
    document.addEventListener("submit", (event) => {
      const form = event.target;
      const provinceInput = form.querySelector('[name="province"]');

      if (provinceInput) {
        if (!this.validateProvinceSync(provinceInput.value)) {
          event.preventDefault();
          event.stopPropagation();
          this.showValidationError(provinceInput);
        }
      }
    });

    // Real-time validation on input change
    document.addEventListener("change", (event) => {
      if (event.target.matches('[name="province"]')) {
        this.validateProvinceRealtime(event.target);
      }
    });

    // Validate on input blur
    document.addEventListener(
      "blur",
      (event) => {
        if (event.target.matches('[name="province"]')) {
          this.validateProvinceSync(event.target.value, event.target);
        }
      },
      true,
    );

    // Handle HTMX events
    document.addEventListener("htmx:configRequest", (event) => {
      const provinceValue = event.detail.parameters.province;

      if (provinceValue && !this.validateProvinceSync(provinceValue)) {
        event.preventDefault();
        this.showValidationError(event.target, provinceValue);
      }
    });
  }

  /**
   * Synchronous validation for immediate feedback
   */
  validateProvinceSync(value, element = null) {
    if (!value) return false;

    const errors = [];
    const warnings = [];
    const suggestions = [];

    // Run synchronous validation rules
    for (const [ruleName, rule] of this.validationRules) {
      if (rule.async) continue; // Skip async rules for sync validation

      try {
        const isValid = rule.test(value);

        if (!isValid) {
          const message =
            typeof rule.message === "function"
              ? rule.message(value)
              : rule.message;

          if (rule.severity === "error") {
            errors.push({ rule: ruleName, message });
          } else {
            warnings.push({ rule: ruleName, message });
          }

          // Collect suggestions if available
          if (rule.suggestions) {
            suggestions.push(...rule.suggestions(value));
          }
        }
      } catch (error) {
        console.error(`Validation rule ${ruleName} failed:`, error);
      }
    }

    // Update UI with validation results
    if (element) {
      this.updateValidationUI(element, { errors, warnings, suggestions });
    }

    // Return true if no errors (warnings are allowed)
    return errors.length === 0;
  }

  /**
   * Real-time validation with debouncing
   */
  validateProvinceRealtime(element) {
    const value = element.value;

    // Clear previous timeout
    if (element.validationTimeout) {
      clearTimeout(element.validationTimeout);
    }

    // Debounce validation
    element.validationTimeout = setTimeout(() => {
      this.validateProvinceAsync(value, element);
    }, 300);
  }

  /**
   * Asynchronous validation including data availability checks
   */
  async validateProvinceAsync(value, element = null) {
    const syncResult = this.validateProvinceSync(value);

    if (!syncResult) return false; // Don't proceed if sync validation fails

    const asyncErrors = [];
    const asyncWarnings = [];

    // Run async validation rules
    for (const [ruleName, rule] of this.validationRules) {
      if (!rule.async) continue;

      try {
        const isValid = await rule.test(value);

        if (!isValid) {
          const message =
            typeof rule.message === "function"
              ? rule.message(value)
              : rule.message;

          if (rule.severity === "error") {
            asyncErrors.push({ rule: ruleName, message });
          } else {
            asyncWarnings.push({ rule: ruleName, message });
          }
        }
      } catch (error) {
        console.error(`Async validation rule ${ruleName} failed:`, error);
        asyncWarnings.push({
          rule: ruleName,
          message: "No se pudo verificar la disponibilidad de datos",
        });
      }
    }

    // Update UI with async results
    if (element) {
      this.updateValidationUI(element, {
        errors: asyncErrors,
        warnings: asyncWarnings,
      });
    }

    return asyncErrors.length === 0;
  }

  /**
   * Find similar province names for typo suggestions
   */
  findSimilarProvinces(input, threshold = 2) {
    const inputLower = input.toLowerCase();
    const similar = [];

    this.validProvinces.forEach((province) => {
      if (province === "all") return; // Skip "all" option

      const distance = this.levenshteinDistance(inputLower, province);

      if (distance <= threshold && distance > 0) {
        similar.push({ province, distance });
      }
    });

    // Sort by distance and return top matches
    return similar
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3)
      .map((item) => this.capitalizeProvinceName(item.province));
  }

  /**
   * Calculate Levenshtein distance between two strings
   */
  levenshteinDistance(str1, str2) {
    const matrix = Array(str2.length + 1)
      .fill(null)
      .map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i += 1) {
      matrix[0][i] = i;
    }

    for (let j = 0; j <= str2.length; j += 1) {
      matrix[j][0] = j;
    }

    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1, // deletion
          matrix[j - 1][i] + 1, // insertion
          matrix[j - 1][i - 1] + indicator, // substitution
        );
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * Capitalize province name properly
   */
  capitalizeProvinceName(province) {
    return province
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  /**
   * Update UI with validation results
   */
  updateValidationUI(
    element,
    { errors = [], warnings = [], suggestions = [] },
  ) {
    // Remove existing validation UI
    this.clearValidationUI(element);

    // Create validation container
    const container = this.createValidationContainer(element);

    // Show errors
    errors.forEach((error) => {
      const errorElement = this.createValidationMessage(
        error.message,
        "error",
        suggestions,
      );
      container.appendChild(errorElement);
    });

    // Show warnings
    warnings.forEach((warning) => {
      const warningElement = this.createValidationMessage(
        warning.message,
        "warning",
        suggestions,
      );
      container.appendChild(warningElement);
    });

    // Update ARIA attributes
    this.updateARIAAttributes(element, errors.length > 0, warnings.length > 0);

    // Announce to screen readers
    if (errors.length > 0) {
      this.announceToScreenReader(`Error de validación: ${errors[0].message}`);
    } else if (warnings.length > 0) {
      this.announceToScreenReader(`Advertencia: ${warnings[0].message}`);
    }
  }

  /**
   * Show validation error with specific styling and behavior
   */
  showValidationError(element, value = null) {
    const errorValue = value || element.value;

    // Highlight the input
    element.classList.add("border-red-500", "ring-red-500");
    element.setAttribute("aria-invalid", "true");

    // Focus the input
    element.focus();

    // Show error message
    this.validateProvinceSync(errorValue, element);
  }

  /**
   * Clear validation UI
   */
  clearValidationUI(element) {
    const existingContainer = element.parentNode.querySelector(
      ".validation-container",
    );
    if (existingContainer) {
      existingContainer.remove();
    }

    // Reset element classes
    element.classList.remove(
      "border-red-500",
      "ring-red-500",
      "border-yellow-500",
      "ring-yellow-500",
    );
    element.removeAttribute("aria-invalid");
    element.removeAttribute("aria-describedby");
  }

  /**
   * Create validation message container
   */
  createValidationContainer(element) {
    let container = element.parentNode.querySelector(".validation-container");

    if (!container) {
      container = document.createElement("div");
      container.className = "validation-container mt-1 space-y-1";
      element.parentNode.insertBefore(container, element.nextSibling);
    }

    return container;
  }

  /**
   * Create individual validation message
   */
  createValidationMessage(message, type, suggestions = []) {
    const messageElement = document.createElement("div");
    messageElement.className = `validation-message text-sm ${
      type === "error" ? "text-red-600" : "text-yellow-600"
    }`;

    const icon = type === "error" ? "⚠️" : "ℹ️";
    messageElement.innerHTML = `
      <span class="inline-flex items-center gap-1">
        <span aria-hidden="true">${icon}</span>
        <span>${message}</span>
      </span>
    `;

    // Add suggestions if available
    if (suggestions.length > 0) {
      const suggestionsList = document.createElement("div");
      suggestionsList.className = "mt-1 text-xs text-gray-600";
      suggestionsList.innerHTML = `
        <span>Sugerencias: </span>
        ${suggestions
          .map(
            (suggestion) =>
              `<button class="suggestion-btn text-blue-600 hover:underline focus:underline mr-2" 
                   onclick="selectSuggestion('${suggestion}')">${suggestion}</button>`,
          )
          .join("")}
      `;
      messageElement.appendChild(suggestionsList);
    }

    return messageElement;
  }

  /**
   * Update ARIA attributes for accessibility
   */
  updateARIAAttributes(element, hasErrors, hasWarnings) {
    const validationContainer = element.parentNode.querySelector(
      ".validation-container",
    );

    if (validationContainer) {
      const containerId = `validation-${Date.now()}`;
      validationContainer.id = containerId;
      element.setAttribute("aria-describedby", containerId);
    }

    if (hasErrors) {
      element.setAttribute("aria-invalid", "true");
      element.classList.add("border-red-500");
    } else if (hasWarnings) {
      element.classList.add("border-yellow-500");
    } else {
      element.removeAttribute("aria-invalid");
    }
  }

  /**
   * Announce messages to screen readers
   */
  announceToScreenReader(message) {
    const announcer =
      document.getElementById("validation-announcer") ||
      document.createElement("div");
    announcer.id = "validation-announcer";
    announcer.setAttribute("aria-live", "assertive");
    announcer.setAttribute("aria-atomic", "true");
    announcer.className = "sr-only";

    if (!announcer.parentNode) {
      document.body.appendChild(announcer);
    }

    announcer.textContent = message;

    setTimeout(() => {
      if (announcer.textContent === message) {
        announcer.textContent = "";
      }
    }, 3000);
  }
}

// Global function to handle suggestion selection
window.selectSuggestion = function (suggestion) {
  const activeElement = document.activeElement;
  const provinceInput =
    activeElement
      .closest(".province-filter")
      ?.querySelector('[name="province"]') ||
    document.querySelector('[name="province"]');

  if (provinceInput) {
    provinceInput.value = suggestion.toLowerCase();
    provinceInput.dispatchEvent(new Event("change", { bubbles: true }));
    provinceInput.focus();
  }
};

// Initialize validator when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const provinceValidator = new ProvinceValidator();

  // Expose to global scope for debugging
  window.ProvinceValidator = provinceValidator;
});

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = ProvinceValidator;
}
