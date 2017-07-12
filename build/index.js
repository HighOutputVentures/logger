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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMb2dnZXIiLCJjb25zdHJ1Y3RvciIsInBhcmFtcyIsImhvc3RuYW1lIiwicGlkIiwicHJvY2VzcyIsImRlZmF1bHRTY29wZSIsImlzTnVsbCIsImVudiIsIkxPR19TQ09QRSIsImVudlRpbWVTdGFtcCIsImlzRGlzYWJsZWQiLCJMT0dfTk9USU1FU1RBTVAiLCJlbnZQaWQiLCJMT0dfTk9QSUQiLCJlbnZIb3N0bmFtZSIsIkxPR19OT0hPU1ROQU1FIiwiaXNOaWwiLCJzY29wZSIsInRhZ3MiLCJlbmFibGVUaW1lc3RhbXAiLCJlbmFibGVQaWQiLCJlbmFibGVIb3N0bmFtZSIsInRyaW0iLCJtZXJnZSIsInBhcmFtIiwidG9OdW1iZXIiLCJsb2ciLCJib2R5IiwibGV2ZWwiLCJwYXlsb2FkIiwidGltZXN0YW1wIiwiRGF0ZSIsIm1lc3NhZ2UiLCJpc0FycmF5Iiwiam9pbiIsImQiLCJlcnJvciIsImVyciIsInRvUGxhaW5PYmplY3QiLCJzdGFjayIsIndhcm4iLCJpbmZvIiwidmVyYm9zZSIsImNvbXBhY3QiLCJ1bmlvbiIsImxvZ2dlciJdLCJtYXBwaW5ncyI6IjtBQUNBLDhCO0FBQ0EsZ0M7QUFDQSx3Qjs7QUFFZSxNQUFNQSxNQUFOLENBQWdDOzs7OztBQUs3Q0MsY0FBWUMsTUFBWixFQUF3RDtBQUN0RCxTQUFLQyxRQUFMLEdBQWdCLGFBQUdBLFFBQUgsRUFBaEI7QUFDQSxTQUFLQyxHQUFMLEdBQVdDLFFBQVFELEdBQW5CO0FBQ0EsVUFBTUUsZUFBeUIsaUJBQUVDLE1BQUYsQ0FBU0YsUUFBUUcsR0FBUixDQUFZQyxTQUFyQixJQUFrQyxTQUFsQyxHQUE4Q0osUUFBUUcsR0FBUixDQUFZQyxTQUF6RjtBQUNBLFVBQU1DLGVBQTBCLENBQUNWLE9BQU9XLFVBQVAsQ0FBa0JOLFFBQVFHLEdBQVIsQ0FBWUksZUFBOUIsQ0FBakM7QUFDQSxVQUFNQyxTQUFvQixDQUFDYixPQUFPVyxVQUFQLENBQWtCTixRQUFRRyxHQUFSLENBQVlNLFNBQTlCLENBQTNCO0FBQ0EsVUFBTUMsY0FBeUIsQ0FBQ2YsT0FBT1csVUFBUCxDQUFrQk4sUUFBUUcsR0FBUixDQUFZUSxjQUE5QixDQUFoQzs7QUFFQSxRQUFJLGlCQUFFQyxLQUFGLENBQVFmLE1BQVIsQ0FBSixFQUFxQjtBQUNuQixXQUFLQSxNQUFMLEdBQWM7QUFDWmdCLGVBQU9aLFlBREs7QUFFWmEsY0FBTSxDQUFDLEVBQUQsQ0FGTTtBQUdaQyx5QkFBaUJWLFlBSEw7QUFJWlcsbUJBQVdSLE1BSkM7QUFLWlMsd0JBQWdCUCxXQUxKLEVBQWQ7O0FBT0QsS0FSRCxNQVFPLElBQUksT0FBT2IsTUFBUCxLQUFrQixRQUF0QixFQUFnQztBQUNyQyxXQUFLQSxNQUFMLEdBQWM7QUFDWmdCLGVBQU8saUJBQUVLLElBQUYsQ0FBT3JCLE1BQVAsQ0FESztBQUVaaUIsY0FBTSxDQUFDLEVBQUQsQ0FGTTtBQUdaQyx5QkFBaUJWLFlBSEw7QUFJWlcsbUJBQVdSLE1BSkM7QUFLWlMsd0JBQWdCUCxXQUxKLEVBQWQ7O0FBT0QsS0FSTSxNQVFBLElBQUksT0FBT2IsTUFBUCxLQUFrQixRQUF0QixFQUFnQztBQUNyQyxXQUFLQSxNQUFMLEdBQWMsaUJBQUVzQixLQUFGLENBQVEsS0FBS3RCLE1BQWIsRUFBcUJBLE1BQXJCLEVBQTZCO0FBQ3pDa0IseUJBQWlCVixZQUR3QjtBQUV6Q1csbUJBQVdSLE1BRjhCO0FBR3pDUyx3QkFBZ0JQLFdBSHlCLEVBQTdCLENBQWQ7O0FBS0EsV0FBS2IsTUFBTCxDQUFZZ0IsS0FBWixHQUFvQixpQkFBRUQsS0FBRixDQUFRLEtBQUtmLE1BQUwsQ0FBWWdCLEtBQXBCLElBQTZCWixZQUE3QixHQUE0QyxLQUFLSixNQUFMLENBQVlnQixLQUE1RTtBQUNEO0FBQ0Y7O0FBRUQ7Ozs7OztBQU1BLFNBQU9QLFVBQVAsQ0FBa0JjLEtBQWxCLEVBQXVDO0FBQ3JDLFdBQU8saUJBQUVsQixNQUFGLENBQVNrQixLQUFULElBQWtCLEtBQWxCLEdBQTJCLGlCQUFFQyxRQUFGLENBQVdELEtBQVgsTUFBc0IsQ0FBeEQ7QUFDRDs7QUFFRDs7Ozs7QUFLQUUsTUFBSUMsSUFBSixFQUFlQyxRQUFlLFNBQTlCLEVBQStDO0FBQzdDLFFBQUlDLFVBQVUsRUFBZDtBQUNBLFFBQUksT0FBTyxLQUFLNUIsTUFBTCxDQUFZZ0IsS0FBbkIsS0FBNkIsUUFBakMsRUFBMkMsS0FBS2hCLE1BQUwsQ0FBWWdCLEtBQVosR0FBb0IsU0FBcEI7QUFDM0MsUUFBSSxPQUFPVSxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzVCRSxnQkFBVSxpQkFBRU4sS0FBRixDQUFRTSxPQUFSLEVBQWlCRixJQUFqQixDQUFWO0FBQ0EsVUFBSSxLQUFLMUIsTUFBTCxDQUFZa0IsZUFBaEIsRUFBaUM7QUFDL0JVLGtCQUFVLGlCQUFFTixLQUFGLENBQVFNLE9BQVIsRUFBaUIsRUFBRUMsV0FBVyxJQUFJQyxJQUFKLEVBQWIsRUFBakIsQ0FBVjtBQUNEO0FBQ0QsVUFBSSxLQUFLOUIsTUFBTCxDQUFZbUIsU0FBaEIsRUFBMkI7QUFDekJTLGtCQUFVLGlCQUFFTixLQUFGLENBQVFNLE9BQVIsRUFBaUIsRUFBRTFCLEtBQUssS0FBS0EsR0FBWixFQUFqQixDQUFWO0FBQ0Q7QUFDRCxVQUFJLEtBQUtGLE1BQUwsQ0FBWW9CLGNBQWhCLEVBQWdDO0FBQzlCUSxrQkFBVSxpQkFBRU4sS0FBRixDQUFRTSxPQUFSLEVBQWlCLEVBQUUzQixVQUFVLEtBQUtBLFFBQWpCLEVBQWpCLENBQVY7QUFDRDtBQUNGLEtBWEQsTUFXTyxJQUFJLE9BQU95QixJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQ25DRSxnQkFBVSxpQkFBRU4sS0FBRixDQUFRTSxPQUFSLEVBQWlCLEVBQUVHLFNBQVMsaUJBQUVWLElBQUYsQ0FBT0ssSUFBUCxDQUFYLEVBQWpCLENBQVY7QUFDQSxVQUFJLEtBQUsxQixNQUFMLENBQVlrQixlQUFoQixFQUFpQztBQUMvQlUsa0JBQVUsaUJBQUVOLEtBQUYsQ0FBUU0sT0FBUixFQUFpQixFQUFFQyxXQUFXLElBQUlDLElBQUosRUFBYixFQUFqQixDQUFWO0FBQ0Q7QUFDRCxVQUFJLEtBQUs5QixNQUFMLENBQVltQixTQUFoQixFQUEyQjtBQUN6QlMsa0JBQVUsaUJBQUVOLEtBQUYsQ0FBUU0sT0FBUixFQUFpQixFQUFFMUIsS0FBSyxLQUFLQSxHQUFaLEVBQWpCLENBQVY7QUFDRDtBQUNELFVBQUksS0FBS0YsTUFBTCxDQUFZb0IsY0FBaEIsRUFBZ0M7QUFDOUJRLGtCQUFVLGlCQUFFTixLQUFGLENBQVFNLE9BQVIsRUFBaUIsRUFBRTNCLFVBQVUsS0FBS0EsUUFBakIsRUFBakIsQ0FBVjtBQUNEO0FBQ0YsS0FYTSxNQVdBO0FBQ0w7QUFDRDs7QUFFRDtBQUNBLFVBQU1nQixPQUFPLEtBQUtqQixNQUFMLENBQVlpQixJQUFaLElBQW9CLElBQXBCLElBQTRCLGlCQUFFZSxPQUFGLENBQVUsS0FBS2hDLE1BQUwsQ0FBWWlCLElBQXRCLENBQTVCLEdBQTBELEtBQUtqQixNQUFMLENBQVlpQixJQUFaLENBQWlCZ0IsSUFBakIsRUFBMUQsR0FBb0YsVUFBakc7QUFDQSxVQUFNQyxJQUFJLHFCQUFPLEdBQUUsS0FBS2xDLE1BQUwsQ0FBWWdCLEtBQU0sSUFBR0MsU0FBUyxFQUFULEdBQWMsVUFBZCxHQUEyQkEsSUFBSyxJQUFHVSxLQUFNLEVBQXZFLENBQVY7QUFDQU8sTUFBRSxJQUFGLEVBQVFOLE9BQVI7QUFDRDs7QUFFRDs7OztBQUlBTyxRQUFNQyxHQUFOLEVBQWdCO0FBQ2QsUUFBSVIsVUFBVyxPQUFPUSxHQUFQLEtBQWUsUUFBaEIsR0FBNEIsRUFBRUwsU0FBU0ssR0FBWCxFQUE1QixHQUErQyxpQkFBRUMsYUFBRixDQUFnQkQsR0FBaEIsQ0FBN0Q7QUFDQSxRQUFJLENBQUMsaUJBQUVyQixLQUFGLENBQVFxQixJQUFJTCxPQUFaLENBQUwsRUFBMkJILFVBQVUsaUJBQUVOLEtBQUYsQ0FBUU0sT0FBUixFQUFpQixFQUFFRyxTQUFTSyxJQUFJTCxPQUFmLEVBQWpCLENBQVY7QUFDM0IsUUFBSSxDQUFDLGlCQUFFaEIsS0FBRixDQUFRcUIsSUFBSUUsS0FBWixDQUFMLEVBQXlCVixVQUFVLGlCQUFFTixLQUFGLENBQVFNLE9BQVIsRUFBaUIsRUFBRUcsU0FBU0ssSUFBSUUsS0FBZixFQUFqQixDQUFWO0FBQ3pCLFNBQUtiLEdBQUwsQ0FBU0csT0FBVCxFQUFrQixPQUFsQjtBQUNEOztBQUVEOzs7OztBQUtBVyxPQUFLYixJQUFMLEVBQWdCO0FBQ2QsU0FBS0QsR0FBTCxDQUFTQyxJQUFULEVBQWUsTUFBZjtBQUNEOztBQUVEOzs7OztBQUtBYyxPQUFLZCxJQUFMLEVBQWdCO0FBQ2QsU0FBS0QsR0FBTCxDQUFTQyxJQUFULEVBQWUsTUFBZjtBQUNEOztBQUVEOzs7OztBQUtBZSxVQUFRZixJQUFSLEVBQW1CO0FBQ2pCLFNBQUtELEdBQUwsQ0FBU0MsSUFBVCxFQUFlLFNBQWY7QUFDRDs7QUFFRDs7OztBQUlBVCxPQUFLQSxJQUFMLEVBQW1DO0FBQ2pDLFVBQU1qQixTQUFvQztBQUN4Q2dCLGFBQU8sS0FBS2hCLE1BQUwsQ0FBWWdCLEtBRHFCO0FBRXhDQyxZQUFNLGlCQUFFeUIsT0FBRixDQUFVLGlCQUFFQyxLQUFGLENBQVEsS0FBSzNDLE1BQUwsQ0FBWWlCLElBQXBCLEVBQTBCQSxJQUExQixDQUFWLENBRmtDLEVBQTFDOztBQUlBLFdBQU8sSUFBSW5CLE1BQUosQ0FBV0UsTUFBWCxDQUFQO0FBQ0Q7O0FBRUQsU0FBT3lCLEdBQVAsQ0FBV0MsSUFBWCxFQUFzQkMsUUFBZSxTQUFyQyxFQUFnRDtBQUM5QyxVQUFNaUIsU0FBUyxJQUFJOUMsTUFBSixFQUFmO0FBQ0E4QyxXQUFPbkIsR0FBUCxDQUFXQyxJQUFYLEVBQWlCQyxLQUFqQjtBQUNEOztBQUVELFNBQU9RLEtBQVAsQ0FBYVQsSUFBYixFQUF3QjtBQUN0QixVQUFNa0IsU0FBUyxJQUFJOUMsTUFBSixFQUFmO0FBQ0E4QyxXQUFPVCxLQUFQLENBQWFULElBQWI7QUFDRDs7QUFFRCxTQUFPYSxJQUFQLENBQVliLElBQVosRUFBdUI7QUFDckIsVUFBTWtCLFNBQVMsSUFBSTlDLE1BQUosRUFBZjtBQUNBOEMsV0FBT0wsSUFBUCxDQUFZYixJQUFaO0FBQ0Q7O0FBRUQsU0FBT2MsSUFBUCxDQUFZZCxJQUFaLEVBQXVCO0FBQ3JCLFVBQU1rQixTQUFTLElBQUk5QyxNQUFKLEVBQWY7QUFDQThDLFdBQU9KLElBQVAsQ0FBWWQsSUFBWjtBQUNEOztBQUVELFNBQU9lLE9BQVAsQ0FBZWYsSUFBZixFQUEwQjtBQUN4QixVQUFNa0IsU0FBUyxJQUFJOUMsTUFBSixFQUFmO0FBQ0E4QyxXQUFPSCxPQUFQLENBQWVmLElBQWY7QUFDRCxHQWxLNEMsQyxrQkFBMUI1QixNIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG9zIGZyb20gJ29zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyIGltcGxlbWVudHMgSUxvZ2dlciB7XG4gIHBhcmFtczogSUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zO1xuICBwaWQ6IG51bWJlcjtcbiAgaG9zdG5hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6ID9JTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXMgfCBzdHJpbmcpIHtcbiAgICB0aGlzLmhvc3RuYW1lID0gb3MuaG9zdG5hbWUoKTtcbiAgICB0aGlzLnBpZCA9IHByb2Nlc3MucGlkO1xuICAgIGNvbnN0IGRlZmF1bHRTY29wZSA6ID9zdHJpbmcgPSBfLmlzTnVsbChwcm9jZXNzLmVudi5MT0dfU0NPUEUpID8gJ2RlZmF1bHQnIDogcHJvY2Vzcy5lbnYuTE9HX1NDT1BFO1xuICAgIGNvbnN0IGVudlRpbWVTdGFtcCA6ID9ib29sZWFuID0gIUxvZ2dlci5pc0Rpc2FibGVkKHByb2Nlc3MuZW52LkxPR19OT1RJTUVTVEFNUCk7XG4gICAgY29uc3QgZW52UGlkIDogP2Jvb2xlYW4gPSAhTG9nZ2VyLmlzRGlzYWJsZWQocHJvY2Vzcy5lbnYuTE9HX05PUElEKTtcbiAgICBjb25zdCBlbnZIb3N0bmFtZSA6ID9ib29sZWFuID0gIUxvZ2dlci5pc0Rpc2FibGVkKHByb2Nlc3MuZW52LkxPR19OT0hPU1ROQU1FKTtcblxuICAgIGlmIChfLmlzTmlsKHBhcmFtcykpIHtcbiAgICAgIHRoaXMucGFyYW1zID0ge1xuICAgICAgICBzY29wZTogZGVmYXVsdFNjb3BlLFxuICAgICAgICB0YWdzOiBbJyddLFxuICAgICAgICBlbmFibGVUaW1lc3RhbXA6IGVudlRpbWVTdGFtcCxcbiAgICAgICAgZW5hYmxlUGlkOiBlbnZQaWQsXG4gICAgICAgIGVuYWJsZUhvc3RuYW1lOiBlbnZIb3N0bmFtZSxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5wYXJhbXMgPSB7XG4gICAgICAgIHNjb3BlOiBfLnRyaW0ocGFyYW1zKSxcbiAgICAgICAgdGFnczogWycnXSxcbiAgICAgICAgZW5hYmxlVGltZXN0YW1wOiBlbnZUaW1lU3RhbXAsXG4gICAgICAgIGVuYWJsZVBpZDogZW52UGlkLFxuICAgICAgICBlbmFibGVIb3N0bmFtZTogZW52SG9zdG5hbWUsXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMucGFyYW1zID0gXy5tZXJnZSh0aGlzLnBhcmFtcywgcGFyYW1zLCB7XG4gICAgICAgIGVuYWJsZVRpbWVzdGFtcDogZW52VGltZVN0YW1wLFxuICAgICAgICBlbmFibGVQaWQ6IGVudlBpZCxcbiAgICAgICAgZW5hYmxlSG9zdG5hbWU6IGVudkhvc3RuYW1lLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnBhcmFtcy5zY29wZSA9IF8uaXNOaWwodGhpcy5wYXJhbXMuc2NvcGUpID8gZGVmYXVsdFNjb3BlIDogdGhpcy5wYXJhbXMuc2NvcGU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgdmFsdWUgaXMgZXhwbGljaXR5IGVxdWFsIHRvICcxJy5cbiAgICogQHBhcmFtIHBhcmFtXG4gICAqIEBwYXJhbSBkZWZhdWxWYWx1ZVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBpc0Rpc2FibGVkKHBhcmFtOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gXy5pc051bGwocGFyYW0pID8gZmFsc2UgOiAoXy50b051bWJlcihwYXJhbSkgPT09IDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgZXJyb3IgbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhbmQgZXJyb3Igb2JqZWN0LlxuICAgKiBAcGFyYW0gbGV2ZWwgY2FuIGJlICdlcnJvcicsICd3YXJuJywgJ2luZm8nLCAndmVyYm9zZSdcbiAgICovXG4gIGxvZyhib2R5OiBhbnksIGxldmVsOiBMZXZlbCA9ICd2ZXJib3NlJyk6IHZvaWQge1xuICAgIGxldCBwYXlsb2FkID0ge307XG4gICAgaWYgKHR5cGVvZiB0aGlzLnBhcmFtcy5zY29wZSAhPT0gJ3N0cmluZycpIHRoaXMucGFyYW1zLnNjb3BlID0gJ2RlZmF1bHQnO1xuICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIGJvZHkpO1xuICAgICAgaWYgKHRoaXMucGFyYW1zLmVuYWJsZVRpbWVzdGFtcCkge1xuICAgICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IHRpbWVzdGFtcDogbmV3IERhdGUoKSB9KTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBhcmFtcy5lbmFibGVQaWQpIHtcbiAgICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBwaWQ6IHRoaXMucGlkIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucGFyYW1zLmVuYWJsZUhvc3RuYW1lKSB7XG4gICAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgaG9zdG5hbWU6IHRoaXMuaG9zdG5hbWUgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgbWVzc2FnZTogXy50cmltKGJvZHkpIH0pO1xuICAgICAgaWYgKHRoaXMucGFyYW1zLmVuYWJsZVRpbWVzdGFtcCkge1xuICAgICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IHRpbWVzdGFtcDogbmV3IERhdGUoKSB9KTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBhcmFtcy5lbmFibGVQaWQpIHtcbiAgICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UocGF5bG9hZCwgeyBwaWQ6IHRoaXMucGlkIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucGFyYW1zLmVuYWJsZUhvc3RuYW1lKSB7XG4gICAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgaG9zdG5hbWU6IHRoaXMuaG9zdG5hbWUgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB0aGlzIGlzIHNvIHRoYXQgaXQgd2lsbCBiZSBlYXNpZXIgdG8gcXVlcnkgb24gdGhlIGJhY2tlbmQgaWUuIGxvZ2dseSBvciBlbGFzdGljIHNlYXJjaC5cbiAgICBjb25zdCB0YWdzID0gdGhpcy5wYXJhbXMudGFncyAhPSBudWxsICYmIF8uaXNBcnJheSh0aGlzLnBhcmFtcy50YWdzKSA/IHRoaXMucGFyYW1zLnRhZ3Muam9pbigpIDogJ3VudGFnZ2VkJztcbiAgICBjb25zdCBkID0gZGVidWcoYCR7dGhpcy5wYXJhbXMuc2NvcGV9OiR7dGFncyA9PT0gJycgPyAndW50YWdnZWQnIDogdGFnc306JHtsZXZlbH1gKTtcbiAgICBkKCclaicsIHBheWxvYWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgZXJyb3IgbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhbiBlcnJvciBvYmplY3QuXG4gICAqL1xuICBlcnJvcihlcnI6IGFueSkge1xuICAgIGxldCBwYXlsb2FkID0gKHR5cGVvZiBlcnIgPT09ICdzdHJpbmcnKSA/IHsgbWVzc2FnZTogZXJyIH0gOiBfLnRvUGxhaW5PYmplY3QoZXJyKTtcbiAgICBpZiAoIV8uaXNOaWwoZXJyLm1lc3NhZ2UpKSBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IG1lc3NhZ2U6IGVyci5tZXNzYWdlIH0pO1xuICAgIGlmICghXy5pc05pbChlcnIuc3RhY2spKSBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7IG1lc3NhZ2U6IGVyci5zdGFjayB9KTtcbiAgICB0aGlzLmxvZyhwYXlsb2FkLCAnZXJyb3InKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IHdhcm4gbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhIHdhcm5pbmcgb2JqZWN0LiBwcmVmZXJhYmx5IHdpdGggYSBtZXNzYWdlIGZpZWxkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keS5tZXNzYWdlOiBhIG1lc3NhZ2UgdG8gYmUgaW5nZXN0ZWQgYnkgbG9nIHNlcnZlci4gb3B0aW9uYWwuXG4gICAqL1xuICB3YXJuKGJvZHk6IGFueSkge1xuICAgIHRoaXMubG9nKGJvZHksICd3YXJuJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCBpbmZvIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYSB3YXJuaW5nIG9iamVjdC4gcHJlZmVyYWJseSB3aXRoIGEgbWVzc2FnZSBmaWVsZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHkubWVzc2FnZTogYSBtZXNzYWdlIHRvIGJlIGluZ2VzdGVkIGJ5IGxvZyBzZXJ2ZXIuIG9wdGlvbmFsLlxuICAgKi9cbiAgaW5mbyhib2R5OiBhbnkpIHtcbiAgICB0aGlzLmxvZyhib2R5LCAnaW5mbycpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgdmVyYm9zZSBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGEgd2FybmluZyBvYmplY3QuIHByZWZlcmFibHkgd2l0aCBhIG1lc3NhZ2UgZmllbGQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5Lm1lc3NhZ2U6IGEgbWVzc2FnZSB0byBiZSBpbmdlc3RlZCBieSBsb2cgc2VydmVyLiBvcHRpb25hbC5cbiAgICovXG4gIHZlcmJvc2UoYm9keTogYW55KSB7XG4gICAgdGhpcy5sb2coYm9keSwgJ3ZlcmJvc2UnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBsb2dnZXIgd2l0aCBhIGRpZmZlcmVudCBzZXQgb2YgdGFncyBidXQgd2l0aCB0aGUgc2FtZSBzY29wZSBhcyB0aGUgb3JpZ2luYWwuXG4gICAqIEBwYXJhbSB0YWdzXG4gICAqL1xuICB0YWdzKHRhZ3M6ID9BcnJheTxzdHJpbmc+KTogTG9nZ2VyIHtcbiAgICBjb25zdCBwYXJhbXMgOiBJTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXMgPSB7XG4gICAgICBzY29wZTogdGhpcy5wYXJhbXMuc2NvcGUsXG4gICAgICB0YWdzOiBfLmNvbXBhY3QoXy51bmlvbih0aGlzLnBhcmFtcy50YWdzLCB0YWdzKSksXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IExvZ2dlcihwYXJhbXMpO1xuICB9XG5cbiAgc3RhdGljIGxvZyhib2R5OiBhbnksIGxldmVsOiBMZXZlbCA9ICd2ZXJib3NlJykge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIubG9nKGJvZHksIGxldmVsKTtcbiAgfVxuXG4gIHN0YXRpYyBlcnJvcihib2R5OiBhbnkpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLmVycm9yKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIHdhcm4oYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci53YXJuKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIGluZm8oYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci5pbmZvKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIHZlcmJvc2UoYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci52ZXJib3NlKGJvZHkpO1xuICB9XG59XG4iXX0=