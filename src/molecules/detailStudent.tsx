import { Avatar } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "./tableViews";
import Button from "@mui/material/Button";
import { useState } from "react";

type StudentDetails = {
  id: number;
  image: string;
  fname: string;
  lname: string;
  index: number;
  telephone: string;
  onDelete: any;
  onUpdate: any;
};

export const DetailStudent = (props: StudentDetails) => {
  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        <Avatar alt="Remy Sharp" src={props.image} />
      </StyledTableCell>
      <StyledTableCell align="right">{props.fname}</StyledTableCell>
      <StyledTableCell align="right">{props.lname}</StyledTableCell>
      <StyledTableCell align="right">{props.index}</StyledTableCell>
      <StyledTableCell align="right">{props.telephone}</StyledTableCell>
      <StyledTableCell align="right">
        <Button onClick={props.onUpdate} variant="contained" color="success">
          EDIT
        </Button>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Button onClick={props.onDelete} variant="outlined" color="error">
          DELETE
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
};
