# HomeSwitchBot

SwitchBotのデバイス状態が変化した際に、Discordに自動通知を送るNode.js製ミニアプリです。

## 📦 必要なもの

- SwitchBotアカウントとトークン
- SwitchBotデバイスID（Botやカーテン等）
- Discord Webhook URL

## 🚀 セットアップ

1. リポジトリをクローン：

```bash
git clone https://github.com/youruser/switchbot-discord-notifier.git cd switchbot-discord-notifier
```

2. 依存パッケージをインストール：

```bash
npm install
```


3. `.env` ファイルを作成し、以下の情報を記入：

```bash
SWITCHBOT_TOKEN=あなたのトークン SWITCHBOT_DEVICE_ID=デバイスID DISCORD_WEBHOOK_URL=Webhook URL
```

4. 実行：

```bash
npm start
```

## 📝 補足

- SwitchBot APIは1分間に最大20リクエストが推奨です。
- Discord Webhookは無料で利用できます。
- サーバーに常駐させたい場合は `pm2` などをご検討ください。

## 📄 ライセンス

MIT
