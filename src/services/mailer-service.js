// Using api keu from env var SPARKPOST_API_KEY
const SparkPost = require('sparkpost');
const client = new SparkPost();

// SparkPost template names (it's possible to get this via API and
const SIGNUP_CONFIRM_TEMPLATE = 'signup-confirmation';

async function sendSingleEmail(template, recipient, substitutions) {
  return await client.transmissions.send({
    content: {
      template_id: template
    },
    recipients: [{
        address: recipient,
        substitution_data: substitutions
    }]
    /*options: {
      sandbox: false
    },*/
  });
}



async function sendSignupConfirmationEmail(user, token) {
  let recipient = user.email;
  let name = user.firstName;
  // override recipient in dev/test if override is set
  if (process.env.NODE_ENV !== 'production' && process.env.OVERRIDE_EMAIL) {
    recipient = process.env.OVERRIDE_EMAIL;
    name = "NoName";
  }

  return await sendSingleEmail(SIGNUP_CONFIRM_TEMPLATE, recipient, {
    firstName: name,
    token: token
  });
}


module.exports = {
  sendSingleEmail,
  sendSignupConfirmationEmail
};