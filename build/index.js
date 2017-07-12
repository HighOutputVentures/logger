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
      tags: !_lodash2.default.isNil(this.params.scope) && _lodash2.default.isArray(this.params.scope) ?
      _lodash2.default.compact(_lodash2.default.union(this.params.scope, tags)) : tags };

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMb2dnZXIiLCJjb25zdHJ1Y3RvciIsInBhcmFtcyIsImhvc3RuYW1lIiwicGlkIiwicHJvY2VzcyIsImRlZmF1bHRTY29wZSIsImlzTnVsbCIsImVudiIsIkxPR19TQ09QRSIsImVudlRpbWVTdGFtcCIsIkxPR19OT1RJTUVTVEFNUCIsImVudlBpZCIsIkxPR19OT1BJRCIsImVudkhvc3RuYW1lIiwiTE9HX05PSE9TVE5BTUUiLCJpc05pbCIsInNjb3BlIiwidGFncyIsImVuYWJsZVRpbWVzdGFtcCIsImVuYWJsZVBpZCIsImVuYWJsZUhvc3RuYW1lIiwidHJpbSIsIm1lcmdlIiwibG9nIiwiYm9keSIsImxldmVsIiwicGF5bG9hZCIsInRpbWVzdGFtcCIsIkRhdGUiLCJtZXNzYWdlIiwiaXNBcnJheSIsImpvaW4iLCJkIiwiZXJyb3IiLCJlcnIiLCJ0b1BsYWluT2JqZWN0Iiwic3RhY2siLCJ3YXJuIiwiaW5mbyIsInZlcmJvc2UiLCJjb21wYWN0IiwidW5pb24iLCJsb2dnZXIiXSwibWFwcGluZ3MiOiI7QUFDQSw4QjtBQUNBLGdDO0FBQ0Esd0I7O0FBRWUsTUFBTUEsTUFBTixDQUFnQzs7Ozs7QUFLN0NDLGNBQVlDLE1BQVosRUFBd0Q7QUFDdEQsU0FBS0MsUUFBTCxHQUFnQixhQUFHQSxRQUFILEVBQWhCO0FBQ0EsU0FBS0MsR0FBTCxHQUFXQyxRQUFRRCxHQUFuQjtBQUNBLFVBQU1FLGVBQXlCLGlCQUFFQyxNQUFGLENBQVNGLFFBQVFHLEdBQVIsQ0FBWUMsU0FBckIsSUFBa0MsU0FBbEMsR0FBOENKLFFBQVFHLEdBQVIsQ0FBWUMsU0FBekY7QUFDQSxVQUFNQyxlQUEwQixDQUFDTCxRQUFRRyxHQUFSLENBQVlHLGVBQTdDO0FBQ0EsVUFBTUMsU0FBb0IsQ0FBQ1AsUUFBUUcsR0FBUixDQUFZSyxTQUF2QztBQUNBLFVBQU1DLGNBQXlCLENBQUNULFFBQVFHLEdBQVIsQ0FBWU8sY0FBNUM7O0FBRUEs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VSxpQkFBRUMsS0FBRixDQUFRLEtBQUt4QyxNQUFMLENBQVllLEtBQXBCLEVBQTJCQyxJQUEzQixDQUFWLENBREUsR0FDNENBLElBSFYsRUFBMUM7O0FBS0EsV0FBTyxJQUFJbEIsTUFBSixDQUFXRSxNQUFYLENBQVA7QUFDRDs7QUFFRCxTQUFPc0IsR0FBUCxDQUFXQyxJQUFYLEVBQXNCQyxRQUFlLFNBQXJDLEVBQWdEO0FBQzlDLFVBQU1pQixTQUFTLElBQUkzQyxNQUFKLEVBQWY7QUFDQTJDLFdBQU9uQixHQUFQLENBQVdDLElBQVgsRUFBaUJDLEtBQWpCO0FBQ0Q7O0FBRUQsU0FBT1EsS0FBUCxDQUFhVCxJQUFiLEVBQXdCO0FBQ3RCLFVBQU1rQixTQUFTLElBQUkzQyxNQUFKLEVBQWY7QUFDQTJDLFdBQU9ULEtBQVAsQ0FBYVQsSUFBYjtBQUNEOztBQUVELFNBQU9hLElBQVAsQ0FBWWIsSUFBWixFQUF1QjtBQUNyQixVQUFNa0IsU0FBUyxJQUFJM0MsTUFBSixFQUFmO0FBQ0EyQyxXQUFPTCxJQUFQLENBQVliLElBQVo7QUFDRDs7QUFFRCxTQUFPYyxJQUFQLENBQVlkLElBQVosRUFBdUI7QUFDckIsVUFBTWtCLFNBQVMsSUFBSTNDLE1BQUosRUFBZjtBQUNBMkMsV0FBT0osSUFBUCxDQUFZZCxJQUFaO0FBQ0Q7O0FBRUQsU0FBT2UsT0FBUCxDQUFlZixJQUFmLEVBQTBCO0FBQ3hCLFVBQU1rQixTQUFTLElBQUkzQyxNQUFKLEVBQWY7QUFDQTJDLFdBQU9ILE9BQVAsQ0FBZWYsSUFBZjtBQUNELEdBako0QyxDLGtCQUExQnpCLE0iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgb3MgZnJvbSAnb3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dnZXIgaW1wbGVtZW50cyBJTG9nZ2VyIHtcbiAgcGFyYW1zOiBJTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXM7XG4gIHBpZDogbnVtYmVyO1xuICBob3N0bmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogP0lMb2dnZXJDb25zdHJ1Y3RvclBhcmFtcyB8IHN0cmluZykge1xuICAgIHRoaXMuaG9zdG5hbWUgPSBvcy5ob3N0bmFtZSgpO1xuICAgIHRoaXMucGlkID0gcHJvY2Vzcy5waWQ7XG4gICAgY29uc3QgZGVmYXVsdFNjb3BlIDogP3N0cmluZyA9IF8uaXNOdWxsKHByb2Nlc3MuZW52LkxPR19TQ09QRSkgPyAnZGVmYXVsdCcgOiBwcm9jZXNzLmVudi5MT0dfU0NPUEU7XG4gICAgY29uc3QgZW52VGltZVN0YW1wIDogP2Jvb2xlYW4gPSAhcHJvY2Vzcy5lbnYuTE9HX05PVElNRVNUQU1QO1xuICAgIGNvbnN0IGVudlBpZCA6ID9ib29sZWFuID0gIXByb2Nlc3MuZW52LkxPR19OT1BJRDtcbiAgICBjb25zdCBlbnZIb3N0bmFtZSA6ID9ib29sZWFuID0gIXByb2Nlc3MuZW52LkxPR19OT0hPU1ROQU1FO1xuXG4gICAgaWYgKF8uaXNOaWwocGFyYW1zKSkge1xuICAgICAgdGhpcy5wYXJhbXMgPSB7XG4gICAgICAgIHNjb3BlOiBkZWZhdWx0U2NvcGUsXG4gICAgICAgIHRhZ3M6IFsnJ10sXG4gICAgICAgIGVuYWJsZVRpbWVzdGFtcDogZW52VGltZVN0YW1wLFxuICAgICAgICBlbmFibGVQaWQ6IGVudlBpZCxcbiAgICAgICAgZW5hYmxlSG9zdG5hbWU6IGVudkhvc3RuYW1lLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnBhcmFtcyA9IHtcbiAgICAgICAgc2NvcGU6IF8udHJpbShwYXJhbXMpLFxuICAgICAgICB0YWdzOiBbJyddLFxuICAgICAgICBlbmFibGVUaW1lc3RhbXA6IGVudlRpbWVTdGFtcCxcbiAgICAgICAgZW5hYmxlUGlkOiBlbnZQaWQsXG4gICAgICAgIGVuYWJsZUhvc3RuYW1lOiBlbnZIb3N0bmFtZSxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5wYXJhbXMgPSBfLm1lcmdlKHRoaXMucGFyYW1zLCBwYXJhbXMsIHtcbiAgICAgICAgZW5hYmxlVGltZXN0YW1wOiBlbnZUaW1lU3RhbXAsXG4gICAgICAgIGVuYWJsZVBpZDogZW52UGlkLFxuICAgICAgICBlbmFibGVIb3N0bmFtZTogZW52SG9zdG5hbWUsXG4gICAgICB9KTtcbiAgICAgIHRoaXMucGFyYW1zLnNjb3BlID0gXy5pc05pbCh0aGlzLnBhcmFtcy5zY29wZSkgPyBkZWZhdWx0U2NvcGUgOiB0aGlzLnBhcmFtcy5zY29wZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCBlcnJvciBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGFuZCBlcnJvciBvYmplY3QuXG4gICAqIEBwYXJhbSBsZXZlbCBjYW4gYmUgJ2Vycm9yJywgJ3dhcm4nLCAnaW5mbycsICd2ZXJib3NlJ1xuICAgKi9cbiAgbG9nKGJvZHk6IGFueSwgbGV2ZWw6IExldmVsID0gJ3ZlcmJvc2UnKSB7XG4gICAgbGV0IHBheWxvYWQgPSB7fTtcbiAgICBpZiAodHlwZW9mIHRoaXMucGFyYW1zLnNjb3BlICE9PSAnc3RyaW5nJykgdGhpcy5wYXJhbXMuc2NvcGUgPSAnZGVmYXVsdCc7XG4gICAgaWYgKHR5cGVvZiBib2R5ID09PSAnb2JqZWN0Jykge1xuICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UoYm9keSwgeyB0aW1lc3RhbXA6IG5ldyBEYXRlKCkgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgbWVzc2FnZTogXy50cmltKGJvZHkpIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGFyYW1zLmVuYWJsZVRpbWVzdGFtcCkge1xuICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyB0aW1lc3RhbXA6IG5ldyBEYXRlKCkgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBhcmFtcy5lbmFibGVQaWQpIHtcbiAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgcGlkOiB0aGlzLnBpZCB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGFyYW1zLmVuYWJsZUhvc3RuYW1lKSB7XG4gICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IGhvc3RuYW1lOiB0aGlzLmhvc3RuYW1lIH0pO1xuICAgIH1cblxuICAgIC8vIHRoaXMgaXMgc28gdGhhdCBpdCB3aWxsIGJlIGVhc2llciB0byBxdWVyeSBvbiB0aGUgYmFja2VuZCBpZS4gbG9nZ2x5IG9yIGVsYXN0aWMgc2VhcmNoLlxuICAgIGNvbnN0IHRhZ3MgPSB0aGlzLnBhcmFtcy50YWdzICE9IG51bGwgJiYgXy5pc0FycmF5KHRoaXMucGFyYW1zLnRhZ3MpID8gdGhpcy5wYXJhbXMudGFncy5qb2luKCkgOiAndW50YWdnZWQnO1xuICAgIGNvbnN0IGQgPSBkZWJ1ZyhgJHt0aGlzLnBhcmFtcy5zY29wZX06JHt0YWdzID09PSAnJyA/ICd1bnRhZ2dlZCcgOiB0YWdzfToke2xldmVsfWApO1xuICAgIGQoJyVqJywgcGF5bG9hZCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCBlcnJvciBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGFuIGVycm9yIG9iamVjdC5cbiAgICovXG4gIGVycm9yKGVycjogYW55KSB7XG4gICAgbGV0IHBheWxvYWQgPSAodHlwZW9mIGVyciA9PT0gJ3N0cmluZycpID8geyBtZXNzYWdlOiBlcnIgfSA6IF8udG9QbGFpbk9iamVjdChlcnIpO1xuICAgIGlmICghXy5pc05pbChlcnIubWVzc2FnZSkpIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4gICAgaWYgKCFfLmlzTmlsKGVyci5zdGFjaykpIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgbWVzc2FnZTogZXJyLnN0YWNrIH0pO1xuICAgIHRoaXMubG9nKHBheWxvYWQsICdlcnJvcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgd2FybiBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGEgd2FybmluZyBvYmplY3QuIHByZWZlcmFibHkgd2l0aCBhIG1lc3NhZ2UgZmllbGQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5Lm1lc3NhZ2U6IGEgbWVzc2FnZSB0byBiZSBpbmdlc3RlZCBieSBsb2cgc2VydmVyLiBvcHRpb25hbC5cbiAgICovXG4gIHdhcm4oYm9keTogYW55KSB7XG4gICAgdGhpcy5sb2coYm9keSwgJ3dhcm4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IGluZm8gbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhIHdhcm5pbmcgb2JqZWN0LiBwcmVmZXJhYmx5IHdpdGggYSBtZXNzYWdlIGZpZWxkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keS5tZXNzYWdlOiBhIG1lc3NhZ2UgdG8gYmUgaW5nZXN0ZWQgYnkgbG9nIHNlcnZlci4gb3B0aW9uYWwuXG4gICAqL1xuICBpbmZvKGJvZHk6IGFueSkge1xuICAgIHRoaXMubG9nKGJvZHksICdpbmZvJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCB2ZXJib3NlIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYSB3YXJuaW5nIG9iamVjdC4gcHJlZmVyYWJseSB3aXRoIGEgbWVzc2FnZSBmaWVsZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHkubWVzc2FnZTogYSBtZXNzYWdlIHRvIGJlIGluZ2VzdGVkIGJ5IGxvZyBzZXJ2ZXIuIG9wdGlvbmFsLlxuICAgKi9cbiAgdmVyYm9zZShib2R5OiBhbnkpIHtcbiAgICB0aGlzLmxvZyhib2R5LCAndmVyYm9zZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIGxvZ2dlciB3aXRoIGEgZGlmZmVyZW50IHNldCBvZiB0YWdzIGJ1dCB3aXRoIHRoZSBzYW1lIHNjb3BlIGFzIHRoZSBvcmlnaW5hbC5cbiAgICogQHBhcmFtIHRhZ3NcbiAgICovXG4gIHRhZ3ModGFnczogP0FycmF5PHN0cmluZz4pOiBMb2dnZXIge1xuICAgIGNvbnN0IHBhcmFtcyA6IElMb2dnZXJDb25zdHJ1Y3RvclBhcmFtcyA9IHtcbiAgICAgIHNjb3BlOiB0aGlzLnBhcmFtcy5zY29wZSxcbiAgICAgIHRhZ3M6ICghKF8uaXNOaWwodGhpcy5wYXJhbXMuc2NvcGUpKSAmJiBfLmlzQXJyYXkodGhpcy5wYXJhbXMuc2NvcGUpKVxuICAgICAgICA/IF8uY29tcGFjdChfLnVuaW9uKHRoaXMucGFyYW1zLnNjb3BlLCB0YWdzKSkgOiB0YWdzLFxuICAgIH07XG4gICAgcmV0dXJuIG5ldyBMb2dnZXIocGFyYW1zKTtcbiAgfVxuXG4gIHN0YXRpYyBsb2coYm9keTogYW55LCBsZXZlbDogTGV2ZWwgPSAndmVyYm9zZScpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLmxvZyhib2R5LCBsZXZlbCk7XG4gIH1cblxuICBzdGF0aWMgZXJyb3IoYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci5lcnJvcihib2R5KTtcbiAgfVxuXG4gIHN0YXRpYyB3YXJuKGJvZHk6IGFueSkge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIud2Fybihib2R5KTtcbiAgfVxuXG4gIHN0YXRpYyBpbmZvKGJvZHk6IGFueSkge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIuaW5mbyhib2R5KTtcbiAgfVxuXG4gIHN0YXRpYyB2ZXJib3NlKGJvZHk6IGFueSkge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIudmVyYm9zZShib2R5KTtcbiAgfVxufVxuIl19