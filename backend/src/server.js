import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 5000;

console.log("🚀 Starting server on port:", PORT);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});