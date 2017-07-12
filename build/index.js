'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var _debug = require('debug');var _debug2 = _interopRequireDefault(_debug);
var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);

var _ILogger = require('./interfaces/ILogger');
var _ILoggerConstructorParams = require('./interfaces/ILoggerConstructorParams');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class Logger {


  constructor(params) {
    const defaultScope = _lodash2.default.isNull(process.env.LOG_SCOPE) ? 'default' : process.env.LOG_SCOPE;
    const envTimeStamp = !process.env.LOG_NOTIMESTAMP;
    if (_lodash2.default.isNil(params)) {
      this.params = {
        scope: defaultScope,
        tags: [''],
        enableTimestamp: envTimeStamp };

    } else if (typeof params === 'string') {
      this.params = {
        scope: _lodash2.default.trim(params),
        tags: [''],
        enableTimestamp: envTimeStamp };

    } else if (typeof params === 'object') {
      this.params = _lodash2.default.merge(this.params, params);
      this.params.scope = _lodash2.default.isNil(this.params.scope) ? defaultScope : this.params.scope;
      this.params.enableTimestamp = envTimeStamp;
    }
  }

  /**
     * Creates a debug output at error level.
     * @param {Object} body: and error object.
     * @param level can be 'error', 'warn', 'info', 'verbose'
     */
  log(body, level = 'verbose') {
    let payload = {};
    if (typeof this.params.scope !== 'string') this.params.scope = 'default';
    if (typeof body === 'object') {
      payload = _lodash2.default.merge(body, { timestamp: new Date() });
      if (this.params.enableTimestamp) {
        payload = _lodash2.default.merge(payload, { timestamp: new Date() });
      }
    } else if (typeof body === 'string') {
      payload = _lodash2.default.merge(payload, { message: _lodash2.default.trim(body) });
      if (this.params.enableTimestamp) {
        payload = _lodash2.default.merge(payload, { timestamp: new Date() });
      }
    } else {
      return;
    }

    // this is so that it will be easier to query on the backend ie. loggly or elastic search.
    const tags = this.params.tags != null && _lodash2.default.isArray(this.params.tags) ? this.params.tags.join() : 'untagged';
    const d = (0, _debug2.default)(`${this.params.scope}:${tags === '' ? 'untagged' : tags}:${level}`);
    d('%j', payload);
  }

  /**
     * Creates a debug output at error level.
     * @param {Object} body: and error object.
     */
  error(body) {
    this.log(body, 'error');
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
      tags };

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMb2dnZXIiLCJjb25zdHJ1Y3RvciIsInBhcmFtcyIsImRlZmF1bHRTY29wZSIsImlzTnVsbCIsInByb2Nlc3MiLCJlbnYiLCJMT0dfU0NPUEUiLCJlbnZUaW1lU3RhbXAiLCJMT0dfTk9USU1FU1RBTVAiLCJpc05pbCIsInNjb3BlIiwidGFncyIsImVuYWJsZVRpbWVzdGFtcCIsInRyaW0iLCJtZXJnZSIsImxvZyIsImJvZHkiLCJsZXZlbCIsInBheWxvYWQiLCJ0aW1lc3RhbXAiLCJEYXRlIiwibWVzc2FnZSIsImlzQXJyYXkiLCJqb2luIiwiZCIsImVycm9yIiwid2FybiIsImluZm8iLCJ2ZXJib3NlIiwibG9nZ2VyIl0sIm1hcHBpbmdzIjoiO0FBQ0EsOEI7QUFDQSxnQzs7QUFFQTtBQUNBLGlGOztBQUVlLE1BQU1BLE1BQU4sQ0FBZ0M7OztBQUc3Q0MsY0FBWUMsTUFBWixFQUF3RDtBQUN0RCxVQUFNQyxlQUF5QixpQkFBRUMsTUFBRixDQUFTQyxRQUFRQyxHQUFSLENBQVlDLFNBQXJCLElBQWtDLFNBQWxDLEdBQThDRixRQUFRQyxHQUFSLENBQVlDLFNBQXpGO0FBQ0EsVUFBTUMsZUFBMEIsQ0FBQ0gsUUFBUUMsR0FBUixDQUFZRyxlQUE3QztBQUNBLFFBQUksaUJBQUVDLEtBQUYsQ0FBUVIsTUFBUixDQUFKLEVBQXFCO0FBQ25CLFdBQUtBLE1BQUwsR0FBYztBQUNaUyxlQUFPUixZQURLO0FBRVpTLGNBQU0sQ0FBQyxFQUFELENBRk07QUFHWkMseUJBQWlCTCxZQUhMLEVBQWQ7O0FBS0QsS0FORCxNQU1PLElBQUksT0FBT04sTUFBUCxLQUFrQixRQUF0QixFQUFnQztBQUNyQyxXQUFLQSxNQUFMLEdBQWM7QUFDWlMsZUFBTyxpQkFBRUcsSUFBRixDQUFPWixNQUFQLENBREs7QUFFWlUsY0FBTSxDQUFDLEVBQUQsQ0FGTTtBQUdaQyx5QkFBaUJMLFlBSEwsRUFBZDs7QUFLRCxLQU5NLE1BTUEsSUFB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QWY7QUFDQThCLFdBQU9kLEdBQVAsQ0FBV0MsSUFBWCxFQUFpQkMsS0FBakI7QUFDRDs7QUFFRCxTQUFPUSxLQUFQLENBQWFULElBQWIsRUFBd0I7QUFDdEIsVUFBTWEsU0FBUyxJQUFJOUIsTUFBSixFQUFmO0FBQ0E4QixXQUFPSixLQUFQLENBQWFULElBQWI7QUFDRDs7QUFFRCxTQUFPVSxJQUFQLENBQVlWLElBQVosRUFBdUI7QUFDckIsVUFBTWEsU0FBUyxJQUFJOUIsTUFBSixFQUFmO0FBQ0E4QixXQUFPSCxJQUFQLENBQVlWLElBQVo7QUFDRDs7QUFFRCxTQUFPVyxJQUFQLENBQVlYLElBQVosRUFBdUI7QUFDckIsVUFBTWEsU0FBUyxJQUFJOUIsTUFBSixFQUFmO0FBQ0E4QixXQUFPRixJQUFQLENBQVlYLElBQVo7QUFDRDs7QUFFRCxTQUFPWSxPQUFQLENBQWVaLElBQWYsRUFBMEI7QUFDeEIsVUFBTWEsU0FBUyxJQUFJOUIsTUFBSixFQUFmO0FBQ0E4QixXQUFPRCxPQUFQLENBQWVaLElBQWY7QUFDRCxHQTNINEMsQyxrQkFBMUJqQixNIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHR5cGUgeyBMZXZlbCB9IGZyb20gJy4vaW50ZXJmYWNlcy9JTG9nZ2VyJztcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuL2ludGVyZmFjZXMvSUxvZ2dlcic7XG5pbXBvcnQgeyBJTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXMgfSBmcm9tICcuL2ludGVyZmFjZXMvSUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyIGltcGxlbWVudHMgSUxvZ2dlciB7XG4gIHBhcmFtczogSUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogP0lMb2dnZXJDb25zdHJ1Y3RvclBhcmFtcyB8IHN0cmluZykge1xuICAgIGNvbnN0IGRlZmF1bHRTY29wZSA6ID9zdHJpbmcgPSBfLmlzTnVsbChwcm9jZXNzLmVudi5MT0dfU0NPUEUpID8gJ2RlZmF1bHQnIDogcHJvY2Vzcy5lbnYuTE9HX1NDT1BFO1xuICAgIGNvbnN0IGVudlRpbWVTdGFtcCA6ID9ib29sZWFuID0gIXByb2Nlc3MuZW52LkxPR19OT1RJTUVTVEFNUDtcbiAgICBpZiAoXy5pc05pbChwYXJhbXMpKSB7XG4gICAgICB0aGlzLnBhcmFtcyA9IHtcbiAgICAgICAgc2NvcGU6IGRlZmF1bHRTY29wZSxcbiAgICAgICAgdGFnczogWycnXSxcbiAgICAgICAgZW5hYmxlVGltZXN0YW1wOiBlbnZUaW1lU3RhbXAsXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMucGFyYW1zID0ge1xuICAgICAgICBzY29wZTogXy50cmltKHBhcmFtcyksXG4gICAgICAgIHRhZ3M6IFsnJ10sXG4gICAgICAgIGVuYWJsZVRpbWVzdGFtcDogZW52VGltZVN0YW1wLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLnBhcmFtcyA9IF8ubWVyZ2UodGhpcy5wYXJhbXMsIHBhcmFtcyk7XG4gICAgICB0aGlzLnBhcmFtcy5zY29wZSA9IF8uaXNOaWwodGhpcy5wYXJhbXMuc2NvcGUpID8gZGVmYXVsdFNjb3BlIDogdGhpcy5wYXJhbXMuc2NvcGU7XG4gICAgICB0aGlzLnBhcmFtcy5lbmFibGVUaW1lc3RhbXAgPSBlbnZUaW1lU3RhbXA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgZXJyb3IgbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhbmQgZXJyb3Igb2JqZWN0LlxuICAgKiBAcGFyYW0gbGV2ZWwgY2FuIGJlICdlcnJvcicsICd3YXJuJywgJ2luZm8nLCAndmVyYm9zZSdcbiAgICovXG4gIGxvZyhib2R5OiBhbnksIGxldmVsOiBMZXZlbCA9ICd2ZXJib3NlJykge1xuICAgIGxldCBwYXlsb2FkID0ge307XG4gICAgaWYgKHR5cGVvZiB0aGlzLnBhcmFtcy5zY29wZSAhPT0gJ3N0cmluZycpIHRoaXMucGFyYW1zLnNjb3BlID0gJ2RlZmF1bHQnO1xuICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHBheWxvYWQgPSBfLm1lcmdlKGJvZHksIHsgdGltZXN0YW1wOiBuZXcgRGF0ZSgpIH0pO1xuICAgICAgaWYgKHRoaXMucGFyYW1zLmVuYWJsZVRpbWVzdGFtcCkge1xuICAgICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IHRpbWVzdGFtcDogbmV3IERhdGUoKSB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBtZXNzYWdlOiBfLnRyaW0oYm9keSkgfSk7XG4gICAgICBpZiAodGhpcy5wYXJhbXMuZW5hYmxlVGltZXN0YW1wKSB7XG4gICAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgdGltZXN0YW1wOiBuZXcgRGF0ZSgpIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdGhpcyBpcyBzbyB0aGF0IGl0IHdpbGwgYmUgZWFzaWVyIHRvIHF1ZXJ5IG9uIHRoZSBiYWNrZW5kIGllLiBsb2dnbHkgb3IgZWxhc3RpYyBzZWFyY2guXG4gICAgY29uc3QgdGFncyA9IHRoaXMucGFyYW1zLnRhZ3MgIT0gbnVsbCAmJiBfLmlzQXJyYXkodGhpcy5wYXJhbXMudGFncykgPyB0aGlzLnBhcmFtcy50YWdzLmpvaW4oKSA6ICd1bnRhZ2dlZCc7XG4gICAgY29uc3QgZCA9IGRlYnVnKGAke3RoaXMucGFyYW1zLnNjb3BlfToke3RhZ3MgPT09ICcnID8gJ3VudGFnZ2VkJyA6IHRhZ3N9OiR7bGV2ZWx9YCk7XG4gICAgZCgnJWonLCBwYXlsb2FkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IGVycm9yIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYW5kIGVycm9yIG9iamVjdC5cbiAgICovXG4gIGVycm9yKGJvZHk6IGFueSkge1xuICAgIHRoaXMubG9nKGJvZHksICdlcnJvcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgd2FybiBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGEgd2FybmluZyBvYmplY3QuIHByZWZlcmFibHkgd2l0aCBhIG1lc3NhZ2UgZmllbGQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5Lm1lc3NhZ2U6IGEgbWVzc2FnZSB0byBiZSBpbmdlc3RlZCBieSBsb2cgc2VydmVyLiBvcHRpb25hbC5cbiAgICovXG4gIHdhcm4oYm9keTogYW55KSB7XG4gICAgdGhpcy5sb2coYm9keSwgJ3dhcm4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IGluZm8gbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhIHdhcm5pbmcgb2JqZWN0LiBwcmVmZXJhYmx5IHdpdGggYSBtZXNzYWdlIGZpZWxkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keS5tZXNzYWdlOiBhIG1lc3NhZ2UgdG8gYmUgaW5nZXN0ZWQgYnkgbG9nIHNlcnZlci4gb3B0aW9uYWwuXG4gICAqL1xuICBpbmZvKGJvZHk6IGFueSkge1xuICAgIHRoaXMubG9nKGJvZHksICdpbmZvJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCB2ZXJib3NlIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYSB3YXJuaW5nIG9iamVjdC4gcHJlZmVyYWJseSB3aXRoIGEgbWVzc2FnZSBmaWVsZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHkubWVzc2FnZTogYSBtZXNzYWdlIHRvIGJlIGluZ2VzdGVkIGJ5IGxvZyBzZXJ2ZXIuIG9wdGlvbmFsLlxuICAgKi9cbiAgdmVyYm9zZShib2R5OiBhbnkpIHtcbiAgICB0aGlzLmxvZyhib2R5LCAndmVyYm9zZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIGxvZ2dlciB3aXRoIGEgZGlmZmVyZW50IHNldCBvZiB0YWdzIGJ1dCB3aXRoIHRoZSBzYW1lIHNjb3BlIGFzIHRoZSBvcmlnaW5hbC5cbiAgICogQHBhcmFtIHRhZ3NcbiAgICovXG4gIHRhZ3ModGFnczogP0FycmF5PHN0cmluZz4pOiBMb2dnZXIge1xuICAgIGNvbnN0IHBhcmFtcyA6IElMb2dnZXJDb25zdHJ1Y3RvclBhcmFtcyA9IHtcbiAgICAgIHNjb3BlOiB0aGlzLnBhcmFtcy5zY29wZSxcbiAgICAgIHRhZ3MsXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IExvZ2dlcihwYXJhbXMpO1xuICB9XG5cbiAgc3RhdGljIGxvZyhib2R5OiBhbnksIGxldmVsOiBMZXZlbCA9ICd2ZXJib3NlJykge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIubG9nKGJvZHksIGxldmVsKTtcbiAgfVxuXG4gIHN0YXRpYyBlcnJvcihib2R5OiBhbnkpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLmVycm9yKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIHdhcm4oYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci53YXJuKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIGluZm8oYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci5pbmZvKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIHZlcmJvc2UoYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci52ZXJib3NlKGJvZHkpO1xuICB9XG59XG4iXX0=