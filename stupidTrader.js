var request = require("request");
var cron = require('node-cron');
var random = require("random-js")();
var timexe = require('timexe');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var distributions = require('distributions');


var options = { method: 'POST',
  url: 'http://localhost:3000/api/order-book',
  headers: 
   { 'Postman-Token': 'd7e31d85-fb68-1b7e-e7a4-d27e8f99a9ba',
     'Cache-Control': 'no-cache',
     'Content-Type': 'application/json' },
  body: { price: 10, volume: 1, askbid: 'bid' },
  json: true };

rl.question('\n\nPlease enter the nimber of asks \nResponse : ', (sizeAsk) => {
  rl.question('\n\nPlease enter the nimber of bids \nResponse : ', (sizeBid) => {
    rl.question('\n\nPlease enter the mean ask price\nResponse : ', (askPrice) => {
      rl.question('\n\nPlease enter the ask price variance\nResponse : ', (askVariance) => {
        rl.question('\n\nPlease enter the mean bid price\nResponse : ', (bidPrice) => {
          rl.question('\n\nPlease enter the bid price variance\nResponse : ', (bidVariance) => {

            var normalAsk = distributions.Normal(parseInt(askPrice), parseInt(askVariance));
            var normalBid = distributions.Normal(parseInt(bidPrice), parseInt(bidVariance));

            var iteratorAskStep1 = Math.round(sizeAsk*(normalAsk.cdf(askPrice-(2*askVariance))));
            var iteratorBidStep1 = Math.round(sizeBid*(normalBid.cdf(bidPrice-(2*bidVariance))));


            var iteratorAskStep2 = Math.round(sizeAsk*(normalAsk.cdf( askPrice - askVariance) - normalAsk.cdf( askPrice - (2*askVariance) )));
            var iteratorBidStep2 = Math.round(sizeBid*(normalBid.cdf( bidPrice - bidVariance) - normalBid.cdf( bidPrice - (2*bidVariance) )));


            var iteratorAskStep3 = Math.round(sizeAsk*(normalAsk.cdf(askPrice)-normalAsk.cdf(askPrice-askVariance)));
            var iteratorBidStep3 = Math.round(sizeBid*(normalBid.cdf(bidPrice)-normalBid.cdf(bidPrice-bidVariance)));

            var iteratorBidStep = [];
            var iteratorAskStep = [];

            iteratorAskStep.push(iteratorAskStep1, iteratorAskStep2, iteratorAskStep3,iteratorAskStep3,iteratorAskStep2, iteratorAskStep1);
            iteratorBidStep.push(iteratorBidStep1, iteratorBidStep2, iteratorBidStep3,iteratorBidStep3,iteratorBidStep2, iteratorBidStep1);

            for(var i = 0; i<6; i++){
              for(var j =0 ; j <= iteratorAskStep[i]; j++){
                options['body']['volume']=1;
                options['body']['askbid']="ask";
                options['body']['price'] = random.integer(parseInt(askPrice)+((i-3)*parseInt(askVariance)), parseInt(askPrice)+((i-2)*parseInt(askVariance)));
                request(options, function (error, response, body) {
                if (error) throw new Error(error);
                  console.log(body);
                });
              }
              for(var j =0 ; j <= iteratorBidStep[i]; j++){
                options['body']['volume']=1;
                options['body']['askbid']="bid";
                options['body']['price'] = random.integer(parseInt(bidPrice)+((i-3)*parseInt(bidVariance)), parseInt(bidPrice)+((i-2)*parseInt(bidVariance)));
                request(options, function (error, response, body) {
                if (error) throw new Error(error);
                  console.log(body);
                });
              }
            }
            rl.close();
          });
        });
      });
    });
  });
});