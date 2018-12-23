// Using api keu from env var SPARKPOST_API_KEY
const SparkPost = require('sparkpost')
const client = new SparkPost()

// SparkPost template names (it's possible to get this via API)
// TODO move this tp database so it can be changed without downtime
const SIGNUP_CONFIRM_TEMPLATE = 'sign-up-confirmation'
const PASSWORD_RECOVERY_TEMPLATE = 'password-recovery'

const sendSingleEmail = (template, recipient, substitutions) => {
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

const sendSignupConfirmationEmail = (user, token) => {
  if (process.env.MAILER_ENABLED === '0') {
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
    name,
    token,
  })
}

const sendPasswordRecoveryEmail = (user, token) => {
  if (process.env.MAILER_ENABLED === '0') {
    return true
  }

  let recipient = user.email
  // override recipient in dev/test if override is set
  if (process.env.NODE_ENV !== 'production' && process.env.OVERRIDE_EMAIL) {
    recipient = process.env.OVERRIDE_EMAIL
  }

  return sendSingleEmail(PASSWORD_RECOVERY_TEMPLATE, recipient, {
    token,
  })
}


module.exports = {
  sendSignupConfirmationEmail,
  sendPasswordRecoveryEmail,
}
