export type LineType = "solid" | "dashed" | "dotted"

export interface EmployeeData {
  id: string;
  parentId: string;
  name?: string;
  positionName?: string;
  phone?: string;
  email?: string;
  team: string;
  location?: string;
  department?: string;
  description: string;
  imageUrl?: string;
  _totalSubordinates?: number;
  _lineType?: LineType;
}