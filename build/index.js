'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var _debug = require('debug');var _debug2 = _interopRequireDefault(_debug);
var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);

var _ILogger = require('./interfaces/ILogger');
var _ILoggerConstructorParams = require('./interfaces/ILoggerConstructorParams');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class Logger {



  constructor(params) {
    const scope = process.env.LOG_SCOPE || 'default';
    if (_lodash2.default.isNil(params)) {
      this.params = {
        scope,
        tags: [''] };

    } else {
      this.params = _lodash2.default.merge(this.params, params);
      this.params.scope = _lodash2.default.isNil(this.params.scope) ? scope : this.params.scope;
      this.params.scope = this.params.scope || 'default';
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
      payload = _lodash2.default.merge(body, {
        timestamp: new Date() });

    } else if (typeof body === 'string') {
      payload = _lodash2.default.merge(payload, {
        message: body,
        timestamp: new Date() });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMb2dnZXIiLCJjb25zdHJ1Y3RvciIsInBhcmFtcyIsInNjb3BlIiwicHJvY2VzcyIsImVudiIsIkxPR19TQ09QRSIsImlzTmlsIiwidGFncyIsIm1lcmdlIiwibG9nIiwiYm9keSIsImxldmVsIiwicGF5bG9hZCIsInRpbWVzdGFtcCIsIkRhdGUiLCJtZXNzYWdlIiwiaXNBcnJheSIsImpvaW4iLCJkIiwiZXJyb3IiLCJ3YXJuIiwiaW5mbyIsInZlcmJvc2UiLCJsb2dnZXIiXSwibWFwcGluZ3MiOiI7QUFDQSw4QjtBQUNBLGdDOztBQUVBO0FBQ0EsaUY7O0FBRWUsTUFBTUEsTUFBTixDQUFnQzs7OztBQUk3Q0MsY0FBWUMsTUFBWixFQUErQztBQUM3QyxVQUFNQyxRQUFRQyxRQUFRQyxHQUFSLENBQVlDLFNBQVosSUFBeUIsU0FBdkM7QUFDQSxRQUFJLGlCQUFFQyxLQUFGLENBQVFMLE1BQVIsQ0FBSixFQUFxQjtBQUNuQixXQUFLQSxNQUFMLEdBQWM7QUFDWkMsYUFEWTtBQUVaSyxjQUFNLENBQUMsRUFBRCxDQUZNLEVBQWQ7O0FBSUQsS0FMRCxNQUtPO0FBQ0wsV0FBS04sTUFBTCxHQUFjLGlCQUFFTyxLQUFGLENBQVEsS0FBS1AsTUFBYixFQUFxQkEsTUFBckIsQ0FBZDtBQUNBLFdBQUtBLE1BQUwsQ0FBWUMsS0FBWixHQUFvQixpQkFBRUksS0FBRixDQUFRLEtBQUtMLE1BQUwsQ0FBWUMsS0FBcEIsSUFBNkJBLEtBQTdCLEdBQXFDLEtBQUtELE1BQUwsQ0FBWUMsS0FBckU7QUFDQSxXQUFLRCxNQUFMLENBQVlDLEtBQVosR0FBb0IsS0FBS0QsTUFBTCxDQUFZQyxLQUFaLElBQXFCLFNBQXpDO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7QUFLQU8sTUFBSUMsSUFBSixFQUFlQyxRQUFlLFNBQTlCLEVBQXlDO0FBQ3ZDLFFBQUlDLFVBQVUsRUFBZDtBQUNBLFFBQUksT0FBTyxLQUFLWCxNQUFMLENBQVlDLEtBQW5CLEtBQTZCLFFBQWpDLEVBQTJDLEtBQUtELE1BQUwsQ0FBWUMsS0FBWixHQUFvQixTQUFwQjtBQUMzQyxRQUFJLE9BQU9RLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDNUJFLGdCQUFVLGlCQUFFSixLQUFGLENBQVFFLElBQVIsRUFBYztBQUN0QkcsbUJBQVcsSUFBSUMsSUFBSixFQURXLEVBQWQsQ0FBVjs7QUFHRCxLQUpELE1BSU8sSUFBSSxPQUFPSixJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQ25DRSxnQkFBVSxpQkFBRUosS0FBRixDQUFRSSxPQUFSLEVBQWlCO0FBQ3pCRyxpQkFBU0wsSUFEZ0I7QUFFekJHLG1CQUFXLElBQUlDLElBQUosRUFGYyxFQUFqQixDQUFWOztBQUlELEtBTE0sTUFLQTtBQUNMO0FBQ0Q7QUFDRDtBQUNBLFVBQU1QLE9BQU8sS0FBS04sTUFBTCxDQUFZTSxJQUFaLElBQW9CLElBQXBCLElBQTRCLGlCQUFFUyxPQUFGLENBQVUsS0FBS2YsTUFBTCxDQUFZTSxJQUF0QixDQUE1QixHQUEwRCxLQUFLTixNQUFMLENBQVlNLElBQVosQ0FBaUJVLElBQWpCLEVBQTFELEdBQW9GLFVBQWpHO0FBQ0EsVUFBTUMsSUFBSSxxQkFBTyxHQUFFLEtBQUtqQixNQUFMLENBQVlDLEtBQU0sSUFBR0ssU0FBUyxFQUFULEdBQWMsVUFBZCxHQUEyQkEsSUFBSyxJQUFHSSxLQUFNLEVBQXZFLENBQVY7QUFDQU8sTUFBRSxJQUFGLEVBQVFOLE9BQVI7QUFDRDs7QUFFRDs7OztBQUlBTyxRQUFNVCxJQUFOLEVBQWlCO0FBQ2YsU0FBS0QsR0FBTCxDQUFTQyxJQUFULEVBQWUsT0FBZjtBQUNEOztBQUVEOzs7OztBQUtBVSxPQUFLVixJQUFMLEVBQWdCO0FBQ2QsU0FBS0QsR0FBTCxDQUFTQyxJQUFULEVBQWUsTUFBZjtBQUNEOztBQUVEOzs7OztBQUtBVyxPQUFLWCxJQUFMLEVBQWdCO0FBQ2QsU0FBS0QsR0FBTCxDQUFTQyxJQUFULEVBQWUsTUFBZjtBQUNEOztBQUVEOzs7OztBQUtBWSxVQUFRWixJQUFSLEVBQW1CO0FBQ2pCLFNBQUtELEdBQUwsQ0FBU0MsSUFBVCxFQUFlLFNBQWY7QUFDRDs7QUFFRDs7OztBQUlBSCxPQUFLQSxJQUFMLEVBQW1DO0FBQ2pDLFVBQU1OLFNBQW9DO0FBQ3hDQyxhQUFPLEtBQUtELE1BQUwsQ0FBWUMsS0FEcUI7QUFFeENLLFVBRndDLEVBQTFDOztBQUlBLFdBQU8sSUFBSVIsTUFBSixDQUFXRSxNQUFYLENBQVA7QUFDRDs7QUFFRCxTQUFPUSxHQUFQLENBQVdDLElBQVgsRUFBc0JDLFFBQWUsU0FBckMsRUFBZ0Q7QUFDOUMsVUFBTVksU0FBUyxJQUFJeEIsTUFBSixFQUFmO0FBQ0F3QixXQUFPZCxHQUFQLENBQVdDLElBQVgsRUFBaUJDLEtBQWpCO0FBQ0Q7O0FBRUQsU0FBT1EsS0FBUCxDQUFhVCxJQUFiLEVBQXdCO0FBQ3RCLFVBQU1hLFNBQVMsSUFBSXhCLE1BQUosRUFBZjtBQUNBd0IsV0FBT0osS0FBUCxDQUFhVCxJQUFiO0FBQ0Q7O0FBRUQsU0FBT1UsSUFBUCxDQUFZVixJQUFaLEVBQXVCO0FBQ3JCLFVBQU1hLFNBQVMsSUFBSXhCLE1BQUosRUFBZjtBQUNBd0IsV0FBT0gsSUFBUCxDQUFZVixJQUFaO0FBQ0Q7O0FBRUQsU0FBT1csSUFBUCxDQUFZWCxJQUFaLEVBQXVCO0FBQ3JCLFVBQU1hLFNBQVMsSUFBSXhCLE1BQUosRUFBZjtBQUNBd0IsV0FBT0YsSUFBUCxDQUFZWCxJQUFaO0FBQ0Q7O0FBRUQsU0FBT1ksT0FBUCxDQUFlWixJQUFmLEVBQTBCO0FBQ3hCLFVBQU1hLFNBQVMsSUFBSXhCLE1BQUosRUFBZjtBQUNBd0IsV0FBT0QsT0FBUCxDQUFlWixJQUFmO0FBQ0QsR0FsSDRDLEMsa0JBQTFCWCxNIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHR5cGUgeyBMZXZlbCB9IGZyb20gJy4vaW50ZXJmYWNlcy9JTG9nZ2VyJztcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuL2ludGVyZmFjZXMvSUxvZ2dlcic7XG5pbXBvcnQgeyBJTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXMgfSBmcm9tICcuL2ludGVyZmFjZXMvSUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyIGltcGxlbWVudHMgSUxvZ2dlciB7XG4gIHBhcmFtczogSUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zO1xuICBkZWJ1ZzogZGVidWc7XG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiA/SUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zKSB7XG4gICAgY29uc3Qgc2NvcGUgPSBwcm9jZXNzLmVudi5MT0dfU0NPUEUgfHwgJ2RlZmF1bHQnO1xuICAgIGlmIChfLmlzTmlsKHBhcmFtcykpIHtcbiAgICAgIHRoaXMucGFyYW1zID0ge1xuICAgICAgICBzY29wZSxcbiAgICAgICAgdGFnczogWycnXSxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFyYW1zID0gXy5tZXJnZSh0aGlzLnBhcmFtcywgcGFyYW1zKTtcbiAgICAgIHRoaXMucGFyYW1zLnNjb3BlID0gXy5pc05pbCh0aGlzLnBhcmFtcy5zY29wZSkgPyBzY29wZSA6IHRoaXMucGFyYW1zLnNjb3BlO1xuICAgICAgdGhpcy5wYXJhbXMuc2NvcGUgPSB0aGlzLnBhcmFtcy5zY29wZSB8fCAnZGVmYXVsdCc7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgZXJyb3IgbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhbmQgZXJyb3Igb2JqZWN0LlxuICAgKiBAcGFyYW0gbGV2ZWwgY2FuIGJlICdlcnJvcicsICd3YXJuJywgJ2luZm8nLCAndmVyYm9zZSdcbiAgICovXG4gIGxvZyhib2R5OiBhbnksIGxldmVsOiBMZXZlbCA9ICd2ZXJib3NlJykge1xuICAgIGxldCBwYXlsb2FkID0ge307XG4gICAgaWYgKHR5cGVvZiB0aGlzLnBhcmFtcy5zY29wZSAhPT0gJ3N0cmluZycpIHRoaXMucGFyYW1zLnNjb3BlID0gJ2RlZmF1bHQnO1xuICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHBheWxvYWQgPSBfLm1lcmdlKGJvZHksIHtcbiAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHtcbiAgICAgICAgbWVzc2FnZTogYm9keSxcbiAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gdGhpcyBpcyBzbyB0aGF0IGl0IHdpbGwgYmUgZWFzaWVyIHRvIHF1ZXJ5IG9uIHRoZSBiYWNrZW5kIGllLiBsb2dnbHkgb3IgZWxhc3RpYyBzZWFyY2guXG4gICAgY29uc3QgdGFncyA9IHRoaXMucGFyYW1zLnRhZ3MgIT0gbnVsbCAmJiBfLmlzQXJyYXkodGhpcy5wYXJhbXMudGFncykgPyB0aGlzLnBhcmFtcy50YWdzLmpvaW4oKSA6ICd1bnRhZ2dlZCc7XG4gICAgY29uc3QgZCA9IGRlYnVnKGAke3RoaXMucGFyYW1zLnNjb3BlfToke3RhZ3MgPT09ICcnID8gJ3VudGFnZ2VkJyA6IHRhZ3N9OiR7bGV2ZWx9YCk7XG4gICAgZCgnJWonLCBwYXlsb2FkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IGVycm9yIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYW5kIGVycm9yIG9iamVjdC5cbiAgICovXG4gIGVycm9yKGJvZHk6IGFueSkge1xuICAgIHRoaXMubG9nKGJvZHksICdlcnJvcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgd2FybiBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGEgd2FybmluZyBvYmplY3QuIHByZWZlcmFibHkgd2l0aCBhIG1lc3NhZ2UgZmllbGQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5Lm1lc3NhZ2U6IGEgbWVzc2FnZSB0byBiZSBpbmdlc3RlZCBieSBsb2cgc2VydmVyLiBvcHRpb25hbC5cbiAgICovXG4gIHdhcm4oYm9keTogYW55KSB7XG4gICAgdGhpcy5sb2coYm9keSwgJ3dhcm4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IGluZm8gbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhIHdhcm5pbmcgb2JqZWN0LiBwcmVmZXJhYmx5IHdpdGggYSBtZXNzYWdlIGZpZWxkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keS5tZXNzYWdlOiBhIG1lc3NhZ2UgdG8gYmUgaW5nZXN0ZWQgYnkgbG9nIHNlcnZlci4gb3B0aW9uYWwuXG4gICAqL1xuICBpbmZvKGJvZHk6IGFueSkge1xuICAgIHRoaXMubG9nKGJvZHksICdpbmZvJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCB2ZXJib3NlIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYSB3YXJuaW5nIG9iamVjdC4gcHJlZmVyYWJseSB3aXRoIGEgbWVzc2FnZSBmaWVsZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHkubWVzc2FnZTogYSBtZXNzYWdlIHRvIGJlIGluZ2VzdGVkIGJ5IGxvZyBzZXJ2ZXIuIG9wdGlvbmFsLlxuICAgKi9cbiAgdmVyYm9zZShib2R5OiBhbnkpIHtcbiAgICB0aGlzLmxvZyhib2R5LCAndmVyYm9zZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIGxvZ2dlciB3aXRoIGEgZGlmZmVyZW50IHNldCBvZiB0YWdzIGJ1dCB3aXRoIHRoZSBzYW1lIHNjb3BlIGFzIHRoZSBvcmlnaW5hbC5cbiAgICogQHBhcmFtIHRhZ3NcbiAgICovXG4gIHRhZ3ModGFnczogP0FycmF5PHN0cmluZz4pOiBMb2dnZXIge1xuICAgIGNvbnN0IHBhcmFtcyA6IElMb2dnZXJDb25zdHJ1Y3RvclBhcmFtcyA9IHtcbiAgICAgIHNjb3BlOiB0aGlzLnBhcmFtcy5zY29wZSxcbiAgICAgIHRhZ3MsXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IExvZ2dlcihwYXJhbXMpO1xuICB9XG5cbiAgc3RhdGljIGxvZyhib2R5OiBhbnksIGxldmVsOiBMZXZlbCA9ICd2ZXJib3NlJykge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIubG9nKGJvZHksIGxldmVsKTtcbiAgfVxuXG4gIHN0YXRpYyBlcnJvcihib2R5OiBhbnkpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLmVycm9yKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIHdhcm4oYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci53YXJuKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIGluZm8oYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci5pbmZvKGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIHZlcmJvc2UoYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci52ZXJib3NlKGJvZHkpO1xuICB9XG59XG4iXX0=