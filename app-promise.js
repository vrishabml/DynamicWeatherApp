//Using axios 
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.options({
  a:{
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
})
.help()
.alias('help','h')
.argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBU9Hz9RcyPyW_OrrB9GkRWXNgjvgf34Ao&address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if(response.data.status ==='ZERO_RESULTS'){
    throw new Error('Unable to find the address');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var long = response.data.results[0].geometry.location.lng;
  var address = response.data.results[0].formatted_address;
  var weatherUrl = `https://api.darksky.net/forecast/9fcab1e19c9a64bf99b148ab0f1939a9/${lat},${long}`;
  console.log(address);
  return axios.get(weatherUrl);
}).then((response) =>{
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => {
  if(e.code === 'ENOTFOUND'){
    console.log('Unable to connect to API servers.');
  }
else{
  console.log(e.message);
}
});
