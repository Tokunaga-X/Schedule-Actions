
var axios = require('axios');
var FormData = require('form-data');

var data = new FormData();
data.append('email', 'caijinqi1314@gmail.com');
data.append('passwd', 'caijinqi');

const loginConfig = {
  method: 'post',
  url: 'https://neworld.tv/auth/login',
  headers: { 
    'accept': 'application/json, text/javascript', 
    'content-type': 'application/x-www-form-urlencoded', 
    'accept-encoding': 'gzip, deflate, br', 
    'referer': 'https://neworld.tv/auth/login', 
    'origin': 'https://neworld.tv', 
    'Cookie': 'email=caijinqi1314%40gmail.com; expire_in=1641727668; ip=320c3272c417747cdc2a6a41b8d9b454; key=98ac6e444611469932af8c22dcb7d61b651487d8b8e88; uid=57570', 
    ...data.getHeaders()
  },
  data : data
};

const signConfig = {
    method: 'post',
    url: 'https://neworld.tv/user/checkin',
    headers: { 
      'accept': 'application/json, text/javascript, */*; q=0.01', 
      'cookie': 'email=caijinqi1314%40gmail.com; expire_in=1641920288; ip=9eb0daf876ddffd3e30b88b9171bfe17; key=29b8f329dcdaf8cf282b67b4c7fac95a7a5b48f002e07; uid=57570; email=caijinqi1314%40gmail.com; expire_in=1641920224; ip=19fa155fdcd0cbe44b9dc7e2267d1d0c; key=2175920c63487776c74a4163435356d52c5a8e36007a7; uid=57570', 
      'Referer': 'https://neworld.tv/user', 
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  };

const OLD_COOKIE = 'email=caijinqi1314%40gmail.com;uid=57570'

axios(loginConfig)
.then(function (response) {
  console.log('data:', JSON.stringify(response.data));
  return response.headers["set-cookie"];
}).then((cookie) => {
    signConfig.headers['cookie'] = `${OLD_COOKIE};${cookie[2].split(';')[0]};${cookie[3].split(';')[0]};${cookie[4].split(';')[0]}`
    axios(signConfig).then((response) => {
        console.log('data:', JSON.stringify(response.data));
    }).catch(function (error) {
        console.log(error);
    });
})
.catch(function (error) {
  console.log(error);
});
