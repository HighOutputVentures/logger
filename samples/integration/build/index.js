'use strict';var _index = require('../../../build/index');var _index2 = _interopRequireDefault(_index);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

let repeats = 3;
const logger = new _index2.default({ scope: 'web' });
const users = [
{
  userId: 'userA',
  firstName: 'userA',
  email: 'userA@mail.com',
  lastName: 'userA' },

{
  userId: 'userB',
  firstName: 'userB',
  email: 'userB@mail.com',
  lastName: 'userB' }];



function doSomething() {
  while (repeats >= 0) {
    repeats -= 1;
    setTimeout(doSomething, 500);
    logger.tags(['message_created']).info({
      user: users[Math.floor(Math.random() * users.length)] });

  }
}

doSomething();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXBlYXRzIiwibG9nZ2VyIiwic2NvcGUiLCJ1c2VycyIsInVzZXJJZCIsImZpcnN0TmFtZSIsImVtYWlsIiwibGFzdE5hbWUiLCJkb1NvbWV0aGluZyIsInNldFRpbWVvdXQiLCJ0YWdzIiwiaW5mbyIsInVzZXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiXSwibWFwcGluZ3MiOiJhQUFBLDZDOztBQUVBLElBQUlBLFVBQVUsQ0FBZDtBQUNBLE1BQU1DLFNBQVMsb0JBQVcsRUFBRUMsT0FBTyxLQUFULEVBQVgsQ0FBZjtBQUNBLE1BQU1DLFFBQVE7QUFDWjtBQUNFQyxVQUFRLE9BRFY7QUFFRUMsYUFBVyxPQUZiO0FBR0VDLFNBQU8sZ0JBSFQ7QUFJRUMsWUFBVSxPQUpaLEVBRFk7O0FBT1o7QUFDRUgsVUFBUSxPQURWO0FBRUVDLGFBQVcsT0FGYjtBQUdFQyxTQUFPLGdCQUhUO0FBSUVDLFlBQVUsT0FKWixFQVBZLENBQWQ7Ozs7QUFlQSxTQUFTQyxXQUFULEdBQXVCO0FBQ3JCLFNBQU9SLFdBQVcsQ0FBbEIsRUFBcUI7QUFDbkJBLGVBQVcsQ0FBWDtBQUNBUyxlQUFXRCxXQUFYLEVBQXdCLEdBQXhCO0FBQ0FQLFdBQU9TLElBQVAsQ0FBWSxDQUFDLGlCQUFELENBQVosRUFBaUNDLElBQWpDLENBQXNDO0FBQ3BDQyxZQUFNVCxNQUFNVSxLQUFLQyxLQUFMLENBQVdELEtBQUtFLE1BQUwsS0FBZ0JaLE1BQU1hLE1BQWpDLENBQU4sQ0FEOEIsRUFBdEM7O0FBR0Q7QUFDRjs7QUFFRFIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9nZ2VyIGZyb20gJy4uLy4uLy4uL2J1aWxkL2luZGV4JztcblxubGV0IHJlcGVhdHMgPSAzO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcih7IHNjb3BlOiAnd2ViJyB9KTtcbmNvbnN0IHVzZXJzID0gW1xuICB7XG4gICAgdXNlcklkOiAndXNlckEnLFxuICAgIGZpcnN0TmFtZTogJ3VzZXJBJyxcbiAgICBlbWFpbDogJ3VzZXJBQG1haWwuY29tJyxcbiAgICBsYXN0TmFtZTogJ3VzZXJBJyxcbiAgfSxcbiAge1xuICAgIHVzZXJJZDogJ3VzZXJCJyxcbiAgICBmaXJzdE5hbWU6ICd1c2VyQicsXG4gICAgZW1haWw6ICd1c2VyQkBtYWlsLmNvbScsXG4gICAgbGFzdE5hbWU6ICd1c2VyQicsXG4gIH0sXG5dO1xuXG5mdW5jdGlvbiBkb1NvbWV0aGluZygpIHtcbiAgd2hpbGUgKHJlcGVhdHMgPj0gMCkge1xuICAgIHJlcGVhdHMgLT0gMTtcbiAgICBzZXRUaW1lb3V0KGRvU29tZXRoaW5nLCA1MDApO1xuICAgIGxvZ2dlci50YWdzKFsnbWVzc2FnZV9jcmVhdGVkJ10pLmluZm8oe1xuICAgICAgdXNlcjogdXNlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdXNlcnMubGVuZ3RoKV0sXG4gICAgfSk7XG4gIH1cbn1cblxuZG9Tb21ldGhpbmcoKTtcbiJdfQ==