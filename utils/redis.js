/* eslint-disable linebreak-style */
import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.connected = false;
    this.client = createClient()
      .on('error', (err) => {
        console.log(`Failed to connect: ${err}`);
      })
      .on('connect', () => {
        this.connected = true;
      });

    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setexAsync = promisify(this.client.setex).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const result = await this.getAsync(key);
    return result;
  }

  async set(key, value, duration) {
    await this.setexAsync(key, duration, value);
  }

  async del(key) {
    await this.delAsync(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
