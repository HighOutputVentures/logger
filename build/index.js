'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var _debug = require('debug');var _debug2 = _interopRequireDefault(_debug);
var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _os = require('os');var _os2 = _interopRequireDefault(_os);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class Logger {




  constructor(params) {
    this.hostname = _os2.default.hostname();
    this.pid = process.pid;
    const defaultScope = _lodash2.default.isNull(process.env.LOG_SCOPE) ? 'default' : process.env.LOG_SCOPE;
    const envTimeStamp = !Logger.isDisabled(process.env.LOG_NOTIMESTAMP);
    const envPid = !Logger.isDisabled(process.env.LOG_NOPID);
    const envHostname = !Logger.isDisabled(process.env.LOG_NOHOSTNAME);

    if (_lodash2.default.isNil(params)) {
      this.params = {
        scope: defaultScope,
        tags: [''],
        enableTimestamp: envTimeStamp,
        enablePid: envPid,
        enableHostname: envHostname };

    } else if (typeof params === 'string') {
      this.params = {
        scope: _lodash2.default.trim(params),
        tags: [''],
        enableTimestamp: envTimeStamp,
        enablePid: envPid,
        enableHostname: envHostname };

    } else if (typeof params === 'object') {
      this.params = _lodash2.default.merge(this.params, params, {
        enableTimestamp: envTimeStamp,
        enablePid: envPid,
        enableHostname: envHostname });

      this.params.scope = _lodash2.default.isNil(this.params.scope) ? defaultScope : this.params.scope;
    }
  }

  /**
     * Checks if the value is explicity equal to '1'.
     * @param param
     * @param defaulValue
     * @returns {boolean}
     */
  static isDisabled(param) {
    return _lodash2.default.isNil(param) ? false : _lodash2.default.toNumber(param) === 1;
  }

  /**
     * Creates a debug output at error level.
     * @param {Object} body: and error object.
     * @param level can be 'error', 'warn', 'info', 'verbose'
     */
  log(body, level = 'verbose') {
    let payload = { body: {} };
    if (typeof body === 'object') {
      payload.body = _lodash2.default.merge(payload.body, body);
      if (this.params.enableTimestamp) {
        payload = _lodash2.default.merge(payload, { timestamp: new Date() });
      }
      if (this.params.enablePid) {
        payload = _lodash2.default.merge(payload, { pid: this.pid });
      }
      if (this.params.enableHostname) {
        payload = _lodash2.default.merge(payload, { hostname: this.hostname });
      }
    } else if (typeof body === 'string') {
      payload.body = _lodash2.default.merge(payload.body, { message: _lodash2.default.trim(body) });
      if (this.params.enableTimestamp) {
        payload = _lodash2.default.merge(payload, { timestamp: new Date() });
      }
      if (this.params.enablePid) {
        payload = _lodash2.default.merge(payload, { pid: this.pid });
      }
      if (this.params.enableHostname) {
        payload = _lodash2.default.merge(payload, { hostname: this.hostname });
      }
    } else {
      return;
    }

    this.params.scope = this.params.scope || 'default';
    // this is so that it will be easier to query on the backend ie. loggly or elastic search.
    const tags = this.params.tags != null && _lodash2.default.isArray(this.params.tags) ? this.params.tags.join() : 'untagged';
    const label = `${this.params.scope}:${tags === '' ? 'untagged' : tags}:${level}`;
    (0, _debug2.default)(label.replace(/(?:\r\n|\r|\n)/g, ' '))('%j', payload);
  }

  /**
     * Creates a debug output at error level.
     * @param {Object} body: an error object.
     */
  error(err) {
    let payload = typeof err === 'string' ? { message: err } : _lodash2.default.toPlainObject(err);
    if (!_lodash2.default.isNil(err.message)) payload = _lodash2.default.merge(payload, { message: err.message });
    if (!_lodash2.default.isNil(err.stack)) payload = _lodash2.default.merge(payload, { message: err.stack });
    this.log(payload, 'error');
  }

  /**
     * Creates a debug output at warn level.
     * @param {Object} body: a warning object. preferably with a message field.
     * @param {Object} body.message: a message to be ingested by log server. optional.
     */
  warn(body) {
    this.log(body, 'warn');
  }

  /**
     * Creates a debug output at info level.
     * @param {Object} body: a warning object. preferably with a message field.
     * @param {Object} body.message: a message to be ingested by log server. optional.
     */
  info(body) {
    this.log(body, 'info');
  }

  /**
     * Creates a debug output at verbose level.
     * @param {Object} body: a warning object. preferably with a message field.
     * @param {Object} body.message: a message to be ingested by log server. optional.
     */
  verbose(body) {
    this.log(body, 'verbose');
  }

  /**
     * Creates a new instance of the logger with a different set of tags but with the same scope as the original.
     * @param tags
     */
  tags(tags) {
    const params = {
      scope: this.params.scope,
      tags: _lodash2.default.compact(_lodash2.default.union(this.params.tags, tags)) };

    return new Logger(params);
  }

  static log(body, level = 'verbose') {
    const logger = new Logger();
    logger.log(body, level);
  }

  static error(body) {
    const logger = new Logger();
    logger.error(body);
  }

  static warn(body) {
    const logger = new Logger();
    logger.warn(body);
  }

  static info(body) {
    const logger = new Logger();
    logger.info(body);
  }

  static verbose(body) {
    const logger = new Logger();
    logger.verbose(body);
  }}exports.default = Logger;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMb2dnZXIiLCJjb25zdHJ1Y3RvciIsInBhcmFtcyIsImhvc3RuYW1lIiwicGlkIiwicHJvY2VzcyIsImRlZmF1bHRTY29wZSIsImlzTnVsbCIsImVudiIsIkxPR19TQ09QRSIsImVudlRpbWVTdGFtcCIsImlzRGlzYWJsZWQiLCJMT0dfTk9USU1FU1RBTVAiLCJlbnZQaWQiLCJMT0dfTk9QSUQiLCJlbnZIb3N0bmFtZSIsIkxPR19OT0hPU1ROQU1FIiwiaXNOaWwiLCJzY29wZSIsInRhZ3MiLCJlbmFibGVUaW1lc3RhbXAiLCJlbmFibGVQaWQiLCJlbmFibGVIb3N0bmFtZSIsInRyaW0iLCJtZXJnZSIsInBhcmFtIiwidG9OdW1iZXIiLCJsb2ciLCJib2R5IiwibGV2ZWwiLCJwYXlsb2FkIiwidGltZXN0YW1wIiwiRGF0ZSIsIm1lc3NhZ2UiLCJpc0FycmF5Iiwiam9pbiIsImxhYmVsIiwicmVwbGFjZSIsImVycm9yIiwiZXJyIiwidG9QbGFpbk9iamVjdCIsInN0YWNrIiwid2FybiIsImluZm8iLCJ2ZXJib3NlIiwiY29tcGFjdCIsInVuaW9uIiwibG9nZ2VyIl0sIm1hcHBpbmdzIjoiO0FBQ0EsOEI7QUFDQSxnQztBQUNBLHdCOztBQUVlLE1BQU1BLE1BQU4sQ0FBZ0M7Ozs7O0FBSzdDQyxjQUFZQyxNQUFaLEVBQXdEO0FBQ3RELFNBQUtDLFFBQUwsR0FBZ0IsYUFBR0EsUUFBSCxFQUFoQjtBQUNBLFNBQUtDLEdBQUwsR0FBV0MsUUFBUUQsR0FBbkI7QUFDQSxVQUFNRSxlQUF5QixpQkFBRUMsTUFBRixDQUFTRixRQUFRRyxHQUFSLENBQVlDLFNBQXJCLElBQWtDLFNBQWxDLEdBQThDSixRQUFRRyxHQUFSLENBQVlDLFNBQXpGO0FBQ0EsVUFBTUMsZUFBMEIsQ0FBQ1YsT0FBT1csVUFBUCxDQUFrQk4sUUFBUUcsR0FBUixDQUFZSSxlQUE5QixDQUFqQztBQUNBLFVBQU1DLFNBQW9CLENBQUNiLE9BQU9X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QStDLFdBQU9ULEtBQVAsQ0FBYVYsSUFBYjtBQUNEOztBQUVELFNBQU9jLElBQVAsQ0FBWWQsSUFBWixFQUF1QjtBQUNyQixVQUFNbUIsU0FBUyxJQUFJL0MsTUFBSixFQUFmO0FBQ0ErQyxXQUFPTCxJQUFQLENBQVlkLElBQVo7QUFDRDs7QUFFRCxTQUFPZSxJQUFQLENBQVlmLElBQVosRUFBdUI7QUFDckIsVUFBTW1CLFNBQVMsSUFBSS9DLE1BQUosRUFBZjtBQUNBK0MsV0FBT0osSUFBUCxDQUFZZixJQUFaO0FBQ0Q7O0FBRUQsU0FBT2dCLE9BQVAsQ0FBZWhCLElBQWYsRUFBMEI7QUFDeEIsVUFBTW1CLFNBQVMsSUFBSS9DLE1BQUosRUFBZjtBQUNBK0MsV0FBT0gsT0FBUCxDQUFlaEIsSUFBZjtBQUNELEdBbEs0QyxDLGtCQUExQjVCLE0iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgb3MgZnJvbSAnb3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dnZXIgaW1wbGVtZW50cyBJTG9nZ2VyIHtcbiAgcGFyYW1zOiBJTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXM7XG4gIHBpZDogbnVtYmVyO1xuICBob3N0bmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogP0lMb2dnZXJDb25zdHJ1Y3RvclBhcmFtcyB8IHN0cmluZykge1xuICAgIHRoaXMuaG9zdG5hbWUgPSBvcy5ob3N0bmFtZSgpO1xuICAgIHRoaXMucGlkID0gcHJvY2Vzcy5waWQ7XG4gICAgY29uc3QgZGVmYXVsdFNjb3BlIDogP3N0cmluZyA9IF8uaXNOdWxsKHByb2Nlc3MuZW52LkxPR19TQ09QRSkgPyAnZGVmYXVsdCcgOiBwcm9jZXNzLmVudi5MT0dfU0NPUEU7XG4gICAgY29uc3QgZW52VGltZVN0YW1wIDogP2Jvb2xlYW4gPSAhTG9nZ2VyLmlzRGlzYWJsZWQocHJvY2Vzcy5lbnYuTE9HX05PVElNRVNUQU1QKTtcbiAgICBjb25zdCBlbnZQaWQgOiA/Ym9vbGVhbiA9ICFMb2dnZXIuaXNEaXNhYmxlZChwcm9jZXNzLmVudi5MT0dfTk9QSUQpO1xuICAgIGNvbnN0IGVudkhvc3RuYW1lIDogP2Jvb2xlYW4gPSAhTG9nZ2VyLmlzRGlzYWJsZWQocHJvY2Vzcy5lbnYuTE9HX05PSE9TVE5BTUUpO1xuXG4gICAgaWYgKF8uaXNOaWwocGFyYW1zKSkge1xuICAgICAgdGhpcy5wYXJhbXMgPSB7XG4gICAgICAgIHNjb3BlOiBkZWZhdWx0U2NvcGUsXG4gICAgICAgIHRhZ3M6IFsnJ10sXG4gICAgICAgIGVuYWJsZVRpbWVzdGFtcDogZW52VGltZVN0YW1wLFxuICAgICAgICBlbmFibGVQaWQ6IGVudlBpZCxcbiAgICAgICAgZW5hYmxlSG9zdG5hbWU6IGVudkhvc3RuYW1lLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnBhcmFtcyA9IHtcbiAgICAgICAgc2NvcGU6IF8udHJpbShwYXJhbXMpLFxuICAgICAgICB0YWdzOiBbJyddLFxuICAgICAgICBlbmFibGVUaW1lc3RhbXA6IGVudlRpbWVTdGFtcCxcbiAgICAgICAgZW5hYmxlUGlkOiBlbnZQaWQsXG4gICAgICAgIGVuYWJsZUhvc3RuYW1lOiBlbnZIb3N0bmFtZSxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5wYXJhbXMgPSBfLm1lcmdlKHRoaXMucGFyYW1zLCBwYXJhbXMsIHtcbiAgICAgICAgZW5hYmxlVGltZXN0YW1wOiBlbnZUaW1lU3RhbXAsXG4gICAgICAgIGVuYWJsZVBpZDogZW52UGlkLFxuICAgICAgICBlbmFibGVIb3N0bmFtZTogZW52SG9zdG5hbWUsXG4gICAgICB9KTtcbiAgICAgIHRoaXMucGFyYW1zLnNjb3BlID0gXy5pc05pbCh0aGlzLnBhcmFtcy5zY29wZSkgPyBkZWZhdWx0U2NvcGUgOiB0aGlzLnBhcmFtcy5zY29wZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBleHBsaWNpdHkgZXF1YWwgdG8gJzEnLlxuICAgKiBAcGFyYW0gcGFyYW1cbiAgICogQHBhcmFtIGRlZmF1bFZhbHVlXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIGlzRGlzYWJsZWQocGFyYW06IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBfLmlzTmlsKHBhcmFtKSA/IGZhbHNlIDogKF8udG9OdW1iZXIocGFyYW0pID09PSAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IGVycm9yIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYW5kIGVycm9yIG9iamVjdC5cbiAgICogQHBhcmFtIGxldmVsIGNhbiBiZSAnZXJyb3InLCAnd2FybicsICdpbmZvJywgJ3ZlcmJvc2UnXG4gICAqL1xuICBsb2coYm9keTogYW55LCBsZXZlbDogTGV2ZWwgPSAndmVyYm9zZScpOiB2b2lkIHtcbiAgICBsZXQgcGF5bG9hZCA9IHsgYm9keToge30gfTtcbiAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdvYmplY3QnKSB7XG4gICAgICBwYXlsb2FkLmJvZHkgPSBfLm1lcmdlKHBheWxvYWQuYm9keSwgYm9keSk7XG4gICAgICBpZiAodGhpcy5wYXJhbXMuZW5hYmxlVGltZXN0YW1wKSB7XG4gICAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgdGltZXN0YW1wOiBuZXcgRGF0ZSgpIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucGFyYW1zLmVuYWJsZVBpZCkge1xuICAgICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IHBpZDogdGhpcy5waWQgfSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wYXJhbXMuZW5hYmxlSG9zdG5hbWUpIHtcbiAgICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBob3N0bmFtZTogdGhpcy5ob3N0bmFtZSB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgcGF5bG9hZC5ib2R5ID0gXy5tZXJnZShwYXlsb2FkLmJvZHksIHsgbWVzc2FnZTogXy50cmltKGJvZHkpIH0pO1xuICAgICAgaWYgKHRoaXMucGFyYW1zLmVuYWJsZVRpbWVzdGFtcCkge1xuICAgICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IHRpbWVzdGFtcDogbmV3IERhdGUoKSB9KTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBhcmFtcy5lbmFibGVQaWQpIHtcbiAgICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBwaWQ6IHRoaXMucGlkIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucGFyYW1zLmVuYWJsZUhvc3RuYW1lKSB7XG4gICAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgaG9zdG5hbWU6IHRoaXMuaG9zdG5hbWUgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnBhcmFtcy5zY29wZSA9IHRoaXMucGFyYW1zLnNjb3BlIHx8ICdkZWZhdWx0JztcbiAgICAvLyB0aGlzIGlzIHNvIHRoYXQgaXQgd2lsbCBiZSBlYXNpZXIgdG8gcXVlcnkgb24gdGhlIGJhY2tlbmQgaWUuIGxvZ2dseSBvciBlbGFzdGljIHNlYXJjaC5cbiAgICBjb25zdCB0YWdzOiBzdHJpbmcgPSB0aGlzLnBhcmFtcy50YWdzICE9IG51bGwgJiYgXy5pc0FycmF5KHRoaXMucGFyYW1zLnRhZ3MpID8gdGhpcy5wYXJhbXMudGFncy5qb2luKCkgOiAndW50YWdnZWQnO1xuICAgIGNvbnN0IGxhYmVsOiBzdHJpbmcgPSBgJHt0aGlzLnBhcmFtcy5zY29wZX06JHt0YWdzID09PSAnJyA/ICd1bnRhZ2dlZCcgOiB0YWdzfToke2xldmVsfWA7XG4gICAgZGVidWcobGFiZWwucmVwbGFjZSgvKD86XFxyXFxufFxccnxcXG4pL2csICcgJykpKCclaicsIHBheWxvYWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgZXJyb3IgbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhbiBlcnJvciBvYmplY3QuXG4gICAqL1xuICBlcnJvcihlcnI6IGFueSkge1xuICAgIGxldCBwYXlsb2FkID0gKHR5cGVvZiBlcnIgPT09ICdzdHJpbmcnKSA/IHsgbWVzc2FnZTogZXJyIH0gOiBfLnRvUGxhaW5PYmplY3QoZXJyKTtcbiAgICBpZiAoIV8uaXNOaWwoZXJyLm1lc3NhZ2UpKSBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IG1lc3NhZ2U6IGVyci5tZXNzYWdlIH0pO1xuICAgIGlmICghXy5pc05pbChlcnIuc3RhY2spKSBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IG1lc3NhZ2U6IGVyci5zdGFjayB9KTtcbiAgICB0aGlzLmxvZyhwYXlsb2FkLCAnZXJyb3InKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IHdhcm4gbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhIHdhcm5pbmcgb2JqZWN0LiBwcmVmZXJhYmx5IHdpdGggYSBtZXNzYWdlIGZpZWxkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keS5tZXNzYWdlOiBhIG1lc3NhZ2UgdG8gYmUgaW5nZXN0ZWQgYnkgbG9nIHNlcnZlci4gb3B0aW9uYWwuXG4gICAqL1xuICB3YXJuKGJvZHk6IGFueSkge1xuICAgIHRoaXMubG9nKGJvZHksICd3YXJuJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCBpbmZvIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYSB3YXJuaW5nIG9iamVjdC4gcHJlZmVyYWJseSB3aXRoIGEgbWVzc2FnZSBmaWVsZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHkubWVzc2FnZTogYSBtZXNzYWdlIHRvIGJlIGluZ2VzdGVkIGJ5IGxvZyBzZXJ2ZXIuIG9wdGlvbmFsLlxuICAgKi9cbiAgaW5mbyhib2R5OiBhbnkpIHtcbiAgICB0aGlzLmxvZyhib2R5LCAnaW5mbycpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgdmVyYm9zZSBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGEgd2FybmluZyBvYmplY3QuIHByZWZlcmFibHkgd2l0aCBhIG1lc3NhZ2UgZmllbGQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5Lm1lc3NhZ2U6IGEgbWVzc2FnZSB0byBiZSBpbmdlc3RlZCBieSBsb2cgc2VydmVyLiBvcHRpb25hbC5cbiAgICovXG4gIHZlcmJvc2UoYm9keTogYW55KSB7XG4gICAgdGhpcy5sb2coYm9keSwgJ3ZlcmJvc2UnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBsb2dnZXIgd2l0aCBhIGRpZmZlcmVudCBzZXQgb2YgdGFncyBidXQgd2l0aCB0aGUgc2FtZSBzY29wZSBhcyB0aGUgb3JpZ2luYWwuXG4gICAqIEBwYXJhbSB0YWdzXG4gICAqL1xuICB0YWdzKHRhZ3M6ID9BcnJheTxzdHJpbmc+KTogTG9nZ2VyIHtcbiAgICBjb25zdCBwYXJhbXMgOiBJTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXMgPSB7XG4gICAgICBzY29wZTogdGhpcy5wYXJhbXMuc2NvcGUsXG4gICAgICB0YWdzOiBfLmNvbXBhY3QoXy51bmlvbih0aGlzLnBhcmFtcy50YWdzLCB0YWdzKSksXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IExvZ2dlcihwYXJhbXMpO1xuICB9XG5cbiAgc3RhdGljIGxvZyhib2R5OiBhbnksIGxldmVsOiBMZXZlbCA9ICd2ZXJib3NlJykge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIubG9nKGJvZHksIGxldmVsKTtcbiAgfVxuXG4gIHN0YXRpYyBlcnJvcihib2R5OiBhbnkpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLmVycm9yKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIHdhcm4oYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci53YXJuKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIGluZm8oYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci5pbmZvKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIHZlcmJvc2UoYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci52ZXJib3NlKGJvZHkpO1xuICB9XG59XG4iXX0=