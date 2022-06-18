import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { ProductDto } from "../../types/types";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import config from "../../config.json";
import { Col, Container, Row } from "react-grid-system";
const locale = config.LOCALE;

export interface ReservationDialogProps {
  open: boolean;
  onClose: () => void;
  product: ProductDto;
  reserveDates: Date[];
}

export default function ReservationDialog(props: ReservationDialogProps) {
  const { product, reserveDates, onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullScreen={true}>
      <Container fluid>
        <Col>
          <IconButton aria-label="go-back-button">
            <ArrowBackIosIcon
              onClick={handleClose}
              fontSize="large"
            ></ArrowBackIosIcon>
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
          <TextField id="outlined-basic" label="Nimesi" variant="outlined" />
          <TextField id="outlined-basic" label="Osoite" variant="outlined" />
          <TextField
            id="outlined-basic"
            label="Sähköposti"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Puhelinnumero"
            variant="outlined"
          />
          <Button>Tilaa</Button>
        </Row>
      </Container>
    </Dialog>
  );
}
