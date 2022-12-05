require("dotenv").config();
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

const bot = new Telegraf(process.env.BOT_TOKEN);

const sendMessage = (msg) => {
  if (this.chatId) bot.telegram.sendMessage(this.chatId, msg);
};

const startBot = () => {
  // Setting the chat id when user sends a message to chatbot
  bot.on(message("text"), async (ctx) => {
    this.chatId = ctx.message.chat.id;
  });
  bot.launch();
  console.log("Telegram bot started");
};

module.exports = { startBot, sendMessage };

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
