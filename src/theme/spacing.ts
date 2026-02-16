/**
 * Sistema de espaciado para la aplicación
 *
 * Proporciona valores consistentes de márgenes y padding.
 * Basado en una escala de 4px para mantener ritmo visual.
 */

/**
 * Valores de espaciado disponibles
 *
 * Escala basada en 4px:
 * - xs: 4px (unidad base / 4)
 * - sm: 8px (unidad base / 2)
 * - md: 12px (unidad base * 0.75)
 * - base: 16px (unidad base)
 * - lg: 24px (unidad base * 1.5)
 * - xl: 32px (unidad base * 2)
 * - 2xl: 48px (unidad base * 3)
 * - 3xl: 64px (unidad base * 4)
 */
export const spacing = {
  /** Extra pequeño: 4px */
  xs: 4,
  /** Pequeño: 8px */
  sm: 8,
  /** Mediano: 12px */
  md: 12,
  /** Base: 16px - Valor por defecto */
  base: 16,
  /** Grande: 24px */
  lg: 24,
  /** Extra grande: 32px */
  xl: 32,
  /** 2x Extra grande: 48px */
  '2xl': 48,
  /** 3x Extra grande: 64px */
  '3xl': 64,
} as const;

/**
 * Tipo para los valores de espaciado
 */
export type Spacing = typeof spacing;

/**
 * Nombres de los tokens de espaciado
 */
export type SpacingToken = keyof typeof spacing;


/**
 * Crea un valor de espaciado multiplicando la unidad base
 * @param multiplier - Factor de multiplicación
 * @returns Valor en píxeles
 * @example
 * spacingMultiplier(2); // 32 (16 * 2)
 * spacingMultiplier(0.5); // 8 (16 * 0.5)
 */
export function spacingMultiplier(multiplier: number): number {
  return spacing.base * multiplier;
}
