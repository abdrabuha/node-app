# 📋 Node Task Manager · إدارة المهام (العربية / English)

> ⭐ **ادعمنا بنجمة:** إذا أعجبك المشروع أو استفدت منه، لا تنسَ أن تمنحنا ⭐ نجمة — دعمك يصنع فرقاً كبيراً!
> ⭐ **Give us a star:** if you like this project or learned something from it, please give us a ⭐ star — your support means a lot!

> **The Why:** تطبيق ويب تعليمي كامل لتعلّم بناء REST API بإطار Express مع قاعدة بيانات MongoDB عبر Mongoose — تضيف المهام وتعرضها وتحذفها من واجهة ثنائية اللغة (عربي/إنجليزي)، في مثال CRUD واحد واضح ومعلّق.
>
> **The Why (EN):** a complete educational web app for learning REST APIs with Express and MongoDB via Mongoose — add, list, and delete tasks from a bilingual (AR/EN) interface, all in one clean, commented CRUD example.

<div align="center">

[![Node](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=white)]()
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)]()
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)]()
[![License](https://img.shields.io/badge/License-MIT-green)]()

</div>

## 🚀 Quickstart / التشغيل السريع

**المتطلبات / Requirements:** Node.js 18+ · MongoDB (محلي أو Docker)

```bash
# 1) شغّل MongoDB إن لم يكن مثبتاً / run MongoDB if not installed
docker run -d -p 27017:27017 --name mongo mongo

# 2) ثبّت الحزم / install packages
npm install

# 3) (اختياري) إعدادات البيئة / optional environment
copy .env.example .env        # Windows
cp .env.example .env          # macOS / Linux

# 4) شغّل / start
npm start
```

افتح المتصفح على / open your browser:
- **http://localhost:3000** ← الرئيسية / landing
- **http://localhost:3000/main** ← المهام / tasks page
- **http://localhost:3000/about** ← عن المطوّر / about

## 🛣️ Routes / المسارات

| Method | Path | الوظيفة · Purpose |
|---|---|---|
| GET | `/` | الصفحة الرئيسية · Landing page |
| GET | `/main` | صفحة المهام · Tasks page |
| GET | `/about` | صفحة "من أنا" · About page |
| GET | `/getTasks` | كل المهام JSON · All tasks (JSON) |
| GET | `/showTasks` | مرادف لـ /getTasks للتوافق · alias |
| POST | `/addTask` | إضافة مهمة `{taskName, dueDate}` |
| DELETE | `/deleteTask/:id` | حذف مهمة بمعرّفها · Delete a task |
| GET | `/api/health` | فحص الخادم · Health check |

**مثال الإضافة / add example:**
```bash
curl -X POST http://localhost:3000/addTask \
  -H "Content-Type: application/json" \
  -d "{\"taskName\":\"مراجعة Node.js\",\"dueDate\":\"2026-12-31\"}"
```
## 🧠 What you will learn / ماذا ستتعلم

| Concept | أين / Where |
|---|---|
| REST API basics (GET/POST/DELETE) | `app.js` routes |
| Express middleware & static files | `app.js` |
| Mongoose Schema + Model | `app.js` (Task) |
| MongoDB connection & `.env` | `app.js` + `.env.example` |
| Fetch API من المتصفح / from the browser | `public/main.html` |
| واجهة ثنائية اللغة RTL/AR + EN | `public/*.html` |
| Validate input & handle errors | `app.js` |

## 📁 Structure / البنية

```text
node-app/
├── app.js                  # Express server + Mongoose CRUD
├── package.json
├── .env.example            # PORT و MONGODB_URI
├── public/
│   ├── index.html          # الرئيسية (ثنائية اللغة)
│   ├── main.html           # صفحة المهام (إضافة/عرض/حذف)
│   └── about.html          # صفحة "من أنا"
└── README.md
```

## 🛠️ Common errors / مشاكل شائعة

| المشكلة / Error | الحل / Fix |
|---|---|
| `MongooseServerSelectionError` | تأكد أن MongoDB يعمل: `docker ps` أو شغّل أمر docker أعلاه |
| `EADDRINUSE` | غيّر المنفذ: عدّل `PORT` في `.env` |
| `Cannot read properties of undefined` | أرسل `Content-Type: application/json` مع الطلب |
| حذف لا يعمل | المعرّف يجب أن يكون `ObjectId` صحيحاً (من `/getTasks`) |

## ➡️ Ideas to extend / أفكار للتوسعة

- إضافة `PUT /updateTask/:id` لتعديل المهمة (تكملة الـ CRUD)
- تمييز المهام المتأخرة (dueDate < today) بلون أحمر
- ربط `main.html` بزر تبديل لغة كامل (مثل تطبيق first_app)
- إضافة اختبارات `node --test` مع قاعدة بيانات اختبارية

---

## 💛 Support the Author / دعم المؤلف

> **العربية:** إذا أردت دعمي، فنشكرك ونقدّر لك ذلك بصدق. ❤️ يمكنك إرسال الدعم عبر العناوين التالية.
>
> **English:** If you want to support me, we thank and appreciate that. ❤️ You can send a donation using the addresses below.

| العملة / Coin | العنوان / Address |
|---|---|
| Bitcoin (BTC) | _يُضاف لاحقاً · to be added_ |
| Ethereum (ETH) | _يُضاف لاحقاً · to be added_ |
| Solana (SOL) | _يُضاف لاحقاً · to be added_ |
| USDT | _يُضاف لاحقاً · to be added_ |
| USDC | _يُضاف لاحقاً · to be added_ |

---

## ©️ الحقوق والترخيص · Copyright & License

**المؤلف / Author:** عبدربه العتيبي (Abdrabuh Alotaibi) · [abdrabuha@outlook.com](mailto:abdrabuha@outlook.com)

**العربية:** © 2026 عبدربه العتيبي — هذا المشروع مُرخَّص بموجب رخصة MIT؛ يمكنك استخدام الأكواد وتعديلها وتعلُّمها ومشاركتها بحرية مع الإبقاء على حقوق المؤلف.

**English:** © 2026 Abdrabuh Alotaibi — this project is licensed under the MIT License; you may freely use, modify, learn from, and share the code, provided you keep this copyright notice.

