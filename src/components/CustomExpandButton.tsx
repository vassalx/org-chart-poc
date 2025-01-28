import "../styles.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { EmployeeData } from "../common/types";
import { HierarchyNode } from "d3-hierarchy";

export interface CustomExpandButtonProps {
  children?: HierarchyNode<EmployeeData>[];
  totalSubordinates?: number;
}

const CustomExpandButton = (props: CustomExpandButtonProps) => {
  const { children, totalSubordinates } = props;
  return (
    <>
      {totalSubordinates && (
        <div className="expand-btn">
          <span>{totalSubordinates || 0}</span>
          <span>{children ? <FaAngleUp /> : <FaAngleDown />}</span>
        </div>
      )}
    </>
  );
};

export default CustomExpandButton;
