/*var request = require('request');
var fs = require('fs');
//
var options = {
  'method': 'GET',
  'url': 'https://ec2-3-141-166-202.us-east-2.compute.amazonaws.com/api/json?tree=jobs[name,color,number]',
  'headers': {
    'Content-Security-Policy': '"  default-src \'self\' *.atlassian.net; script-src \'self\' *.atlassian.net \'unsafe-inline\' \'unsafe-eval\';  style-src \'self\' *.atlassian.net \'unsafe-inline\';  img-src \'self\' *.atlassian.net data:;  connect-src \'self\' *.atlassian.net;  font-src \'self\' *.atlassian.net;  object-src \'self\' *.atlassian.net;  media-src \'self\' *.atlassian.net;  frame-src \'self\' *.atlassian.net;  child-src \'self\' *.atlassian.net;  form-action \'self\' *.atlassian.net;  "',
    'Authorization': 'Basic RGV2b3BzOlRlc3QxMjM='
  },
  rejectUnauthorized: false,
  agent: false,
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});*/

const fetch1 = require('node-fetch');
const https = require('https');

const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const url = 'https://ec2-3-141-166-202.us-east-2.compute.amazonaws.com/api/json?tree=jobs[name,color,number]';
const response1 =  fetch1(url, {
          method: 'GET',
          headers: {
            'Authorization': 'Basic RGV2b3BzOlRlc3QxMjM=',
          },
          agent: httpsAgent,
    });

console.log(response1);
