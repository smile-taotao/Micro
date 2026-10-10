var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var ai = new import_genai.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy" });
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.post("/api/extract", async (req, res) => {
    try {
      const { transcript } = req.body;
      if (!transcript) {
        return res.status(400).json({ error: "Transcript is required" });
      }
      const prompt = `
Extract the following fields from the conversation transcript. If a field is not found, leave it empty.
Format the output as a JSON object with the following keys:
- \u5BA2\u6237\u540D\u79F0 (Customer Name)
- \u624B\u673A\u53F7 (Phone Number)
- \u7ECF\u8425\u4E3B\u4F53\u540D\u79F0 (Business Name)
- \u7ECF\u8425\u4E3B\u4F53\u6210\u7ACB\u65F6\u95F4 (Business Setup Time, YYYY-MM-DD)
- \u8EAB\u4EFD\u8BC1\u53F7 (ID Card)
- \u767B\u8BB0\u5730\u5740 (Registration Address)
- \u56FA\u5B9A\u7535\u8BDD (Landline)
- \u5176\u4ED6\u8054\u7CFB\u65B9\u5F0F (Other Contact)
- \u8425\u9500\u6210\u679C (Marketing Result)
- \u5185\u5BB9\u767B\u8BB0 (Summary of the conversation)

Transcript:
"${transcript}"

JSON Format only:
`;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      const text = response.text();
      res.json(JSON.parse(text));
    } catch (error) {
      console.error("Gemini extraction error:", error);
      res.status(500).json({ error: "Failed to extract information" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
