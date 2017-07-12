'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var _debug = require('debug');var _debug2 = _interopRequireDefault(_debug);
var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _os = require('os');var _os2 = _interopRequireDefault(_os);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class Logger {




  constructor(params) {
    this.hostname = _os2.default.hostname();
    this.pid = process.pid;
    const defaultScope = _lodash2.default.isNull(process.env.LOG_SCOPE) ? 'default' : process.env.LOG_SCOPE;
    const envTimeStamp = !process.env.LOG_NOTIMESTAMP;
    const envPid = !process.env.LOG_NOPID;
    const envHostname = !process.env.LOG_NOHOSTNAME;

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
     * Creates a debug output at error level.
     * @param {Object} body: and error object.
     * @param level can be 'error', 'warn', 'info', 'verbose'
     */
  log(body, level = 'verbose') {
    let payload = {};
    if (typeof this.params.scope !== 'string') this.params.scope = 'default';
    if (typeof body === 'object') {
      payload = _lodash2.default.merge(body, { timestamp: new Date() });
    } else if (typeof body === 'string') {
      payload = _lodash2.default.merge(payload, { message: _lodash2.default.trim(body) });
    } else {
      return;
    }

    if (this.params.enableTimestamp) {
      payload = _lodash2.default.merge(payload, { timestamp: new Date() });
    }
    if (this.params.enablePid) {
      payload = _lodash2.default.merge(payload, { pid: this.pid });
    }
    if (this.params.enableHostname) {
      payload = _lodash2.default.merge(payload, { hostname: this.hostname });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMb2dnZXIiLCJjb25zdHJ1Y3RvciIsInBhcmFtcyIsImhvc3RuYW1lIiwicGlkIiwicHJvY2VzcyIsImRlZmF1bHRTY29wZSIsImlzTnVsbCIsImVudiIsIkxPR19TQ09QRSIsImVudlRpbWVTdGFtcCIsIkxPR19OT1RJTUVTVEFNUCIsImVudlBpZCIsIkxPR19OT1BJRCIsImVudkhvc3RuYW1lIiwiTE9HX05PSE9TVE5BTUUiLCJpc05pbCIsInNjb3BlIiwidGFncyIsImVuYWJsZVRpbWVzdGFtcCIsImVuYWJsZVBpZCIsImVuYWJsZUhvc3RuYW1lIiwidHJpbSIsIm1lcmdlIiwibG9nIiwiYm9keSIsImxldmVsIiwicGF5bG9hZCIsInRpbWVzdGFtcCIsIkRhdGUiLCJtZXNzYWdlIiwiaXNBcnJheSIsImpvaW4iLCJkIiwiZXJyb3IiLCJ3YXJuIiwiaW5mbyIsInZlcmJvc2UiLCJsb2dnZXIiXSwibWFwcGluZ3MiOiI7QUFDQSw4QjtBQUNBLGdDO0FBQ0Esd0I7O0FBRWUsTUFBTUEsTUFBTixDQUFnQzs7Ozs7QUFLN0NDLGNBQVlDLE1BQVosRUFBd0Q7QUFDdEQsU0FBS0MsUUFBTCxHQUFnQixhQUFHQSxRQUFILEVBQWhCO0FBQ0EsU0FBS0MsR0FBTCxHQUFXQyxRQUFRRCxHQUFuQjtBQUNBLFVBQU1FLGVBQXlCLGlCQUFFQyxNQUFGLENBQVNGLFFBQVFHLEdBQVIsQ0FBWUMsU0FBckIsSUFBa0MsU0FBbEMsR0FBOENKLFFBQVFHLEdBQVIsQ0FBWUMsU0FBekY7QUFDQSxVQUFNQyxlQUEwQixDQUFDTCxRQUFRRyxHQUFSLENBQVlHLGVBQTdDO0FBQ0EsVUFBTUMsU0FBb0IsQ0FBQ1AsUUFBUUcsR0FBUixDQUFZSyxTQUF2QztBQUNBLFVBQU1DLGNBQXlCLENBQUNULFFBQVFHLEdBQVIsQ0FBWU8sY0FBNUM7O0FBRUEsUUFBSSxpQkFBRUMsS0FBRixDQUFRZCxNQUFSLENBQUosRUFBcUI7QUFDbkIsV0FB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VUFBTWEsU0FBUyxJQUFJdEMsTUFBSixFQUFmO0FBQ0FzQyxXQUFPRCxPQUFQLENBQWVaLElBQWY7QUFDRCxHQTdJNEMsQyxrQkFBMUJ6QixNIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG9zIGZyb20gJ29zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyIGltcGxlbWVudHMgSUxvZ2dlciB7XG4gIHBhcmFtczogSUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zO1xuICBwaWQ6IG51bWJlcjtcbiAgaG9zdG5hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6ID9JTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXMgfCBzdHJpbmcpIHtcbiAgICB0aGlzLmhvc3RuYW1lID0gb3MuaG9zdG5hbWUoKTtcbiAgICB0aGlzLnBpZCA9IHByb2Nlc3MucGlkO1xuICAgIGNvbnN0IGRlZmF1bHRTY29wZSA6ID9zdHJpbmcgPSBfLmlzTnVsbChwcm9jZXNzLmVudi5MT0dfU0NPUEUpID8gJ2RlZmF1bHQnIDogcHJvY2Vzcy5lbnYuTE9HX1NDT1BFO1xuICAgIGNvbnN0IGVudlRpbWVTdGFtcCA6ID9ib29sZWFuID0gIXByb2Nlc3MuZW52LkxPR19OT1RJTUVTVEFNUDtcbiAgICBjb25zdCBlbnZQaWQgOiA/Ym9vbGVhbiA9ICFwcm9jZXNzLmVudi5MT0dfTk9QSUQ7XG4gICAgY29uc3QgZW52SG9zdG5hbWUgOiA/Ym9vbGVhbiA9ICFwcm9jZXNzLmVudi5MT0dfTk9IT1NUTkFNRTtcblxuICAgIGlmIChfLmlzTmlsKHBhcmFtcykpIHtcbiAgICAgIHRoaXMucGFyYW1zID0ge1xuICAgICAgICBzY29wZTogZGVmYXVsdFNjb3BlLFxuICAgICAgICB0YWdzOiBbJyddLFxuICAgICAgICBlbmFibGVUaW1lc3RhbXA6IGVudlRpbWVTdGFtcCxcbiAgICAgICAgZW5hYmxlUGlkOiBlbnZQaWQsXG4gICAgICAgIGVuYWJsZUhvc3RuYW1lOiBlbnZIb3N0bmFtZSxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5wYXJhbXMgPSB7XG4gICAgICAgIHNjb3BlOiBfLnRyaW0ocGFyYW1zKSxcbiAgICAgICAgdGFnczogWycnXSxcbiAgICAgICAgZW5hYmxlVGltZXN0YW1wOiBlbnZUaW1lU3RhbXAsXG4gICAgICAgIGVuYWJsZVBpZDogZW52UGlkLFxuICAgICAgICBlbmFibGVIb3N0bmFtZTogZW52SG9zdG5hbWUsXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMucGFyYW1zID0gXy5tZXJnZSh0aGlzLnBhcmFtcywgcGFyYW1zLCB7XG4gICAgICAgIGVuYWJsZVRpbWVzdGFtcDogZW52VGltZVN0YW1wLFxuICAgICAgICBlbmFibGVQaWQ6IGVudlBpZCxcbiAgICAgICAgZW5hYmxlSG9zdG5hbWU6IGVudkhvc3RuYW1lLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnBhcmFtcy5zY29wZSA9IF8uaXNOaWwodGhpcy5wYXJhbXMuc2NvcGUpID8gZGVmYXVsdFNjb3BlIDogdGhpcy5wYXJhbXMuc2NvcGU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgZXJyb3IgbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhbmQgZXJyb3Igb2JqZWN0LlxuICAgKiBAcGFyYW0gbGV2ZWwgY2FuIGJlICdlcnJvcicsICd3YXJuJywgJ2luZm8nLCAndmVyYm9zZSdcbiAgICovXG4gIGxvZyhib2R5OiBhbnksIGxldmVsOiBMZXZlbCA9ICd2ZXJib3NlJykge1xuICAgIGxldCBwYXlsb2FkID0ge307XG4gICAgaWYgKHR5cGVvZiB0aGlzLnBhcmFtcy5zY29wZSAhPT0gJ3N0cmluZycpIHRoaXMucGFyYW1zLnNjb3BlID0gJ2RlZmF1bHQnO1xuICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHBheWxvYWQgPSBfLm1lcmdlKGJvZHksIHsgdGltZXN0YW1wOiBuZXcgRGF0ZSgpIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IG1lc3NhZ2U6IF8udHJpbShib2R5KSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcmFtcy5lbmFibGVUaW1lc3RhbXApIHtcbiAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgdGltZXN0YW1wOiBuZXcgRGF0ZSgpIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXJhbXMuZW5hYmxlUGlkKSB7XG4gICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IHBpZDogdGhpcy5waWQgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBhcmFtcy5lbmFibGVIb3N0bmFtZSkge1xuICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBob3N0bmFtZTogdGhpcy5ob3N0bmFtZSB9KTtcbiAgICB9XG5cbiAgICAvLyB0aGlzIGlzIHNvIHRoYXQgaXQgd2lsbCBiZSBlYXNpZXIgdG8gcXVlcnkgb24gdGhlIGJhY2tlbmQgaWUuIGxvZ2dseSBvciBlbGFzdGljIHNlYXJjaC5cbiAgICBjb25zdCB0YWdzID0gdGhpcy5wYXJhbXMudGFncyAhPSBudWxsICYmIF8uaXNBcnJheSh0aGlzLnBhcmFtcy50YWdzKSA/IHRoaXMucGFyYW1zLnRhZ3Muam9pbigpIDogJ3VudGFnZ2VkJztcbiAgICBjb25zdCBkID0gZGVidWcoYCR7dGhpcy5wYXJhbXMuc2NvcGV9OiR7dGFncyA9PT0gJycgPyAndW50YWdnZWQnIDogdGFnc306JHtsZXZlbH1gKTtcbiAgICBkKCclaicsIHBheWxvYWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgZXJyb3IgbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhbmQgZXJyb3Igb2JqZWN0LlxuICAgKi9cbiAgZXJyb3IoYm9keTogYW55KSB7XG4gICAgdGhpcy5sb2coYm9keSwgJ2Vycm9yJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCB3YXJuIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYSB3YXJuaW5nIG9iamVjdC4gcHJlZmVyYWJseSB3aXRoIGEgbWVzc2FnZSBmaWVsZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHkubWVzc2FnZTogYSBtZXNzYWdlIHRvIGJlIGluZ2VzdGVkIGJ5IGxvZyBzZXJ2ZXIuIG9wdGlvbmFsLlxuICAgKi9cbiAgd2Fybihib2R5OiBhbnkpIHtcbiAgICB0aGlzLmxvZyhib2R5LCAnd2FybicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgaW5mbyBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGEgd2FybmluZyBvYmplY3QuIHByZWZlcmFibHkgd2l0aCBhIG1lc3NhZ2UgZmllbGQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5Lm1lc3NhZ2U6IGEgbWVzc2FnZSB0byBiZSBpbmdlc3RlZCBieSBsb2cgc2VydmVyLiBvcHRpb25hbC5cbiAgICovXG4gIGluZm8oYm9keTogYW55KSB7XG4gICAgdGhpcy5sb2coYm9keSwgJ2luZm8nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IHZlcmJvc2UgbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhIHdhcm5pbmcgb2JqZWN0LiBwcmVmZXJhYmx5IHdpdGggYSBtZXNzYWdlIGZpZWxkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keS5tZXNzYWdlOiBhIG1lc3NhZ2UgdG8gYmUgaW5nZXN0ZWQgYnkgbG9nIHNlcnZlci4gb3B0aW9uYWwuXG4gICAqL1xuICB2ZXJib3NlKGJvZHk6IGFueSkge1xuICAgIHRoaXMubG9nKGJvZHksICd2ZXJib3NlJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbG9nZ2VyIHdpdGggYSBkaWZmZXJlbnQgc2V0IG9mIHRhZ3MgYnV0IHdpdGggdGhlIHNhbWUgc2NvcGUgYXMgdGhlIG9yaWdpbmFsLlxuICAgKiBAcGFyYW0gdGFnc1xuICAgKi9cbiAgdGFncyh0YWdzOiA/QXJyYXk8c3RyaW5nPik6IExvZ2dlciB7XG4gICAgY29uc3QgcGFyYW1zIDogSUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zID0ge1xuICAgICAgc2NvcGU6IHRoaXMucGFyYW1zLnNjb3BlLFxuICAgICAgdGFncyxcbiAgICB9O1xuICAgIHJldHVybiBuZXcgTG9nZ2VyKHBhcmFtcyk7XG4gIH1cblxuICBzdGF0aWMgbG9nKGJvZHk6IGFueSwgbGV2ZWw6IExldmVsID0gJ3ZlcmJvc2UnKSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci5sb2coYm9keSwgbGV2ZWwpO1xuICB9XG5cbiAgc3RhdGljIGVycm9yKGJvZHk6IGFueSkge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIuZXJyb3IoYm9keSk7XG4gIH1cblxuICBzdGF0aWMgd2Fybihib2R5OiBhbnkpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLndhcm4oYm9keSk7XG4gIH1cblxuICBzdGF0aWMgaW5mbyhib2R5OiBhbnkpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLmluZm8oYm9keSk7XG4gIH1cblxuICBzdGF0aWMgdmVyYm9zZShib2R5OiBhbnkpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLnZlcmJvc2UoYm9keSk7XG4gIH1cbn1cbiJdfQ==