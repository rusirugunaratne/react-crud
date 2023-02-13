import ButtonAppBar from "../molecules/appBar";
import StudentsDetailsTable from "./studentDetailsTable";
import "./index.css";

function StudentManagementHome() {
  return (
    <div className="home">
      <ButtonAppBar />
      <div className="tablearea">
        <StudentsDetailsTable />
      </div>
    </div>
  );
}

export default StudentManagementHome;
