export interface ColumnDefinition {
    readonly headerName: string;
    readonly field: string;
    readonly resizable: boolean;
    readonly sortable: boolean;
    readonly filter: boolean;
}
