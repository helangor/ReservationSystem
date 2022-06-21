import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { ProductDto, Reservation } from "../../types/types";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import config from "../../config.json";
import { Col, Container, Row } from "react-grid-system";
import { useState } from "react";
import axios from "axios";
const locale = config.LOCALE;

export interface ReservationDialogProps {
  open: boolean;
  onClose: () => void;
  product: ProductDto;
  reserveDates: Date[];
}

export default function ReservationDialog(props: ReservationDialogProps) {
  const { product, reserveDates, onClose, open } = props;

  const formLabels = [
    { label: "Nimesi", name: "name" },
    { label: "Osoite", name: "address" },
    { label: "Sähköposti", name: "email" },
    { label: "Puhelinnumero", name: "phoneNumber" },
  ];

  const [reservation, setReservation] = useState({
    product: product,
    startTime: reserveDates[0],
    endTime: reserveDates[1],
  });

  const handleReservationChange = (e: any) => {
    const { name, value } = e.target;
    setReservation((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createReservation = () => {
    console.log("Tilattu", { reservation });
    axios
      .post(
        "https://localhost:44383/api/Reservation/create-reservation",
        reservation
      )
      .then((response) => console.log(response.data));
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullScreen={true}>
      <Container fluid>
        <Col>
          <IconButton aria-label="go-back-button" onClick={handleClose}>
            <ArrowBackIosIcon fontSize="large"></ArrowBackIosIcon>
          </IconButton>

          <DialogTitle>Varauksesi</DialogTitle>

          <p>{product?.name}</p>

          <p>
            <strong>Alkuaika</strong>:{" "}
            {reserveDates[0] && reserveDates[0].toLocaleDateString(locale)}
          </p>
          <p>
            <strong>Loppuaika</strong>:{" "}
            {reserveDates[1] && reserveDates[1].toLocaleDateString(locale)}
          </p>

          <p>Toimitus vai Nouto</p>
          <p>HINTA</p>
        </Col>
        <Row direction="column" component="form">
          {formLabels.map((l) => (
            <TextField
              key={l.label}
              id="outlined-basic"
              label={l.label}
              name={l.name}
              variant="outlined"
              onChange={handleReservationChange}
            />
          ))}
          <Button onClick={createReservation}>Tilaa</Button>
        </Row>
      </Container>
    </Dialog>
  );
}
