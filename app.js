require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
let swaggerDocument = require("./swagger/swagger.json");
const path = require("path");

const app = express();

// تنظیم CORS برای پذیرش همه دامنه‌ها
app.use(
  cors({
    origin: "*", // یا دامنه‌های خاص برای محدود کردن
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// تنظیمات json برای درخواست‌ها
app.use(express.json());

// فایل‌های استاتیک
app.use("/static", express.static(path.join(__dirname, "public")));

// تعریف پورت
const PORT = process.env.PORT || 6501;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// تغییر URL برای Swagger
swaggerDocument.servers = [
  {
    url: BASE_URL,
    description: "API server",
  },
];

// نمایش مستندات Swagger قبل از تعریف مسیرهای دیگر
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
console.log(`Swagger API docs are available at ${BASE_URL}/api-docs`);

// راه‌اندازی سرور و بررسی پورت آزاد
const startServer = (port) => {
  const server = app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${port} is in use, trying port ${+port + 1}...`);
      startServer(+port + 1);
    } else {
      console.error("Server error:", err);
    }
  });
};

startServer(PORT);

// تعریف مسیرهای مختلف
app.use(require("./routes/dev"));
app.use("/auth", require("./routes/auth"));
app.use("/tour", require("./routes/tour"));
app.use("/basket", require("./routes/basket"));
app.use("/user", require("./routes/user"));
app.use("/order", require("./routes/order"));

// مسیر اصلی
app.get("/", (req, res) => {
  res.send("Welcome to the Tour and Travel Agency API!");
});
