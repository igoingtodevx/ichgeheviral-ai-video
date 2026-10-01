/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node CommonJS smoke test. */
// Focused boundary checks, not a simulated end-to-end Clerk/payment test.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function client(apiUrl, fetch) {
  const code = ts.transpileModule(fs.readFileSync('src/lib/api/client.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const context = { exports: {}, process: { env: { NEXT_PUBLIC_API_URL: apiUrl } }, fetch, Headers, Error, Number };
  vm.runInNewContext(code, context);
  return context.exports;
}

(async () => {
  const requests = [];
  const { api } = client('https://api.example.invalid', async (url, options) => {
    requests.push({ url, options });
    if (url.includes('/video')) return Response.json({ url: 'https://bucket.example.invalid/video?signature=fixture', expires_in: 300 });
    if (url.endsWith('/jobs')) return Response.json({ items: [], has_more: false });
    return Response.json({ error: 'checkout is disabled', code: 'checkout_disabled' }, { status: 503 });
  });
  const getToken = async () => 'local-test-token';
  for (const add_course of [true, false]) {
    await assert.rejects(api.createCheckout({ concept: 'Pool', package: 'single', add_course }, getToken), error => error.status === 503 && error.code === 'checkout_disabled');
    assert.deepEqual(JSON.parse(requests.at(-1).options.body), { concept: 'Pool', package: 'single', add_course });
  }
  assert.equal((await api.listJobs(getToken)).length, 0, 'empty accounts must not receive demo jobs');
  const count = requests.length;
  const signed = await api.getVideoUrl('job_owned', getToken, true);
  assert.equal(signed.expires_in, 300);
  assert.equal(requests.length, count + 1, 'only fetch the API JSON, never follow a bucket redirect with the JWT');
  assert.equal(requests.at(-1).url, 'https://api.example.invalid/jobs/job_owned/video?download=1');
  assert.equal(requests.at(-1).options.headers.get('Authorization'), 'Bearer local-test-token');
  await assert.rejects(api.listJobs(async () => null), error => error.status === 401);
  const missing = client('', () => { throw new Error('must not fetch'); });
  await assert.rejects(missing.api.listJobs(getToken), error => error.code === 'api_unconfigured');
  console.log('PASS frontend contracts: package/course, disabled checkout, empty jobs, signed video JSON, missing auth/config');
})().catch(error => { console.error(error); process.exitCode = 1; });
