import {FilterType} from "@/models/filterType";
export interface ColumnComponent {
  id: number;
  name: string;
  format: string;
  columnType: string;
  filterTypes: FilterType[];
}