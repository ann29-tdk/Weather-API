
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(request, response)
{

  response.sendFile(__dirname+"/index.html");

})


app.post("/", function(request,response)
{
  console.log(request.body.cityName);

  const query = request.body.cityName;
  const apiKey = "fc1c27149ca199b5d663d522b1ed0ec5";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apiKey +"&units=" +unit;


  https.get(url, function(res)
  {
    let chunks ="";

    res.on("data", function(chunk)
    {
      chunks+=chunk;
    });



    res.on("end", function(){

      const weatherData = JSON.parse(chunks);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn" + icon + "@2x.png";
      response.write("<h1>The weather is currently " +weatherDescription+ ".</h1>");
      response.write("<h1>The temperature is "+temp+" degree celcius.</h1>");
      response.send();
    });

  });
});

app.listen(3000, function(){
  console.log("Port 3000 is active.");
});
