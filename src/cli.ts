#!/usr/bin/env node

import * as process from 'node:process';
import * as fs from 'node:fs';
import { skeletonizeSource } from './skeleton.js';

function printHelp() {
  console.log(`
@swaraj792725/codebase-symbol-skeleton - Zero-dependency JS/TS API skeletonizer

Usage:
  symbol-skeleton [options]

Options:
  --file <path>         Input source file
  --no-jsdoc            Strip JSDoc comments
  --help                Show help message

Example:
  npx @swaraj792725/codebase-symbol-skeleton --file src/index.ts
`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  let filePath: string | null = null;
  let preserveJSDoc = true;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--file' && args[i + 1]) {
      filePath = args[++i];
    } else if (arg === '--no-jsdoc') {
      preserveJSDoc = false;
    }
  }

  let content = '';
  if (filePath) {
    content = fs.readFileSync(filePath, 'utf8');
  } else {
    content = fs.readFileSync(0, 'utf8');
  }

  const result = skeletonizeSource(content, { preserveJSDoc });
  console.error(`[INFO] Skeletonized API: ~${result.originalTokens} tokens -> ~${result.skeletonTokens} tokens (${result.savingsPercent}% saved)`);
  console.log(result.skeletonCode);
}

main().catch(err => {
  console.error('Error running symbol-skeleton CLI:', err);
  process.exit(1);
});
