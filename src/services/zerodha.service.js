const { killDaemon } = require("pm2");
const fs = require('fs');
const { kStringMaxLength } = require("buffer");
var KiteConnect = require("kiteconnect").KiteConnect;
var KiteTicker = require("kiteconnect").KiteTicker;

var kc = new KiteConnect({
    api_key: "s7nivca83ks79tfb",
});

var api_secret = '';
var request_token = '';

const set_request_token = function (request_token_key) {
    request_token = request_token_key;
};

const setApiKey = function (api_key, api_secret_key, token) {
    kc = new KiteConnect({
        api_key: api_key,
    });
    api_secret = api_secret_key;
    kc.setAccessToken(token);
};

const validate_token = async function (token) {
    kc.setAccessToken(token);
    try {
        var profile = await kc.getProfile();
        return true;
    }
    catch (e) {
        console.log('ex', e);
        return false;
    }
};

const getLoginURL = async function () {
    return kc.getLoginURL();
};

const generateAuthTokens = async function () {
    return await kc.generateSession(request_token, api_secret);
};

const getProfile = async function () {
    return await kc.getProfile();
};

const getOrders = async function () {
    return await kc.getOrders();
};

const getTrades = async function () {
    return await kc.getTrades();
};

const getHoldings = async function () {
    return await kc.getHoldings();
};

const getPositions = async function () {
    return await kc.getPositions();
};

const getMargins = async function () {
    return await kc.getMargins();
};

const generateSession = async function () {
    //await validate_token('1h9y6HCEadQQDpZSgC4qpoq5auJwZ95w');
    console.log(kc.getLoginURL());
    if (false) {

        kc.setAccessToken('1h9y6HCEadQQDpZSgC4qpoq5auJwZ95w');

        init();

        // kc.getInstruments().then(function (response) {
        //     console.log('getInstruments', response);
        //     fs.writeFileSync('./data.json', JSON.stringify(response, null, 2) , 'utf-8');
        // })
        // .catch(function (err) {
        //     console.log('getInstruments-error', err);
        // });
        //var ws = new WebSocket("wss://ws.kite.trade?api_key=" + kc.api_key + "&access_token=" + kc.access_token);

        websockets();


        //init();

        // kc.placeOrder('regular', {
        // 	"exchange": "NSE",
        // 	"tradingsymbol": "VEDL",
        // 	"transaction_type": "BUY",
        // 	"quantity": 1,
        // 	"product": "MIS",
        // 	"order_type": "MARKET"
        // }).then(function(resp) {
        // 	console.log('placeOrder',resp);
        // }).catch(function(err) {
        // 	console.log('placeOrder-error',err);
        // });
    }
    else {
        kc.generateSession("z6PHMDgbfotNZACKiYSHYIf4bEsZkNbF", "g5w49jiwtlhif468ur0fdxpgp9xf9ibo")
            .then(function (response) {
                console.log('generateSession', response);
                init();
            })
            .catch(function (err) {
                console.log('generateSession-error', err);
            });
    }
};

const init = function () {
    // Fetch equity margins.
    // You can have other api calls here.
    kc.getMargins()
        .then(function (response) {
            console.log('margin', response);
        })
        .catch(function (err) {
            console.log('margin-error', err);
        });
};

module.exports = { setApiKey, set_request_token, validate_token, getLoginURL, generateAuthTokens, getProfile, getMargins, getOrders, getTrades, getHoldings, getPositions, generateSession }

function websockets() {
    var ticker = new KiteTicker({
        api_key: kc.api_key,
        access_token: kc.access_token,
    });

    // set autoreconnect with 10 maximum reconnections and 5 second interval
    ticker.autoReconnect(true, 10, 5);
    ticker.connect();
    ticker.on("ticks", onTicks);
    ticker.on("connect", subscribe);

    ticker.on("noreconnect", function () {
        console.log("noreconnect");
    });

    ticker.on("reconnecting", function (reconnect_interval, reconnections) {
        console.log(
            "Reconnecting: attempt - ",
            reconnections,
            " innterval - ",
            reconnect_interval
        );
    });

    function onTicks(ticks) {
        console.log("Ticks", ticks);
    }

    function subscribe() {
        var items = [738561];
        ticker.subscribe(items);
        ticker.setMode(ticker.modeFull, items);
    }
}
