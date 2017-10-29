const Dashbot = require('dashbot')
let dashbot = null

/**
 * return @Promise
 */
function start (config, eventEmitter) {
  return new Promise(function (resolve, reject) {
    if (!config.apiKey) {
      reject(new Error('No Dashbot apiKey configured.'))
    }
    eventEmitter.on('input.heard', inputHeard)
    eventEmitter.on('output.reply', outputReplied)
    dashbot = Dashbot(config.apiKey).generic
    resolve()
  })
}

function inputHeard (client, message) {
  const userSessionIds = getUserIdAndSessionId(client, message)
  let dashbotMessage = {text: message.input, userId: userSessionIds.userId, platformJson: JSON.stringify(message)}
  if (userSessionIds.sessionId !== null) {
    dashbotMessage.conversationId = userSessionIds.sessionId
  }
  dashbot.logIncoming(dashbotMessage)
}

function outputReplied (client, message) {
  const userSessionIds = getUserIdAndSessionId(client, message)
  let dashbotMessage = {text: message.output, userId: userSessionIds.userId, platformJson: JSON.stringify(message)}
  if (userSessionIds.sessionId !== null) {
    dashbotMessage.conversationId = userSessionIds.sessionId
  }
  dashbot.logOutgoing(dashbotMessage)
}

function getUserIdAndSessionId (client, message) {
  let userId = message.userId ? message.userId : null
  let sessionId = message.sessionId ? message.sessionId : null
  if (userId === null && sessionId !== null) {
    // Flip the values, userId is mandatory.
    userId = sessionId
    sessionId = null
  }
  if (userId === null) {
    userId = client
  }

  return {userId: userId, sessionId: sessionId}
}

module.exports = {start: start}
