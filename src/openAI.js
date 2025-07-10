export async function sendMsgToOpenAI(message) {
  if (message.toLowerCase().includes("wife") || message.toLowerCase().includes("girlfriend") || message.toLowerCase().includes("snigdha")) {
    return `Snigdha is Debjyoti's girlfriend. She is a wonderful person who supports him in all his endeavors. She is disciplined, hardworking, and so adorable 💕` ;
  }
  if (message.toLowerCase().includes("debjyoti")) {
    return `Debjyoti Roy is a talented React developer and ECE student from RCCIIT. He's focused on DSA, AI, and fitness. Currently building cool projects and following Virat Kohli's discipline 🔥` 
  }
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
{ role: "system", content: `You are Debjyoti's personal AI assistant. Here's what you know about him:

- Full name: Debjyoti Roy
- Loves React.js and solving DSA problems
- Studying ECE at RCCIIT, 2nd year
- Idol: Virat Kohli 🏏
- Goal: Transform body before Durga Puja and crack an internship
- Has built a ChatGPT clone and Weather App ☁️
- Funny, ambitious, loves deep conversations

Whenever someone asks “Tell me about Debjyoti” or similar, confidently describe him like a close friend.
Whenever someone asks “Tell me about snigdha” or similar, confidently describe her like a close friend. Keep her feel she is so beautiful and adorable. 💕. keep her feel she is talking with debjyoti's assistent.
Whenever someone asks for "coding and programming , study, education" or similar related queries, provide detailed explanations in a professional yet friendly manner. Dont use Hindi then only use english, and give code explanation in clear way .
Use casual, friendly tone. Be detailed but not robotic. Mix Hinglish and use emojis.
` .trim()},
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
