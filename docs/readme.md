## Logger

A wrapper on top of the [`debug` npm package](https://www.npmjs.com/package/debug). 

You will need to expose the `stdout` by setting the DEBUG environment variable on the running nodejs process. 

If you have a `LOG_SCOPE` of `myscope`, then you can expose the `stdout` by setting `DEBUG=myscope*`. You can further filter out by using `DEBUG="some_scope*tag2*"` environment variable when you want to show all logs that begin with `some_scope` and then also contains `tag2` as tag. Exlcusion can also work by setting `DEBUG="some_scope*tag2*,-*verbose"`, which means logs that are `verbose` are not pushed to `stdout`.

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
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:error {"body":{"message":"some error string"},"timestamp":"2017-07-12T08:54:49.393Z","pid":75589,"hostname":"web1.highoutput.io"}

logger.warn({message: 'hello'});
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:warn {"body":{"message":"hello"},"timestamp":"2017-07-12T08:54:49.393Z","pid":75589,"hostname":"web1.highoutput.io"}

logger.warn('hello');
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:warn {"body":{"message":"hello"},"timestamp":"2017-07-12T08:54:49.393Z","pid":75589,"hostname":"web1.highoutput.io"}

logger.info({message: 'hello'});
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:info {"body":{"message":"hello"},"timestamp":"2017-07-12T08:54:49.393Z","pid":75589,"hostname":"web1.highoutput.io"}

logger.info('hello');
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:info {"body":{"message":"hello"},"timestamp":"2017-07-12T08:54:49.393Z","pid":75589,"hostname":"web1.highoutput.io"}

logger.verbose({message: 'hello'});
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:verbose {"body":{"message":"hello"},"timestamp":"2017-07-12T08:54:49.393Z","pid":75589,"hostname":"web1.highoutput.io"}

// export LOG_NOTIMESTAMP=1
// export LOG_NOPID=1
// export LOG_NOHOSTNAME=1
logger.verbose({message: 'hello'});
// Wed, 12 Jul 2017 07:51:09 GMT default:untagged:verbose {"body":{"message":"hello"}}
```

Adding tags on top of existing tags.

```js
// export LOG_NOTIMESTAMP=1
// export LOG_NOPID=1
// export LOG_NOHOSTNAME=1
logger.tags(['controller','some']).info({message: 'hello'});
// Wed, 12 Jul 2017 07:51:09 GMT default:controller,some:verbose {"body":{"message":"hello"}}
```

### Sink Integration

One of the sinks for this is LogStash.

#### Log Stash base configuration

```
node -> logstash -> loggly
```

In order to integrate with Logstash the **base** input configuration is as follows for PM2:

```
input {
   file{
      path => "<path_to_pm2_logs>"
      start_position => beginning
   }
}
filter {
    grok {
        match => {
            "message" => "%{DAY:day}, %{MONTHDAY:monthday} %{MONTH:month} %{YEAR:year} %{TIME:time} %{WORD:timezone} %{WORD:scope}:%{DATA:scope_tags}:%{WORD:level} %{GREEDYDATA:json_data}"
        }
    }
    mutate {
        split => { "scope_tags" => "," }
    }
    json {
        source => "json_data"
        target => "payload"
    }
}
output {
    loggly {
        key => "<key>"
        tag => "logstash"
        host => "logs-01.loggly.com"
        proto => "https"
    }
}
```

You may need to modify a few things depending on your setup:

* **input** - This will vary depending on you `devops` inftrastructure. You can also read from a file.
* **output** - The current sink is loggly. You may add other sinks.
* **output.loggly.key** - This is the [loggly customer token](https://www.loggly.com/docs/customer-token-authentication-token/).
* **filter.grok.match.message** - If you're reading from a file, or using PM2, they may append/prepend additional data to the log lines.

For testing purposes a very simple logstash Dockerfile can be downloaded from [here](https://hub.docker.com/r/bangonkali/docker-node/tags/).