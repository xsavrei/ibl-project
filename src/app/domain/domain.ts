export enum MessageType {
  METAR = 'METAR',
  SIGMET = 'SIGMET',
  TAF = 'TAF_LONGTAF'
}

export class WeatherRequest {
  briefingId?: string;
  reportTypes?: MessageType[];
  stations?: string[];
  countries?: string[];

  constructor(partial?: Partial<WeatherRequest>) {
    Object.assign(this, partial);
  }
}

export class WeatherResponse {
  id?: string;
  results?: []
}
