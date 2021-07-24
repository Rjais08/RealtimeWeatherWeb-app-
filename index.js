const http=require("http");
const fs=require("fs");
var requests = require("requests");
//const { runInNewContext } = require("vm");

const homefile = fs.readFileSync("home.html","utf-8");

const reaplaceVal=(tempVal,orgVal)=>{
   let temperature = tempVal.replace("{%tempval%}",(orgVal.main.temp-273).toFixed(2));
    temperature = temperature.replace("{%tempmin%}",(orgVal.main.temp_min-273).toFixed(2));
    temperature = temperature.replace("{%tempmax%}",(orgVal.main.temp_max-273).toFixed(2));
    temperature = temperature.replace("{%location%}",orgVal.name);
    temperature = temperature.replace("{%country%}",orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}",orgVal.weather[0].main);
    return temperature;

   };

const server = http.createServer((req,res) =>{
   if(req.url=="/"){
      requests('http://api.openweathermap.org/data/2.5/weather?q=Patna&appid=821ba040612bb2213f214bc7a830807f')
.on('data', (chunk) => {
   const objdata=JSON.parse(chunk);
   const arrData=[objdata];
  //console.log(arrData[0].main.temp-273);
  const realTimeData=arrData.map((val)=>reaplaceVal(homefile, val)).join("");
  res.write(realTimeData);
  //console.log(realTimeData);

})
.on('end', (err) =>{
  if (err) return console.log('connection closed due to errors', err);
  res.end;
});
   }
});

server.listen(3000,"127.0.0.1");
