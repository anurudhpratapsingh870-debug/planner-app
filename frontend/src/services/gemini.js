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

export async function sendToGemini(userMessage, conversationHistory = []) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured. Add VITE_GEMINI_API_KEY to your .env file.');
  }

  // Try multiple model endpoints for robustness
  const models = [
    'gemini-1.5-flash',
    'gemini-1.5-pro'
  ];

  let lastError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

      // Build contents array
      const contents = [];
      
      // Add previous conversation
      const recentHistory = conversationHistory.slice(-6);
      for (const msg of recentHistory) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      }

      // Add current user message
      contents.push({ role: 'user', parts: [{ text: userMessage }] });

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
            topP: 0.95,
            topK: 64
          }
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        lastError = errData.error?.message || `API error ${response.status}`;
        console.warn(`Model ${model} failed: ${lastError}`);
        continue;
      }

      const data = await response.json();
      
      if (data.candidates?.[0]?.finishReason === 'SAFETY') {
        return 'I cannot generate content for that request due to safety restrictions. Please try rephrasing your goal.';
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        lastError = 'Empty response from model';
        continue;
      }

      return text;
    } catch (err) {
      lastError = err.message;
      console.warn(`Model ${model} exception: ${err.message}`);
      continue;
    }
  }

  throw new Error(`Could not reach AI service. Last error: ${lastError}`);
}

/**
 * Parses a Gemini response to extract any JSON task array
 * Returns { text: string, tasks: array|null }
 */
export function parseGeminiResponse(responseText) {
  // Try to find JSON wrapped in code fences
  const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  
  if (jsonMatch) {
    try {
      let parsed = JSON.parse(jsonMatch[1]);
      // Handle if the JSON is wrapped in an object like { tasks: [...] }
      if (parsed && !Array.isArray(parsed) && parsed.tasks) {
        parsed = parsed.tasks;
      }
      const tasks = Array.isArray(parsed) ? parsed : [parsed];
      
      // Validate task structure
      const validTasks = tasks.filter(t => t && t.title);
      if (validTasks.length > 0) {
        const textPart = responseText.replace(/```(?:json)?[\s\S]*?```/, '').trim();
        return { 
          text: textPart || `Generated ${validTasks.length} tasks for your plan. Click "Add All Tasks" to import them into your planner.`, 
          tasks: validTasks 
        };
      }
    } catch (e) {
      console.warn('JSON parse failed:', e.message);
    }
  }

  return { text: responseText, tasks: null };
}
