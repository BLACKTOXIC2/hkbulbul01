import React, { useState } from 'react';
import { Brain } from 'lucide-react';

interface QuizFormProps {
  onSubmit: (text: string, numQuestions: number) => void;
  isLoading: boolean;
}

const QuizForm: React.FC<QuizFormProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 50) {
      alert('Please enter at least 50 characters of text to generate meaningful questions.');
      return;
    }
    onSubmit(text, numQuestions);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl">
      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
          Enter your text (minimum 50 characters)
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Paste your text here (at least 50 characters)..."
          required
          minLength={50}
        />
        <div className="mt-1 text-sm text-gray-500">
          {text.length}/50 characters minimum
        </div>
      </div>
      
      <div>
        <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700 mb-2">
          Number of questions (1-10)
        </label>
        <input
          type="number"
          id="numQuestions"
          min="1"
          max="10"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Math.min(10, Math.max(1, Number(e.target.value))))}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || text.length < 50}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Brain className="animate-spin" />
            Generating Quiz...
          </>
        ) : (
          <>
            <Brain />
            Generate Quiz
          </>
        )}
      </button>
    </form>
  );
};

export default QuizForm;