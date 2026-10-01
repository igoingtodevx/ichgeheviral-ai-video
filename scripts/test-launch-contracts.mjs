import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { runInThisContext } from "node:vm";
import test from "node:test";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const native = createRequire(import.meta.url);
const modules = new Map();
// Exercise the real TypeScript modules without introducing a runtime dependency or generated files.
function load(path) {
  const file = resolve(root, path);
  if (modules.has(file)) return modules.get(file).exports;
  const loaded = { exports: {} };
  modules.set(file, loaded);
  const source = ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const requireLocal = (name) => {
    if (name.startsWith(".")) {
      const candidate = resolve(dirname(file), name);
      const target = [candidate, `${candidate}.ts`, `${candidate}.tsx`].find(existsSync);
      return load(target);
    }
    return native(name);
  };
  runInThisContext(`(function(require,module,exports){${source}\n})`, { filename: file })(requireLocal, loaded, loaded.exports);
  return loaded.exports;
}
const { canAdmin, canOperate, privilegedLinks, isProtectedPath } = load("src/lib/access.ts");
const { parsePublicConfig, SAFE_PUBLIC_CONFIG, canCheckout, fetchPublicConfig, packageHref, safeHttpUrl } = load("src/lib/business-config.ts");
const { parseOperationsOverview, filterOperations, operatorGrantConfirmed } = load("src/lib/operations.ts");
const { ApiClient } = load("src/lib/api/client.ts");
const { BusinessConfigProvider } = load("src/components/BusinessConfigProvider.tsx");
const { Pricing } = load("src/components/Pricing.tsx");
const { ConfiguredLegal, ConfiguredContact } = load("src/components/ConfiguredLegal.tsx");
const { Footer } = load("src/components/Footer.tsx");
const { ThemeProvider } = load("src/components/ThemeProvider.tsx");
const { formatPrice } = load("src/lib/pricing.ts");
const { IdentityBoundary } = load("src/components/AccessGate.tsx");
const clone = (value) => structuredClone(value);
function ready() {
  const state = clone(SAFE_PUBLIC_CONFIG);
  state.config.app_url = "https://final-domain.example";
  state.config.product_ready = true;
  state.config.shopify = { store_domain: "example.myshopify.com", video_product_id: "video-product", video_variant_id: "video-variant", course_product_id: "course-product", course_variant_id: "course-variant" };
  state.config.content = { hero_video_url: "https://media.example/video.mp4", support_email: "contact@example.test", legal_entity: "Approved operator", imprint_text: "Approved imprint\nSecond line", privacy_text: "Approved privacy", terms_text: "Approved terms" };
  state.config.packages[0].name = "Backend package";
  state.config.packages[0].price_eur = 12.34;
  state.config.packages[1].price_eur = 23.45;
  state.checkout_enabled = true;
  state.launch_missing = [];
  return state;
}
function overview() {
  return {
    customers: [{ id: "customer-a", name: "Customer A", created_at: null }, { id: "customer-b", name: "Customer B", created_at: null }],
    orders: [{ request_id: "request-a", account_id: "customer-a", package: "ai-video", add_course: false, status: "paid", video_job_id: "job/a", created_at: null, updated_at: null, order_id: "order-a" }],
    jobs: [{ id: "job/a", account_id: "customer-a", status: "completed", concept: "Pool transformation", progress: { percent: 100 }, created_at: null, updated_at: null, execution_mode: "mock" }, { id: "job-b", account_id: "customer-b", status: "queued", concept: "Another transformation", progress: null, created_at: null, updated_at: null, execution_mode: "mock" }],
    summary: { customers: 2, orders: 1, jobs: 2, completed: 1 },
  };
}
function render(Component, props, state = ready()) {
  return renderToStaticMarkup(React.createElement(ThemeProvider, {}, React.createElement(BusinessConfigProvider, { value: state }, React.createElement(Component, props))));
}

