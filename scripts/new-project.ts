import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { config } from "../src/lib/config";

const frameworkDir = resolve(process.cwd(), "framework");

function distributionContent(): string {
  return `# Distribution — Phase 1\n\n## Buyer Persona\n${config.framework.buyerPersona}\n\n## Core Pain\n${config.framework.corePain}\n\n## Channel\n${config.framework.channel}\n\n## Pass Criteria\n- [ ] 10+ signups or replies in 48–72 hours\n\n## Kill Criteria\n- Zero traction after two different channels tested\n\n## Current Phase\n${config.framework.phase}\n`;
}

function rulesContent(): string {
  return `# Rules\n\n- Only one active product in Phase 2+ at a time\n- No feature work before Phase 1 passes\n- No quality work before Phase 3 passes\n- Every phase has kill criteria\n- If kill criteria met, archive project\n`;
}

const emptyTemplate = `<!-- Fill this file from real user/customer inputs -->\n`;

async function run(): Promise<void> {
  await mkdir(frameworkDir, { recursive: true });

  await Promise.all([
    writeFile(resolve(frameworkDir, "distribution.md"), distributionContent()),
    writeFile(resolve(frameworkDir, "rules.md"), rulesContent()),
    writeFile(resolve(frameworkDir, "problem.md"), `# Problem\n\n${emptyTemplate}`),
    writeFile(resolve(frameworkDir, "buyer.md"), `# Buyer\n\n${emptyTemplate}`),
    writeFile(resolve(frameworkDir, "quotes.md"), `# Quotes\n\n${emptyTemplate}`)
  ]);

  process.stdout.write("Framework files generated from saas.config.ts\n");
}

run().catch((error) => {
  const message = error instanceof Error ? error.message : "Unknown error";
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
