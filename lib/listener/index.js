const Dashbot = require('dashbot');

let dashbot = null;

function getUserIdAndSessionId(client, message) {
    let userId = message.userId ? message.userId : null;
    let sessionId = message.sessionId ? message.sessionId : null;
    if (userId === null && sessionId !== null) {
    // Flip the values, userId is mandatory.
        userId = sessionId;
        sessionId = null;
    }
    if (userId === null) {
        userId = client;
    }

    return { userId, sessionId };
}


function inputHeard(client, message) {
    const userSessionIds = getUserIdAndSessionId(client, message);
    const dashbotMessage = { text: message.input, userId: userSessionIds.userId, platformJson: JSON.stringify(message) };
    if (userSessionIds.sessionId !== null) {
        dashbotMessage.conversationId = userSessionIds.sessionId;
    }
    dashbot.logIncoming(dashbotMessage);
}

function outputReplied(client, message) {
    const userSessionIds = getUserIdAndSessionId(client, message);
    const dashbotMessage = { text: message.output, userId: userSessionIds.userId, platformJson: JSON.stringify(message) };
    if (userSessionIds.sessionId !== null) {
        dashbotMessage.conversationId = userSessionIds.sessionId;
    }
    dashbot.logOutgoing(dashbotMessage);
}

/**
 * return @Promise
 */
async function start(config, eventEmitter) {
    if (!config.apiKey) {
        throw new Error('No Dashbot apiKey configured.');
    }
    eventEmitter.on('input.heard', inputHeard);
    eventEmitter.on('output.reply', outputReplied);
    dashbot = Dashbot(config.apiKey).generic;
}

module.exports = { start };
