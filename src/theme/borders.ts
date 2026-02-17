/**
 * Sistema de radio de bordes para la aplicación
 *
 * Proporciona valores consistentes para redondear esquinas de componentes.
 * Usa 'full' para formas circulares o píldoras.
 */

import { wScale } from './responsive';

/**
 * Radios de borde disponibles en la aplicación
 */
export const borderRadius = {
  /** Sin radio (esquinas rectas) */
  none: 0,
  /** Extra pequeño: 2px */
  xs: wScale(2),
  /** Pequeño: 4px - Para elementos pequeños como chips */
  sm: wScale(4),
  /** Mediano: 8px - Default para la mayoría de componentes */
  md: wScale(8),
  /** Grande: 12px - Para cards y secciones */
  lg: wScale(12),
  /** Extra grande: 16px - Para modales y containers grandes */
  xl: wScale(16),
  /** 2x Extra grande: 24px - Para elementos muy prominentes */
  '2xl': wScale(24),
  /** Completo: 9999px - Para círculos y píldoras */
  full: 9999,
} as const;

/**
 * Tipo para los radios de borde disponibles
 */
export type BorderRadius = typeof borderRadius;

/**
 * Nombres de los radios de borde
 */
export type BorderRadiusToken = keyof typeof borderRadius;
