// @flow
import test from 'ava';
import intercept from 'intercept-stdout';
import Logger from '../src/index';
import { ILoggerConstructorParams } from '../src/interfaces/ILoggerConstructorParams';

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
  console.log(text);
  t.is(text.includes('envar_scope:untagged:error {"message":"some message","timestamp":'), true);
});
