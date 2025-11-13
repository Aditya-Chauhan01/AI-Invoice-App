// testGemini.js
import 'dotenv/config';
// require("dotenv").config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ Missing GEMINI_API_KEY in .env file");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function main() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent("Explain how AI works in a few words.");
    console.log("✅ Gemini says:", result.response.text());
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

main();
