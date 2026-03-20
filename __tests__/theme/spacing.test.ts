import { spacing, spacingMultiplier } from '@theme/spacing';

describe('Spacing', () => {
  it('debe tener los tokens de espaciado definidos', () => {
    expect(spacing.xs).toBeDefined();
    expect(spacing.sm).toBeDefined();
    expect(spacing.md).toBeDefined();
    expect(spacing.base).toBeDefined();
    expect(spacing.lg).toBeDefined();
    expect(spacing.xl).toBeDefined();
    expect(spacing['2xl']).toBeDefined();
    expect(spacing['3xl']).toBeDefined();
  });

  it('spacingMultiplier debe multiplicar el valor base', () => {
    expect(spacingMultiplier(1)).toBe(spacing.base);
    expect(spacingMultiplier(2)).toBe(spacing.base * 2);
    expect(spacingMultiplier(0.5)).toBe(spacing.base * 0.5);
  });
});
