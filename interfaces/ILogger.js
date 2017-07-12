// @flow

export type Level = 'info' | 'error' | 'verbose' | 'warn';

export interface ILogger {
  static error(body: any): void;
  static warn(body: any): void;
  static info(body: any): void;
  static verbose(body: any): void;
  static isDisabled(param: any): boolean;

  error(body: any): void;
  warn(body: any): void;
  info(body: any): void;
  verbose(body: any): void;
  log(body: any, level: Level): void;
  tags(body: Array<string>): ILogger;
}