test("explicit operator and sole global-admin flags, never account ownership", () => {
  for (const identity of [null, {}, { role: "owner", account_role: "owner" }, { role: "admin", account_role: "admin" }, { is_global_admin: "true", is_operator: 1 }]) {
    assert.equal(canAdmin(identity), false);
    assert.equal(canOperate(identity), false);
    assert.deepEqual(privilegedLinks(identity), []);
  }
  assert.equal(canOperate({ is_operator: true }), true);
  assert.equal(canAdmin({ is_operator: true }), false);
  assert.deepEqual(privilegedLinks({ is_operator: true }), [{ href: "/operations", label: "Betrieb" }]);
  assert.deepEqual(privilegedLinks({ is_global_admin: true }).map((link) => link.label), ["Betrieb", "Administration"]);
});
test("all admin and operations routes protected; global identity gate precedes token controls", () => {
  for (const path of ["/admin", "/admin/overview", "/admin?unused", "/admin/content", "/admin/operators", "/operations", "/operations/jobs/a", "/kundenbereich", "/checkout/return"]) {
    assert.equal(isProtectedPath(path.split("?")[0]), true);
  }
  for (const path of ["/", "/administrator", "/operations-public", "/impressum"]) assert.equal(isProtectedPath(path), false);
  assert.match(readFileSync(resolve(root, "src/app/admin/layout.tsx"), "utf8"), /<AccessGate mode="admin">\{children\}<\/AccessGate>/);
  assert.match(readFileSync(resolve(root, "src/app/operations/layout.tsx"), "utf8"), /<AccessGate mode="operations">/);
  const cockpit = readFileSync(resolve(root, "src/app/operations/page.tsx"), "utf8");
  assert.doesNotMatch(cockpit, /getAdminOverview|addMembership|setOperator|socialProof|sessionStorage|cost_usd|Clerk User/);
  assert.match(cockpit, /canAdmin\(identity\).*href="\/admin\/overview"/);
});
test("operator/account owners cannot mount admin content/token/grant controls; approved operations can mount", () => {
  let mounted = 0;
  function PrivilegedChild() { mounted++; return React.createElement("input", { "data-private": "content-token-or-grant", type: "password" }); }
  for (const identity of [{ user_id: "operator", is_operator: true, is_global_admin: false }, { user_id: "owner", account_role: "owner", is_operator: false, is_global_admin: false }, null]) {
    const html = renderToStaticMarkup(React.createElement(IdentityBoundary, { mode: "admin", identity, signedIn: true }, React.createElement(PrivilegedChild)));
    assert.match(html, /Kein Zugriff/); assert.doesNotMatch(html, /content-token-or-grant/);
  }
  assert.equal(mounted, 0);
  const ops = renderToStaticMarkup(React.createElement(IdentityBoundary, { mode: "operations", identity: { user_id: "operator", is_operator: true, is_global_admin: false }, signedIn: true }, React.createElement("div", {}, "Operations available")));
  assert.match(ops, /Operations available/);
  const global = renderToStaticMarkup(React.createElement(IdentityBoundary, { mode: "admin", identity: { user_id: "sole-admin", is_global_admin: true }, signedIn: true }, React.createElement(PrivilegedChild)));
  assert.match(global, /content-token-or-grant/); assert.equal(mounted, 1);
});
test("safe default is usable but never claims a price, legal approval or checkout", () => {
  assert.ok(parsePublicConfig(SAFE_PUBLIC_CONFIG));
  assert.equal(SAFE_PUBLIC_CONFIG.config.product_ready, false);
  for (const pkg of SAFE_PUBLIC_CONFIG.config.packages) assert.equal(canCheckout(SAFE_PUBLIC_CONFIG, pkg), false);
  const html = render(Pricing, {}, SAFE_PUBLIC_CONFIG);
  assert.match(html, /Preis noch nicht freigegeben/);
  assert.match(html, /Checkout deaktiviert/);
  assert.doesNotMatch(html, /Poolbau-Format|Individuelles Angebot/);
  assert.equal(formatPrice(12.34), "12,34 €");
});
test("complete config is validated and projected without secret/system extra fields", () => {
  const state = ready();
  state.config.secret = "forbidden";
  state.config.content.secret = "forbidden";
  state.config.packages[0].provider_cost = 42;
  state.secret = "forbidden";
  const parsed = parsePublicConfig(state);
  assert.ok(parsed);
  assert.doesNotMatch(JSON.stringify(parsed), /forbidden|provider_cost/);
  for (const pkg of parsed.config.packages) assert.equal(canCheckout(parsed, pkg), true);
});
test("malformed public shape/types/URLs/prices/flags fail closed", () => {
  const mutations = [
    (s) => { s.config.version = 2; }, (s) => { s.checkout_enabled = "true"; },
    (s) => { s.config.product_ready = "true"; }, (s) => { s.launch_missing = [null]; },
    (s) => { s.config.app_url = "javascript:alert(1)"; }, (s) => { s.config.app_url = "https://user:pass@example.test"; },
    (s) => { s.config.content.hero_video_url = "data:video/fake"; }, (s) => { s.config.content.support_email = "email\nheader@example.test"; },
    (s) => { delete s.config.content.imprint_text; }, (s) => { s.config.shopify.video_variant_id = 123; },
    (s) => { s.config.shopify.store_domain = "https://example.myshopify.com/"; },
    (s) => { s.config.packages[0].price_eur = "12"; }, (s) => { s.config.packages[0].price_eur = NaN; },
    (s) => { s.config.packages[0].price_eur = Infinity; }, (s) => { s.config.packages[0].price_eur = -1; },
    (s) => { s.config.packages[0].price_eur = 0; }, (s) => { s.config.packages[0].features = [5]; },
    (s) => { s.config.packages[0].highlight = "false"; }, (s) => { s.config.packages[0].add_course = true; },
    (s) => { s.config.packages[0].id = ["ai-video"]; }, (s) => { s.config.packages[0].id = { toString: "bad" }; },
    (s) => { s.config.packages[1].id = "ai-video"; }, (s) => { s.config.packages.pop(); },
  ];
  for (const mutate of mutations) { const state = ready(); mutate(state); assert.equal(parsePublicConfig(state), null); }
  for (const value of [null, {}, [], "string"]) assert.equal(parsePublicConfig(value), null);
  assert.equal(safeHttpUrl("http://127.0.0.1:8000/video"), true);
  assert.equal(safeHttpUrl("http://untrusted.example/video"), false);
});
test("backend OFF/missing approval cannot be overridden by frontend package or URL choice", () => {
  for (const mutate of [
    (s) => { s.checkout_enabled = false; }, (s) => { s.config.product_ready = false; },
    (s) => { s.launch_missing = ["approval"]; }, (s) => { s.config.app_url = null; },
    (s) => { s.config.content.terms_text = null; }, (s) => { s.config.content.legal_entity = null; },
    (s) => { s.config.shopify.video_variant_id = null; }, (s) => { s.config.packages[0].price_eur = null; },
  ]) { const state = ready(); mutate(state); assert.equal(canCheckout(state, state.config.packages[0]), false); }
  const state = ready(); state.config.shopify.course_variant_id = null;
  assert.equal(canCheckout(state, state.config.packages[1]), false);
  assert.equal(packageHref("ai-video-course"), "/kundenbereich/neu?package=ai-video-course");
  const checkout = readFileSync(resolve(root, "src/app/kundenbereich/neu/page.tsx"), "utf8");
  assert.ok(checkout.indexOf("await fetchPublicConfig") < checkout.indexOf("await api.createCheckout"));
  assert.match(checkout, /canCheckout\(fresh, currentPackage\)/);
  assert.match(checkout, /disabled=\{starting \|\| !checkoutEnabled\}/);
  assert.doesNotMatch(checkout, /PRICING_LAUNCHED/);
});
test("public retrieval handles unavailable, malformed and failed network without enabling checkout", async () => {
  assert.equal(await fetchPublicConfig(""), SAFE_PUBLIC_CONFIG);
  for (const fetcher of [async () => { throw new Error("offline"); }, async () => new Response("bad-json"), async () => Response.json({}, { status: 503 }), async () => Response.json({ config: {} })]) {
    assert.equal(await fetchPublicConfig("https://api.example", fetcher), SAFE_PUBLIC_CONFIG);
  }
  const result = await fetchPublicConfig("https://api.example/", async (url, options) => {
    assert.equal(url, "https://api.example/public/config"); assert.equal(options.cache, "no-store");
    return Response.json(ready());
  });
  assert.equal(result.config.app_url, "https://final-domain.example");
});
test("pricing, package href, legal plain text and support actually render backend values", () => {
  const html = render(Pricing, {});
  assert.match(html, /Backend package/); assert.match(html, /12,34/); assert.match(html, /package=ai-video-course/);
  const legal = render(ConfiguredLegal, { title: "Impressum", field: "imprint_text" });
  assert.match(legal, /Approved imprint/); assert.match(legal, /Approved operator/);
  const unsafe = ready(); unsafe.config.content.imprint_text = "<script>alert(1)</script>";
  assert.match(render(ConfiguredLegal, { title: "Impressum", field: "imprint_text" }, unsafe), /&lt;script&gt;/);
  assert.match(render(ConfiguredLegal, { title: "Datenschutz", field: "privacy_text" }, SAFE_PUBLIC_CONFIG), /noch nicht freigegeben/);
  assert.match(render(ConfiguredContact, {}), /mailto:contact@example.test/);
  assert.match(render(Footer, {}), /contact@example.test/);
  assert.doesNotMatch(render(ConfiguredContact, {}, SAFE_PUBLIC_CONFIG), /enricha|Timo|tel:/);
  const metadata = readFileSync(resolve(root, "src/app/layout.tsx"), "utf8");
  assert.match(metadata, /metadataBase: new URL\(config.app_url\)/);
  assert.match(readFileSync(resolve(root, "src/app/page.tsx"), "utf8"), /config.content.hero_video_url/);
});
test("operations projection strips identities, memberships, costs, secrets and nested progress extras", () => {
  const value = overview(); value.memberships = [{ user_id: "private-subject" }]; value.jobs[0].user_id = "private-subject"; value.jobs[0].cost = 42; value.jobs[0].progress.provider = "private-provider";
  const parsed = parseOperationsOverview(value);
  assert.ok(parsed); assert.doesNotMatch(JSON.stringify(parsed), /private-|memberships|cost/);
  const broken = overview(); broken.summary.jobs = 99; assert.equal(parseOperationsOverview(broken), null);
  const invalid = overview(); invalid.jobs[0].status = "unknown"; assert.equal(parseOperationsOverview(invalid), null);
});
test("customer, status and free-text filters preserve exact jobs/orders/details identifiers", () => {
  const value = overview();
  assert.deepEqual(filterOperations(value.jobs, { customer: "customer-a", status: "completed", query: "POOL" }).map((j) => j.id), ["job/a"]);
  assert.deepEqual(filterOperations(value.jobs, { customer: "customer-b", status: "completed", query: "" }), []);
  assert.deepEqual(filterOperations(value.orders, { customer: "customer-a", status: "paid", query: "order-a" }).map((o) => o.request_id), ["request-a"]);
  assert.deepEqual(filterOperations(value.customers, { customer: "customer-a", status: "", query: "Customer A" }).map((c) => c.id), ["customer-a"]);
});
test("grant read-back confirms enable and revoke including disappearance from active-only list", () => {
  assert.equal(operatorGrantConfirmed([{ user_id: "subject", enabled: true }], "subject", true), true);
  assert.equal(operatorGrantConfirmed([], "subject", true), false);
  assert.equal(operatorGrantConfirmed([], "subject", false), true);
  assert.equal(operatorGrantConfirmed([{ user_id: "subject", enabled: false }], "subject", false), true);
  assert.equal(operatorGrantConfirmed([{ user_id: "subject", enabled: true }], "subject", false), false);
});
test("operations and operator API contracts use only exact allowed paths and explicit bodies", async () => {
  const original = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init }); assert.equal(init.headers.get("Authorization"), "Bearer fixture-token");
    if (url.endsWith("/operations/overview")) return Response.json(overview());
    if (url.includes("/video?download=1")) return Response.json({ url: "https://storage.example/signed-video", expires_in: 300 });
    if (init.method === "POST") return Response.json(JSON.parse(init.body));
    return Response.json({ items: [{ user_id: "subject", enabled: true, created_at: null }] });
  };
  try {
    const api = new ApiClient("https://api.example"); const token = async () => "fixture-token";
    assert.equal((await api.getOperationsOverview(token)).summary.jobs, 2);
    assert.deepEqual(await api.operationsDownloadTarget("job/a", token), { url: "https://storage.example/signed-video", temporary: false });
    await api.getOperators(token); await api.setOperator({ user_id: "subject", enabled: false }, token);
    assert.deepEqual(calls.map((c) => c.url), ["https://api.example/operations/overview", "https://api.example/operations/jobs/job%2Fa/video?download=1", "https://api.example/admin/operators", "https://api.example/admin/operators"]);
    assert.equal(calls[3].init.method, "POST"); assert.deepEqual(JSON.parse(calls[3].init.body), { user_id: "subject", enabled: false });
    await assert.rejects(api.getOperationsOverview(async () => null), /Anmeldung/);
  } finally { globalThis.fetch = original; }
});
test("local video download authenticates same-origin content; storage never receives bearer", async () => {
  const original = globalThis.fetch; let count = 0;
  globalThis.fetch = async (url, init) => {
    count++; assert.equal(init.headers.get("Authorization"), "Bearer fixture-token");
    if (count === 1) return Response.json({ url: "/operations/jobs/job/video/content?download=1", expires_in: 300 });
    assert.equal(init.redirect, "error"); return new Response("local-fixture-video", { headers: { "content-type": "video/mp4" } });
  };
  try {
    const api = new ApiClient("http://127.0.0.1:8000");
    const target = await api.operationsDownloadTarget("job", async () => "fixture-token");
    assert.equal(target.temporary, true); assert.match(target.url, /^blob:/); URL.revokeObjectURL(target.url); assert.equal(count, 2);
  } finally { globalThis.fetch = original; }
});

test("content administration uses fresh Clerk sessions, never a shared browser key", () => {
  const page = readFileSync(resolve(root, "src/app/admin/page.tsx"), "utf8");
  const panel = readFileSync(resolve(root, "src/components/AdminTestimonialsPanel.tsx"), "utf8");
  assert.doesNotMatch(page, /sessionStorage|TOKEN_KEY|passwordInput|type="password"/);
  assert.match(page, /checkSocialProofAdmin\(value\)/);
  assert.match(page, /createSocialProof\(await requireToken\(\)/);
  assert.match(page, /deleteSocialProof\(await requireToken\(\)/);
  assert.match(page, /AdminTestimonialsPanel getToken=\{getToken\}/);
  assert.match(panel, /createTestimonial\(await requireToken\(\)/);
  assert.match(panel, /deleteTestimonial\(await requireToken\(\)/);
});
