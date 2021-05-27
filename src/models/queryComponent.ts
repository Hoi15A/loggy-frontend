export interface QueryComponent {
  columnComponentId: number;
  filterType: number;
  dateFormat?: string;
  exact?: number | string;
  from?: number | string;
  to?: number | string;
  regex?: number | string;
  contains?: number | string;
}
