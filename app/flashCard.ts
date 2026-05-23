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
    question: z.string(),
    answer: z.string(),
    options: z.array(z.string()).length(4)
});

export const FlashCardSetSchema = z.object({
    cards: z.array(FlashCardSchema)
});