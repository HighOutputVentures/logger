# Initialization
### Environment Variables:

Environment Variable | Description
--- | ---
`LOG_SCOPE=myscope` | Sets the scope of the log.
`LOG_NOTIMESTAMP=1` | Turns off timestamp on object.

### Usage

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
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:error {"message":"some error string","timestamp":"2017-07-12T07:51:09.390Z"}

logger.warn({message: 'hello'});
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:warn {"message":"hello","timestamp":"2017-07-12T07:51:09.390Z"}

logger.warn('hello');
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:warn {"message":"hello","timestamp":"2017-07-12T07:51:09.390Z"}

logger.info({message: 'hello'});
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:info {"message":"hello","timestamp":"2017-07-12T07:51:09.390Z"}

logger.info('hello');
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:info {"message":"hello","timestamp":"2017-07-12T07:51:09.390Z"}

logger.verbose({message: 'hello'});
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:verbose {"verbose":"hello","timestamp":"2017-07-12T07:51:09.390Z"}

export LOG_NOTIMESTAMP=1
logger.verbose({message: 'hello'});
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:verbose {"verbose":"hello"}
```

```js
logger.tags(['controller','some']).info({message: 'hello'});
// Wed, 12 Jul 2017 07:51:09 GMT default:controller,some:verbose {"verbose":"hello"}

logger.tags(['model']).info({message: 'hello'});
```