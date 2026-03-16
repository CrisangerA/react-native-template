import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Badge, Text } from '@components/core';
import { spacing } from '@theme/index';

export default function BadgesView() {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Variantes
        </Text>
        <View style={styles.row}>
          <Badge label="Admin" variant="admin" />
          <Badge label="Editor" variant="editor" />
          <Badge label="Viewer" variant="viewer" />
          <Badge label="Default" variant="default" />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Casos de uso
        </Text>
        <Text variant="bodySmall" color="textSecondary">
          Badges se usan para indicar roles, estados o categorias
        </Text>
        <View style={styles.column}>
          <View style={styles.useCaseRow}>
            <Badge label="Activo" variant="editor" />
            <Text variant="body">Usuario con acceso completo</Text>
          </View>
          <View style={styles.useCaseRow}>
            <Badge label="Admin" variant="admin" />
            <Text variant="body">Administrador del sistema</Text>
          </View>
          <View style={styles.useCaseRow}>
            <Badge label="Solo lectura" variant="viewer" />
            <Text variant="body">Sin permisos de edicion</Text>
          </View>
          <View style={styles.useCaseRow}>
            <Badge label="Pendiente" variant="default" />
            <Text variant="body">Esperando aprobacion</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Textos largos
        </Text>
        <View style={styles.row}>
          <Badge label="Superadministrador" variant="admin" />
          <Badge label="Colaborador externo" variant="editor" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  section: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    alignItems: 'center',
  },
  column: {
    gap: spacing.md,
  },
  useCaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
