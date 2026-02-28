import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@components/core';
import { Button } from '@components/core';
import { Card } from '@components/core';
import { DeleteConfirmationSheet } from './components/DeleteConfirmationSheet';
import { spacing } from '@theme/index';
import { useProduct, useDeleteProduct } from '../application/product.queries';
import type { ProductEntity } from '../domain/product.model';

interface ProductDetailViewProps {
  productId: string;
  onBack: () => void;
  onEdit: (product: ProductEntity) => void;
}

export function ProductDetailView({
  productId,
  onBack,
  onEdit,
}: ProductDetailViewProps) {
  const [showDeleteSheet, setShowDeleteSheet] = useState(false);

  const { data: product, isLoading, isError, error } = useProduct(productId);
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const handleDelete = () => {
    deleteProduct(productId, {
      onSuccess: () => {
        setShowDeleteSheet(false);
        onBack();
      },
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
          <Text variant="body" style={styles.loadingText}>
            Cargando...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError || !product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text variant="h3" style={styles.errorTitle}>
            Error
          </Text>
          <Text variant="body">
            {error?.message || 'Producto no encontrado'}
          </Text>
          <Button onPress={onBack} style={styles.button}>
            Volver
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Button variant="ghost" onPress={onBack}>
          Volver
        </Button>
        <Button variant="outlined" onPress={() => onEdit(product)}>
          Editar
        </Button>
      </View>

      <View style={styles.content}>
        <Card style={styles.card}>
          <Text variant="h2">{product.name}</Text>

          {product.description ? (
            <Text variant="body" style={styles.description}>
              {product.description}
            </Text>
          ) : null}

          <Text variant="h3" style={styles.price}>
            ${product.price.toFixed(2)}
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text variant="caption">Fechas</Text>
          <Text variant="body">
            Creado: {new Date(product.createdAt).toLocaleDateString()}
          </Text>
          <Text variant="body">
            Actualizado: {new Date(product.updatedAt).toLocaleDateString()}
          </Text>
        </Card>

        <Button
          variant="primary"
          onPress={() => setShowDeleteSheet(true)}
          style={styles.deleteButton}
        >
          Eliminar Producto
        </Button>
      </View>

      <DeleteConfirmationSheet
        visible={showDeleteSheet}
        onClose={() => setShowDeleteSheet(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        productName={product.name}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  content: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.md,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  loadingText: {
    marginTop: spacing.md,
  },
  errorTitle: {
    color: 'red',
  },
  card: {
    gap: spacing.xs,
  },
  description: {
    opacity: 0.7,
    marginVertical: spacing.sm,
  },
  price: {
    color: 'primary',
    marginTop: spacing.sm,
  },
  deleteButton: {
    marginTop: 'auto',
  },
  button: {
    marginTop: spacing.md,
  },
});
