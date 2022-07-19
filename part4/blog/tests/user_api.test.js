const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});

  const userObjects = helper.initialUsers.map((user) => new User(user));
  const promiseArray = userObjects.map((user) => user.save());
  await Promise.all(promiseArray);
});

describe('user creation', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('correct users are returned', async () => {
    const response = await api.get('/api/users');

    expect(response.body).toHaveLength(helper.initialUsers.length);
  });

  test('correct user is created', async () => {
    const user = {
      username: 'testUser',
      name: 'Test User',
      password: 'password',
    };

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(user.username);
  });

  test('correct errors are returned: existing user', async () => {
    const user = helper.initialUsers[0];

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toEqual('Username already in use');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
  });

  test('correct errors are returned: invalid username', async () => {
    const user = {
      username: 'ts',
      name: 'Test User',
      password: 'password',
    };

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toEqual(
      'Username must be atleast 3 characters'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
  });

  test('correct errors are returned: invalid password', async () => {
    const user = {
      username: 'testUser',
      name: 'Test User',
      password: 'pa',
    };

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toEqual(
      'Password must be atleast 3 characters'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
  });
});
