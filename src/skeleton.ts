export interface SkeletonOptions {
  preserveJSDoc?: boolean;
  preserveInterfaces?: boolean;
  preserveTypes?: boolean;
  placeholderText?: string;
}

export interface SkeletonResult {
  skeletonCode: string;
  originalTokens: number;
  skeletonTokens: number;
  savedTokens: number;
  savingsPercent: number;
}

/**
 * Generates a concise API outline skeleton for TypeScript/JavaScript source code by stripping function/method implementation bodies while keeping signatures, types, and JSDoc.
 */
export function skeletonizeSource(sourceCode: string, options: SkeletonOptions = {}): SkeletonResult {
  const preserveJSDoc = options.preserveJSDoc ?? true;
  const placeholder = options.placeholderText ?? '{ /* implementation omitted */ }';

  const originalTokens = Math.ceil(sourceCode.length / 4);

  let processed = sourceCode;

  if (!preserveJSDoc) {
    processed = processed.replace(/\/\*[\s\S]*?\*\//g, '');
    processed = processed.replace(/\/\/.*/g, '');
  }

  // Replace function bodies: function foo(...) { ... }
  const fnPattern = /((?:export\s+)?(?:async\s+)?function(?:\s+[a-zA-Z0-9_$]+)?\s*(?:<[^>]+>)?\s*\([^)]*\)\s*(?::\s*[^{]+)?)\s*\{[\s\S]*?\}/g;
  processed = processed.replace(fnPattern, (fullMatch, signature) => {
    return `${signature.trim()} ${placeholder}`;
  });

  // Replace arrow functions with block bodies: const foo = (...) => { ... }
  const arrowPattern = /((?:export\s+)?(?:const|let|var)\s+[a-zA-Z0-9_$]+\s*=\s*(?:async\s*)?\([^)]*\)\s*(?::\s*[^=]+)?=>)\s*\{[\s\S]*?\}/g;
  processed = processed.replace(arrowPattern, (fullMatch, signature) => {
    return `${signature.trim()} ${placeholder};`;
  });

  processed = processed
    .split('\n')
    .map(l => l.trimEnd())
    .filter(l => l.trim().length > 0)
    .join('\n');

  const skeletonTokens = Math.ceil(processed.length / 4);
  const savedTokens = Math.max(0, originalTokens - skeletonTokens);
  const savingsPercent = originalTokens > 0 ? parseFloat(((savedTokens / originalTokens) * 100).toFixed(1)) : 0;

  return {
    skeletonCode: processed,
    originalTokens,
    skeletonTokens,
    savedTokens,
    savingsPercent
  };
}
