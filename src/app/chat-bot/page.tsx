'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function LegalChatbotPage() {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAnswerFromAPI = async (userQuestion: string) => {
    const apiKey = "AIzaSyBtHMY1rksUEeONFav4Z-Fudlg8Gcx45XU"; 

    if (!apiKey) {
      setAnswer('API key is missing.');
      return;
    }

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [{ text: userQuestion }],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const outputText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (outputText) {
        setAnswer(outputText.trim());
      } else {
        setAnswer('No response from the system.');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      setAnswer('Error getting response from the legal assistant.');
    }
  };

  const handleSubmit = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
    setAnswer('Loading...');
    await getAnswerFromAPI(question);
    setIsLoading(false);
  };

  const handleReset = () => {
    setQuestion('');
    setAnswer('');
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
  };

  return (
    <main className="min-h-screen flex flex-col mt-28">
      <header className=" text-black px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold">New York Legal Resource Center</h1>
          <p className="text-lg mt-1">Auto Accident Legal Assistant</p>
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-3xl border border-gray-400 shadow-lg rounded-xl p-6 md:p-10">
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">AI Legal Response</label>
            <textarea
              readOnly
              rows={10}
              value={answer}
              placeholder="Get insights about No-Fault Insurance, Serious Injury, and Legal Deadlines in New York."
              className="w-full p-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 resize-none"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">Ask a Legal Question</label>
            <textarea
              rows={4}
              placeholder="e.g., What are my rights after an accident in NY?"
              value={question}
              onChange={handleQuestionChange}
              className="w-full p-4 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-primary cursor-pointer hover:bg-[#2983c0] text-white px-6 py-2 rounded-full font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Submitting...' : 'Submit Question'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-300 cursor-pointer hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-full font-medium transition"
            >
              Reset
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
