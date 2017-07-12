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
  t.is(text.includes('some_scope:tag1,tag2:error {"data":"data","array":["1",{"d":"data"}],"timestamp":'), true);
});

test('error debug - static call', (t) => {
  let text: string = '';
  const unhookIntercept = intercept((txt) => {
    text += `hooked: ${txt}`;
  });
  Logger.error({ data: 'data', array: ['1', { d: 'data' }] });
  unhookIntercept();
  t.is(text.includes('default:untagged:error {"data":"data","array":["1",{"d":"data"}],"timestamp":'), true);
});

test('error string - static call', (t) => {
  let text: string = '';
  const unhookIntercept = intercept((txt) => {
    text += `hooked: ${txt}`;
  });
  Logger.error('some error string');
  unhookIntercept();
  t.is(text.includes('default:untagged:error {"message":"some error string","timestamp":'), true);
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
  t.is(text.includes('default:tag1,tag2:error {"data":"data","array":["1",{"d":"data"}],"timestamp":'), true);
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
  t.is(text.includes('default:tag1,tag2:error {"data":"data","array":["1",{"d":"data"}],"timestamp":'), true);
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
  t.is(text.includes('envar_scope:tag1,tag2:error {"data":"data","array":["1",{"d":"data"}],"timestamp":'), true);
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
  t.is(text.includes('envar_scope:untagged:error {"data":"data","array":["1",{"d":"data"}],"timestamp":'), true);
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
  t.is(text.includes('envar_scope:untagged:error {"message":"some message","timestamp":'), true);
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
  t.is(text.includes('envar_scope:newtag,tag2:error {"message":"some message","timestamp":'), true);

  let text2: string = '';
  const unhookIntercept2 = intercept((txt) => {
    text2 += `hooked: ${txt}`;
  });
  logger.error('some message');
  t.is(logger.params.scope, process.env.LOG_SCOPE);
  unhookIntercept2();
  t.is(text2.includes('envar_scope:untagged:error {"message":"some message","timestamp":'), true);
});

test('no timestamps', (t) => {
  process.env.LOG_SCOPE = 'envar_scope';
  process.env.LOG_NOTIMESTAMP = '1';
  let text: string = '';
  const unhookIntercept = intercept((txt) => {
    text += `hooked: ${txt}`;
  });
  const params: ILoggerConstructorParams = { };
  const logger = new Logger(params);
  logger.tags(['newtag', 'tag2']).error('some message');
  t.is(logger.params.scope, process.env.LOG_SCOPE);
  unhookIntercept();
  t.is(text.includes('envar_scope:newtag,tag2:error {"message":"some message"}'), true);
});
