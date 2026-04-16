const { chromium } = require("playwright");

(async () => {
  const base = "http://127.0.0.1:4323/";
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let sc1 = 0;
  let sc2 = 0;

  for (let i = 0; i < 20; i++) {
    await page.goto(base, { waitUntil: "networkidle" });
    const headerOk = await page.locator("header").first().isVisible().catch(() => false);
    const heroOk = await page.locator("#inicio").isVisible().catch(() => false);
    const ctaOk = await page.locator('#inicio a[href*="#datos"]').first().isVisible().catch(() => false);
    if (headerOk && heroOk && ctaOk) sc1++;
  }

  for (let i = 0; i < 20; i++) {
    await page.goto(`${base}#datos`, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const sectionOk = await page.locator("#sectores").isVisible().catch(() => false);
    const chartCount = await page.locator("#sectores .apexcharts-canvas").count().catch(() => 0);
    if (sectionOk && chartCount >= 3) sc2++;
  }

  await browser.close();
  console.log(JSON.stringify({ sample: 20, sc1, sc1Pass: sc1 >= 19, sc2, sc2Pass: sc2 >= 19 }));
})();
