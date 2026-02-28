import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@components/core';
import { RootLayout } from '@components/layout';
import { ProductForm } from './components/ProductForm';
import { spacing } from '@theme/index';
import {
  useCreateProduct,
  useUpdateProduct,
} from '../application/product.queries';
import { productFormToPayloadAdapter } from '../domain/product.adapter';
import type { ProductEntity } from '../domain/product.model';
import type { ProductFormData } from '../domain/product.scheme';

interface ProductFormViewProps {
  product?: ProductEntity;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ProductFormView({
  product,
  onSuccess,
  onCancel,
}: ProductFormViewProps) {
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  const isLoading = isCreating || isUpdating;
  const isEditing = !!product;

  const handleSubmit = (data: ProductFormData) => {
    const payload = productFormToPayloadAdapter(data);

    if (isEditing) {
      updateProduct({ id: product.id, data: payload }, { onSuccess });
    } else {
      createProduct(payload, { onSuccess });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <RootLayout>
          <View style={styles.header}>
            <Button variant="ghost" onPress={onCancel}>
              Cancelar
            </Button>
          </View>

          <ProductForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            initialData={product}
          />
        </RootLayout>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: spacing.md,
  },
});
