import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import productService from '../infrastructure/product.service';
import type { ProductFilter } from '../domain/product.repository';

export function useProducts(filter?: ProductFilter, enabled = true) {
  return useQuery({
    queryKey: ['products', 'list', filter?.searchText],
    queryFn: async () => {
      const result = await productService.getAll(filter);
      if (result instanceof Error) {
        throw result;
      }
      return result;
    },
    enabled,
  });
}

export function useProduct(id: string, enabled = true) {
  return useQuery({
    queryKey: ['products', 'detail', id],
    queryFn: async () => {
      const result = await productService.getById(id);
      if (result instanceof Error) {
        throw result;
      }
      return result;
    },
    enabled: enabled && Boolean(id),
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Parameters<typeof productService.create>[0]) => {
      const result = await productService.create(data);
      if (result instanceof Error) {
        throw result;
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof productService.update>[1];
    }) => {
      const result = await productService.update(id, data);
      if (result instanceof Error) {
        throw result;
      }
      return result;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({
        queryKey: ['products', 'detail', variables.id],
      });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await productService.delete(id);
      if (result instanceof Error) {
        throw result;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
