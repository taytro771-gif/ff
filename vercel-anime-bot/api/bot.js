const BOT_TOKEN = "8637843288:AAHdQFSOgrFXRqrobGVDNObvEP0FaPbKqOo";

// Global state
let offset = 0;
const sessions = new Set();
let isProcessing = false;

// AI Call
async function callAI(prompt) {
  const ZAI = (await import("z-ai-web-dev-sdk")).default;
  const zai = await ZAI.create();
  const completion = await zai.chat.completions.create({
    messages: [
      { role: "system", content: "أنت كاتب قصص أنمي محترف. تكتب بالعربية مع برومبتات صور وفيديو متسقة." },
      { role: "user", content: prompt }
    ],
    temperature: 0.8,
    max_tokens: 5000,
  });
  return completion.choices[0]?.message?.content || "❌ فشل إنشاء القصة";
}

function buildPrompt(req) {
  return `أكتب قصة أنمي عن: ${req}

قواعد:
1. أنشئ أوصاف شخصيات كاملة أولاً
2. كل برومبت مشهد يستخدم نفس أوصاف الشخصيات بالضبط

التنسيق:

🎌 **العنوان**

📖 **القصة:** [3-5 جمل]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👥 **الشخصيات:**

👤 **[الاسم]** - [الدور]
📝 **المظهر:** [وصف]
⚡ **القوة:** [القدرات]
📸 **برومبت الصورة:**
Anime character design, [Name], [role], [hair], [eyes], [outfit], Naruto style, 4K masterpiece

[3-5 شخصيات]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎬 **المشاهد:**

🎞️ **مشهد 1: [عنوان]**
📸 **برومبت الصورة:**
Anime scene, [scene], [Character: same appearance], [action], 4K
🎥 **برومبت الفيديو:**
Anime animation, [scene], [action], 5-10s

[4-6 مشاهد]

📍 **مواقع:** leonardo.ai | runwayml.com | pika.art`;
}

async function sendMsg(chatId, text) {
  const clean = text.replace(/```/g, "").replace(/\*\*\*/g, "**");
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: clean.substring(0, 4000), parse_mode: "Markdown" }),
  });
}

export default async function handler(req, res) {
  if (isProcessing) return res.json({ ok: true, status: "busy" });
  isProcessing = true;

  try {
    const r = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${offset}&limit=5`);
    const data = await r.json();

    if (!data.ok || !data.result?.length) {
      isProcessing = false;
      return res.json({ ok: true, status: "no_updates" });
    }

    for (const update of data.result) {
      offset = update.update_id + 1;
      const msg = update.message;
      if (!msg?.text) continue;

      const chatId = msg.chat.id;
      const userId = msg.from?.id;
      const name = msg.from?.first_name || "صديقي";
      const text = msg.text;

      console.log(`📩 ${name}: ${text.substring(0, 30)}`);

      if (text === "/start") {
        sessions.add(userId);
        await sendMsg(chatId, `👋 *أهلاً ${name}!*

🤖 *بوت قصص الأنمي*

✨ برومبتات متطابقة 100%
✨ صور وفيديو لكل مشهد

📝 أرسل طلبك!`);
      } else if (!text.startsWith("/")) {
        if (!sessions.has(userId)) sessions.add(userId);
        await sendMsg(chatId, `⏳ *جاري الإنشاء...*`);
        const story = await callAI(buildPrompt(text));
        await sendMsg(chatId, story);
        console.log(`✅ Story sent`);
      }
    }

    isProcessing = false;
    return res.json({ ok: true, processed: data.result.length });
  } catch (e) {
    isProcessing = false;
    return res.json({ ok: false, error: e.message });
  }
}
