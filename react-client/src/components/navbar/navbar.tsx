import { Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import LoginDialog from "../loginDialog/loginDialog";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <nav className="navigation">
        <Link to="/" className="brand-name">
          <p>Brändi</p>
        </Link>
        <div className="navigation-menu">
          <ul>
            <li>
              <Button variant="contained" onClick={handleClickOpen}>
                Kirjaudu
              </Button>
              <LoginDialog open={open} onClose={handleClose} />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
