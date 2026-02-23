import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Button, Checkbox, Text } from '@components/core';
import { spacing } from '@theme/index';

interface CheckboxesViewProps {
  onBack: () => void;
}

export default function CheckboxesView({ onBack }: CheckboxesViewProps) {
  const [checkedSm, setCheckedSm] = useState(true);
  const [checkedMd, setCheckedMd] = useState(false);
  const [checkedLg, setCheckedLg] = useState(true);
  const [checkedPrimary, setCheckedPrimary] = useState(true);
  const [checkedError, setCheckedError] = useState(true);
  const [checkedNoLabel, setCheckedNoLabel] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Button variant="ghost" size="sm" onPress={onBack}>
          ← Volver
        </Button>
        <Text variant="h1">Componente Checkbox</Text>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Tamaños
        </Text>
        <View style={styles.checkboxRow}>
          <Checkbox
            size="sm"
            checked={checkedSm}
            onChange={setCheckedSm}
            label="Small"
          />
          <Checkbox
            size="md"
            checked={checkedMd}
            onChange={setCheckedMd}
            label="Medium"
          />
          <Checkbox
            size="lg"
            checked={checkedLg}
            onChange={setCheckedLg}
            label="Large"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Variantes
        </Text>
        <View style={styles.checkboxColumn}>
          <Checkbox
            variant="primary"
            checked={checkedPrimary}
            onChange={setCheckedPrimary}
            label="Primary"
          />
          <Checkbox
            variant="error"
            checked={checkedError}
            onChange={setCheckedError}
            label="Error"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Estados
        </Text>
        <View style={styles.checkboxColumn}>
          <Checkbox checked label="Checked" />
          <Checkbox checked={false} label="Unchecked" />
          <Checkbox checked disabled label="Disabled Checked" />
          <Checkbox checked={false} disabled label="Disabled Unchecked" />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Sin label
        </Text>
        <View style={styles.checkboxRow}>
          <Checkbox checked={checkedNoLabel} onChange={setCheckedNoLabel} />
          <Checkbox checked disabled />
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
  checkboxRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    alignItems: 'center',
  },
  checkboxColumn: {
    gap: spacing.md,
  },
});
