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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMb2dnZXIiLCJjb25zdHJ1Y3RvciIsInBhcmFtcyIsImhvc3RuYW1lIiwicGlkIiwicHJvY2VzcyIsImRlZmF1bHRTY29wZSIsImlzTnVsbCIsImVudiIsIkxPR19TQ09QRSIsImVudlRpbWVTdGFtcCIsImlzRGlzYWJsZWQiLCJMT0dfTk9USU1FU1RBTVAiLCJlbnZQaWQiLCJMT0dfTk9QSUQiLCJlbnZIb3N0bmFtZSIsIkxPR19OT0hPU1ROQU1FIiwiaXNOaWwiLCJzY29wZSIsInRhZ3MiLCJlbmFibGVUaW1lc3RhbXAiLCJlbmFibGVQaWQiLCJlbmFibGVIb3N0bmFtZSIsInRyaW0iLCJtZXJnZSIsInBhcmFtIiwidG9OdW1iZXIiLCJsb2ciLCJib2R5IiwibGV2ZWwiLCJwYXlsb2FkIiwidGltZXN0YW1wIiwiRGF0ZSIsIm1lc3NhZ2UiLCJpc0FycmF5Iiwiam9pbiIsImxhYmVsIiwicmVwbGFjZSIsImVycm9yIiwiZXJyIiwidG9QbGFpbk9iamVjdCIsInN0YWNrIiwid2FybiIsImluZm8iLCJ2ZXJib3NlIiwiY29tcGFjdCIsInVuaW9uIiwibG9nZ2VyIl0sIm1hcHBpbmdzIjoiO0FBQ0EsOEI7QUFDQSxnQztBQUNBLHdCOztBQUVlLE1BQU1BLE1BQU4sQ0FBZ0M7Ozs7O0FBSzdDQyxjQUFZQyxNQUFaLEVBQXdEO0FBQ3RELFNBQUtDLFFBQUwsR0FBZ0IsYUFBR0EsUUFBSCxFQUFoQjtBQUNBLFNBQUtDLEdBQUwsR0FBV0MsUUFBUUQsR0FBbkI7QUFDQSxVQUFNRSxlQUF5QixpQkFBRUMsTUFBRixDQUFTRixRQUFRRyxHQUFSLENBQVlDLFNBQXJCLElBQWtDLFNBQWxDLEdBQThDSixRQUFRRyxHQUFSLENBQVlDLFNBQXpGO0FBQ0EsVUFBTUMsZUFBMEIsQ0FBQ1YsT0FBT1csVUFBUCxDQUFrQk4sUUFBUUcsR0FBUixDQUFZSSxlQUE5QixDQUFqQztBQUNBLFVBQU1DLFNBQW9CLENBQUNiLE9BQU9X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QStDLFdBQU9ULEtBQVAsQ0FBYVYsSUFBYjtBQUNEOztBQUVELFNBQU9jLElBQVAsQ0FBWWQsSUFBWixFQUF1QjtBQUNyQixVQUFNbUIsU0FBUyxJQUFJL0MsTUFBSixFQUFmO0FBQ0ErQyxXQUFPTCxJQUFQLENBQVlkLElBQVo7QUFDRDs7QUFFRCxTQUFPZSxJQUFQLENBQVlmLElBQVosRUFBdUI7QUFDckIsVUFBTW1CLFNBQVMsSUFBSS9DLE1BQUosRUFBZjtBQUNBK0MsV0FBT0osSUFBUCxDQUFZZixJQUFaO0FBQ0Q7O0FBRUQsU0FBT2dCLE9BQVAsQ0FBZWhCLElBQWYsRUFBMEI7QUFDeEIsVUFBTW1CLFNBQVMsSUFBSS9DLE1BQUosRUFBZjtBQUNBK0MsV0FBT0gsT0FBUCxDQUFlaEIsSUFBZjtBQUNELEdBbEs0QyxDLGtCQUExQjVCLE0iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xyXG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgb3MgZnJvbSAnb3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyIGltcGxlbWVudHMgSUxvZ2dlciB7XHJcbiAgcGFyYW1zOiBJTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXM7XHJcbiAgcGlkOiBudW1iZXI7XHJcbiAgaG9zdG5hbWU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocGFyYW1zOiA/SUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zIHwgc3RyaW5nKSB7XHJcbiAgICB0aGlzLmhvc3RuYW1lID0gb3MuaG9zdG5hbWUoKTtcclxuICAgIHRoaXMucGlkID0gcHJvY2Vzcy5waWQ7XHJcbiAgICBjb25zdCBkZWZhdWx0U2NvcGUgOiA/c3RyaW5nID0gXy5pc051bGwocHJvY2Vzcy5lbnYuTE9HX1NDT1BFKSA/ICdkZWZhdWx0JyA6IHByb2Nlc3MuZW52LkxPR19TQ09QRTtcclxuICAgIGNvbnN0IGVudlRpbWVTdGFtcCA6ID9ib29sZWFuID0gIUxvZ2dlci5pc0Rpc2FibGVkKHByb2Nlc3MuZW52LkxPR19OT1RJTUVTVEFNUCk7XHJcbiAgICBjb25zdCBlbnZQaWQgOiA/Ym9vbGVhbiA9ICFMb2dnZXIuaXNEaXNhYmxlZChwcm9jZXNzLmVudi5MT0dfTk9QSUQpO1xyXG4gICAgY29uc3QgZW52SG9zdG5hbWUgOiA/Ym9vbGVhbiA9ICFMb2dnZXIuaXNEaXNhYmxlZChwcm9jZXNzLmVudi5MT0dfTk9IT1NUTkFNRSk7XHJcblxyXG4gICAgaWYgKF8uaXNOaWwocGFyYW1zKSkge1xyXG4gICAgICB0aGlzLnBhcmFtcyA9IHtcclxuICAgICAgICBzY29wZTogZGVmYXVsdFNjb3BlLFxyXG4gICAgICAgIHRhZ3M6IFsnJ10sXHJcbiAgICAgICAgZW5hYmxlVGltZXN0YW1wOiBlbnZUaW1lU3RhbXAsXHJcbiAgICAgICAgZW5hYmxlUGlkOiBlbnZQaWQsXHJcbiAgICAgICAgZW5hYmxlSG9zdG5hbWU6IGVudkhvc3RuYW1lLFxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnc3RyaW5nJykge1xyXG4gICAgICB0aGlzLnBhcmFtcyA9IHtcclxuICAgICAgICBzY29wZTogXy50cmltKHBhcmFtcyksXHJcbiAgICAgICAgdGFnczogWycnXSxcclxuICAgICAgICBlbmFibGVUaW1lc3RhbXA6IGVudlRpbWVTdGFtcCxcclxuICAgICAgICBlbmFibGVQaWQ6IGVudlBpZCxcclxuICAgICAgICBlbmFibGVIb3N0bmFtZTogZW52SG9zdG5hbWUsXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRoaXMucGFyYW1zID0gXy5tZXJnZSh0aGlzLnBhcmFtcywgcGFyYW1zLCB7XHJcbiAgICAgICAgZW5hYmxlVGltZXN0YW1wOiBlbnZUaW1lU3RhbXAsXHJcbiAgICAgICAgZW5hYmxlUGlkOiBlbnZQaWQsXHJcbiAgICAgICAgZW5hYmxlSG9zdG5hbWU6IGVudkhvc3RuYW1lLFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5wYXJhbXMuc2NvcGUgPSBfLmlzTmlsKHRoaXMucGFyYW1zLnNjb3BlKSA/IGRlZmF1bHRTY29wZSA6IHRoaXMucGFyYW1zLnNjb3BlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBleHBsaWNpdHkgZXF1YWwgdG8gJzEnLlxyXG4gICAqIEBwYXJhbSBwYXJhbVxyXG4gICAqIEBwYXJhbSBkZWZhdWxWYWx1ZVxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAqL1xyXG4gIHN0YXRpYyBpc0Rpc2FibGVkKHBhcmFtOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBfLmlzTmlsKHBhcmFtKSA/IGZhbHNlIDogKF8udG9OdW1iZXIocGFyYW0pID09PSAxKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgZXJyb3IgbGV2ZWwuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGFuZCBlcnJvciBvYmplY3QuXHJcbiAgICogQHBhcmFtIGxldmVsIGNhbiBiZSAnZXJyb3InLCAnd2FybicsICdpbmZvJywgJ3ZlcmJvc2UnXHJcbiAgICovXHJcbiAgbG9nKGJvZHk6IGFueSwgbGV2ZWw6IExldmVsID0gJ3ZlcmJvc2UnKTogdm9pZCB7XHJcbiAgICBsZXQgcGF5bG9hZCA9IHsgYm9keToge30gfTtcclxuICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgcGF5bG9hZC5ib2R5ID0gXy5tZXJnZShwYXlsb2FkLmJvZHksIGJvZHkpO1xyXG4gICAgICBpZiAodGhpcy5wYXJhbXMuZW5hYmxlVGltZXN0YW1wKSB7XHJcbiAgICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyB0aW1lc3RhbXA6IG5ldyBEYXRlKCkgfSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMucGFyYW1zLmVuYWJsZVBpZCkge1xyXG4gICAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgcGlkOiB0aGlzLnBpZCB9KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5wYXJhbXMuZW5hYmxlSG9zdG5hbWUpIHtcclxuICAgICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IGhvc3RuYW1lOiB0aGlzLmhvc3RuYW1lIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xyXG4gICAgICBwYXlsb2FkLmJvZHkgPSBfLm1lcmdlKHBheWxvYWQuYm9keSwgeyBtZXNzYWdlOiBfLnRyaW0oYm9keSkgfSk7XHJcbiAgICAgIGlmICh0aGlzLnBhcmFtcy5lbmFibGVUaW1lc3RhbXApIHtcclxuICAgICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IHRpbWVzdGFtcDogbmV3IERhdGUoKSB9KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5wYXJhbXMuZW5hYmxlUGlkKSB7XHJcbiAgICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBwaWQ6IHRoaXMucGlkIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnBhcmFtcy5lbmFibGVIb3N0bmFtZSkge1xyXG4gICAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgaG9zdG5hbWU6IHRoaXMuaG9zdG5hbWUgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBhcmFtcy5zY29wZSA9IHRoaXMucGFyYW1zLnNjb3BlIHx8ICdkZWZhdWx0JztcclxuICAgIC8vIHRoaXMgaXMgc28gdGhhdCBpdCB3aWxsIGJlIGVhc2llciB0byBxdWVyeSBvbiB0aGUgYmFja2VuZCBpZS4gbG9nZ2x5IG9yIGVsYXN0aWMgc2VhcmNoLlxyXG4gICAgY29uc3QgdGFnczogc3RyaW5nID0gdGhpcy5wYXJhbXMudGFncyAhPSBudWxsICYmIF8uaXNBcnJheSh0aGlzLnBhcmFtcy50YWdzKSA/IHRoaXMucGFyYW1zLnRhZ3Muam9pbigpIDogJ3VudGFnZ2VkJztcclxuICAgIGNvbnN0IGxhYmVsOiBzdHJpbmcgPSBgJHt0aGlzLnBhcmFtcy5zY29wZX06JHt0YWdzID09PSAnJyA/ICd1bnRhZ2dlZCcgOiB0YWdzfToke2xldmVsfWA7XHJcbiAgICBkZWJ1ZyhsYWJlbC5yZXBsYWNlKC8oPzpcXHJcXG58XFxyfFxcbikvZywgJyAnKSkoJyVqJywgcGF5bG9hZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IGVycm9yIGxldmVsLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhbiBlcnJvciBvYmplY3QuXHJcbiAgICovXHJcbiAgZXJyb3IoZXJyOiBhbnkpIHtcclxuICAgIGxldCBwYXlsb2FkID0gKHR5cGVvZiBlcnIgPT09ICdzdHJpbmcnKSA/IHsgbWVzc2FnZTogZXJyIH0gOiBfLnRvUGxhaW5PYmplY3QoZXJyKTtcclxuICAgIGlmICghXy5pc05pbChlcnIubWVzc2FnZSkpIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XHJcbiAgICBpZiAoIV8uaXNOaWwoZXJyLnN0YWNrKSkgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBtZXNzYWdlOiBlcnIuc3RhY2sgfSk7XHJcbiAgICB0aGlzLmxvZyhwYXlsb2FkLCAnZXJyb3InKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgd2FybiBsZXZlbC5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYSB3YXJuaW5nIG9iamVjdC4gcHJlZmVyYWJseSB3aXRoIGEgbWVzc2FnZSBmaWVsZC5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keS5tZXNzYWdlOiBhIG1lc3NhZ2UgdG8gYmUgaW5nZXN0ZWQgYnkgbG9nIHNlcnZlci4gb3B0aW9uYWwuXHJcbiAgICovXHJcbiAgd2Fybihib2R5OiBhbnkpIHtcclxuICAgIHRoaXMubG9nKGJvZHksICd3YXJuJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IGluZm8gbGV2ZWwuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGEgd2FybmluZyBvYmplY3QuIHByZWZlcmFibHkgd2l0aCBhIG1lc3NhZ2UgZmllbGQuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHkubWVzc2FnZTogYSBtZXNzYWdlIHRvIGJlIGluZ2VzdGVkIGJ5IGxvZyBzZXJ2ZXIuIG9wdGlvbmFsLlxyXG4gICAqL1xyXG4gIGluZm8oYm9keTogYW55KSB7XHJcbiAgICB0aGlzLmxvZyhib2R5LCAnaW5mbycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCB2ZXJib3NlIGxldmVsLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhIHdhcm5pbmcgb2JqZWN0LiBwcmVmZXJhYmx5IHdpdGggYSBtZXNzYWdlIGZpZWxkLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5Lm1lc3NhZ2U6IGEgbWVzc2FnZSB0byBiZSBpbmdlc3RlZCBieSBsb2cgc2VydmVyLiBvcHRpb25hbC5cclxuICAgKi9cclxuICB2ZXJib3NlKGJvZHk6IGFueSkge1xyXG4gICAgdGhpcy5sb2coYm9keSwgJ3ZlcmJvc2UnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIGxvZ2dlciB3aXRoIGEgZGlmZmVyZW50IHNldCBvZiB0YWdzIGJ1dCB3aXRoIHRoZSBzYW1lIHNjb3BlIGFzIHRoZSBvcmlnaW5hbC5cclxuICAgKiBAcGFyYW0gdGFnc1xyXG4gICAqL1xyXG4gIHRhZ3ModGFnczogP0FycmF5PHN0cmluZz4pOiBMb2dnZXIge1xyXG4gICAgY29uc3QgcGFyYW1zIDogSUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zID0ge1xyXG4gICAgICBzY29wZTogdGhpcy5wYXJhbXMuc2NvcGUsXHJcbiAgICAgIHRhZ3M6IF8uY29tcGFjdChfLnVuaW9uKHRoaXMucGFyYW1zLnRhZ3MsIHRhZ3MpKSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gbmV3IExvZ2dlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGxvZyhib2R5OiBhbnksIGxldmVsOiBMZXZlbCA9ICd2ZXJib3NlJykge1xyXG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xyXG4gICAgbG9nZ2VyLmxvZyhib2R5LCBsZXZlbCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZXJyb3IoYm9keTogYW55KSB7XHJcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XHJcbiAgICBsb2dnZXIuZXJyb3IoYm9keSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgd2Fybihib2R5OiBhbnkpIHtcclxuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcclxuICAgIGxvZ2dlci53YXJuKGJvZHkpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGluZm8oYm9keTogYW55KSB7XHJcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XHJcbiAgICBsb2dnZXIuaW5mbyhib2R5KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyB2ZXJib3NlKGJvZHk6IGFueSkge1xyXG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xyXG4gICAgbG9nZ2VyLnZlcmJvc2UoYm9keSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==