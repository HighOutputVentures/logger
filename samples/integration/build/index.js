'use strict';var _index = require('../../../build/index');var _index2 = _interopRequireDefault(_index);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

let repeats = 60 / 2;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXBlYXRzIiwibG9nZ2VyIiwic2NvcGUiLCJ1c2VycyIsInVzZXJJZCIsImZpcnN0TmFtZSIsImVtYWlsIiwibGFzdE5hbWUiLCJkb1NvbWV0aGluZyIsInNldFRpbWVvdXQiLCJ0YWdzIiwiaW5mbyIsInVzZXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiXSwibWFwcGluZ3MiOiJhQUFBLDZDOztBQUVBLElBQUlBLFVBQVUsS0FBSyxDQUFuQjtBQUNBLE1BQU1DLFNBQVMsb0JBQVcsRUFBRUMsT0FBTyxLQUFULEVBQVgsQ0FBZjtBQUNBLE1BQU1DLFFBQVE7QUFDWjtBQUNFQyxVQUFRLE9BRFY7QUFFRUMsYUFBVyxPQUZiO0FBR0VDLFNBQU8sZ0JBSFQ7QUFJRUMsWUFBVSxPQUpaLEVBRFk7O0FBT1o7QUFDRUgsVUFBUSxPQURWO0FBRUVDLGFBQVcsT0FGYjtBQUdFQyxTQUFPLGdCQUhUO0FBSUVDLFlBQVUsT0FKWixFQVBZLENBQWQ7Ozs7QUFlQSxTQUFTQyxXQUFULEdBQXVCO0FBQ3JCLFNBQU9SLFdBQVcsQ0FBbEIsRUFBcUI7QUFDbkJBLGVBQVcsQ0FBWDtBQUNBUyxlQUFXRCxXQUFYLEVBQXdCLEdBQXhCO0FBQ0FQLFdBQU9TLElBQVAsQ0FBWSxDQUFDLGlCQUFELENBQVosRUFBaUNDLElBQWpDLENBQXNDO0FBQ3BDQyxZQUFNVCxNQUFNVSxLQUFLQyxLQUFMLENBQVdELEtBQUtFLE1BQUwsS0FBZ0JaLE1BQU1hLE1BQWpDLENBQU4sQ0FEOEIsRUFBdEM7O0FBR0Q7QUFDRjs7QUFFRFIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9nZ2VyIGZyb20gJy4uLy4uLy4uL2J1aWxkL2luZGV4JztcblxubGV0IHJlcGVhdHMgPSA2MCAvIDI7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKHsgc2NvcGU6ICd3ZWInIH0pO1xuY29uc3QgdXNlcnMgPSBbXG4gIHtcbiAgICB1c2VySWQ6ICd1c2VyQScsXG4gICAgZmlyc3ROYW1lOiAndXNlckEnLFxuICAgIGVtYWlsOiAndXNlckFAbWFpbC5jb20nLFxuICAgIGxhc3ROYW1lOiAndXNlckEnLFxuICB9LFxuICB7XG4gICAgdXNlcklkOiAndXNlckInLFxuICAgIGZpcnN0TmFtZTogJ3VzZXJCJyxcbiAgICBlbWFpbDogJ3VzZXJCQG1haWwuY29tJyxcbiAgICBsYXN0TmFtZTogJ3VzZXJCJyxcbiAgfSxcbl07XG5cbmZ1bmN0aW9uIGRvU29tZXRoaW5nKCkge1xuICB3aGlsZSAocmVwZWF0cyA+PSAwKSB7XG4gICAgcmVwZWF0cyAtPSAxO1xuICAgIHNldFRpbWVvdXQoZG9Tb21ldGhpbmcsIDUwMCk7XG4gICAgbG9nZ2VyLnRhZ3MoWydtZXNzYWdlX2NyZWF0ZWQnXSkuaW5mbyh7XG4gICAgICB1c2VyOiB1c2Vyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB1c2Vycy5sZW5ndGgpXSxcbiAgICB9KTtcbiAgfVxufVxuXG5kb1NvbWV0aGluZygpO1xuIl19