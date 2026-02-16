import React, { useState, useRef } from 'react';
import { Animated, StyleSheet, View, ScrollView } from 'react-native';

import { Button, Text } from '@components/core';
import { spacing, useTheme } from '@theme/index';
import TextsView from './TextsView';
import ButtonsView from './ButtonsView';
import TextInputsView from './TextInputsView';

type ViewType = 'landing' | 'texts' | 'buttons' | 'textinputs';

function LandingPage({
  onNavigateToTexts,
  onNavigateToButtons,
  onNavigateToTextInputs,
}: {
  onNavigateToTexts: () => void;
  onNavigateToButtons: () => void;
  onNavigateToTextInputs: () => void;
}) {
  const { mode } = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.landingContainer}>
      <View style={styles.heroSection}>
        <Text variant="h1" align="center">
          Component Library
        </Text>
        <Text variant="body" align="center" color="textSecondary">
          Explora los componentes de UI disponibles
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text variant="h3">Text</Text>
          <Text variant="bodySmall" color="textSecondary">
            Todas las variantes de texto y estilos tipográficos
          </Text>
          <Button variant="primary" fullWidth onPress={onNavigateToTexts}>
            Ver Textos
          </Button>
        </View>

        <View style={styles.card}>
          <Text variant="h3">Button</Text>
          <Text variant="bodySmall" color="textSecondary">
            Todas las variantes de botones y estados
          </Text>
          <Button variant="primary" fullWidth onPress={onNavigateToButtons}>
            Ver Botones
          </Button>
        </View>

        <View style={styles.card}>
          <Text variant="h3">TextInput</Text>
          <Text variant="bodySmall" color="textSecondary">
            Todas las variantes de inputs y estados de formulario
          </Text>
          <Button variant="primary" fullWidth onPress={onNavigateToTextInputs}>
            Ver Inputs
          </Button>
        </View>
      </View>

      <View style={styles.footer}>
        <Text variant="caption" align="center" color="textSecondary">
          Tema actual: {mode}
        </Text>
      </View>
    </ScrollView>
  );
}

export default function RootView() {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animateTransition = (
    callback: () => void,
    direction: 'forward' | 'backward',
  ) => {
    const slideOutValue = direction === 'forward' ? -50 : 50;
    const slideInValue = direction === 'forward' ? 50 : -50;

    // Fade out and slide
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: slideOutValue,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
      // Reset and fade in from opposite direction
      slideAnim.setValue(slideInValue);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const navigateTo = (view: ViewType) => {
    const direction = view === 'landing' ? 'backward' : 'forward';
    animateTransition(() => setCurrentView(view), direction);
  };

  const renderView = () => {
    switch (currentView) {
      case 'texts':
        return <TextsView onBack={() => navigateTo('landing')} />;
      case 'buttons':
        return <ButtonsView onBack={() => navigateTo('landing')} />;
      case 'textinputs':
        return <TextInputsView onBack={() => navigateTo('landing')} />;
      default:
        return (
          <LandingPage
            onNavigateToTexts={() => navigateTo('texts')}
            onNavigateToButtons={() => navigateTo('buttons')}
            onNavigateToTextInputs={() => navigateTo('textinputs')}
          />
        );
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      {renderView()}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  landingContainer: {
    padding: spacing.lg,
    gap: spacing.xl,
    paddingBottom: spacing['2xl'],
  },
  heroSection: {
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  cardsContainer: {
    gap: spacing.lg,
    flex: 1,
  },
  card: {
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
  },
  footer: {
    marginTop: 'auto',
    paddingVertical: spacing.md,
  },
});
