export enum Topic {
  HarryPotter = "Harry Potter",
  FormulaOne = "Formula One",
  Badminton = "Badminton",
  GeoPolitics = "GeoPolitics",
  Bollywood = "Bollywood",
  Dance = "Dance",
}

export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

export const QUESTION_COUNTS = [5, 10, 15, 20];
export type QuestionCount = typeof QUESTION_COUNTS[number];

export type QuizSettings = {
    topic: Topic;
    difficulty: Difficulty;
    numQuestions: QuestionCount;
}