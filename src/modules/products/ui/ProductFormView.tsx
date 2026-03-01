import React from 'react';
// Components
import { RootLayout } from '@components/layout';
import { ProductForm } from './components/ProductForm';
// Application
import {
  useProductCreate,
  useProductUpdate,
} from '../application/product.mutations';
// Domain
import type { ProductFormData } from '../domain/product.scheme';
import { productFormToPayloadAdapter } from '../domain/product.adapter';
// Navigation
import { ProductsRoutes, ProductsScreenProps } from '@navigation/routes';

export function ProductFormView({
  route: { params },
  navigation: { goBack },
}: ProductsScreenProps<ProductsRoutes.ProductForm>) {
  const { mutate: createProduct, isPending: isCreating } = useProductCreate();
  const { mutate: updateProduct, isPending: isUpdating } = useProductUpdate();

  const isLoading = isCreating || isUpdating;

  const product = params?.product;
  const isEditing = !!product;

  const handleSubmit = (data: ProductFormData) => {
    const payload = productFormToPayloadAdapter(data);

    if (isEditing) {
      updateProduct({ id: product.id, data: payload }, {});
    } else {
      createProduct(payload, {});
    }
    goBack();
  };

  return (
    <RootLayout
      scroll
      padding="lg"
      onPress={goBack}
      title={isEditing ? 'Edit Product' : 'Create Product'}
    >
      <ProductForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        initialData={product}
      />
    </RootLayout>
  );
}
