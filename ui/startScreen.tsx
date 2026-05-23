import { useState } from "react";
import {
  Topic,
  Difficulty,
  QUESTION_COUNTS,
  QuestionCount,
  QuizSettings,
} from "./quizOptions";
import { generateQuiz } from "../app/generateQuiz";
import { FlashCardSet } from "../app/flashCard";
import strings from "./strings.json";
import Question from "./question";

export default function StartScreen()
{
  const [topic, setTopic] = useState<Topic | "">("");
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const [numQuestions, setNumQuestions] = useState<QuestionCount>(10);
  const [activeQuizSettings, setActiveQuizSettings] = useState<QuizSettings | null>(null);
  const [generatedQuiz, setGeneratedQuiz] = useState<FlashCardSet | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleQuizComplete = () => {
    setGeneratedQuiz(null);
    setActiveQuizSettings(null);
    setErrorMessage("");
    setTopic("");
    setDifficulty(Difficulty.Easy);
    setNumQuestions(10);
    setIsLoading(false);
  };

  const handleStart = async () => {
    if (!topic) {
      return;
    }

    const quizSettings: QuizSettings = {
      topic,
      difficulty,
      numQuestions,
    };

    try {
      setIsLoading(true);
      setErrorMessage("");
      const quiz = await generateQuiz(quizSettings);
      setActiveQuizSettings(quizSettings);
      setGeneratedQuiz(quiz);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to generate quiz.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (generatedQuiz && activeQuizSettings) {
    return (
      <Question
        settings={activeQuizSettings}
        flashCardSet={generatedQuiz}
        onQuizComplete={handleQuizComplete}
      />
    );
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">{strings.title}</h1>

      <div className="quiz-form">
        {errorMessage && (
          <div className="error-banner" role="alert" aria-live="polite">
            <p>{errorMessage}</p>
            <button type="button" onClick={handleStart} className="secondary-button" disabled={isLoading || !topic}>
              Retry
            </button>
          </div>
        )}

        <div className="quiz-field">
          <label className="quiz-label">{strings.labels.topic}</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value as Topic | "")}
            className="quiz-dropdown"
          >
            <option value="">{strings.placeholders.topic}</option>
            {Object.values(Topic).map((topicValue) => (
              <option key={topicValue} value={topicValue}>
                {topicValue}
              </option>
            ))}
          </select>
        </div>

        <div className="quiz-field">
          <label className="quiz-label">{strings.labels.difficulty}</label>
          <div className="quiz-radio-group">
            {Object.values(Difficulty).map((difficultyValue) => (
              <label key={difficultyValue} className="quiz-radio-label">
                <input
                  type="radio"
                  name={strings.form.difficultyName}
                  value={difficultyValue}
                  checked={difficulty === difficultyValue}
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                />
                {difficultyValue}
              </label>
            ))}
          </div>
        </div>

        <div className="quiz-field">
          <label className="quiz-label">{strings.labels.questionCount}</label>
          <select
            value={numQuestions}
            onChange={(e) =>
              setNumQuestions(Number(e.target.value) as QuestionCount)
            }
            className="quiz-dropdown"
          >
            {QUESTION_COUNTS.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleStart}
          disabled={!topic || isLoading}
          className="quiz-button"
        >
          {isLoading ? "Generating..." : strings.buttons.start}
        </button>
      </div>
    </div>
  );
};