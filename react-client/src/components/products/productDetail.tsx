import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductDto } from "../../types/types";

const FetchProduct = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState<ProductDto>();
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`https://localhost:44383/api/Products/${productName}`)
      .then((response) => setProduct(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoaded(true));
  }, []);
  return { product, error, loaded };
};

export function ProductDetail() {
  const { product, error, loaded } = FetchProduct();

  return (
    <div>
      <h1>Löyty</h1>
      <p>{product?.name}</p>
      <p>Price: $</p>
    </div>
  );
}
