require("dotenv").config();
const axios = require("axios");

async function notifyDiscord(content) {
  try {
    await axios.post(process.env.DISCORD_WEBHOOK_URL, { content });
    console.log("📤 Discord通知送信:", content);
  } catch (e) {
    console.error("Discord通知失敗:", e.message);
  }
}

module.exports = { notifyDiscord };
