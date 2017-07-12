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
    this.debug = (0, _debug2.default)(this.params.scope);
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
    const output = `${this.params.scope}:${tags}:${level} %j}`;
    this.debug(output, payload);
  }

  /**
     * Creates a debug output at error level.
     * @param {Object} body: and error object.
     */
  error(body) {
    this.log(body, 'error');
  }

  /**
     * Creates a debug output at error level.
     * @param {Object} body: a warning object. preferably with a message field.
     * @param {Object} body.message: a message to be ingested by log server.
     */
  warn(body) {
    this.log(body, 'warn');
  }

  /**
     * Creates a debug output at error level.
     * @param {Object} body: a warning object. preferably with a message field.
     * @param {Object} body.message: a message to be ingested by log server.
     */
  info(body) {
    this.log(body, 'info');
  }

  /**
     * Creates a debug output at error level.
     * @param {Object} body: a warning object. preferably with a message field.
     * @param {Object} body.message: a message to be ingested by log server.
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
  }}exports.default = Logger;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMb2dnZXIiLCJjb25zdHJ1Y3RvciIsInBhcmFtcyIsInNjb3BlIiwicHJvY2VzcyIsImVudiIsIkxPR19TQ09QRSIsImlzTmlsIiwidGFncyIsIm1lcmdlIiwiZGVidWciLCJsb2ciLCJib2R5IiwibGV2ZWwiLCJwYXlsb2FkIiwidGltZXN0YW1wIiwiRGF0ZSIsIm1lc3NhZ2UiLCJpc0FycmF5Iiwiam9pbiIsIm91dHB1dCIsImVycm9yIiwid2FybiIsImluZm8iLCJ2ZXJib3NlIl0sIm1hcHBpbmdzIjoiO0FBQ0EsOEI7QUFDQSxnQzs7QUFFQTtBQUNBLGlGOztBQUVlLE1BQU1BLE1BQU4sQ0FBZ0M7Ozs7QUFJN0NDLGNBQVlDLE1BQVosRUFBK0M7QUFDN0MsVUFBTUMsUUFBUUMsUUFBUUMsR0FBUixDQUFZQyxTQUFaLElBQXlCLFNBQXZDO0FBQ0EsUUFBSSxpQkFBRUMsS0FBRixDQUFRTCxNQUFSLENBQUosRUFBcUI7QUFDbkIsV0FBS0EsTUFBTCxHQUFjO0FBQ1pDLGFBRFk7QUFFWkssY0FBTSxDQUFDLEVBQUQsQ0FGTSxFQUFkOztBQUlELEtBTEQsTUFLTztBQUNMLFdBQUtOLE1BQUwsR0FBYyxpQkFBRU8sS0FBRixDQUFRLEtBQUtQLE1BQWIsRUFBcUJBLE1BQXJCLENBQWQ7QUFDQSxXQUFLQSxNQUFMLENBQVlDLEtBQVosR0FBb0IsaUJBQUVJLEtBQUYsQ0FBUSxLQUFLTCxNQUFMLENBQVlDLEtBQXBCLElBQTZCQSxLQUE3QixHQUFxQyxLQUFLRCxNQUFMLENBQVlDLEtBQXJFO0FBQ0EsV0FBS0QsTUFBTCxDQUFZQyxLQUFaLEdBQW9CLEtBQUtELE1BQUwsQ0FBWUMsS0FBWixJQUFxQixTQUF6QztBQUNEO0FBQ0QsU0FBS08sS0FBTCxHQUFhLHFCQUFNLEtBQUtSLE1BQUwsQ0FBWUMsS0FBbEIsQ0FBYjtBQUNEOztBQUVEOzs7OztBQUtBUSxNQUFJQyxJQUFKLEVBQWVDLFFBQWUsU0FBOUIsRUFBeUM7QUFDdkMsUUFBSUMsVUFBVSxFQUFkO0FBQ0EsUUFBSSxPQUFPLEtBQUtaLE1BQUwsQ0FBWUMsS0FBbkIsS0FBNkIsUUFBakMsRUFBMkMsS0FBS0QsTUFBTCxDQUFZQyxLQUFaLEdBQW9CLFNBQXBCO0FBQzNDLFFBQUksT0FBT1MsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUM1QkUsZ0JBQVUsaUJBQUVMLEtBQUYsQ0FBUUcsSUFBUixFQUFjO0FBQ3RCRyxtQkFBVyxJQUFJQyxJQUFKLEVBRFcsRUFBZCxDQUFWOztBQUdELEtBSkQsTUFJTyxJQUFJLE9BQU9KLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDbkNFLGdCQUFVLGlCQUFFTCxLQUFGLENBQVFLLE9BQVIsRUFBaUI7QUFDekJHLGlCQUFTTCxJQURnQjtBQUV6QkcsbUJBQVcsSUFBSUMsSUFBSixFQUZjLEVBQWpCLENBQVY7O0FBSUQsS0FMTSxNQUtBO0FBQ0w7QUFDRDtBQUNEO0FBQ0EsVUFBTVIsT0FBTyxLQUFLTixNQUFMLENBQVlNLElBQVosSUFBb0IsSUFBcEIsSUFBNEIsaUJBQUVVLE9BQUYsQ0FBVSxLQUFLaEIsTUFBTCxDQUFZTSxJQUF0QixDQUE1QixHQUEwRCxLQUFLTixNQUFMLENBQVlNLElBQVosQ0FBaUJXLElBQWpCLEVBQTFELEdBQW9GLFVBQWpHO0FBQ0EsVUFBTUMsU0FBVSxHQUFFLEtBQUtsQixNQUFMLENBQVlDLEtBQU0sSUFBR0ssSUFBSyxJQUFHSyxLQUFNLE1BQXJEO0FBQ0EsU0FBS0gsS0FBTCxDQUFXVSxNQUFYLEVBQW1CTixPQUFuQjtBQUNEOztBQUVEOzs7O0FBSUFPLFFBQU1ULElBQU4sRUFBaUI7QUFDZixTQUFLRCxHQUFMLENBQVNDLElBQVQsRUFBZSxPQUFmO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FVLE9BQUtWLElBQUwsRUFBZ0I7QUFDZCxTQUFLRCxHQUFMLENBQVNDLElBQVQsRUFBZSxNQUFmO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FXLE9BQUtYLElBQUwsRUFBZ0I7QUFDZCxTQUFLRCxHQUFMLENBQVNDLElBQVQsRUFBZSxNQUFmO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FZLFVBQVFaLElBQVIsRUFBbUI7QUFDakIsU0FBS0QsR0FBTCxDQUFTQyxJQUFULEVBQWUsU0FBZjtBQUNEOztBQUVEOzs7O0FBSUFKLE9BQUtBLElBQUwsRUFBbUM7QUFDakMsVUFBTU4sU0FBb0M7QUFDeENDLGFBQU8sS0FBS0QsTUFBTCxDQUFZQyxLQURxQjtBQUV4Q0ssVUFGd0MsRUFBMUM7O0FBSUEsV0FBTyxJQUFJUixNQUFKLENBQVdFLE1BQVgsQ0FBUDtBQUNELEdBMUY0QyxDLGtCQUExQkYsTSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB0eXBlIHsgTGV2ZWwgfSBmcm9tICcuL2ludGVyZmFjZXMvSUxvZ2dlcic7XG5pbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lMb2dnZXInO1xuaW1wb3J0IHsgSUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lMb2dnZXJDb25zdHJ1Y3RvclBhcmFtcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2dlciBpbXBsZW1lbnRzIElMb2dnZXIge1xuICBwYXJhbXM6IElMb2dnZXJDb25zdHJ1Y3RvclBhcmFtcztcbiAgZGVidWc6IGRlYnVnO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogP0lMb2dnZXJDb25zdHJ1Y3RvclBhcmFtcykge1xuICAgIGNvbnN0IHNjb3BlID0gcHJvY2Vzcy5lbnYuTE9HX1NDT1BFIHx8ICdkZWZhdWx0JztcbiAgICBpZiAoXy5pc05pbChwYXJhbXMpKSB7XG4gICAgICB0aGlzLnBhcmFtcyA9IHtcbiAgICAgICAgc2NvcGUsXG4gICAgICAgIHRhZ3M6IFsnJ10sXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhcmFtcyA9IF8ubWVyZ2UodGhpcy5wYXJhbXMsIHBhcmFtcyk7XG4gICAgICB0aGlzLnBhcmFtcy5zY29wZSA9IF8uaXNOaWwodGhpcy5wYXJhbXMuc2NvcGUpID8gc2NvcGUgOiB0aGlzLnBhcmFtcy5zY29wZTtcbiAgICAgIHRoaXMucGFyYW1zLnNjb3BlID0gdGhpcy5wYXJhbXMuc2NvcGUgfHwgJ2RlZmF1bHQnO1xuICAgIH1cbiAgICB0aGlzLmRlYnVnID0gZGVidWcodGhpcy5wYXJhbXMuc2NvcGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgZXJyb3IgbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhbmQgZXJyb3Igb2JqZWN0LlxuICAgKiBAcGFyYW0gbGV2ZWwgY2FuIGJlICdlcnJvcicsICd3YXJuJywgJ2luZm8nLCAndmVyYm9zZSdcbiAgICovXG4gIGxvZyhib2R5OiBhbnksIGxldmVsOiBMZXZlbCA9ICd2ZXJib3NlJykge1xuICAgIGxldCBwYXlsb2FkID0ge307XG4gICAgaWYgKHR5cGVvZiB0aGlzLnBhcmFtcy5zY29wZSAhPT0gJ3N0cmluZycpIHRoaXMucGFyYW1zLnNjb3BlID0gJ2RlZmF1bHQnO1xuICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHBheWxvYWQgPSBfLm1lcmdlKGJvZHksIHtcbiAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHtcbiAgICAgICAgbWVzc2FnZTogYm9keSxcbiAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gdGhpcyBpcyBzbyB0aGF0IGl0IHdpbGwgYmUgZWFzaWVyIHRvIHF1ZXJ5IG9uIHRoZSBiYWNrZW5kIGllLiBsb2dnbHkgb3IgZWxhc3RpYyBzZWFyY2guXG4gICAgY29uc3QgdGFncyA9IHRoaXMucGFyYW1zLnRhZ3MgIT0gbnVsbCAmJiBfLmlzQXJyYXkodGhpcy5wYXJhbXMudGFncykgPyB0aGlzLnBhcmFtcy50YWdzLmpvaW4oKSA6ICd1bnRhZ2dlZCc7XG4gICAgY29uc3Qgb3V0cHV0ID0gYCR7dGhpcy5wYXJhbXMuc2NvcGV9OiR7dGFnc306JHtsZXZlbH0gJWp9YDtcbiAgICB0aGlzLmRlYnVnKG91dHB1dCwgcGF5bG9hZCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCBlcnJvciBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGFuZCBlcnJvciBvYmplY3QuXG4gICAqL1xuICBlcnJvcihib2R5OiBhbnkpIHtcbiAgICB0aGlzLmxvZyhib2R5LCAnZXJyb3InKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IGVycm9yIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYSB3YXJuaW5nIG9iamVjdC4gcHJlZmVyYWJseSB3aXRoIGEgbWVzc2FnZSBmaWVsZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHkubWVzc2FnZTogYSBtZXNzYWdlIHRvIGJlIGluZ2VzdGVkIGJ5IGxvZyBzZXJ2ZXIuXG4gICAqL1xuICB3YXJuKGJvZHk6IGFueSkge1xuICAgIHRoaXMubG9nKGJvZHksICd3YXJuJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCBlcnJvciBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGEgd2FybmluZyBvYmplY3QuIHByZWZlcmFibHkgd2l0aCBhIG1lc3NhZ2UgZmllbGQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5Lm1lc3NhZ2U6IGEgbWVzc2FnZSB0byBiZSBpbmdlc3RlZCBieSBsb2cgc2VydmVyLlxuICAgKi9cbiAgaW5mbyhib2R5OiBhbnkpIHtcbiAgICB0aGlzLmxvZyhib2R5LCAnaW5mbycpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgZXJyb3IgbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhIHdhcm5pbmcgb2JqZWN0LiBwcmVmZXJhYmx5IHdpdGggYSBtZXNzYWdlIGZpZWxkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keS5tZXNzYWdlOiBhIG1lc3NhZ2UgdG8gYmUgaW5nZXN0ZWQgYnkgbG9nIHNlcnZlci5cbiAgICovXG4gIHZlcmJvc2UoYm9keTogYW55KSB7XG4gICAgdGhpcy5sb2coYm9keSwgJ3ZlcmJvc2UnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBsb2dnZXIgd2l0aCBhIGRpZmZlcmVudCBzZXQgb2YgdGFncyBidXQgd2l0aCB0aGUgc2FtZSBzY29wZSBhcyB0aGUgb3JpZ2luYWwuXG4gICAqIEBwYXJhbSB0YWdzXG4gICAqL1xuICB0YWdzKHRhZ3M6ID9BcnJheTxzdHJpbmc+KTogTG9nZ2VyIHtcbiAgICBjb25zdCBwYXJhbXMgOiBJTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXMgPSB7XG4gICAgICBzY29wZTogdGhpcy5wYXJhbXMuc2NvcGUsXG4gICAgICB0YWdzLFxuICAgIH07XG4gICAgcmV0dXJuIG5ldyBMb2dnZXIocGFyYW1zKTtcbiAgfVxufVxuIl19