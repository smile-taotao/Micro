import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy' });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post('/api/extract', async (req, res) => {
    try {
      const { transcript } = req.body;
      if (!transcript) {
        return res.status(400).json({ error: 'Transcript is required' });
      }

      const prompt = `
Extract the following fields from the conversation transcript. If a field is not found, leave it empty.
Format the output as a JSON object with the following keys:
- 客户名称 (Customer Name)
- 手机号 (Phone Number)
- 经营主体名称 (Business Name)
- 经营主体成立时间 (Business Setup Time, YYYY-MM-DD)
- 身份证号 (ID Card)
- 登记地址 (Registration Address)
- 固定电话 (Landline)
- 其他联系方式 (Other Contact)
- 营销成果 (Marketing Result)
- 内容登记 (Summary of the conversation)

Transcript:
"${transcript}"

JSON Format only:
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
        }
      });

      const text = response.text();
      res.json(JSON.parse(text));
    } catch (error) {
      console.error('Gemini extraction error:', error);
      res.status(500).json({ error: 'Failed to extract information' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
