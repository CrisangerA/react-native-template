/**
 * Estilos comunes reutilizables
 *
 * Proporciona utilidades de estilo simples que se usan frecuentemente
 * en componentes para evitar repetición.
 *
 * @example
 * import { commonStyles } from './common';
 *
 * <View style={commonStyles.flex} />
 */

import { StyleSheet } from 'react-native';

/**
 * Colección de estilos comunes reutilizables
 */
export const commonStyles = StyleSheet.create({
  /** Flex: 1 - Ocupa todo el espacio disponible */
  flex: { flex: 1 },

  /** Flex con dirección row */
  flexRow: { flex: 1, flexDirection: 'row' },

  /** Centra contenido horizontal y verticalmente */
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /** Centra contenido horizontalmente */
  centerHorizontal: {
    flex: 1,
    alignItems: 'center',
  },

  /** Centra contenido verticalmente */
  centerVertical: {
    flex: 1,
    justifyContent: 'center',
  },
});

/**
 * Tipo para los estilos comunes disponibles
 */
export type CommonStyles = typeof commonStyles;

export default commonStyles;
