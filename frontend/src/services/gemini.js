const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are an AI Life Planner assistant called "Antigravity AI". You help users plan their life by generating structured plans, study schedules, project roadmaps, and productivity advice.

IMPORTANT RULES:
1. When a user asks you to create a plan, generate tasks, or schedule something, you MUST respond with a JSON block wrapped in \`\`\`json ... \`\`\` that contains an array of task objects.
2. Each task object must have: "title", "description", "deadline" (YYYY-MM-DD format, starting from today onwards), "priority" ("high"/"medium"/"low"), "planner" ("school"/"ug"/"exam"/"daily"/"office"), "status" ("pending").
3. Generate realistic, actionable tasks with proper spacing across dates.
4. If the user asks a general question (not plan generation), respond normally in plain text without JSON.
5. Always be motivational, professional, and specific in your advice.
6. Today's date is ${new Date().toISOString().split('T')[0]}.
7. When generating plans, create 5-15 tasks depending on the scope.`;

// Ordered list of model endpoints to try — most stable first
const MODEL_ENDPOINTS = [
  // v1 stable endpoints (no API version issues)
  { url: (key) => `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${key}`, useSystemInstruction: true },
  { url: (key) => `https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=${key}`, useSystemInstruction: false },
  // v1beta fallbacks
  { url: (key) => `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`, useSystemInstruction: true },
  { url: (key) => `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${key}`, useSystemInstruction: true },
];

export async function sendToGemini(userMessage, conversationHistory = []) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured. Add VITE_GEMINI_API_KEY to your .env file.');
  }

  let lastError = null;

  for (const endpoint of MODEL_ENDPOINTS) {
    try {
      const url = endpoint.url(GEMINI_API_KEY);

      // Build conversation contents
      const contents = [];

      if (!endpoint.useSystemInstruction) {
        // Older models: inject system prompt as first exchange
        contents.push({ role: 'user', parts: [{ text: SYSTEM_PROMPT }] });
        contents.push({ role: 'model', parts: [{ text: 'Understood. I am Antigravity AI, your Life Planner assistant.' }] });
      }

      // Add recent conversation history
      const recentHistory = conversationHistory.slice(-4);
      for (const msg of recentHistory) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      }

      // Current message
      contents.push({ role: 'user', parts: [{ text: userMessage }] });

      const requestBody = {
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
          topP: 0.95,
        }
      };

      // Add system_instruction only for models that support it
      if (endpoint.useSystemInstruction) {
        requestBody.system_instruction = {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }]
        };
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        lastError = errData.error?.message || `HTTP ${response.status}`;
        console.warn(`Endpoint failed [${url}]: ${lastError}`);
        continue; // Try next
      }

      const data = await response.json();

      if (data.candidates?.[0]?.finishReason === 'SAFETY') {
        return 'I cannot process that request due to content safety filters. Please rephrase your goal.';
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        lastError = 'Empty AI response';
        continue;
      }

      return text;

    } catch (err) {
      lastError = err.message;
      console.warn(`Endpoint exception: ${err.message}`);
      continue;
    }
  }

  throw new Error(`AI service unavailable. Please verify your Gemini API key is valid and has the Generative Language API enabled in Google Cloud Console. Last error: ${lastError}`);
}

/**
 * Parses a Gemini response to extract any JSON task array
 * Returns { text: string, tasks: array|null }
 */
export function parseGeminiResponse(responseText) {
  const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);

  if (jsonMatch) {
    try {
      let parsed = JSON.parse(jsonMatch[1]);
      if (parsed && !Array.isArray(parsed) && parsed.tasks) {
        parsed = parsed.tasks;
      }
      const tasks = Array.isArray(parsed) ? parsed : [parsed];
      const validTasks = tasks.filter(t => t && t.title);

      if (validTasks.length > 0) {
        const textPart = responseText.replace(/```(?:json)?[\s\S]*?```/, '').trim();
        return {
          text: textPart || `Generated ${validTasks.length} tasks. Click "Add All Tasks" to import them.`,
          tasks: validTasks
        };
      }
    } catch (e) {
      console.warn('JSON parse failed:', e.message);
    }
  }

  return { text: responseText, tasks: null };
}
