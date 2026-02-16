/**
 * Sistema de sombras para la aplicación
 *
 * Proporciona sombras responsivas al tema (más sutiles en modo oscuro)
 * y mantiene compatibilidad con Android (elevation) e iOS (shadow props)
 */

import { wScale, hScale, moderateScale } from '@theme/responsive';

/**
 * Niveles de sombra disponibles
 */
export type ShadowLevel = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Estructura de una definición de sombra
 */
export interface ShadowDefinition {
  /** Color de la sombra */
  shadowColor: string;
  /** Desplazamiento de la sombra */
  shadowOffset: { width: number; height: number };
  /** Opacidad de la sombra (0-1) */
  shadowOpacity: number;
  /** Radio de difuminado */
  shadowRadius: number;
  /** Elevación para Android */
  elevation: number;
}

/**
 * Sombras para modo claro (más pronunciadas)
 */
const lightShadows: Record<ShadowLevel, ShadowDefinition> = {
  none: {
    shadowColor: '#000000',
    shadowOffset: { width: wScale(0), height: hScale(0) },
    shadowOpacity: 0,
    shadowRadius: moderateScale(0),
    elevation: moderateScale(0),
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: wScale(0), height: hScale(1) },
    shadowOpacity: 0.05,
    shadowRadius: moderateScale(2),
    elevation: moderateScale(1),
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: wScale(0), height: hScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: moderateScale(3),
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: wScale(0), height: hScale(4) },
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(8),
    elevation: moderateScale(5),
  },
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: wScale(0), height: hScale(8) },
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(16),
    elevation: moderateScale(8),
  },
};

/**
 * Sombras para modo oscuro (más sutiles)
 * Usan opacidad reducida para no ser tan intensas sobre fondos oscuros
 */
const darkShadows: Record<ShadowLevel, ShadowDefinition> = {
  none: {
    shadowColor: '#000000',
    shadowOffset: { width: wScale(0), height: hScale(0) },
    shadowOpacity: 0,
    shadowRadius: moderateScale(0),
    elevation: moderateScale(0),
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: wScale(0), height: hScale(1) },
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(2),
    elevation: moderateScale(1),
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: wScale(0), height: hScale(2) },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(4),
    elevation: moderateScale(3),
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: wScale(0), height: hScale(4) },
    shadowOpacity: 0.4,
    shadowRadius: moderateScale(8),
    elevation: moderateScale(5),
  },
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: wScale(0), height: hScale(8) },
    shadowOpacity: 0.5,
    shadowRadius: moderateScale(16),
    elevation: moderateScale(8),
  },
};

/**
 * Obtiene las sombras para un modo de tema específico
 * @param isDark - true para modo oscuro, false para modo claro
 * @returns Objeto con definiciones de sombras
 * @example
 * const themeShadows = getShadows(true); // Sombras para dark mode
 * const { lg } = themeShadows; // { shadowColor: '#000', ... }
 */
export function getShadows(
  isDark: boolean = false,
): Record<ShadowLevel, ShadowDefinition> {
  return isDark ? darkShadows : lightShadows;
}
