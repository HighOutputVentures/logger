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
      payload = _lodash2.default.merge(body, { timestamp: new Date() });
    } else if (typeof body === 'string') {
      payload = _lodash2.default.merge(payload, { message: body, timestamp: new Date() });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMb2dnZXIiLCJjb25zdHJ1Y3RvciIsInBhcmFtcyIsInNjb3BlIiwicHJvY2VzcyIsImVudiIsIkxPR19TQ09QRSIsImlzTmlsIiwidGFncyIsIm1lcmdlIiwibG9nIiwiYm9keSIsImxldmVsIiwicGF5bG9hZCIsInRpbWVzdGFtcCIsIkRhdGUiLCJtZXNzYWdlIiwiaXNBcnJheSIsImpvaW4iLCJkIiwiZXJyb3IiLCJ3YXJuIiwiaW5mbyIsInZlcmJvc2UiLCJsb2dnZXIiXSwibWFwcGluZ3MiOiI7QUFDQSw4QjtBQUNBLGdDOztBQUVBO0FBQ0EsaUY7O0FBRWUsTUFBTUEsTUFBTixDQUFnQzs7OztBQUk3Q0MsY0FBWUMsTUFBWixFQUErQztBQUM3QyxVQUFNQyxRQUFRQyxRQUFRQyxHQUFSLENBQVlDLFNBQVosSUFBeUIsU0FBdkM7QUFDQSxRQUFJLGlCQUFFQyxLQUFGLENBQVFMLE1BQVIsQ0FBSixFQUFxQjtBQUNuQixXQUFLQSxNQUFMLEdBQWM7QUFDWkMsYUFEWTtBQUVaSyxjQUFNLENBQUMsRUFBRCxDQUZNLEVBQWQ7O0FBSUQsS0FMRCxNQUtPO0FBQ0wsV0FBS04sTUFBTCxHQUFjLGlCQUFFTyxLQUFGLENBQVEsS0FBS1AsTUFBYixFQUFxQkEsTUFBckIsQ0FBZDtBQUNBLFdBQUtBLE1BQUwsQ0FBWUMsS0FBWixHQUFvQixpQkFBRUksS0FBRixDQUFRLEtBQUtMLE1BQUwsQ0FBWUMsS0FBcEIsSUFBNkJBLEtBQTdCLEdBQXFDLEtBQUtELE1BQUwsQ0FBWUMsS0FBckU7QUFDQSxXQUFLRCxNQUFMLENBQVlDLEtBQVosR0FBb0IsS0FBS0QsTUFBTCxDQUFZQyxLQUFaLElBQXFCLFNBQXpDO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7QUFLQU8sTUFBSUMsSUFBSixFQUFlQyxRQUFlLFNBQTlCLEVBQXlDO0FBQ3ZDLFFBQUlDLFVBQVUsRUFBZDtBQUNBLFFBQUksT0FBTyxLQUFLWCxNQUFMLENBQVlDLEtBQW5CLEtBQTZCLFFBQWpDLEVBQTJDLEtBQUtELE1BQUwsQ0FBWUMsS0FBWixHQUFvQixTQUFwQjtBQUMzQyxRQUFJLE9BQU9RLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDNUJFLGdCQUFVLGlCQUFFSixLQUFGLENBQVFFLElBQVIsRUFBYyxFQUFFRyxXQUFXLElBQUlDLElBQUosRUFBYixFQUFkLENBQVY7QUFDRCxLQUZELE1BRU8sSUFBSSxPQUFPSixJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQ25DRSxnQkFBVSxpQkFBRUosS0FBRixDQUFRSSxPQUFSLEVBQWlCLEVBQUVHLFNBQVNMLElBQVgsRUFBaUJHLFdBQVcsSUFBSUMsSUFBSixFQUE1QixFQUFqQixDQUFWO0FBQ0QsS0FGTSxNQUVBO0FBQ0w7QUFDRDtBQUNEO0FBQ0EsVUFBTVAsT0FBTyxLQUFLTixNQUFMLENBQVlNLElBQVosSUFBb0IsSUFBcEIsSUFBNEIsaUJBQUVTLE9BQUYsQ0FBVSxLQUFLZixNQUFMLENBQVlNLElBQXRCLENBQTVCLEdBQTBELEtBQUtOLE1BQUwsQ0FBWU0sSUFBWixDQUFpQlUsSUFBakIsRUFBMUQsR0FBb0YsVUFBakc7QUFDQSxVQUFNQyxJQUFJLHFCQUFPLEdBQUUsS0FBS2pCLE1BQUwsQ0FBWUMsS0FBTSxJQUFHSyxTQUFTLEVBQVQsR0FBYyxVQUFkLEdBQTJCQSxJQUFLLElBQUdJLEtBQU0sRUFBdkUsQ0FBVjtBQUNBTyxNQUFFLElBQUYsRUFBUU4sT0FBUjtBQUNEOztBQUVEOzs7O0FBSUFPLFFBQU1ULElBQU4sRUFBaUI7QUFDZixTQUFLRCxHQUFMLENBQVNDLElBQVQsRUFBZSxPQUFmO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FVLE9BQUtWLElBQUwsRUFBZ0I7QUFDZCxTQUFLRCxHQUFMLENBQVNDLElBQVQsRUFBZSxNQUFmO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FXLE9BQUtYLElBQUwsRUFBZ0I7QUFDZCxTQUFLRCxHQUFMLENBQVNDLElBQVQsRUFBZSxNQUFmO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FZLFVBQVFaLElBQVIsRUFBbUI7QUFDakIsU0FBS0QsR0FBTCxDQUFTQyxJQUFULEVBQWUsU0FBZjtBQUNEOztBQUVEOzs7O0FBSUFILE9BQUtBLElBQUwsRUFBbUM7QUFDakMsVUFBTU4sU0FBb0M7QUFDeENDLGFBQU8sS0FBS0QsTUFBTCxDQUFZQyxLQURxQjtBQUV4Q0ssVUFGd0MsRUFBMUM7O0FBSUEsV0FBTyxJQUFJUixNQUFKLENBQVdFLE1BQVgsQ0FBUDtBQUNEOztBQUVELFNBQU9RLEdBQVAsQ0FBV0MsSUFBWCxFQUFzQkMsUUFBZSxTQUFyQyxFQUFnRDtBQUM5QyxVQUFNWSxTQUFTLElBQUl4QixNQUFKLEVBQWY7QUFDQXdCLFdBQU9kLEdBQVAsQ0FBV0MsSUFBWCxFQUFpQkMsS0FBakI7QUFDRDs7QUFFRCxTQUFPUSxLQUFQLENBQWFULElBQWIsRUFBd0I7QUFDdEIsVUFBTWEsU0FBUyxJQUFJeEIsTUFBSixFQUFmO0FBQ0F3QixXQUFPSixLQUFQLENBQWFULElBQWI7QUFDRDs7QUFFRCxTQUFPVSxJQUFQLENBQVlWLElBQVosRUFBdUI7QUFDckIsVUFBTWEsU0FBUyxJQUFJeEIsTUFBSixFQUFmO0FBQ0F3QixXQUFPSCxJQUFQLENBQVlWLElBQVo7QUFDRDs7QUFFRCxTQUFPVyxJQUFQLENBQVlYLElBQVosRUFBdUI7QUFDckIsVUFBTWEsU0FBUyxJQUFJeEIsTUFBSixFQUFmO0FBQ0F3QixXQUFPRixJQUFQLENBQVlYLElBQVo7QUFDRDs7QUFFRCxTQUFPWSxPQUFQLENBQWVaLElBQWYsRUFBMEI7QUFDeEIsVUFBTWEsU0FBUyxJQUFJeEIsTUFBSixFQUFmO0FBQ0F3QixXQUFPRCxPQUFQLENBQWVaLElBQWY7QUFDRCxHQTdHNEMsQyxrQkFBMUJYLE0iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgdHlwZSB7IExldmVsIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lMb2dnZXInO1xuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4vaW50ZXJmYWNlcy9JTG9nZ2VyJztcbmltcG9ydCB7IElMb2dnZXJDb25zdHJ1Y3RvclBhcmFtcyB9IGZyb20gJy4vaW50ZXJmYWNlcy9JTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dnZXIgaW1wbGVtZW50cyBJTG9nZ2VyIHtcbiAgcGFyYW1zOiBJTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXM7XG4gIGRlYnVnOiBkZWJ1ZztcblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6ID9JTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXMpIHtcbiAgICBjb25zdCBzY29wZSA9IHByb2Nlc3MuZW52LkxPR19TQ09QRSB8fCAnZGVmYXVsdCc7XG4gICAgaWYgKF8uaXNOaWwocGFyYW1zKSkge1xuICAgICAgdGhpcy5wYXJhbXMgPSB7XG4gICAgICAgIHNjb3BlLFxuICAgICAgICB0YWdzOiBbJyddLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXJhbXMgPSBfLm1lcmdlKHRoaXMucGFyYW1zLCBwYXJhbXMpO1xuICAgICAgdGhpcy5wYXJhbXMuc2NvcGUgPSBfLmlzTmlsKHRoaXMucGFyYW1zLnNjb3BlKSA/IHNjb3BlIDogdGhpcy5wYXJhbXMuc2NvcGU7XG4gICAgICB0aGlzLnBhcmFtcy5zY29wZSA9IHRoaXMucGFyYW1zLnNjb3BlIHx8ICdkZWZhdWx0JztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCBlcnJvciBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGFuZCBlcnJvciBvYmplY3QuXG4gICAqIEBwYXJhbSBsZXZlbCBjYW4gYmUgJ2Vycm9yJywgJ3dhcm4nLCAnaW5mbycsICd2ZXJib3NlJ1xuICAgKi9cbiAgbG9nKGJvZHk6IGFueSwgbGV2ZWw6IExldmVsID0gJ3ZlcmJvc2UnKSB7XG4gICAgbGV0IHBheWxvYWQgPSB7fTtcbiAgICBpZiAodHlwZW9mIHRoaXMucGFyYW1zLnNjb3BlICE9PSAnc3RyaW5nJykgdGhpcy5wYXJhbXMuc2NvcGUgPSAnZGVmYXVsdCc7XG4gICAgaWYgKHR5cGVvZiBib2R5ID09PSAnb2JqZWN0Jykge1xuICAgICAgcGF5bG9hZCA9IF8ubWVyZ2UoYm9keSwgeyB0aW1lc3RhbXA6IG5ldyBEYXRlKCkgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHBheWxvYWQgPSBfLm1lcmdlKHBheWxvYWQsIHsgbWVzc2FnZTogYm9keSwgdGltZXN0YW1wOiBuZXcgRGF0ZSgpIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHRoaXMgaXMgc28gdGhhdCBpdCB3aWxsIGJlIGVhc2llciB0byBxdWVyeSBvbiB0aGUgYmFja2VuZCBpZS4gbG9nZ2x5IG9yIGVsYXN0aWMgc2VhcmNoLlxuICAgIGNvbnN0IHRhZ3MgPSB0aGlzLnBhcmFtcy50YWdzICE9IG51bGwgJiYgXy5pc0FycmF5KHRoaXMucGFyYW1zLnRhZ3MpID8gdGhpcy5wYXJhbXMudGFncy5qb2luKCkgOiAndW50YWdnZWQnO1xuICAgIGNvbnN0IGQgPSBkZWJ1ZyhgJHt0aGlzLnBhcmFtcy5zY29wZX06JHt0YWdzID09PSAnJyA/ICd1bnRhZ2dlZCcgOiB0YWdzfToke2xldmVsfWApO1xuICAgIGQoJyVqJywgcGF5bG9hZCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCBlcnJvciBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGFuZCBlcnJvciBvYmplY3QuXG4gICAqL1xuICBlcnJvcihib2R5OiBhbnkpIHtcbiAgICB0aGlzLmxvZyhib2R5LCAnZXJyb3InKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVidWcgb3V0cHV0IGF0IHdhcm4gbGV2ZWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5OiBhIHdhcm5pbmcgb2JqZWN0LiBwcmVmZXJhYmx5IHdpdGggYSBtZXNzYWdlIGZpZWxkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keS5tZXNzYWdlOiBhIG1lc3NhZ2UgdG8gYmUgaW5nZXN0ZWQgYnkgbG9nIHNlcnZlci4gb3B0aW9uYWwuXG4gICAqL1xuICB3YXJuKGJvZHk6IGFueSkge1xuICAgIHRoaXMubG9nKGJvZHksICd3YXJuJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlYnVnIG91dHB1dCBhdCBpbmZvIGxldmVsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keTogYSB3YXJuaW5nIG9iamVjdC4gcHJlZmVyYWJseSB3aXRoIGEgbWVzc2FnZSBmaWVsZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHkubWVzc2FnZTogYSBtZXNzYWdlIHRvIGJlIGluZ2VzdGVkIGJ5IGxvZyBzZXJ2ZXIuIG9wdGlvbmFsLlxuICAgKi9cbiAgaW5mbyhib2R5OiBhbnkpIHtcbiAgICB0aGlzLmxvZyhib2R5LCAnaW5mbycpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWJ1ZyBvdXRwdXQgYXQgdmVyYm9zZSBsZXZlbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJvZHk6IGEgd2FybmluZyBvYmplY3QuIHByZWZlcmFibHkgd2l0aCBhIG1lc3NhZ2UgZmllbGQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBib2R5Lm1lc3NhZ2U6IGEgbWVzc2FnZSB0byBiZSBpbmdlc3RlZCBieSBsb2cgc2VydmVyLiBvcHRpb25hbC5cbiAgICovXG4gIHZlcmJvc2UoYm9keTogYW55KSB7XG4gICAgdGhpcy5sb2coYm9keSwgJ3ZlcmJvc2UnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBsb2dnZXIgd2l0aCBhIGRpZmZlcmVudCBzZXQgb2YgdGFncyBidXQgd2l0aCB0aGUgc2FtZSBzY29wZSBhcyB0aGUgb3JpZ2luYWwuXG4gICAqIEBwYXJhbSB0YWdzXG4gICAqL1xuICB0YWdzKHRhZ3M6ID9BcnJheTxzdHJpbmc+KTogTG9nZ2VyIHtcbiAgICBjb25zdCBwYXJhbXMgOiBJTG9nZ2VyQ29uc3RydWN0b3JQYXJhbXMgPSB7XG4gICAgICBzY29wZTogdGhpcy5wYXJhbXMuc2NvcGUsXG4gICAgICB0YWdzLFxuICAgIH07XG4gICAgcmV0dXJuIG5ldyBMb2dnZXIocGFyYW1zKTtcbiAgfVxuXG4gIHN0YXRpYyBsb2coYm9keTogYW55LCBsZXZlbDogTGV2ZWwgPSAndmVyYm9zZScpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgbG9nZ2VyLmxvZyhib2R5LCBsZXZlbCk7XG4gIH1cblxuICBzdGF0aWMgZXJyb3IoYm9keTogYW55KSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICAgIGxvZ2dlci5lcnJvcihib2R5KTtcbiAgfVxuXG4gIHN0YXRpYyB3YXJuKGJvZHk6IGFueSkge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIud2Fybihib2R5KTtcbiAgfVxuXG4gIHN0YXRpYyBpbmZvKGJvZHk6IGFueSkge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIuaW5mbyhib2R5KTtcbiAgfVxuXG4gIHN0YXRpYyB2ZXJib3NlKGJvZHk6IGFueSkge1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgICBsb2dnZXIudmVyYm9zZShib2R5KTtcbiAgfVxufVxuIl19