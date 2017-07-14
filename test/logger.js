// @flow
import test from 'ava';
import intercept from 'intercept-stdout';
import Logger from '../src/index';

test.before('before', () => {
  process.env.DEBUG = '*,-ava,-babel,-istanbuljs';
});

test('constructor', (t) => {
  const params: ILoggerConstructorParams = { };
  params.scope = 'scope';
  params.tags = ['tag1', 'tag2'];
  const logger = new Logger(params);
  t.is(logger.params.scope, params.scope);
});

test('constructor using string', (t) => {
  const logger = new Logger('scope');
  t.is(logger.params.scope, 'scope');
});

test('error debug', (t) => {
  let text: string = '';
  const unhookIntercept = intercept((txt) => {
    text += `hooked: ${txt}`;
  });
  const params: ILoggerConstructorParams = { };
  params.scope = 'some_scope';
  params.tags = ['tag1', 'tag2'];
  const logger = new Logger(params);
  logger.error({ data: 'data', array: ['1', { d: 'data' }] });
  t.is(logger.params.scope, params.scope);
  unhookIntercept();
  t.is(text.includes('some_scope:tag1,tag2:error {"body":{"data":"data","array":["1",{"d":"data"}]'), true);

  t.is(text.includes('"timestamp":'), true);
  t.is(text.includes('"pid":'), true);
  t.is(text.includes('"hostname":'), true);
});

test('error debug - static call', (t) => {
  let text: string = '';
  const unhookIntercept = intercept((txt) => {
    text += `hooked: ${txt}`;
  });
  Logger.error({ data: 'data', array: ['1', { d: 'data' }] });
  unhookIntercept();
  t.is(text.includes('default:untagged:error {"body":{"data":"data","array":["1",{"d":"data"}]},"timestamp":'), true);

  t.is(text.includes('"timestamp":'), true);
  t.is(text.includes('"pid":'), true);
  t.is(text.includes('"hostname":'), true);
});

test('error string - static call', (t) => {
  let text: string = '';
  const unhookIntercept = intercept((txt) => {
    text += `hooked: ${txt}`;
  });
  Logger.error('some error string');
  unhookIntercept();
  t.is(text.includes('default:untagged:error {"body":{"message":"some error string"'), true);

  t.is(text.includes('"timestamp":'), true);
  t.is(text.includes('"pid":'), true);
  t.is(text.includes('"hostname":'), true);
});

test('error with no scope', (t) => {
  let text: string = '';
  const unhookIntercept = intercept((txt) => {
    text += `hooked: ${txt}`;
  });
  const params: ILoggerConstructorParams = { };
  params.tags = ['tag1', 'tag2'];
  const logger = new Logger(params);
  logger.error({ data: 'data', array: ['1', { d: 'data' }] });
  t.is(logger.params.scope, 'default');
  unhookIntercept();
  t.is(text.includes('default:tag1,tag2:error {"body":{"data":"data","array":["1",{"d":"data"}]},"timestamp":'), true);

  t.is(text.includes('"timestamp":'), true);
  t.is(text.includes('"pid":'), true);
  t.is(text.includes('"hostname":'), true);
});

test('error with null scope', (t) => {
  let text: string = '';
  const unhookIntercept = intercept((txt) => {
    text += `hooked: ${txt}`;
  });
  const params: ILoggerConstructorParams = { };
  params.scope = null;
  params.tags = ['tag1', 'tag2'];
  const logger = new Logger(params);
  logger.error({ data: 'data', array: ['1', { d: 'data' }] });
  t.is(logger.params.scope, 'default');
  unhookIntercept();
  t.is(text.includes('default:tag1,tag2:error {"body":{"data":"data","array":["1",{"d":"data"}]},"timestamp":'), true);

  t.is(text.includes('"timestamp":'), true);
  t.is(text.includes('"pid":'), true);
  t.is(text.includes('"hostname":'), true);
});

test('error with no scope but using env var', (t) => {
  process.env.LOG_SCOPE = 'envar_scope';
  let text: string = '';
  const unhookIntercept = intercept((txt) => {
    text += `hooked: ${txt}`;
  });
  const params: ILoggerConstructorParams = { };
  params.tags = ['tag1', 'tag2'];
  const logger = new Logger(params);
  logger.error({ data: 'data', array: ['1', { d: 'data' }] });
  t.is(logger.params.scope, process.env.LOG_SCOPE);
  unhookIntercept();

  const testString = 'envar_scope:tag1,tag2:error {"body":{"data":"data","array":["1",{"d":"data"}]},"timestamp":';
  t.is(text.includes(testString), true);

  t.is(text.includes('"timestamp":'), true);
  t.is(text.includes('"pid":'), true);
  t.is(text.includes('"hostname":'), true);
});

