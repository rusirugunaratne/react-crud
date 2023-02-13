import * as React from "react";
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

function StudentsDetailsTable() {
  const [openAdd, setOpen] = useState(false);
  const [students, setStudents] = useState(studentDetails);

  const handleOnClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    const newStudent = {
      id: studentData.id,
      image: studentData.image,
      fname: studentData.fname,
      lname: studentData.lname,
      index: studentData.index,
      contactNo: studentData.contactNo,
    };
    const newStudentList: any = students
      .filter((student) => {
        return student.id !== studentData.id;
      })
      .push(newStudent);

    setStudents(newStudentList);
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
                  onUpdate={() => handleUpdate(student)}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleOnClick} color="inherit">
        Add New Student
      </Button>
      {openAdd === true && (
        <AddStudentPopup
          open={openAdd}
          onClose={handleClose}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}

export default StudentsDetailsTable;
