import { useMemo, useState } from "react";
import { FlashCardSet } from "../app/flashCard";
import { QuizSettings } from "./quizOptions";
import { styles } from "./styles";

type QuestionProps = {
    settings: QuizSettings;
    flashCardSet: FlashCardSet;
    onQuizComplete: () => void;
};

type DialogAction = "close" | "next-question" | "finish-quiz";

type FeedbackDialogState = {
    isOpen: boolean;
    message: string;
    action: DialogAction;
};

function shuffleOptions(options: string[]): string[] {
    const shuffled = [...options];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }

    return shuffled;
}

export default function Question({ settings, flashCardSet, onQuizComplete }: QuestionProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [dialogState, setDialogState] = useState<FeedbackDialogState>({
        isOpen: false,
        message: "",
        action: "close",
    });

    const currentCard = flashCardSet.cards[currentQuestionIndex];
    const displayedOptions = useMemo(
        () => (currentCard ? shuffleOptions(currentCard.options) : []),
        [currentQuestionIndex, currentCard]
    );

    if (!currentCard) {
        return (
            <div style={styles.container}>
                <h2 style={styles.title}>No questions available.</h2>
            </div>
        );
    }

    const openDialog = (message: string, action: DialogAction) => {
        setDialogState({
            isOpen: true,
            message,
            action,
        });
    };

    const handleDialogClose = () => {
        const action = dialogState.action;

        setDialogState({
            isOpen: false,
            message: "",
            action: "close",
        });

        if (action === "next-question") {
            setCurrentQuestionIndex((previous) => previous + 1);
            setSelectedOption("");
            return;
        }

        if (action === "finish-quiz") {
            onQuizComplete();
        }
    };

    const handleSubmit = () => {
        if (!selectedOption) {
            openDialog("Please select an option.", "close");
            return;
        }

        if (selectedOption === currentCard.answer) {
            if (currentQuestionIndex < flashCardSet.cards.length - 1) {
                openDialog("Correct answer!", "next-question");
                return;
            }

            openDialog("Quiz complete!", "finish-quiz");
            return;
        }

        openDialog("Wrong answer. Try again.", "close");
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{settings.topic} Quiz</h1>
            <p style={styles.label}>
                Question {currentQuestionIndex + 1} of {flashCardSet.cards.length}
            </p>

            <div style={styles.form}>
                <div style={styles.field}>
                    <label style={styles.label}>{currentCard.question}</label>
                    <div style={styles.field}>
                        {displayedOptions.map((option) => (
                            <label key={option} style={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="question-option"
                                    value={option}
                                    checked={selectedOption === option}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>

                <button onClick={handleSubmit} style={styles.button}>
                    Submit
                </button>
            </div>

            {dialogState.isOpen && (
                <div style={styles.dialogOverlay}>
                    <div style={styles.dialogBox} role="dialog" aria-modal="true">
                        <p style={styles.dialogMessage}>{dialogState.message}</p>
                        <button onClick={handleDialogClose} style={styles.dialogButton}>
                            OK
                        </button>
                    </div>
        </div>
            )}
        </div>
    );
}