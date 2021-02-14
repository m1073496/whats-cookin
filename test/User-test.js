const chai = require('chai');
const expect = chai.expect;

const = {
  testUsersData
} = require('../data/test-data');

const User = require('../src/User');

describe('User', function() {
  let user1;
  let user2;

  beforeEach(function() {
    user1 = new User(testUsersData[0]);
    user2 = new User(testUsersData[1]);
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of a User', function() {
    expect(user1).to.be.an.instanceOf(User);
  });

  it('should have a name', function() {
    expect(user1.userName).to.equal(testUsersData[0].name);
  });

  it('should have a unique id', function() {
    expect(user1.id).to.equal(testUsersData[0].id);
    expect(user1.id).to.not.equal(user2.id);
  });

  it('should have a pantry of ingredients', function() {
    expect(user1.pantry).to.deep.equal(testUsersData[0].pantry);
  });








});
