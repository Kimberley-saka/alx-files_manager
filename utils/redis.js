/* eslint-disable linebreak-style */
import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient()
      .on('error', (err) => {
        console.log(err);
      });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          reject(err);
        }
        resolve(value);
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setext(key, duration, value, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, result) => {
        if (err) {
          reject(err);
        }
        reject(result);
      });
    });
  }
}

module.exports = RedisClient;
