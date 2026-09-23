import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROMIUM_PATH = "/usr/bin/chromium";
const OUTPUT_DIR = "/home/deploy/ichgeheviral-ai-video/screenshots";
const BASE_URL = "http://127.0.0.1:3456";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runAudit() {
  console.log("Launching headless browser at:", CHROMIUM_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROMIUM_PATH,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--js-flags=--max-old-space-size=2048",
    ],
  });

  // 1. Desktop Audit (1440x900)
  console.log("Auditing Desktop (1440x900)...");
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await desktopPage.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 15000 });
  await new Promise((r) => setTimeout(r, 2000));

  await desktopPage.screenshot({ path: path.join(OUTPUT_DIR, "desktop_01_hero.png") });
  console.log("Captured desktop_01_hero.png");

  await desktopPage.evaluate(() => window.scrollTo(0, 950));
  await new Promise((r) => setTimeout(r, 1200));
  await desktopPage.screenshot({ path: path.join(OUTPUT_DIR, "desktop_02_pipeline.png") });
  console.log("Captured desktop_02_pipeline.png");

  await desktopPage.evaluate(() => window.scrollTo(0, 2000));
  await new Promise((r) => setTimeout(r, 1200));
  await desktopPage.screenshot({ path: path.join(OUTPUT_DIR, "desktop_03_founder_showcase.png") });
  console.log("Captured desktop_03_founder_showcase.png");

  await desktopPage.evaluate(() => window.scrollTo(0, 3100));
  await new Promise((r) => setTimeout(r, 1200));
  await desktopPage.screenshot({ path: path.join(OUTPUT_DIR, "desktop_04_generator_value.png") });
  console.log("Captured desktop_04_generator_value.png");

  await desktopPage.evaluate(() => window.scrollTo(0, 4200));
  await new Promise((r) => setTimeout(r, 1200));
  await desktopPage.screenshot({ path: path.join(OUTPUT_DIR, "desktop_05_faq_cta.png") });
  console.log("Captured desktop_05_faq_cta.png");

  await desktopPage.close();

  // 2. Mobile Audit (390x844 - iPhone 14 size)
  console.log("Auditing Mobile (390x844)...");
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await mobilePage.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 15000 });
  await new Promise((r) => setTimeout(r, 2000));

  await mobilePage.screenshot({ path: path.join(OUTPUT_DIR, "mobile_01_hero.png") });
  console.log("Captured mobile_01_hero.png");

  await mobilePage.evaluate(() => window.scrollTo(0, 950));
  await new Promise((r) => setTimeout(r, 1200));
  await mobilePage.screenshot({ path: path.join(OUTPUT_DIR, "mobile_02_scrubber.png") });
  console.log("Captured mobile_02_scrubber.png");

  await mobilePage.evaluate(() => window.scrollTo(0, 2100));
  await new Promise((r) => setTimeout(r, 1200));
  await mobilePage.screenshot({ path: path.join(OUTPUT_DIR, "mobile_03_founder.png") });
  console.log("Captured mobile_03_founder.png");

  await mobilePage.evaluate(() => window.scrollTo(0, 3000));
  await new Promise((r) => setTimeout(r, 1200));
  await mobilePage.screenshot({ path: path.join(OUTPUT_DIR, "mobile_04_showcase.png") });
  console.log("Captured mobile_04_showcase.png");

  await mobilePage.evaluate(() => window.scrollTo(0, 4200));
  await new Promise((r) => setTimeout(r, 1200));
  await mobilePage.screenshot({ path: path.join(OUTPUT_DIR, "mobile_05_generator.png") });
  console.log("Captured mobile_05_generator.png");

  await mobilePage.close();

  // 3. Overflow Audit across mobile breakpoints
  const checkPage = await browser.newPage();
  const viewports = [360, 375, 390, 414];
  for (const w of viewports) {
    await checkPage.setViewport({ width: w, height: 800 });
    await checkPage.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 10000 });
    await new Promise((r) => setTimeout(r, 500));
    const overflow = await checkPage.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    console.log(`Viewport ${w}px horizontal overflow: ${overflow ? "FAILED ❌" : "PASSED ✅ (0 overflow)"}`);
  }
  await checkPage.close();

  await browser.close();
  console.log("Visual audit capture finished successfully!");
}

runAudit().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
