const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are an AI Life Planner assistant called "Antigravity AI". You help users plan their life by generating structured plans, study schedules, project roadmaps, and productivity advice.

IMPORTANT RULES:
1. When a user asks you to create a plan, generate tasks, or schedule something, you MUST respond with a JSON block wrapped in \`\`\`json ... \`\`\` that contains an array of task objects.
2. Each task object must have: "title", "description", "deadline" (YYYY-MM-DD format, starting from today onwards), "priority" ("high"/"medium"/"low"), "planner" ("school"/"ug"/"exam"/"daily"/"office"), "status" ("pending").
3. Generate realistic, actionable tasks with proper spacing across dates.
4. If the user asks a general question (not plan generation), respond normally in plain text without JSON.
5. Always be motivational, professional, and specific in your advice.
6. Today's date is ${new Date().toISOString().split('T')[0]}.
7. When generating plans, create 5-15 tasks depending on the scope.`;

export async function sendToGemini(userMessage, conversationHistory = []) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  const contents = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: 'Understood. I am Antigravity AI, your Life Planner assistant. I will generate structured task plans when asked, and provide helpful advice otherwise. How can I help you today?' }] },
    ...conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    })),
    { role: 'user', parts: [{ text: userMessage }] }
  ];

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096
      }
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || `Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
  return text;
}

/**
 * Parses a Gemini response to extract any JSON task array
 * Returns { text: string, tasks: array|null }
 */
export function parseGeminiResponse(responseText) {
  const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
  
  if (jsonMatch) {
    try {
      const tasks = JSON.parse(jsonMatch[1]);
      // Extract the text part (everything outside the JSON block)
      const textPart = responseText.replace(/```json[\s\S]*?```/, '').trim();
      return { text: textPart || 'Here is your generated plan. Click "Add All Tasks" to import them into your planner.', tasks: Array.isArray(tasks) ? tasks : [tasks] };
    } catch (e) {
      // JSON parsing failed, return as plain text
    }
  }

  return { text: responseText, tasks: null };
}
