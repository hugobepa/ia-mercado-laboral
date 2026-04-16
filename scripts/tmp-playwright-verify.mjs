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

await check("GET /", async () => (await page.goto(`${base}/`, { waitUntil: "networkidle" }))?.status() === 200);
await check("GET /graficos (redir o 200)", async () => {
  const r = await page.goto(`${base}/graficos`, { waitUntil: "networkidle" });
  return r && [200, 301, 302, 307, 308].includes(r.status());
});
await check("GET /graficos/ 200", async () => (await page.goto(`${base}/graficos/`, { waitUntil: "networkidle" }))?.status() === 200);
await check("GET /fuentes (redir o 200)", async () => {
  const r = await page.goto(`${base}/fuentes`, { waitUntil: "networkidle" });
  return r && [200, 301, 302, 307, 308].includes(r.status());
});
await check("GET /fuentes/ 200", async () => (await page.goto(`${base}/fuentes/`, { waitUntil: "networkidle" }))?.status() === 200);

await page.goto(`${base}/`, { waitUntil: "networkidle" });
await check("Inicio sin seccion provincias", async () => (await page.locator("#provincias").count()) === 0);
await check("Inicio sin seccion graficos", async () => (await page.locator("#sectores").count()) === 0);

await page.goto(`${base}/graficos/`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await check("Graficos: host apex presente", async () => (await page.locator("[data-chart-type='apex']").count()) >= 3);
await check("Graficos: canvas renderizado", async () => (await page.locator(".apexcharts-canvas").count()) >= 1);

await page.goto(`${base}/fuentes/`, { waitUntil: "networkidle" });
await check("Fuentes sin seccion graficos", async () => (await page.locator("#sectores").count()) === 0);
await check("Fuentes con tabla/cards", async () => (await page.locator("table, article").count()) > 0);

console.log(JSON.stringify(out, null, 2));
await browser.close();
