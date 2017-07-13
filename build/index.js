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
    let payload = {};
    if (typeof body === 'object') {
      payload = _lodash2.default.merge(payload, body);
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
      payload = _lodash2.default.merge(payload, { message: _lodash2.default.trim(body) });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMb2dnZXIiLCJjb25zdHJ1Y3RvciIsInBhcmFtcyIsImhvc3RuYW1lIiwicGlkIiwicHJvY2VzcyIsImRlZmF1bHRTY29wZSIsImlzTnVsbCIsImVudiIsIkxPR19TQ09QRSIsImVudlRpbWVTdGFtcCIsImlzRGlzYWJsZWQiLCJMT0dfTk9USU1FU1RBTVAiLCJlbnZQaWQiLCJMT0dfTk9QSUQiLCJlbnZIb3N0bmFtZSIsIkxPR19OT0hPU1ROQU1FIiwiaXNOaWwiLCJzY29wZSIsInRhZ3MiLCJlbmFibGVUaW1lc3RhbXAiLCJlbmFibGVQaWQiLCJlbmFibGVIb3N0bmFtZSIsInRyaW0iLCJtZXJnZSIsInBhcmFtIiwidG9OdW1iZXIiLCJsb2ciLCJib2R5IiwibGV2ZWwiLCJwYXlsb2FkIiwidGltZXN0YW1wIiwiRGF0ZSIsIm1lc3NhZ2UiLCJpc0FycmF5Iiwiam9pbiIsImxhYmVsIiwicmVwbGFjZSIsImVycm9yIiwiZXJyIiwidG9QbGFpbk9iamVjdCIsInN0YWNrIiwid2FybiIsImluZm8iLCJ2ZXJib3NlIiwiY29tcGFjdCIsInVuaW9uIiwibG9nZ2VyIl0sIm1hcHBpbmdzIjoiO0FBQ0EsOEI7QUFDQSxnQztBQUNBLHdCOztBQUVlLE1BQU1BLE1BQU4sQ0FBZ0M7Ozs7O0FBSzdDQyxjQUFZQyxNQUFaLEVBQXdEO0FBQ3RELFNBQUtDLFFBQUwsR0FBZ0IsYUFBR0EsUUFBSCxFQUFoQjtBQUNBLFNBQUtDLEdBQUwsR0FBV0MsUUFBUUQsR0FBbkI7QUFDQSxVQUFNRSxlQUF5QixpQkFBRUMsTUFBRixDQUFTRixRQUFRRyxHQUFSLENBQVlDLFNBQXJCLElBQWtDLFNBQWxDLEdBQThDSixRQUFRRyxHQUFSLENBQVlDLFNBQXpGO0FBQ0EsVUFBTUMsZUFBMEIsQ0FBQ1YsT0FBT1csVUFBUCxDQUFrQk4sUUFBUUcsR0FBUixDQUFZSSxlQUE5QixDQUFqQztBQUNBLFVBQU1DLFNBQW9CLENBQUNiLE9BQU9X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QVlkLElBQVosRUFBdUI7QUFDckIsVUFBTW1CLFNBQVMsSUFBSS9DLE1BQUosRUFBZjtBQUNBK0MsV0FBT0wsSUFBUCxDQUFZZCxJQUFaO0FBQ0Q7O0FBRUQsU0FBT2UsSUFBUCxDQUFZZixJQUFaLEVBQXVCO0FBQ3JCLFVBQU1tQixTQUFTLElBQUkvQyxNQUFKLEVBQWY7QUFDQStDLFdBQU9KLElBQVAsQ0FBWWYsSUFBWjtBQUNEOztBQUVELFNBQU9nQixPQUFQLENBQWVoQixJQUFmLEVBQTBCO0FBQ3hCLFVBQU1tQixTQUFTLElBQUkvQyxNQUFKLEVBQWY7QUFDQStDLFdBQU9ILE9BQVAsQ0FBZWhCLElBQWY7QUFDRCxHQWxLNEMsQyxrQkFBMUI1QixNIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG9zIGZyb20gJ29zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyIGltcGxlbWVudHMgSUxvZ2dlciB7XG4gIHBhcmFtczogSUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zO1xuICBwaWQ6IG51bWJlcjtcbiAgaG9zdG5hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6ID9JTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXMgfCBzdHJpbmcpIHtcbiAgICB0aGlzLmhvc3RuYW1lID0gb3MuaG9zdG5hbWUoKTtcbiAgICB0aGlzLnBpZCA9IHByb2Nlc3MucGlkO1xuICAgIGNvbnN0IGRlZmF1bHRTY29wZSA6ID9zdHJpbmcgPSBfLmlzTnVsbChwcm9jZXNzLmVudi5MT0dfU0NPUEUpID8gJ2RlZmF1bHQnIDogcHJvY2Vzcy5lbnYuTE9HX1NDT1BFO1xuICAgIGNvbnN0IGVudlRpbWVTdGFtcCA6ID9ib29sZWFuID0gIUxvZ2dlci5pc0Rpc2FibGVkKHByb2Nlc3MuZW52LkxPR19OT1RJTUVTVEFNUCk7XG4gICAgY29uc3QgZW52UGlkIDogP2Jvb2xlYW4gPSAhTG9nZ2VyLmlzRGlzYWJsZWQocHJvY2Vzcy5lbnYuTE9HX05PUElEKTtcbiAgICBjb25zdCBlbnZIb3N0bmFtZSA6ID9ib29sZWFuID0gIUxvZ2dlci5pc0Rpc2FibGVkKHByb2Nlc3MuZW52LkxPR19OT0hPU1ROQU1FKTtcblxuICAgIGlmIChfLmlzTmlsKHBhcmFtcykpIHtcbiAgICAgIHRoaXMucGFyYW1zID0ge1xuICAgICAgICBzY29wZTogZGVmYXVsdFNjb3BlLFxuICAgICAgICB0YWdzOiBbJyddLFxuICAgICAgICBlbmFibGVUaW1lc3RhbXA6IGVudlRpbWVTdGFtcCxcbiAgICAgICAgZW5hYmxlUGlkOiBlbnZQaWQsXG4gICAgICAgIGVuYWJsZUhvc3RuYW1lOiBlbnZIb3N0bmFtZSxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5wYXJhbXMgPSB7XG4gICAgICAgIHNjb3BlOiBfLnRyaW0ocGFyYW1zKSxcbiAgICAgICAgdGFnczogWycnXSxcbiAgICAgICAgZW5hYmxlVGltZXN0YW1wOiBlbnZUaW1lU3RhbXAsXG4gICAgICAgIGVuYWJsZVBpZDogZW52UGlkLFxuICAgICAgICBlbmFibGVIb3N0bmFtZTogZW52SG9zdG5hbWUsXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMucGFyYW1zID0gXy5tZXJnZSh0aGlzLnBhcmFtcywgcGFyYW1zLCB7XG4gICAgICAgIGVuYWJsZVRpbWVzdGFtcDogZW52VGltZVN0YW1wLFxuICAgICAgICBlbmFibGVQaWQ6IGVudlBpZCxcbiAgICAgICAgZW5hYmxlSG9zdG5hbWU6IGVudkhvc3RuYW1lLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnBhcmFtcy5zY29wZSA9IF8uaXNOaWwodGhpcy5wYXJhbXMuc2NvcGUpID8gZGVmYXVsdFNjb3BlIDogdGhpcy5wYXJhbXMuc2NvcGU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgdmFsdWUgaXMgZXhwbGljaXR5IGVxdWFsIHRvICcxJy5cbiAgICogQHBhcmFtIHBhcmFtXG4gICAqIEBwYXJhbSBkZWZhdWxWYWx1ZVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBpc0Rpc2FibGVkKHBhcmFtOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gXy5pc05pbChwYXJhbSkgPyBmYWxzZSA6IChfLnRvTnVtYmVyKHBhcmFtKSA9PT0gMSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCBlcnJvciBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGFuZCBlcnJvciBvYmplY3QuXG4gICAqIEBwYXJhbSBsZXZlbCBjYW4gYmUgJ2Vycm9yJywgJ3dhcm4nLCAnaW5mbycsICd2ZXJib3NlJ1xuICAgKi9cbiAgbG9nKGJvZHk6IGFueSwgbGV2ZWw6IExldmVsID0gJ3ZlcmJvc2UnKTogdm9pZCB7XG4gICAgbGV0IHBheWxvYWQgPSB7fTtcbiAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdvYmplY3QnKSB7XG4gICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCBib2R5KTtcbiAgICAgIGlmICh0aGlzLnBhcmFtcy5lbmFibGVUaW1lc3RhbXApIHtcbiAgICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyB0aW1lc3RhbXA6IG5ldyBEYXRlKCkgfSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wYXJhbXMuZW5hYmxlUGlkKSB7XG4gICAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgcGlkOiB0aGlzLnBpZCB9KTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBhcmFtcy5lbmFibGVIb3N0bmFtZSkge1xuICAgICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IGhvc3RuYW1lOiB0aGlzLmhvc3RuYW1lIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IG1lc3NhZ2U6IF8udHJpbShib2R5KSB9KTtcbiAgICAgIGlmICh0aGlzLnBhcmFtcy5lbmFibGVUaW1lc3RhbXApIHtcbiAgICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyB0aW1lc3RhbXA6IG5ldyBEYXRlKCkgfSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wYXJhbXMuZW5hYmxlUGlkKSB7XG4gICAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgcGlkOiB0aGlzLnBpZCB9KTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBhcmFtcy5lbmFibGVIb3N0bmFtZSkge1xuICAgICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IGhvc3RuYW1lOiB0aGlzLmhvc3RuYW1lIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5wYXJhbXMuc2NvcGUgPSB0aGlzLnBhcmFtcy5zY29wZSB8fCAnZGVmYXVsdCc7XG4gICAgLy8gdGhpcyBpcyBzbyB0aGF0IGl0IHdpbGwgYmUgZWFzaWVyIHRvIHF1ZXJ5IG9uIHRoZSBiYWNrZW5kIGllLiBsb2dnbHkgb3IgZWxhc3RpYyBzZWFyY2guXG4gICAgY29uc3QgdGFnczogc3RyaW5nID0gdGhpcy5wYXJhbXMudGFncyAhPSBudWxsICYmIF8uaXNBcnJheSh0aGlzLnBhcmFtcy50YWdzKSA/IHRoaXMucGFyYW1zLnRhZ3Muam9pbigpIDogJ3VudGFnZ2VkJztcbiAgICBjb25zdCBsYWJlbDogc3RyaW5nID0gYCR7dGhpcy5wYXJhbXMuc2NvcGV9OiR7dGFncyA9PT0gJycgPyAndW50YWdnZWQnIDogdGFnc306JHtsZXZlbH1gO1xuICAgIGRlYnVnKGxhYmVsLnJlcGxhY2UoLyg/OlxcclxcbnxcXHJ8XFxuKS9nLCAnICcpKSgnJWonLCBwYXlsb2FkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IGVycm9yIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYW4gZXJyb3Igb2JqZWN0LlxuICAgKi9cbiAgZXJyb3IoZXJyOiBhbnkpIHtcbiAgICBsZXQgcGF5bG9hZCA9ICh0eXBlb2YgZXJyID09PSAnc3RyaW5nJykgPyB7IG1lc3NhZ2U6IGVyciB9IDogXy50b1BsYWluT2JqZWN0KGVycik7XG4gICAgaWYgKCFfLmlzTmlsKGVyci5tZXNzYWdlKSkgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBtZXNzYWdlOiBlcnIubWVzc2FnZSB9KTtcbiAgICBpZiAoIV8uaXNOaWwoZXJyLnN0YWNrKSkgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBtZXNzYWdlOiBlcnIuc3RhY2sgfSk7XG4gICAgdGhpcy5sb2cocGF5bG9hZCwgJ2Vycm9yJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCB3YXJuIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYSB3YXJuaW5nIG9iamVjdC4gcHJlZmVyYWJseSB3aXRoIGEgbWVzc2FnZSBmaWVsZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHkubWVzc2FnZTogYSBtZXNzYWdlIHRvIGJlIGluZ2VzdGVkIGJ5IGxvZyBzZXJ2ZXIuIG9wdGlvbmFsLlxuICAgKi9cbiAgd2Fybihib2R5OiBhbnkpIHtcbiAgICB0aGlzLmxvZyhib2R5LCAnd2FybicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgaW5mbyBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGEgd2FybmluZyBvYmplY3QuIHByZWZlcmFibHkgd2l0aCBhIG1lc3NhZ2UgZmllbGQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5Lm1lc3NhZ2U6IGEgbWVzc2FnZSB0byBiZSBpbmdlc3RlZCBieSBsb2cgc2VydmVyLiBvcHRpb25hbC5cbiAgICovXG4gIGluZm8oYm9keTogYW55KSB7XG4gICAgdGhpcy5sb2coYm9keSwgJ2luZm8nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IHZlcmJvc2UgbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhIHdhcm5pbmcgb2JqZWN0LiBwcmVmZXJhYmx5IHdpdGggYSBtZXNzYWdlIGZpZWxkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keS5tZXNzYWdlOiBhIG1lc3NhZ2UgdG8gYmUgaW5nZXN0ZWQgYnkgbG9nIHNlcnZlci4gb3B0aW9uYWwuXG4gICAqL1xuICB2ZXJib3NlKGJvZHk6IGFueSkge1xuICAgIHRoaXMubG9nKGJvZHksICd2ZXJib3NlJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbG9nZ2VyIHdpdGggYSBkaWZmZXJlbnQgc2V0IG9mIHRhZ3MgYnV0IHdpdGggdGhlIHNhbWUgc2NvcGUgYXMgdGhlIG9yaWdpbmFsLlxuICAgKiBAcGFyYW0gdGFnc1xuICAgKi9cbiAgdGFncyh0YWdzOiA/QXJyYXk8c3RyaW5nPik6IExvZ2dlciB7XG4gICAgY29uc3QgcGFyYW1zIDogSUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zID0ge1xuICAgICAgc2NvcGU6IHRoaXMucGFyYW1zLnNjb3BlLFxuICAgICAgdGFnczogXy5jb21wYWN0KF8udW5pb24odGhpcy5wYXJhbXMudGFncywgdGFncykpLFxuICAgIH07XG4gICAgcmV0dXJuIG5ldyBMb2dnZXIocGFyYW1zKTtcbiAgfVxuXG4gIHN0YXRpYyBsb2coYm9keTogYW55LCBsZXZlbDogTGV2ZWwgPSAndmVyYm9zZScpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLmxvZyhib2R5LCBsZXZlbCk7XG4gIH1cblxuICBzdGF0aWMgZXJyb3IoYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci5lcnJvcihib2R5KTtcbiAgfVxuXG4gIHN0YXRpYyB3YXJuKGJvZHk6IGFueSkge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIud2Fybihib2R5KTtcbiAgfVxuXG4gIHN0YXRpYyBpbmZvKGJvZHk6IGFueSkge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIuaW5mbyhib2R5KTtcbiAgfVxuXG4gIHN0YXRpYyB2ZXJib3NlKGJvZHk6IGFueSkge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIudmVyYm9zZShib2R5KTtcbiAgfVxufVxuIl19