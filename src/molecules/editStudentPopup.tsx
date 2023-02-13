import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

type AddStudentPopupProps = {
  student: any;
  open: boolean;
  onClose: any;
  onUpdate: any;
};

export const EditStudentPopup = (props: AddStudentPopupProps) => {
  const [open, setOpen] = useState(props.open);
  const [image, setImage] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [index, setIndex] = useState(0);
  const [contactNo, setContactNo] = useState("");

  return (
    <Dialog open={open} onClose={props.onClose}>
      <DialogTitle>Add New Student</DialogTitle>
      <DialogContent>
        <DialogContentText>Add a New Student to the School</DialogContentText>
        <TextField
          defaultValue={props.student.fname}
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
          autoFocus
          margin="dense"
          id="image"
          label="Image URL"
          type="text"
          fullWidth
          variant="standard"
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
          onClick={() =>
            props.onUpdate({
              id: props.student.id,
              image: image,
              fname: fname,
              lname: lname,
              index: index,
              contactNo: contactNo,
            })
          }
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
