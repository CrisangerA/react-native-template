import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
// Components
import { Text, Card } from '@components/core';
// Types
import type { ProductEntity } from '../../domain/product.model';
// Theme
import { useFocusFadeIn } from '@theme/hooks';
import { ANIMATION_DURATION, spacing } from '@theme/index';
// Navigation
import { ProductsRoutes } from '@navigation/routes';
import { useNavigationProducts } from '@navigation/hooks';

interface ProductItemProps {
  product: ProductEntity;
  index: number;
}

export const ProductItem = React.memo(function ProductItem({
  product,
  index,
}: ProductItemProps) {
  const { navigate } = useNavigationProducts();
  const { animatedStyle } = useFocusFadeIn({
    delay: index * 100,
    duration: ANIMATION_DURATION.normal,
  });

  const handleCardPress = () => {
    navigate(ProductsRoutes.ProductDetail, { productId: product.id });
  };

  return (
    <Animated.View style={animatedStyle}>
      <Card onPress={handleCardPress}>
        <View style={styles.info}>
          <Text variant="h3">{product.name}</Text>
          {product.description ? (
            <Text variant="body">{product.description}</Text>
          ) : null}
          <Text variant="caption" color="primary">
            ${product.price.toFixed(2)}
          </Text>
        </View>
      </Card>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  info: {
    flex: 1,
    gap: spacing.xs,
  },
});
