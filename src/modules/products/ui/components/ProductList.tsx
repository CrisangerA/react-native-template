import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from '@components/core';
import { ProductItem } from './ProductItem';
import { spacing } from '@theme/index';
import type { ProductEntity } from '../../domain/product.model';

interface ProductListProps {
  products: ProductEntity[];
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  onProductPress: (product: ProductEntity) => void;
  onRetry?: () => void;
}

export function ProductList({
  products,
  isLoading,
  isError,
  error,
  onProductPress,
}: ProductListProps) {
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text variant="body" style={styles.loadingText}>
          Cargando productos...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text variant="h3" style={styles.errorTitle}>
          Error
        </Text>
        <Text variant="body" style={styles.errorText}>
          {error?.message || 'Error al cargar los productos'}
        </Text>
      </View>
    );
  }

  if (!products || products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text variant="h3" style={styles.emptyTitle}>
          Sin productos
        </Text>
        <Text variant="body" style={styles.emptyText}>
          No hay productos disponibles
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ProductItem product={item} onPress={onProductPress} />
      )}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: spacing.md,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  loadingText: {
    marginTop: spacing.md,
  },
  errorTitle: {
    color: 'red',
    marginBottom: spacing.sm,
  },
  errorText: {
    textAlign: 'center',
    opacity: 0.7,
  },
  emptyTitle: {
    marginBottom: spacing.sm,
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.7,
  },
});
