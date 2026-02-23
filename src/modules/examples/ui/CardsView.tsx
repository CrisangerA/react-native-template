import React from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';

import { Button, Card, Text } from '@components/core';
import { spacing } from '@theme/index';

interface CardsViewProps {
  onBack: () => void;
}

export default function CardsView({ onBack }: CardsViewProps) {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Button variant="ghost" size="sm" onPress={onBack}>
          ← Volver
        </Button>
        <Text variant="h1">Componente Card</Text>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Variantes
        </Text>
        <View style={styles.cardsColumn}>
          <Card variant="elevated" style={styles.cardDemo}>
            <Text variant="h4">Elevated</Text>
            <Text variant="bodySmall" color="textSecondary">
              Con sombra para destacar
            </Text>
          </Card>
          <Card variant="outlined" style={styles.cardDemo}>
            <Text variant="h4">Outlined</Text>
            <Text variant="bodySmall" color="textSecondary">
              Con borde visible
            </Text>
          </Card>
          <Card variant="filled" style={styles.cardDemo}>
            <Text variant="h4">Filled</Text>
            <Text variant="bodySmall" color="textSecondary">
              Fondo sólido
            </Text>
          </Card>
          <Card variant="ghost" style={styles.cardDemo}>
            <Text variant="h4">Ghost</Text>
            <Text variant="bodySmall" color="textSecondary">
              Sin fondo ni borde
            </Text>
          </Card>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Tamaños
        </Text>
        <View style={styles.cardsColumn}>
          <Card size="sm" variant="elevated" style={styles.cardDemo}>
            <Text variant="body">Small</Text>
            <Text variant="caption" color="textSecondary">
              padding: sm
            </Text>
          </Card>
          <Card size="md" variant="elevated" style={styles.cardDemo}>
            <Text variant="body">Medium</Text>
            <Text variant="caption" color="textSecondary">
              padding: md
            </Text>
          </Card>
          <Card size="lg" variant="elevated" style={styles.cardDemo}>
            <Text variant="body">Large</Text>
            <Text variant="caption" color="textSecondary">
              padding: lg
            </Text>
          </Card>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Border Radius
        </Text>
        <View style={styles.cardsRow}>
          <Card variant="outlined" borderRadius="sm" style={styles.cardRadius}>
            <Text variant="caption">sm</Text>
          </Card>
          <Card variant="outlined" borderRadius="md" style={styles.cardRadius}>
            <Text variant="caption">md</Text>
          </Card>
          <Card variant="outlined" borderRadius="lg" style={styles.cardRadius}>
            <Text variant="caption">lg</Text>
          </Card>
          <Card variant="outlined" borderRadius="xl" style={styles.cardRadius}>
            <Text variant="caption">xl</Text>
          </Card>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Card Interactivo (Pressable)
        </Text>
        <View style={styles.cardsColumn}>
          <Card
            variant="elevated"
            onPress={() =>
              Alert.alert('Card presionado', '¡El Card es interactivo!')
            }
            style={styles.cardDemo}
          >
            <Text variant="h4">Tocable</Text>
            <Text variant="bodySmall" color="textSecondary">
              Este Card responde a onPress
            </Text>
          </Card>
          <Card
            variant="outlined"
            onPress={() => Alert.alert('Card outlined', 'Presionado')}
            style={styles.cardDemo}
          >
            <Text variant="h4">Outlined Pressable</Text>
            <Text variant="bodySmall" color="textSecondary">
              Con efecto de presión
            </Text>
          </Card>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Card Deshabilitado
        </Text>
        <View style={styles.cardsColumn}>
          <Card
            variant="elevated"
            disabled
            onPress={() => {}}
            style={styles.cardDemo}
          >
            <Text variant="h4" color="textSecondary">
              Disabled Elevated
            </Text>
          </Card>
          <Card
            variant="outlined"
            disabled
            onPress={() => {}}
            style={styles.cardDemo}
          >
            <Text variant="h4" color="textSecondary">
              Disabled Outlined
            </Text>
          </Card>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Full Width
        </Text>
        <View style={styles.cardsColumn}>
          <Card variant="elevated" fullWidth style={styles.cardDemo}>
            <Text variant="body">Full Width Card</Text>
            <Text variant="caption" color="textSecondary">
              Ocupa todo el ancho disponible
            </Text>
          </Card>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Combinaciones
        </Text>
        <View style={styles.cardsColumn}>
          <Card
            variant="elevated"
            size="lg"
            borderRadius="lg"
            fullWidth
            onPress={() =>
              Alert.alert('Card completo', 'Large + Elevated + BorderRadius')
            }
            style={styles.cardDemo}
          >
            <Text variant="h4">Card Completo</Text>
            <Text variant="bodySmall" color="textSecondary">
              variant: elevated, size: lg, borderRadius: lg
            </Text>
          </Card>
          <Card
            variant="ghost"
            size="sm"
            borderRadius="sm"
            onPress={() => Alert.alert('Ghost', 'Small + Ghost')}
            style={styles.cardDemo}
          >
            <Text variant="bodySmall">Ghost Small</Text>
          </Card>
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
  cardsColumn: {
    gap: spacing.md,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  cardDemo: {
    minHeight: 80,
  },
  cardRadius: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
