const request = require('request');
var getWeather = (lat,long,callback) => {
request({
  url :`https://api.darksky.net/forecast/9fcab1e19c9a64bf99b148ab0f1939a9/${lat},${long}`,
  json:true
},(error,response,body)=>{
  if(error){
    callback('Unable to connect to forecast.io servers');
  }
  else if(response.statusCode === 400){
    callback('Unable to fetch weather');
  }
  else if(response.statusCode === 200){
    callback(undefined,{
      temperature: body.currently.temperature,
      apparentTemperature: body.currently.apparentTemperature
    });
  }

});
};

module.exports.getWeather = getWeather;
