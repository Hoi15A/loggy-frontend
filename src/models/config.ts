import {ColumnComponent} from "@/models/columnComponent";

export interface Config {
    name: string;
    columnCount: number;
    headerLength: number;
    separator: string;
    columnComponents: ColumnComponent[];
}