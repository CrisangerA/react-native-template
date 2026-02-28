import {
  CreateProductPayload,
  ProductEntity,
  ProductFilter,
  UpdateProductPayload,
} from './product.model';

export type { ProductFilter };
export interface ProductRepository {
  getAll(filter?: ProductFilter): Promise<ProductEntity[] | Error>;
  getById(id: string): Promise<ProductEntity | Error>;
  create(data: CreateProductPayload): Promise<ProductEntity | Error>;
  update(
    id: string,
    data: UpdateProductPayload,
  ): Promise<ProductEntity | Error>;
  delete(id: string): Promise<void | Error>;
}
