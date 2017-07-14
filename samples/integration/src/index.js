import Logger from '../../../build/index';

let repeats = 60 / 2;
const logger = new Logger({ scope: 'web' });
const users = [
  {
    userId: 'userA',
    firstName: 'userA',
    email: 'userA@mail.com',
    lastName: 'userA',
  },
  {
    userId: 'userB',
    firstName: 'userB',
    email: 'userB@mail.com',
    lastName: 'userB',
  },
];

function doSomething() {
  while (repeats >= 0) {
    repeats -= 1;
    setTimeout(doSomething, 500);
    logger.tags(['message_created']).info({
      user: users[Math.floor(Math.random() * users.length)],
    });
  }
}

doSomething();
