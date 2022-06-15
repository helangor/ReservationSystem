import axios from "axios";
import { useEffect, useState } from "react";
import { ProductDto } from "../../types/types";
import { ProductCard } from "./productCard";

const FetchProducts = () => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("https://localhost:44383/api/Products")
      .then((response) => setProducts(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoaded(true));
  }, []);
  return { products, error, loaded };
};

export function Products() {
  const { products, error, loaded } = FetchProducts();

  console.log({ products });

  if (loaded) {
    if (error) {
      return <span>Error: {error}</span>;
    } else {
      return (
        <>
          {products.map((p) => (
            <ProductCard {...p} />
          ))}
        </>
      );
    }
  }
  return <span>Loading...</span>;
}
