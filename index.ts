"use strict";
import AWS from "aws-sdk";
import axios from "axios";

const completeUrl = "https://www.google.com"; // Redirect URL after successful submission
const reCapUrl = "https://www.google.com/recaptcha/api/siteverify";
const reCaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
const snsTopic = process.env.ARN_SNS_TOPIC;

export const handler = async (event: any) => {
  console.log("Starting ContactForm Processing for website form.");

  try {
    // Verify reCAPTCHA response
    const verifyResponse = await axios.post(reCapUrl, null, {
      params: {
        secret: reCaptchaSecret,
        response: event.captcha,
      },
    });

    if (verifyResponse.data.success) {
      const sns = new AWS.SNS();
      const emailBody = `
                Hi Reza,
                
                Someone left a message for you.
                
                Name: ${event.name}
                Email: ${event.email}
                Subject: ${event.subject}
                Message: ${event.message}

                Thanks!
                Best Regards,
                Mailer fahmialfareza.com
            `;

      const params = {
        Message: emailBody,
        Subject: `Fahmialfareza.com-Contact: ${event.subject}`,
        TopicArn: snsTopic,
      };

      // Publish message to Amazon SNS
      await sns.publish(params).promise();
      console.log("Contact form successfully processed and message sent.");

      // Redirect after successful form processing
      return {
        statusCode: 302,
        headers: { Location: completeUrl },
      };
    } else {
      console.warn("reCAPTCHA verification failed.");
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Invalid reCAPTCHA" }),
      };
    }
  } catch (error) {
    console.error("Error processing contact form:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
