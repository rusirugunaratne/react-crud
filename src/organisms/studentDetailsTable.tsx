import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DetailStudent } from "../molecules/detailStudent";
import { StyledTableCell } from "../molecules/tableViews";
import { studentData } from "../assets/data/studentData";
import { useState } from "react";
import Button from "@mui/material/Button";
import { AddStudentPopup } from "../molecules/addStudentPopup";

function StudentsDetailsTable() {
  const [open, setOpen] = useState(false);

  const handleOnClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [students, setStudents] = useState(studentData);

  const handleDelete = (id: number) => {
    setStudents(
      students.filter((student) => {
        return student.id !== id;
      })
    );
  };

  const handleAdd = (studentData: any) => {
    const newStudent = {
      id: 10,
      image: studentData.image,
      fname: studentData.fname,
      lname: studentData.lname,
      index: studentData.index,
      contactNo: studentData.contactNo,
    };
    students.push(newStudent);
    setStudents(students);
  };

  return (
    <div>
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
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleOnClick} color="inherit">
        Add New Student
      </Button>
      {open === true && (
        <AddStudentPopup open={open} onClose={handleClose} onAdd={handleAdd} />
      )}
    </div>
  );
}

export default StudentsDetailsTable;
