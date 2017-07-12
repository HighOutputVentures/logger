'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var _debug = require('debug');var _debug2 = _interopRequireDefault(_debug);
var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);

var _ILogger = require('./interfaces/ILogger');
var _ILoggerConstructorParams = require('./interfaces/ILoggerConstructorParams');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class Logger {


  constructor(params) {
    const defaultScope = _lodash2.default.trim(process.env.LOG_SCOPE) || 'default';
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
      this.params.scope = this.params.scope || 'default';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMb2dnZXIiLCJjb25zdHJ1Y3RvciIsInBhcmFtcyIsImRlZmF1bHRTY29wZSIsInRyaW0iLCJwcm9jZXNzIiwiZW52IiwiTE9HX1NDT1BFIiwiZW52VGltZVN0YW1wIiwiTE9HX05PVElNRVNUQU1QIiwiaXNOaWwiLCJzY29wZSIsInRhZ3MiLCJlbmFibGVUaW1lc3RhbXAiLCJtZXJnZSIsImxvZyIsImJvZHkiLCJsZXZlbCIsInBheWxvYWQiLCJ0aW1lc3RhbXAiLCJEYXRlIiwibWVzc2FnZSIsImlzQXJyYXkiLCJqb2luIiwiZCIsImVycm9yIiwid2FybiIsImluZm8iLCJ2ZXJib3NlIiwibG9nZ2VyIl0sIm1hcHBpbmdzIjoiO0FBQ0EsOEI7QUFDQSxnQzs7QUFFQTtBQUNBLGlGOztBQUVlLE1BQU1BLE1BQU4sQ0FBZ0M7OztBQUc3Q0MsY0FBWUMsTUFBWixFQUF3RDtBQUN0RCxVQUFNQyxlQUF5QixpQkFBRUMsSUFBRixDQUFPQyxRQUFRQyxHQUFSLENBQVlDLFNBQW5CLEtBQWlDLFNBQWhFO0FBQ0EsVUFBTUMsZUFBMEIsQ0FBQ0gsUUFBUUMsR0FBUixDQUFZRyxlQUE3QztBQUNBLFFBQUksaUJBQUVDLEtBQUYsQ0FBUVIsTUFBUixDQUFKLEVBQXFCO0FBQ25CLFdBQUtBLE1BQUwsR0FBYztBQUNaUyxlQUFPUixZQURLO0FBRVpTLGNBQU0sQ0FBQyxFQUFELENBRk07QUFHWkMseUJBQWlCTCxZQUhMLEVBQWQ7O0FBS0QsS0FORCxNQU1PLElBQUksT0FBT04sTUFBUCxLQUFrQixRQUF0QixFQUFnQztBQUNyQyxXQUFLQSxNQUFMLEdBQWM7QUFDWlMsZUFBTyxpQkFBRVAsSUFBRixDQUFPRixNQUFQLENBREs7QUFFWlUsY0FBTSxDQUFDLEVBQUQsQ0FGTTtBQUdaQyx5QkFBaUJMLFlBSEwsRUFBZDs7QUFLRCxLQU5NLE1BTUEsSUFBSSxPQUFPTixNQUFQLEtBQWtCLFFBQXRCLEVBQWdDO0FBQ3JDLFdBQUtBLE1BQUwsR0FBYyxpQkFBRVksS0FBRixDQUFRLEtBQUtaLE1BQWIsRUFBcUJBLE1BQXJCLENBQWQ7QUFDQSxXQUFLQSxNQUFMLENBQVlTLEtBQVosR0FBb0IsaUJBQUVELEtBQUYsQ0FBUSxLQUFLUixNQUFMLENBQVlTLEtBQXBCLElBQTZCUixZQUE3QixHQUE0QyxLQUFLRCxNQUFMLENBQVlTLEtBQTVFO0FBQ0EsV0FBS1QsTUFBTCxDQUFZUyxLQUFaLEdBQW9CLEtBQUtULE1BQUwsQ0FBWVMsS0FBWixJQUFxQixTQUF6QztBQUNBLFdBQUtULE1BQUwsQ0FBWVcsZUFBWixHQUE4QkwsWUFBOUI7QUFDRDtBQUNGOztBQUVEOzs7OztBQUtBTyxNQUFJQyxJQUFKLEVBQWVDLFFBQWUsU0FBOUIsRUFBeUM7QUFDdkMsUUFBSUMsVUFBVSxFQUFkO0FBQ0EsUUFBSSxPQUFPLEtBQUtoQixNQUFMLENBQVlTLEtBQW5CLEtBQTZCLFFBQWpDLEVBQTJDLEtBQUtULE1BQUwsQ0FBWVMsS0FBWixHQUFvQixTQUFwQjtBQUMzQyxRQUFJLE9BQU9LLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDNUJFLGdCQUFVLGlCQUFFSixLQUFGLENBQVFFLElBQVIsRUFBYyxFQUFFRyxXQUFXLElBQUlDLElBQUosRUFBYixFQUFkLENBQVY7QUFDQSxVQUFJLEtBQUtsQixNQUFMLENBQVlXLGVBQWhCLEVBQWlDO0FBQy9CSyxrQkFBVSxpQkFBRUosS0FBRixDQUFRSSxPQUFSLEVBQWlCLEVBQUVDLFdBQVcsSUFBSUMsSUFBSixFQUFiLEVBQWpCLENBQVY7QUFDRDtBQUNGLEtBTEQsTUFLTyxJQUFJLE9BQU9KLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDbkNFLGdCQUFVLGlCQUFFSixLQUFGLENBQVFJLE9BQVIsRUFBaUIsRUFBRUcsU0FBUyxpQkFBRWpCLElBQUYsQ0FBT1ksSUFBUCxDQUFYLEVBQWpCLENBQVY7QUFDQSxVQUFJLEtBQUtkLE1BQUwsQ0FBWVcsZUFBaEIsRUFBaUM7QUFDL0JLLGtCQUFVLGlCQUFFSixLQUFGLENBQVFJLE9BQVIsRUFBaUIsRUFBRUMsV0FBVyxJQUFJQyxJQUFKLEVBQWIsRUFBakIsQ0FBVjtBQUNEO0FBQ0YsS0FMTSxNQUtBO0FBQ0w7QUFDRDs7QUFFRDtBQUNBLFVBQU1SLE9BQU8sS0FBS1YsTUFBTCxDQUFZVSxJQUFaLElBQW9CLElBQXBCLElBQTRCLGlCQUFFVSxPQUFGLENBQVUsS0FBS3BCLE1BQUwsQ0FBWVUsSUFBdEIsQ0FBNUIsR0FBMEQsS0FBS1YsTUFBTCxDQUFZVSxJQUFaLENBQWlCVyxJQUFqQixFQUExRCxHQUFvRixVQUFqRztBQUNBLFVBQU1DLElBQUkscUJBQU8sR0FBRSxLQUFLdEIsTUFBTCxDQUFZUyxLQUFNLElBQUdDLFNBQVMsRUFBVCxHQUFjLFVBQWQsR0FBMkJBLElBQUssSUFBR0ssS0FBTSxFQUF2RSxDQUFWO0FBQ0FPLE1BQUUsSUFBRixFQUFRTixPQUFSO0FBQ0Q7O0FBRUQ7Ozs7QUFJQU8sUUFBTVQsSUFBTixFQUFpQjtBQUNmLFNBQUtELEdBQUwsQ0FBU0MsSUFBVCxFQUFlLE9BQWY7QUFDRDs7QUFFRDs7Ozs7QUFLQVUsT0FBS1YsSUFBTCxFQUFnQjtBQUNkLFNBQUtELEdBQUwsQ0FBU0MsSUFBVCxFQUFlLE1BQWY7QUFDRDs7QUFFRDs7Ozs7QUFLQVcsT0FBS1gsSUFBTCxFQUFnQjtBQUNkLFNBQUtELEdBQUwsQ0FBU0MsSUFBVCxFQUFlLE1BQWY7QUFDRDs7QUFFRDs7Ozs7QUFLQVksVUFBUVosSUFBUixFQUFtQjtBQUNqQixTQUFLRCxHQUFMLENBQVNDLElBQVQsRUFBZSxTQUFmO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUosT0FBS0EsSUFBTCxFQUFtQztBQUNqQyxVQUFNVixTQUFvQztBQUN4Q1MsYUFBTyxLQUFLVCxNQUFMLENBQVlTLEtBRHFCO0FBRXhDQyxVQUZ3QyxFQUExQzs7QUFJQSxXQUFPLElBQUlaLE1BQUosQ0FBV0UsTUFBWCxDQUFQO0FBQ0Q7O0FBRUQsU0FBT2EsR0FBUCxDQUFXQyxJQUFYLEVBQXNCQyxRQUFlLFNBQXJDLEVBQWdEO0FBQzlDLFVBQU1ZLFNBQVMsSUFBSTdCLE1BQUosRUFBZjtBQUNBNkIsV0FBT2QsR0FBUCxDQUFXQyxJQUFYLEVBQWlCQyxLQUFqQjtBQUNEOztBQUVELFNBQU9RLEtBQVAsQ0FBYVQsSUFBYixFQUF3QjtBQUN0QixVQUFNYSxTQUFTLElBQUk3QixNQUFKLEVBQWY7QUFDQTZCLFdBQU9KLEtBQVAsQ0FBYVQsSUFBYjtBQUNEOztBQUVELFNBQU9VLElBQVAsQ0FBWVYsSUFBWixFQUF1QjtBQUNyQixVQUFNYSxTQUFTLElBQUk3QixNQUFKLEVBQWY7QUFDQTZCLFdBQU9ILElBQVAsQ0FBWVYsSUFBWjtBQUNEOztBQUVELFNBQU9XLElBQVAsQ0FBWVgsSUFBWixFQUF1QjtBQUNyQixVQUFNYSxTQUFTLElBQUk3QixNQUFKLEVBQWY7QUFDQTZCLFdBQU9GLElBQVAsQ0FBWVgsSUFBWjtBQUNEOztBQUVELFNBQU9ZLE9BQVAsQ0FBZVosSUFBZixFQUEwQjtBQUN4QixVQUFNYSxTQUFTLElBQUk3QixNQUFKLEVBQWY7QUFDQTZCLFdBQU9ELE9BQVAsQ0FBZVosSUFBZjtBQUNELEdBNUg0QyxDLGtCQUExQmhCLE0iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgdHlwZSB7IExldmVsIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lMb2dnZXInO1xuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4vaW50ZXJmYWNlcy9JTG9nZ2VyJztcbmltcG9ydCB7IElMb2dnZXJDb25zdHJ1Y3RvclBhcmFtcyB9IGZyb20gJy4vaW50ZXJmYWNlcy9JTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dnZXIgaW1wbGVtZW50cyBJTG9nZ2VyIHtcbiAgcGFyYW1zOiBJTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXM7XG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiA/SUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zIHwgc3RyaW5nKSB7XG4gICAgY29uc3QgZGVmYXVsdFNjb3BlIDogP3N0cmluZyA9IF8udHJpbShwcm9jZXNzLmVudi5MT0dfU0NPUEUpIHx8ICdkZWZhdWx0JztcbiAgICBjb25zdCBlbnZUaW1lU3RhbXAgOiA/Ym9vbGVhbiA9ICFwcm9jZXNzLmVudi5MT0dfTk9USU1FU1RBTVA7XG4gICAgaWYgKF8uaXNOaWwocGFyYW1zKSkge1xuICAgICAgdGhpcy5wYXJhbXMgPSB7XG4gICAgICAgIHNjb3BlOiBkZWZhdWx0U2NvcGUsXG4gICAgICAgIHRhZ3M6IFsnJ10sXG4gICAgICAgIGVuYWJsZVRpbWVzdGFtcDogZW52VGltZVN0YW1wLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnBhcmFtcyA9IHtcbiAgICAgICAgc2NvcGU6IF8udHJpbShwYXJhbXMpLFxuICAgICAgICB0YWdzOiBbJyddLFxuICAgICAgICBlbmFibGVUaW1lc3RhbXA6IGVudlRpbWVTdGFtcCxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5wYXJhbXMgPSBfLm1lcmdlKHRoaXMucGFyYW1zLCBwYXJhbXMpO1xuICAgICAgdGhpcy5wYXJhbXMuc2NvcGUgPSBfLmlzTmlsKHRoaXMucGFyYW1zLnNjb3BlKSA/IGRlZmF1bHRTY29wZSA6IHRoaXMucGFyYW1zLnNjb3BlO1xuICAgICAgdGhpcy5wYXJhbXMuc2NvcGUgPSB0aGlzLnBhcmFtcy5zY29wZSB8fCAnZGVmYXVsdCc7XG4gICAgICB0aGlzLnBhcmFtcy5lbmFibGVUaW1lc3RhbXAgPSBlbnZUaW1lU3RhbXA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgZXJyb3IgbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhbmQgZXJyb3Igb2JqZWN0LlxuICAgKiBAcGFyYW0gbGV2ZWwgY2FuIGJlICdlcnJvcicsICd3YXJuJywgJ2luZm8nLCAndmVyYm9zZSdcbiAgICovXG4gIGxvZyhib2R5OiBhbnksIGxldmVsOiBMZXZlbCA9ICd2ZXJib3NlJykge1xuICAgIGxldCBwYXlsb2FkID0ge307XG4gICAgaWYgKHR5cGVvZiB0aGlzLnBhcmFtcy5zY29wZSAhPT0gJ3N0cmluZycpIHRoaXMucGFyYW1zLnNjb3BlID0gJ2RlZmF1bHQnO1xuICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHBheWxvYWQgPSBfLm1lcmdlKGJvZHksIHsgdGltZXN0YW1wOiBuZXcgRGF0ZSgpIH0pO1xuICAgICAgaWYgKHRoaXMucGFyYW1zLmVuYWJsZVRpbWVzdGFtcCkge1xuICAgICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IHRpbWVzdGFtcDogbmV3IERhdGUoKSB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBtZXNzYWdlOiBfLnRyaW0oYm9keSkgfSk7XG4gICAgICBpZiAodGhpcy5wYXJhbXMuZW5hYmxlVGltZXN0YW1wKSB7XG4gICAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgdGltZXN0YW1wOiBuZXcgRGF0ZSgpIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdGhpcyBpcyBzbyB0aGF0IGl0IHdpbGwgYmUgZWFzaWVyIHRvIHF1ZXJ5IG9uIHRoZSBiYWNrZW5kIGllLiBsb2dnbHkgb3IgZWxhc3RpYyBzZWFyY2guXG4gICAgY29uc3QgdGFncyA9IHRoaXMucGFyYW1zLnRhZ3MgIT0gbnVsbCAmJiBfLmlzQXJyYXkodGhpcy5wYXJhbXMudGFncykgPyB0aGlzLnBhcmFtcy50YWdzLmpvaW4oKSA6ICd1bnRhZ2dlZCc7XG4gICAgY29uc3QgZCA9IGRlYnVnKGAke3RoaXMucGFyYW1zLnNjb3BlfToke3RhZ3MgPT09ICcnID8gJ3VudGFnZ2VkJyA6IHRhZ3N9OiR7bGV2ZWx9YCk7XG4gICAgZCgnJWonLCBwYXlsb2FkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IGVycm9yIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYW5kIGVycm9yIG9iamVjdC5cbiAgICovXG4gIGVycm9yKGJvZHk6IGFueSkge1xuICAgIHRoaXMubG9nKGJvZHksICdlcnJvcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgd2FybiBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGEgd2FybmluZyBvYmplY3QuIHByZWZlcmFibHkgd2l0aCBhIG1lc3NhZ2UgZmllbGQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5Lm1lc3NhZ2U6IGEgbWVzc2FnZSB0byBiZSBpbmdlc3RlZCBieSBsb2cgc2VydmVyLiBvcHRpb25hbC5cbiAgICovXG4gIHdhcm4oYm9keTogYW55KSB7XG4gICAgdGhpcy5sb2coYm9keSwgJ3dhcm4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IGluZm8gbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhIHdhcm5pbmcgb2JqZWN0LiBwcmVmZXJhYmx5IHdpdGggYSBtZXNzYWdlIGZpZWxkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keS5tZXNzYWdlOiBhIG1lc3NhZ2UgdG8gYmUgaW5nZXN0ZWQgYnkgbG9nIHNlcnZlci4gb3B0aW9uYWwuXG4gICAqL1xuICBpbmZvKGJvZHk6IGFueSkge1xuICAgIHRoaXMubG9nKGJvZHksICdpbmZvJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCB2ZXJib3NlIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYSB3YXJuaW5nIG9iamVjdC4gcHJlZmVyYWJseSB3aXRoIGEgbWVzc2FnZSBmaWVsZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHkubWVzc2FnZTogYSBtZXNzYWdlIHRvIGJlIGluZ2VzdGVkIGJ5IGxvZyBzZXJ2ZXIuIG9wdGlvbmFsLlxuICAgKi9cbiAgdmVyYm9zZShib2R5OiBhbnkpIHtcbiAgICB0aGlzLmxvZyhib2R5LCAndmVyYm9zZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIGxvZ2dlciB3aXRoIGEgZGlmZmVyZW50IHNldCBvZiB0YWdzIGJ1dCB3aXRoIHRoZSBzYW1lIHNjb3BlIGFzIHRoZSBvcmlnaW5hbC5cbiAgICogQHBhcmFtIHRhZ3NcbiAgICovXG4gIHRhZ3ModGFnczogP0FycmF5PHN0cmluZz4pOiBMb2dnZXIge1xuICAgIGNvbnN0IHBhcmFtcyA6IElMb2dnZXJDb25zdHJ1Y3RvclBhcmFtcyA9IHtcbiAgICAgIHNjb3BlOiB0aGlzLnBhcmFtcy5zY29wZSxcbiAgICAgIHRhZ3MsXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IExvZ2dlcihwYXJhbXMpO1xuICB9XG5cbiAgc3RhdGljIGxvZyhib2R5OiBhbnksIGxldmVsOiBMZXZlbCA9ICd2ZXJib3NlJykge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIubG9nKGJvZHksIGxldmVsKTtcbiAgfVxuXG4gIHN0YXRpYyBlcnJvcihib2R5OiBhbnkpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLmVycm9yKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIHdhcm4oYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci53YXJuKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIGluZm8oYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci5pbmZvKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIHZlcmJvc2UoYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci52ZXJib3NlKGJvZHkpO1xuICB9XG59XG4iXX0=