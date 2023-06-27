export class NewReportDetail {
  id: string;
  dataSource: {
    id: string;
    name: string;
    hospitalName: string;
    labName?: string;
  };
  name: string;
  createdAt: string;
  updatedAt: string;
}
