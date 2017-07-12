'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var _debug = require('debug');var _debug2 = _interopRequireDefault(_debug);
var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _os = require('os');var _os2 = _interopRequireDefault(_os);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class Logger {




  constructor(params) {
    this.hostname = _os2.default.hostname();
    this.pid = process.pid;
    console.log(process.env.LOG_SCOPE);
    console.log(process.env.LOG_NOTIMESTAMP);
    console.log(process.env.LOG_NOPID);
    console.log(process.env.LOG_NOHOSTNAME);

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
    return _lodash2.default.isNull(param) ? false : _lodash2.default.toNumber(param) === 1;
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
    console.log('original tags');
    console.log(this.params.tags);
    console.log('new tags');
    console.log(tags);
    const params = {
      scope: this.params.scope,
      tags: _lodash2.default.compact(_lodash2.default.union(this.params.tags, tags)) };

    console.log('union tags');
    console.log(params.tags);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMb2dnZXIiLCJjb25zdHJ1Y3RvciIsInBhcmFtcyIsImhvc3RuYW1lIiwicGlkIiwicHJvY2VzcyIsImNvbnNvbGUiLCJsb2ciLCJlbnYiLCJMT0dfU0NPUEUiLCJMT0dfTk9USU1FU1RBTVAiLCJMT0dfTk9QSUQiLCJMT0dfTk9IT1NUTkFNRSIsImRlZmF1bHRTY29wZSIsImlzTnVsbCIsImVudlRpbWVTdGFtcCIsImlzRGlzYWJsZWQiLCJlbnZQaWQiLCJlbnZIb3N0bmFtZSIsImlzTmlsIiwic2NvcGUiLCJ0YWdzIiwiZW5hYmxlVGltZXN0YW1wIiwiZW5hYmxlUGlkIiwiZW5hYmxlSG9zdG5hbWUiLCJ0cmltIiwibWVyZ2UiLCJwYXJhbSIsInRvTnVtYmVyIiwiYm9keSIsImxldmVsIiwicGF5bG9hZCIsInRpbWVzdGFtcCIsIkRhdGUiLCJtZXNzYWdlIiwiaXNBcnJheSIsImpvaW4iLCJkIiwiZXJyb3IiLCJlcnIiLCJ0b1BsYWluT2JqZWN0Iiwic3RhY2siLCJ3YXJuIiwiaW5mbyIsInZlcmJvc2UiLCJjb21wYWN0IiwidW5pb24iLCJsb2dnZXIiXSwibWFwcGluZ3MiOiI7QUFDQSw4QjtBQUNBLGdDO0FBQ0Esd0I7O0FBRWUsTUFBTUEsTUFBTixDQUFnQzs7Ozs7QUFLN0NDLGNBQVlDLE1BQVosRUFBd0Q7QUFDdEQsU0FBS0MsUUFBTCxHQUFnQixhQUFHQSxRQUFILEVBQWhCO0FBQ0EsU0FBS0MsR0FBTCxHQUFXQyxRQUFRRCxHQUFuQjtBQUNBRSxZQUFRQyxHQUFSLENBQVlGLFFBQVFHLEdBQVIsQ0FBWUMsU0FBeEI7QUFDQUgsWUFBUUMsR0FBUixDQUFZRixRQUFRRyxHQUFSLENBQVlFLGVBQXhCO0FBQ0FKLFlBQVFDLEdBQVIsQ0FBWUYsUUFBUUcsR0FBUixDQUFZRyxTQUF4QjtBQUNBTCxZQUFRQyxHQUFSLENBQVlGLFFBQVFHLEdBQVIsQ0FBWUksY0FBeEI7O0FBRUEsVUFBTUMsZUFBeUIs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RmtDLEVBQTFDOztBQUlBZixZQUFRQyxHQUFSLENBQVksWUFBWjtBQUNBRCxZQUFRQyxHQUFSLENBQVlMLE9BQU9tQixJQUFuQjtBQUNBLFdBQU8sSUFBSXJCLE1BQUosQ0FBV0UsTUFBWCxDQUFQO0FBQ0Q7O0FBRUQsU0FBT0ssR0FBUCxDQUFXc0IsSUFBWCxFQUFzQkMsUUFBZSxTQUFyQyxFQUFnRDtBQUM5QyxVQUFNaUIsU0FBUyxJQUFJL0MsTUFBSixFQUFmO0FBQ0ErQyxXQUFPeEMsR0FBUCxDQUFXc0IsSUFBWCxFQUFpQkMsS0FBakI7QUFDRDs7QUFFRCxTQUFPUSxLQUFQLENBQWFULElBQWIsRUFBd0I7QUFDdEIsVUFBTWtCLFNBQVMsSUFBSS9DLE1BQUosRUFBZjtBQUNBK0MsV0FBT1QsS0FBUCxDQUFhVCxJQUFiO0FBQ0Q7O0FBRUQsU0FBT2EsSUFBUCxDQUFZYixJQUFaLEVBQXVCO0FBQ3JCLFVBQU1rQixTQUFTLElBQUkvQyxNQUFKLEVBQWY7QUFDQStDLFdBQU9MLElBQVAsQ0FBWWIsSUFBWjtBQUNEOztBQUVELFNBQU9jLElBQVAsQ0FBWWQsSUFBWixFQUF1QjtBQUNyQixVQUFNa0IsU0FBUyxJQUFJL0MsTUFBSixFQUFmO0FBQ0ErQyxXQUFPSixJQUFQLENBQVlkLElBQVo7QUFDRDs7QUFFRCxTQUFPZSxPQUFQLENBQWVmLElBQWYsRUFBMEI7QUFDeEIsVUFBTWtCLFNBQVMsSUFBSS9DLE1BQUosRUFBZjtBQUNBK0MsV0FBT0gsT0FBUCxDQUFlZixJQUFmO0FBQ0QsR0E3SzRDLEMsa0JBQTFCN0IsTSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBvcyBmcm9tICdvcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2dlciBpbXBsZW1lbnRzIElMb2dnZXIge1xuICBwYXJhbXM6IElMb2dnZXJDb25zdHJ1Y3RvclBhcmFtcztcbiAgcGlkOiBudW1iZXI7XG4gIGhvc3RuYW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiA/SUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5ob3N0bmFtZSA9IG9zLmhvc3RuYW1lKCk7XG4gICAgdGhpcy5waWQgPSBwcm9jZXNzLnBpZDtcbiAgICBjb25zb2xlLmxvZyhwcm9jZXNzLmVudi5MT0dfU0NPUEUpO1xuICAgIGNvbnNvbGUubG9nKHByb2Nlc3MuZW52LkxPR19OT1RJTUVTVEFNUCk7XG4gICAgY29uc29sZS5sb2cocHJvY2Vzcy5lbnYuTE9HX05PUElEKTtcbiAgICBjb25zb2xlLmxvZyhwcm9jZXNzLmVudi5MT0dfTk9IT1NUTkFNRSk7XG5cbiAgICBjb25zdCBkZWZhdWx0U2NvcGUgOiA/c3RyaW5nID0gXy5pc051bGwocHJvY2Vzcy5lbnYuTE9HX1NDT1BFKSA/ICdkZWZhdWx0JyA6IHByb2Nlc3MuZW52LkxPR19TQ09QRTtcbiAgICBjb25zdCBlbnZUaW1lU3RhbXAgOiA/Ym9vbGVhbiA9ICFMb2dnZXIuaXNEaXNhYmxlZChwcm9jZXNzLmVudi5MT0dfTk9USU1FU1RBTVApO1xuICAgIGNvbnN0IGVudlBpZCA6ID9ib29sZWFuID0gIUxvZ2dlci5pc0Rpc2FibGVkKHByb2Nlc3MuZW52LkxPR19OT1BJRCk7XG4gICAgY29uc3QgZW52SG9zdG5hbWUgOiA/Ym9vbGVhbiA9ICFMb2dnZXIuaXNEaXNhYmxlZChwcm9jZXNzLmVudi5MT0dfTk9IT1NUTkFNRSk7XG5cbiAgICBpZiAoXy5pc05pbChwYXJhbXMpKSB7XG4gICAgICB0aGlzLnBhcmFtcyA9IHtcbiAgICAgICAgc2NvcGU6IGRlZmF1bHRTY29wZSxcbiAgICAgICAgdGFnczogWycnXSxcbiAgICAgICAgZW5hYmxlVGltZXN0YW1wOiBlbnZUaW1lU3RhbXAsXG4gICAgICAgIGVuYWJsZVBpZDogZW52UGlkLFxuICAgICAgICBlbmFibGVIb3N0bmFtZTogZW52SG9zdG5hbWUsXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMucGFyYW1zID0ge1xuICAgICAgICBzY29wZTogXy50cmltKHBhcmFtcyksXG4gICAgICAgIHRhZ3M6IFsnJ10sXG4gICAgICAgIGVuYWJsZVRpbWVzdGFtcDogZW52VGltZVN0YW1wLFxuICAgICAgICBlbmFibGVQaWQ6IGVudlBpZCxcbiAgICAgICAgZW5hYmxlSG9zdG5hbWU6IGVudkhvc3RuYW1lLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLnBhcmFtcyA9IF8ubWVyZ2UodGhpcy5wYXJhbXMsIHBhcmFtcywge1xuICAgICAgICBlbmFibGVUaW1lc3RhbXA6IGVudlRpbWVTdGFtcCxcbiAgICAgICAgZW5hYmxlUGlkOiBlbnZQaWQsXG4gICAgICAgIGVuYWJsZUhvc3RuYW1lOiBlbnZIb3N0bmFtZSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wYXJhbXMuc2NvcGUgPSBfLmlzTmlsKHRoaXMucGFyYW1zLnNjb3BlKSA/IGRlZmF1bHRTY29wZSA6IHRoaXMucGFyYW1zLnNjb3BlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIHZhbHVlIGlzIGV4cGxpY2l0eSBlcXVhbCB0byAnMScuXG4gICAqIEBwYXJhbSBwYXJhbVxuICAgKiBAcGFyYW0gZGVmYXVsVmFsdWVcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgaXNEaXNhYmxlZChwYXJhbTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIF8uaXNOdWxsKHBhcmFtKSA/IGZhbHNlIDogKF8udG9OdW1iZXIocGFyYW0pID09PSAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IGVycm9yIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYW5kIGVycm9yIG9iamVjdC5cbiAgICogQHBhcmFtIGxldmVsIGNhbiBiZSAnZXJyb3InLCAnd2FybicsICdpbmZvJywgJ3ZlcmJvc2UnXG4gICAqL1xuICBsb2coYm9keTogYW55LCBsZXZlbDogTGV2ZWwgPSAndmVyYm9zZScpOiB2b2lkIHtcbiAgICBsZXQgcGF5bG9hZCA9IHt9O1xuICAgIGlmICh0eXBlb2YgdGhpcy5wYXJhbXMuc2NvcGUgIT09ICdzdHJpbmcnKSB0aGlzLnBhcmFtcy5zY29wZSA9ICdkZWZhdWx0JztcbiAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdvYmplY3QnKSB7XG4gICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCBib2R5KTtcbiAgICAgIGlmICh0aGlzLnBhcmFtcy5lbmFibGVUaW1lc3RhbXApIHtcbiAgICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyB0aW1lc3RhbXA6IG5ldyBEYXRlKCkgfSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wYXJhbXMuZW5hYmxlUGlkKSB7XG4gICAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgcGlkOiB0aGlzLnBpZCB9KTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBhcmFtcy5lbmFibGVIb3N0bmFtZSkge1xuICAgICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IGhvc3RuYW1lOiB0aGlzLmhvc3RuYW1lIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IG1lc3NhZ2U6IF8udHJpbShib2R5KSB9KTtcbiAgICAgIGlmICh0aGlzLnBhcmFtcy5lbmFibGVUaW1lc3RhbXApIHtcbiAgICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyB0aW1lc3RhbXA6IG5ldyBEYXRlKCkgfSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wYXJhbXMuZW5hYmxlUGlkKSB7XG4gICAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgcGlkOiB0aGlzLnBpZCB9KTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBhcmFtcy5lbmFibGVIb3N0bmFtZSkge1xuICAgICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IGhvc3RuYW1lOiB0aGlzLmhvc3RuYW1lIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdGhpcyBpcyBzbyB0aGF0IGl0IHdpbGwgYmUgZWFzaWVyIHRvIHF1ZXJ5IG9uIHRoZSBiYWNrZW5kIGllLiBsb2dnbHkgb3IgZWxhc3RpYyBzZWFyY2guXG4gICAgY29uc3QgdGFncyA9IHRoaXMucGFyYW1zLnRhZ3MgIT0gbnVsbCAmJiBfLmlzQXJyYXkodGhpcy5wYXJhbXMudGFncykgPyB0aGlzLnBhcmFtcy50YWdzLmpvaW4oKSA6ICd1bnRhZ2dlZCc7XG4gICAgY29uc3QgZCA9IGRlYnVnKGAke3RoaXMucGFyYW1zLnNjb3BlfToke3RhZ3MgPT09ICcnID8gJ3VudGFnZ2VkJyA6IHRhZ3N9OiR7bGV2ZWx9YCk7XG4gICAgZCgnJWonLCBwYXlsb2FkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IGVycm9yIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYW4gZXJyb3Igb2JqZWN0LlxuICAgKi9cbiAgZXJyb3IoZXJyOiBhbnkpIHtcbiAgICBsZXQgcGF5bG9hZCA9ICh0eXBlb2YgZXJyID09PSAnc3RyaW5nJykgPyB7IG1lc3NhZ2U6IGVyciB9IDogXy50b1BsYWluT2JqZWN0KGVycik7XG4gICAgaWYgKCFfLmlzTmlsKGVyci5tZXNzYWdlKSkgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBtZXNzYWdlOiBlcnIubWVzc2FnZSB9KTtcbiAgICBpZiAoIV8uaXNOaWwoZXJyLnN0YWNrKSkgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBtZXNzYWdlOiBlcnIuc3RhY2sgfSk7XG4gICAgdGhpcy5sb2cocGF5bG9hZCwgJ2Vycm9yJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCB3YXJuIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYSB3YXJuaW5nIG9iamVjdC4gcHJlZmVyYWJseSB3aXRoIGEgbWVzc2FnZSBmaWVsZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHkubWVzc2FnZTogYSBtZXNzYWdlIHRvIGJlIGluZ2VzdGVkIGJ5IGxvZyBzZXJ2ZXIuIG9wdGlvbmFsLlxuICAgKi9cbiAgd2Fybihib2R5OiBhbnkpIHtcbiAgICB0aGlzLmxvZyhib2R5LCAnd2FybicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgaW5mbyBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGEgd2FybmluZyBvYmplY3QuIHByZWZlcmFibHkgd2l0aCBhIG1lc3NhZ2UgZmllbGQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5Lm1lc3NhZ2U6IGEgbWVzc2FnZSB0byBiZSBpbmdlc3RlZCBieSBsb2cgc2VydmVyLiBvcHRpb25hbC5cbiAgICovXG4gIGluZm8oYm9keTogYW55KSB7XG4gICAgdGhpcy5sb2coYm9keSwgJ2luZm8nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IHZlcmJvc2UgbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhIHdhcm5pbmcgb2JqZWN0LiBwcmVmZXJhYmx5IHdpdGggYSBtZXNzYWdlIGZpZWxkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keS5tZXNzYWdlOiBhIG1lc3NhZ2UgdG8gYmUgaW5nZXN0ZWQgYnkgbG9nIHNlcnZlci4gb3B0aW9uYWwuXG4gICAqL1xuICB2ZXJib3NlKGJvZHk6IGFueSkge1xuICAgIHRoaXMubG9nKGJvZHksICd2ZXJib3NlJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbG9nZ2VyIHdpdGggYSBkaWZmZXJlbnQgc2V0IG9mIHRhZ3MgYnV0IHdpdGggdGhlIHNhbWUgc2NvcGUgYXMgdGhlIG9yaWdpbmFsLlxuICAgKiBAcGFyYW0gdGFnc1xuICAgKi9cbiAgdGFncyh0YWdzOiA/QXJyYXk8c3RyaW5nPik6IExvZ2dlciB7XG4gICAgY29uc29sZS5sb2coJ29yaWdpbmFsIHRhZ3MnKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnBhcmFtcy50YWdzKTtcbiAgICBjb25zb2xlLmxvZygnbmV3IHRhZ3MnKTtcbiAgICBjb25zb2xlLmxvZyh0YWdzKTtcbiAgICBjb25zdCBwYXJhbXMgOiBJTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXMgPSB7XG4gICAgICBzY29wZTogdGhpcy5wYXJhbXMuc2NvcGUsXG4gICAgICB0YWdzOiBfLmNvbXBhY3QoXy51bmlvbih0aGlzLnBhcmFtcy50YWdzLCB0YWdzKSksXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZygndW5pb24gdGFncycpO1xuICAgIGNvbnNvbGUubG9nKHBhcmFtcy50YWdzKTtcbiAgICByZXR1cm4gbmV3IExvZ2dlcihwYXJhbXMpO1xuICB9XG5cbiAgc3RhdGljIGxvZyhib2R5OiBhbnksIGxldmVsOiBMZXZlbCA9ICd2ZXJib3NlJykge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIubG9nKGJvZHksIGxldmVsKTtcbiAgfVxuXG4gIHN0YXRpYyBlcnJvcihib2R5OiBhbnkpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLmVycm9yKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIHdhcm4oYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci53YXJuKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIGluZm8oYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci5pbmZvKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIHZlcmJvc2UoYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci52ZXJib3NlKGJvZHkpO1xuICB9XG59XG4iXX0=