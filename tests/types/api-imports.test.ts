// Type safety test para prevenir regresión
import { DataUtils } from "../../../src/utils/data-loader.ts";
import { formatPercent } from "../../../src/utils/formatters.js";
import { PROVINCES } from "../../../src/utils/province-filter.ts";

// Test de tipos compiletime
const testTypes = async () => {
  // ✅ DataUtils debe tener getOverviewData
  const data = await DataUtils.getOverviewData("all");

  // ✅ formatPercent debe aceptar number|null y devolver string
  const formatted: string = formatPercent(12.5);

  // ✅ PROVINCES debe ser array
  const count: number = PROVINCES.length;

  // ✅ data debe tener estructura correcta
  const unemployment = data.unemployment;
  const aiImpact = data.aiImpact;
};

export default testTypes;
