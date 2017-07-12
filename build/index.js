'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var _debug = require('debug');var _debug2 = _interopRequireDefault(_debug);
var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMb2dnZXIiLCJjb25zdHJ1Y3RvciIsInBhcmFtcyIsImRlZmF1bHRTY29wZSIsImlzTnVsbCIsInByb2Nlc3MiLCJlbnYiLCJMT0dfU0NPUEUiLCJlbnZUaW1lU3RhbXAiLCJMT0dfTk9USU1FU1RBTVAiLCJpc05pbCIsInNjb3BlIiwidGFncyIsImVuYWJsZVRpbWVzdGFtcCIsInRyaW0iLCJtZXJnZSIsImxvZyIsImJvZHkiLCJsZXZlbCIsInBheWxvYWQiLCJ0aW1lc3RhbXAiLCJEYXRlIiwibWVzc2FnZSIsImlzQXJyYXkiLCJqb2luIiwiZCIsImVycm9yIiwid2FybiIsImluZm8iLCJ2ZXJib3NlIiwibG9nZ2VyIl0sIm1hcHBpbmdzIjoiO0FBQ0EsOEI7QUFDQSxnQzs7QUFFZSxNQUFNQSxNQUFOLENBQWdDOzs7QUFHN0NDLGNBQVlDLE1BQVosRUFBd0Q7QUFDdEQsVUFBTUMsZUFBeUIsaUJBQUVDLE1BQUYsQ0FBU0MsUUFBUUMsR0FBUixDQUFZQyxTQUFyQixJQUFrQyxTQUFsQyxHQUE4Q0YsUUFBUUMsR0FBUixDQUFZQyxTQUF6RjtBQUNBLFVBQU1DLGVBQTBCLENBQUNILFFBQVFDLEdBQVIsQ0FBWUcsZUFBN0M7QUFDQSxRQUFJLGlCQUFFQyxLQUFGLENBQVFSLE1BQVIsQ0FBSixFQUFxQjtBQUNuQixXQUFLQSxNQUFMLEdBQWM7QUFDWlMsZUFBT1IsWUFESztBQUVaUyxjQUFNLENBQUMsRUFBRCxDQUZNO0FBR1pDLHlCQUFpQkwsWUFITCxFQUFkOztBQUtELEtBTkQsTUFNTyxJQUFJLE9BQU9OLE1BQVAsS0FBa0IsUUFBdEIsRUFBZ0M7QUFDckMsV0FBS0EsTUFBTCxHQUFjO0FBQ1pTLGVBQU8saUJBQUVHLElBQUYsQ0FBT1osTUFBUCxDQURLO0FBRVpVLGNBQU0sQ0FBQyxFQUFELENBRk07QUFHWkMseUJBQWlCTCxZQUhMLEVBQWQ7O0FBS0QsS0FOTSxNQU1BLElBQUksT0FBT04sTUFBUCxL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ZCxHQUFQLENBQVdDLElBQVgsRUFBaUJDLEtBQWpCO0FBQ0Q7O0FBRUQsU0FBT1EsS0FBUCxDQUFhVCxJQUFiLEVBQXdCO0FBQ3RCLFVBQU1hLFNBQVMsSUFBSTlCLE1BQUosRUFBZjtBQUNBOEIsV0FBT0osS0FBUCxDQUFhVCxJQUFiO0FBQ0Q7O0FBRUQsU0FBT1UsSUFBUCxDQUFZVixJQUFaLEVBQXVCO0FBQ3JCLFVBQU1hLFNBQVMsSUFBSTlCLE1BQUosRUFBZjtBQUNBOEIsV0FBT0gsSUFBUCxDQUFZVixJQUFaO0FBQ0Q7O0FBRUQsU0FBT1csSUFBUCxDQUFZWCxJQUFaLEVBQXVCO0FBQ3JCLFVBQU1hLFNBQVMsSUFBSTlCLE1BQUosRUFBZjtBQUNBOEIsV0FBT0YsSUFBUCxDQUFZWCxJQUFaO0FBQ0Q7O0FBRUQsU0FBT1ksT0FBUCxDQUFlWixJQUFmLEVBQTBCO0FBQ3hCLFVBQU1hLFNBQVMsSUFBSTlCLE1BQUosRUFBZjtBQUNBOEIsV0FBT0QsT0FBUCxDQUFlWixJQUFmO0FBQ0QsR0EzSDRDLEMsa0JBQTFCakIsTSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyIGltcGxlbWVudHMgSUxvZ2dlciB7XG4gIHBhcmFtczogSUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogP0lMb2dnZXJDb25zdHJ1Y3RvclBhcmFtcyB8IHN0cmluZykge1xuICAgIGNvbnN0IGRlZmF1bHRTY29wZSA6ID9zdHJpbmcgPSBfLmlzTnVsbChwcm9jZXNzLmVudi5MT0dfU0NPUEUpID8gJ2RlZmF1bHQnIDogcHJvY2Vzcy5lbnYuTE9HX1NDT1BFO1xuICAgIGNvbnN0IGVudlRpbWVTdGFtcCA6ID9ib29sZWFuID0gIXByb2Nlc3MuZW52LkxPR19OT1RJTUVTVEFNUDtcbiAgICBpZiAoXy5pc05pbChwYXJhbXMpKSB7XG4gICAgICB0aGlzLnBhcmFtcyA9IHtcbiAgICAgICAgc2NvcGU6IGRlZmF1bHRTY29wZSxcbiAgICAgICAgdGFnczogWycnXSxcbiAgICAgICAgZW5hYmxlVGltZXN0YW1wOiBlbnZUaW1lU3RhbXAsXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMucGFyYW1zID0ge1xuICAgICAgICBzY29wZTogXy50cmltKHBhcmFtcyksXG4gICAgICAgIHRhZ3M6IFsnJ10sXG4gICAgICAgIGVuYWJsZVRpbWVzdGFtcDogZW52VGltZVN0YW1wLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLnBhcmFtcyA9IF8ubWVyZ2UodGhpcy5wYXJhbXMsIHBhcmFtcyk7XG4gICAgICB0aGlzLnBhcmFtcy5zY29wZSA9IF8uaXNOaWwodGhpcy5wYXJhbXMuc2NvcGUpID8gZGVmYXVsdFNjb3BlIDogdGhpcy5wYXJhbXMuc2NvcGU7XG4gICAgICB0aGlzLnBhcmFtcy5lbmFibGVUaW1lc3RhbXAgPSBlbnZUaW1lU3RhbXA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgZXJyb3IgbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhbmQgZXJyb3Igb2JqZWN0LlxuICAgKiBAcGFyYW0gbGV2ZWwgY2FuIGJlICdlcnJvcicsICd3YXJuJywgJ2luZm8nLCAndmVyYm9zZSdcbiAgICovXG4gIGxvZyhib2R5OiBhbnksIGxldmVsOiBMZXZlbCA9ICd2ZXJib3NlJykge1xuICAgIGxldCBwYXlsb2FkID0ge307XG4gICAgaWYgKHR5cGVvZiB0aGlzLnBhcmFtcy5zY29wZSAhPT0gJ3N0cmluZycpIHRoaXMucGFyYW1zLnNjb3BlID0gJ2RlZmF1bHQnO1xuICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHBheWxvYWQgPSBfLm1lcmdlKGJvZHksIHsgdGltZXN0YW1wOiBuZXcgRGF0ZSgpIH0pO1xuICAgICAgaWYgKHRoaXMucGFyYW1zLmVuYWJsZVRpbWVzdGFtcCkge1xuICAgICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IHRpbWVzdGFtcDogbmV3IERhdGUoKSB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBtZXNzYWdlOiBfLnRyaW0oYm9keSkgfSk7XG4gICAgICBpZiAodGhpcy5wYXJhbXMuZW5hYmxlVGltZXN0YW1wKSB7XG4gICAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgdGltZXN0YW1wOiBuZXcgRGF0ZSgpIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdGhpcyBpcyBzbyB0aGF0IGl0IHdpbGwgYmUgZWFzaWVyIHRvIHF1ZXJ5IG9uIHRoZSBiYWNrZW5kIGllLiBsb2dnbHkgb3IgZWxhc3RpYyBzZWFyY2guXG4gICAgY29uc3QgdGFncyA9IHRoaXMucGFyYW1zLnRhZ3MgIT0gbnVsbCAmJiBfLmlzQXJyYXkodGhpcy5wYXJhbXMudGFncykgPyB0aGlzLnBhcmFtcy50YWdzLmpvaW4oKSA6ICd1bnRhZ2dlZCc7XG4gICAgY29uc3QgZCA9IGRlYnVnKGAke3RoaXMucGFyYW1zLnNjb3BlfToke3RhZ3MgPT09ICcnID8gJ3VudGFnZ2VkJyA6IHRhZ3N9OiR7bGV2ZWx9YCk7XG4gICAgZCgnJWonLCBwYXlsb2FkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IGVycm9yIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYW5kIGVycm9yIG9iamVjdC5cbiAgICovXG4gIGVycm9yKGJvZHk6IGFueSkge1xuICAgIHRoaXMubG9nKGJvZHksICdlcnJvcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgd2FybiBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGEgd2FybmluZyBvYmplY3QuIHByZWZlcmFibHkgd2l0aCBhIG1lc3NhZ2UgZmllbGQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5Lm1lc3NhZ2U6IGEgbWVzc2FnZSB0byBiZSBpbmdlc3RlZCBieSBsb2cgc2VydmVyLiBvcHRpb25hbC5cbiAgICovXG4gIHdhcm4oYm9keTogYW55KSB7XG4gICAgdGhpcy5sb2coYm9keSwgJ3dhcm4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IGluZm8gbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhIHdhcm5pbmcgb2JqZWN0LiBwcmVmZXJhYmx5IHdpdGggYSBtZXNzYWdlIGZpZWxkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keS5tZXNzYWdlOiBhIG1lc3NhZ2UgdG8gYmUgaW5nZXN0ZWQgYnkgbG9nIHNlcnZlci4gb3B0aW9uYWwuXG4gICAqL1xuICBpbmZvKGJvZHk6IGFueSkge1xuICAgIHRoaXMubG9nKGJvZHksICdpbmZvJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCB2ZXJib3NlIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYSB3YXJuaW5nIG9iamVjdC4gcHJlZmVyYWJseSB3aXRoIGEgbWVzc2FnZSBmaWVsZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHkubWVzc2FnZTogYSBtZXNzYWdlIHRvIGJlIGluZ2VzdGVkIGJ5IGxvZyBzZXJ2ZXIuIG9wdGlvbmFsLlxuICAgKi9cbiAgdmVyYm9zZShib2R5OiBhbnkpIHtcbiAgICB0aGlzLmxvZyhib2R5LCAndmVyYm9zZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIGxvZ2dlciB3aXRoIGEgZGlmZmVyZW50IHNldCBvZiB0YWdzIGJ1dCB3aXRoIHRoZSBzYW1lIHNjb3BlIGFzIHRoZSBvcmlnaW5hbC5cbiAgICogQHBhcmFtIHRhZ3NcbiAgICovXG4gIHRhZ3ModGFnczogP0FycmF5PHN0cmluZz4pOiBMb2dnZXIge1xuICAgIGNvbnN0IHBhcmFtcyA6IElMb2dnZXJDb25zdHJ1Y3RvclBhcmFtcyA9IHtcbiAgICAgIHNjb3BlOiB0aGlzLnBhcmFtcy5zY29wZSxcbiAgICAgIHRhZ3MsXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IExvZ2dlcihwYXJhbXMpO1xuICB9XG5cbiAgc3RhdGljIGxvZyhib2R5OiBhbnksIGxldmVsOiBMZXZlbCA9ICd2ZXJib3NlJykge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIubG9nKGJvZHksIGxldmVsKTtcbiAgfVxuXG4gIHN0YXRpYyBlcnJvcihib2R5OiBhbnkpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLmVycm9yKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIHdhcm4oYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci53YXJuKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIGluZm8oYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci5pbmZvKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIHZlcmJvc2UoYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci52ZXJib3NlKGJvZHkpO1xuICB9XG59XG4iXX0=