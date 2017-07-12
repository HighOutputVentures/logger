// @flow
import debug from 'debug';
import _ from 'lodash';
import type { Level } from './interfaces/ILogger';
import { ILogger } from './interfaces/ILogger';
import { ILoggerConstructorParams } from './interfaces/ILoggerConstructorParams';

export default class Logger implements ILogger {
  params: ILoggerConstructorParams;
  debug: debug;

  constructor(params: ?ILoggerConstructorParams) {
    const scope = process.env.LOG_SCOPE || 'default';
    if (_.isNil(params)) {
      this.params = {
        scope,
        tags: [''],
      };
    } else {
      this.params = _.merge(this.params, params);
      this.params.scope = _.isNil(this.params.scope) ? scope : this.params.scope;
      this.params.scope = this.params.scope || 'default';
    }
  }

  /**
   * Creates a debug output at error level.
   * @param {Object} body: and error object.
   * @param level can be 'error', 'warn', 'info', 'verbose'
   */
  log(body: any, level: Level = 'verbose') {
    let payload = {};
    if (typeof this.params.scope !== 'string') this.params.scope = 'default';
    if (typeof body === 'object') {
      payload = _.merge(body, {
        timestamp: new Date(),
      });
    } else if (typeof body === 'string') {
      payload = _.merge(payload, {
        message: body,
        timestamp: new Date(),
      });
    } else {
      return;
    }
    // this is so that it will be easier to query on the backend ie. loggly or elastic search.
    const tags = this.params.tags != null && _.isArray(this.params.tags) ? this.params.tags.join() : 'untagged';
    const d = debug(`${this.params.scope}:${tags === '' ? 'untagged' : tags}:${level}`);
    d('%j', payload);
  }

  /**
   * Creates a debug output at error level.
   * @param {Object} body: and error object.
   */
  error(body: any) {
    this.log(body, 'error');
  }

  /**
   * Creates a debug output at warn level.
   * @param {Object} body: a warning object. preferably with a message field.
   * @param {Object} body.message: a message to be ingested by log server. optional.
   */
  warn(body: any) {
    this.log(body, 'warn');
  }

  /**
   * Creates a debug output at info level.
   * @param {Object} body: a warning object. preferably with a message field.
   * @param {Object} body.message: a message to be ingested by log server. optional.
   */
  info(body: any) {
    this.log(body, 'info');
  }

  /**
   * Creates a debug output at verbose level.
   * @param {Object} body: a warning object. preferably with a message field.
   * @param {Object} body.message: a message to be ingested by log server. optional.
   */
  verbose(body: any) {
    this.log(body, 'verbose');
  }

  /**
   * Creates a new instance of the logger with a different set of tags but with the same scope as the original.
   * @param tags
   */
  tags(tags: ?Array<string>): Logger {
    const params : ILoggerConstructorParams = {
      scope: this.params.scope,
      tags,
    };
    return new Logger(params);
  }

  static log(body: any, level: Level = 'verbose') {
    const logger = new Logger();
    logger.log(body, level);
  }

  static error(body: any) {
    const logger = new Logger();
    logger.error(body);
  }

  static warn(body: any) {
    const logger = new Logger();
    logger.warn(body);
  }

  static info(body: any) {
    const logger = new Logger();
    logger.info(body);
  }

  static verbose(body: any) {
    const logger = new Logger();
    logger.verbose(body);
  }
}
