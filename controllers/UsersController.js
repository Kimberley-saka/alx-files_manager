/* eslint-disable linebreak-style */
import { promisify } from 'util';
import dbClient from '../utils/db';

const { SHA1 } = require('sha1');

class UsersController {
  static async postNew(req, res) {
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;

    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      res.end();
    }

    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      res.end();
    }

    const findOneAsync = promisify(dbClient.users.findOne);
    const existingUser = await findOneAsync({ email });

    if (existingUser) {
      res.status(400).json({ error: 'Already exist' });
      res.end();
    }

    const hashedPassword = SHA1(password).toString();
    const insertOneAsync = promisify(dbClient.users.findOne);
    const user = await insertOneAsync({ email, password: hashedPassword });
    const id = `${user.insertedID}`;
    req.status(201).json({ id, email });
    res.end();
  }
}

module.exports = UsersController;
