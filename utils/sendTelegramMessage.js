require("dotenv").config();

const { TGBOT, CHAT } = process.env;

const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(TGBOT, {
  polling: true,
});

const sendMessageInTg = (message) => {
  bot.sendMessage(CHAT, message);
};

module.exports = sendMessageInTg;
