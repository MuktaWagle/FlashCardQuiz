import { QuizSettings } from "../ui/quizOptions";
import { FlashCardSet, FlashCardSetSchema } from "./flashCard";
import { buildPrompt } from "./llmRequest";
import * as llmClient from "./llmClient";

function extractJsonObject(rawResponse: string): string {
    const trimmed = rawResponse.trim();

    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
        return trimmed;
    }

    const firstBraceIndex = trimmed.indexOf("{");
    const lastBraceIndex = trimmed.lastIndexOf("}");

    if (firstBraceIndex === -1 || lastBraceIndex === -1 || firstBraceIndex >= lastBraceIndex) {
        throw new Error("LLM response does not contain valid JSON content.");
    }

    return trimmed.slice(firstBraceIndex, lastBraceIndex + 1);
}

export async function generateQuiz(settings: QuizSettings): Promise<FlashCardSet> {
    const prompt = buildPrompt(settings);

    const response = await llmClient.Generate(prompt);
    const jsonPayload = extractJsonObject(response);

    let parsedResponse: unknown;
    try {
        parsedResponse = JSON.parse(jsonPayload);
    } catch {
        throw new Error("LLM response is not valid JSON.");
    }

    const validationResult = FlashCardSetSchema.safeParse(parsedResponse);

    if (!validationResult.success) {
        if (import.meta.env.DEV) {
            console.debug("Quiz validation issues:", validationResult.error.flatten());
        }
        throw new Error(`LLM response validation failed: ${validationResult.error.message}`);
    }

    const flashCardSet = validationResult.data;

    if (flashCardSet.cards.length !== settings.numQuestions) {
        throw new Error(
            `Expected ${settings.numQuestions} cards but received ${flashCardSet.cards.length}.`
        );
    }

    return flashCardSet;
}