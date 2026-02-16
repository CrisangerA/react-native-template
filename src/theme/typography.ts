/**
 * Sistema de tipografía para la aplicación
 *
 * Define estilos de texto consistentes con font families, tamaños,
 * pesos y espaciado de letras para mantener coherencia visual.
 */

import { TextStyle } from 'react-native';
import { fScale, hScale } from '@theme/responsive';

/**
 * Stack de fuentes disponibles en la aplicación
 *
 * Usa 'System' para usar la fuente predeterminada del sistema operativo,
 * o define fuentes personalizadas cargadas en el proyecto.
 *
 * @example
 * // Para usar fuentes personalizadas:
 * fontFamily: {
 *   regular: 'Inter-Regular',
 *   medium: 'Inter-Medium',
 *   semiBold: 'Inter-SemiBold',
 *   bold: 'Inter-Bold',
 * }
 */
export const fontFamily = {
  /** Fuente regular (400) */
  regular: 'System' as const,
  /** Fuente medium (500) */
  medium: 'System' as const,
  /** Fuente semibold (600) */
  semiBold: 'System' as const,
  /** Fuente bold (700) */
  bold: 'System' as const,
};

/**
 * Estilos de tipografía para la aplicación
 *
 * Cada estilo incluye: fontSize, fontWeight, lineHeight, letterSpacing, y fontFamily
 */
export const typography = {
  /**
   * Título de nivel 1 - El más grande, para headers principales
   * @example Título de página, hero sections
   */
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: fScale(32),
    fontWeight: '700' as const,
    lineHeight: hScale(40),
    letterSpacing: -0.5,
  } as TextStyle,

  /**
   * Título de nivel 2 - Para secciones principales
   * @example Títulos de sección, headers de página
   */
  h2: {
    fontFamily: fontFamily.bold,
    fontSize: fScale(28),
    fontWeight: '700' as const,
    lineHeight: hScale(36),
    letterSpacing: -0.25,
  } as TextStyle,

  /**
   * Título de nivel 3 - Para subsecciones
   * @example Títulos de cards, headers de modal
   */
  h3: {
    fontFamily: fontFamily.semiBold,
    fontSize: fScale(24),
    fontWeight: '600' as const,
    lineHeight: hScale(32),
    letterSpacing: 0,
  } as TextStyle,

  /**
   * Título de nivel 4 - Para elementos destacados
   * @example Títulos de listas, headers de tablas
   */
  h4: {
    fontFamily: fontFamily.semiBold,
    fontSize: fScale(20),
    fontWeight: '600' as const,
    lineHeight: hScale(28),
    letterSpacing: 0.15,
  } as TextStyle,

  /**
   * Título de nivel 5 - Para elementos secundarios
   * @example Subtítulos, labels importantes
   */
  h5: {
    fontFamily: fontFamily.semiBold,
    fontSize: fScale(18),
    fontWeight: '600' as const,
    lineHeight: hScale(24),
    letterSpacing: 0,
  } as TextStyle,

  /**
   * Título de nivel 6 - Para elementos menores
   * @example Labels, captions importantes
   */
  h6: {
    fontFamily: fontFamily.semiBold,
    fontSize: fScale(16),
    fontWeight: '600' as const,
    lineHeight: hScale(22),
    letterSpacing: 0.15,
  } as TextStyle,

  /**
   * Texto de cuerpo principal - Para contenido general
   * @example Párrafos, descripciones, texto de formularios
   */
  body: {
    fontFamily: fontFamily.regular,
    fontSize: fScale(16),
    fontWeight: '400' as const,
    lineHeight: hScale(24),
    letterSpacing: 0.5,
  } as TextStyle,

  /**
   * Texto de cuerpo pequeño - Para texto secundario
   * @example Descripciones cortas, metadatos
   */
  bodySmall: {
    fontFamily: fontFamily.regular,
    fontSize: fScale(14),
    fontWeight: '400' as const,
    lineHeight: hScale(20),
    letterSpacing: 0.25,
  } as TextStyle,

  /**
   * Caption - Para texto pequeño y auxiliar
   * @example Fechas, estados, etiquetas secundarias
   */
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fScale(12),
    fontWeight: '400' as const,
    lineHeight: hScale(16),
    letterSpacing: 0.4,
  } as TextStyle,

  /**
   * Botón - Estilo específico para botones
   * @example Texto de botones primarios y secundarios
   */
  button: {
    fontFamily: fontFamily.semiBold,
    fontSize: fScale(14),
    fontWeight: '600' as const,
    lineHeight: hScale(20),
    letterSpacing: 1.25,
    textTransform: 'uppercase',
  } as TextStyle,

  /**
   * Overline - Para etiquetas y categorías
   * @example Categorías, tags, badges
   */
  overline: {
    fontFamily: fontFamily.medium,
    fontSize: fScale(10),
    fontWeight: '500' as const,
    lineHeight: hScale(14),
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  } as TextStyle,
};

/**
 * Tipo para los estilos de tipografía disponibles
 */
export type Typography = typeof typography;

/**
 * Tipo para los nombres de estilos de tipografía
 */
export type TypographyVariant = keyof typeof typography;
