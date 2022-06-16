import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductDto } from "../../types/types";
import "../../styles/productDetail.css";
import { Col, Container, Row } from "react-grid-system";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
  const [selectedDate, setSelectedDate] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);

  return (
    <Container fluid>
      <Row>
        <Col>{product?.introduction}</Col>
      </Row>
      <Row>
        <Col>
          <p>{product?.name}</p>
        </Col>
        <Col>
          <p>{product?.city}</p>
        </Col>
        <Col>
          <p>Price: $</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <img src={product?.photos[0].url}></img>
        </Col>
        <Col>
          <Row>
            <Calendar
              minDate={new Date()}
              selectRange={true}
              onChange={(value: Date[], event: any) => {
                setSelectedDate(value);
                console.log({ value });
              }}
            ></Calendar>
          </Row>
          <Row>
            <h2>
              {selectedDate[0].getDate()} - {selectedDate[1].getDate()}
            </h2>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Button variant="contained">
            <Link to="/">Mene takaisin etusivulle</Link>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
