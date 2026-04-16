import { chromium } from "playwright";

const cliArgs = process.argv.slice(2);
const forceHeaded = cliArgs.includes("--headed");
const targetUrl =
  cliArgs.find((arg) => arg !== "--headed" && /^https?:\/\//i.test(arg)) ??
  "http://localhost:4322/";
const timeoutMs = 15000;
const baseLaunchTimeoutMs = 45000;

const checks = [];

const record = (name, pass, details) => {
  checks.push({ name, pass, details });
  const status = pass ? "PASS" : "FAIL";
  // Keep CLI output easy to scan in CI logs.
  console.log(`[${status}] ${name}${details ? ` -> ${details}` : ""}`);
};

const readStyle = async (page, selector) => {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) {
      return null;
    }

    const cs = getComputedStyle(el);
    return {
      display: cs.display,
      opacity: cs.opacity,
      pointerEvents: cs.pointerEvents,
    };
  }, selector);
};

const launchBrowser = async () => {
  const attempts = forceHeaded
    ? [
        { browser: "chromium", channel: undefined, headless: false },
        { browser: "msedge", channel: "msedge", headless: false },
      ]
    : [
        { browser: "chromium", channel: undefined, headless: true },
        { browser: "msedge", channel: "msedge", headless: true },
        { browser: "chromium", channel: undefined, headless: false },
        { browser: "msedge", channel: "msedge", headless: false },
      ];

  let lastError = null;
  for (const attempt of attempts) {
    try {
      console.log(
        `[INFO] Launch attempt: ${attempt.browser} (${attempt.headless ? "headless" : "headed"})`,
      );
      return await chromium.launch({
        channel: attempt.channel,
        headless: attempt.headless,
        timeout: baseLaunchTimeoutMs,
      });
    } catch (error) {
      lastError = error;
      console.warn(
        `[WARN] Launch failed: ${attempt.browser} (${attempt.headless ? "headless" : "headed"})`,
      );
    }
  }

  throw lastError ?? new Error("Unable to launch a Playwright browser");
};

const main = async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 },
  });

  try {
    await page.goto(targetUrl, {
      waitUntil: "networkidle",
      timeout: timeoutMs,
    });

    const title = await page.title();
    record("Page loaded", !/Error\s*\d{3}/i.test(title), `title: ${title}`);

    const styleStats = await page.evaluate(() => {
      const body = getComputedStyle(document.body);
      return {
        styleSheets: document.styleSheets.length,
        bodyBg: body.backgroundColor,
      };
    });

    record(
      "Global CSS loaded",
      styleStats.styleSheets > 0 && styleStats.bodyBg !== "rgba(0, 0, 0, 0)",
      `stylesheets: ${styleStats.styleSheets}, bodyBg: ${styleStats.bodyBg}`,
    );

    const desktopMenuBtn = await readStyle(
      page,
      'button[aria-label="Abrir menu"]',
    );
    record(
      "Hamburger hidden on desktop",
      desktopMenuBtn !== null && desktopMenuBtn.display === "none",
      desktopMenuBtn
        ? `display: ${desktopMenuBtn.display}`
        : "button not found",
    );

    await page.evaluate(() =>
      window.scrollTo({ top: 1400, behavior: "instant" }),
    );
    await page.waitForTimeout(250);

    const desktopBackTop = await readStyle(page, "#back-to-top");
    const backTopVisibleDesktop =
      desktopBackTop !== null &&
      desktopBackTop.display !== "none" &&
      Number.parseFloat(desktopBackTop.opacity) > 0;

    record(
      "Back-to-top visible after desktop scroll",
      backTopVisibleDesktop,
      desktopBackTop
        ? `display: ${desktopBackTop.display}, opacity: ${desktopBackTop.opacity}`
        : "button not found",
    );

    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload({ waitUntil: "networkidle", timeout: timeoutMs });

    const mobileMenuBtn = await readStyle(
      page,
      'button[aria-label="Abrir menu"]',
    );
    const mobileMenuVisible =
      mobileMenuBtn !== null && mobileMenuBtn.display !== "none";
    record(
      "Hamburger visible on mobile",
      mobileMenuVisible,
      mobileMenuBtn ? `display: ${mobileMenuBtn.display}` : "button not found",
    );

    const failed = checks.filter((c) => !c.pass).length;
    console.log(
      `\nSummary: ${checks.length - failed}/${checks.length} checks passed`,
    );

    if (failed > 0) {
      process.exitCode = 1;
    }
  } finally {
    await browser.close();
  }
};

main().catch((error) => {
  console.error("[ERROR] Playwright UI check failed:");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
