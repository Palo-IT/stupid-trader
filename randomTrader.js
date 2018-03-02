var request = require("request");
var cron = require('node-cron');
var random = require("random-js")();
var timexe = require('timexe');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var options = { method: 'POST',
  url: 'http://localhost:3000/api/order-book',
  headers: 
   { 'Postman-Token': 'd7e31d85-fb68-1b7e-e7a4-d27e8f99a9ba',
     'Cache-Control': 'no-cache',
     'Content-Type': 'application/json' },
  body: { price: 10, volume: 1, askbid: 'bid' },
  json: true };



cron.schedule('*/1 * * * * *', function(){
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


/*
// Add
var res1=timexe('* * * * * * 10-20-30-40-50-60-70', function(){
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
});*/

/*
for(var i=0; i<1000; i++){
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
}
*/