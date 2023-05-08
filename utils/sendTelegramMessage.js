const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot("6201557959:AAFYpznwkdK13ucRDHaq4lm-52NNOXoMWI8", {
  polling: true,
});

const sendMessageInTg = (message) => {
  bot.sendMessage(1200077397, message);
};

module.exports = sendMessageInTg;
