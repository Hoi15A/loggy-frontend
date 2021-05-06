import {ColumnComponent} from "@/models/columnComponent";
import {ColumnComponentOrder} from "@/models/columnComponentOrder";

export interface Config {
    name: string;
    columnCount: number;
    headerLength: number;
    separator: string;
    columnComponents: ColumnComponent[] | ColumnComponentOrder;
}