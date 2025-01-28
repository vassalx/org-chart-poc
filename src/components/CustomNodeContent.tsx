import "../styles.css";
import { FaBuilding } from "react-icons/fa";
import { HierarchyNode } from "d3-hierarchy";
import { EmployeeData } from "../common/types";

export interface CustomNodeContentProps {
  data: EmployeeData;
  children?: HierarchyNode<EmployeeData>[];
}

const CustomNodeContent = (props: CustomNodeContentProps) => {
  const { data, children } = props;
  return (
    <>
      <div className="node-container">
        <div className="node-details">
          {data.team === "" ? (
            <div className="node-content">
              <img
                className="node-img"
                src={data.imageUrl}
                alt="Profile"
              />
              <div className="node-info">
                <div className="node-name">{data.name}</div>
                <div className="node-role">{data.positionName}</div>
                {data.department && (
                  <div className="node-department">
                    <FaBuilding />
                    <div>{data.department}</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="node-team">
              <div className="node-team-name">{data.team}</div>
              {children &&
                children
                  .slice(0, 4)
                  .map((child) => (
                    <img
                      key={child.data.id}
                      className="node-team-member-img"
                      src={child.data.imageUrl}
                      alt="team member"
                    />
                  ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomNodeContent;
