import { describe, it, expect } from 'vitest';
import { skeletonizeSource } from '../src/index.js';

describe('codebase-symbol-skeleton', () => {
  it('skeletonizes function implementations while preserving type signatures', () => {
    const code = `
      export function calculateTotal(items: number[], tax: number): number {
        const sum = items.reduce((a, b) => a + b, 0);
        return sum * (1 + tax);
      }
    `;

    const result = skeletonizeSource(code);
    expect(result.skeletonCode).toContain('export function calculateTotal(items: number[], tax: number): number');
    expect(result.skeletonCode).toContain('{ /* implementation omitted */ }');
    expect(result.savedTokens).toBeGreaterThan(0);
  });

  it('skeletonizes arrow function declarations', () => {
    const code = `
      export const fetchData = async (url: string): Promise<string> => {
        const res = await fetch(url);
        return res.text();
      };
    `;

    const result = skeletonizeSource(code);
    expect(result.skeletonCode).toContain('export const fetchData = async (url: string): Promise<string> =>');
    expect(result.skeletonCode).toContain('{ /* implementation omitted */ }');
    expect(result.savedTokens).toBeGreaterThan(0);
  });
});
