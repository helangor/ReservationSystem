import { Button, Dialog, DialogTitle } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductDto } from "../../types/types";
import "../../styles/productDetail.css";
import { Col, Container, Row } from "react-grid-system";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReservationDialog from "../reservation-dialog/reservationDialog";
import config from "../../config.json";
const locale = config.LOCALE;

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

const getDate = (date: Date) => {
  if (!date) {
    return;
  } else {
    return date.toLocaleDateString(locale);
  }
};

export function ProductDetail() {
  const { product, error, loaded } = FetchProduct();
  const [selectedDate, setSelectedDate] = useState<Date[]>([]);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log({ locale });

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
              }}
            ></Calendar>
          </Row>
          <Row direction="column">
            <p>
              <strong>Alkuaika</strong>:{" "}
              {selectedDate[0] && selectedDate[0].toLocaleDateString(locale)}
            </p>
            <p>
              <strong>Loppuaika</strong>:{" "}
              {selectedDate[1] && selectedDate[1].toLocaleDateString(locale)}
            </p>
            <p>
              <strong>Hinta</strong>:{" "}
              {product?.priceRows.find((p) => (p.name = "Päivä"))?.price} euroa
            </p>
          </Row>
          <Row>
            <Button variant="outlined" onClick={handleClickOpen}>
              Tilaa
            </Button>
            <ReservationDialog
              open={open}
              onClose={handleClose}
              product={product!}
              reserveDates={selectedDate}
            />
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
