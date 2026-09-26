import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROMIUM_PATH = "/usr/bin/chromium";
const OUTPUT_DIR = "/home/deploy/ichgeheviral-ai-video/screenshots";
const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:3000";

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

  // 1. Desktop 1440px
  console.log("Auditing Desktop (1440x900)...");
  const p1440 = await browser.newPage();
  await p1440.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await p1440.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 15000 });
  await new Promise((r) => setTimeout(r, 2000));
  await p1440.screenshot({ path: path.join(OUTPUT_DIR, "desktop_1440_hero.png") });
  console.log("Captured desktop_1440_hero.png");

  // Scroll to pipeline
  const pipelineEl = await p1440.$("#pipeline");
  if (pipelineEl) {
    await pipelineEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 800));
    await p1440.screenshot({ path: path.join(OUTPUT_DIR, "desktop_1440_pipeline.png") });
    console.log("Captured desktop_1440_pipeline.png");
  }

  // Scroll to founder
  const founderEl = await p1440.$("#founder");
  if (founderEl) {
    await founderEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 800));
    await p1440.screenshot({ path: path.join(OUTPUT_DIR, "desktop_1440_founder.png") });
    console.log("Captured desktop_1440_founder.png");
  }

  // Scroll to generator
  const genEl = await p1440.$("#generator");
  if (genEl) {
    await genEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 800));
    await p1440.screenshot({ path: path.join(OUTPUT_DIR, "desktop_1440_generator.png") });
    console.log("Captured desktop_1440_generator.png");
  }

  await p1440.close();

  // 2. Desktop 1280px
  console.log("Auditing Desktop (1280x800)...");
  const p1280 = await browser.newPage();
  await p1280.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
  await p1280.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1500));
  await p1280.screenshot({ path: path.join(OUTPUT_DIR, "desktop_1280_hero.png") });
  console.log("Captured desktop_1280_hero.png");
  await p1280.close();

  // 3. Tablet 1024px
  console.log("Auditing Tablet (1024x768)...");
  const p1024 = await browser.newPage();
  await p1024.setViewport({ width: 1024, height: 768, deviceScaleFactor: 1 });
  await p1024.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1500));
  await p1024.screenshot({ path: path.join(OUTPUT_DIR, "tablet_1024_hero.png") });
  console.log("Captured tablet_1024_hero.png");
  await p1024.close();

  // 4. Mobile 390px (iPhone 14)
  console.log("Auditing Mobile (390x844)...");
  const p390 = await browser.newPage();
  await p390.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await p390.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1500));
  await p390.screenshot({ path: path.join(OUTPUT_DIR, "mobile_390_hero.png") });
  console.log("Captured mobile_390_hero.png");

  // Scroll mobile to phone
  await p390.evaluate(() => window.scrollTo(0, 500));
  await new Promise((r) => setTimeout(r, 800));
  await p390.screenshot({ path: path.join(OUTPUT_DIR, "mobile_390_phone.png") });
  console.log("Captured mobile_390_phone.png");

  // Scroll mobile to generator
  const genMobile = await p390.$("#generator");
  if (genMobile) {
    await genMobile.scrollIntoView();
    await new Promise((r) => setTimeout(r, 800));
    await p390.screenshot({ path: path.join(OUTPUT_DIR, "mobile_390_generator.png") });
    console.log("Captured mobile_390_generator.png");
  }

  await p390.close();

  // 5. Overflow Verification across all breakpoints (1440, 1280, 1024, 414, 390, 375)
  console.log("Testing horizontal overflow across all required breakpoints...");
  const checkPage = await browser.newPage();
  const testViewports = [1440, 1280, 1024, 414, 390, 375];
  for (const w of testViewports) {
    await checkPage.setViewport({ width: w, height: 800 });
    await checkPage.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 10000 });
    await new Promise((r) => setTimeout(r, 400));
    const overflow = await checkPage.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    console.log(`Viewport ${w}px: ${overflow ? "FAILED ❌ (horizontal overflow detected)" : "PASSED ✅ (0 overflow)"}`);
  }
  await checkPage.close();

  await browser.close();
  console.log("Visual audit completed successfully!");
}

runAudit().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
