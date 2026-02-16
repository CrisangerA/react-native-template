import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Button, Text } from '@components/core';
// Theme
import { useTheme, spacing } from '@theme/index';

export default function RootView() {
  const { toggleTheme, mode } = useTheme();
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text variant="h1">Componente Text</Text>
        <Text variant="h2">Todas las variantes</Text>
      </View>

      <View style={styles.section}>
        <Text variant="h1">Heading 1</Text>
        <Text variant="h2">Heading 2</Text>
        <Text variant="h3">Heading 3</Text>
        <Text variant="h4">Heading 4</Text>
        <Text variant="h5">Heading 5</Text>
        <Text variant="h6">Heading 6</Text>
        <Text variant="body">Body text - Texto de cuerpo principal</Text>
        <Text variant="bodySmall">Body Small - Texto de cuerpo pequeño</Text>
        <Text variant="button">Button text</Text>
        <Text variant="caption">Caption text</Text>
        <Text variant="overline">Overline text</Text>
      </View>

      <View style={styles.section}>
        <Text variant="h1">Componente Button</Text>
        <Text variant="h2">Todas las variaciones</Text>
      </View>

      <View style={styles.section}>
        <Text variant="h4">Variante: Primary</Text>
        <View style={styles.buttonRow}>
          <Button size="sm" variant="primary">
            Small
          </Button>
          <Button size="md" variant="primary">
            Medium
          </Button>
          <Button size="lg" variant="primary">
            Large
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h4">Variante: Secondary</Text>
        <View style={styles.buttonRow}>
          <Button size="sm" variant="secondary">
            Small
          </Button>
          <Button size="md" variant="secondary">
            Medium
          </Button>
          <Button size="lg" variant="secondary">
            Large
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h4">Variante: Outlined</Text>
        <View style={styles.buttonRow}>
          <Button size="sm" variant="outlined">
            Small
          </Button>
          <Button size="md" variant="outlined">
            Medium
          </Button>
          <Button size="lg" variant="outlined">
            Large
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h4">Variante: Ghost</Text>
        <View style={styles.buttonRow}>
          <Button size="sm" variant="ghost">
            Small
          </Button>
          <Button size="md" variant="ghost">
            Medium
          </Button>
          <Button size="lg" variant="ghost">
            Large
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h4">Estados especiales</Text>
        <View style={styles.buttonColumn}>
          <Button disabled>Disabled Button</Button>
          <Button loading>Loading Button</Button>
          <Button fullWidth>Full Width Button</Button>
        </View>
      </View>

      <View style={styles.section}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onPress={() => {
            toggleTheme(mode === 'dark' ? 'light' : 'dark');
          }}
        >
          Toggle Theme ({mode})
        </Button>
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
    gap: spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  buttonColumn: {
    gap: spacing.md,
  },
});
