require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { notifyDiscord } = require("./discord-notify");

const app = express();
app.use(bodyParser.json());

app.post("/webhook", async (req, res) => {
  const event = req.body;
  console.log("📩 Webhook受信:", event);

  // イベントに応じてメッセージ生成
  const message = `📡 SwitchBotイベント受信:\n${JSON.stringify(event, null, 2)}`;
  await notifyDiscord(message);

  res.sendStatus(200);
});

const PORT = process.env.WEBHOOK_PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Webhookサーバー起動中: http://localhost:${PORT}/webhook`);
});
