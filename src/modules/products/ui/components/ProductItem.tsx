import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text } from '@components/core';
import { Card } from '@components/core';
import { useTheme, spacing } from '@theme/index';
import type { ProductEntity } from '../../domain/product.model';

interface ProductItemProps {
  product: ProductEntity;
  onPress: (product: ProductEntity) => void;
}

export function ProductItem({ product, onPress }: ProductItemProps) {
  const theme = useTheme();

  return (
    <Pressable onPress={() => onPress(product)}>
      <Card style={styles.card}>
        <View style={styles.content}>
          <View style={styles.info}>
            <Text variant="h3" style={styles.name}>
              {product.name}
            </Text>
            {product.description ? (
              <Text variant="body" style={styles.description}>
                {product.description}
              </Text>
            ) : null}
            <Text variant="caption" style={{ color: theme.colors.primary }}>
              ${product.price.toFixed(2)}
            </Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    marginBottom: spacing.xs,
  },
  description: {
    opacity: 0.7,
  },
});
