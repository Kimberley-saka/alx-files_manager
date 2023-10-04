/* eslint-disable linebreak-style */
import dbClient from '../utils/db';

const { SHA1 } = require('sha1');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      res.end();
    }

    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      res.end();
    }

    const db = dbClient.db(dbClient.database);
    const users = db.collection('users');
    const existingUser = await users.findOne(email);

    if (existingUser) {
      res.status(400).json({ error: 'Already exist' });
      res.end();
    }

    const hashedPassword = SHA1(password).toString();
    const user = await users.createUser(email, hashedPassword);
    const id = `${user.insertedID}`;
    req.status(201).json({ id, email });
    res.end();
  }
}

module.exports = UsersController;
