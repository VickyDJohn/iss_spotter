const request = require('request');

const ipUrl = 'https://api64.ipify.org/?format=json';

exports.fetchMyIp = (callback) => {
  request(ipUrl, (error, response, body) => {
    console.log(body)
    if (error) {
      return callback(error);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Request failed with status code: ${response.statusCode}`), null)
      return
    }

    const ip = JSON.parse(body);
    callback(null, ip)
  });
};