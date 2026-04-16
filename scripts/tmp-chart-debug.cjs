const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const consoleErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  await page.goto("http://127.0.0.1:4323/#datos", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  const chartHosts = await page.locator("[data-chart-type='apex']").count();
  const chartCanvases = await page.locator(".apexcharts-canvas").count();
  const hasSectores = await page.locator("#sectores").count();

  console.log(
    JSON.stringify(
      { chartHosts, chartCanvases, hasSectores, consoleErrors },
      null,
      2,
    ),
  );

  await browser.close();
})();
