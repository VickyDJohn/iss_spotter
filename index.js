const { fetchMyIp, fetchCoordsByIp } = require('./iss');

// fetchMyIp((error, ip) => {
//   if (error) {
//     console.log("it didn't work!");
//     return;
//   }

//   console.log('It worked! Returned IP: ', ip);
// });

fetchCoordsByIp('162.245.144.188', (error, coordinates) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned coordinates:' , coordinates);
});