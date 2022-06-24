import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Col, Container, Row } from "react-grid-system";

export interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginDialog(props: LoginDialogProps) {
  const formLabels = [
    { label: "Käyttäjätunnus", name: "username" },
    { label: "Salasana", name: "password", type: "password" },
  ];

  const onKeyDownHandler = (e: any) => {
    if (e.key === "Enter") {
      login();
    }
  };

  const [loginError, setLoginError] = useState(false);

  const [loginCreds, setLoginCreds] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginError(false);
    setLoginCreds((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { onClose, open } = props;

  const handleClose = () => {
    setLoginError(false);
    onClose();
  };

  const login = () => {
    axios
      .post("https://localhost:44383/api/account/login", loginCreds)
      .then((response) => handleClose())
      .catch((error) => {
        setLoginError(true);
      });
  };

  return (
    <Dialog onClose={handleClose} open={open} onKeyDown={onKeyDownHandler}>
      <Container fluid>
        <Col>
          <DialogTitle>Kirjautuminen</DialogTitle>
          {loginError && (
            <Typography variant="caption" display="block" gutterBottom>
              Väärät tiedot!
            </Typography>
          )}
          <Row direction="column" component="form">
            {formLabels.map((l) => (
              <TextField
                error={loginError}
                key={l.label}
                label={l.label}
                name={l.name}
                type={l.type}
                variant="outlined"
                onChange={handleChange}
              />
            ))}
            <Button onClick={login}>Kirjaudu</Button>
          </Row>
        </Col>
      </Container>
    </Dialog>
  );
}
