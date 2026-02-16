import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Button, Text } from '@components/core';
import { spacing } from '@theme/index';

interface TextsViewProps {
  onBack: () => void;
}

export default function TextsView({ onBack }: TextsViewProps) {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Button variant="ghost" size="sm" onPress={onBack}>
          ← Volver
        </Button>
        <Text variant="h1">Componente Text</Text>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Variantes de Heading
        </Text>
        <View style={styles.textGroup}>
          <Text variant="h1">Heading 1</Text>
          <Text variant="h2">Heading 2</Text>
          <Text variant="h3">Heading 3</Text>
          <Text variant="h4">Heading 4</Text>
          <Text variant="h5">Heading 5</Text>
          <Text variant="h6">Heading 6</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Variantes de Body
        </Text>
        <View style={styles.textGroup}>
          <Text variant="body">
            Body text - Texto de cuerpo principal para contenido general
          </Text>
          <Text variant="bodySmall">
            Body Small - Texto de cuerpo pequeño para descripciones secundarias
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Variantes Especiales
        </Text>
        <View style={styles.textGroup}>
          <Text variant="button">Button text</Text>
          <Text variant="caption">Caption text - Para etiquetas y notas</Text>
          <Text variant="overline">Overline text - Para categorías</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Colores
        </Text>
        <View style={styles.textGroup}>
          <Text variant="body" color="text">
            Text color (default)
          </Text>
          <Text variant="body" color="primary">
            Primary color
          </Text>
          <Text variant="body" color="textSecondary">
            Secondary text color
          </Text>
          <Text variant="body" color="error">
            Error color
          </Text>
          <Text variant="body" color="success">
            Success color
          </Text>
          <Text variant="body" color="warning">
            Warning color
          </Text>
          <Text variant="body" color="info">
            Info color
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Alineaciones
        </Text>
        <View style={styles.textGroup}>
          <Text variant="body" align="left">
            Left aligned
          </Text>
          <Text variant="body" align="center">
            Center aligned
          </Text>
          <Text variant="body" align="right">
            Right aligned
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Decoraciones
        </Text>
        <View style={styles.textGroup}>
          <Text variant="body" decoration="underline">
            Underline text
          </Text>
          <Text variant="body" decoration="line-through">
            Line through text
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Transformaciones
        </Text>
        <View style={styles.textGroup}>
          <Text variant="body" transform="uppercase">
            Uppercase text
          </Text>
          <Text variant="body" transform="lowercase">
            Lowercase TEXT
          </Text>
          <Text variant="body" transform="capitalize">
            capitalize text
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Combinaciones
        </Text>
        <View style={styles.textGroup}>
          <Text
            variant="h4"
            color="primary"
            align="center"
            transform="uppercase"
          >
            Centered Primary Heading
          </Text>
          <Text
            variant="caption"
            color="textSecondary"
            decoration="underline"
            align="right"
          >
            Right aligned secondary caption with underline
          </Text>
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
  header: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  section: {
    gap: spacing.sm,
  },
  textGroup: {
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: 8,
  },
});
