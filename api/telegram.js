export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({ status: 'Telegram webhook receiver active' });
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  if (!TELEGRAM_BOT_TOKEN) {
    console.error('TELEGRAM_BOT_TOKEN is missing');
    return res.status(500).json({ error: 'Config error' });
  }

  const body = req.body;

  try {
    if (body.message && body.message.text) {
      const chatId = body.message.chat.id;
      const text = body.message.text.trim();
      const userName = body.message.from.first_name || 'User';

      let replyText = `Hey ${userName}! Tap below to launch your regional reward allocation:`;
      let payloadUrl = 'https://toolerkit-cpav1-git-main-toolerkitdigest.vercel.app/';

      if (text.startsWith('/start')) {
        const payload = text.split(' ')[1] || 'global';
        replyText = `Region payload locked (**${payload.toUpperCase()}**). Tap below to claim:`;
        payloadUrl = `https://toolerkit-cpav1-git-main-toolerkitdigest.vercel.app/?geo=${payload}`;
      } else if (text === '/drop') {
        replyText = `🔥 High-EPC Tier 1/2 drop live. Tap to verify device:`;
      }

      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: replyText,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: '⚡ Claim Allocation Now', url: payloadUrl }]
            ]
          }
        }),
      });
    }

    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    return res.status(500).json({ error: 'Failed processing webhook' });
  }
}
