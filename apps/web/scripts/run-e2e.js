import { spawnSync } from "node:child_process";

const isCi = Boolean(process.env.CI);
const baseUrl = process.env.E2E_BASE_URL;

if (isCi && !baseUrl) {
  // eslint-disable-next-line no-console
  console.log("Skipping E2E tests in CI: E2E_BASE_URL is not set.");
  process.exit(0);
}

const result = spawnSync("pnpm", ["exec", "playwright", "test", "e2e"], {
  stdio: "inherit",
});

process.exit(result.status ?? 1);
