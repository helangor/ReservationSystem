import { ProductDto } from "../../types/types";

export function ProductCard(product: ProductDto) {
  return (
    <>
      <h1>{product.name}</h1>
      <p>{product.city}</p>
      <p>{product.introduction}</p>
    </>
  );
}
