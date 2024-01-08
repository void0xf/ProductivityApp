import axios from "axios";


export async function askAi(prompt) {
  const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/text/chat",
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_EDENAI_API_KEY}`,
    },
    data: {
      providers: "openai",
      text: prompt,
      chatbot_global_action: "Act as an assistant",
      previous_history: [],
      temperature: 0.5,
      max_tokens: 1000,
      fallback_providers: "",
    },
  };

  return axios(options).then((response) => {
    return response.data.openai.generated_text
  })
  .catch((error) => {
    console.error('Error in AI Api', error.message);
    return ''
  });

}