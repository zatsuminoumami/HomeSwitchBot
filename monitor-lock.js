require("dotenv").config();
const axios = require("axios");
const { notifyDiscord } = require("./discord-notify");

const INTERVAL = 10 * 1000; // 10秒ごと
const deviceId = process.env.LOCK_DEVICE_ID;

let lastLocked = null;

async function getLockStatus() {
  const res = await axios.get(`https://api.switch-bot.com/v1.1/devices/${deviceId}/status`, {
    headers: {
      Authorization: process.env.SWITCHBOT_TOKEN
    }
  });

  return res.data.body;
}

async function monitorLock() {
  const status = await getLockStatus();
  const isLocked = status.lockState === "locked";

  if (lastLocked !== null && lastLocked !== isLocked) {
    const stateStr = isLocked ? "🔒 ロックされました" : "🔓 ロック解除されました";
    await notifyDiscord(`【SwitchBotロック】状態変化検知\n${stateStr}`);
  }

  lastLocked = isLocked;
}

setInterval(monitorLock, INTERVAL);
console.log("🔍 SwitchBotロックの状態を監視中...");
