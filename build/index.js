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
    if (typeof this.params.scope !== 'string') this.params.scope = 'default';
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

    // this is so that it will be easier to query on the backend ie. loggly or elastic search.
    const tags = this.params.tags != null && _lodash2.default.isArray(this.params.tags) ? this.params.tags.join() : 'untagged';
    const d = (0, _debug2.default)(`${this.params.scope}:${tags === '' ? 'untagged' : tags}:${level}`);
    d('%j', payload);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMb2dnZXIiLCJjb25zdHJ1Y3RvciIsInBhcmFtcyIsImhvc3RuYW1lIiwicGlkIiwicHJvY2VzcyIsImRlZmF1bHRTY29wZSIsImlzTnVsbCIsImVudiIsIkxPR19TQ09QRSIsImVudlRpbWVTdGFtcCIsImlzRGlzYWJsZWQiLCJMT0dfTk9USU1FU1RBTVAiLCJlbnZQaWQiLCJMT0dfTk9QSUQiLCJlbnZIb3N0bmFtZSIsIkxPR19OT0hPU1ROQU1FIiwiaXNOaWwiLCJzY29wZSIsInRhZ3MiLCJlbmFibGVUaW1lc3RhbXAiLCJlbmFibGVQaWQiLCJlbmFibGVIb3N0bmFtZSIsInRyaW0iLCJtZXJnZSIsInBhcmFtIiwidG9OdW1iZXIiLCJsb2ciLCJib2R5IiwibGV2ZWwiLCJwYXlsb2FkIiwidGltZXN0YW1wIiwiRGF0ZSIsIm1lc3NhZ2UiLCJpc0FycmF5Iiwiam9pbiIsImQiLCJlcnJvciIsImVyciIsInRvUGxhaW5PYmplY3QiLCJzdGFjayIsIndhcm4iLCJpbmZvIiwidmVyYm9zZSIsImNvbXBhY3QiLCJ1bmlvbiIsImxvZ2dlciJdLCJtYXBwaW5ncyI6IjtBQUNBLDhCO0FBQ0EsZ0M7QUFDQSx3Qjs7QUFFZSxNQUFNQSxNQUFOLENBQWdDOzs7OztBQUs3Q0MsY0FBWUMsTUFBWixFQUF3RDtBQUN0RCxTQUFLQyxRQUFMLEdBQWdCLGFBQUdBLFFBQUgsRUFBaEI7QUFDQSxTQUFLQyxHQUFMLEdBQVdDLFFBQVFELEdBQW5CO0FBQ0EsVUFBTUUsZUFBeUIsaUJBQUVDLE1BQUYsQ0FBU0YsUUFBUUcsR0FBUixDQUFZQyxTQUFyQixJQUFrQyxTQUFsQyxHQUE4Q0osUUFBUUcsR0FBUixDQUFZQyxTQUF6RjtBQUNBLFVBQU1DLGVBQTBCLENBQUNWLE9BQU9XLFVBQVAsQ0FBa0JOLFFBQVFHLEdBQVIsQ0FBWUksZUFBOUIsQ0FBakM7QUFDQSxVQUFNQyxTQUFvQixDQUFDYixPQUFPVyxVQUFQLENBQWtCTixR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QUFTLElBQUk5QyxNQUFKLEVBQWY7QUFDQThDLFdBQU9MLElBQVAsQ0FBWWIsSUFBWjtBQUNEOztBQUVELFNBQU9jLElBQVAsQ0FBWWQsSUFBWixFQUF1QjtBQUNyQixVQUFNa0IsU0FBUyxJQUFJOUMsTUFBSixFQUFmO0FBQ0E4QyxXQUFPSixJQUFQLENBQVlkLElBQVo7QUFDRDs7QUFFRCxTQUFPZSxPQUFQLENBQWVmLElBQWYsRUFBMEI7QUFDeEIsVUFBTWtCLFNBQVMsSUFBSTlDLE1BQUosRUFBZjtBQUNBOEMsV0FBT0gsT0FBUCxDQUFlZixJQUFmO0FBQ0QsR0FsSzRDLEMsa0JBQTFCNUIsTSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBvcyBmcm9tICdvcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2dlciBpbXBsZW1lbnRzIElMb2dnZXIge1xuICBwYXJhbXM6IElMb2dnZXJDb25zdHJ1Y3RvclBhcmFtcztcbiAgcGlkOiBudW1iZXI7XG4gIGhvc3RuYW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiA/SUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5ob3N0bmFtZSA9IG9zLmhvc3RuYW1lKCk7XG4gICAgdGhpcy5waWQgPSBwcm9jZXNzLnBpZDtcbiAgICBjb25zdCBkZWZhdWx0U2NvcGUgOiA/c3RyaW5nID0gXy5pc051bGwocHJvY2Vzcy5lbnYuTE9HX1NDT1BFKSA/ICdkZWZhdWx0JyA6IHByb2Nlc3MuZW52LkxPR19TQ09QRTtcbiAgICBjb25zdCBlbnZUaW1lU3RhbXAgOiA/Ym9vbGVhbiA9ICFMb2dnZXIuaXNEaXNhYmxlZChwcm9jZXNzLmVudi5MT0dfTk9USU1FU1RBTVApO1xuICAgIGNvbnN0IGVudlBpZCA6ID9ib29sZWFuID0gIUxvZ2dlci5pc0Rpc2FibGVkKHByb2Nlc3MuZW52LkxPR19OT1BJRCk7XG4gICAgY29uc3QgZW52SG9zdG5hbWUgOiA/Ym9vbGVhbiA9ICFMb2dnZXIuaXNEaXNhYmxlZChwcm9jZXNzLmVudi5MT0dfTk9IT1NUTkFNRSk7XG5cbiAgICBpZiAoXy5pc05pbChwYXJhbXMpKSB7XG4gICAgICB0aGlzLnBhcmFtcyA9IHtcbiAgICAgICAgc2NvcGU6IGRlZmF1bHRTY29wZSxcbiAgICAgICAgdGFnczogWycnXSxcbiAgICAgICAgZW5hYmxlVGltZXN0YW1wOiBlbnZUaW1lU3RhbXAsXG4gICAgICAgIGVuYWJsZVBpZDogZW52UGlkLFxuICAgICAgICBlbmFibGVIb3N0bmFtZTogZW52SG9zdG5hbWUsXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMucGFyYW1zID0ge1xuICAgICAgICBzY29wZTogXy50cmltKHBhcmFtcyksXG4gICAgICAgIHRhZ3M6IFsnJ10sXG4gICAgICAgIGVuYWJsZVRpbWVzdGFtcDogZW52VGltZVN0YW1wLFxuICAgICAgICBlbmFibGVQaWQ6IGVudlBpZCxcbiAgICAgICAgZW5hYmxlSG9zdG5hbWU6IGVudkhvc3RuYW1lLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLnBhcmFtcyA9IF8ubWVyZ2UodGhpcy5wYXJhbXMsIHBhcmFtcywge1xuICAgICAgICBlbmFibGVUaW1lc3RhbXA6IGVudlRpbWVTdGFtcCxcbiAgICAgICAgZW5hYmxlUGlkOiBlbnZQaWQsXG4gICAgICAgIGVuYWJsZUhvc3RuYW1lOiBlbnZIb3N0bmFtZSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wYXJhbXMuc2NvcGUgPSBfLmlzTmlsKHRoaXMucGFyYW1zLnNjb3BlKSA/IGRlZmF1bHRTY29wZSA6IHRoaXMucGFyYW1zLnNjb3BlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIHZhbHVlIGlzIGV4cGxpY2l0eSBlcXVhbCB0byAnMScuXG4gICAqIEBwYXJhbSBwYXJhbVxuICAgKiBAcGFyYW0gZGVmYXVsVmFsdWVcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgaXNEaXNhYmxlZChwYXJhbTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIF8uaXNOaWwocGFyYW0pID8gZmFsc2UgOiAoXy50b051bWJlcihwYXJhbSkgPT09IDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgZXJyb3IgbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhbmQgZXJyb3Igb2JqZWN0LlxuICAgKiBAcGFyYW0gbGV2ZWwgY2FuIGJlICdlcnJvcicsICd3YXJuJywgJ2luZm8nLCAndmVyYm9zZSdcbiAgICovXG4gIGxvZyhib2R5OiBhbnksIGxldmVsOiBMZXZlbCA9ICd2ZXJib3NlJyk6IHZvaWQge1xuICAgIGxldCBwYXlsb2FkID0ge307XG4gICAgaWYgKHR5cGVvZiB0aGlzLnBhcmFtcy5zY29wZSAhPT0gJ3N0cmluZycpIHRoaXMucGFyYW1zLnNjb3BlID0gJ2RlZmF1bHQnO1xuICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIGJvZHkpO1xuICAgICAgaWYgKHRoaXMucGFyYW1zLmVuYWJsZVRpbWVzdGFtcCkge1xuICAgICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IHRpbWVzdGFtcDogbmV3IERhdGUoKSB9KTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBhcmFtcy5lbmFibGVQaWQpIHtcbiAgICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBwaWQ6IHRoaXMucGlkIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucGFyYW1zLmVuYWJsZUhvc3RuYW1lKSB7XG4gICAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgaG9zdG5hbWU6IHRoaXMuaG9zdG5hbWUgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgbWVzc2FnZTogXy50cmltKGJvZHkpIH0pO1xuICAgICAgaWYgKHRoaXMucGFyYW1zLmVuYWJsZVRpbWVzdGFtcCkge1xuICAgICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IHRpbWVzdGFtcDogbmV3IERhdGUoKSB9KTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBhcmFtcy5lbmFibGVQaWQpIHtcbiAgICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBwaWQ6IHRoaXMucGlkIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucGFyYW1zLmVuYWJsZUhvc3RuYW1lKSB7XG4gICAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgaG9zdG5hbWU6IHRoaXMuaG9zdG5hbWUgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB0aGlzIGlzIHNvIHRoYXQgaXQgd2lsbCBiZSBlYXNpZXIgdG8gcXVlcnkgb24gdGhlIGJhY2tlbmQgaWUuIGxvZ2dseSBvciBlbGFzdGljIHNlYXJjaC5cbiAgICBjb25zdCB0YWdzID0gdGhpcy5wYXJhbXMudGFncyAhPSBudWxsICYmIF8uaXNBcnJheSh0aGlzLnBhcmFtcy50YWdzKSA/IHRoaXMucGFyYW1zLnRhZ3Muam9pbigpIDogJ3VudGFnZ2VkJztcbiAgICBjb25zdCBkID0gZGVidWcoYCR7dGhpcy5wYXJhbXMuc2NvcGV9OiR7dGFncyA9PT0gJycgPyAndW50YWdnZWQnIDogdGFnc306JHtsZXZlbH1gKTtcbiAgICBkKCclaicsIHBheWxvYWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgZXJyb3IgbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhbiBlcnJvciBvYmplY3QuXG4gICAqL1xuICBlcnJvcihlcnI6IGFueSkge1xuICAgIGxldCBwYXlsb2FkID0gKHR5cGVvZiBlcnIgPT09ICdzdHJpbmcnKSA/IHsgbWVzc2FnZTogZXJyIH0gOiBfLnRvUGxhaW5PYmplY3QoZXJyKTtcbiAgICBpZiAoIV8uaXNOaWwoZXJyLm1lc3NhZ2UpKSBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IG1lc3NhZ2U6IGVyci5tZXNzYWdlIH0pO1xuICAgIGlmICghXy5pc05pbChlcnIuc3RhY2spKSBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IG1lc3NhZ2U6IGVyci5zdGFjayB9KTtcbiAgICB0aGlzLmxvZyhwYXlsb2FkLCAnZXJyb3InKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IHdhcm4gbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhIHdhcm5pbmcgb2JqZWN0LiBwcmVmZXJhYmx5IHdpdGggYSBtZXNzYWdlIGZpZWxkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keS5tZXNzYWdlOiBhIG1lc3NhZ2UgdG8gYmUgaW5nZXN0ZWQgYnkgbG9nIHNlcnZlci4gb3B0aW9uYWwuXG4gICAqL1xuICB3YXJuKGJvZHk6IGFueSkge1xuICAgIHRoaXMubG9nKGJvZHksICd3YXJuJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCBpbmZvIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYSB3YXJuaW5nIG9iamVjdC4gcHJlZmVyYWJseSB3aXRoIGEgbWVzc2FnZSBmaWVsZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHkubWVzc2FnZTogYSBtZXNzYWdlIHRvIGJlIGluZ2VzdGVkIGJ5IGxvZyBzZXJ2ZXIuIG9wdGlvbmFsLlxuICAgKi9cbiAgaW5mbyhib2R5OiBhbnkpIHtcbiAgICB0aGlzLmxvZyhib2R5LCAnaW5mbycpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgdmVyYm9zZSBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGEgd2FybmluZyBvYmplY3QuIHByZWZlcmFibHkgd2l0aCBhIG1lc3NhZ2UgZmllbGQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5Lm1lc3NhZ2U6IGEgbWVzc2FnZSB0byBiZSBpbmdlc3RlZCBieSBsb2cgc2VydmVyLiBvcHRpb25hbC5cbiAgICovXG4gIHZlcmJvc2UoYm9keTogYW55KSB7XG4gICAgdGhpcy5sb2coYm9keSwgJ3ZlcmJvc2UnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBsb2dnZXIgd2l0aCBhIGRpZmZlcmVudCBzZXQgb2YgdGFncyBidXQgd2l0aCB0aGUgc2FtZSBzY29wZSBhcyB0aGUgb3JpZ2luYWwuXG4gICAqIEBwYXJhbSB0YWdzXG4gICAqL1xuICB0YWdzKHRhZ3M6ID9BcnJheTxzdHJpbmc+KTogTG9nZ2VyIHtcbiAgICBjb25zdCBwYXJhbXMgOiBJTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXMgPSB7XG4gICAgICBzY29wZTogdGhpcy5wYXJhbXMuc2NvcGUsXG4gICAgICB0YWdzOiBfLmNvbXBhY3QoXy51bmlvbih0aGlzLnBhcmFtcy50YWdzLCB0YWdzKSksXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IExvZ2dlcihwYXJhbXMpO1xuICB9XG5cbiAgc3RhdGljIGxvZyhib2R5OiBhbnksIGxldmVsOiBMZXZlbCA9ICd2ZXJib3NlJykge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIubG9nKGJvZHksIGxldmVsKTtcbiAgfVxuXG4gIHN0YXRpYyBlcnJvcihib2R5OiBhbnkpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLmVycm9yKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIHdhcm4oYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci53YXJuKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIGluZm8oYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci5pbmZvKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIHZlcmJvc2UoYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci52ZXJib3NlKGJvZHkpO1xuICB9XG59XG4iXX0=