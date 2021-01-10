/* MyHoldings(currentPrice); */

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function MyHoldings(price) {
	price = parseFloat(price.replace(/,/g, ''));
  var myCoin = 0.25031424;
  var myUSD = myCoin * price;
  document.getElementById("my_holding_USD").innerHTML = formatter.format(myUSD);
}

var currentPrice
var currentPriceFormatted
var yesterdayClose

function CoindeskBTCPrice() {
  $.ajax({
      url: "https://api.coindesk.com/v1/bpi/currentprice.json",
      success: function(bitcoinPrice) {
      	apiQuery = bitcoinPrice;
        currentPrice  = JSON.parse(apiQuery).bpi.USD.rate;
        currentPriceFormatted = formatter.format(parseFloat(currentPrice.replace(/,/g, '')))
        document.getElementById("current_BTC").innerHTML = currentPriceFormatted;
        document.getElementById("time_updated").innerHTML = JSON.parse(apiQuery).time.updated;        
        MyHoldings(currentPrice);
    }
  })
}

const today = new Date()
const yesterday = new Date(today)


function addZeros(inputString){
	if (inputString.length == 1){
  return "0" + inputString
  	} else { return inputString}
  }

function fixDate(dateString){
	var fixedString
  fixedString = dateString.split('/')[2] + "-" + addZeros(dateString.split('/')[0]) + "-" + addZeros(dateString.split('/')[1])
  return fixedString
}

function CoindeskHistory(){
  yesterday.setDate(yesterday.getDate() - 1)
  var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  yesterdayDateString = fixDate(yesterday.toLocaleDateString("en-US", options))
  $.ajax({
    url: "https://api.coindesk.com/v1/bpi/historical/close.json",
    success: function(bitcoinPriceHistory) {
      apiQuery = bitcoinPriceHistory;
      // yesterdayClose  = JSON.parse(apiQuery).bpi[JSON.parse(apiQuery).bpi.length - 1];
      yesterdayClose = JSON.parse(apiQuery).bpi[yesterdayDateString];
      console.log(currentPriceFormatted, yesterdayClose);
    }
  })
}

// var percentChange = (now - open) / open * 100.0;

CoindeskBTCPrice();
CoindeskHistory();
