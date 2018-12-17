// Using api keu from env var SPARKPOST_API_KEY
const SparkPost = require('sparkpost')
const client = new SparkPost()

// SparkPost template names (it's possible to get this via API)
// TODO move this tp database so it can be changed without downtime
const SIGNUP_CONFIRM_TEMPLATE = 'signup-confirmation'

function sendSingleEmail (template, recipient, substitutions) {
  return client.transmissions.send({
    content: {
      template_id: template,
    },
    recipients: [{
      address: recipient,
      substitution_data: substitutions,
    }],
  })
}

function sendSignupConfirmationEmail (user, token) {
  if (!process.env.MAILER_ENABLED) {
    return true
  }

  let recipient = user.email
  let name = user.firstName
  // override recipient in dev/test if override is set
  if (process.env.NODE_ENV !== 'production' && process.env.OVERRIDE_EMAIL) {
    recipient = process.env.OVERRIDE_EMAIL
    name = 'NoName'
  }

  return sendSingleEmail(SIGNUP_CONFIRM_TEMPLATE, recipient, {
    firstName: name,
    token: token,
  })
}

module.exports = {
  sendSingleEmail,
  sendSignupConfirmationEmail,
}
