const redis = require('redis');

const connection = redis.createClient({
  host: 'redis-server',
  port: 6379
});

const client = {
  exists: key => {
    return new Promise((resolve, reject) => {
      connection.exists(key.toString(), (err, exists) => {
        if (err) {
          return reject(err);
        }
        return resolve(exists);
      });
    });
  },
  get: key => {
    return new Promise((resolve, reject) => {
      connection.get(key.toString(), (err, obj) => {
        if (err) {
          return reject(err);
        }
        return resolve(JSON.parse(obj));
      });
    });
  },
  set: (key, obj) => {
    return connection.set(key.toString(), JSON.stringify(obj));
  }
};

module.exports = client;