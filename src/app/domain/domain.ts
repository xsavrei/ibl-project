export enum MessageType {
  METAR = 'METAR',
  SIGMET = 'SIGMET',
  TAF = 'TAF'
}

export interface WeatherRequest {
  messageTypes?: MessageType[];
  airports?: string[];
  countries?: string[];
}
