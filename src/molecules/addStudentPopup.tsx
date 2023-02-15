import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { z } from "zod";

type AddStudentPopupProps = {
  open: boolean;
  onClose: any;
  onAdd: any;
};

export const AddStudentPopup = (props: AddStudentPopupProps) => {
  const [open, setOpen] = useState(props.open);
  const [image, setImage] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [index, setIndex] = useState(0);
  const [contactNo, setContactNo] = useState("");

  const urlValidation = () => {
    return z.string().url().safeParse(image).success;
  };

  const indexValidation = () => {
    return z.number().int().min(4).safeParse(index).success;
  };

  const contactNumberValidation = () => {
    var regExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return regExp.test(contactNo);
  };

  const validateForm = () => {
    return (
      fname !== "" &&
      lname !== "" &&
      indexValidation() &&
      contactNumberValidation() &&
      (image === "" ? true : urlValidation())
    );
  };

  return (
    <Dialog open={open} onClose={props.onClose}>
      <DialogTitle>Add New Student</DialogTitle>
      <DialogContent>
        <DialogContentText>Add a New Student to the School</DialogContentText>
        <TextField
          error={fname === "" ? true : false}
          required
          autoFocus
          margin="dense"
          id="fname"
          label="First Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setFname(e.target.value);
          }}
        />
        <TextField
          error={lname === "" ? true : false}
          required
          autoFocus
          margin="dense"
          id="lname"
          label="Last Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setLname(e.target.value);
          }}
        />
        <TextField
          helperText={indexValidation() ? "" : "Invalid Index"}
          error={indexValidation() ? false : true}
          required
          autoFocus
          margin="dense"
          id="index"
          label="Index No"
          type="number"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setIndex(Number(e.target.value));
          }}
        />
        <TextField
          helperText={contactNumberValidation() ? "" : "Invalid Contact No"}
          error={contactNumberValidation() ? false : true}
          required
          autoFocus
          margin="dense"
          id="contact"
          label="Contact No"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setContactNo(e.target.value);
          }}
        />
        <TextField
          error={image !== "" && urlValidation() ? false : true}
          autoFocus
          margin="dense"
          id="image"
          label="Image URL"
          type="text"
          fullWidth
          variant="standard"
          helperText={urlValidation() ? "" : "Invalid URL"}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (validateForm()) {
              props.onAdd({
                image: image,
                fname: fname,
                lname: lname,
                index: index,
                contactNo: contactNo,
              });
            }
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
