const axios = require("axios");
const fs = require("fs");

const SWITCHBOT_TOKEN = process.env.SWITCHBOT_TOKEN;
const DEVICE_ID = process.env.SWITCHBOT_DEVICE_ID;
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const POLL_INTERVAL_MS = 10000; // 10秒ごとにチェック

let lastStatus = null;

async function getDeviceStatus() {
  try {
    const response = await axios.get(`https://api.switch-bot.com/v1.1/devices/${DEVICE_ID}/status`, {
      headers: {
        Authorization: SWITCHBOT_TOKEN
      }
    });
    return response.data.body;
  } catch (err) {
    console.error("SwitchBot取得エラー:", err.message);
    return null;
  }
}

async function sendDiscordNotification(content) {
  try {
    await axios.post(DISCORD_WEBHOOK_URL, {
      content: content
    });
    console.log("Discordに通知:", content);
  } catch (err) {
    console.error("Discord通知エラー:", err.message);
  }
}

async function monitor() {
  const status = await getDeviceStatus();
  if (!status) return;

  const currentState = JSON.stringify(status);

  if (currentState !== lastStatus) {
    lastStatus = currentState;
    await sendDiscordNotification(`📡 SwitchBotの状態が変わりました: \n${currentState}`);
  }
}

setInterval(monitor, POLL_INTERVAL_MS);
console.log("✅ SwitchBot監視中...");
