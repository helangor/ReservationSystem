import { Dialog, DialogTitle } from "@mui/material";
import { ProductDto } from "../../types/types";
import config from "../../config.json";
const locale = config.LOCALE;

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  product: ProductDto;
  reserveDates: Date[];
}

export default function ReservationDialog(props: SimpleDialogProps) {
  const { product, reserveDates, onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true}>
      <DialogTitle>Varaa</DialogTitle>
      <p>{product?.name}</p>
      <p>
        <p>
          <strong>Alkuaika</strong>:{" "}
          {reserveDates[0] && reserveDates[0].toLocaleDateString(locale)}
        </p>
        <p>
          <strong>Loppuaika</strong>:{" "}
          {reserveDates[1] && reserveDates[1].toLocaleDateString(locale)}
        </p>
      </p>
      <p>Mistä haetaan tai mihin toimitetaan</p>
      <p>HINTA</p>
    </Dialog>
  );
}
