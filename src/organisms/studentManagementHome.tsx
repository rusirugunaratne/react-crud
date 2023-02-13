import * as React from "react";
import styles from "../_index.module.scss";
import ButtonAppBar from "../molecules/appBar";
import StudentsDetailsTable from "./studentDetailsTable";

function StudentManagementHome() {
  return (
    <div>
      <ButtonAppBar />
      <div>
        <StudentsDetailsTable />
      </div>
    </div>
  );
}

export default StudentManagementHome;
