/* eslint-disable linebreak-style */
import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient()
      .on('error', (err) => {
        console.log(err);
      });
  }

  isAlive() {
    return this.client.connected();
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);

    try {
      const value = await getAsync(key);
      return value;
    } catch (error) {
      console.log(`error occured:  ${error}`);
      throw error;
    }
  }

  async set(key, value, duration) {
    const setexAsync = promisify(this.client.setex).bind(this.client);

    try {
      await setexAsync(key, duration, value);
    } catch (error) {
      console.log(`error occured: ${error}`);
      throw error;
    }
  }

  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    try {
      await delAsync(key)
    } catch (error) {
      console.log(`error occured: ${error}`);
      throw error;
    }
  }
}

module.exports = RedisClient;
