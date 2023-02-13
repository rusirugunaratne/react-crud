import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AddStudentPopup } from "./addStudentPopup";
import { useState } from "react";

function ButtonAppBar() {
  const [open, setOpen] = useState(false);

  const handleOnClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {};

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Student Managemt System
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default ButtonAppBar;
