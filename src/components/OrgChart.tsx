import { useState, useRef, useLayoutEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { OrgChart } from "d3-org-chart";
import CustomExpandButton from "./CustomExpandButton";
import CustomNodeContent from "./CustomNodeContent";
import EmployeeDetailsCard from "./EmployeeDetailsCard";
import { EmployeeData } from "../common/types";
import * as d3 from "d3";
import { downloadPdf } from "../common/downloadChartAsPdf";
import styles from "../styles.css?raw";
import juice from "juice";
import { getStrokeDasharrayForLineType } from "../common/getStrokeDasharrayForLineType";

export interface OrganizationalChartProps {
  data: EmployeeData[];
}

const OrganizationalChart = (props: OrganizationalChartProps) => {
  const { data } = props;
  const d3Container = useRef(null);
  const [cardShow, setCardShow] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [jsonData, setJsonData] = useState<EmployeeData[]>(data);
  const chart = new OrgChart<EmployeeData>();

  const employeeWithId = jsonData.find(
    (employee) => employee.id === employeeId
  );

  const handleShow = () => setCardShow(true);
  const handleClose = () => setCardShow(false);

  useLayoutEffect(() => {
    const toggleDetailsCard = (nodeId: string) => {
      handleShow();
      setEmployeeId(nodeId);
    };
    if (jsonData && d3Container.current) {
      chart
        .container(d3Container.current)
        .data(jsonData)
        .nodeWidth(() => 300)
        .nodeHeight(() => 140)
        .compactMarginBetween(() => 80)
        .onNodeClick((node) => {
          toggleDetailsCard(node.data.id);
        })
        .buttonContent(({ node }) => {
          return juice.inlineContent(
            ReactDOMServer.renderToStaticMarkup(
              <CustomExpandButton
                children={node.children}
                totalSubordinates={node.data._totalSubordinates}
              />
            ),
            styles
          );
        })
        .nodeContent((node) => {
          return juice.inlineContent(
            ReactDOMServer.renderToStaticMarkup(
              <CustomNodeContent {...node} />
            ),
            styles
          );
        })
        .linkUpdate(function (this: string, node) {
          d3.select(this)
            .attr("stroke", "#227c9d")
            .attr(
              "stroke-dasharray",
              getStrokeDasharrayForLineType(node.data._lineType)
            )
            .attr("stroke-width", 1);
        })
        .expandAll()
        .fit()
        .render();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsonData]);

  const onClickExportCurrentImg = () => {
    chart.exportImg();
  };

  const onClickExportFullImg = () => {
    chart.exportImg({ full: true });
  };

  const onClickExportSvg = () => {
    chart.exportSvg();
  };

  const onClickExportPdf = () => {
    downloadPdf(chart);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string;
          const parsedData = JSON.parse(result);
          setJsonData(parsedData);
        } catch (error) {
          console.error("Error parsing JSON file:", error);
          alert("Invalid JSON file. Please upload a valid JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <div className="org-chart-controls">
        <div>
          <span>Upload JSON:</span>
          <input type="file" accept=".json" onChange={handleFileChange} />
        </div>
        <div>
          <button onClick={onClickExportCurrentImg}>Export Current</button>
          <button onClick={onClickExportFullImg}>Export Full</button>
          <button onClick={onClickExportSvg}>Export SVG</button>
          <button onClick={onClickExportPdf}>Export PDF</button>
        </div>
      </div>
      <div className="org-chart" ref={d3Container}>
        {cardShow && employeeWithId && (
          <EmployeeDetailsCard
            employees={jsonData}
            employee={employeeWithId}
            handleClose={handleClose}
          />
        )}
      </div>
    </div>
  );
};

export default OrganizationalChart;
