# Initialization
### Environment Variables:

Environment Variable | Description
--- | ---
`LOG_SCOPE=myscope` | Sets the scope of the log.
`LOG_NOTIMESTAMP=1` | Turns off timestamp on object.
`LOG_NOPID=1` | Turns off pid on object.
`LOG_NOHOSTNAME=1` | Turns off hostname on object.

Environment variables are read only during object instantiation. If you're using
static calls, then you'll be reading system data all the time.

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
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:error {"message":"some error string","timestamp":"2017-07-12T08:54:49.393Z","pid":75589,"hostname":"web1.highoutput.io"}

logger.warn({message: 'hello'});
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:warn {"message":"hello","timestamp":"2017-07-12T08:54:49.393Z","pid":75589,"hostname":"web1.highoutput.io"}

logger.warn('hello');
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:warn {"message":"hello","timestamp":"2017-07-12T08:54:49.393Z","pid":75589,"hostname":"web1.highoutput.io"}

logger.info({message: 'hello'});
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:info {"message":"hello","timestamp":"2017-07-12T08:54:49.393Z","pid":75589,"hostname":"web1.highoutput.io"}

logger.info('hello');
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:info {"message":"hello","timestamp":"2017-07-12T08:54:49.393Z","pid":75589,"hostname":"web1.highoutput.io"}

logger.verbose({message: 'hello'});
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:verbose {"verbose":"hello","timestamp":"2017-07-12T08:54:49.393Z","pid":75589,"hostname":"web1.highoutput.io"}

export LOG_NOTIMESTAMP=1
logger.verbose({message: 'hello'});
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:verbose {"verbose":"hello"}
```

```js
export LOG_NOTIMESTAMP=1
export LOG_NOPID=1
export LOG_NOHOSTNAME=1
logger.tags(['controller','some']).info({message: 'hello'});
// Wed, 12 Jul 2017 07:51:09 GMT default:controller,some:verbose {"verbose":"hello","pid":75589,"hostname":"web1.highoutput.io"}

logger.tags(['model']).info({message: 'hello'});
```