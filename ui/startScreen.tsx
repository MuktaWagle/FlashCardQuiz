import React, { useState } from "react";
import {
  Topic,
  Difficulty,
  QUESTION_COUNTS,
  QuestionCount,
  QuizSettings,
} from "./quizOptions";
import { styles } from "./styles";
import strings from "./strings.json";

export default function StartScreen()
{
  const [topic, setTopic] = useState<Topic | "">("");
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const [numQuestions, setNumQuestions] = useState<QuestionCount>(10);

  const handleStart = () => {
    if (!topic) {
      return;
    }

    const quizSettings: QuizSettings = {
      topic,
      difficulty,
      numQuestions,
    };

    console.log({
      ...quizSettings,
    });

    const startMessage = strings.messages.startingQuiz
      .replace("{topic}", topic)
      .replace("{difficulty}", difficulty)
      .replace("{numQuestions}", String(numQuestions));

    alert(startMessage);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{strings.title}</h1>

      <div style={styles.form}>
        {/* Topic Dropdown */}
        <div style={styles.field}>
          <label style={styles.label}>{strings.labels.topic}</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value as Topic | "")}
            style={styles.dropdown}
          >
            <option value="">{strings.placeholders.topic}</option>
            {Object.values(Topic).map((topicValue) => (
              <option key={topicValue} value={topicValue}>
                {topicValue}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Radio Buttons */}
        <div style={styles.field}>
          <label style={styles.label}>{strings.labels.difficulty}</label>
          <div style={styles.radioGroup}>
            {Object.values(Difficulty).map((difficultyValue) => (
              <label key={difficultyValue} style={styles.radioLabel}>
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

        {/* Number of Questions Dropdown */}
        <div style={styles.field}>
          <label style={styles.label}>{strings.labels.questionCount}</label>
          <select
            value={numQuestions}
            onChange={(e) =>
              setNumQuestions(Number(e.target.value) as QuestionCount)
            }
            style={styles.dropdown}
          >
            {QUESTION_COUNTS.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={!topic}
          style={{
            ...styles.button,
            ...(topic ? {} : styles.buttonDisabled),
          }}
        >
          {strings.buttons.start}
        </button>
      </div>
    </div>
  );
};