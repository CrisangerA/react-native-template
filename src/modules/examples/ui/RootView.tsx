import React, { useState, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { Text } from '@components/core';
import { spacing, useTheme } from '@theme/index';
import { borderRadius } from '@theme/borders';
import TextsView from './TextsView';
import ButtonsView from './ButtonsView';
import TextInputsView from './TextInputsView';

type ViewType = 'landing' | 'texts' | 'buttons' | 'textinputs';

interface ComponentCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  onPress: () => void;
  delay?: number;
}

function ComponentCard({
  title,
  description,
  icon,
  color,
  onPress,
  delay = 0,
}: ComponentCardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
const { shadows, colors } = useTheme();
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.cardTouchable}
    >
      <Animated.View
        style={[
          styles.card,
          shadows.md,
          { backgroundColor: colors.surface },
          styles.cardBorder,
          {
            opacity: fadeAnim,
            transform: [{ translateY }],
            borderLeftColor: color,
          },
        ]}
      >
        <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
          <Text style={[styles.icon, { color }]}>{icon}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text variant="h4" style={styles.cardTitle}>
            {title}
          </Text>
          <Text variant="bodySmall" color="textSecondary">
            {description}
          </Text>
        </View>
        <View style={styles.arrowContainer}>
          <Text style={[styles.arrow, { color }]}>→</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

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
  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(-30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(headerTranslateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const components = [
    {
      title: 'Text',
      description: 'Typography system with variants, colors & styles',
      icon: 'Aa',
      color: '#3B82F6',
      onPress: onNavigateToTexts,
    },
    {
      title: 'Button',
      description: 'Interactive buttons with multiple states & sizes',
      icon: '▢',
      color: '#10B981',
      onPress: onNavigateToButtons,
    },
    {
      title: 'TextInput',
      description: 'Form inputs with validation & icons support',
      icon: '✎',
      color: '#8B5CF6',
      onPress: onNavigateToTextInputs,
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.landingContainer}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        style={[
          styles.heroSection,
          {
            opacity: headerFadeAnim,
            transform: [{ translateY: headerTranslateY }],
          },
        ]}
      >
        <View style={styles.badge}>
          <Text variant="caption" color="primary" transform="uppercase">
            React Native
          </Text>
        </View>
        <Text variant="h1" align="center" style={styles.heroTitle}>
          Component
          <Text color="primary"> Library</Text>
        </Text>
        <Text
          variant="body"
          align="center"
          color="textSecondary"
          style={styles.heroSubtitle}
        >
          Explore and test our beautifully crafted UI components
        </Text>
      </Animated.View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text variant="h3" color="primary">
            3
          </Text>
          <Text variant="caption" color="textSecondary">
            Components
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text variant="h3" color="primary">
            20+
          </Text>
          <Text variant="caption" color="textSecondary">
            Variants
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text variant="h3" color="primary">
            {mode === 'dark' ? '🌙' : '☀️'}
          </Text>
          <Text variant="caption" color="textSecondary">
            {mode}
          </Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text variant="h5" color="textSecondary" transform="uppercase">
          Available Components
        </Text>
        <View style={styles.sectionLine} />
      </View>

      <View style={styles.cardsContainer}>
        {components.map((component, index) => (
          <ComponentCard
            key={component.title}
            {...component}
            delay={200 + index * 100}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text variant="caption" color="textSecondary" align="center">
            Built with React Native • TypeScript • Jest
          </Text>
        </View>
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
    paddingBottom: spacing['3xl'],
  },
  heroSection: {
    alignItems: 'center',
    marginTop: spacing['2xl'],
    marginBottom: spacing.xl,
  },
  badge: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginBottom: spacing.md,
  },
  heroTitle: {
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    maxWidth: 280,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingVertical: spacing.lg,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(150, 150, 150, 0.2)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(150, 150, 150, 0.2)',
    marginLeft: spacing.md,
  },
  cardsContainer: {
    gap: spacing.md,
  },
  cardTouchable: {
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    // shadowColor: '#000000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  cardBorder: {
    borderLeftWidth: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 24,
    fontWeight: '600',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    marginBottom: spacing.xs,
  },
  arrowContainer: {
    marginLeft: spacing.sm,
  },
  arrow: {
    fontSize: 24,
    fontWeight: '400',
  },
  footer: {
    marginTop: spacing['2xl'],
    paddingTop: spacing.lg,
  },
  footerContent: {
    alignItems: 'center',
  },
});
