import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from '@components/form';
import { Button } from '@components/core';
import { spacing } from '@theme/index';
import { productSchema, ProductFormData } from '../../domain/product.scheme';
import { productFormDefaultsAdapter } from '../../domain/product.adapter';
import type { ProductEntity } from '../../domain/product.model';

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  isLoading?: boolean;
  initialData?: ProductEntity;
}

export function ProductForm({
  onSubmit,
  isLoading = false,
  initialData,
}: ProductFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description || '',
          price: initialData.price,
        }
      : productFormDefaultsAdapter(),
  });

  return (
    <View style={styles.container}>
      <TextInput
        control={control}
        name="name"
        label="Nombre"
        placeholder="Ingresa el nombre del producto"
        error={errors.name?.message}
      />

      <TextInput
        control={control}
        name="description"
        label="Descripción"
        placeholder="Ingresa la descripción (opcional)"
        error={errors.description?.message}
        multiline
        numberOfLines={3}
      />

      <TextInput
        control={control}
        name="price"
        label="Precio"
        placeholder="0.00"
        keyboardType="decimal-pad"
        error={errors.price?.message}
      />

      <Button
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        style={styles.button}
      >
        {initialData ? 'Actualizar' : 'Crear'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  button: {
    marginTop: spacing.md,
  },
});
