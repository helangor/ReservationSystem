import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductDto } from "../../types/types";
import { ProductCard } from "./productCard";
import "../../styles/products.css";

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

  if (loaded) {
    if (error) {
      return <span>Error: {error}</span>;
    } else {
      return (
        <div className="products">
          <Grid container spacing={2}>
            {products.map((p) => (
              <Grid item xs={12} md={6} lg={4} key={p.id}>
                <ProductCard {...p} key={p.id} />
              </Grid>
            ))}
          </Grid>
        </div>
      );
    }
  }
  return <span>Loading...</span>;
}
