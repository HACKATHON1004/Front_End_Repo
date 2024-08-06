import { useState } from 'react';
import axios from 'axios';

export default function RecommendAI() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  
  const OPENAI_API_KEY = '';

  const api = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  async function getOpenAIResponse(prompt) {
    try {
      const response = await api.post('/completions', {
        model: 'gpt-3.5-turbo',
        prompt: prompt,
        max_tokens: 150
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
      throw error;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiResponse = await getOpenAIResponse(prompt);
      setResponse(apiResponse.choices[0].text);
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
      setResponse('Error fetching response');
    }
  };

  return (
    <div>
      <h1>OpenAI와 대화하기</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows="10"
          cols="50"
        />
        <br />
        <button type="submit">전송</button>
      </form>
      <h2>응답</h2>
      <p>{response}</p>
    </div>
  );
}
