
const axios = require('axios');
const schedule = require('node-schedule');

const config =  require('./config')

const real_job = (account) => {
  console.log(account._streams[1] + '开始签到')

  let custom_loginConfig = {
    ...config.loginConfig,
    data: account
  }
  custom_loginConfig.headers = {
    ...custom_loginConfig.headers,
    ...account.getHeaders()
  }

  axios(custom_loginConfig)
    .then(function (response) {

      // console.log('登录结果:', JSON.stringify(response.data));
      return response.headers["set-cookie"];

    }).then((cookie) => {

      config.signConfig.headers['cookie'] = `${config.OLD_COOKIE};${cookie[2].split(';')[0]};${cookie[3].split(';')[0]};${cookie[4].split(';')[0]}`
        axios(config.signConfig).then((response) => {
            console.log('签到结果:', JSON.stringify(response.data));
        }).catch(function (error) {
            console.log(error);
        });

    })
}

const  startSchedule = ()=>{
  schedule.scheduleJob('0 0 5 * * *',()=>{
      console.log('start job');
      real_job(config.old_account)
      real_job(config.new_account)
  }); 
}

startSchedule();