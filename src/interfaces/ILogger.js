// @flow

export type Level = 'info' | 'error' | 'verbose' | 'warn';

export interface ILogger {
  error(body: any): any;
  warn(body: any): any;
  info(body: any): any;
  verbose(body: any): any;
  log(body: any, level: Level): void;
  tags(body: Array<string>): ILogger;
}
