# 🤖 بوت قصص الأنمي - Vercel

## 🚀 النشر على Vercel

### الطريقة 1: رفع الملفات يدوياً

1. اذهب إلى https://vercel.com
2. سجل دخول / أنشئ حساب
3. اضغط "New Project"
4. اختر "Import Git Repository" أو ارفع الملفات
5. ارفع مجلد `vercel-anime-bot`
6. اضغط "Deploy"

### الطريقة 2: GitHub

1. أنشئ مستودع جديد على GitHub
2. ارفع هذه الملفات:
   - `api/bot.js`
   - `package.json`
   - `vercel.json`
3. اذهب إلى Vercel واربط المستودع

---

## ⚡ تفعيل البوت

بعد النشر، ستحصل على رابط مثل:
```
https://anime-bot-xxx.vercel.app/api/bot
```

### الخيار 1: Cron Job (مجاني)

استخدم https://cron-job.org:
1. أنشئ حساب
2. أضف cron job جديد
3. ضع الرابط: `https://your-app.vercel.app/api/bot`
4. كل دقيقة: `* * * * *`

### الخيار 2: UptimeRobot (مجاني)

1. اذهب إلى https://uptimerobot.com
2. أنشئ monitor جديد
3. ضع الرابط: `https://your-app.vercel.app/api/bot`
4. كل 5 دقائق

---

## 🤖 البوت

**https://t.me/huny67_bot**

---

## 📁 الملفات

```
vercel-anime-bot/
├── api/
│   └── bot.js      ← كود البوت
├── package.json    ← المتطلبات
├── vercel.json     ← إعدادات Vercel
└── README.md       ← هذا الملف
```

---

## ✨ المميزات

- ✅ برومبتات صور كاملة
- ✅ برومبتات متطابقة 100%
- ✅ برومبتات فيديو لكل مشهد
- ✅ يعمل 24/7 على Vercel مجاناً
