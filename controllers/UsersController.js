/* eslint-disable linebreak-style */
import dbClient from '../utils/db';

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

    const existingUser = await dbClient.userExixt(email);
    if (existingUser) {
      res.status(400).json({ error: 'Already exist' });
      res.end();
    }

    const user = await dbClient.createUser(email, password);
    const id = `${user.insertedID}`;
    req.status(201).json({ id, email });
    res.end();
  }
}

module.exports = UsersController;
