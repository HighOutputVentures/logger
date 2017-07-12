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
    const output = `${this.params.scope}:${tags === '' ? 'untagged' : tags}:${level} %j}`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMb2dnZXIiLCJjb25zdHJ1Y3RvciIsInBhcmFtcyIsInNjb3BlIiwicHJvY2VzcyIsImVudiIsIkxPR19TQ09QRSIsImlzTmlsIiwidGFncyIsIm1lcmdlIiwiZGVidWciLCJsb2ciLCJib2R5IiwibGV2ZWwiLCJwYXlsb2FkIiwidGltZXN0YW1wIiwiRGF0ZSIsIm1lc3NhZ2UiLCJpc0FycmF5Iiwiam9pbiIsIm91dHB1dCIsImVycm9yIiwid2FybiIsImluZm8iLCJ2ZXJib3NlIiwibG9nZ2VyIl0sIm1hcHBpbmdzIjoiO0FBQ0EsOEI7QUFDQSxnQzs7QUFFQTtBQUNBLGlGOztBQUVlLE1BQU1BLE1BQU4sQ0FBZ0M7Ozs7QUFJN0NDLGNBQVlDLE1BQVosRUFBK0M7QUFDN0MsVUFBTUMsUUFBUUMsUUFBUUMsR0FBUixDQUFZQyxTQUFaLElBQXlCLFNBQXZDO0FBQ0EsUUFBSSxpQkFBRUMsS0FBRixDQUFRTCxNQUFSLENBQUosRUFBcUI7QUFDbkIsV0FBS0EsTUFBTCxHQUFjO0FBQ1pDLGFBRFk7QUFFWkssY0FBTSxDQUFDLEVBQUQsQ0FGTSxFQUFkOztBQUlELEtBTEQsTUFLTztBQUNMLFdBQUtOLE1BQUwsR0FBYyxpQkFBRU8sS0FBRixDQUFRLEtBQUtQLE1BQWIsRUFBcUJBLE1BQXJCLENBQWQ7QUFDQSxXQUFLQSxNQUFMLENBQVlDLEtBQVosR0FBb0IsaUJBQUVJLEtBQUYsQ0FBUSxLQUFLTCxNQUFMLENBQVlDLEtBQXBCLElBQTZCQSxLQUE3QixHQUFxQyxLQUFLRCxNQUFMLENBQVlDLEtBQXJFO0FBQ0EsV0FBS0QsTUFBTCxDQUFZQyxLQUFaLEdBQW9CLEtBQUtELE1BQUwsQ0FBWUMsS0FBWixJQUFxQixTQUF6QztBQUNEO0FBQ0QsU0FBS08sS0FBTCxHQUFhLHFCQUFNLEtBQUtSLE1BQUwsQ0FBWUMsS0FBbEIsQ0FBYjtBQUNEOztBQUVEOzs7OztBQUtBUSxNQUFJQyxJQUFKLEVBQWVDLFFBQWUs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IGZyb20gJ2RlYnVnJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgdHlwZSB7IExldmVsIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lMb2dnZXInO1xuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4vaW50ZXJmYWNlcy9JTG9nZ2VyJztcbmltcG9ydCB7IElMb2dnZXJDb25zdHJ1Y3RvclBhcmFtcyB9IGZyb20gJy4vaW50ZXJmYWNlcy9JTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dnZXIgaW1wbGVtZW50cyBJTG9nZ2VyIHtcbiAgcGFyYW1zOiBJTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXM7XG4gIGRlYnVnOiBkZWJ1ZztcblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6ID9JTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXMpIHtcbiAgICBjb25zdCBzY29wZSA9IHByb2Nlc3MuZW52LkxPR19TQ09QRSB8fCAnZGVmYXVsdCc7XG4gICAgaWYgKF8uaXNOaWwocGFyYW1zKSkge1xuICAgICAgdGhpcy5wYXJhbXMgPSB7XG4gICAgICAgIHNjb3BlLFxuICAgICAgICB0YWdzOiBbJyddLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXJhbXMgPSBfLm1lcmdlKHRoaXMucGFyYW1zLCBwYXJhbXMpO1xuICAgICAgdGhpcy5wYXJhbXMuc2NvcGUgPSBfLmlzTmlsKHRoaXMucGFyYW1zLnNjb3BlKSA/IHNjb3BlIDogdGhpcy5wYXJhbXMuc2NvcGU7XG4gICAgICB0aGlzLnBhcmFtcy5zY29wZSA9IHRoaXMucGFyYW1zLnNjb3BlIHx8ICdkZWZhdWx0JztcbiAgICB9XG4gICAgdGhpcy5kZWJ1ZyA9IGRlYnVnKHRoaXMucGFyYW1zLnNjb3BlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IGVycm9yIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYW5kIGVycm9yIG9iamVjdC5cbiAgICogQHBhcmFtIGxldmVsIGNhbiBiZSAnZXJyb3InLCAnd2FybicsICdpbmZvJywgJ3ZlcmJvc2UnXG4gICAqL1xuICBsb2coYm9keTogYW55LCBsZXZlbDogTGV2ZWwgPSAndmVyYm9zZScpIHtcbiAgICBsZXQgcGF5bG9hZCA9IHt9O1xuICAgIGlmICh0eXBlb2YgdGhpcy5wYXJhbXMuc2NvcGUgIT09ICdzdHJpbmcnKSB0aGlzLnBhcmFtcy5zY29wZSA9ICdkZWZhdWx0JztcbiAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdvYmplY3QnKSB7XG4gICAgICBwYXlsb2FkID0gXy5tZXJnZShib2R5LCB7XG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBwYXlsb2FkID0gXy5tZXJnZShwYXlsb2FkLCB7XG4gICAgICAgIG1lc3NhZ2U6IGJvZHksXG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHRoaXMgaXMgc28gdGhhdCBpdCB3aWxsIGJlIGVhc2llciB0byBxdWVyeSBvbiB0aGUgYmFja2VuZCBpZS4gbG9nZ2x5IG9yIGVsYXN0aWMgc2VhcmNoLlxuICAgIGNvbnN0IHRhZ3MgPSB0aGlzLnBhcmFtcy50YWdzICE9IG51bGwgJiYgXy5pc0FycmF5KHRoaXMucGFyYW1zLnRhZ3MpID8gdGhpcy5wYXJhbXMudGFncy5qb2luKCkgOiAndW50YWdnZWQnO1xuICAgIGNvbnN0IG91dHB1dCA9IGAke3RoaXMucGFyYW1zLnNjb3BlfToke3RhZ3MgPT09ICcnID8gJ3VudGFnZ2VkJyA6IHRhZ3N9OiR7bGV2ZWx9ICVqfWA7XG4gICAgdGhpcy5kZWJ1ZyhvdXRwdXQsIHBheWxvYWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgZXJyb3IgbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhbmQgZXJyb3Igb2JqZWN0LlxuICAgKi9cbiAgZXJyb3IoYm9keTogYW55KSB7XG4gICAgdGhpcy5sb2coYm9keSwgJ2Vycm9yJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCB3YXJuIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYSB3YXJuaW5nIG9iamVjdC4gcHJlZmVyYWJseSB3aXRoIGEgbWVzc2FnZSBmaWVsZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHkubWVzc2FnZTogYSBtZXNzYWdlIHRvIGJlIGluZ2VzdGVkIGJ5IGxvZyBzZXJ2ZXIuIG9wdGlvbmFsLlxuICAgKi9cbiAgd2Fybihib2R5OiBhbnkpIHtcbiAgICB0aGlzLmxvZyhib2R5LCAnd2FybicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgaW5mbyBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGEgd2FybmluZyBvYmplY3QuIHByZWZlcmFibHkgd2l0aCBhIG1lc3NhZ2UgZmllbGQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5Lm1lc3NhZ2U6IGEgbWVzc2FnZSB0byBiZSBpbmdlc3RlZCBieSBsb2cgc2VydmVyLiBvcHRpb25hbC5cbiAgICovXG4gIGluZm8oYm9keTogYW55KSB7XG4gICAgdGhpcy5sb2coYm9keSwgJ2luZm8nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IHZlcmJvc2UgbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhIHdhcm5pbmcgb2JqZWN0LiBwcmVmZXJhYmx5IHdpdGggYSBtZXNzYWdlIGZpZWxkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keS5tZXNzYWdlOiBhIG1lc3NhZ2UgdG8gYmUgaW5nZXN0ZWQgYnkgbG9nIHNlcnZlci4gb3B0aW9uYWwuXG4gICAqL1xuICB2ZXJib3NlKGJvZHk6IGFueSkge1xuICAgIHRoaXMubG9nKGJvZHksICd2ZXJib3NlJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbG9nZ2VyIHdpdGggYSBkaWZmZXJlbnQgc2V0IG9mIHRhZ3MgYnV0IHdpdGggdGhlIHNhbWUgc2NvcGUgYXMgdGhlIG9yaWdpbmFsLlxuICAgKiBAcGFyYW0gdGFnc1xuICAgKi9cbiAgdGFncyh0YWdzOiA/QXJyYXk8c3RyaW5nPik6IExvZ2dlciB7XG4gICAgY29uc3QgcGFyYW1zIDogSUxvZ2dlckNvbnN0cnVjdG9yUGFyYW1zID0ge1xuICAgICAgc2NvcGU6IHRoaXMucGFyYW1zLnNjb3BlLFxuICAgICAgdGFncyxcbiAgICB9O1xuICAgIHJldHVybiBuZXcgTG9nZ2VyKHBhcmFtcyk7XG4gIH1cblxuICBzdGF0aWMgbG9nKGJvZHk6IGFueSwgbGV2ZWw6IExldmVsID0gJ3ZlcmJvc2UnKSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci5sb2coYm9keSwgbGV2ZWwpO1xuICB9XG5cbiAgc3RhdGljIGVycm9yKGJvZHk6IGFueSkge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIuZXJyb3IoYm9keSk7XG4gIH1cblxuICBzdGF0aWMgd2Fybihib2R5OiBhbnkpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLndhcm4oYm9keSk7XG4gIH1cblxuICBzdGF0aWMgaW5mbyhib2R5OiBhbnkpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLmluZm8oYm9keSk7XG4gIH1cblxuICBzdGF0aWMgdmVyYm9zZShib2R5OiBhbnkpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLnZlcmJvc2UoYm9keSk7XG4gIH1cbn1cbiJdfQ==