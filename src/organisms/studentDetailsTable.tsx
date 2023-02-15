import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DetailStudent } from "../molecules/detailStudent";
import { StyledTableCell } from "../molecules/tableViews";
import { studentDetails } from "../assets/data/studentDetails";
import { useState } from "react";
import Button from "@mui/material/Button";
import { AddStudentPopup } from "../molecules/addStudentPopup";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import "./index.css";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { z } from "zod";

function StudentsDetailsTable() {
  const [openAdd, setOpen] = useState(false);
  const [students, setStudents] = useState(studentDetails);

  const [openUpdate, setUpdate] = useState(false);
  const [image, setImage] = useState("");
  const [id, setID] = useState(0);
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
    return fname !== "" &&
      lname !== "" &&
      indexValidation() &&
      contactNumberValidation() &&
      image === ""
      ? true
      : urlValidation();
  };

  const handleOnClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClose = () => {
    setUpdate(false);
  };

  const handleDelete = (id: number) => {
    setStudents(
      students.filter((student) => {
        return student.id !== id;
      })
    );
  };

  const handleAdd = (studentData: any) => {
    const newStudent = {
      id: students[students.length - 1].id + 1,
      image: studentData.image,
      fname: studentData.fname,
      lname: studentData.lname,
      index: studentData.index,
      contactNo: studentData.contactNo,
    };
    students.push(newStudent);
    setStudents(students);
    setOpen(false);
  };

  const handleUpdate = (studentData: any) => {
    setID(studentData.id);
    setFname(studentData.fname);
    setLname(studentData.lname);
    setIndex(studentData.index);
    setImage(studentData.image);
    setContactNo(studentData.contactNo);
    setUpdate(true);
  };

  return (
    <div>
      <Button
        onClick={handleOnClick}
        variant="contained"
        endIcon={<PersonAddAlt1Icon />}
      >
        ADD NEW STUDENT
      </Button>

      {DetailsTable()}

      {openAdd === true && (
        <AddStudentPopup
          open={openAdd}
          onClose={handleClose}
          onAdd={handleAdd}
        />
      )}

      {UpdateDialogPopup()}
    </div>
  );

  function DetailsTable() {
    return (
      <TableContainer className="table" component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="right">First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">Index Number</StyledTableCell>
              <StyledTableCell align="right">Contact Number</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => {
              return (
                <DetailStudent
                  key={student.id}
                  id={student.id}
                  fname={student.fname}
                  lname={student.lname}
                  image={student.image}
                  index={student.index}
                  telephone={student.contactNo}
                  onDelete={() => handleDelete(student.id)}
                  onUpdate={() => handleUpdate(student)}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  function UpdateDialogPopup() {
    return (
      <Dialog open={openUpdate} onClose={onClose}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit Student Details</DialogContentText>
          <TextField
            error={fname === "" ? true : false}
            required
            defaultValue={fname}
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
            defaultValue={lname}
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
            defaultValue={index}
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
            defaultValue={contactNo}
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
            defaultValue={image}
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
              setUpdate(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log("Contact ", contactNumberValidation());
              console.log("Form ", validateForm());
              if (validateForm()) {
                const newStudent = {
                  id: id,
                  image: image,
                  fname: fname,
                  lname: lname,
                  index: index,
                  contactNo: contactNo,
                };
                const newStudentList: any = students.filter((student) => {
                  return student.id !== id;
                });

                setStudents([...newStudentList, newStudent]);
                setUpdate(false);
              }
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default StudentsDetailsTable;
