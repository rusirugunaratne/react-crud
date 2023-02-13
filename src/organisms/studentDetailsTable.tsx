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
      {DetailsTable()}

      {openAdd === true && (
        <AddStudentPopup
          open={openAdd}
          onClose={handleClose}
          onAdd={handleAdd}
        />
      )}

      {UpdateDialogPopup()}

      <Fab onClick={handleOnClick} variant="extended">
        ADD NEW STUDENT
      </Fab>
    </div>
  );

  function DetailsTable() {
    return (
      <TableContainer component={Paper}>
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
          <DialogContentText>Add a New Student to the School</DialogContentText>
          <TextField
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
            autoFocus
            defaultValue={image}
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
            onClick={() => {
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
              console.log(fname);
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
