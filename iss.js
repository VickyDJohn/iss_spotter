const request = require('request');

const ipUrl = 'https://api64.ipify.org/?format=json';
const coordUrl = 'http://ipwho.is/174.4.104.208';

exports.fetchMyIp = (callback) => {
  request(ipUrl, (error, response, body) => {
    if (error) {
      return callback(error);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Request failed with status code: ${response.statusCode}`), null);
      return;
    }

    const ip = JSON.parse(body);
    callback(null, ip);
  });
};

exports.fetchCoordsByIp = (ip, callback) => {
  request(coordUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const coord = JSON.parse(body);
    if (!coord.success) {
      const message = `Success status was ${coord.success}. Server message says: ${coord.message} when fetching for IP ${coord.ip}`;
      callback(Error(message), null);
      return;
    } 

    const coordinates = { latitude: coord.latitude, longitude: coord.longitude };
    callback(null, coordinates);
  });
};

exports.fetchISSFlyOverTimes = function(coords, callback) {
  const { latitude, longitude } = coords;
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(new Error(`Request failed with status code ${response.statusCode}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

exports.nextISSTimesForMyLocation = function(callback) {
  exports.fetchMyIp((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    exports.fetchCoordsByIp(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      exports.fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};