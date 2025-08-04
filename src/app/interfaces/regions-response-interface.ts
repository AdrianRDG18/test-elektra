export interface RegionsResponse {
  count:    number;
  next:     number;
  previous: number;
  results:  Region[];
}

export interface Region {
  name: string;
  url:  string;
}
