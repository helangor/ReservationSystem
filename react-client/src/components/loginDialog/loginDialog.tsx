import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import { useDispatch } from "react-redux";
import { authThunkLogin } from "../../store/slices/authSlice";
import { AppDispatch } from "../../store/store";

export interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginDialog(props: LoginDialogProps) {
  const dispatch = useDispatch<AppDispatch>();

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
    clearLoginCreds();
    onClose();
  };

  const clearLoginCreds = () => {
    setLoginCreds((prevState: any) => ({
      username: "",
      password: "",
    }));
  };

  const login = () => {
    if (loginCreds.username && loginCreds.password) {
      const response = dispatch(
        authThunkLogin({
          username: loginCreds.username,
          password: loginCreds.password,
        })
      );
      response.then((o) => {
        if (o.payload) {
          handleClose();
        } else {
          setLoginError(true);
        }
      });
    } else {
      setLoginError(true);
    }
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
            <TextField
              error={loginError}
              name="username"
              label="Käyttäjätunnus"
              type="text"
              variant="outlined"
              onChange={handleChange}
              value={loginCreds.username}
            />
            <TextField
              error={loginError}
              name="password"
              label="Salasana"
              type="password"
              variant="outlined"
              onChange={handleChange}
              value={loginCreds.password}
            />
            <Button onClick={login}>Kirjaudu</Button>
          </Row>
        </Col>
      </Container>
    </Dialog>
  );
}
