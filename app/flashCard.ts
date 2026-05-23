import { z } from "zod";

export type FlashCard = {
    question: string;
    answer: string;
    options: string[];
}

export type FlashCardSet = {
    cards: FlashCard[];
}

export const FlashCardSchema = z.object({
    question: z.string().trim().min(1, "Question cannot be empty."),
    answer: z.string().trim().min(1, "Answer cannot be empty."),
    options: z.array(z.string().trim().min(1, "Options cannot be empty.")).length(4)
}).superRefine((card, context) => {
    const normalizedOptions = card.options.map((option) => option.trim().toLowerCase());
    const uniqueOptions = new Set(normalizedOptions);

    if (uniqueOptions.size !== card.options.length) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Each card must have 4 unique options.",
            path: ["options"],
        });
    }

    const normalizedAnswer = card.answer.trim().toLowerCase();
    if (!normalizedOptions.includes(normalizedAnswer)) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Answer must match one of the provided options.",
            path: ["answer"],
        });
    }
});

export const FlashCardSetSchema = z.object({
    cards: z.array(FlashCardSchema).min(1, "At least one card is required.")
}).superRefine((flashCardSet, context) => {
    const seenQuestions = new Set<string>();

    flashCardSet.cards.forEach((card, index) => {
        const normalizedQuestion = card.question.trim().toLowerCase();
        if (seenQuestions.has(normalizedQuestion)) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Duplicate questions are not allowed.",
                path: ["cards", index, "question"],
            });
            return;
        }

        seenQuestions.add(normalizedQuestion);
    });
});