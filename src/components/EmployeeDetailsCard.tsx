import "../styles.css";
import { MdClose } from "react-icons/md";
import { EmployeeData } from "../common/types";

export interface EmployeeDetailsCardProps {
  handleClose: () => void;
  employee: EmployeeData;
  employees: EmployeeData[];
}

const EmployeeDetailsCard = (props: EmployeeDetailsCardProps) => {
  const { handleClose, employee, employees } = props;
  return (
    <div className="card">
      <button className="card-close-btn" onClick={handleClose}>
        <MdClose />
      </button>
      {employee.team === "" ? (
        <div>
          <div className="card-header">
            <img
              className="card-img"
              src={employee.imageUrl}
              alt="Profile"
            />
            <h2 className="card-name">{employee.name}</h2>
            <p className="card-role">{employee.positionName}</p>
          </div>
          <div className="card-body">
            <div className="card-item">
              <p className="card-item-label">Phone:</p>
              <p className="card-item-value">{employee.phone}</p>
            </div>
            <div className="card-item">
              <p className="card-item-label">Email:</p>
              <p className="card-item-value">{employee.email}</p>
            </div>
            <div className="card-item">
              <p className="card-item-label">Location:</p>
              <p className="card-item-value">{employee.location}</p>
            </div>
            {employee.department && (
              <div className="card-item">
                <p className="card-item-label">Department:</p>
                <p className="card-item-value">{employee.department}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="card-header">
            <h2 className="card-team-name">{employee.team} Team</h2>
          </div>
          <h4>Team Members:</h4>
          <div className="card-body">
            {employees
              .filter(
                (employee) => employee.parentId === employee.id.toString()
              )
              .map((employee) => (
                <div className="card-item-team" key={employee.id}>
                  <img
                    className="card-item-img"
                    src={employee.imageUrl}
                    alt="Profile"
                  />
                  <p className="card-item-name">{employee.name}</p>
                  <p className="card-item-role">{employee.positionName}</p>
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="card-item">
        <p className="card-item-label">Description:</p>
        <p className="card-item-value">{employee.description}</p>
      </div>
    </div>
  );
};

export default EmployeeDetailsCard;
