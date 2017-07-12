// @flow

/**
 * scope? and tags? are optional when defined in an object. ?string and ?Array<string> means their respective values
 * can also be null or undefined.
 */
export interface ILoggerConstructorParams {
  scope?: ?string;
  tags?: ?Array<string>;
}
