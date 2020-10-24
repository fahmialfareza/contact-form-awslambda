'use strict';
const AWS = require("aws-sdk");
const axios = require('axios');
const completeUrl = "https://www.google.com";
// verify recaptcha url
const reCapUrl = "https://www.google.com/recaptcha/api/siteverify";
const reCaptchaSecret = process.env.RECAPTCHA_SECRET_KEY; //6Leel74UAAAAACSj1tVXMtm9SJsbP65XNfsekC1g
// from Amazon SNS
const snsTopic = process.env.ARN_SNS_TOPIC; //arn:aws:sns:us-east-1:942339016034:contactFormTopic

module.exports.handler = async (event, context, callback) => {
    console.log("Starting ContactForm Processing for website form.");
    // console.log("data event: " + JSON.stringify(event));
    // verify the result by POSTing to google backend with secret and frontend recaptcha token as payload
    let verifyResult = await axios({
        method: 'post',
        url: reCapUrl,
        params: {
            secret: reCaptchaSecret,
            response: event.captcha
        }
    })

    // print out the result of that. Its a bit verbose though
    // console.log("verify result: " + JSON.stringify(verifyResult.data));
    if (verifyResult.data.success) {
        let sns = new AWS.SNS();
        // The structure of the email
        let emailbody = "Hi Reza,\n\nSomeone left a message for you.\n\nName\t\t: " +
            event.name + "\nEmail\t\t: " + event.email + "\nSubject\t\t: " + event.subject +
            "\nMessage\t\t: " + event.message + "\n\nThanks!\nBest Regards,\n\nMailer fahmialfareza.com"
        let params = {
            Message: emailbody,
            Subject: "Fahmialfareza.com-Contact: " + event.subject,
            TopicArn: snsTopic
        };
        // we publish the created message to Amazon SNS now…
        sns.publish(params, context.done);
        // now we return a HTTP 302 together with a URL to redirect the browser to success URL (we put in google.com for simplicty)
        callback(null, {
            statusCode: 302,
            headers: {
                Location: completeUrl,
            }
        });
        console.log("End of the ContactForm Process With Success");
    } else {
        console.log("reCaptcha check failed. Most likely SPAM.");
        callback(null, {
            statusCode: '500',
            body: JSON.stringify({
                message: 'Invalid recaptcha'
            })
        });
    }
};
