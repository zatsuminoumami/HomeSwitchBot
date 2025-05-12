require("dotenv").config();
const axios = require("axios");

const deviceId = process.env.LOCK_DEVICE_ID;

async function pressBot() {
  try {
    await axios.post(
      `https://api.switch-bot.com/v1.1/devices/${deviceId}/commands`,
      {
        command: "press",
        parameter: "default",
        commandType: "command"
      },
      {
        headers: {
          Authorization: process.env.SWITCHBOT_TOKEN,
          "Content-Type": "application/json"
        }
      }
    );
    console.log("✅ Bot操作：press 実行完了");
  } catch (err) {
    console.error("Bot操作失敗:", err.message);
  }
}

pressBot();
