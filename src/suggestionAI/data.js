import axios from "axios";

export async function askAi(prompt) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${process.env.REACT_APP_EDENAI_API_KEY}`,
    },
    body: JSON.stringify({
      providers: "openai/gpt-3.5-turbo",
      text: prompt,
      chatbot_global_action: "Act as an assistant",
      // previous_history: [
      //   {
      //     role: "user",
      //     message: "",
      //   },
      //   { role: "assistant", message: "" },
      // ],
      temperature: 0,
      max_tokens: 100,
    }),
  };

  return fetch("https://api.edenai.run/v2/text/chat", options)
    .then((response) => response.json())
    .then((response) => {
      return response["openai/gpt-3.5-turbo"].generated_text;
    })
    .catch((err) => console.error(err));
}
