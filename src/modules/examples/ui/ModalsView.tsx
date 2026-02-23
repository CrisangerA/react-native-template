import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Button, Modal, Text } from '@components/core';
import { spacing } from '@theme/index';

interface ModalsViewProps {
  onBack: () => void;
}

type ActiveModal = 'basic' | 'icon' | 'sizes' | 'backdrop' | null;

export default function ModalsView({ onBack }: ModalsViewProps) {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Button variant="ghost" size="sm" onPress={onBack}>
          ← Volver
        </Button>
        <Text variant="h1">Componente Modal</Text>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Básico
        </Text>
        <Button onPress={() => setActiveModal('basic')}>Abrir Modal</Button>
        <Modal
          visible={activeModal === 'basic'}
          onRequestClose={closeModal}
          title="Modal Básico"
        >
          <Text variant="body">
            Este es un modal simple con título y contenido.
          </Text>
          <View style={styles.modalActions}>
            <Button variant="secondary" onPress={closeModal}>
              Cerrar
            </Button>
          </View>
        </Modal>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Con Icono
        </Text>
        <Button onPress={() => setActiveModal('icon')}>
          Abrir Modal con Icono
        </Button>
        <Modal
          visible={activeModal === 'icon'}
          onRequestClose={closeModal}
          title="Modal con Icono"
          icon={<Text>✕</Text>}
          onPressIcon={closeModal}
        >
          <Text variant="bodySmall" color="textSecondary">
            Puedes usar un icono interactivo en el header.
          </Text>
          <View style={styles.modalActions}>
            <Button onPress={closeModal}>Entendido</Button>
          </View>
        </Modal>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Tamaños
        </Text>
        <View style={styles.buttonRow}>
          <Button size="sm" onPress={() => setActiveModal('sizes')}>
            Small
          </Button>
          <Button size="md" onPress={() => setActiveModal('sizes')}>
            Medium
          </Button>
          <Button size="lg" onPress={() => setActiveModal('sizes')}>
            Large
          </Button>
        </View>
        <Modal
          visible={activeModal === 'sizes'}
          onRequestClose={closeModal}
          title="Modal Tamaños"
          size="lg"
        >
          <Text variant="bodySmall" color="textSecondary">
            Este modal usa el tamaño large como ejemplo.
          </Text>
          <View style={styles.modalActions}>
            <Button variant="secondary" onPress={closeModal}>
              Cerrar
            </Button>
          </View>
        </Modal>
      </View>

      <View style={styles.section}>
        <Text variant="h3" color="primary">
          Backdrop
        </Text>
        <Button onPress={() => setActiveModal('backdrop')}>
          Cerrar tocando el fondo
        </Button>
        <Modal
          visible={activeModal === 'backdrop'}
          onRequestClose={closeModal}
          title="Modal con Backdrop"
          closeOnBackdropPress
        >
          <Text variant="bodySmall" color="textSecondary">
            Toca el fondo para cerrar este modal.
          </Text>
          <View style={styles.modalActions}>
            <Button onPress={closeModal}>Cerrar</Button>
          </View>
        </Modal>
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
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  modalActions: {
    marginTop: spacing.md,
    alignItems: 'flex-end',
  },
});
