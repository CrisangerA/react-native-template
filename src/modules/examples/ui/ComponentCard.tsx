import React, { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { Text, Card } from '@components/core';
import { spacing } from '@theme/index';
import { borderRadius } from '@theme/borders';

export interface ComponentCardProps {
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
  }, [delay, fadeAnim, translateY]);

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      <Card
        onPress={onPress}
        style={{ ...styles.card, borderLeftColor: color }}
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
      </Card>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default ComponentCard;
