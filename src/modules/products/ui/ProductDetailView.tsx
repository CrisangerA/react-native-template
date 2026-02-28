import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
// Components
import { Text, Card, Button } from '@components/core';
import {
  LoadingState,
  ErrorState,
  EmptyState,
  RootLayout,
} from '@components/layout';
import { DeleteConfirmationSheet } from './components/DeleteConfirmationSheet';
// Application
import { useProduct } from '../application/product.queries';
import { useProductDelete } from '../application/product.mutations';
// Navigation
import { ProductsRoutes, ProductsScreenProps } from '@navigation/routes';
import { useNavigationProducts } from '@navigation/hooks';
// Theme
import { spacing } from '@theme/index';

export function ProductDetailView({
  route: {
    params: { productId },
  },
}: ProductsScreenProps<ProductsRoutes.ProductDetail>) {
  const { goBack, navigate } = useNavigationProducts();
  const [showDeleteSheet, setShowDeleteSheet] = useState(false);

  const { data: product, isLoading, isError, error } = useProduct(productId);
  const { mutate: deleteProduct, isPending: isDeleting } = useProductDelete();

  const handleDelete = () => {
    deleteProduct(productId, {
      onSuccess: () => {
        setShowDeleteSheet(false);
        goBack();
      },
    });
  };

  function handleEdit() {
    product && navigate(ProductsRoutes.ProductForm, { product });
  }

  if (isLoading) {
    return <LoadingState message="Cargando producto..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Error al cargar"
        message={error?.message || 'No se pudo cargar el producto'}
        onRetry={goBack}
        retryLabel="Volver"
      />
    );
  }

  if (!product) {
    return (
      <EmptyState
        title="Producto no encontrado"
        message="El producto que buscas no existe o fue eliminado"
        icon="📦"
        onAction={goBack}
        actionLabel="Volver"
      />
    );
  }
  return (
    <RootLayout padding="md">
      <View style={styles.header}>
        <Button variant="ghost" onPress={goBack}>
          Volver
        </Button>
        <Button variant="outlined" onPress={handleEdit}>
          Editar
        </Button>
      </View>

      <View style={styles.content}>
        <Card style={styles.card}>
          <Text variant="h2">{product.name}</Text>

          {product.description && (
            <Text variant="body">{product.description}</Text>
          )}

          <Text variant="h3">${product.price.toFixed(2)}</Text>
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

        <Button variant="primary" onPress={() => setShowDeleteSheet(true)}>
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
    </RootLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  content: {
    padding: spacing.md,
    gap: spacing.md,
  },
  card: {
    gap: spacing.xs,
  },
});
