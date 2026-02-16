import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Button, Text } from '@components/core';
import { useTheme, spacing } from '@theme/index';

interface ButtonsViewProps {
  onBack: () => void;
}

export default function ButtonsView({ onBack }: ButtonsViewProps) {
  const { mode, toggleTheme } = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Button variant="ghost" size="sm" onPress={onBack}>
          ← Volver
        </Button>
        <Text variant="h1">Componente Button</Text>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Variante: Primary
        </Text>
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
        <Text variant="h3" color="primary">
          Variante: Secondary
        </Text>
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
        <Text variant="h3" color="primary">
          Variante: Outlined
        </Text>
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
        <Text variant="h3" color="primary">
          Variante: Ghost
        </Text>
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
        <Text variant="h3" color="primary">
          Con Iconos
        </Text>
        <View style={styles.buttonColumn}>
          <Button variant="primary" leftIcon={<Text>⭐</Text>}>
            Left Icon
          </Button>
          <Button variant="primary" rightIcon={<Text>→</Text>}>
            Right Icon
          </Button>
          <Button
            variant="primary"
            leftIcon={<Text>🚀</Text>}
            rightIcon={<Text>✨</Text>}
          >
            Both Icons
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Estados Especiales
        </Text>
        <View style={styles.buttonColumn}>
          <Button disabled>Disabled Button</Button>
          <Button loading>Loading Button</Button>
          <Button disabled loading>
            Disabled + Loading
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Full Width
        </Text>
        <View style={styles.buttonColumn}>
          <Button fullWidth>Full Width Button</Button>
          <Button variant="secondary" fullWidth>
            Full Width Secondary
          </Button>
          <Button variant="outlined" fullWidth>
            Full Width Outlined
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Combinaciones
        </Text>
        <View style={styles.buttonColumn}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            leftIcon={<Text>🎨</Text>}
          >
            Large Primary with Icon
          </Button>
          <Button variant="outlined" size="sm" leftIcon={<Text>✏️</Text>}>
            Small Outlined with Icon
          </Button>
          <Button variant="ghost" size="md" disabled>
            Disabled Ghost
          </Button>
          <Button variant="secondary" loading fullWidth>
            Loading Full Width
          </Button>
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
  header: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  section: {
    gap: spacing.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonColumn: {
    gap: spacing.md,
  },
});
