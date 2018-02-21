var request = require("request");
var cron = require('node-cron');
var random = require("random-js")();

var options = { method: 'POST',
  url: 'http://localhost:8080/api/order-book',
  headers: 
   { 'Postman-Token': 'd7e31d85-fb68-1b7e-e7a4-d27e8f99a9ba',
     'Cache-Control': 'no-cache',
     'Content-Type': 'application/json' },
  body: { price: 10, volume: 1, askbid: 'bid' },
  json: true };


cron.schedule('1-59 * * * * *', function(){
  var value = random.integer(0, 1);
  options['body']['volume']=random.integer(1,10);
  if(value==0){
    options['body']['askbid']="bid";
    options['body']['price']=random.integer(15,20);
  }
  if(value==1){
    options['body']['price']=random.integer(18,25);
    options['body']['askbid']="ask";
  }
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});
