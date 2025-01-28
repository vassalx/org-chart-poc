import { OrgChart } from "d3-org-chart";
import { EmployeeData } from "./types";
import { jsPDF } from "jspdf";

export const downloadPdf = (chart: OrgChart<EmployeeData>) => {
  chart.exportImg({
    save: false,
    full: true,
    onLoad: (base64) => {
      const pdf = new jsPDF();
      const img = new Image();
      img.src = base64;
      img.onload = function () {
        pdf.addImage(
          img,
          "JPEG",
          5,
          5,
          595 / 3,
          ((img.height / img.width) * 595) / 3
        );
        pdf.save("chart.pdf");
      };
    },
  });
};
