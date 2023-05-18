//how to check ssl certificate using node js
const SlackNotify = require('@slack/bolt')
const sslChecker = require("ssl-checker")
const cron = require('node-cron');
const CryptoJS = require("crypto-js");
const http = require('http');


const remaindays = async (req, res) => {
  try {
    sslChecker(req.body.host_name, 'GET', 443).then(result => {
      res.status(200).json({
        daysRemaining: result.daysRemaining,
        validFrom: result.validFrom,
        validTo: result.validTo
      })
    })

    console.log("server controller====>", req.user);

    //====================>decrypt seccsion<========
    // Decrypt Bot_Auth_token
    const bytes = CryptoJS.AES.decrypt(req.user.work_space_auth_key, process.env.USER_SCREATE_KEY2);
    const decryptedBotAuth = bytes.toString(CryptoJS.enc.Utf8);
    console.log("Decrypted BOT Auth key:", decryptedBotAuth);

    //Decrypt sing key token
    const bytes2 = CryptoJS.AES.decrypt(req.user.work_space_sing_key, process.env.USER_SCREATE_KEY2);
    const decryptedSignKey = bytes2.toString(CryptoJS.enc.Utf8);
    console.log("Decrypted sign key:", decryptedSignKey);

    let app = new SlackNotify.App({
      signingSecret: decryptedSignKey,
      token: decryptedBotAuth
    })
    //corn-node notification every day on moring time 11:42am
    cron.schedule('* * * * *', () => {
      sslChecker(req.body.host_name, 'GET', 443).then(result => {

        if (result.daysRemaining <= 7) {
          app.client.chat.postMessage({
            token: decryptedBotAuth,
            channel: req.user.channel_name,
            text: {
              daysRemaining: result.daysRemaining,
              validFrom: result.validFrom,
              validTo: result.validTo
            }
          })
        }
      })
      console.log('Running a task every 1 minite PM');
    });
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      massage: error.massage
    })
  }

}

// check status code of website....
const domainStatusCode = async (req, res) => {

  try {
    const req1 = http.request({ hostname: req.body.host_name }, res2 => {
      console.log(`Status code: ${res2.statusCode}`);
      res.status(200).json({
        Status_code: res2.statusCode
      })
      if (res2.statusCode != 200) {

        //====================>decrypt secson<========
        console.log("server controller====>", req.user);
        const passphrase = process.env.USER_SCREATE_KEY2;
        // Decrypt Bot_Auth_token
        const bytes = CryptoJS.AES.decrypt(req.user.work_space_auth_key, process.env.USER_SCREATE_KEY2);
        const decryptedBotAuth = bytes.toString(CryptoJS.enc.Utf8);
        console.log("Decrypted:", decryptedBotAuth);

        //Decrypt sing key token
        const bytes2 = CryptoJS.AES.decrypt(req.user.work_space_sing_key, process.env.USER_SCREATE_KEY2);
        const decryptedSignKey = bytes2.toString(CryptoJS.enc.Utf8);
        console.log("Decrypted:", decryptedSignKey);

        let app = new SlackNotify.App({
          signingSecret: decryptedSignKey,
          token: decryptedBotAuth
        })
        cron.schedule('* * * * *', () => {
          const req1 = http.request({ hostname: req.body.host_name }, res2 => {
            app.client.chat.postMessage({
              token: decryptedBotAuth,
              channel: req.user.channel_name,
              text: {
                Status_code: res2.statusCode
              }
            })
          });
          req1.on('error', error => {
            console.error(error);
          });
          req1.end();
        })
        console.log("cron run for check website status code..");
      }
    });
    req1.on('error', error => {
      res.status(500).json({
        Status: "Error",
        massage: error.massage
      })
    });

    req1.end();
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      massage: error.massage
    })
  }

}

module.exports = { remaindays, domainStatusCode }