test('error with no scope and no tag but using env var - the untagged tag is embedded for easy query', (t) => {
  process.env.LOG_SCOPE = 'envar_scope';
  let text: string = '';
  const unhookIntercept = intercept((txt) => {
    text += `hooked: ${txt}`;
  });
  const params: ILoggerConstructorParams = { };
  const logger = new Logger(params);
  logger.error({ data: 'data', array: ['1', { d: 'data' }] });
  t.is(logger.params.scope, process.env.LOG_SCOPE);
  unhookIntercept();
  t.is(text.includes('envar_scope:untagged:error {"body":{"data":"data","array":["1",{"d":"data"}]},"timestamp":'), true);

  t.is(text.includes('"timestamp":'), true);
  t.is(text.includes('"pid":'), true);
  t.is(text.includes('"hostname":'), true);
});

test('error with no scope and no tag but using env var - string param', (t) => {
  process.env.LOG_SCOPE = 'envar_scope';
  let text: string = '';
  const unhookIntercept = intercept((txt) => {
    text += `hooked: ${txt}`;
  });
  const params: ILoggerConstructorParams = { };
  const logger = new Logger(params);
  logger.error('some message');
  t.is(logger.params.scope, process.env.LOG_SCOPE);
  unhookIntercept();
  t.is(text.includes('envar_scope:untagged:error {"body":{"message":"some message"'), true);

  t.is(text.includes('"timestamp":'), true);
  t.is(text.includes('"pid":'), true);
  t.is(text.includes('"hostname":'), true);
});

test('adding tags to new log', (t) => {
  const loggerTaggedParams = {};
  loggerTaggedParams.scope = 'myscope';
  loggerTaggedParams.tags = ['a', 'b', 'c'];
  const loggerTagged = new Logger(loggerTaggedParams);
  let anotherTagText: string = '';
  const anotherTagUnhook = intercept((txt) => {
    anotherTagText += `hooked: ${txt}`;
  });
  loggerTagged.tags(['c', 'd', 'e']).error('some message');
  anotherTagUnhook();
  t.is(anotherTagText.includes('myscope:a,b,c,d,e:error {"body":{"message":"some message"'), true);
  t.is(anotherTagText.includes('"timestamp":'), true);
  t.is(anotherTagText.includes('"pid":'), true);
  t.is(anotherTagText.includes('"hostname":'), true);
});

test('changing tags', (t) => {
  process.env.LOG_SCOPE = 'envar_scope';
  let text: string = '';
  const unhookIntercept = intercept((txt) => {
    text += `hooked: ${txt}`;
  });
  const params: ILoggerConstructorParams = { };
  const logger = new Logger(params);
  logger.tags(['newtag', 'tag2']).error('some message');
  t.is(logger.params.scope, process.env.LOG_SCOPE);
  unhookIntercept();
  t.is(text.includes('envar_scope:newtag,tag2:error {"body":{"message":"some message"'), true);

  t.is(text.includes('"timestamp":'), true);
  t.is(text.includes('"pid":'), true);
  t.is(text.includes('"hostname":'), true);

  let originalTagText: string = '';
  const originalTagUnhookIntercept = intercept((txt) => {
    originalTagText += `hooked: ${txt}`;
  });
  logger.error('some message');
  t.is(logger.params.scope, process.env.LOG_SCOPE);
  originalTagUnhookIntercept();
  t.is(originalTagText.includes('envar_scope:untagged:error {"body":{"message":"some message"'), true);
  t.is(originalTagText.includes('"timestamp":'), true);
  t.is(originalTagText.includes('"pid":'), true);
  t.is(originalTagText.includes('"hostname":'), true);
});

test('no timestamps', (t) => {
  process.env.LOG_SCOPE = 'envar_scope';
  process.env.LOG_NOTIMESTAMP = '1';
  process.env.LOG_NOPID = '1';
  process.env.LOG_NOHOSTNAME = '1';
  let text: string = '';
  const unhookIntercept = intercept((txt) => {
    text += `hooked: ${txt}`;
  });
  const params: ILoggerConstructorParams = { };
  const logger = new Logger(params);
  logger.tags(['newtag', 'tag2']).error('some message');
  t.is(logger.params.scope, process.env.LOG_SCOPE);
  unhookIntercept();
  t.is(text.includes('envar_scope:newtag,tag2:error {"body":{"message":"some message"'), true);

  t.is(text.includes('"timestamp":'), false);
  t.is(text.includes('"pid":'), false);
  t.is(text.includes('"hostname":'), false);
});

test('error upon throw', (t) => {
  process.env.LOG_SCOPE = 'envar_scope';
  process.env.LOG_NOTIMESTAMP = '0';
  process.env.LOG_NOPID = '0';
  process.env.LOG_NOHOSTNAME = '0';
  let text: string = '';
  const unhookIntercept = intercept((txt) => {
    text += `hooked: ${txt}`;
  });
  const params: ILoggerConstructorParams = { };
  const logger = new Logger(params);

  try {
    throw new Error('some error message');
  } catch (error) {
    logger.tags(['newtag', 'tag2']).error(error);
  }
  unhookIntercept();
  t.is(text.includes('envar_scope:newtag,tag2:error {"body":{"message":"Error: some error message'), true);
  t.is(text.includes('"timestamp":'), true);
  t.is(text.includes('"pid":'), true);
  t.is(text.includes('"hostname":'), true);
});
