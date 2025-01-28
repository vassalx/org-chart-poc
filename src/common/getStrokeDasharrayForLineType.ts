import { LineType } from "./types";

export const getStrokeDasharrayForLineType = (type?: LineType) => {
  switch (type) {
    case "dashed":
      return "4";
    case "dotted":
      return "1 4";
    case "solid":
    default:
      return null;
  }
};
