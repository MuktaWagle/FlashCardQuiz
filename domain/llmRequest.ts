import { QuizSettings } from "../ui/quizOptions";

export function buildPrompt(settings: QuizSettings) {
    return `
    Generate exactly ${settings.numQuestions} one-to-two liner questions of difficulty level ${settings.difficulty} on the topic of ${settings.topic}. Each question MUST have 4 answer options, with ONE correct answer. Format the response as JSON with the following structure:
    {
        "cards": [
            {
                "question": "string",
                "answer": "string",
                "options": ["string", "string", "string", "string"]
            },
            ...
        ]
    }
    Rules:
        - exactly ${settings.numQuestions} questions
        - no markdown
        - no extra text
        - no long answers, upto 10 words only
        - no duplicate questions
        `
}