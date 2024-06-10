var os = require("os");
const APP = require("../config/app.json");

const CURRENT_ENVIRONMENT = process.env.NODE_ENV;

var env;
var port;
var wallet_base_url;

if (CURRENT_ENVIRONMENT === "development") {
  env = "development";
  port = APP.development.PORT;
  base_url = APP.development.BASE_URL;
  req_base_url = APP.development.REQ_BASE_URL;
  wallet_base_url = APP.development.WALLET_BASE_URL
  fcm_server_key = APP.development.FCM_SERVER_KEY
}
else if(CURRENT_ENVIRONMENT === "stage") {
  env = "stage";
  port = APP.stage.PORT;
  base_url = APP.stage.BASE_URL;
  req_base_url = APP.stage.REQ_BASE_URL;
  wallet_base_url = APP.stage.WALLET_BASE_URL
  fcm_server_key = APP.stage.FCM_SERVER_KEY
} else if(CURRENT_ENVIRONMENT === "production") {
  env = "production";
  port = APP.production.PORT;
  base_url = APP.production.BASE_URL;
  req_base_url = APP.production.REQ_BASE_URL;
  wallet_base_url = APP.production.WALLET_BASE_URL
  fcm_server_key = APP.production.FCM_SERVER_KEY
} else {
  env = "test";
  port = APP.test.PORT;
  base_url = APP.test.BASE_URL;
  req_base_url = APP.test.REQ_BASE_URL;
  wallet_base_url = APP.test.WALLET_BASE_URL
  fcm_server_key = APP.test.FCM_SERVER_KEY
}

const app = {
  env: env,
  port: port,
  base_url: base_url,
  req_base_url: req_base_url,
  wallet_base_url: wallet_base_url,
  fcm_server_key: fcm_server_key
};

module.exports = app;
