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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMb2dnZXIiLCJjb25zdHJ1Y3RvciIsInBhcmFtcyIsImhvc3RuYW1lIiwicGlkIiwicHJvY2VzcyIsImRlZmF1bHRTY29wZSIsImlzTnVsbCIsImVudiIsIkxPR19TQ09QRSIsImVudlRpbWVTdGFtcCIsIkxPR19OT1RJTUVTVEFNUCIsImVudlBpZCIsIkxPR19OT1BJRCIsImVudkhvc3RuYW1lIiwiTE9HX05PSE9TVE5BTUUiLCJpc05pbCIsInNjb3BlIiwidGFncyIsImVuYWJsZVRpbWVzdGFtcCIsImVuYWJsZVBpZCIsImVuYWJsZUhvc3RuYW1lIiwidHJpbSIsIm1lcmdlIiwibG9nIiwiYm9keSIsImxldmVsIiwicGF5bG9hZCIsInRpbWVzdGFtcCIsIkRhdGUiLCJtZXNzYWdlIiwiaXNBcnJheSIsImpvaW4iLCJkIiwiZXJyb3IiLCJlcnIiLCJ0b1BsYWluT2JqZWN0Iiwic3RhY2siLCJ3YXJuIiwiaW5mbyIsInZlcmJvc2UiLCJsb2dnZXIiXSwibWFwcGluZ3MiOiI7QUFDQSw4QjtBQUNBLGdDO0FBQ0Esd0I7O0FBRWUsTUFBTUEsTUFBTixDQUFnQzs7Ozs7QUFLN0NDLGNBQVlDLE1BQVosRUFBd0Q7QUFDdEQsU0FBS0MsUUFBTCxHQUFnQixhQUFHQSxRQUFILEVBQWhCO0FBQ0EsU0FBS0MsR0FBTCxHQUFXQyxRQUFRRCxHQUFuQjtBQUNBLFVBQU1FLGVBQXlCLGlCQUFFQyxNQUFGLENBQVNGLFFBQVFHLEdBQVIsQ0FBWUMsU0FBckIsSUFBa0MsU0FBbEMsR0FBOENKLFFBQVFHLEdBQVIsQ0FBWUMsU0FBekY7QUFDQSxVQUFNQyxlQUEwQixDQUFDTCxRQUFRRyxHQUFSLENBQVlHLGVBQTdDO0FBQ0EsVUFBTUMsU0FBb0IsQ0FBQ1AsUUFBUUcsR0FBUixDQUFZSyxTQUF2QztBQUNBLFVBQU1DLGNBQXlCLENBQUNULFFBQVFHLEdBQVIsQ0FBWU8sY0FBNUM7O0FBRUEsUUFBSSxpQkFBRUMsS0FBRixD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eUMsV0FBT2pCLEdBQVAsQ0FBV0MsSUFBWCxFQUFpQkMsS0FBakI7QUFDRDs7QUFFRCxTQUFPUSxLQUFQLENBQWFULElBQWIsRUFBd0I7QUFDdEIsVUFBTWdCLFNBQVMsSUFBSXpDLE1BQUosRUFBZjtBQUNBeUMsV0FBT1AsS0FBUCxDQUFhVCxJQUFiO0FBQ0Q7O0FBRUQsU0FBT2EsSUFBUCxDQUFZYixJQUFaLEVBQXVCO0FBQ3JCLFVBQU1nQixTQUFTLElBQUl6QyxNQUFKLEVBQWY7QUFDQXlDLFdBQU9ILElBQVAsQ0FBWWIsSUFBWjtBQUNEOztBQUVELFNBQU9jLElBQVAsQ0FBWWQsSUFBWixFQUF1QjtBQUNyQixVQUFNZ0IsU0FBUyxJQUFJekMsTUFBSixFQUFmO0FBQ0F5QyxXQUFPRixJQUFQLENBQVlkLElBQVo7QUFDRDs7QUFFRCxTQUFPZSxPQUFQLENBQWVmLElBQWYsRUFBMEI7QUFDeEIsVUFBTWdCLFNBQVMsSUFBSXpDLE1BQUosRUFBZjtBQUNBeUMsV0FBT0QsT0FBUCxDQUFlZixJQUFmO0FBQ0QsR0FoSjRDLEMsa0JBQTFCekIsTSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBvcyBmcm9tICdvcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2dlciBpbXBsZW1lbnRzIElMb2dnZXIge1xuICBwYXJhbXM6IElMb2dnZXJDb25zdHJ1Y3RvclBhcmFtcztcbiAgcGlkOiBudW1iZXI7XG4gIGhvc3RuYW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiA/SUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5ob3N0bmFtZSA9IG9zLmhvc3RuYW1lKCk7XG4gICAgdGhpcy5waWQgPSBwcm9jZXNzLnBpZDtcbiAgICBjb25zdCBkZWZhdWx0U2NvcGUgOiA/c3RyaW5nID0gXy5pc051bGwocHJvY2Vzcy5lbnYuTE9HX1NDT1BFKSA/ICdkZWZhdWx0JyA6IHByb2Nlc3MuZW52LkxPR19TQ09QRTtcbiAgICBjb25zdCBlbnZUaW1lU3RhbXAgOiA/Ym9vbGVhbiA9ICFwcm9jZXNzLmVudi5MT0dfTk9USU1FU1RBTVA7XG4gICAgY29uc3QgZW52UGlkIDogP2Jvb2xlYW4gPSAhcHJvY2Vzcy5lbnYuTE9HX05PUElEO1xuICAgIGNvbnN0IGVudkhvc3RuYW1lIDogP2Jvb2xlYW4gPSAhcHJvY2Vzcy5lbnYuTE9HX05PSE9TVE5BTUU7XG5cbiAgICBpZiAoXy5pc05pbChwYXJhbXMpKSB7XG4gICAgICB0aGlzLnBhcmFtcyA9IHtcbiAgICAgICAgc2NvcGU6IGRlZmF1bHRTY29wZSxcbiAgICAgICAgdGFnczogWycnXSxcbiAgICAgICAgZW5hYmxlVGltZXN0YW1wOiBlbnZUaW1lU3RhbXAsXG4gICAgICAgIGVuYWJsZVBpZDogZW52UGlkLFxuICAgICAgICBlbmFibGVIb3N0bmFtZTogZW52SG9zdG5hbWUsXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMucGFyYW1zID0ge1xuICAgICAgICBzY29wZTogXy50cmltKHBhcmFtcyksXG4gICAgICAgIHRhZ3M6IFsnJ10sXG4gICAgICAgIGVuYWJsZVRpbWVzdGFtcDogZW52VGltZVN0YW1wLFxuICAgICAgICBlbmFibGVQaWQ6IGVudlBpZCxcbiAgICAgICAgZW5hYmxlSG9zdG5hbWU6IGVudkhvc3RuYW1lLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLnBhcmFtcyA9IF8ubWVyZ2UodGhpcy5wYXJhbXMsIHBhcmFtcywge1xuICAgICAgICBlbmFibGVUaW1lc3RhbXA6IGVudlRpbWVTdGFtcCxcbiAgICAgICAgZW5hYmxlUGlkOiBlbnZQaWQsXG4gICAgICAgIGVuYWJsZUhvc3RuYW1lOiBlbnZIb3N0bmFtZSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wYXJhbXMuc2NvcGUgPSBfLmlzTmlsKHRoaXMucGFyYW1zLnNjb3BlKSA/IGRlZmF1bHRTY29wZSA6IHRoaXMucGFyYW1zLnNjb3BlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IGVycm9yIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYW5kIGVycm9yIG9iamVjdC5cbiAgICogQHBhcmFtIGxldmVsIGNhbiBiZSAnZXJyb3InLCAnd2FybicsICdpbmZvJywgJ3ZlcmJvc2UnXG4gICAqL1xuICBsb2coYm9keTogYW55LCBsZXZlbDogTGV2ZWwgPSAndmVyYm9zZScpIHtcbiAgICBsZXQgcGF5bG9hZCA9IHt9O1xuICAgIGlmICh0eXBlb2YgdGhpcy5wYXJhbXMuc2NvcGUgIT09ICdzdHJpbmcnKSB0aGlzLnBhcmFtcy5zY29wZSA9ICdkZWZhdWx0JztcbiAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdvYmplY3QnKSB7XG4gICAgICBwYXlsb2FkID0gXy5tZXJnZShib2R5LCB7IHRpbWVzdGFtcDogbmV3IERhdGUoKSB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBtZXNzYWdlOiBfLnRyaW0oYm9keSkgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuZW5hYmxlVGltZXN0YW1wKSB7XG4gICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IHRpbWVzdGFtcDogbmV3IERhdGUoKSB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGFyYW1zLmVuYWJsZVBpZCkge1xuICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBwaWQ6IHRoaXMucGlkIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXJhbXMuZW5hYmxlSG9zdG5hbWUpIHtcbiAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgaG9zdG5hbWU6IHRoaXMuaG9zdG5hbWUgfSk7XG4gICAgfVxuXG4gICAgLy8gdGhpcyBpcyBzbyB0aGF0IGl0IHdpbGwgYmUgZWFzaWVyIHRvIHF1ZXJ5IG9uIHRoZSBiYWNrZW5kIGllLiBsb2dnbHkgb3IgZWxhc3RpYyBzZWFyY2guXG4gICAgY29uc3QgdGFncyA9IHRoaXMucGFyYW1zLnRhZ3MgIT0gbnVsbCAmJiBfLmlzQXJyYXkodGhpcy5wYXJhbXMudGFncykgPyB0aGlzLnBhcmFtcy50YWdzLmpvaW4oKSA6ICd1bnRhZ2dlZCc7XG4gICAgY29uc3QgZCA9IGRlYnVnKGAke3RoaXMucGFyYW1zLnNjb3BlfToke3RhZ3MgPT09ICcnID8gJ3VudGFnZ2VkJyA6IHRhZ3N9OiR7bGV2ZWx9YCk7XG4gICAgZCgnJWonLCBwYXlsb2FkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IGVycm9yIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYW4gZXJyb3Igb2JqZWN0LlxuICAgKi9cbiAgZXJyb3IoZXJyOiBhbnkpIHtcbiAgICBsZXQgcGF5bG9hZCA9ICh0eXBlb2YgZXJyID09PSAnc3RyaW5nJykgPyB7IG1lc3NhZ2U6IGVyciB9IDogXy50b1BsYWluT2JqZWN0KGVycik7XG4gICAgaWYgKCFfLmlzTmlsKGVyci5tZXNzYWdlKSkgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBtZXNzYWdlOiBlcnIubWVzc2FnZSB9KTtcbiAgICBpZiAoIV8uaXNOaWwoZXJyLnN0YWNrKSkgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBtZXNzYWdlOiBlcnIuc3RhY2sgfSk7XG4gICAgdGhpcy5sb2cocGF5bG9hZCwgJ2Vycm9yJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCB3YXJuIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYSB3YXJuaW5nIG9iamVjdC4gcHJlZmVyYWJseSB3aXRoIGEgbWVzc2FnZSBmaWVsZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHkubWVzc2FnZTogYSBtZXNzYWdlIHRvIGJlIGluZ2VzdGVkIGJ5IGxvZyBzZXJ2ZXIuIG9wdGlvbmFsLlxuICAgKi9cbiAgd2Fybihib2R5OiBhbnkpIHtcbiAgICB0aGlzLmxvZyhib2R5LCAnd2FybicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgaW5mbyBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGEgd2FybmluZyBvYmplY3QuIHByZWZlcmFibHkgd2l0aCBhIG1lc3NhZ2UgZmllbGQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5Lm1lc3NhZ2U6IGEgbWVzc2FnZSB0byBiZSBpbmdlc3RlZCBieSBsb2cgc2VydmVyLiBvcHRpb25hbC5cbiAgICovXG4gIGluZm8oYm9keTogYW55KSB7XG4gICAgdGhpcy5sb2coYm9keSwgJ2luZm8nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IHZlcmJvc2UgbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhIHdhcm5pbmcgb2JqZWN0LiBwcmVmZXJhYmx5IHdpdGggYSBtZXNzYWdlIGZpZWxkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keS5tZXNzYWdlOiBhIG1lc3NhZ2UgdG8gYmUgaW5nZXN0ZWQgYnkgbG9nIHNlcnZlci4gb3B0aW9uYWwuXG4gICAqL1xuICB2ZXJib3NlKGJvZHk6IGFueSkge1xuICAgIHRoaXMubG9nKGJvZHksICd2ZXJib3NlJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbG9nZ2VyIHdpdGggYSBkaWZmZXJlbnQgc2V0IG9mIHRhZ3MgYnV0IHdpdGggdGhlIHNhbWUgc2NvcGUgYXMgdGhlIG9yaWdpbmFsLlxuICAgKiBAcGFyYW0gdGFnc1xuICAgKi9cbiAgdGFncyh0YWdzOiA/QXJyYXk8c3RyaW5nPik6IExvZ2dlciB7XG4gICAgY29uc3QgcGFyYW1zIDogSUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zID0ge1xuICAgICAgc2NvcGU6IHRoaXMucGFyYW1zLnNjb3BlLFxuICAgICAgdGFncyxcbiAgICB9O1xuICAgIHJldHVybiBuZXcgTG9nZ2VyKHBhcmFtcyk7XG4gIH1cblxuICBzdGF0aWMgbG9nKGJvZHk6IGFueSwgbGV2ZWw6IExldmVsID0gJ3ZlcmJvc2UnKSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci5sb2coYm9keSwgbGV2ZWwpO1xuICB9XG5cbiAgc3RhdGljIGVycm9yKGJvZHk6IGFueSkge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIuZXJyb3IoYm9keSk7XG4gIH1cblxuICBzdGF0aWMgd2Fybihib2R5OiBhbnkpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLndhcm4oYm9keSk7XG4gIH1cblxuICBzdGF0aWMgaW5mbyhib2R5OiBhbnkpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLmluZm8oYm9keSk7XG4gIH1cblxuICBzdGF0aWMgdmVyYm9zZShib2R5OiBhbnkpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLnZlcmJvc2UoYm9keSk7XG4gIH1cbn1cbiJdfQ==