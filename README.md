# `@swaraj792725/codebase-symbol-skeleton`

> **Zero-dependency JS/TS codebase API skeletonizer and type outline generator for LLM token context reduction.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Packages](https://img.shields.io/badge/registry-GitHub_Packages-green.svg)](https://github.com/swaraj792725?tab=packages)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)

---

## 🌟 Overview

When building AI coding assistants or prompt context pipelines, providing full file contents for 50+ modules wastes up to **90% of token budgets** on internal implementation logic.

`@swaraj792725/codebase-symbol-skeleton` generates compact API skeleton outlines, stripping function/method bodies while keeping full type signatures, exports, and JSDocs intact for Claude 3.5 Sonnet, GPT-4o, and Gemini.

---

## 📦 Installation

Install via GitHub Packages registry:

```bash
npm install @swaraj792725/codebase-symbol-skeleton --registry=https://npm.pkg.github.com
```

---

## 🚀 Usage

```typescript
import { skeletonizeSource } from '@swaraj792725/codebase-symbol-skeleton';

const code = `
  export function computeHash(data: string, secret: string): string {
    const salt = 'random_salt';
    return crypto.createHmac('sha256', secret).update(data + salt).digest('hex');
  }
`;

const result = skeletonizeSource(code);
console.log(`Tokens: ${result.originalTokens} -> ${result.skeletonTokens} (${result.savingsPercent}% saved)`);
console.log(result.skeletonCode);
/*
Output:
export function computeHash(data: string, secret: string): string { /* implementation omitted * / }
*/
```

---

## 📜 License

MIT © [Swaraj](https://github.com/swaraj792725)
