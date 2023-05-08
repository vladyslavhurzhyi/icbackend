require("dotenv").config();

const { TGBOT } = process.env;

const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(TGBOT, {
  polling: true,
});

const sendMessageInTg = (message) => {
  bot.sendMessage(-1001922535971, message);
};

module.exports = sendMessageInTg;
