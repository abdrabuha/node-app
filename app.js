/**
 * app.js — Node Task Manager (العربية / English)
 *
 * تطبيق إدارة مهام بسيط مبني على Express + Mongoose:
 *   - إضافة مهمة (POST /addTask)
 *   - عرض المهام (GET /getTasks أو /showTasks)
 *   - حذف مهمة (DELETE /deleteTask/:id)
 *   - صفحات ويب من مجلد public/
 *
 * A simple task manager built with Express + Mongoose:
 *   - add a task (POST /addTask)
 *   - list tasks (GET /getTasks or /showTasks)
 *   - delete a task (DELETE /deleteTask/:id)
 *   - static pages from public/
 *
 * التشغيل / Run:
 *   npm install
 *   npm start          # يتطلب MongoDB محلياً أو متغير MONGODB_URI
 */

require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// ---- Middleware: JSON body + static files ----
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ---- MongoDB connection (يُقرأ من .env أو القيمة الافتراضية) ----
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/task_manager";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log(`[db] connected to MongoDB`))
  .catch((err) => {
    console.error(`[db] connection error: ${err.message}`);
    console.error(
      "[db] Is MongoDB running? Try: docker run -d -p 27017:27017 --name mongo mongo"
    );
    process.exit(1);
  });

// ---- Task model (Schema صريح) ----
const taskSchema = new mongoose.Schema(
  {
    taskName: { type: String, required: true, trim: true },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

// ============================================================
// PAGES / الصفحات
// ============================================================

// GET / -> public/index.html (يُقدَّم تلقائياً بواسطة express.static)

// GET /main -> صفحة المهام
app.get("/main", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "main.html"));
});

// GET /about -> صفحة "من أنا"
app.get("/about", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

// ============================================================
// API / واجهة برمجية
// ============================================================

// GET /getTasks  و GET /showTasks  -> قائمة كل المهام
async function getAllTasks(_req, res) {
  try {
    const tasks = await Task.find({}).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (err) {
    console.error("[api] fetch tasks error:", err.message);
    res.status(500).json({ error: "Error fetching tasks" });
  }
}
app.get("/getTasks", getAllTasks);
app.get("/showTasks", getAllTasks); // اسم قديم محفوظ للتوافق / kept for compatibility

// POST /addTask -> إضافة مهمة { taskName, dueDate }
app.post("/addTask", async (req, res) => {
  const { taskName, dueDate } = req.body || {};
  if (!taskName || !taskName.trim()) {
    return res.status(400).json({ error: "taskName is required" });
  }
  const parsedDate = dueDate ? new Date(dueDate) : null;
  if (!parsedDate || Number.isNaN(parsedDate.getTime())) {
    return res.status(400).json({ error: "dueDate is required (YYYY-MM-DD)" });
  }
  try {
    const task = await Task.create({ taskName: taskName.trim(), dueDate: parsedDate });
    res.status(201).json(task);
  } catch (err) {
    console.error("[api] add task error:", err.message);
    res.status(500).json({ error: "Error adding task" });
  }
});

// DELETE /deleteTask/:id -> حذف مهمة
app.delete("/deleteTask/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid task id" });
  }
  try {
    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully", id });
  } catch (err) {
    console.error("[api] delete task error:", err.message);
    res.status(500).json({ error: "Error deleting task" });
  }
});

// GET /api/health -> فحص بسيط
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// ============================================================
// 404 & startup
// ============================================================
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[server] running on http://localhost:${PORT}`);
});
