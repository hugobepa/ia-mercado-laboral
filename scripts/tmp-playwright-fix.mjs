import { chromium } from "playwright";

const base = "http://127.0.0.1:4327";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
const out = [];

const check = async (name, fn) => {
  try {
    const v = await fn();
    out.push({ name, ok: !!v, detail: String(v) });
  } catch (e) {
    out.push({ name, ok: false, detail: e?.message ?? String(e) });
  }
};

await page.goto(`${base}/`, { waitUntil: "networkidle" });
await check("Nav sin Provincias", async () => (await page.locator("text=Provincias").count()) === 0);

await check("Boton Ver datos clave existe", async () => (await page.locator("a:has-text('Ver datos clave')").count()) > 0);
await page.click("a:has-text('Ver datos clave')");
await page.waitForLoadState("networkidle");
await check("Boton navega a /graficos/#datos", async () => page.url().includes("/graficos/") && page.url().includes("#datos"));

await check("Datos muestra otros datos", async () => (await page.locator("text=Otros datos").count()) >= 1);

console.log(JSON.stringify(out, null, 2));
await browser.close();
