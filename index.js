const { startBot } = require("./bot");
const checkAppleStore = require("./apple");

// Starting Telegram Bot - Send text message to BirdBot in telegram app to receive messages.
startBot();

// checking apple stores every 5 minutes.
console.log("Checking Apple stores for iPhone 14 Pro");
const intervalInMs = 300000;
setInterval(() => checkAppleStore(), intervalInMs);
