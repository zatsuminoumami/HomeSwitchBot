require("dotenv").config();
const axios = require("axios");

async function getDevices() {
  try {
    const res = await axios.get("https://api.switch-bot.com/v1.1/devices", {
      headers: {
        Authorization: process.env.SWITCHBOT_TOKEN
      }
    });

    const devices = res.data.body.deviceList;
    console.log("📋 登録デバイス一覧:");
    devices.forEach((d, i) => {
      console.log(`[${i + 1}] ${d.deviceName} (${d.deviceType}) - ID: ${d.deviceId}`);
    });
  } catch (e) {
    console.error("取得失敗:", e.message);
  }
}

getDevices();
