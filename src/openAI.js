export async function sendMsgToOpenAI(message) {
 

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "ChatGPT Clone",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat:free", //  model name
        messages: [
{ role: "system", content: `You are a helpful assistant. Please respond to the user's queries in a concise and informative manner.Be friendly but proffesional. If you don't know the answer, say "I don't know."`.trim()},
          { role: "user", content: message },
        ],
      }),
    });

    const data = await res.json();
    console.log("API Response:", data);

    if (data.error) {
      return `❌ Error: ${data.error.message}`;
    }

    return data.choices?.[0]?.message?.content || "No response received.";
  } catch (error) {
    return `❌ Error: ${error.message}`;
  }
}
