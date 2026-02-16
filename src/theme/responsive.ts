import { Dimensions, PixelRatio, Platform } from 'react-native';

/**
 * Dimensiones de la pantalla actual
 */
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Ancho de la pantalla en píxeles (valor estático al inicio)
 * Nota: No se actualiza si cambia la orientación. Usar useWindowDimensions() para valores dinámicos.
 */
export const screenWidth = SCREEN_WIDTH;

/**
 * Alto de la pantalla en píxeles (valor estático al inicio)
 * Nota: No se actualiza si cambia la orientación. Usar useWindowDimensions() para valores dinámicos.
 */
export const screenHeight = SCREEN_HEIGHT;

/**
 * Tamaño de pantalla de referencia para el ancho
 * @example iPhone 11: 390px, Android base: 360px
 */
const BASE_WIDTH = Platform.select({
  ios: 390,
  android: 360,
  default: 412,
});

/**
 * Tamaño de pantalla de referencia para la altura
 * @example iPhone 11: 844px, Android base: 800px
 */
const BASE_HEIGHT = Platform.select({
  ios: 844,
  android: 800,
  default: 917,
});

/**
 * Breakpoints para diseño responsivo
 */
export const breakpoints = {
  /** Móvil: 0 - 767px */
  mobile: 0,
  /** Tablet: 768px - 1023px */
  tablet: 768,
  /** Desktop: 1024px+ */
  desktop: 1024,
} as const;

/**
 * Escala un tamaño horizontalmente basado en el ancho de pantalla
 * @param size - Tamaño base a escalar
 * @returns Tamaño escalado para el dispositivo actual
 * @example
 * wScale(16) // 16 escalado al ancho de pantalla actual
 */
export const wScale = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  return PixelRatio.roundToNearestPixel(newSize);
};

/**
 * Escala un tamaño verticalmente basado en el alto de pantalla
 * @param size - Tamaño base a escalar
 * @returns Tamaño escalado para el dispositivo actual
 */
export const hScale = (size: number): number => {
  const scale = SCREEN_HEIGHT / BASE_HEIGHT;
  const newSize = size * scale;
  return PixelRatio.roundToNearestPixel(newSize);
};

/**
 * Escala un tamaño moderadamente, útil para fuentes y elementos que no deben escalar linealmente
 * @param size - Tamaño base
 * @param factor - Factor de escala (0-1), default: 0.5
 * @returns Tamaño moderadamente escalado
 * @example
 * moderateScale(16, 0.3) // Escala 16 con factor 0.3
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
  return size + (wScale(size) - size) * factor;
};

/**
 * Obtiene el factor de escala de fuente actual del usuario
 */
export const fontScale = PixelRatio.getFontScale();

/**
 * Escala un tamaño de fuente manualmente basado en las preferencias del usuario.
 * Nota: El componente Text de RN ya escala automáticamente si allowFontScaling es true (default).
 * Usa esta función para elementos que no son Text pero deben escalar con la fuente (ej. iconos).
 * @param size - Tamaño de fuente base
 * @returns Tamaño escalado redondeado al pixel más cercano
 */
export const fScale = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;

  return (
    Math.round(PixelRatio.roundToNearestPixel(newSize)) /
    PixelRatio.getFontScale()
  );
};

/**
 * Convierte un porcentaje a píxeles de ancho
 * @param percent - Porcentaje (string con % o número)
 * @returns Ancho en píxeles
 * @example
 * wp('50%') // 50% del ancho de pantalla
 * wp(25) // 25% del ancho de pantalla
 */
export const wp = (percent: string | number): number => {
  const value = typeof percent === 'string' ? parseFloat(percent) : percent;
  return PixelRatio.roundToNearestPixel((value * screenWidth) / 100);
};

/**
 * Convierte un porcentaje a píxeles de alto
 * @param percent - Porcentaje (string con % o número)
 * @returns Alto en píxeles
 * @example
 * hp('20%') // 20% del alto de pantalla
 */
export const hp = (percent: string | number): number => {
  const value = typeof percent === 'string' ? parseFloat(percent) : percent;
  return PixelRatio.roundToNearestPixel((value * screenHeight) / 100);
};

/**
 * Verifica si el dispositivo es pequeño (< 375px de ancho)
 */
export const isSmallDevice = SCREEN_WIDTH < 375;

/**
 * Verifica si el dispositivo es una tablet (>= 768px de ancho)
 */
export const isTablet = SCREEN_WIDTH >= breakpoints.tablet;

/**
 * Verifica si el dispositivo es desktop (>= 1024px de ancho)
 */
export const isDesktop = SCREEN_WIDTH >= breakpoints.desktop;

/**
 * Verifica si es un dispositivo móvil (< 768px de ancho)
 */
export const isMobile = SCREEN_WIDTH < breakpoints.tablet;

/**
 * Verifica si la plataforma es iOS
 */
export const isIOS = Platform.OS === 'ios';

/**
 * Verifica si la plataforma es Android
 */
export const isAndroid = Platform.OS === 'android';

/**
 * Helpers de dimensiones de pantalla
 */
export default {
  wScale,
  hScale,
  moderateScale,
  fontScale,
  fScale,
  isSmallDevice,
  isTablet,
  isDesktop,
  isMobile,
  isIOS,
  isAndroid,
  screenWidth,
  screenHeight,
  breakpoints,
  wp,
  hp,
};
