# Initialization
Can accept `LOG_SCOPE` environment variable.
```js
const logger = new Logger();
```
```js
const logger = new Logger(scope);
```
```js
const logger = new Logger({
  scope: '',
  tags: []
});
```
```js
logger.error(err);
logger.warn({message: 'hello'});
logger.info({message: 'hello'});
logger.verbose({message: 'hello'});
```
```js
logger.tags(['controller']).info({message: 'hello'});
logger.tags(['model']).info({message: 'hello'});
```