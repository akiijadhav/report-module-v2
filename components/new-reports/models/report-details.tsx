export class ReportDetail {
  dataSourceId: string;
  name: string;
  startDate: string;
  endDate: string;
  department: DepartmentDetail;
  engineers: string[];
  validationTests: string[];
  id: string;
  selectedMarkers: SelectedMarkers;
}

export class DepartmentDetail {
  name: string;
  teamName: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  contactNumber: string;
  faxNumber: string;
}

export class GenerateNewReportId {
  id: string;
}

export class MarkerDetail {
  id: string;
  acn: string;
  label: string;
}

export class MarkerRecord {
  code: string;
  name: string;
  markerDetails: MarkerDetail[];
}

export class MarkerRecordsObject {
  id: string;
  validationTests: string[];
  markerRecords: MarkerRecord[];
}

export class SelectedMarkers {
  [key: string]: number[];
}
