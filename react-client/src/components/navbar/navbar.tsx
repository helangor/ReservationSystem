import { Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import "../../styles/navbar.css";
import LoginDialog from "../loginDialog/loginDialog";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isLoggedIn());
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setIsLoggedIn(authService.isLoggedIn());
    setOpen(false);
  };

  const handleLogOut = () => {
    authService.logout();
    setIsLoggedIn(false);
  };

  let loginButton;
  if (isLoggedIn) {
    loginButton = (
      <>
        <Button variant="contained" onClick={handleLogOut}>
          Kirjaudu Ulos
        </Button>
      </>
    );
  } else {
    loginButton = (
      <Button variant="contained" onClick={handleClickOpen}>
        Kirjaudu
      </Button>
    );
  }

  return (
    <>
      <nav className="navigation">
        <Link to="/" className="brand-name">
          <p>Brändi</p>
        </Link>
        <div className="nav-buttons">
          {isLoggedIn && (
            <Link to="/yritykseni">
              <Button variant="contained">Yritykseni</Button>
            </Link>
          )}
          {loginButton}
          <LoginDialog open={open} onClose={handleClose} />
        </div>
      </nav>
    </>
  );
}
