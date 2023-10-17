import { Type } from 'class-transformer';

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

export class BriefingResult {
  placeId?: string;
  queryType?: string;
  @Type(() => Date)
  receptionTime?: Date;
  @Type(() => Date)
  reportTime?: Date;
  reportType?: string;
  stationId?: string;
  text?: string;
  textHTML?: string;

  constructor(partial?: Partial<BriefingResult>) {
    Object.assign(this, partial);
  }
}

export class WeatherResponse {
  id?: string;
  error?: any;
  @Type(() => BriefingResult)
  result?: BriefingResult[]

  constructor(partial?: Partial<WeatherResponse>) {
    Object.assign(this, partial);
  }
}
